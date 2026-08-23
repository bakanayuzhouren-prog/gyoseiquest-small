/**
 * 右下の旧マスコット（熊／二重のちゃちゃロット）をクリームで消し、
 * 小さく指し棒のちゃちゃロットをフクロウ枠に載せ直す。
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const spriteClear = path.join(root, 'tmp/chachalot-pointer-clear.png');
const dir = path.join(root, 'assets/images/deepdive/textbook/minpou-kijutsu');

if (!fs.existsSync(spriteClear)) {
  console.error('missing', spriteClear);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((f) => /^q.+\.png$/i.test(f)).sort();
const spriteMeta = await sharp(spriteClear).metadata();

for (const file of files) {
  const imgPath = path.join(dir, file);
  const img = sharp(imgPath);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const sx = Math.min(w - 1, Math.round(w * 0.04));
  const sy = Math.min(h - 1, Math.round(h * 0.52));
  const si = (sy * w + sx) * 4;
  const cr = data[si];
  const cg = data[si + 1];
  const cb = data[si + 2];

  const isTall = h >= 1000;
  const patchL = Math.round(w * (isTall ? 0.76 : 0.84));
  const patchT = Math.round(h * (isTall ? 0.56 : 0.58));
  const patchR = w;
  const patchB = Math.round(h * 0.88);
  for (let y = patchT; y < patchB; y++) {
    for (let x = patchL; x < patchR; x++) {
      const i = (y * w + x) * 4;
      data[i] = cr;
      data[i + 1] = cg;
      data[i + 2] = cb;
      data[i + 3] = 255;
    }
  }

  const patched = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const targetH = Math.round(h * 0.22);
  const targetW = Math.round((spriteMeta.width / spriteMeta.height) * targetH);
  const resized = await sharp(spriteClear).resize(targetW, targetH).png().toBuffer();
  const left = Math.max(0, w - targetW - Math.round(w * 0.008));
  const top = Math.max(0, patchB - targetH + Math.round(h * 0.008));

  await sharp(patched)
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(imgPath + '.tmp');
  fs.renameSync(imgPath + '.tmp', imgPath);
  console.log(file, { w, h, left, top, targetW, targetH });
}
console.log('done', files.length);
