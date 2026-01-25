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
// Subject Mappings and Ordering
const SUBJECT_ORDER = [
    '基礎法学',
    '憲法',
    '行政法',
    '民法',
    '商法・会社法',
    '基礎知識',
    '多肢選択',
    '記述'
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

const MINPO_SUB_ORDER = [
    '民法総論',
    '民法物権',
    '債権総論',
    '債権各論',
    '家族法',
    '民法総合'
];

const TASHI_SUB_ORDER = [
    '憲法',
    '行政法'
];

const KIJUTSU_SUB_ORDER = [
    '民法',
    '行政法'
];

const getMapping = (title) => {
    // Exact or specific matches first
    if (title.includes('基礎法学')) return { subject: '基礎法学', category: title };
    if (title.includes('憲法')) {
        // Check for Multi-Choice Constitution
        if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };
        return { subject: '憲法', category: title };
    }

    // Administrative Law Sub-categories
    if (title.includes('行政手続法')) return { subject: '行政法', category: '行政手続法' };
    if (title.includes('行政不服審査法')) return { subject: '行政法', category: '行政不服審査法' };
    if (title.includes('行政事件訴訟法')) return { subject: '行政法', category: '行政事件訴訟法' };
    if (title.includes('国家賠償法')) return { subject: '行政法', category: '国家賠償法・損失訴訟' };
    if (title.includes('地方自治法')) return { subject: '行政法', category: '地方自治法' };
    if (title.includes('行政法総合')) return { subject: '行政法', category: '行政法総合' };

    // Writing (Description)
    if (title.includes('行政法記述')) return { subject: '記述', category: '行政法' };
    if (title.includes('民法記述')) return { subject: '記述', category: '民法' };

    // Fallback for generic '行政法' -> '行政法総論' (but check for Multi-Choice first)
    if (title.includes('行政法')) {
        if (title.includes('多肢選択')) return { subject: '多肢選択', category: '行政法' };
        return { subject: '行政法', category: '行政法総論' };
    }

    // Civil Law
    if (title.includes('民法記述')) return { subject: '民法記述', category: title };

    // Explicit Civil Law Mappings (to match MINPO_SUB_ORDER)
    if (title.includes('民法総論')) return { subject: '民法', category: '民法総論' };
    if (title.includes('民法物権')) return { subject: '民法', category: '民法物権' };
    if (title.includes('物権')) return { subject: '民法', category: '民法物権' }; // looser match
    if (title.includes('債権総論')) return { subject: '民法', category: '債権総論' };
    if (title.includes('債権各論')) return { subject: '民法', category: '債権各論' };
    if (title.includes('家族法')) return { subject: '民法', category: '家族法' };
    if (title.includes('民法総合')) return { subject: '民法', category: '民法総合' };
    if (title.includes('民法全般')) return { subject: '民法', category: '民法総合' }; // Map old to new key

    // Generic Civil Law fallback (e.g. just '民法')
    if (title.includes('民法')) return { subject: '民法', category: title };

    // Commercial / Company Law
    if (title.includes('商法')) return { subject: '商法・会社法', category: title };
    if (title.includes('会社法')) return { subject: '商法・会社法', category: title };

    // Others
    if (title.includes('基礎知識')) return { subject: '基礎知識', category: title };
    // Fallback for any other Multi-Choice not caught above (e.g. just "多肢選択")
    if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };

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
        if (subj === '民法') {
            MINPO_SUB_ORDER.forEach(sub => {
                questionsData[subj][sub] = []; // Initialize as array to append
            });
        }
        if (subj === '多肢選択') {
            TASHI_SUB_ORDER.forEach(sub => {
                questionsData[subj][sub] = [];
            });
        }
        if (subj === '記述') {
            KIJUTSU_SUB_ORDER.forEach(sub => {
                questionsData[subj][sub] = [];
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
            range: `${title}!A:T`,
        });

        const rows = response.data.values;
        if (!rows) continue;

        const sheetQuestions = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Col H (Index 7) = Question
            // Col K (Index 10) = Choice
            // Col L (Index 11) = Explanation
            // Col M (Index 12) = Memo
            // Col R (Index 17) = Word Bank
            // Cols D-G (Index 3-6) = Slot Labels (空欄A, etc.)
            // Cols N-Q (Index 13-16) = Slot Choices (選択肢A, etc.)

            const valH = row[7] ? row[7].trim() : '';
            const valK = row[10] ? row[10].trim() : '';
            const valL = row[11] ? row[11].trim() : '';
            const valM = row[12] ? row[12].trim() : '';
            const valR = row[17] ? row[17].trim() : '';
            const valRefId = row[19] ? row[19].trim() : ''; // Col T (Index 19) = Ref ID

            // Extract Slots
            const slots = [];
            for (let j = 0; j < 4; j++) {
                const labelIndex = 3 + j; // D, E, F, G
                const choiceIndex = 13 + j; // N, O, P, Q
                const label = row[labelIndex] ? row[labelIndex].trim() : '';
                const choice = row[choiceIndex] ? row[choiceIndex].trim() : '';

                if (label) {
                    slots.push({ label, options: choice });
                }
            }

            // Slot E (Col I, Col S)
            const labelE = row[8] ? row[8].trim() : '';
            const choiceE = row[18] ? row[18].trim() : '';
            if (labelE) {
                slots.push({ label: labelE, options: choiceE });
            }

            if (valH) {
                // Skip header rows (e.g. "問題", "肢")
                if (valH === '問題' || valH === '肢') continue;

                // Found a Question
                const questionText = valH;
                const choices = [];
                let explanation = valL || ''; // Use Col L if available
                const wordBank = valR; // Col R is now Word Bank
                const memo = valM;     // Col M is now Memo

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
                    // Fallback explanation if Col L is empty: Leave empty as requested
                    if (!explanation) {
                        explanation = "";
                    }

                    sheetQuestions.push({
                        text: questionText,
                        choices: cleanChoices,
                        answer: correctIndices, // Array of indices
                        explain: explanation,
                        wordBank: wordBank,
                        memo: memo,
                        memo: memo,
                        slots: slots, // New field for interactive slots
                        refId: valRefId // New field for Resource ID
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

    // --- Resource (Explanation) Syncing Start ---
    console.log('Syncing Resources (解説資料 & 解説資料（行手）)...');
    const resourcesData = {};

    const syncResourceSheet = async (sheetName, type) => {
        try {
            const resourceResponse = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!A:F`, // A:ID, B:Title, C:Content, D:ImageURL, E:Order, F:TargetChoice
            });

            const resourceRows = resourceResponse.data.values;
            if (resourceRows && resourceRows.length > 0) {
                // Skip header row if necessary
                let startIndex = 0;
                if (resourceRows[0][0] === 'ID' || resourceRows[0][1] === 'タイトル') {
                    startIndex = 1;
                }

                for (let i = startIndex; i < resourceRows.length; i++) {
                    const row = resourceRows[i];
                    const id = row[0] ? row[0].trim() : '';
                    if (!id) continue;

                    const title = row[1] ? row[1].trim() : '';
                    const content = row[2] ? row[2].trim() : '';
                    const imageUrl = row[3] ? row[3].trim() : '';
                    const order = row[4] ? parseInt(row[4].trim(), 10) : 999;
                    const targetChoice = row[5] ? row[5].trim() : null; // Col F

                    if (!resourcesData[id]) {
                        resourcesData[id] = [];
                    }

                    resourcesData[id].push({
                        title,
                        content,
                        imageUrl,
                        order,
                        targetChoice,
                        type, // 'manga' or 'kujou' (Article)
                    });
                }
            }
        } catch (error) {
            console.warn(`Could not sync Resources from ${sheetName}. Sheet might be missing.`, error.message);
        }
    };

    // 1. Standard Manga/Explanation Resources
    await syncResourceSheet('解説資料', 'manga');

    // 2. Gyote (Related Articles) Resources - handled separately as STATUTES
    // await syncResourceSheet('解説資料（行手）', 'article');

    // --- Statutes Syncing Start ---
    console.log('Syncing Statutes (解説資料（行手）)...');
    const statutesData = {};

    const syncStatutes = async (sheetName, key) => {
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!A:F`, // A:ID(Ignored), B:Title, C:Content, D:ImageURL, E:Order, F:TargetChoice
            });

            const rows = response.data.values;
            if (rows && rows.length > 0) {
                // Skip header row
                let startIndex = 1;

                statutesData[key] = [];

                for (let i = startIndex; i < rows.length; i++) {
                    const row = rows[i];
                    // Ignore ID at row[0] as requested
                    const title = row[1] ? row[1].trim() : '';
                    const content = row[2] ? row[2].trim() : '';
                    const imageUrl = row[3] ? row[3].trim() : '';
                    const order = row[4] ? parseInt(row[4].trim(), 10) : 999;

                    // Only add if there is at least a title or content
                    if (title || content) {
                        statutesData[key].push({
                            title,
                            content,
                            imageUrl,
                            order
                        });
                    }
                }
                // Sort by order
                statutesData[key].sort((a, b) => a.order - b.order);
            }
        } catch (error) {
            console.warn(`Could not sync Statutes from ${sheetName}.`, error.message);
        }
    };

    await syncStatutes('解説資料（行手）', 'gyote');
    await syncStatutes('解説資料（行審）', 'gyoshin');
    await syncStatutes('解説資料（行訴）', 'gyoso');
    await syncStatutes('解説資料（地方自治法）', 'jichi');
    await syncStatutes('解説資料（国賠）', 'kokubai');

    // Civil Law
    await syncStatutes('解説資料（総則）', 'minpo_sosoku');
    await syncStatutes('解説資料（物権）', 'minpo_bukken');
    await syncStatutes('解説資料（債権総論）', 'minpo_saiken_soron');
    await syncStatutes('解説資料（債権各論）', 'minpo_saiken_kakuron');
    await syncStatutes('解説資料（家族法）', 'minpo_kazoku');

    // Commercial
    await syncStatutes('解説資料（商・会）', 'sho_kai');

    // Constitution
    await syncStatutes('解説資料（憲法条文）', 'kenpo');

    // --- Statutes Syncing End ---


    // Sort pages by order
    Object.keys(resourcesData).forEach(key => {
        resourcesData[key].sort((a, b) => a.order - b.order);
    });
    // --- Resource Syncing End ---

    const outputContent = `// Generated by syncQuiz.js\nexport const SUBJECTS = ${JSON.stringify(questionsData, null, 2)};\nexport const RESOURCES = ${JSON.stringify(resourcesData, null, 2)};\nexport const STATUTES = ${JSON.stringify(statutesData, null, 2)};`;

    // Ensure dir exists or just write (dir likely exists)
    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Synced questions and resources to ${OUTPUT_FILE}`);
}

sync();
