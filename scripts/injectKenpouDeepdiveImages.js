/**
 * assets/images/deepdive/kenpou の {N}-230*.png 等を、LEARN_DEEPDIVE「憲法」の (N-1) 番目の文字列先頭に
 * [[image:kenpou/...]] として挿入する。既存の先頭 [[image:kenpou/...]] は除去してから付け直す。
 */
const fs = require('fs');
const path = require('path');

const LEARN_PATH = path.join(__dirname, '../src/learn.js');
const KENPOU_DIR = path.join(__dirname, '../assets/images/deepdive/kenpou');

/** export const LEARN_DEEPDIVE = { ... }; の { ... } と、その宣言全体の終端位置を返す */
function extractDeepdiveBlock(src) {
  const marker = 'export const LEARN_DEEPDIVE = ';
  const blockStart = src.indexOf(marker);
  if (blockStart === -1) throw new Error('export const LEARN_DEEPDIVE not found');
  let i = blockStart + marker.length;
  while (/\s/.test(src[i])) i++;
  if (src[i] !== '{') throw new Error('expected { after LEARN_DEEPDIVE =');
  const objStart = i;
  let depth = 0;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        const objStr = src.slice(objStart, i + 1);
        let j = i + 1;
        while (j < src.length && /[\s\t]/.test(src[j])) j++;
        if (src[j] === ';') j++;
        while (j < src.length && src[j] === '\n') j++;
        if (src[j] === '\r') j++;
        const blockEnd = j;
        return { objStr, blockStart, blockEnd };
      }
    }
  }
  throw new Error('unbalanced braces in LEARN_DEEPDIVE');
}

function stripLeadingImageTags(s) {
  if (!s) return s;
  let t = s;
  const lineRe = /^\[\[image:[^\]]+\]\]\s*\n*/;
  while (lineRe.test(t)) t = t.replace(lineRe, '');
  return t;
}

const src = fs.readFileSync(LEARN_PATH, 'utf8');
const { objStr, blockStart, blockEnd } = extractDeepdiveBlock(src);

let LEARN_DEEPDIVE;
try {
  LEARN_DEEPDIVE = new Function('return ' + objStr)();
} catch (e) {
  console.error('Failed to parse LEARN_DEEPDIVE:', e.message);
  process.exit(1);
}

const arr = LEARN_DEEPDIVE['憲法'];
if (!Array.isArray(arr)) {
  console.error('LEARN_DEEPDIVE["憲法"] is not an array');
  process.exit(1);
}

const files = fs.readdirSync(KENPOU_DIR).filter((f) => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));
files.sort((a, b) => a.localeCompare(b, 'ja'));

/** index -> [ full keys like kenpou/1-230 ] */
const byIndex = new Map();
for (const f of files) {
  const m = f.match(/^(\d+)-230/i);
  if (!m) continue;
  const q = parseInt(m[1], 10);
  const idx = q - 1;
  const base = f.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
  const key = 'kenpou/' + base;
  if (!byIndex.has(idx)) byIndex.set(idx, []);
  byIndex.get(idx).push(key);
}

let updated = 0;
for (const [idx, keys] of byIndex) {
  if (idx < 0 || idx >= arr.length) {
    console.warn(`skip file(s) for Q${idx + 1}: index out of range (0..${arr.length - 1})`);
    continue;
  }
  const tagBlock = keys.map((k) => `[[image:${k}]]`).join('\n\n');
  const body = stripLeadingImageTags(arr[idx]);
  const next = tagBlock ? `${tagBlock}\n\n${body}` : body;
  if (arr[idx] !== next) {
    arr[idx] = next;
    updated++;
  }
}

const newBlock = `export const LEARN_DEEPDIVE = ${JSON.stringify(LEARN_DEEPDIVE, null, 2)};\n`;
const out = src.slice(0, blockStart) + newBlock + src.slice(blockEnd);
fs.writeFileSync(LEARN_PATH, out, 'utf8');
console.log(`LEARN_DEEPDIVE["憲法"]: ${arr.length} items, ${files.length} files in kenpou/, ${byIndex.size} indices with images, ${updated} strings updated.`);
