import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const slug = process.argv[2] || 'goukaku-kakumei-moshi-2026-07-05';
const questionJsonPath = path.join(ROOT, 'data', 'moshi', `${slug}-question-transcript.json`);
const answerJsonPath = path.join(ROOT, 'data', 'moshi', `${slug}-answer-key-candidates.json`);
const outPath = path.join(ROOT, 'data', 'moshi', `${slug}-ocr-workbench.md`);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function rel(filePath) {
  return path.relative(ROOT, filePath);
}

function normalizeSlash(value) {
  return String(value || '').replace(/\\/g, '/');
}

function questionImagePath(sourceImage) {
  const base = String(sourceImage || '');
  const dir = path.join(ROOT, 'app', 'textbook', '模試元画像', '合格１');
  const candidates = ['.jpg', '.jpeg', '.png', '.webp'].map((ext) => path.join(dir, `${base}${ext}`));
  return candidates.find((candidate) => fs.existsSync(candidate)) || path.join(dir, base);
}

function highResQuestionImagePath(pageIndex, sourceImage) {
  const page = String(pageIndex).padStart(3, '0');
  const dir = path.join(ROOT, 'app', 'textbook', '模試元画像_高解像度OCR用', '合格１');
  const candidates = ['.png', '.jpg', '.jpeg', '.webp'].map((ext) => path.join(dir, `${page}-${sourceImage}${ext}`));
  return candidates.find((candidate) => fs.existsSync(candidate)) || path.join(dir, `${page}-${sourceImage}.png`);
}

function qualityFlags(page) {
  const flags = [];
  const text = String(page.text || '');
  if (text.length < 500) flags.push('short_text');
  if (!page.questionIds?.length) flags.push('question_id_missing');
  if (/[0０]{4,}|月\s*ャ|き\s*ユ|罅|爨|鸚|澀/.test(text)) flags.push('ocr_noise');
  if (page.pageIndex === 31) flags.push('manual_reocr_failed');
  return flags;
}

function answerLabel(answerMap, id) {
  const item = answerMap?.[String(id)];
  if (!item) return '未抽出';
  return `${item.answer} / ${item.confidence} / ${item.sourceFile}`;
}

const questionPayload = readJson(questionJsonPath);
const answerPayload = fs.existsSync(answerJsonPath) ? readJson(answerJsonPath) : null;
const answerMap = answerPayload?.answerMap || {};

const lowQualityPages = questionPayload.pages
  .map((page) => ({ page, flags: qualityFlags(page) }))
  .filter((item) => item.flags.length > 0);

const detectedQuestionIds = [...new Set(questionPayload.pages.flatMap((page) => page.questionIds || []))].sort(
  (a, b) => a - b,
);

const lines = [];
lines.push('---');
lines.push(`id: data/moshi/${slug}-ocr-workbench`);
lines.push('type: moshi-ocr-workbench');
lines.push('examId: 合格１');
lines.push('status: ocr_workbench_needs_manual_review');
lines.push('---');
lines.push('');
lines.push('# 合格革命 模擬試験 合格1 OCR作業台');
lines.push('');
lines.push('問題画像と解答解説画像のOCR結果を、確認・修正しやすいように束ねた作業用Markdown。アプリ投入用ではなく、文字起こしと人間確認を進めるための中間成果。');
lines.push('');
lines.push('## 入力と出力');
lines.push('');
lines.push(`- 問題OCR JSON: \`${normalizeSlash(rel(questionJsonPath))}\``);
lines.push(`- 解答候補 JSON: \`${normalizeSlash(rel(answerJsonPath))}\``);
lines.push(`- 問題OCR入力: \`${normalizeSlash(questionPayload.inputDir)}\``);
lines.push(`- このMarkdown: \`${normalizeSlash(rel(outPath))}\``);
lines.push('');
lines.push('## OCR状況');
lines.push('');
lines.push(`- 問題ページ: ${questionPayload.counts.pages}`);
lines.push(`- 問題番号検出ページ: ${questionPayload.counts.pagesWithQuestionIds}`);
lines.push(`- 検出問番号: ${detectedQuestionIds.join(', ') || 'なし'}`);
if (answerPayload) {
  lines.push(`- 解答候補抽出: ${answerPayload.counts.selectedAnswers}`);
  lines.push(`- high / medium / low: ${answerPayload.counts.highConfidence} / ${answerPayload.counts.mediumConfidence} / ${answerPayload.counts.lowConfidence}`);
  lines.push(`- 未抽出の5肢択一候補: ${answerPayload.missingSimpleQuestionIds.join(', ') || 'なし'}`);
}
lines.push('');
lines.push('## 優先確認ページ');
lines.push('');
lines.push('| OCRページ | 元画像 | フラグ | 文字数 | 検出問番号 |');
lines.push('|---:|---|---|---:|---|');
for (const { page, flags } of lowQualityPages) {
  lines.push(
    `| ${page.pageIndex} | \`${page.sourceImage}\` | ${flags.join(', ')} | ${String(page.text || '').length} | ${(page.questionIds || []).join(', ') || '未検出'} |`,
  );
}
lines.push('');
lines.push('## ページ別文字起こし');
for (const page of questionPayload.pages) {
  const ids = page.questionIds?.length ? page.questionIds.join(', ') : '未検出';
  const flags = qualityFlags(page);
  const imagePath = questionImagePath(page.sourceImage);
  const highResPath = highResQuestionImagePath(page.pageIndex, page.sourceImage);
  lines.push('');
  lines.push(`### OCRページ${page.pageIndex}: ${page.sourceImage}`);
  lines.push('');
  lines.push(`- 元画像: \`${normalizeSlash(rel(imagePath))}\``);
  lines.push(`- 高解像度OCR用: \`${normalizeSlash(rel(highResPath))}\``);
  lines.push(`- OCRファイル: \`${normalizeSlash(page.ocrFile)}\``);
  lines.push(`- 検出問番号: ${ids}`);
  lines.push(`- 科目推定: ${page.subject}`);
  lines.push(`- 品質フラグ: ${flags.length ? flags.join(', ') : 'なし'}`);
  if (page.questionIds?.length) {
    lines.push(`- 解答候補: ${page.questionIds.map((id) => `問${id}=${answerLabel(answerMap, id)}`).join(' / ')}`);
  }
  lines.push('');
  lines.push('```text');
  lines.push(page.text || '（OCRテキストなし）');
  lines.push('```');
}

if (answerPayload) {
  lines.push('');
  lines.push('## 解答候補一覧');
  lines.push('');
  lines.push('| 問 | 候補 | 確信度 | 根拠ファイル | 理由 |');
  lines.push('|---:|:---:|---|---|---|');
  for (const id of Object.keys(answerMap).map(Number).sort((a, b) => a - b)) {
    const item = answerMap[String(id)];
    lines.push(`| ${id} | ${item.answer} | ${item.confidence} | \`${item.sourceFile}\` | ${item.reason} |`);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      outPath: rel(outPath),
      pages: questionPayload.counts.pages,
      lowQualityPages: lowQualityPages.length,
      answerCandidates: answerPayload?.counts?.selectedAnswers || 0,
    },
    null,
    2,
  ),
);
