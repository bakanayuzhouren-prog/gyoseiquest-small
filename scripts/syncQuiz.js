require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const OUTPUT_FILE = path.join(__dirname, '../src/questions.js');

// Subject Mappings
// Subject Mappings and Ordering
const SUBJECT_ORDER = [
    '基礎法学',
    '憲法',
    '行政法',
    '民法',
    '商法・会社法',
    '基礎知識',
    '多肢選択',
    '民法記述',
    '行政法記述'
];

const GYOSEI_SUB_ORDER = [
    '行政法総論',
    '行政手続法',
    '行政不服審査法',
    '行政事件訴訟法',
    '国家賠償法・損失訴訟',
    '地方自治法',
    '行政法総合'
];

const getMapping = (title) => {
    // Exact or specific matches first
    if (title.includes('基礎法学')) return { subject: '基礎法学', category: title };
    if (title.includes('憲法')) return { subject: '憲法', category: title };

    // Administrative Law Sub-categories
    if (title.includes('行政手続法')) return { subject: '行政法', category: '行政手続法' };
    if (title.includes('行政不服審査法')) return { subject: '行政法', category: '行政不服審査法' };
    if (title.includes('行政事件訴訟法')) return { subject: '行政法', category: '行政事件訴訟法' };
    if (title.includes('国家賠償法')) return { subject: '行政法', category: '国家賠償法・損失訴訟' };
    if (title.includes('地方自治法')) return { subject: '行政法', category: '地方自治法' };
    if (title.includes('行政法総合')) return { subject: '行政法', category: '行政法総合' };
    // Check '行政法記述' BEFORE '行政法' to avoids false match for '行政法'
    if (title.includes('行政法記述')) return { subject: '行政法記述', category: title };
    // Fallback for generic '行政法' -> '行政法総論'
    if (title.includes('行政法')) return { subject: '行政法', category: '行政法総論' };

    // Civil Law
    if (title.includes('民法記述')) return { subject: '民法記述', category: title };
    if (title.includes('民法')) return { subject: '民法', category: title };

    // Commercial / Company Law
    if (title.includes('商法')) return { subject: '商法・会社法', category: title };
    if (title.includes('会社法')) return { subject: '商法・会社法', category: title };

    // Others
    if (title.includes('基礎知識')) return { subject: '基礎知識', category: title };
    if (title.includes('多肢選択')) return { subject: '多肢選択', category: title };

    return null;
};

async function sync() {
    const spreadsheetId = process.env.SHEET_ID;
    console.log(`Syncing Quiz questions from: ${spreadsheetId}`);

    let sheetList;
    try {
        const metadata = await sheets.spreadsheets.get({ spreadsheetId });
        sheetList = metadata.data.sheets;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return;
    }

    if (!sheetList) return;

    // Initialize with ordered keys to ensure output JSON order
    const questionsData = {};
    SUBJECT_ORDER.forEach(subj => {
        questionsData[subj] = {};
        if (subj === '行政法') {
            GYOSEI_SUB_ORDER.forEach(sub => {
                questionsData[subj][sub] = []; // Initialize as array to append
            });
        }
    });

    for (const sheet of sheetList) {
        const title = sheet.properties.title;
        const mapping = getMapping(title);
        if (!mapping) continue;

        const { subject, category } = mapping;

        // Ensure subject exists (if not in ORDER list for some reason)
        if (!questionsData[subject]) questionsData[subject] = {};

        console.log(`Processing ${title} -> [${subject}] ${category}...`);

        // Fetch up to R (Col 18) to capture Explanation (L=Index 11) and Memo (R=Index 17)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${title}!A:R`,
        });

        const rows = response.data.values;
        if (!rows) continue;

        const sheetQuestions = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Col H (Index 7) = Question
            // Col K (Index 10) = Choice
            // Col L (Index 11) = Explanation
            // Col R (Index 17) = Memo
            const valH = row[7] ? row[7].trim() : '';
            const valK = row[10] ? row[10].trim() : '';
            const valL = row[11] ? row[11].trim() : '';
            const valR = row[17] ? row[17].trim() : '';

            if (valH) {
                // Skip header rows (e.g. "問題", "肢")
                if (valH === '問題' || valH === '肢') continue;

                // Found a Question
                const questionText = valH;
                const choices = [];
                let explanation = valL || ''; // Use Col L if available
                const memo = valR;

                // 1. Choice from same row (Correct Answer)
                if (valK) choices.push(valK);

                // 2. Choices from subsequent rows (Distractors)
                // 2. Choices from subsequent rows (Distractors or other choices)
                // Continue until next Question is found or end of sheet
                let offset = 1;
                while ((i + offset) < rows.length) {
                    const nextRow = rows[i + offset];
                    const nextValH = nextRow[7] ? nextRow[7].trim() : '';
                    const nextValK = nextRow[10] ? nextRow[10].trim() : '';

                    // If next row has a question in Col H, stop (start of new question block)
                    if (nextValH) break;

                    if (nextValK) {
                        choices.push(nextValK);
                    }
                    offset++;
                }

                if (choices.length >= 1) {
                    const correctIndices = [];
                    const cleanChoices = choices.map((c, idx) => {
                        // Check for (r) or （ｒ）
                        const isCorrectMarker = /[\(（][rｒ][\)）]/i.test(c);
                        if (isCorrectMarker) {
                            correctIndices.push(idx);
                            // Remove marker
                            return c.replace(/[\(（][rｒ][\)）]/gi, '').trim();
                        }
                        return c;
                    });

                    // If no (r) found, assume index 0 is correct (legacy behavior)
                    if (correctIndices.length === 0) {
                        correctIndices.push(0);
                    }

                    // Fallback explanation if Col L is empty
                    if (!explanation) {
                        explanation = `正解は「${cleanChoices[correctIndices[0]]}」です。`;
                    }

                    sheetQuestions.push({
                        text: questionText,
                        choices: cleanChoices,
                        answer: correctIndices, // Array of indices
                        explain: explanation,
                        memo: memo
                    });
                }
            }
        }

        if (sheetQuestions.length > 0) {
            // Append to existing category array or create new
            // Note: GYOSEI_SUB_ORDER initialized them as [], others are undefined
            const existing = questionsData[subject][category] || [];
            questionsData[subject][category] = existing.concat(sheetQuestions);
        }
    }

    // Clean up empty categories if desired, OR leave them to enforce order in UI (empty categories will just show empty list)
    // For now, let's remove empty top-level subjects or sub-categories to avoid UI clutter?
    // The user requested a specific list "1..9", so I should probably keep them even if empty?
    // But if they are empty, clicking them might crash or show nothing.
    // Let's iterate and remove empty ARRAYS, but keep objects?
    // Actually, simply JSON.stringify will output them.
    // Let's filter out completely empty top-levels to be safe, BUT user asked for the list.
    // If I keep keys with empty objects/arrays, the UI might show them.
    // Let's try to keep them.

    const outputContent = `// Generated by syncQuiz.js\nexport const SUBJECTS = ${JSON.stringify(questionsData, null, 2)};`;

    // Ensure dir exists or just write (dir likely exists)
    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Synced questions to ${OUTPUT_FILE}`);
}

sync();
