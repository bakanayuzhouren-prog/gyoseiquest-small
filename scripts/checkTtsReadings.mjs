import { applyTTSRules } from '../utils/tts-rules.ts';

const cases = [
  ['1項', 'いっこう'],
  ['6項', 'ろっこう'],
  ['8項', 'はっこう'],
  ['10項', 'じゅっこう'],
  ['第1項', 'だいいっこう'],
  ['3月1日', 'さんがつついたち'],
  ['2024年3月に解除', '2024ねんさんがつに'],
  ['終了後3月以内', 'さんかげつ以内'],
];

let failed = 0;
for (const [input, expect] of cases) {
  const out = applyTTSRules(input);
  if (!out.includes(expect)) {
    console.error('FAIL', input, '=>', out, 'expected to include', expect);
    failed += 1;
  } else {
    console.log('OK', input, '=>', out);
  }
  if (out.includes('さんげつ')) {
    console.error('FAIL leftover さんげつ', input, out);
    failed += 1;
  }
}
if (failed) process.exit(1);
console.log('all ok');
