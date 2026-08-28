/**
 * LEC全日本行政書士公開模試（app/模試画像/LEC公開問題/）のOCR。
 * 問題文・解答を tmp/moshi-ocr/lec-koukai-2026-round1/ に出力。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EXAM_ID = 'lec-koukai-2026-round1';
const QUESTION_DIR = path.join(ROOT, 'app', '模試画像', 'LEC公開問題', '問題文');
const ANSWER_DIR = path.join(ROOT, 'app', '模試画像', 'LEC公開問題', '解答');
const OUTPUT_DIR = path.join(ROOT, 'tmp', 'moshi-ocr', EXAM_ID);
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp.jpg']);

function parseArgs(argv) {
  const args = { limit: 0, questionsOnly: false, answersOnly: false };
  for (const arg of argv) {
    if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length)) || 0;
    if (arg === '--questions-only') args.questionsOnly = true;
    if (arg === '--answers-only') args.answersOnly = true;
  }
  return args;
}

async function listImages(dir, limit) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((entry) => {
      if (!entry.isFile()) return false;
      const lower = entry.name.toLowerCase();
      return IMAGE_EXTENSIONS.has(path.extname(lower)) || lower.endsWith('.mp.jpg');
    })
    .map((entry) => path.join(dir, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), 'ja'));
  return limit > 0 ? files.slice(0, limit) : files;
}

function compactOcrText(text) {
  return String(text || '')
    .replace(/\u000c/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

async function recognizeImages(files, kind, outputDir) {
  const pages = [];
  const rawChunks = [];

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const name = path.basename(file);
    console.log(`[${kind}] OCR ${i + 1}/${files.length}: ${name}`);
    const result = await Tesseract.recognize(file, 'jpn', {
      logger: (message) => {
        if (message.status === 'recognizing text' && typeof message.progress === 'number') {
          process.stdout.write(`\r  ${Math.round(message.progress * 100)}%`);
        }
      },
    });
    process.stdout.write('\n');
    const text = compactOcrText(result?.data?.text || '');
    pages.push({ index: i + 1, file: name, filePath: path.relative(ROOT, file), text });
    rawChunks.push(`\n\n<!-- ${kind} page ${i + 1}: ${name} -->\n\n${text}`);
    await fs.writeFile(path.join(outputDir, `${kind}-${String(i + 1).padStart(3, '0')}.txt`), text, 'utf8');
  }

  return { pages, text: rawChunks.join('\n').trim() };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const payloadPath = path.join(OUTPUT_DIR, 'moshi-import.json');
  const previousPayload = await fs
    .readFile(payloadPath, 'utf8')
    .then((raw) => JSON.parse(raw))
    .catch(() => null);

  const questionFiles = args.answersOnly ? [] : await listImages(QUESTION_DIR, args.limit);
  const answerFiles = args.questionsOnly ? [] : await listImages(ANSWER_DIR, args.limit);

  if (questionFiles.length === 0 && answerFiles.length === 0) {
    throw new Error(`画像が見つかりません: ${QUESTION_DIR} / ${ANSWER_DIR}`);
  }

  const questionOcr = questionFiles.length
    ? await recognizeImages(questionFiles, 'questions', OUTPUT_DIR)
    : { pages: [], text: '' };
  const answerOcr = answerFiles.length
    ? await recognizeImages(answerFiles, 'answers', OUTPUT_DIR)
    : { pages: [], text: '' };

  const finalQuestionOcr =
    questionFiles.length > 0
      ? questionOcr
      : {
          pages: previousPayload?.pages?.questions || [],
          text: previousPayload?.questionOcrText || '',
        };
  const finalAnswerOcr =
    answerFiles.length > 0
      ? answerOcr
      : {
          pages: previousPayload?.pages?.answers || [],
          text: previousPayload?.answerOcrText || '',
        };

  const payload = {
    examId: EXAM_ID,
    title: '2026 全日本行政書士公開模試 第1回（LEC）',
    createdAt: new Date().toISOString(),
    sourceFolders: {
      questions: path.relative(ROOT, QUESTION_DIR),
      answers: path.relative(ROOT, ANSWER_DIR),
    },
    counts: {
      questionImages: finalQuestionOcr.pages.length,
      answerImages: finalAnswerOcr.pages.length,
    },
    questionOcrText: finalQuestionOcr.text,
    answerOcrText: finalAnswerOcr.text,
    pages: {
      questions: finalQuestionOcr.pages,
      answers: finalAnswerOcr.pages,
    },
  };

  if (questionFiles.length) {
    await fs.writeFile(path.join(OUTPUT_DIR, 'questions-ocr.txt'), finalQuestionOcr.text, 'utf8');
  }
  if (answerFiles.length) {
    await fs.writeFile(path.join(OUTPUT_DIR, 'answers-ocr.txt'), finalAnswerOcr.text, 'utf8');
  }
  await fs.writeFile(payloadPath, JSON.stringify(payload, null, 2), 'utf8');

  console.log('\nDone.');
  console.log(`Output: ${path.relative(ROOT, OUTPUT_DIR)}`);
  console.log(JSON.stringify(payload.counts, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
