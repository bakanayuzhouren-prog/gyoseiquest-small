/**
 * 手動／サブエージェント抽出JSON → lec-koukai-2026-round1-topics.json
 * Usage: node scripts/mergeLecKoukaiExtract.mjs data/moshi/lec-koukai-extract-parts/*.json
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outPath = path.join(root, 'data/moshi/lec-koukai-2026-round1-topics.json');

const SUBJECT_FROM_THEME = [
  [/政治|経済|社会|情報・通信|個人情報保護|諸法令|文章理解/, { subject: '基礎知識', field: '基礎知識', learnSubject: '基礎知識' }],
  [/基礎知識|行政書士法|諸法令/, { subject: '基礎知識', field: '基礎知識', learnSubject: '基礎知識' }],
  [/基礎法学/, { subject: '基礎法学', field: '基礎法学', learnSubject: '基礎法学' }],
  [/憲法/, { subject: '憲法', field: '憲法', learnSubject: '憲法' }],
  [/多肢選択.*憲法|憲法.*多肢/, { subject: '多肢選択', field: '多肢選択憲法', learnSubject: '多肢選択憲法' }],
  [/多肢選択.*行政|行政.*多肢/, { subject: '多肢選択', field: '多肢選択行政法', learnSubject: '多肢選択行政法' }],
  [/行政事件訴訟|行訴|事情判決/, { subject: '行政法', field: '行政事件訴訟法', learnSubject: '行政事件訴訟法' }],
  [/行政不服|行服|再審査/, { subject: '行政法', field: '行政不服審査法', learnSubject: '行政不服審査法' }],
  [/行政手続|行手法/, { subject: '行政法', field: '行政手続法', learnSubject: '行政手続法' }],
  [/国家賠償|国賠/, { subject: '行政法', field: '国家賠償法', learnSubject: '国家賠償法' }],
  [/地方自治|条例/, { subject: '行政法', field: '地方自治法', learnSubject: '地方自治法' }],
  [/記述.*行政|行政.*記述/, { subject: '記述', field: '行政法記述', learnSubject: '行政法記述' }],
  [/記述.*民法|民法.*記述/, { subject: '記述', field: '民法記述', learnSubject: '民法記述' }],
  [/相隣|抵当|物権|占有|登記/, { subject: '民法', field: '物権', learnSubject: '民法物権' }],
  [/委任|事務管理|詐欺|強迫|錯誤|代理|時効|民法総則/, { subject: '民法', field: '民法総則', learnSubject: '民法総則' }],
  [/債権総論|同時履行/, { subject: '民法', field: '債権総論', learnSubject: '債権総論' }],
  [/債権各論|売買|賃貸|請負|不法行為/, { subject: '民法', field: '債権各論', learnSubject: '債権各論' }],
  [/相続|遺言|家族/, { subject: '民法', field: '相続', learnSubject: '家族法' }],
  [/会社|商法|株式|取締役/, { subject: '商法・会社法', field: '商法・会社法', learnSubject: '商法・会社法' }],
  [/行政法/, { subject: '行政法', field: '行政法総論', learnSubject: '行政法総論' }],
];

const QUIZ_SUBJECT = {
  行政法総論: '行政法',
  行政手続法: '行政法',
  行政不服審査法: '行政法',
  行政事件訴訟法: '行政法',
  国家賠償法: '行政法',
  地方自治法: '行政法',
  民法総則: '民法',
  民法物権: '民法',
  債権総論: '民法',
  債権各論: '民法',
  家族法: '民法',
  商法・会社法: '商法・会社法',
  基礎知識: '基礎知識',
  基礎法学: '基礎法学',
  憲法: '憲法',
  多肢選択憲法: '多肢選択',
  多肢選択行政法: '多肢選択',
  行政法記述: '記述',
  民法記述: '記述',
};

const QUIZ_FIELD = {
  国家賠償法: '国家賠償法・損失訴訟',
  物権: '民法物権',
  相続: '家族法',
};

function resolveSubject(theme) {
  for (const [re, meta] of SUBJECT_FROM_THEME) {
    if (re.test(theme)) return meta;
  }
  return { subject: '行政法', field: '行政法総論', learnSubject: '行政法総論' };
}

function slugify(s) {
  return String(s)
    .replace(/[（）()・／/\s]+/g, '-')
    .replace(/[^\w\u3040-\u30ff\u4e00-\u9faf-]/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
}

function buildDeepDive(item, validLines) {
  const rows = validLines
    .map((v) => `| ${v.num} | ${v.valid ? '○' : '[[red:×]]'} | ${v.summary || ''} |`)
    .join('\n');
  const choiceSection = rows
    ? `\n\n■ 肢の整理\n\n| 肢 | 正誤 | 要点 |\n|---|---|---|\n${rows}`
    : '';
  return `■ 結論\n\n${item.keyRule}${choiceSection}\n\n■ ひっかけ\n\n[[red:${item.trap}]]\n\n■ 暗記\n\n${item.memory}`;
}

function buildPractice(item, meta) {
  const choices =
    item.practiceChoices ||
    [
      item.keyRule,
      `${item.theme}では、例外なく常に${item.trap}`,
      `${item.theme}では、主体・期間・手続の区別をせず同じ結論になる。`,
      `${item.theme}では、根拠条文や判例と反対の結論を採る。`,
    ];
  while (choices.length < 4) choices.push(`${item.theme}に関する別の説明`);
  return {
    prompt: `【LEC公開模試系】${item.theme.replace(/[（(].+[）)]/, '')}について、妥当なものはどれか。`,
    choices: choices.slice(0, 4),
    answer: item.practiceAnswer ?? 0,
    explanation: item.practiceExplanation || `正解${item.correctAnswer}。${item.keyRule}`,
  };
}

function toTopic(item) {
  const theme = item.theme || '';
  const topicName = theme.replace(/[（(][^）)]+[）)]/g, '').trim() || theme;
  const meta = resolveSubject(theme);
  const learnSubject = meta.learnSubject;
  const validLines = Array.isArray(item.validChoices)
    ? item.validChoices
        .filter((v) => v && typeof v === 'object' && 'num' in v)
        .map((v) => ({
          num: v.num,
          valid: v.valid,
          summary: v.summary || '',
        }))
    : [];

  return {
    id: `leckoukai-q${String(item.questionNumber).padStart(2, '0')}-${slugify(topicName)}`,
    questionNumber: item.questionNumber,
    subject: meta.subject,
    field: meta.field,
    learnSubject,
    quizSubject: QUIZ_SUBJECT[learnSubject] || meta.subject,
    quizField: QUIZ_FIELD[meta.field] || learnSubject,
    topic: topicName,
    aim: `${theme}の出題意図を、肢ごとの正誤で切れるようにする。`,
    rule: item.keyRule,
    trap: item.trap,
    references: item.references || [],
    memory: item.memory,
    deepDive: buildDeepDive(item, validLines),
    practiceQuestion: buildPractice(item, meta),
    sourceTrace: {
      answerSource: `LEC公開模試第1回・正解${item.correctAnswer}・${theme}`,
    },
    status:
      item.status ||
      (item.questionNumber === 8
        ? 'needs_review'
        : item.keyRule && (item.correctAnswer || item.modelAnswer)
          ? 'confirmed'
          : 'needs_review'),
  };
}

function loadJsonFiles(inputs) {
  const items = [];
  for (const input of inputs) {
    const raw = fs.readFileSync(input, 'utf8');
    let parsed;
    if (input.endsWith('.jsonl')) {
      const records = raw
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => JSON.parse(line));
      const text = records
        .filter((record) => record.role === 'assistant')
        .flatMap((record) => record.message?.content || [])
        .filter((part) => part.type === 'text' && part.text?.includes('"questionNumber"'))
        .at(-1)?.text;
      if (!text) throw new Error(`抽出JSONがありません: ${input}`);
      const cleaned = text.replace(/\[REDACTED\]/g, '').trim();
      parsed = JSON.parse(cleaned.slice(cleaned.indexOf('['), cleaned.lastIndexOf(']') + 1));
    } else {
      parsed = JSON.parse(raw);
    }
    const arr = Array.isArray(parsed) ? parsed : parsed.topics || [parsed];
    items.push(...arr);
  }
  const byQ = new Map();
  for (const item of items) {
    if (item.questionNumber) byQ.set(item.questionNumber, item);
  }
  return [...byQ.values()].sort((a, b) => a.questionNumber - b.questionNumber);
}

const inputs = process.argv.slice(2);
if (!inputs.length) {
  console.error('Usage: node scripts/mergeLecKoukaiExtract.mjs <extract.json> ...');
  process.exit(1);
}

const extracted = loadJsonFiles(inputs);
const topics = extracted.map(toTopic);

const payload = {
  schemaVersion: 1,
  examId: 'lec-koukai-2026-round1',
  title: '2026 全日本行政書士公開模試 第1回（LEC）',
  expectedQuestionCount: 60,
  note: '解答冊子から論点を自作要約。原文の問題文・肢は転載しない。',
  topics,
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
console.log(`Merged ${topics.length} topics (${topics.filter((t) => t.status === 'confirmed').length} confirmed)`);
const missing = Array.from({ length: 60 }, (_, i) => i + 1).filter(
  (n) => !topics.some((t) => t.questionNumber === n),
);
if (missing.length) console.log('Missing:', missing.join(', '));
