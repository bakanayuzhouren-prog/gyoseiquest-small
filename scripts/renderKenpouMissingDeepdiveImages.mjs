/**
 * 憲法の見て聞いて覚える「もっと深掘る」で、kenpou/N-230 画像がない行に
 * 軽量な図解PNGを生成する。
 *
 *   node scripts/renderKenpouMissingDeepdiveImages.mjs
 *   node scripts/renderKenpouMissingDeepdiveImages.mjs --limit=5
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';
import {
  drawWrapped,
  getFont,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './lib/chihouCanvasLayout.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const OUT_DIR = path.join(ROOT, 'assets', 'images', 'deepdive', 'kenpou');
const W = 1440;
const M = 54;
const CW = W - M * 2;
const FONT = getFont();

const C = {
  bg: '#fffaf0',
  paper: '#ffffff',
  ink: '#111827',
  muted: '#475569',
  line: '#111827',
  yellow: '#fff3a6',
  yellow2: '#fff8d6',
  blue: '#2563eb',
  blueSoft: '#eff6ff',
  green: '#059669',
  greenSoft: '#ecfdf5',
  orange: '#d97706',
  orangeSoft: '#fff7ed',
  red: '#dc2626',
  redSoft: '#fef2f2',
  purple: '#7c3aed',
  purpleSoft: '#f5f3ff',
};

function parseArgs(argv) {
  const args = { limit: 0, refreshGenerated: false };
  for (const arg of argv) {
    if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length)) || 0;
    if (arg === '--refresh-generated') args.refreshGenerated = true;
  }
  return args;
}

function existingKenpouImageNumbers() {
  if (!fs.existsSync(OUT_DIR)) return new Set();
  const nums = fs.readdirSync(OUT_DIR)
    .map((file) => {
      const m = file.match(/^(\d+)-230(?:$|[\s.-])/);
      return m ? Number(m[1]) : null;
    })
    .filter((n) => Number.isFinite(n));
  return new Set(nums);
}

function stripTags(text) {
  return String(text || '')
    .replace(/\[\[image:[^\]]+\]\]/g, '')
    .replace(/\[\[LINK:[^\]]+\]\]/g, '')
    .replace(/\*\*/g, '')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function cleanLine(line) {
  return stripTags(line)
    .replace(/^[-・●]\s*/, '')
    .replace(/^\d+[.)．、：:]\s*/, '')
    .replace(/^💡\s*/, '')
    .trim();
}

function splitSentences(text) {
  const clean = stripTags(text).replace(/\r\n/g, '\n');
  const rough = clean
    .split(/(?<=[。！？!?])|\n+/)
    .map((s) => cleanLine(s))
    .filter((s) => s.length >= 8);
  return [...new Set(rough)];
}

function pickTitle(body, n) {
  const lines = String(body || '').split(/\r?\n/).map(cleanLine).filter(Boolean);
  const first = lines.find((line) => !line.startsWith('```')) || `憲法 第${n}問`;
  return first.length > 34 ? `${first.slice(0, 33)}…` : first;
}

function pickBullets(body, title) {
  const sentences = splitSentences(body)
    .filter((s) => s !== title)
    .filter((s) => !/^```/.test(s));
  const important = sentences.filter((s) => /憲法|判例|最高裁|条|違憲|合憲|国会|内閣|裁判|権利|自由|例外|原則|要件|数字|期間|議決|選挙|審査/.test(s));
  const pool = important.length >= 4 ? important : sentences;
  return pool.slice(0, 5).map((s) => (s.length > 74 ? `${s.slice(0, 73)}…` : s));
}

function themeFor(title, body) {
  const text = `${title}\n${body}`;
  if (/国会|議院|衆議院|参議院|法律案|立法|議決|緊急集会/.test(text)) {
    return { name: '統治：国会', color: C.blue, soft: C.blueSoft, icon: 'diet' };
  }
  if (/内閣|総理|国務大臣|行政権|予算|財政|条約/.test(text)) {
    return { name: '統治：内閣・財政', color: C.green, soft: C.greenSoft, icon: 'cabinet' };
  }
  if (/裁判|司法|裁判官|最高裁|違憲審査|国民審査/.test(text)) {
    return { name: '統治：司法', color: C.purple, soft: C.purpleSoft, icon: 'court' };
  }
  if (/選挙|投票|一票|普通選挙|在外/.test(text)) {
    return { name: '選挙・参政権', color: C.orange, soft: C.orangeSoft, icon: 'ballot' };
  }
  if (/表現|報道|検閲|集会|通信|出版/.test(text)) {
    return { name: '表現の自由', color: C.red, soft: C.redSoft, icon: 'speech' };
  }
  if (/平等|14条|差別|非嫡出|夫婦|再婚/.test(text)) {
    return { name: '平等原則', color: C.purple, soft: C.purpleSoft, icon: 'scale' };
  }
  if (/政教|宗教|神社|地鎮祭/.test(text)) {
    return { name: '政教分離', color: C.orange, soft: C.orangeSoft, icon: 'separation' };
  }
  if (/教育|学問|大学|教科書|旭川|家永/.test(text)) {
    return { name: '教育・学問', color: C.green, soft: C.greenSoft, icon: 'book' };
  }
  return { name: '人権・憲法総論', color: C.blue, soft: C.blueSoft, icon: 'constitution' };
}

function drawIcon(ctx, kind, x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (kind === 'diet' || kind === 'court' || kind === 'constitution') {
    ctx.beginPath();
    ctx.moveTo(x + size * 0.12, y + size * 0.45);
    ctx.lineTo(x + size * 0.5, y + size * 0.16);
    ctx.lineTo(x + size * 0.88, y + size * 0.45);
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      const cx = x + size * (0.24 + i * 0.17);
      ctx.beginPath();
      ctx.moveTo(cx, y + size * 0.48);
      ctx.lineTo(cx, y + size * 0.82);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x + size * 0.16, y + size * 0.86);
    ctx.lineTo(x + size * 0.84, y + size * 0.86);
    ctx.stroke();
  } else if (kind === 'scale') {
    ctx.beginPath();
    ctx.moveTo(x + size * 0.5, y + size * 0.16);
    ctx.lineTo(x + size * 0.5, y + size * 0.82);
    ctx.moveTo(x + size * 0.22, y + size * 0.32);
    ctx.lineTo(x + size * 0.78, y + size * 0.32);
    ctx.stroke();
    ctx.strokeRect(x + size * 0.13, y + size * 0.48, size * 0.22, size * 0.14);
    ctx.strokeRect(x + size * 0.65, y + size * 0.48, size * 0.22, size * 0.14);
  } else if (kind === 'ballot') {
    roundRect(ctx, x + size * 0.15, y + size * 0.28, size * 0.7, size * 0.54, 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.32, y + size * 0.22);
    ctx.lineTo(x + size * 0.68, y + size * 0.22);
    ctx.lineTo(x + size * 0.76, y + size * 0.45);
    ctx.lineTo(x + size * 0.24, y + size * 0.45);
    ctx.closePath();
    ctx.stroke();
  } else if (kind === 'speech') {
    roundRect(ctx, x + size * 0.12, y + size * 0.2, size * 0.76, size * 0.5, 24);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.36, y + size * 0.7);
    ctx.lineTo(x + size * 0.28, y + size * 0.88);
    ctx.lineTo(x + size * 0.52, y + size * 0.7);
    ctx.stroke();
  } else {
    roundRect(ctx, x + size * 0.18, y + size * 0.18, size * 0.64, size * 0.68, 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.3, y + size * 0.34);
    ctx.lineTo(x + size * 0.7, y + size * 0.34);
    ctx.moveTo(x + size * 0.3, y + size * 0.5);
    ctx.lineTo(x + size * 0.7, y + size * 0.5);
    ctx.moveTo(x + size * 0.3, y + size * 0.66);
    ctx.lineTo(x + size * 0.58, y + size * 0.66);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPanel(ctx, x, y, w, h, index, title, body, theme) {
  roundRect(ctx, x, y, w, h, 16);
  ctx.fillStyle = C.paper;
  ctx.fill();
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = theme.soft;
  ctx.fillRect(x + 4, y + 4, w - 8, 64);
  ctx.fillStyle = '#111827';
  ctx.fillRect(x + 16, y + 12, 52, 44);
  ctx.fillStyle = '#fff';
  ctx.font = `bold 30px ${FONT}`;
  ctx.fillText(String(index), x + 33, y + 45);
  ctx.fillStyle = C.ink;
  ctx.font = `bold 34px ${FONT}`;
  drawWrapped(ctx, title, x + 88, y + 45, w - 116, 40);

  drawIcon(ctx, theme.icon, x + 30, y + 94, 130, theme.color);
  ctx.fillStyle = C.ink;
  ctx.font = `bold 28px ${FONT}`;
  drawWrapped(ctx, body, x + 188, y + 120, w - 220, 40);
}

function renderItem({ n, body }) {
  const title = pickTitle(body, n);
  const bullets = pickBullets(body, title);
  const theme = themeFor(title, body);
  const core = bullets[0] || '結論・根拠・例外を分けて整理する。';
  const axis = bullets[1] || '問題文では、誰の権限か、どの条文か、どの例外かを見る。';
  const trap = bullets[2] || '「常に」「すべて」「直ちに」などの強い語句に注意する。';
  const memory = bullets.slice(3, 5).join('\n') || '結論を短く言い、理由を1つ添えて戻る。';

  const panels = [
    ['結論を固定', core],
    ['見る軸', axis],
    ['ひっかけ', trap],
    ['復習チャンク', memory],
  ];

  const panelW = (CW - 26) / 2;
  const lineHeights = panels.map(([, text]) => {
    const c = createCanvas(10, 10).getContext('2d');
    c.font = `bold 28px ${FONT}`;
    return measureWrappedHeight(c, text, panelW - 220, 40);
  });
  const panelH = Math.max(310, 138 + Math.max(...lineHeights));
  const headerH = 232;
  const H = headerH + panelH * 2 + 72;
  const canvas = createCanvas(W, H + 80);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H + 80);
  roundRect(ctx, M, 32, CW, 168, 18);
  ctx.fillStyle = C.yellow;
  ctx.fill();
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = C.ink;
  ctx.font = `bold 42px ${FONT}`;
  drawWrapped(ctx, `憲法 ${n}問目：${title}`, M + 34, 84, CW - 68, 50);
  ctx.font = `bold 24px ${FONT}`;
  ctx.fillStyle = theme.color;
  drawWrapped(ctx, `もっと深掘る図解 / ${theme.name}`, M + 36, 166, CW - 72, 32);

  const y1 = headerH;
  drawPanel(ctx, M, y1, panelW, panelH, 1, panels[0][0], panels[0][1], theme);
  drawPanel(ctx, M + panelW + 26, y1, panelW, panelH, 2, panels[1][0], panels[1][1], theme);
  const y2 = y1 + panelH + 26;
  drawPanel(ctx, M, y2, panelW, panelH, 3, panels[2][0], panels[2][1], theme);
  drawPanel(ctx, M + panelW + 26, y2, panelW, panelH, 4, panels[3][0], panels[3][1], theme);

  ctx.fillStyle = C.muted;
  ctx.font = `20px ${FONT}`;
  ctx.fillText('原問ではなく、学習アプリ用に論点を再構成した図解です。', M + 12, H + 30);

  return trimCanvas(canvas, H + 52);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { LEARN_CONTENT, LEARN_DEEPDIVE } = require(path.join(ROOT, 'src', 'learn.js'));
  const content = LEARN_CONTENT['憲法'] || [];
  const deepdive = LEARN_DEEPDIVE['憲法'] || [];
  const existing = existingKenpouImageNumbers();
  const targets = [];

  for (let i = 0; i < content.length; i += 1) {
    const n = i + 1;
    const body = String(deepdive[i] || '').trim();
    if (!body) continue;
    if (existing.has(n)) {
      if (!args.refreshGenerated) continue;
      const exactPng = path.join(OUT_DIR, `${n}-230.png`);
      if (!fs.existsSync(exactPng)) continue;
      const size = fs.statSync(exactPng).size;
      if (size > 600_000) continue;
    }
    targets.push({ n, body });
  }

  const selected = args.limit > 0 ? targets.slice(0, args.limit) : targets;
  for (const item of selected) {
    const out = path.join(OUT_DIR, `${item.n}-230.png`);
    const canvas = renderItem(item);
    fs.writeFileSync(out, canvas.toBuffer('image/png', { compressionLevel: 9 }));
    console.log(`generated ${path.relative(ROOT, out)}`);
  }
  console.log(`done: ${selected.length}/${targets.length} missing kenpou deepdive images`);
}

main();
