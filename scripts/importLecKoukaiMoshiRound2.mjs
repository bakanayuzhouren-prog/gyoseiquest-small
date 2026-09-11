/**
 * LEC全日本行政書士公開模試 第2回の解答画像OCR。
 * 問題画像と解答画像を問番号で対応。全文転載なし。
 *
 * Usage:
 *   powershell -File scripts/ocrWindowsMedia.ps1 -InputDir "app/模試画像/LEC公開２/解答" -OutputDir "tmp/moshi-ocr/lec-koukai-2026-round2/winocr"
 *   node scripts/importLecKoukaiMoshiRound2.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EXAM_ID = 'lec-koukai-2026-round2';
const ANSWER_DIR = path.join(ROOT, 'app', '模試画像', 'LEC公開２', '解答');
const OUTPUT_DIR = path.join(ROOT, 'tmp', 'moshi-ocr', EXAM_ID);
const WINOCR_DIR = path.join(OUTPUT_DIR, 'winocr');

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const files = (await fs.readdir(WINOCR_DIR)).filter((n) => n.endsWith('.txt') && n !== 'manifest.json').sort();
  if (files.length === 0) {
    throw new Error(`WinOCR結果がありません: ${WINOCR_DIR}`);
  }
  const pages = [];
  const chunks = [];
  for (let i = 0; i < files.length; i += 1) {
    const name = files[i];
    const text = (await fs.readFile(path.join(WINOCR_DIR, name), 'utf8')).replace(/\u000c/g, '').trim();
    const srcMatch = name.match(/^\d+-(.+)\.txt$/);
    const sourceFile = srcMatch ? `${srcMatch[1]}.jpg` : name;
    pages.push({
      index: i + 1,
      ocrFile: name,
      file: sourceFile,
      filePath: path.relative(ROOT, path.join(ANSWER_DIR, sourceFile)).replace(/\\/g, '/'),
      text,
    });
    chunks.push(`\n\n<!-- answers page ${i + 1}: ${sourceFile} -->\n\n${text}`);
  }
  const payload = {
    examId: EXAM_ID,
    title: '2026 全日本行政書士公開模試 第2回（LEC）',
    createdAt: new Date().toISOString(),
    sourceFolders: {
      answers: path.relative(ROOT, ANSWER_DIR).replace(/\\/g, '/'),
    },
    counts: {
      questionImages: 0,
      answerImages: pages.length,
    },
    answerOcrText: chunks.join('\n').trim(),
    pages: { questions: [], answers: pages },
  };
  await fs.writeFile(path.join(OUTPUT_DIR, 'answers-ocr.txt'), payload.answerOcrText, 'utf8');
  await fs.writeFile(path.join(OUTPUT_DIR, 'moshi-import.json'), JSON.stringify(payload, null, 2), 'utf8');
  console.log('Wrote', path.relative(ROOT, OUTPUT_DIR));
  console.log(JSON.stringify(payload.counts, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
