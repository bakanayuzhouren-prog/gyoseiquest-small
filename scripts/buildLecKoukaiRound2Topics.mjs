/**
 * data/moshi/lec-koukai-2026-round2-topics.json を生成。
 * 第1回スクリプトは実行しない。
 */
import fs from 'node:fs';
import path from 'node:path';
import { QUESTIONS, KEY_ANSWERS } from './lecKoukaiRound2Content.mjs';

const root = process.cwd();
const map = JSON.parse(
  fs.readFileSync(path.join(root, 'data/moshi/lec-koukai-2026-round2-image-map.json'), 'utf8'),
);
const qPages = JSON.parse(
  fs.readFileSync(path.join(root, 'data/moshi/lec-koukai-2026-round2-question-pages.json'), 'utf8'),
);

function questionImagesFor(n) {
  const page = qPages.pages[String(n)];
  if (!page?.file) return [];
  return [`${qPages.questionDir}/${page.file}`];
}

function imagesFor(n) {
  return map.pages
    .filter((p) => p.questionNumber === n)
    .map((p) => `${map.answerDir}/${p.file}`);
}

function choiceTable(rows) {
  if (!rows?.length) {
    return '| 肢 | 正誤 | 要点 |\n|---|---|---|\n| — | — | 解説画像がなく肢の理由を確定できない。 |';
  }
  return [
    '| 肢 | 正誤 | 要点 |',
    '|---|---|---|',
    ...rows.map(([id, ok, point]) => {
      const mark = ok === true ? '○' : ok === false ? '[[red:×]]' : '要確認';
      return `| ${id} | ${mark} | ${point} |`;
    }),
  ].join('\n');
}

function practice(q, n) {
  const src = KEY_ANSWERS[n] ?? q.fill ?? '記述';
  const correct =
    q.modelAnswer ||
    q.rule;
  const trapChoice = q.trap || '主体・時期・例外を取り違える。';
  const mistakenClaims = (q.rows || [])
    .filter((r) => r[1] === false)
    .map((r) => r[2])
    .filter((t) => t && !/誤り|直す|ではない/.test(String(t)));
  const choices = [
    correct,
    trapChoice,
    mistakenClaims[0] || `${q.topic}では、例外なく常に反対の結論になる。`,
    mistakenClaims[1] || `${q.topic}では、根拠条文や判例と反対の結論を採る。`,
  ];
  return {
    prompt: `【LEC公開模試第２回系】${q.topic}について、妥当なものはどれか。`,
    choices,
    answer: 0,
    explanation: `元模試の正解は${src}。自作問題の正解インデックスは0。${q.wrongFix || q.rule}`,
  };
}

const topics = [];
for (let n = 1; n <= 60; n += 1) {
  const q = QUESTIONS[n];
  if (!q) throw new Error(`missing Q${n}`);
  const needs = Boolean(q.needsReview);
  const imgs = imagesFor(n);
  const qImgs = questionImagesFor(n);
  if (!q.noExplanationImage && imgs.length === 0) {
    throw new Error(`no answer image for Q${n}`);
  }
  if (qImgs.length === 0) {
    throw new Error(`no question image for Q${n}`);
  }
  const qMeta = qPages.pages[String(n)] || {};
  const deepDive = [
    '■ 結論',
    '',
    q.rule,
    '',
    '■ 出題形式',
    '',
    qMeta.ask || '',
    '',
    '■ 事例（要約・転載なし）',
    '',
    qMeta.facts || '登場人物なし。',
    '',
    '■ 肢の整理',
    '',
    choiceTable(q.rows),
    '',
    q.combo ? `\n元模試の妥当な組合せ: ${q.combo}\n` : '',
    q.fill ? `\n元模試の空欄: ${q.fill}\n` : '',
    q.modelAnswer ? `\n元模試の解答例の芯: ${q.modelAnswer}\n` : '',
    '',
    '■ ひっかけ',
    '',
    `[[red:${q.trap}]]`,
    '',
    '■ 暗記',
    '',
    q.memory,
    q.statusNote ? `\n\n■ 確認メモ\n\n${q.statusNote}` : '',
  ]
    .filter((x) => x !== '')
    .join('\n');

  topics.push({
    id: `leckoukai-r2-q${String(n).padStart(2, '0')}-${q.topic.slice(0, 24)}`,
    questionNumber: n,
    subject: q.learnSubject,
    field: q.field,
    learnSubject: q.learnSubject,
    quizSubject:
      q.learnSubject.startsWith('民法') || q.learnSubject === '債権総論' || q.learnSubject === '債権各論' || q.learnSubject === '家族法'
        ? '民法'
        : q.learnSubject === '商法・会社法'
          ? '商法・会社法'
          : q.learnSubject.startsWith('多肢')
            ? '多肢選択'
            : q.learnSubject.endsWith('記述')
              ? '記述'
              : q.learnSubject === '基礎知識' || q.learnSubject === '基礎法学' || q.learnSubject === '憲法'
                ? q.learnSubject
                : '行政法',
    quizField: q.learnSubject === '国家賠償法' ? '国家賠償法・損失訴訟' : q.learnSubject,
    topic: q.topic,
    aim: `${q.topic}を、元模試の肢の正誤で切れるようにする。`,
    askType: qMeta.askType || null,
    caseFacts: qMeta.facts || '',
    rule: q.rule,
    trap: q.trap,
    references: q.refs,
    memory: q.memory,
    deepDive,
    practiceQuestion: practice(q, n),
    sourceTrace: {
      answerSource: `LEC公開模試第2回・正解${KEY_ANSWERS[n] ?? q.fill ?? '記述'}・${q.topic}`,
      sourceCorrectAnswer: KEY_ANSWERS[n] ?? q.fill ?? q.modelAnswer,
      practiceAnswerIndex: 0,
      questionImages: qImgs,
      answerImages: imgs,
      answerKeyImage: `${map.answerDir}/${map.answerKeyFile}`,
      choiceVerdicts: (q.rows || []).map(([id, ok, point]) => ({ id, ok, why: point })),
    },
    status: needs ? 'needs_review' : 'confirmed',
  });
}

const out = {
  schemaVersion: 1,
  examId: 'lec-koukai-2026-round2',
  title: '2026 全日本行政書士公開模試 第2回（LEC）',
  expectedQuestionCount: 60,
  note: '解答冊子から論点を自作要約。原文の問題文・肢は転載しない。sourceCorrectAnswerは元模試、practiceAnswerIndexは自作問題。',
  imageMap: 'data/moshi/lec-koukai-2026-round2-image-map.json',
  topics,
};

const dest = path.join(root, 'data/moshi/lec-koukai-2026-round2-topics.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
const review = topics.filter((t) => t.status === 'needs_review').map((t) => t.questionNumber);
console.log('wrote', dest, 'topics', topics.length, 'needs_review', review.join(','));
