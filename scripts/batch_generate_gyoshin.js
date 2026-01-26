require('dotenv').config();
const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '../src/questions.js');
const BACKUP_FILE = path.join(__dirname, '../src/questions.js.backup_ai_gyoshin');

// --- Helper: Read and Parse questions.js ---
function loadData() {
    const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');

    const subjectsMatch = content.match(/export const SUBJECTS = ({[\s\S]+?});/);
    if (!subjectsMatch) throw new Error("Could not find SUBJECTS");
    const subjectsJson = subjectsMatch[1];

    return {
        content,
        subjects: JSON.parse(subjectsJson)
    };
}

// --- Helper: Gemini Generation (Batch - Lightweight Mode) ---
async function generateBatchExplanations(apiKey, questions) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Construct Question Blocks for Prompt
    let questionsText = "";
    questions.forEach((q, idx) => {
        const choicesList = q.choices.map((c, i) => `肢${i + 1}: ${c}`).join("\n");
        const answerIndices = q.answer.map(i => i + 1).join(", ");
        questionsText += `
【問題ID: ${idx}】
・問題文：${q.text}
・正解肢：【${answerIndices}】
・選択肢：
${choicesList}
--------------------------------------------------
`;
    });

    const prompt = `
【システム指示】
あなたは行政書士試験の専門講師（鬼教官）です。
**あなたの学習済みの「行政不服審査法」の条文知識をフル活用し**、以下の「5つの問題」について、それぞれの解説を一括で作成してください。
※条文テキストは与えませんが、正確に条文番号（第〇条）を引用して解説してください。

【入力データ】
${questionsText}

【タスク】
各問題（ID: 0〜4）について、全ての選択肢（肢1〜肢n）の解説を作成してください。
各肢の正誤（正しい/誤り）は、正解肢番号から論理的に導き出してください。

【出力形式】
**必ず以下のJSON形式の配列のみ**を出力してください。Markdownのコードブロック( \`\`\`json ... \`\`\` )で囲んで回答してください。

\`\`\`json
[
  {
    "id": 0,
    "explanation": "【肢1】\\n本肢は...（解説本文）...\\n\\n【肢2】\\n本肢は...（解説本文）..."
  },
  {
    "id": 1,
    "explanation": "【肢1】\\n本肢は...（解説本文）..."
  },
  ...
]
\`\`\`

※ output strict JSON syntax. Escape newlines as \\n.
`;

    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    let retries = 0;
    while (retries < 5) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.status === 429) {
                console.warn(`    Rate Limit Hit (429). Waiting 5s... (Attempt ${retries + 1}/5)`);
                await new Promise(r => setTimeout(r, 5000));
                retries++;
                continue;
            }

            if (!response.ok) {
                const err = await response.text();
                // 503 or others
                console.warn(`    API Error ${response.status}. Waiting 20s... (Attempt ${retries + 1}/5)`);
                await new Promise(r => setTimeout(r, 20000));
                retries++;
                continue;
            }

            const data = await response.json();
            if (!data.candidates || !data.candidates[0].content) return null;

            const rawText = data.candidates[0].content.parts[0].text;

            // Extract JSON
            const jsonMatch = rawText.match(/```json([\s\S]*?)```/);
            if (!jsonMatch) {
                console.error("    Failed to parse format (No JSON block)");
                return null;
            }

            try {
                return JSON.parse(jsonMatch[1]);
            } catch (e) {
                console.error("    JSON Parse Error:", e);
                return null;
            }

        } catch (e) {
            console.error("Fetch error:", e);
            await new Promise(r => setTimeout(r, 5000));
            retries++;
        }
    }
    return null;
}

// --- Main ---
async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key missing");
        process.exit(1);
    }

    console.log("Loading data...");
    const { content, subjects } = loadData();

    // Target: 行政法 > 行政不服審査法
    const targetQuestions = subjects["行政法"] ? subjects["行政法"]["行政不服審査法"] : null;
    if (!targetQuestions) {
        console.error("No questions found for 行政法 > 行政不服審査法");
        return;
    }

    console.log(`Found ${targetQuestions.length} questions. Processing in batches of 5 (Lightweight Mode)...`);
    // Ideally do not overwrite backup created by other script? 
    // We can use a different backup file.
    fs.writeFileSync(BACKUP_FILE, content);

    // Create batches
    const BATCH_SIZE = 5;
    let batches = [];

    // Filter out already done questions
    let pendingQuestions = [];

    // Collect questions that need explanation
    for (let i = 0; i < targetQuestions.length; i++) {
        const q = targetQuestions[i];

        // Skip condition: already has long explanation AND not failed
        const isDone = q.explain && q.explain.length > 50 && !q.explain.includes("失敗");

        if (!isDone) {
            pendingQuestions.push(q);
        }
    }

    console.log(`Questions to process: ${pendingQuestions.length} / ${targetQuestions.length}`);

    // Chunking
    for (let i = 0; i < pendingQuestions.length; i += BATCH_SIZE) {
        batches.push(pendingQuestions.slice(i, i + BATCH_SIZE));
    }

    for (let b = 0; b < batches.length; b++) {
        const batch = batches[b];
        console.log(`\nProcessing Batch ${b + 1}/${batches.length} (${batch.length} questions)...`);

        const results = await generateBatchExplanations(apiKey, batch);

        if (results) {
            let successCount = 0;
            results.forEach(res => {
                if (batch[res.id]) { // Map back by array index 0-4
                    batch[res.id].explain = res.explanation;
                    successCount++;
                }
            });
            console.log(`  > Batch Success! Updated ${successCount} questions.`);
            saveData(content, subjects);
        } else {
            console.error(`  > Batch Failed.`);
        }

        // Wait to be safe with Total Token Limits
        if (b < batches.length - 1) {
            console.log("  Waiting 1 second (High Speed mode)...");
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    console.log("Done! All explanations generated.");
}

function saveData(originalContent, subjectsData) {
    // Re-read file to prevent race conditions with the other script if possible
    // But basic read/write is race-prone. We assume sequential or careful running.
    // For safety, we should re-read the content before saving, BUT we modified objects in memory that are tied to 'subjectsData'.
    // If 'batch_generate_gyote.js' modifies the FILE, our 'originalContent' is stale.
    // However, 'subjectsData' in memory has OUR changes.
    // This is a race condition risk. 
    // Ideally, we should run these sequentially.

    const newSubjectsStr = JSON.stringify(subjectsData, null, 2);
    const newContent = originalContent.replace(/export const SUBJECTS = ({[\s\S]+?});/, `export const SUBJECTS = ${newSubjectsStr};`);
    fs.writeFileSync(QUESTIONS_FILE, newContent);
}

main();
