/**
 * 国家賠償法・4コマ漫画を2段階で生成:
 *   1) Gemini Pro で M列 → 画像生成用プロンプトへ変換
 *   2) Gemini Pro Image + 参照画像でカラー4コマ生成
 *
 *   node scripts/generateComic4KokubaiGemini.mjs --question 1 --choice 2
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { SUBJECTS } from '../src/questions.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const STYLE_REF = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'kokubai', '20-1-1.png');

const PROMPT_MODEL = 'gemini-2.5-pro';
const IMAGE_MODELS = [
  'gemini-3-pro-image-preview',
  'gemini-2.5-flash-image',
];

function isKoma4(text) {
  const t = (text || '').trim();
  if (!t) return false;
  const has = (n) => new RegExp(`【${n}コマ目[^】]*】|${n}コマ目`).test(t);
  return has(1) && has(2) && has(3) && has(4);
}

function extractKomaBlock(body) {
  const start = body.search(/【1コマ目/);
  const end = body.search(/②\s*重要論点|②重要論点/);
  const block = start >= 0 ? body.slice(start, end > start ? end : undefined) : body;
  return block.trim();
}

function extractCaseTitle(body) {
  const m = body.match(/^(.+?)について解説/);
  return m ? m[1].trim() : '';
}

function pickKokubaiJob(questionNum1, choiceNum1) {
  const qs = SUBJECTS['行政法']?.['国家賠償法・損失訴訟'];
  if (!Array.isArray(qs)) return null;
  const qi = questionNum1 - 1;
  if (qi < 0 || qi >= qs.length) return null;
  const dd = qs[qi].choiceDeepDive || [];
  const ci = choiceNum1 - 1;
  if (ci < 0 || ci >= dd.length || !isKoma4(dd[ci])) return null;
  return {
    questionNum: questionNum1,
    totalQuestions: qs.length,
    choiceNum: choiceNum1,
    body: dd[ci],
    komaBlock: extractKomaBlock(dd[ci]),
    caseTitle: extractCaseTitle(dd[ci]),
  };
}

async function geminiGenerateContent(model, parts, config = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts }], generationConfig: config }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${model} ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

function extractText(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.filter((p) => p.text).map((p) => p.text).join('\n').trim();
}

function extractImageBuffer(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    const b64 = p.inlineData?.data || p.inline_data?.data;
    if (b64) return Buffer.from(b64, 'base64');
  }
  const block = data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason;
  throw new Error(`画像なし (${block || 'unknown'})`);
}

/** M列原文から画像内に出すべき漢字語を抽出（ひらがな化防止用） */
function extractKanjiTerms(text) {
  const raw = (text || '').match(/[\u4e00-\u9faf々]{2,}/g) || [];
  const skip = new Set(['コマ目', '重要論点', 'ストーリー', '解説', '判例', '問題', '正解', '選択肢']);
  return [...new Set(raw.filter((w) => !skip.has(w)))].slice(0, 50);
}

const HIRAGANA_MISTAKE_EXAMPLES = [
  '指定都市→していとし',
  '付議→ふぎ',
  '議員数→ぎいんすう',
  '却下→きゃっか',
  '確定日→かくていび',
  '地方公共団体→ちほうこうきょう',
];

/** Step 1: M列4コマ文 → 画像生成用プロンプト（正確な日本語テキスト付き） */
async function buildImagePromptViaLlm(job, refB64) {
  const kanjiTerms = extractKanjiTerms(job.komaBlock);
  const kanjiNote = kanjiTerms.length
    ? `\n【漢字で描く語（原文より・ひらがな化禁止）】\n${kanjiTerms.join('、')}`
    : '';
  const system = `あなたは日本の行政書士試験向け「4コマ解説漫画」の画像生成プロンプト作家です。
入力された判例ストーリーを、画像AI向けの詳細プロンプト（日本語）に変換してください。

【必須ルール】
- 出力は画像生成AIにそのまま渡す「1つのプロンプト本文」のみ。前置き・解説・コードブロックは禁止。
- レイアウトは必ず「1枚の画像・2行×2列・合計4コマのみ」。5コマ以上禁止。
- 各コマ左上に大きく「①」「②」「③」「④」の丸数字ラベル（または「1コマ目」〜「4コマ目」）を描く指示を入れる。
- 各コマ上部に短い見出し（日本語10字前後）。
- 吹き出しのセリフは各コマ1〜2個、各15〜35字。正しい日本語。漢字の捏造・文字化け禁止。
- 原文にない法律用語（例: 指定都市）を勝手に追加しない。自治体は「〇〇市」「市役所」等の平易な表記でよい。
- 漢字語は必ず正しい字形で描く指示を入れる（例: ${HIRAGANA_MISTAKE_EXAMPLES.slice(0, 3).join('、')} 等は絶対禁止）。
- カラー漫画（白背景、清潔なデジタル漫画、参照画像と同系統の教育漫画トーン）。
- 添付参照画像は画風・レイアウト・文字量の参考。ストーリー内容は入力テキストに従い別案件として描く。
- 4コマ目は最高裁の判断。必要なら赤1点のアクセント（×印や強調）。
- プロンプト内に「描くべき日本語テキスト」をコマごとに引用符で明示すること（見出し・吹き出し・効果音を分ける）。

【出力フォーマット例】
タイトル（画像上部中央）: 「…」
全体: カラー4コマ漫画、2×2グリッド、…
①（左上）見出し「…」 シーン: … 吹き出し「…」
②（右上）…
③（左下）…
④（右下）…`;

  const user = `判例: ${job.caseTitle}

以下が4コマ解説の原文です。これを画像生成用プロンプトに変換してください。

${job.komaBlock}${kanjiNote}`;

  const data = await geminiGenerateContent(PROMPT_MODEL, [
    { inline_data: { mime_type: 'image/png', data: refB64 } },
    { text: system + '\n\n' + user },
  ], {
    temperature: 0.4,
    maxOutputTokens: 4096,
  });

  const prompt = extractText(data);
  if (!prompt || prompt.length < 200) {
    throw new Error('プロンプト生成が短すぎます');
  }
  return prompt;
}

/** Step 2: プロンプト + 参照画像 → カラー4コマ生成 */
async function generateImage(model, imagePrompt, refB64, kanjiTerms = []) {
  const kanjiGuard = kanjiTerms.length
    ? `- 次の語は必ず漢字表記: ${kanjiTerms.join('、')}`
    : '';
  const guard = [
    imagePrompt,
    '',
    '【画像生成の最終指示】',
    '- 上記プロンプトどおり、ちょうど4コマ（2×2）のみ。',
    '- ①②③④（または1〜4コマ目）の番号を各コマに大きく表示。',
    '- 記載した日本語テキストを一字一句正確に描く。意味不明な文字・英字混在禁止。',
    kanjiGuard,
    `- 漢字をひらがなに化したり誤字にしたりしない（禁止例: ${HIRAGANA_MISTAKE_EXAMPLES.join('、')}）。`,
    '- 原文にない語句を看板・ラベルに追加しない。',
    '- カラー。白背景の教育漫画。',
    '- 参照画像の画風に合わせるが、ストーリーはプロンプトの別判例。',
  ].join('\n');

  const data = await geminiGenerateContent(model, [
    { inline_data: { mime_type: 'image/png', data: refB64 } },
    { text: guard },
  ], {
    responseModalities: ['TEXT', 'IMAGE'],
  });

  return extractImageBuffer(data);
}

function parseArg(name, fallback) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return parseInt(process.argv[i + 1], 10);
}

function listMissingJobs(limit = Infinity, overwrite = false) {
  const qs = SUBJECTS['行政法']?.['国家賠償法・損失訴訟'];
  if (!Array.isArray(qs)) return [];
  const total = qs.length;
  const outDir = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'kokubai');
  const assetDir = path.join(ROOT, 'assets', 'images', 'deepdive', 'gyouseihou', 'kokubai');
  const existing = new Set([
    ...(fs.existsSync(outDir) ? fs.readdirSync(outDir) : []),
    ...(fs.existsSync(assetDir) ? fs.readdirSync(assetDir) : []),
  ]);
  const jobs = [];
  for (let qi = 0; qi < qs.length; qi++) {
    const dd = qs[qi].choiceDeepDive || [];
    for (let ci = 0; ci < dd.length; ci++) {
      if (!isKoma4(dd[ci])) continue;
      const base = `${total}-${qi + 1}-${ci + 1}`;
      const has =
        !overwrite &&
        (existing.has(`${base}.png`) ||
          existing.has(`${base}-comic4trial-gemini.png`));
      if (has) continue;
      jobs.push(pickKokubaiJob(qi + 1, ci + 1));
      if (jobs.length >= limit) return jobs;
    }
  }
  return jobs;
}

async function runOneJob(job, refB64) {
  const baseName = `${job.totalQuestions}-${job.questionNum}-${job.choiceNum}`;
  const outDir = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'kokubai');
  const outPath = path.join(outDir, `${baseName}-comic4trial-gemini.png`);
  const canonPath = path.join(outDir, `${baseName}.png`);

  console.log(`\n国家賠償法 問${job.questionNum} 肢${job.choiceNum} (${job.caseTitle})`);

  console.log('--- Step 1: 画像生成プロンプト作成 ---');
  const kanjiTerms = extractKanjiTerms(job.komaBlock);
  const imagePrompt = await buildImagePromptViaLlm(job, refB64);
  console.log(`✓ ${PROMPT_MODEL} (${imagePrompt.length} 文字)`);

  console.log('--- Step 2: 画像生成 ---');
  let lastErr;
  for (const model of IMAGE_MODELS) {
    try {
      console.log(`試行: ${model}…`);
      const buf = await generateImage(model, imagePrompt, refB64, kanjiTerms);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, buf);
      fs.copyFileSync(outPath, canonPath);
      console.log(`✓ 成功 ${(buf.length / 1024).toFixed(1)} KB → ${path.relative(ROOT, outPath)}`);
      console.log(`  正規名: ${path.relative(ROOT, canonPath)}`);
      return true;
    } catch (e) {
      lastErr = e;
      console.warn(`✗ ${e.message}`);
      if (String(e.message).includes('429')) {
        await new Promise((r) => setTimeout(r, 30000));
      }
    }
  }
  throw lastErr || new Error('全モデル失敗');
}

async function main() {
  if (!GEMINI_KEY) {
    console.error('GEMINI_API_KEY / EXPO_PUBLIC_GEMINI_API_KEY がありません');
    process.exit(1);
  }
  if (!fs.existsSync(STYLE_REF)) {
    console.error('参照画像がありません:', STYLE_REF);
    process.exit(1);
  }

  const refB64 = fs.readFileSync(STYLE_REF).toString('base64');
  console.log('参照:', path.relative(ROOT, STYLE_REF));

  const count = parseArg('--count', 0);
  const all = process.argv.includes('--all');
  const overwrite = process.argv.includes('--overwrite');
  if (all || count > 0) {
    const jobs = listMissingJobs(all ? Infinity : count, overwrite);
    if (jobs.length === 0) {
      console.log('未生成の4コマ深掘りはありません');
      return;
    }
    console.log(`バッチ: ${jobs.length} 件`);
    let ok = 0;
    for (const job of jobs) {
      try {
        await runOneJob(job, refB64);
        ok++;
        await new Promise((r) => setTimeout(r, 5000));
      } catch (e) {
        console.error(`問${job.questionNum} 肢${job.choiceNum} 失敗:`, e.message);
      }
    }
    console.log(`\n完了: ${ok}/${jobs.length}`);
    return;
  }

  const qNum = parseArg('--question', 1);
  const cNum = parseArg('--choice', 2);
  const job = pickKokubaiJob(qNum, cNum);
  if (!job) {
    console.error(`問${qNum} 肢${cNum} に4コマ深掘りがありません`);
    process.exit(1);
  }
  await runOneJob(job, refB64);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
