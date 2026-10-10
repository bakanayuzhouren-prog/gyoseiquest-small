/**
 * tmp/lec-r3 の自作要約と、正答一覧から
 * data/moshi/lec-koukai-2026-round3-topics.json を作る。
 * 冊子の問題文・肢・解説は転載しない。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const KEY = {
  1: 4, 2: 2, 3: 2, 4: 4, 5: 4, 6: 4, 7: 3, 8: 3, 9: 5, 10: 4,
  11: 2, 12: 4, 13: 5, 14: 5, 15: 3, 16: 4, 17: 3, 18: 5, 19: 3, 20: 5,
  21: 4, 22: 3, 23: 5, 24: 1, 25: 3, 26: 5, 27: 3, 28: 3, 29: 4, 30: 4,
  31: 2, 32: 4, 33: 3, 34: 2, 35: 4, 36: 5, 37: 4, 38: 4, 39: 2, 40: 5,
  41: 'ア7・イ14・ウ19・エ5',
  42: 'ア6・イ13・ウ11・エ16',
  43: 'ア12・イ18・ウ6・エ9',
  44: '記述', 45: '記述', 46: '記述',
  47: 5, 48: 4, 49: 4, 50: 2, 51: 3, 52: 1, 53: 3, 54: 2, 55: 5,
  56: 3, 57: 3, 58: 2, 59: 3, 60: 4,
};

const META = {
  8: ['行政法', '行政法総論', '行政法総論'],
  9: ['行政法', '行政法総論', '行政法総論'],
  10: ['行政法', '行政法総論', '行政法総論'],
  11: ['行政法', '行政手続法', '行政手続法'],
  12: ['行政法', '行政手続法', '行政手続法'],
  13: ['行政法', '行政手続法', '行政手続法'],
  14: ['行政法', '行政不服審査法', '行政不服審査法'],
  15: ['行政法', '行政不服審査法', '行政不服審査法'],
  16: ['行政法', '行政不服審査法', '行政不服審査法'],
  17: ['行政法', '行政事件訴訟法', '行政事件訴訟法'],
  18: ['行政法', '行政法総合', '行政法総合'],
  19: ['行政法', '行政事件訴訟法', '行政事件訴訟法'],
  20: ['行政法', '国家賠償法', '国家賠償法'],
  21: ['行政法', '行政法総論', '行政法総論'],
  22: ['行政法', '地方自治法', '地方自治法'],
  23: ['行政法', '地方自治法', '地方自治法'],
  24: ['行政法', '地方自治法', '地方自治法'],
  25: ['行政法', '行政法総論', '行政法総論'],
  26: ['行政法', '行政法総論', '行政法総論'],
  27: ['民法', '民法総則', '民法総則'],
  28: ['民法', '民法総則', '民法総則'],
  29: ['民法', '民法物権', '民法物権'],
  30: ['民法', '民法物権', '民法物権'],
  31: ['民法', '債権総論', '債権総論'],
  32: ['民法', '債権総論', '債権総論'],
  33: ['民法', '債権各論', '債権各論'],
  34: ['民法', '民法物権', '民法物権'],
  35: ['民法', '家族法', '家族法'],
  36: ['商法・会社法', '商法・会社法', '商法・会社法'],
  37: ['商法・会社法', '商法・会社法', '商法・会社法'],
  38: ['商法・会社法', '商法・会社法', '商法・会社法'],
  39: ['商法・会社法', '商法・会社法', '商法・会社法'],
  40: ['商法・会社法', '商法・会社法', '商法・会社法'],
  41: ['多肢選択', '多肢選択憲法', '多肢選択憲法'],
  42: ['多肢選択', '多肢選択行政法', '多肢選択行政法'],
  43: ['多肢選択', '多肢選択行政法', '多肢選択行政法'],
  44: ['記述', '行政法記述', '行政法記述'],
  45: ['記述', '民法記述', '民法記述'],
  46: ['記述', '民法記述', '民法記述'],
};

const OVERRIDES = {
  53: {
    theme: '行政書士の独占',
    format: '組合せ',
    rule: '行政書士の独占は、官公署に提出する書類と、権利義務または事実証明に関する書類の作成である。',
    trap: '聴聞手続の代理、代理人としての契約書類の作成、書類作成の相談まで独占に含める。',
    memory: '独占は書類の作成。代理と相談は、業にできるが独占ではない。',
    statutes: ['行政書士法1条の3', '行政書士法1条の4', '行政書士法19条1項'],
    limbs: [
      { id: '作成', ok: true, point: '官公署提出書類と、権利義務または事実証明書類の作成は1条の3で、19条が禁じる範囲である。' },
      { id: '代理', ok: false, point: '聴聞その他の意見陳述手続の代理は1条の4で、業にできるが独占ではない。' },
      { id: '相談', ok: false, point: '書類作成の相談は1条の4で、業にできるが独占ではない。' },
      { id: '契約代理', ok: false, point: '契約その他の書類を代理人として作成することは1条の4で、独占ではない。' },
    ],
  },
  56: {
    theme: 'デジタル庁',
    format: '組合せ',
    rule: 'デジタル庁は内閣に置く。長は内閣総理大臣で、デジタル大臣を置く。',
    trap: 'デジタル庁を内閣府の外局とし、長をデジタル大臣だけにする。',
    memory: 'デジタル庁は内閣。長は内閣総理大臣。',
    statutes: ['デジタル庁設置法2条', 'デジタル庁設置法7条', 'デジタル庁設置法8条'],
    limbs: [
      { id: '設置', ok: true, point: 'デジタル庁は内閣に置く。' },
      { id: '長', ok: true, point: '長は内閣総理大臣である。' },
      { id: '外局', ok: false, point: '内閣府の外局ではない。' },
    ],
  },
  58: {
    theme: '空欄の受け',
    format: '文章理解',
    rule: '空欄は、筆者が直前で対比した態度の側で埋める。出典の文はカードに写さない。',
    trap: '対比の反対側の語を、空欄へ入れる。',
    memory: '空欄は、直前の対比の側で埋める。',
    statutes: [],
    limbs: [],
  },
  59: {
    theme: '比喩の着地',
    format: '文章理解',
    rule: '空欄は、前文の比喩が最後に指す結論で埋める。出典の文はカードに写さない。',
    trap: '比喩の途中の語を、結論の空欄へ入れる。',
    memory: '空欄は、比喩の着地で埋める。',
    statutes: [],
    limbs: [],
  },
  60: {
    theme: '文の並べ替え',
    format: '文章理解',
    rule: '並べ替えは、定義の文を軸にし、指示語は直前の文を受ける。',
    trap: '指示語を、離れた文へ戻す。',
    memory: '指示語は直前。接続は前後を結ぶ。',
    statutes: [],
    limbs: [],
  },
};

function room(n) {
  if (n <= 2) return ['基礎法学', '基礎法学', '基礎法学'];
  if (n <= 7) return ['憲法', '憲法', '憲法'];
  if (META[n]) return META[n];
  if (n >= 47) return ['基礎知識', '基礎知識', '基礎知識'];
  throw new Error(`no room ${n}`);
}

function quizField(learn) {
  if (learn === '国家賠償法') return '国家賠償法・損失訴訟';
  return learn;
}

function loadExtracts() {
  const byN = new Map();
  for (const name of ['batch-a.json', 'batch-b.json', 'batch-c.json', 'batch-d.json']) {
    const j = JSON.parse(fs.readFileSync(path.join(root, 'tmp/lec-r3', name), 'utf8'));
    for (const q of j.questions || []) {
      if (typeof q.questionNumber !== 'number') continue;
      const prev = byN.get(q.questionNumber);
      const score = (q.rule || '').length + (q.limbs || []).length * 20;
      const prevScore = prev ? (prev.rule || '').length + (prev.limbs || []).length * 20 : -1;
      if (!prev || score > prevScore) byN.set(q.questionNumber, q);
    }
  }
  return byN;
}

function choiceTable(limbs) {
  if (!limbs?.length) {
    return '| 肢 | 正誤 | 要点 |\n|---|---|---|\n| — | — | 文章理解または記述のため、肢の全文は置かない。 |';
  }
  return [
    '| 肢 | 正誤 | 要点 |',
    '|---|---|---|',
    ...limbs.map((l) => `| ${l.id} | ${l.ok ? '○' : '[[red:×]]'} | ${l.point} |`),
  ].join('\n');
}

function practice(topic, rule, trap, src) {
  const trapIsWarning = /誤る|誤り|外れる|落とす|足りない|ではない/.test(trap);
  const choices = [
    rule,
    trapIsWarning ? `${topic}では、原則と例外を入れ替えても結論は同じである。` : trap,
    `${topic}では、根拠と反対の結論を採る。`,
    `${topic}では、要件を満たさなくても効果は常に生じる。`,
  ];
  return {
    prompt: `【LEC公開模試第３回系】${topic}について、妥当なものはどれか。`,
    choices,
    answer: 0,
    explanation: `元模試の正解は${src}。自作問題の正解は最初の肢。ひっかけは、${trap}`,
  };
}

const extracts = loadExtracts();
const topics = [];

for (let n = 1; n <= 60; n += 1) {
  const src = extracts.get(n) || {};
  const over = OVERRIDES[n] || {};
  const [quizSubject, field, learnSubject] = room(n);
  const topic = over.theme || src.theme || `問${n}`;
  const rule = over.rule || src.rule;
  const trap = over.trap || src.trap;
  const memory = over.memory || rule;
  const statutes = over.statutes || src.statutes || [];
  const limbs = over.limbs || (src.limbs || []).filter((l) => l && l.point);
  if (!rule || !trap) throw new Error(`thin Q${n}`);
  const answerLabel = KEY[n];
  const deepDive = [
    '■ 結論',
    rule,
    '■ 出題形式',
    over.format || src.format || '',
    '■ 肢の整理',
    choiceTable(limbs),
    '■ ひっかけ',
    `[[red:${trap}]]`,
    '■ 暗記',
    memory,
  ].join('\n\n');

  topics.push({
    id: `leckoukai-r3-q${String(n).padStart(2, '0')}-${topic.slice(0, 24)}`,
    questionNumber: n,
    subject: learnSubject,
    field,
    learnSubject,
    quizSubject,
    quizField: quizField(learnSubject),
    topic,
    aim: `${topic}を、試験で使う結論で切れるようにする。`,
    askType: over.format || src.format || null,
    rule,
    trap,
    references: statutes,
    memory,
    deepDive,
    practiceQuestion: practice(topic, rule, trap, answerLabel),
    sourceTrace: {
      answerSource: `LEC公開模試第3回・正解${answerLabel}・${topic}`,
      sourceCorrectAnswer: answerLabel,
      practiceAnswerIndex: 0,
      answerImages: src.file ? [`app/模試画像/LEC公開３/解答/${src.file}`] : [],
      choiceVerdicts: limbs.map((l) => ({ id: String(l.id), ok: l.ok, why: l.point })),
    },
    status: 'confirmed',
  });
}

const out = {
  schemaVersion: 1,
  examId: 'lec-koukai-2026-round3',
  title: '2026 全日本行政書士公開模試 第3回（LEC）',
  expectedQuestionCount: 60,
  note: '解答冊子から論点を自作要約。原文の問題文・肢・解説は転載しない。sourceCorrectAnswerは元模試、practiceAnswerIndexは自作問題。',
  topics,
};

const dest = path.join(root, 'data/moshi/lec-koukai-2026-round3-topics.json');
fs.writeFileSync(dest, `${JSON.stringify(out, null, 2)}\n`);
console.log('wrote', dest, 'topics', topics.length);
