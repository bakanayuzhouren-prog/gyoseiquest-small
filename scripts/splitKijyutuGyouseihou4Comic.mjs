/**
 * kijyutu-gyouseihou-4.png（2×2の四コマ）を同一縦横比で4ファイルに分割する。
 * 出力: kijyutu-gyouseihou-4-p1.png … p4（左上→右上→左下→右下）
 *
 * node scripts/splitKijyutuGyouseihou4Comic.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(import.meta.dirname, '..');
const INPUT = path.join(ROOT, 'assets', 'images', 'deepdive', 'kijyutu', 'gyouseihou', 'kijyutu-gyouseihou-4.png');
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
    const outPath = path.join(OUT_DIR, `kijyutu-gyouseihou-4-${q.suffix}.png`);
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
