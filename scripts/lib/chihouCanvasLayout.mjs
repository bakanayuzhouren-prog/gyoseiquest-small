/**
 * 地方自治法 deepdive 図解用レイアウト（重なり防止）
 */
import { createCanvas, registerFont } from 'canvas';

export const COLORS = {
  BG: '#fffbeb',
  ACCENT: '#1d4ed8',
  RED: '#dc2626',
  GREEN: '#059669',
  PURPLE: '#7c3aed',
  ORANGE: '#ea580c',
  GRAY: '#64748b',
  BORDER: '#cbd5e1',
};

export function getFont() {
  for (const p of [
    'C:/Windows/Fonts/meiryo.ttc',
    'C:/Windows/Fonts/msgothic.ttc',
    'C:/Windows/Fonts/YuGothM.ttc',
  ]) {
    try {
      registerFont(p, { family: 'JP' });
      return 'JP';
    } catch {
      /* */
    }
  }
  return 'sans-serif';
}

export function roundRect(ctx, x, y, w, h, r) {
  if (h <= 0) return;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function measureWrappedHeight(ctx, text, maxWidth, lineHeight) {
  const paragraphs = String(text).split('\n');
  let lines = 0;
  for (const para of paragraphs) {
    const chars = [...para];
    let line = '';
    for (const ch of chars) {
      const test = line + ch;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines++;
        line = ch;
      } else {
        line = test;
      }
    }
    if (line) lines++;
  }
  return Math.max(lines, 1) * lineHeight;
}

export function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const paragraphs = String(text).split('\n');
  let cy = y;
  for (const para of paragraphs) {
    const chars = [...para];
    let line = '';
    for (const ch of chars) {
      const test = line + ch;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, cy);
        line = ch;
        cy += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, cy);
      cy += lineHeight;
    }
  }
  return cy;
}

export function drawBadge(ctx, font, text, x, y, color) {
  ctx.font = `bold 18px ${font}`;
  const tw = ctx.measureText(text).width + 20;
  roundRect(ctx, x, y, tw, 30, 6);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillText(text, x + 10, y + 21);
  return x + tw + 14;
}

/** テキストブロックの高さだけ計測 */
export function measureBlock(ctx, lines, innerW) {
  let h = 0;
  for (const { text, font, lh } of lines) {
    ctx.font = font;
    h += measureWrappedHeight(ctx, text, innerW, lh) + 6;
  }
  return h;
}

/** 縦積みブロック（各行の高さを個別計測） */
export function drawStackedBlock(ctx, font, { x, y, w, pad, bg, border, borderW, lines }) {
  const innerW = w - pad * 2;
  const bodyH = measureBlock(ctx, lines, innerW) + pad * 2;
  roundRect(ctx, x, y, w, bodyH, 10);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = borderW;
  ctx.stroke();
  let cy = y + pad + 8;
  for (const { text, font, color, lh } of lines) {
    ctx.font = font;
    ctx.fillStyle = color;
    cy = drawWrapped(ctx, text, x + pad, cy, innerW, lh) + 4;
  }
  return y + bodyH + 12;
}

export function trimCanvas(srcCanvas, finalH) {
  const out = createCanvas(srcCanvas.width, finalH);
  const ctx = out.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, out.width, finalH);
  ctx.drawImage(srcCanvas, 0, 0);
  return out;
}
