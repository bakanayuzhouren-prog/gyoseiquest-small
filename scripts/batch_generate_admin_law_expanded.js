require('dotenv').config();
const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '../src/questions.js');
const BACKUP_FILE = path.join(__dirname, '../src/questions.js.backup_ai_admin_law');

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

// --- Helper: Gemini Generation (Batch) ---
async function generateBatchExplanations(apiKey, questions, subjectName) {
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
**あなたの学習済みの「${subjectName}」等の法令知識をフル活用し**、以下の「${questions.length}つの問題」について、それぞれの解説を一括で作成してください。
※条文テキストは与えませんが、正確に条文番号（第〇条）や判例を引用して解説してください。

【入力データ】
${questionsText}

【タスク】
各問題（ID: 0から）について、全ての選択肢（肢1〜肢n）の解説を作成してください。
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
                // Fallback: try to find start and end of array
                const start = rawText.indexOf('[');
                const end = rawText.lastIndexOf(']');
                if (start !== -1 && end !== -1) {
                    try {
                        return JSON.parse(rawText.substring(start, end + 1));
                    } catch (e2) {
                        console.error("    Retry JSON Parse Error:", e2);
                    }
                }
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

    // Target Categories
    const targets = [
        "行政事件訴訟法",
        "国家賠償法・損失訴訟",
        "地方自治法"
    ];

    fs.writeFileSync(BACKUP_FILE, content);

    for (const targetKey of targets) {
        console.log(`\n=== Processing [${targetKey}] ===`);
        const targetQuestions = subjects["行政法"] ? subjects["行政法"][targetKey] : null;

        if (!targetQuestions) {
            console.warn(`Skipping ${targetKey}: Not found.`);
            continue;
        }

        const BATCH_SIZE = 5;
        let pendingBatches = [];
        let currentBatch = [];
        let pendingQuestionIndices = [];

        // Collect questions
        for (let i = 0; i < targetQuestions.length; i++) {
            const q = targetQuestions[i];
            const isDone = q.explain && q.explain.length > 50 && !q.explain.includes("失敗");

            if (!isDone) {
                currentBatch.push(q);
                // We need to map back to original object properly. 
                // Wait, logic in batch_generate_gyote.js relied on array reference which works if we push objects.
                // But the ID mapping used strictly 0-4 index.
                // So we should batch them and run immediately or store properly.

                if (currentBatch.length >= BATCH_SIZE) {
                    pendingBatches.push([...currentBatch]);
                    currentBatch = [];
                }
            }
        }
        if (currentBatch.length > 0) {
            pendingBatches.push([...currentBatch]);
        }

        console.log(`Found ${targetQuestions.length} questions. Pending Batches: ${pendingBatches.length}`);

        for (let b = 0; b < pendingBatches.length; b++) {
            const batch = pendingBatches[b];
            console.log(`  > Processing Batch ${b + 1}/${pendingBatches.length} (${batch.length} questions)...`);

            const results = await generateBatchExplanations(apiKey, batch, targetKey);

            if (results) {
                let successCount = 0;
                results.forEach(res => {
                    // res.id corresponds to index in the batch array (0 to batch.length-1)
                    if (batch[res.id]) {
                        batch[res.id].explain = res.explanation;
                        successCount++;
                    }
                });
                console.log(`    > Success! Updated ${successCount} questions.`);
                // Save incrementally
                saveData(content, subjects);
            } else {
                console.error(`    > Failed.`);
            }

            if (b < pendingBatches.length - 1) {
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }

    console.log("\nDone! All explanations generated.");
}

function saveData(originalContent, subjectsData) {
    const newSubjectsStr = JSON.stringify(subjectsData, null, 2);
    // Replace the object literal strictly
    const newContent = originalContent.replace(/export const SUBJECTS = ({[\s\S]+?});/, `export const SUBJECTS = ${newSubjectsStr};`);
    fs.writeFileSync(QUESTIONS_FILE, newContent);
}

main();
