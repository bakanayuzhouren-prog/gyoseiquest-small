/**
 * temp_images/quiz/ 配下を assets/images/deepdive/ へ同じ構成でコピーし、
 * src/deepdiveImages.ts を再生成する。
 *
 *   node scripts/syncQuizDeepdiveFromTemp.mjs
 *   node scripts/syncQuizDeepdiveFromTemp.mjs --dir gyouseihou
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);
const { PATHS } = require('./tempImagesPaths.js');

const SRC_BASE = PATHS.quizRoot;
const DEST_BASE = path.join(root, 'assets', 'images', 'deepdive');
const EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

/** quiz 用 deepdive トップ（learn/ kenpou/ は含めない） */
const QUIZ_TOP_DIRS = ['kakuronn', 'bukken', 'gyouseihou', 'kijyutu', 'kennpou-toku', 'sousoku', 'souronn'];

function copyTree(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;
  fs.mkdirSync(destDir, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(srcDir)) {
    const src = path.join(srcDir, name);
    const dest = path.join(destDir, name);
    const st = fs.statSync(src);
    if (st.isDirectory()) {
      n += copyTree(src, dest);
    } else if (EXTS.has(path.extname(name).toLowerCase())) {
      fs.copyFileSync(src, dest);
      n++;
    }
  }
  return n;
}

function main() {
  const onlyDir = process.argv.includes('--dir')
    ? process.argv[process.argv.indexOf('--dir') + 1]
    : null;
  const dirs = onlyDir ? [onlyDir] : QUIZ_TOP_DIRS;
  let total = 0;
  for (const d of dirs) {
    const src = path.join(SRC_BASE, d);
    const dest = path.join(DEST_BASE, d);
    const n = copyTree(src, dest);
    console.log(`${d}: ${n} file(s) → assets/images/deepdive/${d}/`);
    total += n;
  }
  if (total === 0) {
    console.warn('No images copied. Check temp_images/quiz/');
  }
  execSync(`node "${path.join(__dirname, 'generateDeepdiveImages.js')}"`, {
    stdio: 'inherit',
    cwd: root,
  });
}

main();
