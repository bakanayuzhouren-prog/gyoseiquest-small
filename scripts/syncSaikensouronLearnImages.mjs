/**
 * temp_images/saikensouron の画像をアプリ用にコピーする。
 * その後: node scripts/generateDeepdiveImages.js
 *
 * ファイル名: 「問番号」を先頭にした N-xxx.png（例: 3-200.png）→ learn/saikensouron で N 問目に紐づく
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SRC = path.join(root, 'temp_images', 'saikensouron');
const DEST = path.join(root, 'assets', 'images', 'deepdive', 'learn', 'saikensouron');

const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`コピー元がありません: ${SRC}`);
    process.exit(1);
  }
  fs.mkdirSync(DEST, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(SRC)) {
    const ext = path.extname(name).toLowerCase();
    if (!EXT.has(ext)) continue;
    fs.copyFileSync(path.join(SRC, name), path.join(DEST, name));
    n++;
  }
  console.log(`syncSaikensouronLearnImages: ${n} ファイルを ${DEST} にコピーしました。次: npm run generate:deepdive-images`);
}

main();
