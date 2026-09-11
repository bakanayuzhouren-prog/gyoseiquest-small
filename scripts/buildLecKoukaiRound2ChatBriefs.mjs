/**
 * LEC公開模試第2回の質問モード用ガイドを topics JSON から生成。
 * Usage: node scripts/buildLecKoukaiRound2ChatBriefs.mjs
 */
import fs from 'node:fs';

const { topics } = JSON.parse(fs.readFileSync('data/moshi/lec-koukai-2026-round2-topics.json', 'utf8'));

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function buildTriggers(t) {
  const n = t.questionNumber;
  return uniq([
    `LEC公開２の${n}番`,
    `LEC公開2の${n}番`,
    `LEC公開２の${n}`,
    `LEC公開2の${n}`,
    `LEC公開２ ${n}番`,
    `LEC公開2 ${n}番`,
    `LEC公開模試第２回 問${n}`,
    `LEC公開模試第2回 問${n}`,
    `LEC公開模試第２回の問${n}番`,
    `LEC公開模試第2回の問${n}番`,
    `LEC公開２ 問${n}`,
    `LEC公開2 問${n}`,
    `LEC公開２の${n}番のイ`,
    `LEC公開2の${n}番のイ`,
    `LEC公開２の${n}番 そのイ`,
    `LEC公開2の${n}番 そのイ`,
    `LEC公開２の${n}番 そのア`,
    `LEC公開２ ${n}番 ストーリー`,
    `LEC公開2の${n}番 ストーリー`,
  ]).slice(0, 24);
}

function rowsFromDeepDive(text) {
  return String(text || '');
}

const briefs = topics.map((t) => {
  const n = t.questionNumber;
  const src = t.sourceTrace?.sourceCorrectAnswer;
  const verdicts = t.sourceTrace?.choiceVerdicts || [];
  const kana = ['ア', 'イ', 'ウ', 'エ', 'オ'];
  const numbered = verdicts.length >= 2 && verdicts.every((v) => /^[1-5]$/.test(String(v.id)));
  const whyLines = [];
  if (numbered) {
    whyLines.push('この問の記述番号は1〜5。質問の「ア〜オ」は ア＝1、イ＝2、ウ＝3、エ＝4、オ＝5 と読む。');
  }
  for (const v of verdicts) {
    const mark = v.ok === true ? '○' : v.ok === false ? '×' : '要確認';
    const kIdx = numbered ? Number(v.id) - 1 : kana.indexOf(String(v.id));
    const kLabel = kIdx >= 0 && kIdx < 5 ? `／${kana[kIdx]}` : '';
    whyLines.push(`- **${v.id}${kLabel}（${mark}）** ${v.why}`);
  }
  const iVerdict = numbered
    ? verdicts.find((v) => String(v.id) === '2')
    : verdicts.find((v) => String(v.id) === 'イ');
  if (iVerdict) {
    whyLines.push(
      iVerdict.ok
        ? '「そのイはなぜ誤り？」→ イは誤りではない（○）。誤りは別の肢。'
        : '「そのイはなぜ誤り？」→ イは誤り（×）。上記の要点を参照。',
    );
  }
  const lines = [
    `## LEC公開2・問${n}：${t.topic}`,
    '',
    '**結論（先に答え）**',
    `元模試の正解は ${src}。`,
    `形式は ${t.askType || '不明'}。`,
    t.rule,
    '',
    '### 事例（要約・転載なし）',
    t.caseFacts || '登場人物なし。',
    '',
    '### 理由',
    t.deepDive,
    '',
    '### そのア〜オ／1〜5が誤り（または正しい）理由',
    ...whyLines,
    '',
    '### 具体例・ストーリー',
    t.caseFacts
      ? `登場人物と条件は上記の要約。全文は転載しない。${t.trap}`
      : t.trap,
    '',
    '### 具体例・切り方',
    `**Q. ひっかけは？** A. ${t.trap}`,
    `**Q. 暗記は？** A. ${t.memory}`,
    t.status === 'needs_review' ? '**要確認** 解説画像の判読または形式が完全ではない。断定しすぎない。' : '',
    '',
    `**出典メモ** 2026 全日本行政書士公開模試 第2回（LEC）問${n}。第1回・LEC市販2と混ぜない。`,
  ];
  return {
    triggers: buildTriggers(t),
    title: `LEC公開2・問${n}：${t.topic}`,
    text: lines.filter(Boolean).join('\n'),
  };
});

briefs.unshift({
  triggers: [
    'LEC公開２',
    'LEC公開2',
    'LEC公開模試第２回',
    'LEC公開模試第2回',
    'LEC公開２の解説',
    'LEC公開2を解説',
  ],
  title: 'LEC公開2：使い方（問番号で聞く）',
  text: [
    '## LEC公開模試第２回',
    '',
    '**結論** 2026年 LEC全日本行政書士公開模試 第2回。第1回やLEC市販2とは別教材。',
    '',
    '「LEC公開２の29番を解説して」「そのイはなぜ誤り？」「具体的なストーリーで説明して」のように聞く。',
    '元模試の正解番号と、アプリの自作ボーナスの正解インデックスは別。',
    '問30は解説画像がなく問題画像と正解一覧で確定。問48は問題画像を後から照合済み。',
    '',
    '**暗記** 公開２＋番号。混ぜない。',
  ].join('\n'),
});

const keyPhrases = uniq([
  'LEC公開２',
  'LEC公開2',
  'LEC公開模試第２回',
  'LEC公開模試第2回',
  ...briefs.flatMap((b) => b.triggers.filter((x) => x.length <= 24)),
]);

const phraseAliases = [
  ['LEC公開２', ['LEC公開2', 'LEC公開模試第２回', 'LEC公開模試第2回']],
  ['LEC公開2', ['LEC公開２', 'LEC公開模試第２回']],
];

function esc(s) {
  return JSON.stringify(s);
}

const out = [];
out.push('/**');
out.push(' * LEC全日本行政書士公開模試 第2回の質問モード用ガイド。');
out.push(' * data/moshi/lec-koukai-2026-round2-topics.json から生成。原文転載なし。');
out.push(' * 再生成: node scripts/buildLecKoukaiRound2ChatBriefs.mjs');
out.push(' */');
out.push('export type ChatTopicBrief = {');
out.push('  triggers: string[];');
out.push('  title: string;');
out.push('  text: string;');
out.push('};');
out.push('');
out.push('export const LEC_KOUKAI_R2_CHAT_BRIEFS: ChatTopicBrief[] = [');
for (const b of briefs) {
  out.push('  {');
  out.push(`    triggers: ${JSON.stringify(b.triggers, null, 6).replace(/\n/g, '\n    ')},`);
  out.push(`    title: ${esc(b.title)},`);
  out.push('    text: [');
  for (const line of b.text.split('\n')) {
    out.push(`      ${esc(line)},`);
  }
  out.push("    ].join('\\n'),");
  out.push('  },');
}
out.push('];');
out.push('');
out.push(`export const LEC_KOUKAI_R2_KEY_PHRASES: string[] = ${JSON.stringify(keyPhrases, null, 2)};`);
out.push('');
out.push(
  `export const LEC_KOUKAI_R2_PHRASE_ALIASES: [string, string[]][] = ${JSON.stringify(phraseAliases, null, 2)};`,
);
out.push('');

fs.writeFileSync('utils/chatTopicBriefsLecKoukaiRound2.ts', out.join('\n'));
console.log(`Wrote ${briefs.length} briefs`);
void rowsFromDeepDive;
