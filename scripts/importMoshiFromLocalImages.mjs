import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const QUESTION_ROOT = path.join(ROOT, 'app', 'textbook', '模試元画像');
const ANSWER_ROOT = path.join(ROOT, 'app', 'textbook', '模試解答');
const OUTPUT_ROOT = path.join(ROOT, 'tmp', 'moshi-ocr');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function parseArgs(argv) {
  const args = {
    examId: argv.find((arg) => !arg.startsWith('--')) || 'TAC2',
    limit: 0,
    questionsOnly: false,
    answersOnly: false,
  };

  for (const arg of argv) {
    if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length)) || 0;
    if (arg === '--questions-only') args.questionsOnly = true;
    if (arg === '--answers-only') args.answersOnly = true;
  }

  return args;
}

async function listImages(dir, limit) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => path.join(dir, entry.name))
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b), 'ja'));
    return limit > 0 ? files.slice(0, limit) : files;
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

function compactOcrText(text) {
  return String(text || '')
    .replace(/\u000c/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

function toHalfWidthNumber(value) {
  const normalized = String(value || '').replace(/[０-９]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );
  const n = Number.parseInt(normalized, 10);
  return Number.isFinite(n) ? n : 0;
}

function normalizeAnswer(value) {
  const map = {
    '１': '1',
    '２': '2',
    '３': '3',
    '４': '4',
    '５': '5',
    ア: '1',
    イ: '2',
    ウ: '3',
    エ: '4',
    オ: '5',
  };
  return map[value] || value;
}

function parseAnswers(text) {
  const answers = {};
  const lines = String(text || '').split(/\n+/);
  const answerLine = /(?:問|問題)?\s*([0-9０-９]{1,2})\s*(?:の)?\s*(?:正解|解答|答え|答)\s*[:：]?\s*([1-5１-５ア-オ])/;
  const compactLine = /^\s*([0-9０-９]{1,2})\s*[:：.)、]\s*([1-5１-５ア-オ])\s*$/;

  for (const line of lines) {
    const match = line.match(answerLine) || line.match(compactLine);
    if (!match) continue;
    const id = toHalfWidthNumber(match[1] || '');
    const answer = normalizeAnswer(match[2] || '');
    if (id > 0 && id <= 60 && /^[1-5]$/.test(answer)) answers[id] = answer;
  }
  return answers;
}

function splitQuestions(text, answers) {
  const source = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const matches = [...source.matchAll(/(?:^|\n)\s*(?:問|問題)\s*([0-9０-９]{1,2})\s*[.)、：:]?/g)];
  return matches
    .map((match, index) => {
      const id = toHalfWidthNumber(match[1] || '');
      const start = match.index || 0;
      const next = matches[index + 1]?.index ?? source.length;
      const body = source
        .slice(start, next)
        .replace(/^\s*(?:問|問題)\s*[0-9０-９]{1,2}\s*[.)、：:]?/, '')
        .trim();
      return {
        id,
        text: body,
        answer: answers[id],
        source: 'local-ocr',
      };
    })
    .filter((question) => question.id > 0 && question.id <= 60)
    .sort((a, b) => a.id - b.id);
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
    pages.push({ index: i + 1, file: name, text });
    rawChunks.push(`\n\n<!-- ${kind} page ${i + 1}: ${name} -->\n\n${text}`);
    await fs.writeFile(path.join(outputDir, `${kind}-${String(i + 1).padStart(3, '0')}.txt`), text, 'utf8');
  }

  return {
    pages,
    text: rawChunks.join('\n').trim(),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const questionDir = path.join(QUESTION_ROOT, args.examId);
  const answerDir = path.join(ANSWER_ROOT, args.examId);
  const outputDir = path.join(OUTPUT_ROOT, args.examId);
  await fs.mkdir(outputDir, { recursive: true });

  const questionFiles = args.answersOnly ? [] : await listImages(questionDir, args.limit);
  const answerFiles = args.questionsOnly ? [] : await listImages(answerDir, args.limit);

  if (questionFiles.length === 0 && answerFiles.length === 0) {
    throw new Error(`画像が見つかりません: ${questionDir} / ${answerDir}`);
  }

  const questionOcr = questionFiles.length
    ? await recognizeImages(questionFiles, 'questions', outputDir)
    : { pages: [], text: '' };
  const answerOcr = answerFiles.length
    ? await recognizeImages(answerFiles, 'answers', outputDir)
    : { pages: [], text: '' };

  const answers = parseAnswers(`${questionOcr.text}\n${answerOcr.text}`);
  const questions = splitQuestions(questionOcr.text, answers);

  const payload = {
    examId: args.examId,
    createdAt: new Date().toISOString(),
    localOnly: true,
    sourceFolders: {
      questions: path.relative(ROOT, questionDir),
      answers: path.relative(ROOT, answerDir),
    },
    counts: {
      questionImages: questionFiles.length,
      answerImages: answerFiles.length,
      parsedQuestions: questions.length,
      parsedAnswers: Object.keys(answers).length,
    },
    questionOcrText: questionOcr.text,
    answerOcrText: answerOcr.text,
    questions,
    pages: {
      questions: questionOcr.pages.map(({ index, file }) => ({ index, file })),
      answers: answerOcr.pages.map(({ index, file }) => ({ index, file })),
    },
  };

  await fs.writeFile(path.join(outputDir, 'questions-ocr.txt'), questionOcr.text, 'utf8');
  await fs.writeFile(path.join(outputDir, 'answers-ocr.txt'), answerOcr.text, 'utf8');
  await fs.writeFile(path.join(outputDir, 'moshi-import.json'), JSON.stringify(payload, null, 2), 'utf8');

  console.log('\nDone.');
  console.log(`Output: ${path.relative(ROOT, outputDir)}`);
  console.log(JSON.stringify(payload.counts, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
