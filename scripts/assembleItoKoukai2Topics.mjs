/**
 * 伊藤塾公開Ⅱの抽出JSON（tmp）を論点正本へまとめる。
 * 原文の問題文は載せない。確度の低い問は needs_review。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const extractDir = path.join(root, 'tmp/moshi-ocr/ito-juku-koukai-2026-round2/extract');
const outJson = path.join(root, 'data/moshi/ito-juku-koukai-2026-round2-topics.json');
const outGrade = path.join(root, 'data/moshi/ito-juku-koukai-2026-round2-ai-answers.md');

const LEARN = new Set([
  '基礎法学',
  '憲法',
  '行政法総論',
  '行政手続法',
  '行政不服審査法',
  '行政事件訴訟法',
  '国家賠償法',
  '地方自治法',
  '行政法総合',
  '民法総則',
  '民法物権',
  '債権総論',
  '債権各論',
  '家族法',
  '商法・会社法',
  '基礎知識',
  '多肢選択憲法',
  '多肢選択行政法',
  '行政法記述',
  '民法記述',
  '個人情報',
  '行政書士法',
  '住民基本台帳法',
  '戸籍法',
]);

function rank(item) {
  const status = item.status === 'confirmed' ? 2 : 0;
  const conf = item.confidence === 'high' ? 2 : item.confidence === 'medium' ? 1 : 0;
  const hasAnswer = item.correctAnswer ? 1 : 0;
  return status * 10 + conf * 3 + hasAnswer;
}

function cleanText(value) {
  return String(value || '')
    .replace(/[：＝×／]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadBatches() {
  if (!fs.existsSync(extractDir)) return [];
  return fs
    .readdirSync(extractDir)
    .filter((name) => /^batch\d+\.json$/.test(name))
    .sort()
    .flatMap((name) => {
      const raw = fs.readFileSync(path.join(extractDir, name), 'utf8').replace(/^\uFEFF/, '');
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) throw new Error(`${name} is not an array`);
      return data.map((item) => ({ ...item, _batch: name }));
    });
}

function imagePath(item) {
  const file = String(item.imageFile || '').trim();
  if (!file) return '';
  return `app/模試画像/伊藤塾公開２/問題/${file.replace(/^.*[\\/]/, '')}`;
}

function toTopic(item) {
  const n = Number(item.questionNumber);
  const learnSubject = LEARN.has(item.learnSubject) ? item.learnSubject : '基礎知識';
  const status = item.status === 'confirmed' && item.correctAnswer ? 'confirmed' : 'needs_review';
  const slug = String(item.slug || 'topic')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 40) || 'topic';
  const idNum = Number.isFinite(n) ? String(n).padStart(2, '0') : 'xx';
  const practice = item.practiceQuestion;
  const practiceOk =
    practice &&
    Array.isArray(practice.choices) &&
    practice.choices.length >= 2 &&
    Number.isInteger(practice.answer) &&
    practice.answer >= 0 &&
    practice.answer < practice.choices.length;

  return {
    id: `ito2-q${idNum}-${slug}`,
    questionNumber: Number.isFinite(n) ? n : null,
    subject: item.quizSubject || learnSubject,
    field: item.field || learnSubject,
    learnSubject,
    quizSubject: item.quizSubject || '基礎知識',
    quizField: item.quizField || learnSubject,
    topic: cleanText(item.topic) || '要確認',
    aim: cleanText(item.aim),
    rule: cleanText(item.rule),
    trap: cleanText(item.trap),
    references: Array.isArray(item.references) ? item.references.map((r) => String(r)) : [],
    memory: cleanText(item.memory),
    deepDive: String(item.deepDive || '').trim(),
    practiceQuestion: practiceOk
      ? {
          prompt: String(practice.prompt || '').trim(),
          choices: practice.choices.map((c) => String(c).trim()),
          answer: practice.answer,
          explanation: String(practice.explanation || '').trim(),
        }
      : undefined,
    emitBonus: status === 'confirmed' && practiceOk && item.askType !== 'descriptive',
    sourceTrace: {
      questionImage: imagePath(item),
      answerSource: `伊藤塾公開模試Ⅱ・問${Number.isFinite(n) ? n : '?'}・AI判断${item.correctAnswer ? `・肢${item.correctAnswer}` : '・要確認'}`,
      sourceCorrectAnswer: item.correctAnswer ? Number(item.correctAnswer) : null,
      correctLabel: item.correctLabel || '',
      askType: item.askType || '',
      confidence: item.confidence || 'low',
      choiceVerdicts: Array.isArray(item.choiceVerdicts) ? item.choiceVerdicts : [],
      answerDraft: item.answerDraft || '',
      note: '解説冊子未着。正解は法令照合のAI判断。',
    },
    status,
  };
}

function gradingMarkdown(topics) {
  const lines = [
    '# 伊藤塾公開模試Ⅱ AI正解案',
    '',
    '解説冊子と本人のマークは未着。ここは法令照合の正解案であり、得点ではない。',
    '確度が低い問は要確認。解説画像が来たら番号を確定する。',
    '',
    '| 問 | 科目 | 論点 | AI正解 | 確度 | 状態 |',
    '|---|---|---|---|---|---|',
  ];
  const sorted = [...topics].sort((a, b) => (a.questionNumber || 99) - (b.questionNumber || 99));
  for (const t of sorted) {
    const ans = t.sourceTrace.sourceCorrectAnswer
      ? `${t.sourceTrace.sourceCorrectAnswer}${t.sourceTrace.correctLabel ? `（${t.sourceTrace.correctLabel}）` : ''}`
      : '要確認';
    lines.push(
      `| ${t.questionNumber ?? '?'} | ${t.learnSubject} | ${t.topic} | ${ans} | ${t.sourceTrace.confidence} | ${t.status === 'confirmed' ? '確定' : '要確認'} |`,
    );
  }
  const nums = new Set(sorted.map((t) => t.questionNumber).filter((n) => Number.isFinite(n)));
  const missing = [];
  for (let i = 1; i <= 60; i += 1) if (!nums.has(i)) missing.push(i);
  lines.push('', `未収録の問題番号: ${missing.length ? missing.join('、') : 'なし'}`, '');
  lines.push('本人の得点は、解答用紙が来てから出す。', '');
  return lines.join('\n');
}

const rawItems = loadBatches();
if (rawItems.length === 0) {
  console.error('extract JSON がありません');
  process.exit(1);
}

const byNumber = new Map();
const unnumbered = [];
for (const item of rawItems) {
  const n = Number(item.questionNumber);
  if (!Number.isFinite(n)) {
    unnumbered.push(item);
    continue;
  }
  const prev = byNumber.get(n);
  if (!prev || rank(item) > rank(prev)) byNumber.set(n, item);
}

const topics = [...byNumber.values(), ...unnumbered].map(toTopic);
for (const t of topics) {
  if (t.status === 'confirmed' && (!t.rule || !t.practiceQuestion)) t.status = 'needs_review';
  if (t.status !== 'confirmed') t.emitBonus = false;
}

const payload = {
  schemaVersion: 1,
  examId: 'ito-juku-koukai-2026-round2',
  title: '伊藤塾 公開模擬試験Ⅱ（2026）',
  expectedQuestionCount: 60,
  note: '問題画像のみ。解説冊子未着。正解番号はAI判断。原文は転載しない。',
  topics,
};

fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(outGrade, gradingMarkdown(topics));
const confirmed = topics.filter((t) => t.status === 'confirmed').length;
console.log(`topics ${topics.length} confirmed ${confirmed} review ${topics.length - confirmed}`);
console.log('Wrote', path.relative(root, outJson));
console.log('Wrote', path.relative(root, outGrade));
