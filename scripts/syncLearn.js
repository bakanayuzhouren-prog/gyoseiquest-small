require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { formatCellText, loadSheetColumnFormats } = require('./sheetTextFormat');

let sheets;
if (process.env.GOOGLE_SHEETS_API_KEY) {
  console.log('Using API Key for authentication');
  sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
} else {
  console.log('Using Service Account for authentication');
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  sheets = google.sheets({ version: 'v4', auth });
}
const OUTPUT_FILE = path.join(__dirname, '../src/learn.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * C列「青文字検索」: セル全体で最初の1つの / だけが区切り。
 * 左＝青文字にする語、右＝クリック時の説明（改行・「1/2」など本文中の / を含めてよい）
 */
function parseLexiconPairsFromCell(valC) {
  if (!valC || !String(valC).trim()) return [];
  const s = String(valC).replace(/^\uFEFF/, '');
  const idx = s.indexOf('/');
  if (idx < 0) return [];
  const word = s.slice(0, idx).trim();
  const def = s.slice(idx + 1).replace(/^\s+/, '');
  if (!word || !def) return [];
  return [{ word, def }];
}

function escapeDictSegment(seg) {
  return String(seg).replace(/\]\]/g, '］］');
}

/** 本文中に表示語があれば最初の1箇所を [[dict:…]] に差し替え。無ければ末尾にタグを追加 */
function applyLexiconColumn(text, valC) {
  const pairs = parseLexiconPairsFromCell(valC);
  if (pairs.length === 0) return text;
  let out = text;
  for (const { word, def } of pairs) {
    const w = escapeDictSegment(word);
    const d = escapeDictSegment(def);
    const tag = `[[dict:${w}::${d}]]`;
    const pos = out.indexOf(word);
    if (pos >= 0) {
      out = out.slice(0, pos) + tag + out.slice(pos + word.length);
    } else {
      out = out + (out.length && !/\n$/.test(out) ? '\n' : '') + tag;
    }
  }
  return out;
}

function normalizeLearnLinkKey(value) {
  if (value == null) return '';
  const normalized = String(value)
    .normalize('NFKC')
    .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/＃/g, '#')
    .trim();
  const match = normalized.match(/#\s*([0-9]{1,6})/);
  return match ? `#${match[1].padStart(3, '0')}` : '';
}

function extractLearnLinkKey(text) {
  if (!text) return '';
  const matches = [...String(text).matchAll(/[＃#]\s*([0-9０-９]{1,6})/g)];
  if (matches.length === 0) return '';
  return normalizeLearnLinkKey(matches[matches.length - 1][0]);
}

function stripLearnLinkTag(text) {
  return String(text || '').replace(/\s*[＃#]\s*[0-9０-９]{1,6}\s*$/g, '').trim();
}

async function sync() {
  const spreadsheetId = process.env.SHEET_ID;
  console.log(`Syncing from spreadsheet: ${spreadsheetId}`);

  // 1. Get all sheet names
  let sheetList;
  try {
    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    sheetList = metadata.data.sheets;
  } catch (error) {
    console.error('Error fetching spreadsheet metadata:', error);
    return;
  }

  if (!sheetList || sheetList.length === 0) {
    console.log('No sheets found.');
    return;
  }

  const learnContent = {};
  const learnDeepDive = {};
  const learnFExplain = {};
  const learnStatuteRefs = {};
  const learnSource = {};
  const learnLinks = {};

  const ADMIN_LAW_LEARN_SHEET_SUBJECTS = new Set([
    '行政手続法',
    '行政不服審査法',
    '行政事件訴訟法',
    '国家賠償法',
    '地方自治法',
  ]);

  // 2. Iterate through sheets and aggregate content
  for (const sheet of sheetList) {
    const title = sheet.properties.title;
    let sheetDefaultSubject = null;

    // 1. Determine base subject from sheet title
    const t = title.normalize('NFKC').trim();

    // Skip "総1", "総2" ... "総10" as requested
    if (t.match(/^総[0-9]+$/)) {
      console.log(`Skipping excluded sheet: ${title}`);
      continue;
    }

    // 解説資料シートはスキップ（B列がタイトルのみで、主シートのB列＝初心者向け解説と重複するため）
    if ((t.includes('解説') || t.includes('資料')) && /（|\(/.test(t)) {
      console.log(`Skipping 解説資料 sheet: ${title}`);
      continue;
    }

    // Debug: detailed title check for mapping issues
    if (t.includes('総')) {
      const charCodes = Array.from(t).map(c => c.charCodeAt(0).toString(16)).join(',');
      console.log(`Title: "${title}", Normalized: "${t}", CharCodes: ${charCodes}`);
    }

    // Primary Sheet Mapping (Highest Priority)
    if (t === '民法物権') {
      sheetDefaultSubject = '民法物権';
    }
    else if (t === '行政法総合') {
      sheetDefaultSubject = '行政法総合';
    }
    else if (t === '行政法総論' || t.includes('全総')) {
      sheetDefaultSubject = '行政法総論';
    }
    // 「多肢選択憲法」「多肢選択行政法」シート — 全憲/行政総論より先（見て聞いて覚える・A列）
    else if (t.includes('多肢選択') && t.includes('憲法')) sheetDefaultSubject = '多肢選択憲法';
    else if (t.includes('多肢選択') && t.includes('行政法')) sheetDefaultSubject = '多肢選択行政法';
    else if (t.includes('全憲') || t.includes('憲法')) sheetDefaultSubject = '憲法';
    else if (t.includes('全手') || t.includes('行手') || t.includes('行政手続')) sheetDefaultSubject = '行政手続法';
    else if (t.includes('全審') || t.includes('行審') || t.includes('不服') || t.includes('審査')) sheetDefaultSubject = '行政不服審査法';
    else if (t.includes('全訴') || t.includes('行訴') || t.includes('事件') || t.includes('訴訟')) sheetDefaultSubject = '行政事件訴訟法';
    else if (t.includes('全国') || t.includes('国賠') || t.includes('国家賠償')) sheetDefaultSubject = '国家賠償法';
    else if (t.includes('全地') || t.includes('自治')) sheetDefaultSubject = '地方自治法';
    else if (t.includes('行政')) sheetDefaultSubject = '行政法総論';

    // Civil Law Mappings (Priority over General "Sou")
    else if (t.includes('民総') || (t.includes('民法') && t.includes('総'))) sheetDefaultSubject = '民法総則';
    else if (t.includes('物権') || t.includes('民物')) {
      // Guard against "Explanation/Reference" sheets taking over Bukken
      if (!t.includes('解説') && !t.includes('資料')) {
        sheetDefaultSubject = '民法物権';
      }
    }
    else if (t.includes('債総') || (t.includes('債権') && t.includes('総'))) sheetDefaultSubject = '債権総論';
    else if (t.includes('債各') || (t.includes('債権') && t.includes('各'))) sheetDefaultSubject = '債権各論';
    else if (t.includes('親族') || t.includes('相続') || t.includes('家族')) sheetDefaultSubject = '家族法';
    else if (t.includes('民法記述')) sheetDefaultSubject = '民法記述';
    else if (t.includes('民法')) sheetDefaultSubject = '民法総則';

    else if (t.includes('商法') || t.includes('会社法') || t.includes('商・会')) sheetDefaultSubject = '商法・会社法';
    else if (t.includes('基礎法学')) sheetDefaultSubject = '基礎法学';
    else if (t.includes('多肢選択')) sheetDefaultSubject = '多肢選択';
    else if (t.includes('基礎知識')) {
      sheetDefaultSubject = '基礎知識';
    }

    // 商法・会社法: 見て聞いて覚えるは A列（短縮）＋M/I列。H/K は syncQuiz
    let range = `${title}!A:Z`;
    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });
        break;
      } catch (e) {
        if (e.message.includes('Quota exceeded') && attempt < 3) {
          console.warn(`Quota exceeded for ${title}, retrying in ${attempt * 10}s...`);
          await sleep(attempt * 10000);
          continue;
        }
        throw e;
      }
    }

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.log(`No data or only header in sheet: ${title}`);
      continue;
    }

    if (t.includes('解説') || t.includes('資料')) {
      console.log(`[INVESTIGATION] Sheet ${title} has ${rows.length} rows. First row: ${JSON.stringify(rows[0])}`);
      if (rows.length > 1) console.log(`[INVESTIGATION] Row 1: ${JSON.stringify(rows[1]).substring(0, 100)}...`);
    }

    // Skip the first row (memo/header row)
    const dataRows = rows.slice(1);

    /** 行政法各論: I列根拠条文・M列深掘りの書式付き同期 */
    let adminLearnColFormats = null;
    if (sheetDefaultSubject && ADMIN_LAW_LEARN_SHEET_SUBJECTS.has(sheetDefaultSubject)) {
      await sleep(500);
      adminLearnColFormats = await loadSheetColumnFormats(
        sheets,
        spreadsheetId,
        title,
        dataRows.length,
        ['B', 'I', 'M', 'F']
      );
    }
    const fmtCell = (letter, text, sheetRow1Based) => {
      if (!text || !String(text).trim()) return '';
      const colMap = adminLearnColFormats?.[letter];
      if (!colMap) return String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
      return formatCellText(text, colMap, sheetRow1Based);
    };

    // A列がIDで始まるシートは関係ないシート → スキップ（行政代執行法は例外：行政法総論に取り込む）
    const firstValA = (dataRows[0] && dataRows[0][0]) ? String(dataRows[0][0]).trim() : '';
    const looksLikeId = /^[a-z]{2}\d+$/i.test(firstValA) || /^[ａ-ｚＡ-Ｚ０-９]+\d+$/.test(firstValA);
    if (looksLikeId && t !== '行政代執行法') {
      console.log(`Skipping ID-sheet (A列=ID): ${title}`);
      continue;
    }

    // RESET currentSubject for every row to the sheet default
    let currentSubject = sheetDefaultSubject;
    let currentQuestionStartIndex = -1;
    let currentGroupHasDeepDive = false;
    let currentGroupDeepDiveContent = '';
    let currentGroupFExplain = '';
    let currentGroupStatuteRefContent = '';
    let currentGroupMDeepDiveContent = '';

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];

      const rawSubject = row[0];
      // ONLY Column A overrides if it is relatively short (category name) 
      // AND doesn't look like legal text. Long text here is usually content.
      // 「行政法総合」シートはタブでキーが決まる。A列の短い科目名で地方自治法等へ流すと B列のカードが取り込まれない。
      if (rawSubject && rawSubject.length < 20 && t !== '行政法総合') {
        if (rawSubject.includes('行政法総論')) currentSubject = '行政法総論';
        else if (rawSubject.includes('行政手続法')) currentSubject = '行政手続法';
        else if (rawSubject.includes('行政不服審査法')) currentSubject = '行政不服審査法';
        else if (rawSubject.includes('行政事件訴訟法')) currentSubject = '行政事件訴訟法';
        else if (rawSubject.includes('国家賠償法')) currentSubject = '国家賠償法';
        else if (rawSubject.includes('地方自治法')) currentSubject = '地方自治法';
        // A列の「行政法総合」は他シート（総論など）の分類タグに使われることがある。
        // ここで currentSubject を切り替えると総合タブの先頭に総論の長文が混入するため切り替えない（総合の本文は「行政法総合」タブのみ）。
        else if (rawSubject.includes('行政法') && rawSubject.includes('記述')) currentSubject = '行政法記述';

        else if (rawSubject.includes('民法総則') || rawSubject.includes('民法総論')) currentSubject = '民法総則';
        else if (rawSubject.includes('民法物権')) currentSubject = '民法物権';
        else if (rawSubject.includes('債権総論')) currentSubject = '債権総論';
        else if (rawSubject.includes('債権各論')) currentSubject = '債権各論';
        else if (rawSubject.includes('民法') && rawSubject.includes('記述')) currentSubject = '民法記述';

        else if (rawSubject.includes('多肢選択') && rawSubject.includes('憲法')) currentSubject = '多肢選択憲法';
        else if (rawSubject.includes('多肢選択') && rawSubject.includes('行政法')) currentSubject = '多肢選択行政法';
        else if (rawSubject.includes('多肢選択')) currentSubject = '多肢選択';
        else if (rawSubject.includes('家族法')) currentSubject = '家族法';
        /** A列が「憲法」のみ等で本編に差すと、多肢選択シートの行が learnContent['憲法'] に混入する。シート既定が多肢側なら本編『憲法』へ切り替えない */
        else if (rawSubject.includes('憲法') || rawSubject.includes('人権') || rawSubject.includes('統治')) {
          if (
            sheetDefaultSubject !== '多肢選択憲法' &&
            sheetDefaultSubject !== '多肢選択行政法' &&
            sheetDefaultSubject !== '多肢選択'
          ) {
            currentSubject = '憲法';
          }
        }
        else if (rawSubject.includes('商法') || rawSubject.includes('会社法')) currentSubject = '商法・会社法';
        else if (rawSubject.includes('基礎法学')) currentSubject = '基礎法学';
        else if (rawSubject.includes('基礎知識')) currentSubject = '基礎知識';
      }

      // 見て聞いて覚えるモードの問題文はA列（科目行・行政代執行法などA列がIDの場合はC列）
      if (currentSubject) {
        const valA = (row[0] || '').trim();
        const valBTrim = row[1] ? row[1].trim() : '';
        const minpoSheetBodyInB =
          currentSubject === '民法総則' ||
          currentSubject === '家族法' ||
          currentSubject === '債権各論' ||
          currentSubject === '債権総論';
        const looksLikeId = /^[a-z]{2}\d+$/i.test(valA) || /^[ａ-ｚＡ-Ｚ０-９]+\d+$/.test(valA);
        // 行政法総論シート: G列=問題。それ以外の通常シート: H列=問題（syncQuiz と同じ列）
        const useGyoseiSoronLayout = t === '行政法総論';
        /** 行政法総合シート: 見て聞いて覚えの本文は A 列。K 列はクイズ側の重複のため参照しない。A 空の行のみ B→H の順でフォールバック。 */
        const gyoseiSogoSheet = t === '行政法総合';
        const gyoseiSogoValidA =
          !!(valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢');
        const valH = useGyoseiSoronLayout ? (row[6] ? row[6].trim() : '') : (row[7] ? row[7].trim() : '');
        /** H列＝問題文の行政法シート。本文に「条文」「解説」が普通に出るため後段のメタ行フィルタ対象外。A空・Hのみの行も取り込む。 */
        const isAdminLawLearnSubject =
          currentSubject === '行政法総合' ||
          currentSubject === '行政手続法' ||
          currentSubject === '行政不服審査法' ||
          currentSubject === '行政事件訴訟法' ||
          currentSubject === '国家賠償法' ||
          currentSubject === '地方自治法';
        // A列＝本文。B列＝深掘り。C列＝青文字検索（用語/説明）。旧C列以降は1列ずつ繰り下がり（本文フォールバックはD列=index3）
        let content = row[0]; // A列＝問題文
        if (currentSubject === '民法物権') {
          if (!content && row[3]) content = row[3];
        } else if (valA.startsWith('科目') || (t === '行政代執行法' && looksLikeId)) {
          content = row[3] || row[0] || '';
        } else if (!content) {
          content = row[3] || '';
        }
        let usedBAsMainBody = false;
        if (minpoSheetBodyInB && !(content && String(content).trim()) && valBTrim) {
          content = row[1];
          usedBAsMainBody = true;
        }
        // 民法総則・債権・家族: A〜B・Dが空で H 列だけに本文がある行も取り込む（見て聞いて覚えると問題を解くの兼用シート向け）
        if (
          minpoSheetBodyInB &&
          !(content && String(content).trim()) &&
          valH &&
          valH !== '問題'
        ) {
          content = useGyoseiSoronLayout ? row[6] : row[7];
        }

        // 多肢選択（専用シート含む）・憲法本シート: 見て聞いて覚えるの問題文はA列起点（Hは穴埋め用のため新グループ条件に含めない）
        const tashiLearnSubject =
          currentSubject === '多肢選択' ||
          currentSubject === '多肢選択憲法' ||
          currentSubject === '多肢選択行政法';
        /** 行政法各論（総合除く）・商法・会社法: 見て聞いて覚えるは A 列のみ。H/K 列は問題を解く用 */
        const adminLawLearnAOnly =
          (isAdminLawLearnSubject && !gyoseiSogoSheet) || currentSubject === '商法・会社法';

        if (
          isAdminLawLearnSubject &&
          !gyoseiSogoSheet &&
          !adminLawLearnAOnly &&
          !(content && String(content).trim()) &&
          valH &&
          valH !== '問題' &&
          !useGyoseiSoronLayout &&
          !minpoSheetBodyInB &&
          !tashiLearnSubject
        ) {
          content = valH;
        }
        if (gyoseiSogoSheet) {
          if (gyoseiSogoValidA) {
            content = row[0];
            usedBAsMainBody = false;
          } else if (valBTrim) {
            content = row[1];
            usedBAsMainBody = true;
          } else if (valH && valH !== '問題') {
            content = valH;
            usedBAsMainBody = false;
          }
        }
        const gyoseiSogoBody =
          gyoseiSogoSheet && (gyoseiSogoValidA || valBTrim || (valH && valH !== '問題'));

        // 民法物権は H列あり＝新グループ開始（A列肢の受け皿更新）
        let isNewQuestion = false;
        if (currentSubject === '民法物権') {
          if (valH && valH !== '問題') isNewQuestion = true;
        } else if (tashiLearnSubject || t === '憲法') {
          if (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢') isNewQuestion = true;
        } else if (t !== '憲法') {
          if (minpoSheetBodyInB) {
            // 見て聞いて覚えるは A列のみ（.cursor 規約）。H列だけの行は問題を解く用の継続行のため新カードにしない
            if (
              (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢') ||
              (!valA && valBTrim)
            ) {
              isNewQuestion = true;
            }
          } else if (adminLawLearnAOnly) {
            if (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢') {
              isNewQuestion = true;
            }
          } else if (
            valH ||
            (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢') ||
            !!gyoseiSogoBody
          ) {
            isNewQuestion = true;
          }
        }

        if (isNewQuestion) {
          if (!learnContent[currentSubject]) learnContent[currentSubject] = [];

          if (currentSubject === '民法物権') {
            // 民法物権: currentQuestionStartIndex は「次にA列肢がpushされる時のインデックス」
            // = 現時点の learnContent.length（まだpushされていないので）
            currentQuestionStartIndex = learnContent[currentSubject].length;
          } else {
            currentQuestionStartIndex = learnContent[currentSubject].length;
          }

          // Look ahead: グループ内のB列・F列（解説）・I列（根拠条文）・M列（深掘り）を収集
          let groupHasDeepDive = false;
          const groupBContents = [];
          const groupFContents = [];
          const groupIContents = [];
          const groupMContents = [];
          let j = i;
          while (j < dataRows.length) {
            if (gyoseiSogoSheet && j > i) break;
            const sheetRowNum = j + 2;
            const colVal = dataRows[j][1] ? dataRows[j][1].trim() : '';
            if (colVal) {
              groupHasDeepDive = true;
              groupBContents.push(fmtCell('B', colVal, sheetRowNum));
            }
            const colF = dataRows[j][5] ? String(dataRows[j][5]).trim() : '';
            if (colF) groupFContents.push(fmtCell('F', colF, sheetRowNum));
            if (adminLawLearnAOnly) {
              const colI = dataRows[j][8] ? String(dataRows[j][8]).trim() : '';
              if (colI) groupIContents.push(fmtCell('I', colI, sheetRowNum));
              const colM = dataRows[j][12] ? String(dataRows[j][12]).trim() : '';
              if (colM) {
                groupHasDeepDive = true;
                groupMContents.push(fmtCell('M', colM, sheetRowNum));
              }
            }
            if (j + 1 < dataRows.length) {
              const nextRow = dataRows[j + 1];
              const nextValProblem = useGyoseiSoronLayout ? (nextRow[6] ? nextRow[6].trim() : '') : (nextRow[7] ? nextRow[7].trim() : '');
              const nextValA = nextRow[0] ? nextRow[0].trim() : '';
              if (currentSubject === '民法物権') {
                if ((nextRow[7] || '').trim() && (nextRow[7] || '').trim() !== '問題') break;
              } else if (tashiLearnSubject || t === '憲法') {
                if (nextValA && !nextValA.startsWith('科目') && nextValA !== '問題' && nextValA !== '肢') break;
              } else if (t !== '憲法') {
                const nextValB = nextRow[1] ? nextRow[1].trim() : '';
                if (minpoSheetBodyInB) {
                  // 次の「A列の新しい見出し」まで B/F を継続行からも拾う（A 空・B ありの肢行は !nextValA&&nextValB だが、ここで break すると深掘りが落ちる）
                  if (
                    nextValA &&
                    !nextValA.startsWith('科目') &&
                    nextValA !== '問題' &&
                    nextValA !== '肢'
                  ) {
                    break;
                  }
                } else if (adminLawLearnAOnly) {
                  if (
                    nextValA &&
                    !nextValA.startsWith('科目') &&
                    nextValA !== '問題' &&
                    nextValA !== '肢'
                  ) {
                    break;
                  }
                } else if (
                  nextValProblem ||
                  (nextValA && !nextValA.startsWith('科目') && nextValA !== '問題' && nextValA !== '肢')
                ) {
                  break;
                }
              } else {
                if (nextValA && !nextValA.startsWith('科目') && nextValA !== '問題' && nextValA !== '肢') break;
              }
            }
            j++;
          }
          currentGroupHasDeepDive = groupHasDeepDive;
          currentGroupDeepDiveContent = groupBContents.join('\n\n');
          currentGroupFExplain = groupFContents.join('\n\n');
          currentGroupStatuteRefContent = groupIContents.join('\n\n');
          currentGroupMDeepDiveContent = groupMContents.join('\n\n');
        }

        if (valA === '問題' || valA === '肢') continue;
        if (valA.startsWith('科目') && !(row[3] && String(row[3]).trim())) continue;

        if (minpoSheetBodyInB) {
          const hasValidA = valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢';
          const bOnlyCard = !valA && valBTrim;
          if (!hasValidA && !bOnlyCard) {
            continue;
          }
        }
        if (adminLawLearnAOnly) {
          const hasValidA = valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢';
          if (!hasValidA) continue;
        }

        if (content) {
          const trimmedContent = content.trim();
          const learnLinkKey = extractLearnLinkKey(trimmedContent);
          const displayContent = learnLinkKey ? stripLearnLinkTag(trimmedContent) : trimmedContent;

          if (!learnContent[currentSubject]) {
            learnContent[currentSubject] = [];
          }

          // Capping Kenpo at 231 items and avoiding leakage from other sheets（シート232行目相当の最終問を含む）
          if (currentSubject === '憲法') {
            if (t !== '憲法') continue; // Strict source control
            if (learnContent['憲法'].length >= 231) continue;
          } else if (currentSubject === '民法物権') {
            if (learnContent['民法物権'].length >= 105) continue;
          } else {
            // Original filters for other subjects, but relaxed for Bukken to keep Articls
            // 多肢選択系はA列そのまま採用（解説・条文などの語が本文に含まれても除外しない）
            // [[dict:…::…]] の説明文に「解説」が入りがちなので、辞典タグ付き行は除外しない
            // 「説明」は除外キーに含めない（説明義務・説明して等の本文まで落ちるため）
            const valCLex = row[2] != null ? String(row[2]).trim() : '';
            const hasLexiconTag =
              trimmedContent.includes('[[dict:') || parseLexiconPairsFromCell(valCLex).length > 0;
            if (currentSubject !== '民法物権' && !tashiLearnSubject && !hasLexiconTag && !isAdminLawLearnSubject && currentSubject !== '商法・会社法') {
              if (
                trimmedContent.includes('条文') ||
                trimmedContent.includes('解説') ||
                trimmedContent.includes('資料')
              ) {
                if (i > 10) continue;
              }
            }

            if (
              trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' ||
              trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)
            ) {
              continue;
            }
          }

          if (!learnDeepDive[currentSubject]) learnDeepDive[currentSubject] = [];
          const sheetRowNum = i + 2;
          let deepPush = usedBAsMainBody
            ? (row[0] && String(row[0]).trim() ? String(row[0]).trim() : '')
            : currentSubject === '民法物権'
              ? row[1]
                ? fmtCell('B', row[1], sheetRowNum)
                : ''
              : currentGroupHasDeepDive
                ? currentGroupDeepDiveContent
                : row[1]
                  ? fmtCell('B', row[1], sheetRowNum)
                  : '';
          if (adminLawLearnAOnly && !String(deepPush || '').trim() && currentGroupMDeepDiveContent) {
            deepPush = currentGroupMDeepDiveContent;
          } else if (adminLawLearnAOnly && !String(deepPush || '').trim() && row[12]) {
            deepPush = fmtCell('M', row[12], sheetRowNum);
          }
          learnDeepDive[currentSubject].push(deepPush);
          const fPush = usedBAsMainBody
            ? row[5]
              ? fmtCell('F', row[5], sheetRowNum)
              : ''
            : currentSubject === '民法物権'
              ? row[5]
                ? fmtCell('F', row[5], sheetRowNum)
                : ''
              : currentGroupHasDeepDive
                ? currentGroupFExplain
                : row[5]
                  ? fmtCell('F', row[5], sheetRowNum)
                  : '';
          if (!learnFExplain[currentSubject]) learnFExplain[currentSubject] = [];
          learnFExplain[currentSubject].push(fPush);
          if (!learnStatuteRefs[currentSubject]) learnStatuteRefs[currentSubject] = [];
          const statutePush = adminLawLearnAOnly
            ? currentGroupStatuteRefContent ||
              (row[8] ? fmtCell('I', row[8], sheetRowNum) : '')
            : '';
          learnStatuteRefs[currentSubject].push(statutePush);
          const valCLexPush = row[2] != null ? String(row[2]).trim() : '';
          const contentFinal = applyLexiconColumn(displayContent, valCLexPush);
          const pushedIndex = learnContent[currentSubject].length;
          learnContent[currentSubject].push(typeof contentFinal === 'string' ? contentFinal : String(contentFinal));
          if (!learnSource[currentSubject]) learnSource[currentSubject] = [];
          learnSource[currentSubject].push(title);
          if (learnLinkKey) {
            if (!learnLinks[learnLinkKey]) learnLinks[learnLinkKey] = [];
            learnLinks[learnLinkKey].push({
              subject: currentSubject,
              index: pushedIndex,
              source: title,
            });
          }
        }
      }
    }
  }

  // LEARN_DEEPDIVE が LEARN_CONTENT より短いと、末尾カードで deepdive が undefined になる
  for (const key of Object.keys(learnContent)) {
    const c = learnContent[key];
    const d = learnDeepDive[key];
    if (!Array.isArray(c) || !Array.isArray(d)) continue;
    while (d.length < c.length) {
      d.push('');
    }
    if (!learnFExplain[key]) learnFExplain[key] = [];
    const f = learnFExplain[key];
    while (f.length < c.length) {
      f.push('');
    }
    if (!learnStatuteRefs[key]) learnStatuteRefs[key] = [];
    const s = learnStatuteRefs[key];
    while (s.length < c.length) {
      s.push('');
    }
  }

  // Write to src/learn.js
  const fileContent = `export const LEARN_CONTENT = ${JSON.stringify(learnContent, null, 2)};\nexport const LEARN_DEEPDIVE = ${JSON.stringify(learnDeepDive, null, 2)};\nexport const LEARN_F_EXPLAIN = ${JSON.stringify(learnFExplain, null, 2)};\nexport const LEARN_STATUTE_REFS = ${JSON.stringify(learnStatuteRefs, null, 2)};\nexport const LEARN_SOURCE = ${JSON.stringify(learnSource, null, 2)};\nexport const LEARN_LINKS = ${JSON.stringify(learnLinks, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`learn.js synced successfully to ${OUTPUT_FILE}`);
}

sync();
