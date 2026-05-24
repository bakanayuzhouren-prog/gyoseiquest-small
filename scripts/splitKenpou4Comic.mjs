/**
 * kenpou/4-230.png（2×2の四コマ）を4ファイルに分割する。
 * node scripts/splitKenpou4Comic.mjs && node scripts/generateDeepdiveImages.js
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(import.meta.dirname, '..');
const INPUT = path.join(ROOT, 'assets', 'images', 'deepdive', 'kenpou', '4-230.png');
const OUT_DIR = path.dirname(INPUT);

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error('Missing:', INPUT);
    process.exit(1);
  }
  const meta = await sharp(INPUT).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (w < 2 || h < 2) {
    console.error('Image too small:', w, h);
    process.exit(1);
  }
  const hw = Math.floor(w / 2);
  const hh = Math.floor(h / 2);
  const jobs = [
    { left: 0, top: 0, width: hw, height: hh, suffix: 'p1' },
    { left: hw, top: 0, width: w - hw, height: hh, suffix: 'p2' },
    { left: 0, top: hh, width: hw, height: h - hh, suffix: 'p3' },
    { left: hw, top: hh, width: w - hw, height: h - hh, suffix: 'p4' },
  ];
  for (const q of jobs) {
    const outPath = path.join(OUT_DIR, `4-230-${q.suffix}.png`);
    await sharp(INPUT)
      .extract({ left: q.left, top: q.top, width: q.width, height: q.height })
      .png()
      .toFile(outPath);
    console.log('wrote', path.relative(ROOT, outPath));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
