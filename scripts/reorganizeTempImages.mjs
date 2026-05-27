/**
 * temp_images を learn/ + quiz/ 構成へ移行する（1回限り・再実行可）。
 * node scripts/reorganizeTempImages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(root, 'temp_images');

const MOVES = [
  ['kenpou', 'learn/kenpou'],
  ['minpo_bukken', 'learn/minnpou/bukken'],
  ['saikensouron', 'learn/saikensouron'],
  ['gyouseihou', 'quiz/gyouseihou'],
  ['sousoku', 'quiz/sousoku'],
  ['saikenkakuron', 'quiz/kakuronn'],
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function moveDirWinSafe(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (fs.existsSync(dest)) {
    console.log(`skip (already at dest): ${path.relative(base, dest)}`);
    return false;
  }
  ensureDir(path.dirname(dest));
  try {
    fs.renameSync(src, dest);
    console.log(`moved: ${path.relative(base, src)} → ${path.relative(base, dest)}`);
    return true;
  } catch {
    fs.cpSync(src, dest, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
    console.log(`copied+removed: ${path.relative(base, src)} → ${path.relative(base, dest)}`);
    return true;
  }
}

function fixGyoushinSpelling() {
  const wrong = path.join(base, 'quiz', 'gyouseihou', 'gyousin');
  const right = path.join(base, 'quiz', 'gyouseihou', 'gyoushin');
  if (!fs.existsSync(wrong)) return;
  if (fs.existsSync(right)) return;
  fs.renameSync(wrong, right);
  console.log('renamed: quiz/gyouseihou/gyousin → gyoushin');
}

function main() {
  if (!fs.existsSync(base)) {
    console.error('temp_images not found');
    process.exit(1);
  }
  ensureDir(path.join(base, 'learn'));
  ensureDir(path.join(base, 'quiz'));
  ensureDir(path.join(base, 'quiz', 'bukken'));

  let n = 0;
  for (const [from, to] of MOVES) {
    if (moveDirWinSafe(path.join(base, from), path.join(base, to))) n++;
  }
  fixGyoushinSpelling();
  console.log(n === 0 ? 'already reorganized.' : `moved ${n} folder(s).`);
}

main();
