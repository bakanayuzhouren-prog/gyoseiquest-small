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

/**
 * buildDefaultSlots と同じ判定で、問題文に「空欄［ア］〜［オ］」型の片カナスロットがあるか。
 * 語句の組合せとして、でも N〜R 語群を使う場合はスキップしないための判定に使う。
 */
function wouldBuildKatakanaBlankSlots(problemText) {
    const p = problemText || '';
    const tilde = '[〜～\\uFF5E]';
    if (new RegExp(`空欄\\s*[\\[［]\\s*ア\\s*[\\]］]\\s*${tilde}\\s*[\\[［]\\s*オ\\s*[\\]］]`).test(p)) return true;
    if (new RegExp(`空欄\\s*[\\[［]\\s*ア\\s*[\\]］]\\s*${tilde}\\s*[\\[［]\\s*エ\\s*[\\]］]`).test(p)) return true;
    if (/空欄\s*[\[［]\s*ア\s*[\]］]\s*[・\s]*[\[［]\s*イ\s*[\]］]\s*[・\s]*[\[［]\s*ウ\s*[\]］]/.test(p)) return true;
    if (/空欄\s*[\[［]\s*ア\s*[\]］]\s*[・\s]*[\[［]\s*イ\s*[\]］]/.test(p)) return true;
    if (new RegExp(`空欄\\s*ア\\s*${tilde}\\s*オ`).test(p)) return true;
    if (new RegExp(`空欄\\s*ア\\s*${tilde}\\s*エ`).test(p)) return true;
    if (/空欄\s*ア\s*[・\s]\s*イ\s*[・\s]\s*ウ/.test(p)) return true;
    if (/空欄\s*ア\s*[・\s]\s*イ/.test(p)) return true;
    if (new RegExp(`ア\\s*${tilde}\\s*オ`).test(p)) return true;
    if (new RegExp(`ア\\s*${tilde}\\s*エ`).test(p)) return true;
    return false;
}

/**
 * H列が「次の問題」のトリガーか（条文続きの長文と区別し、N〜Q 語群マージの終端に使う）
 */
function looksLikeNewQuestionInHColumn(hText) {
    if (!hText || typeof hText !== 'string') return false;
    const t = hText.trim();
    if (t.length < 60) return false;
    const valProblemNorm = t
        .replace(/\s*[＜<][^＞>]*[＞>]\s*$/, '')
        .replace(/\s*（[^）]{1,20}）\s*$/, '')
        .trim();
    return (
        valProblemNorm &&
        /どれか(?:[。.]|$)|どれ(?:[。.]|$)|ものか(?:[。.]|$)|なるか(?:[。.]|$)|述べよ(?:[。.]|$)|選びなさい(?:[。.]|$)|いくつある(?:[。.]|$)|正しいものはどれ(?:[。.]|$)|誤っているものはどれ(?:[。.]|$)/.test(
            valProblemNorm
        )
    );
}

/** Google Sheets API: シート名に日本語・記号がある場合は '...'!A:F 形式が安全 */
function sheetRangeA1F(sheetTitle) {
    const s = String(sheetTitle).replace(/'/g, "''");
    return `'${s}'!A:F`;
}

/** スプレッドシート上の実タブ名を候補から解決（表記ゆれ・NFKC） */
function resolveSheetTitleByCandidates(sheetList, candidates) {
    const titles = sheetList.map((sh) => sh.properties?.title).filter(Boolean);
    const norm = (t) => (t || '').normalize('NFKC').trim();
    for (const cand of candidates) {
        const nc = norm(cand);
        const hit = titles.find((t) => norm(t) === nc);
        if (hit) return hit;
    }
    return null;
}

/** 解説資料（漫画）系。環境変数で上書き可: QUIZ_SYNC_RESOURCE_SHEET */
const MANGA_RESOURCE_SHEET_CANDIDATES = [
    '解説資料',
    '解説資料（漫画）',
    '解説資料(漫画)',
    '解説資料（マンガ）',
    '解説資料(マンガ)',
    /** 単独「解説資料」が無く、行政法総論用タブに ID 列がある構成 */
    '解説資料（行政法総論）',
];

function getForegroundRgb(fmt) {
    return fmt?.foregroundColor || fmt?.foregroundColorStyle?.rgbColor;
}

function rgbToHex6(c) {
    if (!c) return null;
    const R = Math.round(Math.min(255, Math.max(0, (c.red ?? 0) * 255)));
    const G = Math.round(Math.min(255, Math.max(0, (c.green ?? 0) * 255)));
    const B = Math.round(Math.min(255, Math.max(0, (c.blue ?? 0) * 255)));
    return R.toString(16).padStart(2, '0') + G.toString(16).padStart(2, '0') + B.toString(16).padStart(2, '0');
}

function isNeutralColor(c) {
    if (!c) return true;
    const r = c.red ?? 0, g = c.green ?? 0, b = c.blue ?? 0;
    const max = Math.max(r, g, b);
    if (max < 0.07) return true;
    const min = Math.min(r, g, b);
    if (max - min < 0.07 && max < 0.42) return true;
    return false;
}

function isRedColor(c) {
    if (!c) return false;
    const r = c.red ?? 0, g = c.green ?? 0, b = c.blue ?? 0;
    return r > 0.35 && r >= g && r >= b && (r - Math.max(g, b)) > 0.15;
}

/** タグ終端と衝突しないようエスケープ */
function escapeForColorTag(seg) {
    return seg.replace(/\[\[\/c\]\]/g, '［［/c］］');
}

/**
 * textFormatRuns から **太字** / [[red:x]] / [[c:#RRGGBB]]x[[/c]] / [[c:#RRGGBB&b]]x[[/c]] を生成。
 * スプレッドシートの文字色・太字をアプリの MarkdownText で再現する。
 */
function applyTextFormatRuns(text, cellData) {
    if (!text) return text;
    const runs = cellData?.textFormatRuns;
    if (!runs?.length) return text;
    let out = '';
    let lastEnd = 0;
    for (let j = 0; j < runs.length; j++) {
        const run = runs[j];
        const start = run.startIndex ?? 0;
        if (start > lastEnd) out += text.slice(lastEnd, start);
        const end = j + 1 < runs.length ? (runs[j + 1].startIndex ?? text.length) : text.length;
        let seg = text.slice(start, end);
        if (seg) {
            const bold = run.format?.bold === true;
            const fg = getForegroundRgb(run.format);
            const red = fg && isRedColor(fg);
            const neutral = !fg || isNeutralColor(fg);
            const hex = fg && !neutral && !red ? rgbToHex6(fg) : null;
            if (red) {
                const e = seg.replace(/\]\]/g, '］］');
                out += `[[red:${e}]]`;
            } else if (hex) {
                const e = escapeForColorTag(seg);
                if (bold) out += `[[c:#${hex}&b]]${e}[[/c]]`;
                else out += `[[c:#${hex}]]${e}[[/c]]`;
            } else if (bold) out += `**${seg}**`;
            else out += seg;
        }
        lastEnd = end;
    }
    if (lastEnd < text.length) out += text.slice(lastEnd);
    return out || text;
}

/** 後方互換 */
function applyBoldFromFormatRuns(text, cellData) {
    return applyTextFormatRuns(text, cellData);
}

/** 1-based シート行 → 列の cellData で書式を付与 */
function formatCellText(text, colMap, sheetRow1Based) {
    if (text == null || text === '') return '';
    const s = String(text).trim();
    if (!s) return '';
    const cell = colMap[sheetRow1Based];
    return cell ? applyTextFormatRuns(s, cell) : s;
}

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
    '民法総則',
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

/**
 * 行政法１（総論まとめ）シート: B/C列レイアウト。
 * `includes('行政法1')` だと「行政法15」等に誤爆するため、1 の直後が数字でないときのみ true。
 */
function isGyosei1CombinedSheet(title) {
    const t = String(title).normalize('NFKC').trim();
    if (t.includes('行政法総論')) return true;
    return /行政法\s*[1１](?![0-9０-９])/.test(t);
}

const getMapping = (title) => {
    const nt = String(title).normalize('NFKC').trim();
    if (title.includes('基礎法学')) return { subject: '基礎法学', category: title };
    if (title.includes('憲法')) {
        if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };
        return { subject: '憲法', category: title };
    }
    if (title === '行政法総論' || title.includes('行政法総論')) return { subject: '行政法', category: '行政法総論' };
    // 行政手続法: タブ名の表記ゆれ（行政手続・行手 等）。syncLearn の「全手」「行手」と揃える
    if (nt.includes('行政手続法') || nt.includes('行政手続')) return { subject: '行政法', category: '行政手続法' };
    if (nt === '行手' || /^行手[_・·\-]/.test(nt)) return { subject: '行政法', category: '行政手続法' };
    if (nt === '全手' || /^全手[_・·\-]/.test(nt)) return { subject: '行政法', category: '行政手続法' };
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
    if (title.includes('民法総論') || title.includes('民法総則')) return { subject: '民法', category: '民法総則' };
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
            const old = questionsData[subj] || {};
            questionsData[subj] = {};
            MINPO_SUB_ORDER.forEach(sub => {
                const src = sub === '民法総則' ? (old['民法総則'] || old['民法総論']) : old[sub];
                questionsData[subj][sub] = src || [];
            });
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

        // 行政法総論シート（行政法１・行政法総論）。行政法15 等は除外
        if (isGyosei1CombinedSheet(title)) {
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

        // 主要列のフォーマット（文字色・太字）を取得 — values の H/K/L と行番号を対応させる
        let mColFormatMap = {};
        let nColFormatMap = {};
        let azColFormatMap = {};
        let bColFormatMap = {};
        let hColFormatMap = {};
        let kColFormatMap = {};
        let lColFormatMap = {};
        let cColFormatMap = {};
        let fColFormatMap = {};
        try {
            await sleep(500);
            const n = Math.min(rows.length + 50, 2000);
            const gridResp = await sheets.spreadsheets.get({
                spreadsheetId,
                ranges: [
                    `${title}!M2:M${n}`,
                    `${title}!B2:B${n}`,
                    `${title}!H2:H${n}`,
                    `${title}!K2:K${n}`,
                    `${title}!L2:L${n}`,
                    `${title}!C2:C${n}`,
                    `${title}!F2:F${n}`,
                    `${title}!AZ2:AZ${n}`,
                    `${title}!N2:N${n}`,
                ],
                includeGridData: true,
            });
            const targetSheet = gridResp.data.sheets?.find((s) => (s.properties?.title || '') === title);
            const fillMap = (gridData, map) => {
                if (!gridData?.rowData) return;
                const startRow = gridData.startRow ?? 1;
                gridData.rowData.forEach((rowData, idx) => {
                    const sheetRow = startRow + idx + 1;
                    const cell = rowData?.values?.[0];
                    if (cell) map[sheetRow] = cell;
                });
            };
            const data = targetSheet?.data || [];
            if (data[0]) fillMap(data[0], mColFormatMap);
            if (data[1]) fillMap(data[1], bColFormatMap);
            if (data[2]) fillMap(data[2], hColFormatMap);
            if (data[3]) fillMap(data[3], kColFormatMap);
            if (data[4]) fillMap(data[4], lColFormatMap);
            if (data[5]) fillMap(data[5], cColFormatMap);
            if (data[6]) fillMap(data[6], fColFormatMap);
            if (data[7]) fillMap(data[7], azColFormatMap);
            if (data[8]) fillMap(data[8], nColFormatMap);
        } catch (e) {
            console.warn(`[WARN] 列フォーマット取得スキップ: ${e.message}`);
        }

        let currentSubject = sheetDefaultSubject;
        let currentCategory = sheetDefaultCategory;

        // 行政法１（ここに全部入ってる）: B列=問題文, C列=第1肢, 続く行のB列=残り肢。他: H列=問題文, K列=肢
        const useGyosei1Layout = isGyosei1CombinedSheet(title);

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
                const valL = row[11] ? row[11].trim() : '';
                const valM = row[12] ? row[12].trim() : '';
            const valR = row[17] ? row[17].trim() : '';
            const valRefId = row[19] ? row[19].trim() : '';
            // N,O,P,Q,S列（選択肢A〜E）: 語群選択問題
            const valN = row[13] ? row[13].trim() : '';
            const valO = row[14] ? row[14].trim() : '';
            const valP = row[15] ? row[15].trim() : '';
            const valQ = row[16] ? row[16].trim() : '';
            const valS = row[18] ? row[18].trim() : '';
            const hasNtoSChoices = [valN, valO, valP, valQ, valR, valS].some(v => v.length > 0);

            // ＜複数解＞ や （複数解）（正解肢２つ）（複数回）等のサフィックスを除去してから判定
            const valProblemNorm = valProblem
                .replace(/\s*[＜<][^＞>]*[＞>]\s*$/, '')   // ＜...＞ 除去
                .replace(/\s*（[^）]{1,20}）\s*$/, '')       // （...） 除去（最大20文字）
                .trim();
            // 行政法１: B列が①⑫・で始まる行は新問題。通常: 問題文で終わる行が新問題
            const isNewProblemRow = useGyosei1Layout ? /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫・]/.test(valProblem) : true;
            const isRealQuestion = valProblemNorm && /どれか(?:[。.]|$)|どれ(?:[。.]|$)|ものか(?:[。.]|$)|なるか(?:[。.]|$)|述べよ(?:[。.]|$)|選びなさい(?:[。.]|$)|いくつある(?:[。.]|$)|正しいものはどれ(?:[。.]|$)|誤っているものはどれ(?:[。.]|$)/.test(valProblemNorm);
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

                // 問題文（行政法１はB列、通常はH列）。太字・赤はフォーマットから反映
                let questionText = valProblem;
                if (!questionText) continue;
                const problemRow = i + 1;
                const problemCell = useGyosei1Layout ? bColFormatMap[problemRow] : hColFormatMap[problemRow];
                if (problemCell) questionText = applyBoldFromFormatRuns(questionText, problemCell);

                // ノイズフィルタ（明らかなヘッダー行のみ除外）
                const trimmedContent = questionText.trim();
                if (trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' || trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)) continue;

                let isBonus = false;
                if (/^※/.test(questionText)) {
                    isBonus = true;
                    questionText = questionText.replace(/^※\s*/, '').trim();
                }
                // 「次のア〜オの記述のうち…組合せはどれか」＝記述肢ア〜オの択一・複数択。穴埋め空欄ではない。
                const isEnumerateKanaStatementsCombo =
                    (/ア\s*[〜～\uFF5E]\s*オ\s*の記述/.test(questionText) ||
                        /ア\s*[〜～\uFF5E]\s*エ\s*の記述/.test(questionText)) &&
                    /組合せはどれ|妥当なものの組合せ|組合せとして正しいもの|当てはまる組合せ/.test(questionText);

                const slots = [];
                const buildDefaultSlots = () => {
                    const problemText = valProblem || '';
                    const pushLabels = (labels, bracketed = true) => {
                        for (const label of labels) {
                            slots.push({ label: bracketed ? `[ ${label} ]` : label, options: '' });
                        }
                    };

                    if (/空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[〜～\uFF5E]\s*[\[［]\s*[オ]\s*[\]］]/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ', 'オ']);
                    } else if (/空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[〜～\uFF5E]\s*[\[［]\s*[エ]\s*[\]］]/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ']);
                    } else if (/空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］]\s*[・\s]*[\[［]\s*[ウ]\s*[\]］]/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ']);
                    } else if (/空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］]/.test(problemText)) {
                        pushLabels(['ア', 'イ']);
                    } else if (/空欄\s*ア\s*[〜～]\s*オ/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ', 'オ'], false);
                    } else if (/空欄\s*ア\s*[〜～]\s*エ/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ'], false);
                    } else if (/空欄\s*ア\s*[・\s]\s*イ\s*[・\s]\s*ウ/.test(problemText)) {
                        pushLabels(['ア', 'イ', 'ウ'], false);
                    } else if (/空欄\s*ア\s*[・\s]\s*イ/.test(problemText)) {
                        pushLabels(['ア', 'イ'], false);
                    } else if (
                        /ア\s*[〜～\uFF5E]\s*オ/.test(problemText) &&
                        !/ア\s*[〜～\uFF5E]\s*オ\s*の記述/.test(problemText)
                    ) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ', 'オ'], false);
                    } else if (
                        /ア\s*[〜～\uFF5E]\s*エ/.test(problemText) &&
                        !/ア\s*[〜～\uFF5E]\s*エ\s*の記述/.test(problemText)
                    ) {
                        pushLabels(['ア', 'イ', 'ウ', 'エ'], false);
                    } else if (
                        /下線部\s*[\(（]ア[\)）]/.test(problemText) &&
                        /[\(（]イ[\)）]/.test(problemText) &&
                        /[\(（]ウ[\)）]/.test(problemText) &&
                        /(正誤|正しい|誤り)/.test(problemText)
                    ) {
                        // 会話文の下線部(ア)〜(ウ)・正誤の組合せ。N,O,P列に各枠の語群（正しい/誤りの2択など）
                        pushLabels(['ア', 'イ', 'ウ']);
                    } else if (/[\[［]\s*[A-Za-zＡ-Ｚａ-ｚ]\s*[\]］]/.test(problemText)) {
                        // 英字空欄 [ A ][ B ]…（判例・行政訴訟の穴埋め等）。出現順・重複は1枠にまとめる
                        const latinRe = /[\[［]\s*([A-Za-zＡ-Ｚａ-ｚ])\s*[\]］]/g;
                        const order = [];
                        const seen = new Set();
                        let lm;
                        while ((lm = latinRe.exec(problemText)) !== null) {
                            const ch = String(lm[1]).normalize('NFKC');
                            const L = ch.length === 1 && ch >= 'a' && ch <= 'z' ? ch.toUpperCase() : ch;
                            if (/^[A-Z]$/.test(L) && !seen.has(L)) {
                                seen.add(L);
                                order.push(L);
                            }
                        }
                        if (order.length > 0) pushLabels(order);
                    }
                };
                // 「語句(ア)と考え方(イ)の組合せ」型・または「語句の組合せとして」型（ア〜オ空欄）→ K列中心で従来表示。
                // 英字空欄 [ A ]〜[ Z ] があるときは N〜Q 語群スロットを優先し、上記フレーズがあってもスロットを作る。
                const isComboChoiceLegacy = /語句\s*[\(（]\s*[ア]\s*[\)）].*考え方\s*[\(（]\s*[イ]\s*[\)）].*組合せ/.test(valProblem || '');
                const isComboPhrase = /語句の組合せとして|当てはまる語句の組合せとして/.test(valProblem || '');
                const hasLatinLatinBrackets = /[\[［]\s*[A-Za-zＡ-Ｚａ-ｚ]\s*[\]］]/.test(valProblem || '');
                const hasKatakanaBlankStemForCombo = wouldBuildKatakanaBlankSlots(valProblem || '');
                // 片カナの [ア]〜[オ] 空欄があれば、語群は N,O,P,Q,R（ア〜オ）へ。K列は択一肢のまま。
                const shouldSkipSlotsForCombo =
                    !!valK && (isComboChoiceLegacy || (isComboPhrase && !hasLatinLatinBrackets && !hasKatakanaBlankStemForCombo));
                if (!shouldSkipSlotsForCombo && !isEnumerateKanaStatementsCombo) {
                    for (let j = 0; j < 4; j++) {
                        const label = row[3 + j] ? row[3 + j].trim() : '';
                        const choice = row[13 + j] ? row[13 + j].trim() : '';
                        if (label) slots.push({ label, options: choice });
                    }
                    if (row[8]) slots.push({ label: row[8].trim(), options: row[18] ? row[18].trim() : '' });
                }
                // 問題文に空欄表記があるがスロット未設定の場合、デフォルトスロットを作成
                if (slots.length === 0 && !shouldSkipSlotsForCombo && !isEnumerateKanaStatementsCombo) {
                    buildDefaultSlots();
                }
                // N列・O列…を問題行＋継続行の同じ列で縦に積んだ場合、語群を「 / 」で結合（ア行・イ行を別セルにした形式）
                if (slots.length > 0) {
                    const mergeSlotCol = (colIdx) => {
                        const parts = [];
                        for (let o = 0; o < 25 && i + o < rows.length; o++) {
                            const rw = rows[i + o];
                            const nextH = rw[7] ? rw[7].trim() : '';
                            // 条文続きで H が長くてもマージ継続。H が「新しい問題」らしいときだけ打ち切り。
                            if (o > 0 && nextH && looksLikeNewQuestionInHColumn(nextH)) break;
                            const cell = rw[colIdx] ? String(rw[colIdx]).trim() : '';
                            if (cell) parts.push(cell);
                        }
                        return parts.join(' / ');
                    };
                    const colIdxForSlotLatin = [13, 14, 15, 16, 18]; // N,O,P,Q,S → 英字 A,B,C,D,E の5枠目
                    const colIdxForSlotKatakana = [13, 14, 15, 16, 17]; // N,O,P,Q,R → ア,イ,ウ,エ,オ
                    const latinLetterFromSlotLabel = (label) => {
                        const m = String(label || '').match(/^\[\s*([A-Za-zＡ-Ｚａ-ｚ])\s*\]$/);
                        if (!m) return null;
                        const ch = String(m[1]).normalize('NFKC');
                        const L = ch.length === 1 && ch >= 'a' && ch <= 'z' ? ch.toUpperCase() : ch;
                        return /^[A-Z]$/.test(L) ? L : null;
                    };
                    const allKatakanaBracketSlots =
                        slots.length > 0 && slots.every((s) => /^\[\s*[ア-オ]\s*\]$/.test(String(s?.label || '')));
                    for (let j = 0; j < Math.min(slots.length, 5); j++) {
                        const slot = slots[j];
                        let colIdx;
                        const L = latinLetterFromSlotLabel(slot.label);
                        if (L) {
                            const idx = L.charCodeAt(0) - 'A'.charCodeAt(0);
                            if (idx >= 0 && idx < colIdxForSlotLatin.length) colIdx = colIdxForSlotLatin[idx];
                        }
                        if (colIdx === undefined) {
                            colIdx = allKatakanaBracketSlots ? colIdxForSlotKatakana[j] : colIdxForSlotLatin[j];
                        }
                        const merged = mergeSlotCol(colIdx);
                        if (merged) slot.options = merged;
                    }
                    // 英字空欄は N=A,O=B… で列は対応済み。配列順は A,B,C,D… に揃えて語群・正解配列の順序を固定する
                    if (slots.every((s) => latinLetterFromSlotLabel(s.label))) {
                        slots.sort((a, b) => {
                            const la = latinLetterFromSlotLabel(a.label);
                            const lb = latinLetterFromSlotLabel(b.label);
                            if (!la || !lb) return 0;
                            return la.charCodeAt(0) - lb.charCodeAt(0);
                        });
                    }
                }
                const hasNtoSChoicesAfter = slots.length > 0 && [valN, valO, valP, valQ, valR].some(v => v && v.length > 0) ||
                    slots.some(s => s.options && s.options.length > 0);

                const choices = [];
                const choiceIsBonus = [];
                const choiceExplanations = [];
                const valExplanWithFmt = (r, sheetRow) => {
                    const raw = r && r[11] ? String(r[11]).trim() : '';
                    return raw ? formatCellText(raw, lColFormatMap, sheetRow) : '';
                };
                let slotAnswersFromNtoP = null;

                // 語群選択問題: N,O,P,Q,S列がスロットの選択肢。英字空欄は N=A,O=B,… と列を対応。各列内の（ｒ）が付いた語句を正解として保持
                if ((hasNtoSChoices || hasNtoSChoicesAfter) && slots.length > 0) {
                    const rPattern = /[\(（]\s*[rｒ]\s*[\)）]/i;
                    const splitSlotOptions = (optStr) => {
                        if (!optStr) return [];
                        const raw = String(optStr).trim().normalize('NFKC');
                        let parts = raw
                            .split(/\n+|(?=[①②③④⑤])|(?=\d+[\.．]\s*)|[\/／]|\t+/)
                            .map((part) => part.trim())
                            .filter(Boolean);
                        if (parts.length === 1 && /[アイウエ]\s/.test(parts[0])) {
                            const expanded = parts[0].split(/\s+(?=[アイウエ]\s)/).map((p) => p.trim()).filter(Boolean);
                            if (expanded.length > 1) parts = expanded;
                        }
                        if (parts.length === 1 && /^[A-Z]\s/.test(parts[0])) {
                            const expanded = parts[0].split(/\s+(?=[A-Z]\s)/).map((p) => p.trim()).filter(Boolean);
                            if (expanded.length > 1) parts = expanded;
                        }
                        return parts;
                    };
                    const parseSlotCorrectValue = (optStr) => {
                        const parts = splitSlotOptions(optStr);
                        const hit = parts.find((part) => rPattern.test(part));
                        if (!hit) return '';
                        const stripped = hit.replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
                        // 先頭に「ア」「イ」「A」「B」等の見出しが付いていても正解比較で同一視できるよう、JSON には正規化して保持
                        return stripped
                            .normalize('NFKC')
                            .replace(/[\s\u3000]+/g, ' ')
                            .replace(/^[アイウエ]\s+/, '')
                            .replace(/^[A-Z]\s+/, '')
                            .trim();
                    };
                    const raw = slots.map((slot) => parseSlotCorrectValue(slot.options || ''));
                    if (raw.every(Boolean)) slotAnswersFromNtoP = raw;
                }

                // 第1肢（行政法１はC列、通常はK列）
                // Y列（index 24）= チャンク用ローカル画像ファイル名（例: cancel-vs-invalid.png）
                const choiceChunkImages = [];
                const choiceStatuteRefs = [];
                const choiceDeepDive = [];
                // ビギナー向けもっと深掘り: AZ列(index 51)。M列と同形式・[[image:]]可。AY列が空ならチャンク(U〜)の誤ペアにならない
                const choiceDeepDiveBeginner = [];
                /** N列(index 13): 語群スロット未使用のシートのみ「周辺知識」。語群・アイイ組合せ・多肢選択では使わない */
                const choiceDeepDivePeripheral = [];
                const valChunkImg = (r) => (r && r[24] ? String(r[24]).trim() : '');
                const valStatuteRef = (r) => (r && r[8] ? String(r[8]).trim() : '');
                // もっと深掘る: 問題を解くモードはM列(index 12)のみ。太字・赤はフォーマットから反映
                const valDeepDive = (r, rowIdx) => {
                    const raw = r && r[12] ? String(r[12]).trim() : '';
                    if (!raw) return '';
                    const cellData = mColFormatMap[rowIdx];
                    return cellData ? applyBoldFromFormatRuns(raw, cellData) : raw;
                };
                const valDeepDiveBeginner = (r, rowIdx) => {
                    const raw = r && r[51] ? String(r[51]).trim() : '';
                    if (!raw) return '';
                    const cellData = azColFormatMap[rowIdx];
                    return cellData ? applyBoldFromFormatRuns(raw, cellData) : raw;
                };
                const isComboWithWordBankForN =
                    /空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］].*語句の組合せ|語句\s*[\(（]\s*[ア]\s*[\)）].*考え方\s*[\(（]\s*[イ]\s*[\)）].*組合せ/.test(valProblem || '');
                const useNColumnForPeripheral =
                    slots.length === 0 && !isComboWithWordBankForN && currentSubject !== '多肢選択';
                const valPeripheral = (r, rowIdx) => {
                    if (!useNColumnForPeripheral) return '';
                    const raw = r && r[13] ? String(r[13]).trim() : '';
                    if (!raw) return '';
                    const cellData = nColFormatMap[rowIdx];
                    return cellData ? applyBoldFromFormatRuns(raw, cellData) : raw;
                };
                const firstChoice = useGyosei1Layout ? valC : valK;
                if (firstChoice) {
                    choiceIsBonus.push(/^※/.test(firstChoice));
                    if (/^※/.test(firstChoice)) isBonus = true;
                    const firstRowNum = i + 1;
                    let fc = firstChoice;
                    if (useGyosei1Layout) {
                        if (cColFormatMap[firstRowNum]) fc = applyTextFormatRuns(fc, cColFormatMap[firstRowNum]);
                    } else if (kColFormatMap[firstRowNum]) {
                        fc = applyTextFormatRuns(fc, kColFormatMap[firstRowNum]);
                    }
                    choices.push(fc.replace(/^※\s*/, '').trim() || fc);
                    choiceChunkImages.push(valChunkImg(row));
                    choiceExplanations.push(valExplanWithFmt(row, firstRowNum));
                    choiceStatuteRefs.push(valStatuteRef(row));
                    choiceDeepDive.push(valDeepDive(row, i + 1));
                    choiceDeepDiveBeginner.push(valDeepDiveBeginner(row, i + 1));
                    choiceDeepDivePeripheral.push(valPeripheral(row, i + 1));
                }

                let offset = 1;
                let valLFromContinuation = null;
                while ((i + offset) < rows.length) {
                    const nextRow = rows[i + offset];
                    const nextB = nextRow[1] ? nextRow[1].trim() : '';
                    const nextH = nextRow[7] ? nextRow[7].trim() : '';
                    const nextK = nextRow[10] ? nextRow[10].trim() : '';
                    const nextL = nextRow[11] ? nextRow[11].trim() : '';

                    // 次の問題の検出（行政法１: B列が①⑫・で始まる / 通常: H列に値）
                    if (useGyosei1Layout) {
                        if (nextB && /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫・]/.test(nextB)) break;
                    } else {
                        if (nextH) break;
                    }

                    if (!valLFromContinuation && nextL) {
                        const nextLNorm = nextL.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
                        if (/^[\d\s,\.、．]+$/.test(nextLNorm)) valLFromContinuation = nextL;
                    }
                    let choiceText = useGyosei1Layout ? (nextRow[2] ? nextRow[2].trim() : nextB) : nextK;
                    if (choiceText) {
                        choiceIsBonus.push(/^※/.test(choiceText));
                        if (/^※/.test(choiceText)) isBonus = true;
                        const contRowNum = i + offset + 1;
                        if (useGyosei1Layout) {
                            if (cColFormatMap[contRowNum]) choiceText = applyTextFormatRuns(choiceText, cColFormatMap[contRowNum]);
                        } else if (kColFormatMap[contRowNum]) {
                            choiceText = applyTextFormatRuns(choiceText, kColFormatMap[contRowNum]);
                        }
                        choices.push(choiceText.replace(/^※\s*/, '').trim() || choiceText);
                        choiceChunkImages.push(valChunkImg(nextRow));
                        choiceExplanations.push(valExplanWithFmt(nextRow, contRowNum));
                        choiceStatuteRefs.push(valStatuteRef(nextRow));
                        choiceDeepDive.push(valDeepDive(nextRow, contRowNum));
                        choiceDeepDiveBeginner.push(valDeepDiveBeginner(nextRow, contRowNum));
                        choiceDeepDivePeripheral.push(valPeripheral(nextRow, contRowNum));
                    }
                    offset++;
                }

                // 肢が0件でも問題文があれば追加（プレースホルダー肢で表示可能に）
                if (choices.length === 0 && questionText.length > 20) {
                    choices.push('（選択肢はスプレッドシートのK列で設定してください）');
                    choiceChunkImages.push('');
                    choiceExplanations.push('');
                    choiceStatuteRefs.push('');
                    choiceDeepDive.push('');
                    choiceDeepDiveBeginner.push('');
                    choiceDeepDivePeripheral.push('');
                }
                // choiceChunkImages / choiceExplanations / choiceStatuteRefs / choiceDeepDive を choices の長さに合わせる
                while (choiceChunkImages.length < choices.length) choiceChunkImages.push('');
                while (choiceExplanations.length < choices.length) choiceExplanations.push('');
                while (choiceStatuteRefs.length < choices.length) choiceStatuteRefs.push('');
                while (choiceDeepDive.length < choices.length) choiceDeepDive.push('');
                while (choiceDeepDiveBeginner.length < choices.length) choiceDeepDiveBeginner.push('');
                while (choiceDeepDivePeripheral.length < choices.length) choiceDeepDivePeripheral.push('');
                if (choices.length >= 1) {
                    const correctIndices = [];
                    const cleanChoices = currentSubject === '記述'
                        ? choices.map((c) => (c || '').trim())
                        : choices.map((c, idx) => {
                            const rPattern = /[\(（]\s*[rｒ]\s*[\)）]/i;
                            if (rPattern.test(c)) {
                                correctIndices.push(idx);
                                return c.replace(rPattern, '').trim();
                            }
                            return c;
                        });
                    // 記述式: （ｒ）は使わず K列を模範解答として modelAnswer に保存。正解判定はアプリ側で類似度
                    // (r)未記入の場合は answer:[] のまま（正解未設定）

                    // N〜Q が空でも、K列が「語1　語2　…」（全角スペース区切り）×スロット数のとき語群を肢から推定（ア〜エ型）
                    const splitJPChoiceTokens = (s) =>
                        String(s || '')
                            .replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '')
                            .trim()
                            .split(/[\u3000\s]+/)
                            .filter(Boolean);
                    const allKatakanaSlotLabelsForInfer =
                        slots.length > 0 &&
                        slots.every((s) => /^\[\s*[ア-オ]\s*\]$/.test(String(s?.label || '')));
                    if (
                        allKatakanaSlotLabelsForInfer &&
                        slots.every((s) => !String(s.options || '').trim()) &&
                        cleanChoices.length >= 2 &&
                        cleanChoices.every((c) => splitJPChoiceTokens(c).length === slots.length)
                    ) {
                        for (let j = 0; j < slots.length; j++) {
                            const words = [...new Set(cleanChoices.map((c) => splitJPChoiceTokens(c)[j]).filter(Boolean))];
                            if (words.length) slots[j].options = words.join(' / ');
                        }
                    }

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

                    const parseTashiWordBank = (wordBankText) => {
                        const raw = String(wordBankText || '').replace(/【選択肢】\s*/g, '').trim();
                        if (!raw) return [];
                        const normMarker = (ch) => {
                            const s = String(ch);
                            if (/[A-Za-zＡ-Ｚａ-ｚ]/.test(s)) {
                                const x = s.normalize('NFKC');
                                return x.length === 1 && x >= 'a' && x <= 'z' ? x.toUpperCase() : x;
                            }
                            return s;
                        };
                        return raw
                            .split(/\s*\/\s*|\n+/)
                            .map((part) => part.trim())
                            .filter(Boolean)
                            .map((part) => {
                                const labels = [...part.matchAll(/[\(（]\s*([ア-オA-Za-zＡ-Ｚａ-ｚ])\s*[\)）]/g)].map((m) => normMarker(m[1]));
                                const text = part
                                    .replace(/^\d+\s+/, '')
                                    .replace(/[\(（]\s*([ア-オA-Za-zＡ-Ｚａ-ｚ]|[rｒ])\s*[\)）]/gi, '')
                                    .trim();
                                return { text, labels };
                            })
                            .filter((item) => item.text);
                    };
                    const tashiWordBankData = currentSubject === '多肢選択' ? parseTashiWordBank(valR) : [];
                    const tashiSlotLabels = currentSubject === '多肢選択'
                        ? [...new Set([...(valProblem || '').matchAll(/[\[［]\s*([ア-オA-Za-zＡ-Ｚａ-ｚ])\s*[\]］]/g)].map((m) => {
                            const g = m[1];
                            if (/[A-Za-zＡ-Ｚａ-ｚ]/.test(g)) {
                                const x = String(g).normalize('NFKC');
                                return x.length === 1 && x >= 'a' && x <= 'z' ? x.toUpperCase() : x;
                            }
                            return g;
                        }))]
                        : [];

                    // 多肢選択: answer は R列の（ア）（イ）マーカー、または従来の N,O,P,Q 列
                    // 並べ替え問題: L列に「5,1,2,3,4」または「5. 1. 2. 3. 4.」形式で正解順序（1始まり）を指定
                    let finalAnswer = correctIndices;
                    let isReorder = false;
                    let valLUse = valL || valLFromContinuation;
                    const normalizeL = (s) => (s || '').replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
                    const valLNorm = valLUse ? normalizeL(valLUse) : '';
                    if (valLNorm && /^[\d\s,\.、．]+$/.test(valLNorm)) {
                        const orderNums = valLNorm.split(/[,\.、．\s]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 1);
                        if (orderNums.length === cleanChoices.length) {
                            finalAnswer = orderNums.map(n => n - 1);
                            isReorder = true;
                        }
                    }
                    // L列 = 解説。並べ替えでない場合のみ使用。全体解説 = F列 || L列、肢別解説 = choiceExplanations
                    // I列 = 根拠条文。肢ごとに指定があれば優先表示
                    const explRow = i + 1;
                    const explanation = isReorder
                        ? formatCellText(valF, fColFormatMap, explRow)
                        : formatCellText(valF, fColFormatMap, explRow) || formatCellText(valL, lColFormatMap, explRow);
                    const finalChoiceExplanations = isReorder ? [] : choiceExplanations;
                    const finalChoiceStatuteRefs = isReorder ? [] : choiceStatuteRefs;
                    const finalChoiceDeepDive = isReorder ? [] : choiceDeepDive;
                    const finalChoiceDeepDiveBeginner = isReorder ? [] : choiceDeepDiveBeginner;
                    const finalChoiceDeepDivePeripheral = isReorder ? [] : choiceDeepDivePeripheral;
                    // K列に（ｒ）がある択一正解があるときは answer は肢番号のまま（語群は表示・穴埋め用のみ）
                    if (!isReorder && slotAnswersFromNtoP && slotAnswersFromNtoP.length > 0 && correctIndices.length === 0) {
                        finalAnswer = slotAnswersFromNtoP;
                    } else if (!isReorder && currentSubject === '多肢選択' && valR) {
                        const labels = tashiSlotLabels.length > 0
                            ? tashiSlotLabels
                            : [...new Set(tashiWordBankData.flatMap((item) => item.labels))];
                        const slotAnswers = labels
                            .map((label) => tashiWordBankData.find((item) => item.labels.includes(label))?.text || '');
                        if (slotAnswers.length > 0 && slotAnswers.every(Boolean)) {
                            finalAnswer = slotAnswers;
                        } else {
                            const legacySlotAnswers = [row[13], row[14], row[15], row[16]]
                                .map((v) => (v ? v.trim() : '')).filter(Boolean);
                            finalAnswer = legacySlotAnswers.length > 0 ? legacySlotAnswers : [];
                        }
                    }

                    // 問2・問3: K列選択肢形式だが、語群(N,O)を先に表示。問題行＋継続行のN,Oをすべて集約。（ｒ）は表示用に除去
                    const stripR = (s) => (s || '').replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
                    const isComboWithWordBank = /空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］].*語句の組合せ|語句\s*[\(（]\s*[ア]\s*[\)）].*考え方\s*[\(（]\s*[イ]\s*[\)）].*組合せ/.test(valProblem || '');
                    const nArr = valN ? [stripR(valN)] : [], oArr = valO ? [stripR(valO)] : [];
                    if (isComboWithWordBank) {
                        for (let o = 1; o < 30 && (i + o) < rows.length; o++) {
                            const rw = rows[i + o];
                            const nextH = rw[7] ? rw[7].trim() : '';
                            if (nextH && nextH.length > 20) break;
                            const n = rw[13] ? stripR(rw[13].trim()) : '';
                            const oo = rw[14] ? stripR(rw[14].trim()) : '';
                            if (n) nArr.push(n);
                            if (oo) oArr.push(oo);
                        }
                    }
                    const comboN = nArr.join('\n'), comboO = oArr.join('\n');
                    const slotWordBank = slots.length > 0 && slots.some((slot) => slot.options)
                        ? slots
                            .filter((slot) => slot.options)
                            .map((slot) => `【${String(slot.label || '').replace(/[\[\]\s]/g, '')}】\n${stripR(slot.options || '')}`)
                            .join('\n\n')
                        : '';
                    const nopqWordBank = isComboWithWordBank && (comboN || comboO)
                        ? '【ア】\n' + (comboN || '') + '\n\n【イ】\n' + (comboO || '')
                        : slotWordBank;
                    const cleanedTashiWordBank = currentSubject === '多肢選択' && tashiWordBankData.length > 0
                        ? `【選択肢】 ${tashiWordBankData.map((item, index) => `${index + 1} ${item.text}`).join(' / ')}`
                        : '';
                    const finalWordBank = nopqWordBank || cleanedTashiWordBank || valR;

                    const modelAnswerForDescriptive = currentSubject === '記述' ? (valK || '').trim() : undefined;
                    questionsData[currentSubject][currentCategory].push({
                        text: questionText,
                        choices: cleanChoices,
                        choiceIsBonus: choiceIsBonus,
                        answer: currentSubject === '記述' ? [] : finalAnswer,
                        modelAnswer: modelAnswerForDescriptive,
                        isReorder: isReorder,
                        explain: explanation || questionText, // Fallback to text if explanation empty
                        wordBank: finalWordBank,
                        memo: valM ? formatCellText(valM, mColFormatMap, i + 1) : '',
                        slots: slots,
                        refId: valRefId,
                        isBonus: isBonus,
                        chunks: chunks,
                        choiceChunkImages: choiceChunkImages,
                        choiceExplanations: finalChoiceExplanations,
                        choiceStatuteRefs: finalChoiceStatuteRefs,
                        choiceDeepDive: finalChoiceDeepDive,
                        choiceDeepDiveBeginner: finalChoiceDeepDiveBeginner,
                        choiceDeepDivePeripheral: finalChoiceDeepDivePeripheral
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

                    const modelAnswerForDescriptiveOnly = currentSubject === '記述' ? (row[10] ? row[10].trim() : '') : undefined;
                    const explRowNoChoices = i + 1;
                    const explanationNoChoices =
                        formatCellText(valF, fColFormatMap, explRowNoChoices) ||
                        formatCellText(valL, lColFormatMap, explRowNoChoices);
                    questionsData[currentSubject][currentCategory].push({
                        text: questionText,
                        explain: explanationNoChoices || questionText, // Use question text as explanation fallback
                        chunks: chunks,
                        ...(modelAnswerForDescriptiveOnly !== undefined && { modelAnswer: modelAnswerForDescriptiveOnly })
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
            const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: sheetRangeA1F(sheetName) });
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
            const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: sheetRangeA1F(sheetName) });
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

    const mangaCandidates = [
        ...(process.env.QUIZ_SYNC_RESOURCE_SHEET ? [String(process.env.QUIZ_SYNC_RESOURCE_SHEET).trim()] : []),
        ...MANGA_RESOURCE_SHEET_CANDIDATES,
    ];
    const mangaSheetTitle = resolveSheetTitleByCandidates(sheetList, mangaCandidates);
    if (mangaSheetTitle) {
        await syncResourceSheet(mangaSheetTitle, 'manga');
        console.log(`Resources (manga): tab "${mangaSheetTitle}"`);
    } else {
        console.warn(
            `Skip 解説資料: no matching tab. Tried: ${mangaCandidates.filter((c, i, a) => a.indexOf(c) === i).join(', ')}`
        );
    }
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

    // 民法総論→民法総則リネーム: 旧キーを削除
    if (questionsData['民法'] && questionsData['民法']['民法総論']) {
        delete questionsData['民法']['民法総論'];
    }

    const output = `// Generated by syncQuiz.js\nexport const SUBJECTS = ${JSON.stringify(questionsData, null, 2)};\nexport const RESOURCES = ${JSON.stringify(resourcesData, null, 2)};\nexport const STATUTES = ${JSON.stringify(statutesData, null, 2)};`;
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`Synced to ${OUTPUT_FILE}`);
}

sync();
