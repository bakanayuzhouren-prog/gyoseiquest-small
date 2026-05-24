/**
 * deepdive 記述用 kijyutu 画像の「コマ枠」だけ黒〜暗灰をネイビーに置換（UI の RN 枠は使わずアセット側で揃える）。
 * 検出: 太い縞＋細い縞を行／列で拾い、膨張させて内外の二重枠までマスクする。
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const NAVY_R = 52;
const NAVY_G = 88;
const NAVY_B = 140;

/** 縞カウントに含める「フレームっぽい」画素（黒〜灰・すでに NAVY を含む・再実行でも検出できる） */
function looksLikeFrameSeed(r, g, b, a) {
  if (a < 110) return false;
  const chr = Math.max(r, g, b) - Math.min(r, g, b);
  const L = (r + g + b) / 3;
  const darkNeutral = L < 84 && chr < 46 && Math.max(r, g, b) < 120;
  const navyish =
    chr < 44 &&
    L > 58 &&
    L < 112 &&
    Math.abs(r - NAVY_R) < 35 &&
    Math.abs(g - NAVY_G) < 35 &&
    Math.abs(b - NAVY_B) < 38;
  return darkNeutral || navyish;
}

/** 縞上のすべての縁・アンチ別描画を着色（ゆるめ、彩度・明度上限）*/
function replacesFramePixels(r, g, b, a) {
  if (a < 80) return false;
  const L = (r + g + b) / 3;
  const chr = Math.max(r, g, b) - Math.min(r, g, b);
  return L < 122 && chr < 54 && Math.max(r, g, b) < 142;
}

function idx(x, y, w, c = 4) {
  return (y * w + x) * c;
}

/** 1D ヒットを ±radius で膨張（内外の二重枠の隙間までマスクを伸ばす） */
function dilate1d(hit, len, radius) {
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    let v = 0;
    const lo = Math.max(0, i - radius);
    const hi = Math.min(len - 1, i + radius);
    for (let j = lo; j <= hi; j++) {
      if (hit[j]) {
        v = 1;
        break;
      }
    }
    out[i] = v;
  }
  return out;
}

function processRgb(data, w, h) {
  const out = Buffer.from(data);
  const rowHit = new Uint8Array(h);
  const colHit = new Uint8Array(w);

  /** 太い縞（外枠など） */
  for (let y = 0; y < h; y++) {
    let seeds = 0;
    let sumL = 0;
    for (let x = 0; x < w; x++) {
      const i = idx(x, y, w);
      const r = data[i],
        g0 = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];
      const L = (r + g0 + b) / 3;
      sumL += L;
      if (looksLikeFrameSeed(r, g0, b, a)) seeds++;
    }
    const frac = seeds / w;
    const mean = sumL / w;
    const thick = frac >= 0.82 && mean < 112 && mean > 36;
    /** 細い縞（内側の 1〜数 px の黒線）：行全体では比率が落ちるので別閾値 */
    const thin = frac >= 0.52 && frac <= 0.92 && mean < 125 && mean > 38;
    if (thick || thin) rowHit[y] = 1;
  }

  for (let x = 0; x < w; x++) {
    let seeds = 0;
    let sumL = 0;
    for (let y = 0; y < h; y++) {
      const i = idx(x, y, w);
      const r = data[i],
        g0 = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];
      const L = (r + g0 + b) / 3;
      sumL += L;
      if (looksLikeFrameSeed(r, g0, b, a)) seeds++;
    }
    const frac = seeds / h;
    const mean = sumL / h;
    const thick = frac >= 0.82 && mean < 112 && mean > 36;
    const thin = frac >= 0.52 && frac <= 0.92 && mean < 125 && mean > 38;
    if (thick || thin) colHit[x] = 1;
  }

  const dilateRadius = Math.max(72, Math.round(Math.min(w, h) * 0.055));
  const rowExp = dilate1d(rowHit, h, dilateRadius);
  const colExp = dilate1d(colHit, w, dilateRadius);

  /** 縞に沿った ±3px はアンチエイリアス用に連結 */
  const rd = dilate1d(rowExp, h, 3);
  const cd = dilate1d(colExp, w, 3);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!rd[y] && !cd[x]) continue;
      const i = idx(x, y, w);
      const r = data[i],
        g0 = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];
      if (!replacesFramePixels(r, g0, b, a)) continue;
      out[i] = NAVY_R;
      out[i + 1] = NAVY_G;
      out[i + 2] = NAVY_B;
      out[i + 3] = a;
    }
  }
  return out;
}

async function processPng(relPath) {
  const fp = path.isAbsolute(relPath) ? relPath : path.join(process.cwd(), relPath);
  const { data, info } = await sharp(fp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  /** 2パス：外枠ネイビーが細い内枠の種になり、膨張マスクが安定する */
  const once = processRgb(data, w, h);
  const out = processRgb(once, w, h);
  const tmp = fp + '.frame-navy.tmp.png';
  await sharp(Buffer.from(out), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(tmp);
  fs.renameSync(tmp, fp);
}

async function main() {
  const argv = process.argv.slice(2);
  const DIR = path.join('assets', 'images', 'deepdive', 'kijyutu', 'gyouseihou');
  const targets =
    argv.length > 0
      ? argv
      : fs
          .readdirSync(DIR)
          .filter((f) => f.endsWith('.png'))
          .map((f) => path.join(DIR, f));

  for (const t of targets) {
    if (!fs.existsSync(t)) {
      console.warn('skip (missing)', t);
      continue;
    }
    await processPng(t);
    console.log('recolored comic frame stripes → navy', path.relative(process.cwd(), t));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
