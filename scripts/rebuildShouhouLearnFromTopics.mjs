/**
 * 商法・会社法の学習カードだけ、topics JSON から既存 Generated JS の当該キーへ書き戻す。
 * 他科目・ボーナスは触らない。
 */
import fs from 'node:fs';

function cardsFromTopics(topics, sourcePrefix, roundLabel) {
  const out = [];
  for (const t of topics) {
    if (t.status !== 'confirmed') continue;
    const learn = t.learnSubject || t.subject;
    const field = t.field;
    if (learn !== '商法・会社法' && field !== '商法・会社法' && field !== '会社法') continue;
    if (learn && learn !== '商法・会社法' && field !== '会社法' && field !== '商法・会社法') continue;
    const blob = [t.learnSubject, t.subject, t.field, t.quizSubject].join(' ');
    if (!/商法|会社法/.test(blob)) continue;
    if (t.learnSubject && t.learnSubject !== '商法・会社法') continue;
    const rule = String(t.rule || '').trim();
    const memory = String(t.memory || '').trim();
    const text = (rule || memory).replace(/^【[^】]+】\s*/, '');
    out.push({
      text,
      deepdive: `■ 結論\n\n${t.rule}\n\n■ なぜそうなる\n\n${t.deepDive}\n\n■ ひっかけ\n\n[[red:${t.trap}]]\n\n■ 暗記\n\n${t.memory}`,
      fExplain: t.aim,
      statuteRef: (t.references || []).join('、'),
      source: `${sourcePrefix} ${roundLabel} 問${t.questionNumber}`,
    });
  }
  return out;
}

function replaceSubjectArray(jsPath, key, cards) {
  const src = fs.readFileSync(jsPath, 'utf8');
  const needle = `  "${key}": [`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error(`missing key ${key} in ${jsPath}`);
  let i = start + needle.length - 1; // at '['
  let depth = 0;
  let end = -1;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`unclosed array ${jsPath}`);
  const inner = JSON.stringify(cards, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `  ${line}`))
    .join('\n');
  const next = src.slice(0, start) + `  "${key}": ` + inner + src.slice(end);
  fs.writeFileSync(jsPath, next);
}

const jobs = [
  {
    json: 'data/moshi/goukaku-kakumei-hosei-2026-round2-topics.json',
    js: 'src/goukaku_kakumei_hosei_r2_learn_content.js',
    prefix: '合格革命模試',
    round: '第2回',
  },
  {
    json: 'data/moshi/ito-juku-koukai-2026-round1-topics.json',
    js: 'src/ito_juku_koukai1_learn_content.js',
    prefix: '伊藤塾公開模試',
    round: '第1回',
  },
  {
    json: 'data/moshi/lec-koukai-2026-round1-topics.json',
    js: 'src/lec_koukai_moshi_learn_content.js',
    prefix: 'LEC公開模試',
    round: '第1回',
  },
  {
    json: 'data/moshi/lec-koukai-2026-round2-topics.json',
    js: 'src/lec_koukai_moshi_round2_learn_content.js',
    prefix: 'LEC公開模試',
    round: '第2回',
  },
  {
    json: 'data/moshi/goukaku-kakumei-round1-topics.json',
    js: 'src/goukaku_moshi_learn_content.js',
    prefix: '合格革命模試',
    round: '第1回',
  },
  {
    json: 'data/moshi/goukaku-kakumei-round3-topics.json',
    js: 'src/goukaku_moshi_round3_learn_content.js',
    prefix: '合格革命模試',
    round: '第3回',
  },
  {
    json: 'data/moshi/lec-ataru-2026-round3-topics.json',
    js: 'src/lec_ataru_round3_learn_content.js',
    prefix: 'LEC市販模試',
    round: '第3回',
  },
];

for (const job of jobs) {
  const data = JSON.parse(fs.readFileSync(job.json, 'utf8'));
  const cards = cardsFromTopics(data.topics, job.prefix, job.round);
  replaceSubjectArray(job.js, '商法・会社法', cards);
  console.log(job.js, cards.length);
}
