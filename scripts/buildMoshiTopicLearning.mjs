import fs from 'node:fs';

const argv = process.argv.slice(2);
const input = argv[0] || 'data/moshi/goukaku-kakumei-round1-topics.json';
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
const roundLabel =
  argv.find((a) => a.startsWith('--round='))?.slice('--round='.length) ||
  (String(data.examId || '').includes('round3') ? '第3回' : '第1回');
const learnOut =
  argv.find((a) => a.startsWith('--learn-out='))?.slice('--learn-out='.length) ||
  (roundLabel === '第3回'
    ? 'src/goukaku_moshi_round3_learn_content.js'
    : 'src/goukaku_moshi_learn_content.js');
const bonusOut =
  argv.find((a) => a.startsWith('--bonus-out='))?.slice('--bonus-out='.length) ||
  (roundLabel === '第3回'
    ? 'src/goukaku_moshi_round3_bonus_questions.js'
    : 'src/goukaku_moshi_bonus_questions.js');
const mdOut =
  argv.find((a) => a.startsWith('--md-out='))?.slice('--md-out='.length) ||
  (roundLabel === '第3回'
    ? 'data/knowledge/creator/prep-school/goukaku-kakumei-round3-topics.md'
    : 'data/knowledge/creator/prep-school/goukaku-kakumei-round1-topics.md');
const learnExportName =
  argv.find((a) => a.startsWith('--learn-export='))?.slice('--learn-export='.length) ||
  (roundLabel === '第3回' ? 'GOUKAKU_MOSHI_ROUND3_LEARN_BY_SUBJECT' : 'GOUKAKU_MOSHI_LEARN_BY_SUBJECT');
const bonusExportName =
  argv.find((a) => a.startsWith('--bonus-export='))?.slice('--bonus-export='.length) ||
  (roundLabel === '第3回' ? 'GOUKAKU_MOSHI_ROUND3_BONUS_QUESTIONS' : 'GOUKAKU_MOSHI_BONUS_QUESTIONS');

/** field → 見て聞いて覚えるの LEARN_CONTENT キー */
const LEARN_SUBJECT_BY_FIELD = {
  行政組織法: '行政法総論',
  義務履行確保: '行政法総論',
  行政法総論: '行政法総論',
  行政手続法: '行政手続法',
  行政不服審査法: '行政不服審査法',
  行政事件訴訟法: '行政事件訴訟法',
  国家賠償法: '国家賠償法',
  地方自治法: '地方自治法',
  行政法総合: '行政法総合',
  民法総則: '民法総則',
  物権: '民法物権',
  民法物権: '民法物権',
  債権総論: '債権総論',
  債権各論: '債権各論',
  相続: '家族法',
  家族法: '家族法',
  商法・会社法: '商法・会社法',
  会社法: '商法・会社法',
  基礎知識: '基礎知識',
  基礎法学: '基礎法学',
  憲法: '憲法',
  多肢選択憲法: '多肢選択憲法',
  多肢選択行政法: '多肢選択行政法',
  行政法記述: '行政法記述',
  民法記述: '民法記述',
};

/** learnSubject → ボーナスの科目キー */
const QUIZ_SUBJECT_BY_LEARN = {
  行政法総論: '行政法',
  行政手続法: '行政法',
  行政不服審査法: '行政法',
  行政事件訴訟法: '行政法',
  国家賠償法: '行政法',
  地方自治法: '行政法',
  行政法総合: '行政法',
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

/** field → ボーナスの分野キー（問題を解く） */
const QUIZ_FIELD_BY_FIELD = {
  行政組織法: '行政法総論',
  義務履行確保: '行政法総論',
  物権: '民法物権',
  相続: '家族法',
  会社法: '商法・会社法',
  国家賠償法: '国家賠償法・損失訴訟',
};

const req = [
  'id',
  'questionNumber',
  'subject',
  'field',
  'topic',
  'aim',
  'rule',
  'trap',
  'memory',
  'deepDive',
  'practiceQuestion',
  'sourceTrace',
  'status',
];
const ids = new Set();
const errors = [];

function resolveLearnSubject(t) {
  if (t.learnSubject) return t.learnSubject;
  if (LEARN_SUBJECT_BY_FIELD[t.field]) return LEARN_SUBJECT_BY_FIELD[t.field];
  if (LEARN_SUBJECT_BY_FIELD[t.subject]) return LEARN_SUBJECT_BY_FIELD[t.subject];
  return t.subject;
}

function resolveQuizSubject(t, learnSubject) {
  if (t.quizSubject) return t.quizSubject;
  return QUIZ_SUBJECT_BY_LEARN[learnSubject] || t.subject;
}

function resolveQuizField(t, learnSubject) {
  if (t.quizField) return t.quizField;
  if (QUIZ_FIELD_BY_FIELD[t.field]) return QUIZ_FIELD_BY_FIELD[t.field];
  if (
    learnSubject === '商法・会社法' ||
    learnSubject === '基礎知識' ||
    learnSubject === '基礎法学' ||
    learnSubject === '憲法'
  ) {
    return learnSubject;
  }
  return learnSubject;
}

for (const t of data.topics) {
  for (const k of req) {
    if (t[k] === undefined || t[k] === '') errors.push(`${t.id || '?'}: ${k}`);
  }
  if (ids.has(t.id)) errors.push(`${t.id}: duplicate`);
  ids.add(t.id);
  const learnSubject = resolveLearnSubject(t);
  if (!LEARN_SUBJECT_BY_FIELD[t.field] && !t.learnSubject && !LEARN_SUBJECT_BY_FIELD[t.subject]) {
    errors.push(`${t.id}: unknown learn subject for field=${t.field}`);
  }
  const p = t.practiceQuestion || {};
  if (
    t.status === 'confirmed' &&
    (!Array.isArray(p.choices) ||
      !Number.isInteger(p.answer) ||
      p.answer < 0 ||
      p.answer >= p.choices.length ||
      !p.explanation)
  ) {
    errors.push(`${t.id}: invalid practice`);
  }
  void learnSubject;
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const confirmed = data.topics.filter((t) => t.status === 'confirmed');
const covered = new Set(data.topics.map((t) => t.questionNumber));
const missing = Array.from({ length: data.expectedQuestionCount || 60 }, (_, i) => i + 1).filter(
  (n) => !covered.has(n),
);
const bySubject = {};
const bonus = {};

for (const t of confirmed) {
  const learnSubject = resolveLearnSubject(t);
  const quizSubject = resolveQuizSubject(t, learnSubject);
  const quizField = resolveQuizField(t, learnSubject);

  (bySubject[learnSubject] ??= []).push({
    text: `【合格革命${roundLabel}・問${t.questionNumber}】${t.memory}`,
    deepdive: `■ 結論\n\n${t.rule}\n\n■ なぜそうなる\n\n${t.deepDive}\n\n■ ひっかけ\n\n[[red:${t.trap}]]\n\n■ 暗記\n\n${t.memory}`,
    fExplain: t.aim,
    statuteRef: (t.references || []).join('、'),
    source: `合格革命模試 ${roundLabel} 問${t.questionNumber}`,
  });

  bonus[quizSubject] ??= {};
  (bonus[quizSubject][quizField] ??= []).push({
    text: `【ボーナス合格革命${roundLabel}・問${t.questionNumber}系】${t.practiceQuestion.prompt}`,
    choices: t.practiceQuestion.choices,
    answer: [t.practiceQuestion.answer],
    explain: t.practiceQuestion.explanation,
    choiceExplanations: t.practiceQuestion.choices.map((_, i) =>
      i === t.practiceQuestion.answer
        ? `正解肢。${t.practiceQuestion.explanation}`
        : `誤答肢。${t.trap}`,
    ),
    isBonus: true,
    wordBank: '',
    memo: `合格革命${roundLabel}・${t.topic}`,
    slots: [],
  });
}

const lines = [
  '---',
  `id: creator/prep-school/${data.examId}-topics`,
  'type: mock-exam-topic-index',
  `source: ${data.title}`,
  'tags: [合格革命, 模試, 論点, もっと深掘る, ボーナス問題]',
  'validationStatus: confirmed',
  '---',
  '',
  `# ${data.title} 論点インデックス`,
  '',
  '> 原文転載ではなく、出題された法律論点を学習用に再構成。',
  '',
  `- 構造化・アプリ接続済み: ${confirmed.length}論点`,
  `- 未構造化の問題番号: ${missing.join('、')}`,
  '',
];

const grouped = Object.groupBy(confirmed, (t) => resolveLearnSubject(t));
for (const [s, ts] of Object.entries(grouped)) {
  lines.push(`## ${s}`, '');
  for (const t of ts) {
    lines.push(
      `### 問${t.questionNumber} ${t.field}：${t.topic}`,
      '',
      `- 出題の狙い: ${t.aim}`,
      `- 判断ルール: ${t.rule}`,
      `- ひっかけ: ${t.trap}`,
      `- 暗記: ${t.memory}`,
      `- 根拠: ${(t.references || []).join(' / ')}`,
      '',
      '#### もっと深掘る',
      '',
      t.deepDive,
      '',
      '#### 新作問題',
      '',
      t.practiceQuestion.prompt,
      '',
      ...t.practiceQuestion.choices.map((c, i) => `${i + 1}. ${c}`),
      '',
      `正解: ${t.practiceQuestion.answer + 1}`,
      '',
      t.practiceQuestion.explanation,
      '',
    );
  }
}

fs.mkdirSync(mdOut.replace(/[^/\\]+$/, ''), { recursive: true });
fs.writeFileSync(mdOut, lines.join('\n') + '\n');
const banner = '// Generated by scripts/buildMoshiTopicLearning.mjs. Edit the JSON source.\n';
fs.writeFileSync(
  learnOut,
  banner + `export const ${learnExportName} = ${JSON.stringify(bySubject, null, 2)};\n`,
);
fs.writeFileSync(
  bonusOut,
  banner + `export const ${bonusExportName} = ${JSON.stringify(bonus, null, 2)};\n`,
);
console.log(`Validated and generated ${confirmed.length} topics (${roundLabel}). Missing questions: ${missing.join(',')}`);
console.log('Wrote', learnOut, bonusOut, mdOut);
console.log('Learn keys:', Object.keys(bySubject).join(', '));
console.log(
  'Bonus keys:',
  Object.entries(bonus)
    .map(([s, f]) => `${s}:{${Object.keys(f).join(',')}}`)
    .join(' | '),
);
