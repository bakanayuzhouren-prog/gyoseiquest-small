import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);
const { PATHS } = require('./tempImagesPaths.js');
const learnPath = path.join(root, 'src', 'learn.js');
const tempPng = path.join(PATHS.learnKenpou, '65-230.png');
const assetPng = path.join(root, 'assets', 'images', 'deepdive', 'kenpou', '65-230.png');

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
  throw new Error('unbalanced brackets');
}

const TAG = '[[image:kenpou/65-230]]\n\n';
const INDICES = [65, 67, 68]; // Q66, Q68, Q69

if (fs.existsSync(tempPng)) {
  fs.mkdirSync(path.dirname(assetPng), { recursive: true });
  fs.copyFileSync(tempPng, assetPng);
}

let js = fs.readFileSync(learnPath, 'utf8');
const marker = 'export const LEARN_DEEPDIVE';
const i0 = js.indexOf(marker);
const labelPos = js.indexOf('"憲法": [', i0);
const openBracket = js.indexOf('[', labelPos);
const arrStr = extractBalancedArraySource(js, openBracket);
const arr = JSON.parse(arrStr);

for (const idx of INDICES) {
  let s = arr[idx];
  if (typeof s !== 'string') continue;
  if (s.includes('[[image:kenpou/65-230]]')) continue;
  arr[idx] = TAG + s;
}

const newArrStr = JSON.stringify(arr);
if (!js.includes(arrStr)) throw new Error('array not found');
fs.writeFileSync(learnPath, js.replace(arrStr, newArrStr), 'utf8');
console.log('Prepended [[image:kenpou/65-230]] to 憲法 deepdive indices', INDICES.map((i) => i + 1).join(', '));
