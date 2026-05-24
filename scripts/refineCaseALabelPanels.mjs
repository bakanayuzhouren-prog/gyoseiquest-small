/**
 * kijyutu-gyouseihou-3-A.png の3ラベルの白四角を縮め、ネイビー縁で太くする。
 * 白プラーク範囲は連結成分検出後、プラーク内の暗い画素（文字）のBBoxで収める。
 * プラーク直下の背景復元はプラーク縁・外周からの単純クローン（blur）で近似的に埋める。
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const INPUT = path.join('assets', 'images', 'deepdive', 'kijyutu', 'gyouseihou', 'kijyutu-gyouseihou-3-A.png');
const OUTPUT = INPUT;

const NAVY = { r: 52, g: 88, b: 140 }; // アプリ側 DESCRIPTIVE_CASE_BADGE_NAVY (#34588c) と統一した青みのあるネイビー
const BORDER = 12; // ネイビー枠線幅（視認性優先）

function idx(x, y, w, c = 4) {
  return (y * w + x) * c;
}

async function main() {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const px = data;

  const luminanceAt = (i) =>
    0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];

  /** プラーク近似: ごく薄いグレ〜白も含め「背景文字板」だけ拾う閾値 */
  const plaqueWhiteAt = (i) => luminanceAt(i) >= 248 && px[i + 3] >= 250;

  const visited = new Uint8Array(W * H);

  /** 連結成分 BFS → [minX,maxX,minY,maxY,count] */
  function flood(ix, iy) {
    let minX = ix,
      maxX = ix,
      minY = iy,
      maxY = iy,
      count = 0;
    const stack = [[ix, iy]];
    visited[iy * W + ix] = 1;
    while (stack.length) {
      const [x, y] = stack.pop();
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      const nbr = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      for (const [nx, ny] of nbr) {
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const vi = ny * W + nx;
        if (visited[vi]) continue;
        const pi = idx(nx, ny, W);
        if (!plaqueWhiteAt(pi)) continue;
        visited[vi] = 1;
        stack.push([nx, ny]);
      }
    }
    return { minX, maxX, minY, maxY, count };
  }

  const rawPlaques = [];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const vi = y * W + x;
      if (visited[vi]) continue;
      const i = idx(x, y, W);
      if (!plaqueWhiteAt(i)) continue;
      const b = flood(x, y);
      const w = b.maxX - b.minX + 1;
      const h = b.maxY - b.minY + 1;
      const fills = (w * h > 50);
      rawPlaques.push({ ...b, w, h, count: b.count });
    }

  /** 細い線や吹き出しの細部を除去: 面積と縦横比でラベル板っぽいものだけ */
  const candidates = rawPlaques
    .filter((r) => r.count >= 800 && r.count <= (W * H) / 4)
    .filter((r) => Math.max(r.w, r.h) / Math.min(r.w, r.h) <= 24);

  /** 並べ替え: 広いプラーク順（左上巨大ラベルを確実に含む）*/
  candidates.sort((a, b) => (b.maxX - b.minX + 1) * (b.maxY - b.minY + 1) - (a.maxX - a.minX + 1) * (a.maxY - a.minY + 1));

  /** 「行政指導」用紙・吹き出しを落とす: 中央付近〜極細横長を除外／面積超過など */
  const cx = W / 2;
  const cy = H / 2;
  const filtered = [];
  for (const p of candidates) {
    const area = (p.maxX - p.minX + 1) * (p.maxY - p.minY + 1);
    const pcx = (p.minX + p.maxX) / 2;
    const pcy = (p.minY + p.maxY) / 2;
    const dh = Math.hypot(pcx - cx, pcy - cy);
    /** 細長い横矩形（条文紙）は aspect ~ */
    const aspect = Math.max(p.w, p.h) / Math.min(p.w, p.h + 1e-6);
    if (p.h < H * 0.02 || p.w < W * 0.02) continue;
    /** ごく細長いだけの成分は無視（吹き出し縁など）*/
    if (aspect > 10 && Math.min(p.w, p.h) < 180) continue;
    filtered.push({ ...p, area, dh, pcx });
  }

  /** 期待: 3〜5 plaques (建物左上・署名×2など)。面積が大きい上位3〜4から手でラベル３つを自動抽出 */
  const top = [...filtered].sort((a, b) => b.area - a.area).slice(0, 6);

  /** プラークごとにテキストのバウンディングを取る（暗め画素・プラーク領域内） */
  const TEXT_L = 155;
  function textBBox(pxl) {
    const { minX, maxX, minY, maxY } = pxl;
    let tx0 = Infinity,
      tx1 = -Infinity,
      ty0 = Infinity,
      ty1 = -Infinity;
    let any = false;
    for (let y = minY; y <= maxY; y++)
      for (let x = minX; x <= maxX; x++) {
        const i = idx(x, y, W);
        /** プラーク輪郭の細黒線は広めに無視しない（縁は文字と混ぜない）→ 内壁から2pxインナーだけ見るなど */
        if (plaqueWhiteAt(i) || luminanceAt(i) > 245) continue;
        if (luminanceAt(i) < TEXT_L || px[i] < 100) {
          if (y < minY + 14 || y > maxY - 14) continue;
          /** 下端中央の名前は下端寄りにあるので下端はゆるめる */
          if (x < minX + 8 || x > maxX - 8) continue;
          any = true;
          if (x < tx0) tx0 = x;
          if (x > tx1) tx1 = x;
          if (y < ty0) ty0 = y;
          if (y > ty1) ty1 = y;
        }
      }
    if (!any)
      return {
        minX: Math.max(0, minX + 28),
        maxX: Math.min(W - 1, maxX - 28),
        minY: Math.max(0, minY + 28),
        maxY: Math.min(H - 1, maxY - 28),
      };
    /** ゆるめのパディング */
    const padX = Math.round(Math.max((tx1 - tx0) * 0.18, 32));
    const padY = Math.round(Math.max((ty1 - ty0) * 0.55, 40));
    return {
      minX: Math.max(0, tx0 - padX),
      maxX: Math.min(W - 1, tx1 + padX),
      minY: Math.max(0, ty0 - padY),
      maxY: Math.min(H - 1, ty1 + padY),
    };
  }

  /** 上位から「名前ラベル風」（横長・比較的コンパクト）を自動3つ選択 */
  const picked = [];

  /** まず 「Aの雑居ビル」〜 画面上部にある大きめ */
  top.sort((a, b) => b.minY - a.minY);
  const sortedByY = [...top].sort((a, b) => a.minY - b.minY);
  const sortedByAreaDesc = [...top].sort((a, b) => b.area - a.area);

  const topQuarter = sortedByY.filter((t) => t.minY < H * 0.38);
  if (topQuarter.length) picked.push(topQuarter.sort((a, b) => b.area - a.area)[0]);

  /** 下半分にある二つを面積で */
  const bottom = sortedByY.filter((t) => t.minY > H * 0.62);
  bottom.sort((a, b) => b.area - a.area);
  for (const b of bottom) {
    if (picked.length >= 3) break;
    if (picked.some((p) => p === b)) continue;
    picked.push(b);
    if (picked.length === 3) break;
  }
  /** fallback: あとまで area */
  while (picked.length < 3) {
    const next = sortedByAreaDesc.find((t) => !picked.includes(t));
    if (!next) break;
    picked.push(next);
  }

  const outPx = Uint8Array.from(px);

  /** プラーク復元サンプラ:矩形外側1px環から平均色→内側へ */
  function fillOldPlaqueBackdrop(r) {
    const { minX, maxX, minY, maxY } = r;
    const samples = [];
    for (let y = minY; y <= maxY; y++)
      for (let x = minX; x <= maxX; x++) {
        const isEdge =
          x === minX ||
          x === maxX ||
          y === minY ||
          y === maxY ||
          x === minX + 1 ||
          x === maxX - 1 ||
          y === minY + 1 ||
          y === maxY - 1;
        if (!isEdge) continue;
        const i = idx(x, y, W);
        if (!plaqueWhiteAt(i)) {
          samples.push([px[i], px[i + 1], px[i + 2]]);
        }
      }
    let rr = 0,
      gg = 0,
      bb = 0,
      nn = samples.length || 1;
    for (const [r0, g0, b0] of samples) {
      rr += r0;
      gg += g0;
      bb += b0;
    }
    rr = Math.round(rr / nn);
    gg = Math.round(gg / nn);
    bb = Math.round(bb / nn);
    for (let y = minY + 6; y <= maxY - 6; y++)
      for (let x = minX + 6; x <= maxX - 6; x++) {
        const i = idx(x, y, W);
        if (!plaqueWhiteAt(i)) continue;
        outPx[i] = rr;
        outPx[i + 1] = gg;
        outPx[i + 2] = bb;
      }
  }

  /** 四角＋外周 NAVY 帯のみ */
  function drawFilledLabelBox(ix0, iy0, ix1, iy1) {
    for (let y = iy0; y <= iy1; y++)
      for (let x = ix0; x <= ix1; x++) {
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        const i = idx(x, y, W);
        const onBorder =
          x < ix0 + BORDER ||
          x > ix1 - BORDER ||
          y < iy0 + BORDER ||
          y > iy1 - BORDER;
        if (onBorder) {
          outPx[i] = NAVY.r;
          outPx[i + 1] = NAVY.g;
          outPx[i + 2] = NAVY.b;
          outPx[i + 3] = 255;
        } else {
          outPx[i] = 255;
          outPx[i + 1] = 255;
          outPx[i + 2] = 255;
          outPx[i + 3] = 255;
        }
      }
  }

  for (const p of picked.slice(0, 3)) {
    /** 細黒縁のみの周囲を含め復元対象へ */
    const expand = p.count > 90000 ? 8 : 4;
    const outer = {
      minX: Math.max(0, p.minX - expand),
      maxX: Math.min(W - 1, p.maxX + expand),
      minY: Math.max(0, p.minY - expand),
      maxY: Math.min(H - 1, p.maxY + expand),
    };
    fillOldPlaqueBackdrop(outer);
    /** 文言の収まる範囲 */
    let inner = textBBox({
      minX: p.minX,
      maxX: p.maxX,
      minY: p.minY,
      maxY: p.maxY,
    });

    inner = {
      minX: inner.minX | 0,
      maxX: inner.maxX | 0,
      minY: inner.minY | 0,
      maxY: inner.maxY | 0,
    };
    /** 細いときに最低サイズ確保（潰れるのを防ぐ） */
    const minW = 240;
    if (inner.maxX - inner.minX < minW) {
      const c = Math.floor((inner.minX + inner.maxX) / 2);
      inner.minX = Math.max(0, c - minW / 2);
      inner.maxX = Math.min(W - 1, c + minW / 2);
    }
    drawFilledLabelBox(inner.minX, inner.minY, inner.maxX, inner.maxY);
    /** 文字を戻す: 元PNGからプラーク矩形内かつダークのみコピー */
    for (let y = outer.minY; y <= outer.maxY; y++)
      for (let x = outer.minX; x <= outer.maxX; x++) {
        const oi = idx(x, y, W);
        if (plaqueWhiteAt(oi)) continue;
        if (x < inner.minX + BORDER || x > inner.maxX - BORDER || y < inner.minY + BORDER || y > inner.maxY - BORDER)
          continue;
        if (luminanceAt(oi) < 240) {
          outPx[oi] = px[oi];
          outPx[oi + 1] = px[oi + 1];
          outPx[oi + 2] = px[oi + 2];
          outPx[oi + 3] = 255;
        }
      }
    /** プラーク細黒縁〜外側を背景で塗られたアート復元済なので問題なし */
  }

  await sharp(Buffer.from(outPx), {
    raw: { width: W, height: H, channels: 4 },
  })
    .png()
    .toFile(OUTPUT + '.tmp.png');

  fs.renameSync(OUTPUT + '.tmp.png', OUTPUT);
  console.log('Wrote', OUTPUT, 'picked', picked.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
