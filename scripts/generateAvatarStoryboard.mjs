/**
 * アバター用キャラ絵コンテ（1キャラ）を Gemini 2段階で生成。
 *
 *   node scripts/generateAvatarStoryboard.mjs
 *   node scripts/generateAvatarStoryboard.mjs --char hero01
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const STYLE_REFS = [
  path.join(ROOT, 'assets', 'images', 'avatar_suit.png'),
  path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'kokubai', '20-1-2-comic4trial-gemini.png'),
].filter((p) => fs.existsSync(p));

const PROMPT_MODEL = 'gemini-2.5-pro';
const IMAGE_MODELS = ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'];

const CHAR_BRIEF = {
  hero01: {
    name: 'クエスト生（主人公）',
    concept: `行政書士試験を目指す若い学習者。アプリ「行政書士クエスト」のプレイヤーアバター基準キャラ。
性別: 男性（20代前半）。明るく真面目。既存アバター（添付参照）と同じフラットベクター調・丸顔アイコン向け。
髪: 短髪ネイビー。肌: 薄ベージュ。目はシンプルな点目。
世界観: 勉強×RPG。スーツ（試験本番）とカジュアル（自宅勉強）を将来量産予定。`,
  },
};

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
  return (data.candidates?.[0]?.content?.parts || [])
    .filter((p) => p.text)
    .map((p) => p.text)
    .join('\n')
    .trim();
}

function extractImageBuffer(data) {
  for (const p of data.candidates?.[0]?.content?.parts || []) {
    const b64 = p.inlineData?.data || p.inline_data?.data;
    if (b64) return Buffer.from(b64, 'base64');
  }
  throw new Error(`画像なし (${data.candidates?.[0]?.finishReason || 'unknown'})`);
}

function buildRefParts() {
  const parts = [];
  for (const refPath of STYLE_REFS) {
    parts.push({
      inline_data: {
        mime_type: 'image/png',
        data: fs.readFileSync(refPath).toString('base64'),
      },
    });
  }
  parts.push({
    text: '上記は画風参考（既存アバター・教育漫画）。同一トーンで新キャラを設計すること。',
  });
  return parts;
}

async function buildStoryboardPrompt(char) {
  const system = `あなたはゲームアバター向け「キャラクター設定絵コンテ」のプロンプト作家です。
映画の絵コンテのように、1枚の画像内に複数パネルでキャラデザインを提案する画像生成プロンプト（日本語）を書いてください。

【必須ルール】
- 出力は画像AIに渡すプロンプト本文のみ。解説・前置き禁止。
- 1枚・2行×3列＝6パネル（①〜⑥）。パネル数は6つのみ。
- 各パネル左上に大きく「①」〜「⑥」を表示する指示を入れる。
- カラー。白背景。フラットベクターイラスト（既存アバター参照と同系統・3D禁止・写実禁止）。
- 日本語ラベル（見出し・注釈）は短く正確に。文字化け禁止。
- 同一人物（同一顔・髪型）で描く。パネル間で顔が変わらないこと。

【6パネルの内容（固定）】
① 正面全身（立ち姿・基本デザイン）
② 斜め45度・上半身（表情：笑顔でやる気）
③ 斜め45度・上半身（表情：真剣・勉強中）
④ 持ち物アイテム（六法全書・蛍光ペン・タブレット）を並べた設定画
⑤ コスチューム案A：スーツ（試験本番）
⑥ コスチューム案B：カジュアル（パーカー＋ヘッドホン）

画像上部中央にタイトル「${char.name} 設定絵コンテ」を入れる指示も含める。`;

  const user = `【キャラ設定】\n${char.concept}`;

  const data = await geminiGenerateContent(
    PROMPT_MODEL,
    [...buildRefParts(), { text: system + '\n\n' + user }],
    { temperature: 0.5, maxOutputTokens: 4096 },
  );

  const prompt = extractText(data);
  if (prompt.length < 200) throw new Error('絵コンテプロンプトが短すぎます');
  return prompt;
}

async function generateStoryboardImage(imagePrompt) {
  const guard = [
    imagePrompt,
    '',
    '【最終指示】',
    '- ちょうど6パネル（2行×3列）。①〜⑥を各パネルに大きく表示。',
    '- 同一キャラクター。正しい日本語ラベルのみ。',
    '- カラー。絵コンテ・設定集の体裁。ゲームアバター設計用。',
  ].join('\n');

  let lastErr;
  for (const model of IMAGE_MODELS) {
    try {
      const data = await geminiGenerateContent(
        model,
        [...buildRefParts(), { text: guard }],
        { responseModalities: ['TEXT', 'IMAGE'] },
      );
      return { buf: extractImageBuffer(data), model };
    } catch (e) {
      lastErr = e;
      console.warn(`✗ ${model}: ${e.message}`);
    }
  }
  throw lastErr || new Error('画像生成失敗');
}

async function main() {
  if (!GEMINI_KEY) {
    console.error('GEMINI_API_KEY / EXPO_PUBLIC_GEMINI_API_KEY がありません');
    process.exit(1);
  }

  const charId = process.argv.includes('--char')
    ? process.argv[process.argv.indexOf('--char') + 1]
    : 'hero01';
  const char = CHAR_BRIEF[charId];
  if (!char) {
    console.error(`未知のキャラ: ${charId}`);
    process.exit(1);
  }

  const outDir = path.join(ROOT, 'temp_images', 'avatar');
  const outPath = path.join(outDir, `${charId}-storyboard-gemini.png`);

  console.log(`キャラ: ${char.name}`);
  console.log('参照:', STYLE_REFS.map((p) => path.relative(ROOT, p)).join(', '));

  console.log('\n--- Step 1: 絵コンテプロンプト生成 ---');
  const imagePrompt = await buildStoryboardPrompt(char);
  console.log(`✓ ${PROMPT_MODEL} (${imagePrompt.length} 文字)`);

  console.log('--- Step 2: 絵コンテ画像生成 ---');
  const { buf, model } = await generateStoryboardImage(imagePrompt);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`✓ ${model} ${(buf.length / 1024).toFixed(1)} KB`);
  console.log('→', path.relative(ROOT, outPath));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
