/**
 * 民法物権 LEARN_DEEPDIVE 監査
 * node scripts/auditBukkenDeepdive.mjs
 */
import fs from 'fs';
import { LEARN_DEEPDIVE } from '../src/learn.js';

const arr = LEARN_DEEPDIVE['民法物権'] || [];
const imgDir = 'assets/images/deepdive/learn/minnpou/bukken';
const imgs = new Set(fs.readdirSync(imgDir).map((f) => f.replace(/\.png$/i, '')));

const issues = [];
const dupMap = new Map();

for (let i = 0; i < arr.length; i++) {
  const q = i + 1;
  const t = String(arr[i] || '').trim();

  if (!t) {
    issues.push({ q, sev: 'warn', type: 'empty', msg: 'B列が空' });
    continue;
  }
  if (t === '**ac**' || t.length < 20) {
    issues.push({ q, sev: 'error', type: 'placeholder', msg: t.slice(0, 40) });
  }

  const sig = t.replace(/\s+/g, '').slice(0, 500);
  if (dupMap.has(sig)) {
    issues.push({ q, sev: 'error', type: 'duplicate', msg: `Q${dupMap.get(sig)}と同一` });
  } else {
    dupMap.set(sig, q);
  }

  const boldCount = (t.match(/\*\*/g) || []).length;
  if (boldCount % 2 !== 0) {
    issues.push({ q, sev: 'error', type: 'orphan_bold', msg: '**が奇数' });
  }

  if (/\*\*\s*\*\*/.test(t) || /\*\*\n\s*\*\*/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'empty_bold', msg: '空の**ブロック' });
  }

  if (/最\[\[red:/.test(t) || /\[\[red:[^\]]*$/.test(t)) {
    issues.push({ q, sev: 'error', type: 'broken_red', msg: '判例タグ破損' });
  }

  if (/\bS価|\bS架|\bSく|\bSい|\bS度|\bT穏|\bT等/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'ai_typo', msg: 'S/T誤字（高/平/等）' });
  }

  if (/\t[^\n]{20,}/.test(t) && !/\|\s/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'tab_table', msg: 'タブ区切り表（表示崩れリスク）' });
  }

  if (/^\*\* 【/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'q1_format', msg: 'Q1独自フォーマット（整形前）' });
  }

  if (/しゅうさくさん|あなたのロジック|ご提示の条件/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'meta_leak', msg: 'メタ文・生成残骸' });
  }

  if (/とメカニズム/.test(t)) {
    issues.push({ q, sev: 'warn', type: 'glued_phrase', msg: '「とメカニズム」改行欠落' });
  }

  const refs = [...t.matchAll(/\[\[image:([^\]]+)\]\]/g)].map((m) => m[1]);
  for (const ref of refs) {
    const base = ref.split('/').pop().replace(/\.png$/, '');
    const paths = [
      `assets/images/deepdive/learn/minnpou/bukken/${base}.png`,
      `assets/images/deepdive/learn/minnpou/${base}.png`,
    ];
    if (!paths.some((p) => fs.existsSync(p))) {
      issues.push({ q, sev: 'error', type: 'missing_image', msg: ref });
    }
  }
}

const orphanImgs = [];
for (const img of imgs) {
  const m = img.match(/^(\d+)-110$/);
  if (m) {
    const q = +m[1];
    if (q > arr.length || !String(arr[q - 1] || '').trim()) {
      orphanImgs.push({ q, img });
    }
  }
}

const missingImgSlots = [];
for (let q = 1; q <= arr.length; q++) {
  if (!String(arr[q - 1] || '').trim()) continue;
  const slot = `${q}-110`;
  if (!imgs.has(slot)) missingImgSlots.push(q);
}

console.log(`Total: ${arr.length}問, B列あり: ${arr.filter((x) => String(x || '').trim()).length}, 画像: ${imgs.size}`);
console.log(`\n=== 問題 ${issues.length}件 ===`);
for (const x of issues.sort((a, b) => a.q - b.q || a.type.localeCompare(b.type))) {
  console.log(`Q${String(x.q).padStart(3)} [${x.sev}] ${x.type}: ${x.msg}`);
}
console.log(`\n=== B列あり・画像なし (${missingImgSlots.length}件) ===`);
console.log(missingImgSlots.slice(0, 30).map((q) => `Q${q}`).join(', ') + (missingImgSlots.length > 30 ? '…' : ''));
console.log(`\n=== 画像あり・B列空 (${orphanImgs.length}件) ===`);
console.log(orphanImgs.slice(0, 15).map((x) => `Q${x.q}`).join(', '));
