/**
 * 記述解説図の外周余白をトリムする。
 * 生成キャンバスの上下左右のクリーム余白を落とし、中身の輪郭まで切る（余白ゼロ）。
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOTS = [
  'assets/images/deepdive/textbook/minpou-kijutsu',
  'assets/images/deepdive/textbook/gyosei-kijutsu',
  'あぷしX投稿/記述対策',
];
const PAD = 0;
const THRESHOLD = 18;
const MIN_SAVE = 0;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.png$/i.test(ent.name)) acc.push(p);
  }
  return acc;
}

function dist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

function pixel(data, w, c, x, y) {
  const i = (y * w + x) * c;
  return [data[i], data[i + 1], data[i + 2]];
}

async function trimFile(file) {
  const img = sharp(file);
  const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const corners = [
    pixel(data, w, c, 0, 0),
    pixel(data, w, c, w - 1, 0),
    pixel(data, w, c, 0, h - 1),
    pixel(data, w, c, w - 1, h - 1),
  ];
  const bg = [
    Math.round(corners.reduce((s, p) => s + p[0], 0) / 4),
    Math.round(corners.reduce((s, p) => s + p[1], 0) / 4),
    Math.round(corners.reduce((s, p) => s + p[2], 0) / 4),
  ];
  const minRowHits = Math.max(8, Math.floor(w * 0.004));
  const minColHits = Math.max(8, Math.floor(h * 0.004));
  const rowHits = new Array(h).fill(0);
  const colHits = new Array(w).fill(0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (dist(pixel(data, w, c, x, y), bg) > THRESHOLD) {
        rowHits[y]++;
        colHits[x]++;
      }
    }
  }
  let minY = 0;
  while (minY < h && rowHits[minY] < minRowHits) minY++;
  let maxY = h - 1;
  while (maxY > minY && rowHits[maxY] < minRowHits) maxY--;
  let minX = 0;
  while (minX < w && colHits[minX] < minColHits) minX++;
  let maxX = w - 1;
  while (maxX > minX && colHits[maxX] < minColHits) maxX--;

  if (maxX <= minX || maxY <= minY) return { file, skipped: 'no-content' };

  minX = Math.max(0, minX - PAD);
  minY = Math.max(0, minY - PAD);
  maxX = Math.min(w - 1, maxX + PAD);
  maxY = Math.min(h - 1, maxY + PAD);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const saved = 1 - (cw * ch) / (w * h);
  if (saved <= 0) return { file, skipped: 'tight', w, h };

  const bgHex = { r: bg[0], g: bg[1], b: bg[2], alpha: 1 };
  await sharp(file)
    .extract({ left: minX, top: minY, width: cw, height: ch })
    .flatten({ background: bgHex })
    .png()
    .toFile(file + '.trimtmp');
  fs.renameSync(file + '.trimtmp', file);
  return { file, w, h, cw, ch, saved: +saved.toFixed(3) };
}

const files = ROOTS.flatMap((root) => walk(root));
const results = [];
for (const file of files) {
  results.push(await trimFile(file));
}
const changed = results.filter((r) => r.cw);
const skipped = results.filter((r) => r.skipped);
console.log(`trimmed ${changed.length} / ${results.length} (skipped ${skipped.length})`);
for (const r of changed.sort((a, b) => b.saved - a.saved).slice(0, 20)) {
  console.log(
    `${(r.saved * 100).toFixed(1)}%  ${r.w}x${r.h} -> ${r.cw}x${r.ch}  ${path.relative(process.cwd(), r.file)}`,
  );
}
