/**
 * Q31 肢4 — 自治紛争処理委員 vs 国地方係争処理委員会
 *   node scripts/renderChihouQ31Limb4Soubun.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';
import {
  COLORS,
  drawBadge,
  drawStackedBlock,
  drawWrapped,
  getFont,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './lib/chihouCanvasLayout.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'chihou', '33-31-4-1.png');
const W = 1400;
const M = 48;
const CW = W - M * 2;
const FONT = getFont();

function drawMainTable(ctx, y) {
  const headers = ['比較項目', '自治紛争処理委員\n（251条）', '国地方係争処理委員会\n（250条の7〜9）'];
  const rows = [
    ['性質', '事件ごとの**臨時**ユニット', '総務省の**常置**機関'],
    ['人数', '**3人**（事件ごと）', '**5人**（固定）'],
    ['勤務形態', '**非常勤**（3項）', '原則非常勤・**2人まで常勤可**（8項2項）'],
    ['主な対象', '自治体**相互**・都道府県の関与の審査', '**国の関与**の審査'],
    ['任命', '総務大臣 or **知事**', '総務大臣＋**両議院同意**'],
    ['設置の要否', '都道府県が常勤を**必置**とは言えない', '国が**常置**（総務省）'],
    ['不服の行き先', '高等裁判所へ（251条の5等）', '高等裁判所へ（250条の15等）'],
  ];
  const colW = [CW * 0.22, CW * 0.39, CW * 0.39];
  const pad = 14;
  const lh = 28;
  let ty = y;

  const all = [headers, ...rows];
  const rowHs = all.map((row, ri) => {
    let max = ri === 0 ? 52 : 48;
    row.forEach((cell, ci) => {
      ctx.font = ri === 0 || ci === 0 ? `bold 17px ${FONT}` : `16px ${FONT}`;
      max = Math.max(max, measureWrappedHeight(ctx, cell, colW[ci] - pad * 2, lh) + 26);
    });
    return max;
  });

  all.forEach((row, ri) => {
    const rh = rowHs[ri];
    let cx = M;
    row.forEach((cell, ci) => {
      if (ri === 0) ctx.fillStyle = '#1e3a8a';
      else if (ci === 1) ctx.fillStyle = '#eff6ff';
      else ctx.fillStyle = '#fff7ed';
      ctx.fillRect(cx, ty, colW[ci], rh);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(cx, ty, colW[ci], rh);
      ctx.fillStyle = ri === 0 ? '#fff' : '#0f172a';
      ctx.font = ri === 0 || ci === 0 ? `bold 17px ${FONT}` : `16px ${FONT}`;
      drawWrapped(ctx, cell, cx + pad, ty + 20, colW[ci] - pad * 2, lh);
      cx += colW[ci];
    });
    ty += rh;
  });
  return ty + 20;
}

function main() {
  const canvas = createCanvas(W, 3200);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, W, 3200);

  let y = 52;
  ctx.fillStyle = COLORS.PURPLE;
  ctx.font = `bold 32px ${FONT}`;
  ctx.fillText('Q31 肢4｜自治紛争 vs 国地方係争', M, y);
  y += 44;

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 18,
    bg: '#fef2f2',
    border: COLORS.RED,
    borderW: 3,
    lines: [
      { text: '× 本肢の誤り（正解は肢5・勧告）', font: `bold 22px ${FONT}`, color: COLORS.RED, lh: 30 },
      {
        text: '「都道府県は必ず常勤の自治紛争処理委員を置かなければならない」→ 誤り',
        font: `19px ${FONT}`,
        color: '#0f172a',
        lh: 28,
      },
      {
        text: '251条3項は「自治紛争処理委員は**非常勤とする**」と明文。',
        font: `bold 19px ${FONT}`,
        color: COLORS.GREEN,
        lh: 28,
      },
    ],
  });

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 18,
    bg: '#fff7ed',
    border: COLORS.ORANGE,
    borderW: 3,
    lines: [
      { text: '語呂の核', font: `bold 22px ${FONT}`, color: COLORS.ORANGE, lh: 30 },
      {
        text: '「じつけんひじょう」＝ 自治紛争は**非常勤**',
        font: `bold 24px ${FONT}`,
        color: COLORS.ORANGE,
        lh: 34,
      },
      {
        text: '国地方係争委員会は**常置**（じつけん＝常設イメージ）',
        font: `19px ${FONT}`,
        color: '#0f172a',
        lh: 28,
      },
      {
        text: '※国地方も委員は非常勤が原則。混同注意は「常勤必置」側。',
        font: `16px ${FONT}`,
        color: COLORS.GRAY,
        lh: 24,
      },
    ],
  });

  ctx.fillStyle = COLORS.ACCENT;
  ctx.font = `bold 22px ${FONT}`;
  ctx.fillText('【比較表】自治紛争処理委員 vs 国地方係争処理委員会', M, y + 8);
  y += 36;
  y = drawMainTable(ctx, y);

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 18,
    bg: '#ecfdf5',
    border: COLORS.GREEN,
    borderW: 2,
    lines: [
      { text: '本肢を分解して覚える', font: `bold 20px ${FONT}`, color: COLORS.GREEN, lh: 28 },
      {
        text: '○ 「自治事務の紛争を処理するため設けられた」→ 251条1項の役割の一部は正しいが、都道府県の関与の審査等も含む',
        font: `17px ${FONT}`,
        color: '#0f172a',
        lh: 26,
      },
      {
        text: '× 「都道府県は必ず常勤」→ 3項で**非常勤**。監査委員の常勤（196条5項）と取り違えない',
        font: `bold 17px ${FONT}`,
        color: COLORS.RED,
        lh: 28,
      },
    ],
  });

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 16,
    bg: '#ede9fe',
    border: COLORS.PURPLE,
    borderW: 2,
    lines: [
      { text: '▶ 試験暗記', font: `bold 22px ${FONT}`, color: COLORS.PURPLE, lh: 28 },
      { text: '① 自治紛争＝非常勤・事件ごと・3人', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '② 国地方＝常置・5人・国の関与', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '③ 「常勤必置」は×（251条3項）', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
    ],
  });

  const out = trimCanvas(canvas, y + 24);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out.toBuffer('image/png'));
  console.log('wrote', OUT);
}

main();
