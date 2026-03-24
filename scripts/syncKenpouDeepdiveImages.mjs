/**
 * temp_images/kenpou の PNG を問番号（1..231）に対応させ、
 * LEARN_DEEPDIVE['憲法'] の先頭に [[image:kenpou/...]] を付与する。
 * node scripts/syncKenpouDeepdiveImages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const tempDir = path.join(root, 'temp_images', 'kenpou');
const assetDir = path.join(root, 'assets', 'images', 'deepdive', 'kenpou');
const learnPath = path.join(root, 'src', 'learn.js');

/** @returns {{ q: number, key: string } | null} key = 'kenpou/...' without .png */
function parseFilename(base) {
  const m1 = base.match(/^(\d+)-230-(\d+)$/);
  if (m1) return { q: +m1[1], key: `kenpou/${base}` };
  const m2 = base.match(/^(\d+)-230(?: (.*))?$/);
  if (!m2) return null;
  const q = +m2[1];
  const rest = (m2[2] || '').trim();
  if (rest) return { q, key: `kenpou/${base}` };
  return { q, key: `kenpou/${q}-230` };
}

/** `[` から対応する `]` まで（文字列リテラル内の括弧は無視） */
function extractBalancedArraySource(s, openBracketIdx) {
  let i = openBracketIdx;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === '\\') {
        escape = true;
        continue;
      }
      if (c === '"') {
        inString = false;
        continue;
      }
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return s.slice(openBracketIdx, i + 1);
    }
  }
  throw new Error('unbalanced brackets in learn.js');
}

function main() {
  if (!fs.existsSync(tempDir)) {
    console.error('No temp dir', tempDir);
    process.exit(1);
  }
  fs.mkdirSync(assetDir, { recursive: true });

  /** @type {Map<number, string[]>} */
  const byQ = new Map();
  for (const f of fs.readdirSync(tempDir)) {
    if (!/\.png$/i.test(f)) continue;
    const base = f.replace(/\.png$/i, '');
    const parsed = parseFilename(base);
    if (!parsed || parsed.q < 1 || parsed.q > 231) continue;
    if (!byQ.has(parsed.q)) byQ.set(parsed.q, []);
    byQ.get(parsed.q).push(parsed.key);
    fs.copyFileSync(path.join(tempDir, f), path.join(assetDir, f));
  }

  for (const keys of byQ.values()) {
    keys.sort((a, b) => a.localeCompare(b));
  }

  let js = fs.readFileSync(learnPath, 'utf8');
  const marker = 'export const LEARN_DEEPDIVE';
  const i0 = js.indexOf(marker);
  if (i0 < 0) throw new Error('LEARN_DEEPDIVE not found');
  const labelPos = js.indexOf('"憲法": [', i0);
  if (labelPos < 0) throw new Error('憲法 deepdive not found');
  const openBracket = js.indexOf('[', labelPos);
  const arrStr = extractBalancedArraySource(js, openBracket);
  const arr = JSON.parse(arrStr);

  if (arr.length !== 231) {
    console.error('Expected 231 憲法 deepdive items, got', arr.length);
    process.exit(1);
  }

  let changed = 0;
  for (let idx = 0; idx < 231; idx++) {
    const q = idx + 1;
    const keys = byQ.get(q);
    if (!keys || keys.length === 0) continue;
    let s = arr[idx];
    if (typeof s !== 'string') continue;
    const toAdd = [];
    for (const key of keys) {
      const tag = `[[image:${key}]]`;
      if (!s.includes(tag)) toAdd.push(tag);
    }
    if (toAdd.length === 0) continue;
    const prefix = toAdd.join('\n\n') + '\n\n';
    arr[idx] = prefix + s;
    changed++;
  }

  const newArrStr = JSON.stringify(arr);
  const fullOld = arrStr;
  if (!js.includes(fullOld)) throw new Error('array slice not found');
  js = js.replace(fullOld, newArrStr);
  fs.writeFileSync(learnPath, js, 'utf8');
  console.log('Copied PNGs to assets/images/deepdive/kenpou');
  console.log('Updated learn.js: prepended image tags for', changed, 'question indices');
}

main();
