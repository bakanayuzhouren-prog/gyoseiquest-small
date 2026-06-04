/**
 * A列キーワードとB列本文の整合性（粗いヒューリスティック）
 */
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '../src/learn.js';

const a = LEARN_CONTENT['民法物権'];
const b = LEARN_DEEPDIVE['民法物権'];

const rules = [
  { kw: /一筆.*一部|区分所有|162条/, bkw: /162|区分|一部.*所有|時効.*一部/, q: 'Q2土地一部時効' },
  { kw: /集合動産|譲渡担保/, bkw: /集合|譲渡担保|ブタ|54\.2\.15/, q: '集合物譲渡担保' },
  { kw: /樹木.*独立/, bkw: /樹木|101条|242条/, q: '樹木独立売却' },
  { kw: /地役権.*時効/, bkw: /地役権|281|時効/, q: '地役権時効' },
  { kw: /区分地上|地下.*空中|269条/, bkw: /269|区分地上|地下|空中/, q: '区分地上権' },
  { kw: /ゲーム機|デトウ|保管/, bkw: /占有|返還|180|保管|受寄/, q: '占有・保管' },
  { kw: /境界.*窓|目かくし/, bkw: /234|235|窓|目かくし|1メートル/, q: '境界窓' },
  { kw: /背信的|時効取得.*G/, bkw: /背信|177|時効|対抗/, q: '背信悪意者' },
  { kw: /根抵当/, bkw: /根抵当|398|極度/, q: '根抵当' },
];

const mismatches = [];
for (let i = 0; i < a.length; i++) {
  const q = i + 1;
  const at = a[i] || '';
  const bt = (b[i] || '').trim();
  if (!bt || bt === '**ac**') continue;
  for (const r of rules) {
    if (r.kw.test(at) && !r.bkw.test(bt)) {
      mismatches.push({ q, rule: r.q, a: at.slice(0, 60) });
      break;
    }
  }
}

console.log('=== A列とB列のキーワード不整合 ===');
for (const m of mismatches) {
  console.log(`Q${m.q} [${m.rule}] A: ${m.a}`);
}

// 誤字・変な語
const weird = [];
for (let i = 0; i < b.length; i++) {
  const t = b[i] || '';
  if (/優先弁済県|おっさん|ベイベイ|デトウ|T17\.|T穏|T等|S架|S圧|標S|Sい|Sく/.test(t)) {
    weird.push({ q: i + 1, hits: [...new Set(t.match(/優先弁済県|おっさん|ベイベイ|デトウ|T17\.|T穏|T等|S架|S圧|標S/g) || [])] });
  }
}
console.log('\n=== 誤字・テスト用語 ===');
for (const w of weird) console.log(`Q${w.q}: ${w.hits.join(', ')}`);
