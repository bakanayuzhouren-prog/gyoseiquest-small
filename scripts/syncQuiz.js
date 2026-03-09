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

// 行政法総論: シート「行政法総論」または「行政法１（ここに全部入ってる）」→ 行政法 > 行政法総論
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
    if (title === '行政法総論' || title.includes('行政法総論')) return { subject: '行政法', category: '行政法総論' };
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

    // 既存のデータを読み込んで保持する
    const currentQuestions = require(OUTPUT_FILE);
    const questionsData = currentQuestions.SUBJECTS || {};

    // 構造の初期化（既存データがない場合のみ）
    SUBJECT_ORDER.forEach(subj => {
        if (!questionsData[subj]) questionsData[subj] = {};
        if (subj === '行政法') {
            GYOSEI_SUB_ORDER.forEach(sub => { if (!questionsData[subj][sub]) questionsData[subj][sub] = []; });
        }
        if (subj === '民法') {
            MINPO_SUB_ORDER.forEach(sub => { if (!questionsData[subj][sub]) questionsData[subj][sub] = []; });
        }
        if (subj === '多肢選択') {
            TASHI_SUB_ORDER.forEach(sub => { if (!questionsData[subj][sub]) questionsData[subj][sub] = []; });
        }
        if (subj === '記述') {
            KIJUTSU_SUB_ORDER.forEach(sub => { if (!questionsData[subj][sub]) questionsData[subj][sub] = []; });
        }
    });

    for (const sheet of sheetList) {
        await sleep(1500); // Rate limit backoff
        const title = sheet.properties.title;
        console.log(`[DEBUG] Found Sheet: ${title}`);
        const mapping = getMapping(title);
        let sheetDefaultSubject = mapping ? mapping.subject : null;
        let sheetDefaultCategory = mapping ? mapping.category : null;

        // 行政法総論シート（行政法１、行政法 1 等の表記ゆれに対応）
        if (title.includes('行政法 1') || title.includes('行政法１') || title === '行政法総論' || title.includes('行政法総論')) {
            sheetDefaultSubject = '行政法';
            sheetDefaultCategory = '行政法総論';
        }

        // Skip non-problem sheets
        if (title.includes('解説') || title.includes('資料') || title.includes('条文') || title.includes('説明')) {
            console.log(`Skipping non-problem sheet: ${title}`);
            continue;
        }

        const t = title.normalize('NFKC').trim();

        // マッピングが存在しないシートはスキップ（総1-10、行政代執行法 等）
        if (!sheetDefaultSubject) {
            console.log(`Skipping unmapped sheet: ${title}`);
            continue;
        }

        console.log(`Processing ${title} -> Default: [${sheetDefaultSubject}] ${sheetDefaultCategory}...`);

        // 初期化フラグ：このシートで処理するカテゴリーを、最初の一回だけ空にする
        const initializedCategories = new Set();

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
        console.log(`[DEBUG] Processing Sheet: ${title} (${rows.length} rows)`);

        let currentSubject = sheetDefaultSubject;
        let currentCategory = sheetDefaultCategory;

        // 行政法１（ここに全部入ってる）: B列=問題文, C列=第1肢, 続く行のB列=残り肢。他: H列=問題文, K列=肢
        const useGyosei1Layout = title.includes('行政法１') || title.includes('行政法 1');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const valA = row[0] ? row[0].trim() : '';
            const valB = row[1] ? row[1].trim() : '';
            const valC = row[2] ? row[2].trim() : '';
            const valH = row[7] ? row[7].trim() : ''; // Column H (Index 7)
            const valK = row[10] ? row[10].trim() : '';

            const valProblem = useGyosei1Layout ? valB : valH;
            const valChoice = useGyosei1Layout ? (valC || valB) : valK;

            // Check if it has choices (Columns C-G, indices 2-6)
            const valC1 = row[2] ? row[2].trim() : '';
            const valC2 = row[3] ? row[3].trim() : '';
            const valC3 = row[4] ? row[4].trim() : '';

            // Column F (Index 5) might be Choice 4 OR Dig Deeper Content
            const valC4_raw = row[5] ? row[5].trim() : '';
            let valC4 = valC4_raw;
            let potentialChunkFromF = null;

            // If C1-C3 are empty, OR F contains image tags, OR F is long/has structure, treat it as chunk
            const hasImageTag = valC4_raw.includes('[[image:');
            const hasStructure = valC4_raw.includes('1：') || valC4_raw.includes('1:');

            if ((!valC1 && !valC2 && !valC3) || (valC4_raw.length > 50) || hasStructure || hasImageTag) {
                // It's likely a chunk/explanation, not a choice
                valC4 = '';
                if (valC4_raw) {
                    let firstSplit = valC4_raw.indexOf('1：');
                    if (firstSplit === -1) firstSplit = valC4_raw.indexOf('1:');

                    if (firstSplit > 0) {
                        const title = valC4_raw.substring(0, firstSplit).trim();
                        const explain = valC4_raw.substring(firstSplit).trim();
                        potentialChunkFromF = { title, explain };
                    } else {
                        potentialChunkFromF = { title: "参考解説", explain: valC4_raw };
                    }
                }
            }

            const valC5 = row[6] ? row[6].trim() : '';
            const valF = row[5] ? row[5].trim() : ''; // This valF is used for explanation, not choice
            const valM = row[12] ? row[12].trim() : '';
            const valR = row[17] ? row[17].trim() : '';
            const valRefId = row[19] ? row[19].trim() : '';

            // ＜複数解＞ や （複数解）（正解肢２つ）（複数回）等のサフィックスを除去してから判定
            const valProblemNorm = valProblem
                .replace(/\s*[＜<][^＞>]*[＞>]\s*$/, '')   // ＜...＞ 除去
                .replace(/\s*（[^）]{1,20}）\s*$/, '')       // （...） 除去（最大20文字）
                .trim();
            // 行政法１: B列が①⑫・で始まる行は新問題。通常: 問題文で終わる行が新問題
            const isNewProblemRow = useGyosei1Layout ? /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫・]/.test(valProblem) : true;
            const isRealQuestion = valProblemNorm && /どれか[。]?$|どれ[。]?$|ものか[。]?$|なるか[。]?$|述べよ[。]?$|選びなさい[。]?$|いくつある[。]?$|正しいものはどれ[。]?$|誤っているものはどれ[。]?$/.test(valProblemNorm);
            const isHeading = !isRealQuestion && valProblem && valProblemNorm.length < 60 &&
                (valProblem.includes('に照らし、') || valProblem.includes('次の記述のうち、') ||
                 valProblem.includes('次のア〜オ') || valProblem.includes('次の文章'));
            const hasTrigger = valProblem && !isHeading && (useGyosei1Layout ? isNewProblemRow : true);

            if (hasTrigger) {

                if (!questionsData[currentSubject]) questionsData[currentSubject] = {};
                // このシートで初めてこのカテゴリーに遭遇した場合のみ、既存データをクリアする
                const categoryKey = `${currentSubject}|${currentCategory}`;
                if (!initializedCategories.has(categoryKey)) {
                    questionsData[currentSubject][currentCategory] = [];
                    initializedCategories.add(categoryKey);
                }

                if (valA === '問題' || valA === '肢' || valA.startsWith('科目')) continue;

                // 問題文（行政法１はB列、通常はH列）
                let questionText = valProblem;
                if (!questionText) continue;

                // ノイズフィルタ（明らかなヘッダー行のみ除外）
                const trimmedContent = questionText.trim();
                if (trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' || trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)) continue;

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
                // 第1肢（行政法１はC列、通常はK列）
                const firstChoice = useGyosei1Layout ? valC : valK;
                if (firstChoice) choices.push(firstChoice.replace(/^※\s*/, '').trim() || firstChoice);

                let offset = 1;
                while ((i + offset) < rows.length) {
                    const nextRow = rows[i + offset];
                    const nextB = nextRow[1] ? nextRow[1].trim() : '';
                    const nextH = nextRow[7] ? nextRow[7].trim() : '';
                    const nextK = nextRow[10] ? nextRow[10].trim() : '';

                    // 次の問題の検出（行政法１: B列が①⑫・で始まる / 通常: H列に値）
                    if (useGyosei1Layout) {
                        if (nextB && /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫・]/.test(nextB)) break;
                    } else {
                        if (nextH) break;
                    }

                    let choiceText = useGyosei1Layout ? (nextRow[2] ? nextRow[2].trim() : nextB) : nextK;
                    if (choiceText) {
                        choices.push(choiceText.replace(/^※\s*/, '').trim() || choiceText);
                    }
                    offset++;
                }

                // 肢が0件でも問題文があれば追加（プレースホルダー肢で表示可能に）
                if (choices.length === 0 && questionText.length > 20) {
                    choices.push('（選択肢はスプレッドシートのK列で設定してください）');
                }
                if (choices.length >= 1) {
                    const correctIndices = [];
                    const cleanChoices = choices.map((c, idx) => {
                        // Match (r), ( r ), （r）, （ｒ） with optional spaces
                        const rPattern = /[\(（]\s*[rｒ]\s*[\)）]/i;
                        if (rPattern.test(c)) {
                            correctIndices.push(idx);
                            return c.replace(rPattern, '').trim();
                        }
                        return c;
                    });
                    // (r)未記入の場合は answer:[] のまま（正解未設定）

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

                    // 多肢選択: answer は N,O,P,Q 列（ア,イ,ウ,エの正解語句）
                    let finalAnswer = correctIndices;
                    if (currentSubject === '多肢選択' && valR) {
                        const slotAnswers = [row[13], row[14], row[15], row[16]]
                            .map((v) => (v ? v.trim() : '')).filter(Boolean);
                        finalAnswer = slotAnswers.length > 0 ? slotAnswers : [];
                    }

                    questionsData[currentSubject][currentCategory].push({
                        text: questionText,
                        choices: cleanChoices,
                        answer: finalAnswer,
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
