/**
 * 国家賠償法・行政法総合から各1問、4コマ漫画を試生成。
 *
 *   node scripts/generateComic4Trial.mjs
 *   node scripts/generateComic4Trial.mjs --provider openai   # OPENAI_API_KEY 要
 *
 * 出力: temp_images/quiz/gyouseihou/{kokubai|sougou}/*-comic4trial.png
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { SUBJECTS } from '../src/questions.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const QUIZ_GYO = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou');

const OPENAI_KEY = process.env.OPENAI_API_KEY?.trim();
const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const providerArg = process.argv.includes('--provider')
  ? process.argv[process.argv.indexOf('--provider') + 1]
  : OPENAI_KEY
    ? 'openai'
    : 'gemini';

/** @returns {boolean} */
function isKoma4(text) {
  const t = (text || '').trim();
  if (!t) return false;
  const has = (n) =>
    new RegExp(`【${n}コマ目】|${n}コマ目`).test(t) ||
    new RegExp(`\\*\\*\\s*${n}[\\.．、:：]`).test(t);
  return has(1) && has(2) && has(3) && has(4);
}

/** @returns {string[]} */
function extractPanels(text) {
  const t = text.trim();
  /** @type {string[]} */
  const out = [];
  for (let n = 1; n <= 4; n++) {
    const patterns = [
      new RegExp(`【${n}コマ目[^】]*】\\s*([\\s\\S]*?)(?=【[1-4]コマ目|$)`),
      new RegExp(`${n}コマ目[^\\n]*\\n([\\s\\S]*?)(?=(?:[1-4]コマ目：)|$)`),
    ];
    let chunk = '';
    for (const re of patterns) {
      const m = t.match(re);
      if (m?.[1]?.trim()) {
        chunk = m[1].trim();
        break;
      }
    }
    out.push(chunk.replace(/\n+/g, ' ').slice(0, 280));
  }
  return out;
}

function pickFirstKoma4(field) {
  const qs = SUBJECTS['行政法']?.[field];
  if (!Array.isArray(qs)) return null;
  for (let qi = 0; qi < qs.length; qi++) {
    const dd = qs[qi].choiceDeepDive || [];
    for (let ci = 0; ci < dd.length; ci++) {
      if (!isKoma4(dd[ci])) continue;
      return {
        field,
        questionNum: qi + 1,
        totalQuestions: qs.length,
        choiceNum: ci + 1,
        body: dd[ci],
        panels: extractPanels(dd[ci]),
      };
    }
  }
  return null;
}

function buildPrompt(job) {
  const [p1, p2, p3, p4] = job.panels;
  return [
    '日本の行政書士試験向け判例解説、4コマ漫画1枚（2行×2列レイアウト）。',
    '左上=第1コマ、右上=第2コマ、左下=第3コマ、右下=第4コマ。各コマに細い枠線。',
    'フラットで読みやすいデジタルイラスト。白〜薄いグレー背景。手書き風禁止。',
    '各コマに短い日本語キャプション（2行以内）を入れる。',
    `第1コマ: ${p1}`,
    `第2コマ: ${p2}`,
    `第3コマ: ${p3}`,
    `第4コマ: ${p4}`,
  ].join('\n');
}

async function generateOpenAI(prompt) {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY が .env にありません');
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1024',
      quality: 'medium',
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('OpenAI: b64_json なし');
  return Buffer.from(b64, 'base64');
}

async function generateGemini(prompt, retries = 4) {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY / EXPO_PUBLIC_GEMINI_API_KEY がありません');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_KEY}`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: '1:1', personGeneration: 'dont_allow' },
      }),
    });
    if (res.status === 429 && attempt < retries) {
      const wait = 30 * (attempt + 1);
      console.log(`  rate limit — ${wait}s 待機…`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`Imagen ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const b64 = data.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error('Imagen: bytesBase64Encoded なし');
    return Buffer.from(b64, 'base64');
  }
  throw new Error('Imagen: retries exhausted');
}

function outputPath(job) {
  if (job.field === '国家賠償法・損失訴訟') {
    const name = `${job.totalQuestions}-${job.questionNum}-${job.choiceNum}-comic4trial.png`;
    return path.join(QUIZ_GYO, 'kokubai', name);
  }
  const name = `sougou${job.totalQuestions}-${job.questionNum}-${job.choiceNum}-comic4trial.png`;
  return path.join(QUIZ_GYO, 'sougou', name);
}

async function runJob(job, generate) {
  const out = outputPath(job);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const prompt = buildPrompt(job);
  console.log(`\n=== ${job.field} 問${job.questionNum} 肢${job.choiceNum} ===`);
  console.log('→', path.relative(ROOT, out));
  const buf = await generate(prompt);
  fs.writeFileSync(out, buf);
  console.log(`✓ ${(buf.length / 1024).toFixed(1)} KB (${providerArg})`);
  return out;
}

async function main() {
  const onlyField = process.argv.includes('--only')
    ? process.argv[process.argv.indexOf('--only') + 1]
    : null;
  let jobs = [
    pickFirstKoma4('国家賠償法・損失訴訟'),
    pickFirstKoma4('行政法総合'),
  ].filter(Boolean);
  if (onlyField === 'kokubai') jobs = jobs.filter((j) => j.field.includes('国家賠償'));
  if (onlyField === 'sougou') jobs = jobs.filter((j) => j.field.includes('行政法総合'));
  if (jobs.length === 0) {
    console.error('コマ分け問題が見つかりません');
    process.exit(1);
  }

  const generate = providerArg === 'openai' ? generateOpenAI : generateGemini;
  console.log(`Provider: ${providerArg}`);

  const written = [];
  for (const job of jobs) {
    written.push(await runJob(job, generate));
    await new Promise((r) => setTimeout(r, 2500));
  }

  console.log('\n完了:');
  for (const p of written) console.log(' ', p);
  console.log('\n反映: npm run sync:quiz-deepdive && npm run generate:deepdive-images');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
