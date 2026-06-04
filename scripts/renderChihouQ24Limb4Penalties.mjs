/**
 * Q24 肢4 — ちょきんばこか（縦積み・重なりなし）
 *   node scripts/renderChihouQ24Limb4Penalties.mjs
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
  measureBlock,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './lib/chihouCanvasLayout.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'temp_images', 'quiz', 'gyouseihou', 'chihou', '33-24-4-1.png');
const W = 1400;
const M = 48;
const CW = W - M * 2;
const FONT = getFont();

function main() {
  const canvas = createCanvas(W, 4000);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, W, 4000);

  let y = 52;
  ctx.fillStyle = COLORS.PURPLE;
  ctx.font = `bold 32px ${FONT}`;
  ctx.fillText('Q24 肢4｜ちょきんばこかで14条3項', M, y);
  y += 44;
  ctx.fillStyle = COLORS.GRAY;
  ctx.font = `20px ${FONT}`;
  y = drawWrapped(ctx, '「過料は条例に書けない」→ ×', M, y, CW, 28) + 8;

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 16,
    bg: '#fef2f2',
    border: COLORS.RED,
    borderW: 2,
    lines: [
      { text: '× この肢の罠', font: `bold 22px ${FONT}`, color: COLORS.RED, lh: 28 },
      {
        text: '前半「刑罰は条例に書ける」→ ○　後半「過料は書けない」→ ×',
        font: `19px ${FONT}`,
        color: '#0f172a',
        lh: 28,
      },
      {
        text: '14条3項は「五万円以下の過料」を条例に書けると明文。',
        font: `19px ${FONT}`,
        color: '#0f172a',
        lh: 28,
      },
    ],
  });

  const half = (CW - 16) / 2;
  const leftLines = [
    { text: 'STEP 2｜条例 vs 規則', font: `bold 20px ${FONT}`, color: COLORS.ACCENT, lh: 28 },
    { text: '「じょうれいは重い、きそくは軽い」', font: `bold 22px ${FONT}`, color: COLORS.ORANGE, lh: 32 },
    { text: '条例＝刑罰＋過料 OK', font: `19px ${FONT}`, color: '#0f172a', lh: 28 },
    { text: '規則＝過料のみ', font: `19px ${FONT}`, color: '#0f172a', lh: 28 },
  ];
  const rightLines = [
    { text: 'STEP 3｜数字の語呂', font: `bold 20px ${FONT}`, color: COLORS.GREEN, lh: 28 },
    { text: '「にー・ひゃく・ご」', font: `bold 22px ${FONT}`, color: COLORS.ORANGE, lh: 32 },
    { text: '2年・100万・過料5万', font: `19px ${FONT}`, color: '#0f172a', lh: 28 },
  ];
  const leftH =
    measureBlock(ctx, leftLines, half - 28) + 28;
  const rightH =
    measureBlock(ctx, rightLines, half - 28) + 28;
  const boxH = Math.max(leftH, rightH);

  const yAfterLeft = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: half,
    pad: 16,
    bg: '#eff6ff',
    border: COLORS.ACCENT,
    borderW: 2,
    lines: leftLines,
  });
  const yAfterRight = drawStackedBlock(ctx, FONT, {
    x: M + half + 16,
    y,
    w: half,
    pad: 16,
    bg: '#ecfdf5',
    border: COLORS.GREEN,
    borderW: 2,
    lines: rightLines,
  });
  y = Math.max(yAfterLeft, yAfterRight);

  const choki = [
    { k: 'ちょ', w: '拘留', d: '1〜65日・施設収容' },
    { k: 'きん', w: '拘禁刑', d: '条例は2年以下（旧・懲役・禁錮は統合）' },
    { k: 'ば', w: '罰金', d: '100万円以下' },
    { k: 'こ', w: '科料', d: '1万円未満・刑事の軽い金銭刑' },
    { k: 'か', w: '過料', d: '行政罰・条例も5万以下可', hi: true },
  ];
  ctx.font = `bold 28px ${FONT}`;
  const chokiTitleH = 52;
  const rowH = 72;
  const chokiBodyH = choki.length * rowH + 16;
  roundRect(ctx, M, y, CW, chokiTitleH + chokiBodyH + 12, 14);
  ctx.fillStyle = '#fff7ed';
  ctx.fill();
  ctx.strokeStyle = COLORS.ORANGE;
  ctx.lineWidth = 3;
  ctx.stroke();
  drawBadge(ctx, FONT, '語呂の核', M + 14, y + 12, COLORS.ORANGE);
  ctx.fillStyle = COLORS.ORANGE;
  ctx.fillText('ちょ　きん　ば　こ　か', M + 130, y + 38);

  choki.forEach((it, i) => {
    const ry = y + chokiTitleH + 8 + i * rowH;
    const rowInnerW = CW - 48;
    ctx.font = `bold 18px ${FONT}`;
    const descH = measureWrappedHeight(ctx, it.d, rowInnerW - 90, 24);
    const thisRowH = Math.max(rowH - 8, descH + 28);
    roundRect(ctx, M + 12, ry, CW - 24, thisRowH, 8);
    ctx.fillStyle = it.hi ? '#ecfdf5' : '#fff';
    ctx.fill();
    ctx.strokeStyle = it.hi ? COLORS.GREEN : '#fdba74';
    ctx.lineWidth = it.hi ? 2 : 1;
    ctx.stroke();
    ctx.fillStyle = COLORS.ORANGE;
    ctx.font = `bold 26px ${FONT}`;
    ctx.fillText(it.k, M + 28, ry + 30);
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold 18px ${FONT}`;
    ctx.fillText(it.w, M + 72, ry + 30);
    ctx.font = `17px ${FONT}`;
    drawWrapped(ctx, it.d, M + 72, ry + 52, rowInnerW - 90, 24);
  });
  y += chokiTitleH + chokiBodyH + 24;

  y = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: CW,
    pad: 16,
    bg: '#ecfdf5',
    border: COLORS.GREEN,
    borderW: 3,
    lines: [
      { text: '「か」＝過料は条例に書ける（本肢は×）', font: `bold 22px ${FONT}`, color: COLORS.GREEN, lh: 30 },
      { text: '科料（こ）＝刑事／過料（か）＝行政 → 漢字で区別', font: `19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '語呂：条文に「ご（5万）」→「不可」は誤り', font: `19px ${FONT}`, color: '#0f172a', lh: 28 },
    ],
  });

  const cards = [
    { n: '拘留', yomi: 'ちょ', g: '短期の身柄拘束', note: '自由刑' },
    { n: '拘禁刑', yomi: 'きん', g: '長めの自由刑', note: '2年以下' },
    { n: '罰金', yomi: 'ば', g: '重い金銭刑', note: '100万以下' },
    { n: '科料', yomi: 'こ', g: '軽い金銭刑', note: '刑事・1万未満' },
    { n: '過料', yomi: 'か', g: '行政庁の罰', note: '条例・規則5万以下', hi: true },
    { n: '没収', yomi: '（語呂外）', g: '物を取り上げ', note: '条例にも可' },
  ];
  const cardW = (CW - 20) / 2;
  const cardPad = 14;
  const cardInner = cardW - cardPad * 2;
  ctx.font = `17px ${FONT}`;
  const cardRowH =
    Math.max(
      ...cards.map((c) => {
        ctx.font = `bold 22px ${FONT}`;
        const nh = 32;
        ctx.font = `bold 15px ${FONT}`;
        const yh = measureWrappedHeight(ctx, `${c.yomi}＝ちょきんばこか`, cardInner, 22);
        ctx.font = `17px ${FONT}`;
        const gh = measureWrappedHeight(ctx, c.g, cardInner, 24);
        ctx.font = `15px ${FONT}`;
        const nh2 = measureWrappedHeight(ctx, c.note, cardInner, 20);
        return nh + yh + gh + nh2 + 36;
      }),
    ) + 16;

  ctx.fillStyle = COLORS.PURPLE;
  ctx.font = `bold 21px ${FONT}`;
  ctx.fillText('STEP 4｜ちょきんばこか＋没収', M, y + 24);
  y += 44;

  for (let i = 0; i < cards.length; i += 2) {
    const row = cards.slice(i, i + 2);
    row.forEach((c, col) => {
      const x = M + col * (cardW + 20);
      roundRect(ctx, x, y, cardW, cardRowH, 10);
      ctx.fillStyle = c.hi ? '#ecfdf5' : '#eff6ff';
      ctx.fill();
      ctx.strokeStyle = c.hi ? COLORS.GREEN : COLORS.ACCENT;
      ctx.lineWidth = c.hi ? 3 : 2;
      ctx.stroke();
      let cy = y + cardPad + 26;
      ctx.fillStyle = c.hi ? COLORS.GREEN : COLORS.ACCENT;
      ctx.font = `bold 22px ${FONT}`;
      ctx.fillText(c.n, x + cardPad, cy);
      cy += 28;
      ctx.fillStyle = COLORS.ORANGE;
      ctx.font = `bold 15px ${FONT}`;
      cy = drawWrapped(ctx, `${c.yomi}＝ちょきんばこか`, x + cardPad, cy, cardInner, 22) + 4;
      ctx.fillStyle = '#0f172a';
      ctx.font = `17px ${FONT}`;
      cy = drawWrapped(ctx, c.g, x + cardPad, cy, cardInner, 24) + 6;
      ctx.fillStyle = COLORS.GRAY;
      ctx.font = `15px ${FONT}`;
      drawWrapped(ctx, c.note, x + cardPad, cy, cardInner, 20);
    });
    y += cardRowH + 14;
  }

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
      { text: '① ちょきんばこか＋没収', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '② じょうれいは重い／きそくは軽い', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '③ にーひゃくご＝2年・100万・過料5万', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
      { text: '④ 本肢「過料不可」→ ×', font: `bold 19px ${FONT}`, color: '#0f172a', lh: 28 },
    ],
  });

  const out = trimCanvas(canvas, y + 32);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out.toBuffer('image/png'));
  console.log('wrote', OUT, `${W}x${y + 32}`);
}

main();
