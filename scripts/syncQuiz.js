require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

let auth;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
} else {
    auth = process.env.GOOGLE_SHEETS_API_KEY;
}

const sheets = google.sheets({ version: 'v4', auth });
const OUTPUT_FILE = path.join(__dirname, '../src/questions.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    if (title.includes('基礎法学')) return { subject: '基礎法学', category: title };
    if (title.includes('憲法')) {
        if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };
        return { subject: '憲法', category: title };
    }
    if (title.includes('行政手続法')) return { subject: '行政法', category: '行政手続法' };
    if (title.includes('行政不服審査法')) return { subject: '行政法', category: '行政不服審査法' };
    if (title.includes('行政事件訴訟法')) return { subject: '行政法', category: '行政事件訴訟法' };
    if (title.includes('国家賠償法')) return { subject: '行政法', category: '国家賠償法・損失訴訟' };
    if (title.includes('地方自治法')) return { subject: '行政法', category: '地方自治法' };
    if (title.includes('行政法総合')) return { subject: '行政法', category: '行政法総合' };
    if (title.includes('行政法記述')) return { subject: '記述', category: '行政法' };
    if (title.includes('民法記述')) return { subject: '記述', category: '民法' };
    if (title.includes('行政法')) {
        if (title.includes('多肢選択')) return { subject: '多肢選択', category: '行政法' };
        return { subject: '行政法', category: '行政法総論' };
    }
    if (title.includes('民法総論')) return { subject: '民法', category: '民法総論' };
    if (title.includes('民法物権')) return { subject: '民法', category: '民法物権' };
    if (title.includes('物権')) return { subject: '民法', category: '民法物権' };
    if (title.includes('債権総論')) return { subject: '民法', category: '債権総論' };
    if (title.includes('債権各論')) return { subject: '民法', category: '債権各論' };
    if (title.includes('家族法')) return { subject: '民法', category: '家族法' };
    if (title.includes('民法総合')) return { subject: '民法', category: '民法総合' };
    if (title.includes('民法全般')) return { subject: '民法', category: '民法総合' };
    if (title.includes('民法')) return { subject: '民法', category: title };
    if (title.includes('商法')) return { subject: '商法・会社法', category: title };
    if (title.includes('会社法')) return { subject: '商法・会社法', category: title };
    if (title.includes('基礎知識')) return { subject: '基礎知識', category: title };
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

    const questionsData = {};
    SUBJECT_ORDER.forEach(subj => {
        questionsData[subj] = {};
        if (subj === '行政法') GYOSEI_SUB_ORDER.forEach(sub => { questionsData[subj][sub] = []; });
        if (subj === '民法') MINPO_SUB_ORDER.forEach(sub => { questionsData[subj][sub] = []; });
        if (subj === '多肢選択') TASHI_SUB_ORDER.forEach(sub => { questionsData[subj][sub] = []; });
        if (subj === '記述') KIJUTSU_SUB_ORDER.forEach(sub => { questionsData[subj][sub] = []; });
    });

    for (const sheet of sheetList) {
        const title = sheet.properties.title;
        const mapping = getMapping(title);
        let sheetDefaultSubject = mapping ? mapping.subject : null;
        let sheetDefaultCategory = mapping ? mapping.category : null;

        if (title.includes('行政法 1')) {
            sheetDefaultSubject = '行政法';
            sheetDefaultCategory = '行政法総論';
        }

        // Skip non-problem sheets to match syncLearn.js
        if (title.includes('解説') || title.includes('資料') || title.includes('条文') || title.includes('説明')) {
            console.log(`Skipping non-problem sheet: ${title}`);
            continue;
        }

        const t = title.normalize('NFKC').trim();
        console.log(`Processing ${title} -> Default: [${sheetDefaultSubject}] ${sheetDefaultCategory}...`);

        const response = await (async () => {
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId,
                        range: `${title}!A:AZ`,
                    });
                } catch (e) {
                    if (e.message.includes('Quota exceeded') && attempt < 3) {
                        console.warn(`Quota exceeded for ${title}, retrying in ${attempt * 10}s...`);
                        await sleep(attempt * 10000);
                        continue;
                    }
                    throw e;
                }
            }
        })();

        const rows = response.data.values;


        if (!rows || rows.length <= 1) continue;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const valA = row[0] ? row[0].trim() : '';
            const valB = row[1] ? row[1].trim() : '';
            const valC = row[2] ? row[2].trim() : '';
            const valK = row[10] ? row[10].trim() : '';

            // Check if it has choices (Columns C-G, indices 2-6)
            const valC1 = row[2] ? row[2].trim() : '';
            const valC2 = row[3] ? row[3].trim() : '';
            const valC3 = row[4] ? row[4].trim() : '';

            // Column F (Index 5) might be Choice 4 OR Dig Deeper Content
            const valC4_raw = row[5] ? row[5].trim() : '';
            let valC4 = valC4_raw;
            let potentialChunkFromF = null;

            // If C1-C3 are empty, and F looks like a chunk (Long text or has "1：" etc), treat F as Chunk, not Choice
            // Or if F starts with typical chunk title pattern
            if ((!valC1 && !valC2 && !valC3) || (valC4_raw.length > 50) || (valC4_raw.includes('1：') && valC4_raw.includes('2：'))) {
                // It's likely a chunk/explanation, not a choice
                valC4 = '';
                if (valC4_raw) {
                    // Try to parse Title and Body from the cell content
                    // Format: "Title... 1:..."
                    // Simple heuristic: First line or up to "1：" is title?
                    // Or just use the whole thing as title/explain logic later.
                    // For now, let's look for the first newline or "1："
                    let firstSplit = valC4_raw.indexOf('1：');
                    if (firstSplit === -1) firstSplit = valC4_raw.indexOf('1:'); // Check for half-width colon

                    if (firstSplit > 0) {
                        const title = valC4_raw.substring(0, firstSplit).trim();
                        const explain = valC4_raw.substring(firstSplit).trim();
                        potentialChunkFromF = { title, explain };
                    } else {
                        // Fallback: Use prompt as title, or generic
                        potentialChunkFromF = { title: "参考解説", explain: valC4_raw };
                    }
                }
            }

            const valC5 = row[6] ? row[6].trim() : '';
            const valF = row[5] ? row[5].trim() : ''; // This valF is used for explanation, not choice
            const valM = row[12] ? row[12].trim() : '';
            const valR = row[17] ? row[17].trim() : '';
            const valRefId = row[19] ? row[19].trim() : '';

            if (valA || valB || valC || (t === '憲法')) {
                let currentSubject = sheetDefaultSubject;
                let currentCategory = sheetDefaultCategory;

                if (valA && valA.length < 20) {
                    if (valA.includes('憲法') || valA.includes('人権') || valA.includes('統治')) {
                        currentSubject = '憲法'; currentCategory = '憲法';
                    }
                    else if (valA.includes('行政法総論')) { currentSubject = '行政法'; currentCategory = '行政法総論'; }
                    else if (valA.includes('行政手続法')) { currentSubject = '行政法'; currentCategory = '行政手続法'; }
                    else if (valA.includes('行政不服審査法')) { currentSubject = '行政法'; currentCategory = '行政不服審査法'; }
                    else if (valA.includes('行政事件訴訟法')) { currentSubject = '行政法'; currentCategory = '行政事件訴訟法'; }
                    else if (valA.includes('国家賠償法')) { currentSubject = '行政法'; currentCategory = '国家賠償法・損失訴訟'; }
                    else if (valA.includes('地方自治法')) { currentSubject = '行政法'; currentCategory = '地方自治法'; }
                    else if (valA.includes('民法総論')) { currentSubject = '民法'; currentCategory = '民法総論'; }
                    else if (valA.includes('民法物権')) { currentSubject = '民法'; currentCategory = '民法物権'; }
                    else if (valA.includes('債権総論')) { currentSubject = '民法'; currentCategory = '債権総論'; }
                    else if (valA.includes('債権各論')) { currentSubject = '民法'; currentCategory = '債権各論'; }
                    else if (valA.includes('家族法')) { currentSubject = '民法'; currentCategory = '家族法'; }
                    else if (valA.includes('商法') || valA.includes('会社法')) { currentSubject = '商法・会社法'; currentCategory = currentSubject; }
                    else if (valA.includes('基礎法学')) { currentSubject = '基礎法学'; currentCategory = '基礎法学'; }
                    else if (valA.includes('基礎知識')) { currentSubject = '基礎知識'; currentCategory = '基礎知識'; }
                }

                if (!currentSubject) continue;

                // Capping Kenpo at 230 items and avoiding leakage
                if (currentSubject === '憲法' && currentCategory === '憲法') {
                    if (t !== '憲法') continue; // Strict source control
                    if (!questionsData['憲法']) questionsData['憲法'] = {};
                    if (!questionsData['憲法']['憲法']) questionsData['憲法']['憲法'] = [];
                    if (questionsData['憲法']['憲法'].length >= 230) continue;
                }

                if (!questionsData[currentSubject]) questionsData[currentSubject] = {};
                if (!questionsData[currentSubject][currentCategory]) questionsData[currentSubject][currentCategory] = [];

                if (valA === '問題' || valA === '肢' || valA === '科目（憲法）' || valA === '科目') continue;

                // Match syncLearn text extraction logic exactly
                let questionText = valC;
                if (!questionText && valB) questionText = valB;
                if (!questionText && valA) {
                    if (!valA.startsWith('科目')) {
                        questionText = valA;
                    }
                }
                if (!questionText) continue;

                // Filters
                const trimmedContent = questionText.trim();
                if (currentSubject === '憲法' && currentCategory === '憲法') {
                    // No noisy filters for primary Kenpo
                } else {
                    if (trimmedContent.includes('条文') || trimmedContent.includes('解説') || trimmedContent.includes('資料') || trimmedContent.includes('説明')) continue;
                    if (trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' || trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)) continue;
                }

                let isBonus = false;
                if (questionText.startsWith('※')) {
                    isBonus = true;
                    questionText = questionText.replace('※', '').trim();
                }

                const slots = [];
                for (let j = 0; j < 4; j++) {
                    const label = row[3 + j] ? row[3 + j].trim() : '';
                    const choice = row[13 + j] ? row[13 + j].trim() : '';
                    if (label) slots.push({ label, options: choice });
                }
                if (row[8]) slots.push({ label: row[8].trim(), options: row[18] ? row[18].trim() : '' });

                const choices = [];
                let explanation = valF || '';
                if (valK) choices.push(valK);

                let offset = 1;
                while ((i + offset) < rows.length) {
                    const nextRow = rows[i + offset];
                    if (nextRow[0] && nextRow[0].trim()) break;
                    if (nextRow[10] && nextRow[10].trim()) choices.push(nextRow[10].trim());
                    offset++;
                }

                if (choices.length >= 1) {
                    const correctIndices = [];
                    const cleanChoices = choices.map((c, idx) => {
                        if (/[\(（][rｒ][\)）]/i.test(c)) {
                            correctIndices.push(idx);
                            return c.replace(/[\(（][rｒ][\)）]/gi, '').trim();
                        }
                        return c;
                    });
                    if (correctIndices.length === 0) correctIndices.push(0);

                    // Extract chunks from Column U (index 20) / V (index 21) / W (index 22)...
                    const chunks = [];
                    // Add potential chunk from F if found
                    if (potentialChunkFromF) {
                        chunks.push(potentialChunkFromF);
                    }

                    if (row.length > 20) {
                        for (let j = 20; j < row.length; j += 2) {
                            const chunkTitle = row[j] ? row[j].trim() : '';
                            const chunkExplain = row[j + 1] ? row[j + 1].trim() : '';
                            if (chunkTitle && chunkExplain) {
                                chunks.push({ title: chunkTitle, explain: chunkExplain });
                            }
                        }
                    }

                    questionsData[currentSubject][currentCategory].push({
                        text: questionText,
                        choices: cleanChoices,
                        answer: correctIndices,
                        explain: explanation || questionText, // Fallback to text if explanation empty
                        wordBank: valR,
                        memo: valM,
                        slots: slots,
                        refId: valRefId,
                        isBonus: isBonus,
                        chunks: chunks
                    });
                } else {
                    // Extract chunks for non-choice questions too
                    const chunks = [];

                    // Column F might be a chunk here too (if logical)
                    // Re-evaluate Row 5 for non-choice context
                    const valF_for_chunk = row[5] ? row[5].trim() : '';


                    if (valF_for_chunk && (valF_for_chunk.length > 50 || (valF_for_chunk.includes('1：') || valF_for_chunk.includes('1:')))) {
                        // Check for full-width or half-width colon
                        let firstSplit = valF_for_chunk.indexOf('1：');
                        if (firstSplit === -1) firstSplit = valF_for_chunk.indexOf('1:');

                        if (firstSplit > 0) {
                            chunks.push({
                                title: valF_for_chunk.substring(0, firstSplit).trim(),
                                explain: valF_for_chunk.substring(firstSplit).trim()
                            });
                        } else {
                            chunks.push({ title: "参考解説", explain: valF_for_chunk });
                        }
                    }

                    if (row.length > 20) {
                        for (let j = 20; j < row.length; j += 2) {
                            const chunkTitle = row[j] ? row[j].trim() : '';
                            const chunkExplain = row[j + 1] ? row[j + 1].trim() : '';
                            if (chunkTitle && chunkExplain) {
                                chunks.push({ title: chunkTitle, explain: chunkExplain });
                            }
                        }
                    }

                    questionsData[currentSubject][currentCategory].push({
                        text: questionText,
                        explain: explanation || questionText, // Use question text as explanation fallback
                        chunks: chunks
                    });
                }
            }
        }
    }
}
    }

console.log('Syncing Resources and Statutes...');
const resourcesData = {};
const statutesData = {};

const syncResourceSheet = async (sheetName, type) => {
    try {
        const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:F` });
        const rows = resp.data.values;
        if (rows && rows.length > 0) {
            let start = (rows[0][0] === 'ID' || rows[0][1] === 'タイトル') ? 1 : 0;
            for (let i = start; i < rows.length; i++) {
                const r = rows[i];
                const id = r[0] ? r[0].trim() : '';
                if (!id) continue;
                if (!resourcesData[id]) resourcesData[id] = [];
                resourcesData[id].push({
                    title: r[1] ? r[1].trim() : '',
                    content: r[2] ? r[2].trim() : '',
                    imageUrl: r[3] ? r[3].trim() : '',
                    order: parseInt(r[4], 10) || 999,
                    targetChoice: r[5] ? r[5].trim() : null,
                    type
                });
            }
        }
    } catch (e) { console.warn(`Skip ${sheetName}: ${e.message}`); }
};

const syncStatutes = async (sheetName, key) => {
    try {
        const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:F` });
        const rows = resp.data.values;
        if (rows && rows.length > 0) {
            statutesData[key] = [];
            for (let i = 1; i < rows.length; i++) {
                const r = rows[i];
                if (r[1] || r[2]) {
                    statutesData[key].push({
                        title: r[1] ? r[1].trim() : '',
                        content: r[2] ? r[2].trim() : '',
                        imageUrl: r[3] ? r[3].trim() : '',
                        order: parseInt(r[4], 10) || 999
                    });
                }
            }
            statutesData[key].sort((a, b) => a.order - b.order);
        }
    } catch (e) { console.warn(`Skip ${sheetName}: ${e.message}`); }
};

await syncResourceSheet('解説資料', 'manga');
await syncStatutes('解説資料（行手）', 'gyote');
await syncStatutes('解説資料（行審）', 'gyoshin');
await syncStatutes('解説資料（行訴）', 'gyoso');
await syncStatutes('解説資料（地方自治法）', 'jichi');
await syncStatutes('解説資料（国賠）', 'kokubai');
await syncStatutes('解説資料（総則）', 'minpo_sosoku');
await syncStatutes('解説資料（物権）', 'minpo_bukken');
await syncStatutes('解説資料（債権総論）', 'minpo_saiken_soron');
await syncStatutes('解説資料（債権各論）', 'minpo_saiken_kakuron');
await syncStatutes('解説資料（家族法）', 'minpo_kazoku');
await syncStatutes('解説資料（商・会）', 'sho_kai');
await syncStatutes('解説資料（憲法条文）', 'kenpo');

Object.keys(resourcesData).forEach(k => resourcesData[k].sort((a, b) => a.order - b.order));

const output = `// Generated by syncQuiz.js\nexport const SUBJECTS = ${JSON.stringify(questionsData, null, 2)};\nexport const RESOURCES = ${JSON.stringify(resourcesData, null, 2)};\nexport const STATUTES = ${JSON.stringify(statutesData, null, 2)};`;
fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Synced to ${OUTPUT_FILE}`);
}

sync();
