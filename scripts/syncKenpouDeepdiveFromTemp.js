/**
 * temp_images/learn/kenpou を assets/images/deepdive/kenpou にコピーし、src/deepdiveImages.ts を再生成する。
 * スプレッドシートの [[image:kenpou/1-230]] または [[image:1-230]]（拡張子なし）で解決される。
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PATHS } = require('./tempImagesPaths');

const SRC = PATHS.learnKenpou;
const DEST = path.join(__dirname, '../assets/images/deepdive/kenpou');
const EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

if (!fs.existsSync(SRC)) {
  console.error('Missing:', SRC);
  process.exit(1);
}
fs.mkdirSync(DEST, { recursive: true });
let n = 0;
for (const f of fs.readdirSync(SRC)) {
  const ext = path.extname(f).toLowerCase();
  if (!EXTS.has(ext)) continue;
  fs.copyFileSync(path.join(SRC, f), path.join(DEST, f));
  n++;
}
console.log(`Copied ${n} images to assets/images/deepdive/kenpou`);
execSync(`node "${path.join(__dirname, 'generateDeepdiveImages.js')}"`, {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});
