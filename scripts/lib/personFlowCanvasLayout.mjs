/**
 * 民法・登場人物関係図（node-canvas）
 * - layout 省略 or "chain": 人物チェーン（Q40型）
 * - layout "landBuilding": 甲土地＋乙建物・縦2コマ（権原なき建物型）
 */
import { createCanvas } from 'canvas';
import {
  COLORS,
  drawWrapped,
  getFont,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './chihouCanvasLayout.mjs';

const NODE_R = 36;
const NODE_GAP = 120;
const PAD = 48;
const CANVAS_W = 1200;

/** @param {'neutral'|'bad'|'sly'} mood */
function drawMoodFace(ctx, cx, cy, r, mood) {
  if (!mood) return;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = mood === 'bad' ? '#fecaca' : mood === 'sly' ? '#fef08a' : '#e0f2fe';
  ctx.fill();
  ctx.strokeStyle = mood === 'bad' ? '#b91c1c' : mood === 'sly' ? '#ca8a04' : '#64748b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = mood === 'bad' ? '#991b1b' : '#334155';
  ctx.lineWidth = 2;

  if (mood === 'neutral') {
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.15, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + r * 0.35, cy - r * 0.15, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.28, cy + r * 0.32);
    ctx.lineTo(cx + r * 0.28, cy + r * 0.32);
    ctx.stroke();
  } else if (mood === 'bad') {
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.55, cy - r * 0.38);
    ctx.lineTo(cx - r * 0.15, cy - r * 0.12);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.55, cy - r * 0.38);
    ctx.lineTo(cx + r * 0.15, cy - r * 0.12);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.02, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + r * 0.35, cy - r * 0.02, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.62, r * 0.32, Math.PI + 0.35, -0.35);
    ctx.stroke();
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.48, cy - r * 0.82);
    ctx.lineTo(cx - r * 0.34, cy - r * 0.48);
    ctx.lineTo(cx - r * 0.62, cy - r * 0.48);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.48, cy - r * 0.82);
    ctx.lineTo(cx + r * 0.34, cy - r * 0.48);
    ctx.lineTo(cx + r * 0.62, cy - r * 0.48);
    ctx.fill();
  } else if (mood === 'sly') {
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.1, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.22, cy - r * 0.1);
    ctx.lineTo(cx + r * 0.48, cy - r * 0.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.18, cy - r * 0.38);
    ctx.lineTo(cx + r * 0.52, cy - r * 0.48);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + r * 0.12, cy + r * 0.28, r * 0.34, 0.15, Math.PI - 0.45);
    ctx.stroke();
  }
}

function resolveMood(moods, id) {
  if (!moods || !id) return null;
  const key = String(id).toUpperCase().slice(0, 1);
  return moods[key] || null;
}

function measureEdgeLabel(ctx, label, font) {
  ctx.font = `bold 15px ${font}`;
  const text = String(label).slice(0, 28);
  const lw = ctx.measureText(text).width + 14;
  return { text, lw, lh: 26 };
}

function drawEdgeLabelBadge(ctx, mx, my, label, font) {
  const { text, lw, lh } = measureEdgeLabel(ctx, label, font);
  roundRect(ctx, mx - lw / 2, my - lh / 2, lw, lh, 5);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = COLORS.ACCENT;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = COLORS.ACCENT;
  ctx.font = `bold 15px ${font}`;
  ctx.textAlign = 'center';
  ctx.fillText(text, mx, my + 5);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#334155';
}

function drawPersonNode(ctx, x, y, id, font, { above } = {}) {
  if (above) {
    ctx.font = `bold 17px ${font}`;
    ctx.fillStyle = COLORS.ACCENT;
    ctx.textAlign = 'center';
    ctx.fillText(String(above).slice(0, 20), x, y - NODE_R - 16);
  }
  ctx.beginPath();
  ctx.arc(x, y, NODE_R, 0, Math.PI * 2);
  ctx.fillStyle = '#dbeafe';
  ctx.fill();
  ctx.strokeStyle = COLORS.ACCENT;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.font = `bold 28px ${font}`;
  ctx.fillStyle = COLORS.ACCENT;
  ctx.textAlign = 'center';
  ctx.fillText(id, x, y + 10);
  ctx.textAlign = 'left';
}

/** 平行四辺形＝甲土地（所有者はラベル内テキスト） */
function drawLand(ctx, cx, baseY, w, h, label, font, mood) {
  const skew = 28;
  const left = cx - w / 2;
  ctx.beginPath();
  ctx.moveTo(left + skew, baseY);
  ctx.lineTo(left + w + skew, baseY);
  ctx.lineTo(left + w, baseY + h);
  ctx.lineTo(left, baseY + h);
  ctx.closePath();
  ctx.fillStyle = '#ecfccb';
  ctx.fill();
  ctx.strokeStyle = '#65a30d';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.font = `bold 18px ${font}`;
  ctx.fillStyle = '#365314';
  ctx.textAlign = 'center';
  const labelCx = cx + skew / 2;
  const labelY = baseY + h / 2 + 6;
  ctx.fillText(label, labelCx, labelY);

  if (mood) {
    const tw = ctx.measureText(label).width;
    drawMoodFace(ctx, labelCx + tw / 2 + 30, baseY + h / 2 + 4, 22, mood);
  }
  ctx.textAlign = 'left';
}

/** 建物（台形＋屋根）＋右側に役割ラベル（丸なし） */
function drawBuildingOnLand(ctx, sceneCx, landTop, lines, sideLabel, font, mood) {
  const bw = 200;
  const bh = 88;
  const roofH = 36;
  const buildingCx = sceneCx - 56;
  const bx = buildingCx - bw / 2;
  const by = landTop - bh - roofH + 8;

  ctx.beginPath();
  ctx.moveTo(buildingCx, by - roofH);
  ctx.lineTo(bx + bw + 12, by + 8);
  ctx.lineTo(bx - 12, by + 8);
  ctx.closePath();
  ctx.fillStyle = '#fef3c7';
  ctx.fill();
  ctx.strokeStyle = COLORS.ORANGE;
  ctx.lineWidth = 2;
  ctx.stroke();

  roundRect(ctx, bx, by + 8, bw, bh, 6);
  ctx.fillStyle = '#fffbeb';
  ctx.fill();
  ctx.strokeStyle = COLORS.ORANGE;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  let ty = by + 32;
  for (const line of lines) {
    const long = line.length > 9;
    ctx.font = line.startsWith('（') ? `15px ${font}` : long ? `bold 14px ${font}` : `bold 16px ${font}`;
    ctx.fillStyle = line.startsWith('（') ? COLORS.GRAY : '#92400e';
    ctx.fillText(line, buildingCx, ty);
    ty += long ? 20 : 22;
  }

  if (sideLabel) {
    const faceOffset = mood ? 52 : 0;
    const labelX = bx + bw + 36 + faceOffset;
    const lines2 = String(sideLabel).split('\n');
    let ly = by + 8 + bh / 2 + 6 - ((lines2.length - 1) * 11);
    if (mood) {
      drawMoodFace(ctx, bx + bw + 36 + 22, by + 8 + bh / 2 + 4, 22, mood);
    }
    ctx.textAlign = 'left';
    for (const line of lines2) {
      ctx.font = `bold 17px ${font}`;
      ctx.fillStyle = COLORS.ACCENT;
      ctx.fillText(line.slice(0, 24), labelX, ly);
      ly += 22;
    }
  }
  ctx.textAlign = 'left';
}

function drawDownArrow(ctx, cx, y1, y2, label, font) {
  ctx.strokeStyle = '#334155';
  ctx.fillStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, y1);
  ctx.lineTo(cx, y2 - 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, y2);
  ctx.lineTo(cx - 10, y2 - 14);
  ctx.lineTo(cx + 10, y2 - 14);
  ctx.closePath();
  ctx.fill();
  if (label) {
    drawEdgeLabelBadge(ctx, cx, (y1 + y2) / 2, label, font);
  }
}

/**
 * 甲土地＋乙建物・Before/After 縦2コマ
 * @param {object} data
 */
export function renderPersonFlowLandBuildingDiagram(data) {
  const font = getFont();
  const canvas = createCanvas(CANVAS_W, 920);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, CANVAS_W, 920);

  const cx = CANVAS_W / 2;
  const landW = 520;
  const landH = 72;
  const owner = String(data.land?.owner || 'A').toUpperCase().slice(0, 1);
  const landLabelBefore = data.land?.label || `①甲土地（${owner}所有）`;
  const landLabelAfter = data.after?.landLabel || `甲土地（${owner}所有）`;
  const moods = data.moods || {};
  const builderId =
    data.before?.person ||
    data.before?.sideLabel?.match(/=([A-H])$/)?.[1] ||
    data.before?.buildingTags?.[0]?.match(/②([A-H])が/)?.[1] ||
    'B';
  const transfereeId =
    data.after?.person ||
    data.after?.sideLabel?.match(/=([A-H])$/)?.[1] ||
    'C';

  const beforeY = PAD + 40;
  drawLand(ctx, cx, beforeY + 140, landW, landH, landLabelBefore, font, resolveMood(moods, owner));
  drawBuildingOnLand(
    ctx,
    cx,
    beforeY + 140,
    [
      data.before?.buildingTitle || '乙建物',
      ...(data.before?.buildingTags || ['②Bが権原なく建設', '（B名義）']),
    ],
    data.before?.sideLabel || `占有者＝${String(builderId).toUpperCase().slice(0, 1)}`,
    font,
    resolveMood(moods, builderId),
  );

  const midY1 = beforeY + 280;
  const midY2 = midY1 + 72;
  drawDownArrow(ctx, cx, midY1, midY2, data.transition?.label || '②建物をCに譲渡', font);

  const afterY = midY2 + 24;
  drawLand(ctx, cx, afterY + 140, landW, landH, landLabelAfter, font, resolveMood(moods, owner));
  drawBuildingOnLand(
    ctx,
    cx,
    afterY + 140,
    [data.after?.buildingTitle || '乙建物', ...(data.after?.buildingTags || ['（B名義のまま）'])],
    data.after?.sideLabel ||
      data.after?.personAbove ||
      `③現占有者＝${String(transfereeId).toUpperCase().slice(0, 1)}`,
    font,
    resolveMood(moods, transfereeId),
  );

  return trimCanvas(canvas, afterY + 320);
}

function resolveEdgeLabelLayout(e, p1, p2, nodeY, font, ctx) {
  const label = String(e.label || '').slice(0, 28);
  if (!label) return null;
  const mx = (p1.x + p2.x) / 2;
  const gap = Math.abs(p2.x - p1.x) - NODE_R * 2;
  const { lw } = measureEdgeLabel(ctx, label, font);
  const elevated = e.labelAbove === true || lw > gap - 8;
  const my = elevated ? nodeY - NODE_R - 52 : (p1.y + p2.y) / 2 - 18;
  return { mx, my, label, elevated };
}

function renderPersonFlowChainDiagram(data) {
  const font = getFont();
  const nodes = (data.nodes || []).slice(0, 8);
  const edges = (data.edges || []).slice(0, 12);
  const assets = (data.assets || []).slice(0, 3);

  const canvas = createCanvas(CANVAS_W, 800);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, CANVAS_W, 800);

  let y = PAD;

  if (assets.length > 0) {
    ctx.font = `bold 20px ${font}`;
    ctx.fillStyle = COLORS.GRAY;
    ctx.fillText('対象', PAD, y + 20);
    let ax = PAD + 70;
    for (const a of assets) {
      const label = String(a.label || '物').slice(0, 12);
      ctx.font = `18px ${font}`;
      const tw = ctx.measureText(label).width + 32;
      roundRect(ctx, ax, y, tw, 40, 8);
      ctx.fillStyle = '#fef3c7';
      ctx.fill();
      ctx.strokeStyle = COLORS.ORANGE;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#92400e';
      ctx.fillText(label, ax + 16, y + 26);
      ax += tw + 16;
    }
    y += 56;
  }

  const nodeIds = [];
  for (const n of nodes) {
    const id = String(n.id || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2);
    if (id && !nodeIds.includes(id)) nodeIds.push(id);
  }
  for (const e of edges) {
    for (const k of ['from', 'to']) {
      const id = String(e[k] || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2);
      if (id && !nodeIds.includes(id)) nodeIds.push(id);
    }
  }
  if (nodeIds.length === 0) nodeIds.push('A', 'B');

  const totalW = nodeIds.length * (NODE_R * 2 + NODE_GAP) - NODE_GAP;
  const startX = Math.max(PAD, (CANVAS_W - totalW) / 2);
  const hasAboveLabels = nodes.some((n) => n.above);
  if (hasAboveLabels) y += 20;
  const nodeY = y + 80;
  const positions = {};
  /** @type {{ mx:number, my:number, label:string }[]} */
  const pendingEdgeLabels = [];

  nodeIds.forEach((id, i) => {
    positions[id] = { x: startX + i * (NODE_R * 2 + NODE_GAP) + NODE_R, y: nodeY };
  });

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.fillStyle = '#334155';
  for (const e of edges) {
    const from = String(e.from || '').toUpperCase().slice(0, 2);
    const to = String(e.to || '').toUpperCase().slice(0, 2);
    const p1 = positions[from];
    const p2 = positions[to];
    if (!p1 || !p2) continue;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const endInset = e.arrow === false ? NODE_R + 4 : NODE_R + 8;
    const x1 = p1.x + ux * (NODE_R + 4);
    const y1 = p1.y + uy * (NODE_R + 4);
    const x2 = p2.x - ux * endInset;
    const y2 = p2.y - uy * endInset;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    if (e.arrow !== false) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const ah = 12;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ah * Math.cos(angle - 0.35), y2 - ah * Math.sin(angle - 0.35));
      ctx.lineTo(x2 - ah * Math.cos(angle + 0.35), y2 - ah * Math.sin(angle + 0.35));
      ctx.closePath();
      ctx.fill();
    }

    const layout = resolveEdgeLabelLayout(e, p1, p2, nodeY, font, ctx);
    if (layout) pendingEdgeLabels.push(layout);
  }

  for (const n of nodes) {
    const id = String(n.id || '').toUpperCase().slice(0, 2);
    const pos = positions[id];
    if (!pos) continue;

    const above = String(n.above || '').slice(0, 28);
    if (above) {
      ctx.font = `bold 18px ${font}`;
      ctx.fillStyle = COLORS.ACCENT;
      ctx.textAlign = 'center';
      ctx.fillText(above, pos.x, pos.y - NODE_R - 14);
      ctx.textAlign = 'left';
    }

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, NODE_R, 0, Math.PI * 2);
    ctx.fillStyle = '#dbeafe';
    ctx.fill();
    ctx.strokeStyle = COLORS.ACCENT;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = `bold 28px ${font}`;
    ctx.fillStyle = COLORS.ACCENT;
    ctx.textAlign = 'center';
    ctx.fillText(id, pos.x, pos.y + 10);
    ctx.textAlign = 'left';

    const role = String(n.role || '').slice(0, 16);
    if (role) {
      ctx.font = `16px ${font}`;
      ctx.fillStyle = COLORS.GRAY;
      const rw = ctx.measureText(role).width;
      ctx.fillText(role, pos.x - rw / 2, pos.y + NODE_R + 28);
    }
  }

  for (const { mx, my, label } of pendingEdgeLabels) {
    drawEdgeLabelBadge(ctx, mx, my, label, font);
  }

  let bottomY = nodeY + NODE_R + 60;
  for (const n of nodes) {
    const role = String(n.role || '');
    if (role) {
      bottomY = Math.max(bottomY, nodeY + NODE_R + 40 + measureWrappedHeight(ctx, role, 100, 20));
    }
  }

  return trimCanvas(canvas, Math.min(800, bottomY + PAD));
}

function drawActorBox(ctx, cx, cy, actor, font) {
  const id = String(actor.id || '');
  const sub = String(actor.sub || '').slice(0, 14);
  const isInst = actor.kind === 'institution';
  ctx.font = `bold ${id.length > 8 ? 16 : 18}px ${font}`;
  const w = Math.max(140, ctx.measureText(id.slice(0, 12)).width + 48);
  const h = sub ? 72 : 56;
  const left = cx - w / 2;
  const top = cy - h / 2;

  roundRect(ctx, left, top, w, h, 10);
  ctx.fillStyle = isInst ? '#fef3c7' : '#dbeafe';
  ctx.fill();
  ctx.strokeStyle = isInst ? COLORS.ORANGE : COLORS.ACCENT;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = `bold ${id.length > 8 ? 16 : 18}px ${font}`;
  ctx.fillStyle = isInst ? '#92400e' : COLORS.ACCENT;
  ctx.fillText(id.slice(0, 12), cx, cy + (sub ? -6 : 6));
  if (sub) {
    ctx.font = `14px ${font}`;
    ctx.fillStyle = COLORS.GRAY;
    ctx.fillText(sub, cx, cy + 18);
  }
  ctx.textAlign = 'left';
  return { w, h, left, top, right: left + w, bottom: top + h };
}

function drawThingBox(ctx, cx, cy, thing, font) {
  const label = String(thing.label || '動産').slice(0, 8);
  const sub = String(thing.sublabel || '').slice(0, 14);
  const w = 168;
  const h = 76;
  const left = cx - w / 2;
  const top = cy - h / 2;

  roundRect(ctx, left, top, w, h, 8);
  ctx.fillStyle = '#fef9c3';
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = `bold 20px ${font}`;
  ctx.fillStyle = '#854d0e';
  ctx.fillText(label, cx, cy - 8);
  if (sub) {
    ctx.font = `15px ${font}`;
    ctx.fillStyle = '#a16207';
    ctx.fillText(sub, cx, cy + 16);
  }
  ctx.textAlign = 'left';
  return { w, h, left, top, right: left + w, bottom: top + h };
}

function drawHArrow(ctx, x1, y, x2, label, font, { dashed = false, thingLabel } = {}) {
  ctx.strokeStyle = '#334155';
  ctx.fillStyle = '#334155';
  ctx.lineWidth = 2.5;
  if (dashed) ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2 - 12, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x2, y);
  ctx.lineTo(x2 - 14, y - 8);
  ctx.lineTo(x2 - 14, y + 8);
  ctx.closePath();
  ctx.fill();
  const mx = (x1 + x2) / 2;
  if (label) {
    drawEdgeLabelBadge(ctx, mx, y - 28, label, font);
  }
  if (thingLabel) {
    const text = String(thingLabel).slice(0, 16);
    ctx.font = `bold 15px ${font}`;
    const tw = ctx.measureText(text).width + 20;
    const th = 28;
    const ty = y + 18;
    roundRect(ctx, mx - tw / 2, ty - th / 2, tw, th, 6);
    ctx.fillStyle = '#fef9c3';
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#854d0e';
    ctx.textAlign = 'center';
    ctx.fillText(text, mx, ty + 5);
    ctx.textAlign = 'left';
  }
}

function drawVArrow(ctx, x, y1, y2, label, font) {
  ctx.strokeStyle = '#334155';
  ctx.fillStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2 - 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y2);
  ctx.lineTo(x - 8, y2 - 14);
  ctx.lineTo(x + 8, y2 - 14);
  ctx.closePath();
  ctx.fill();
  if (label) {
    drawEdgeLabelBadge(ctx, x + 72, (y1 + y2) / 2, label, font);
  }
}

/**
 * 物の流れ型（動産ラベルは矢印上／下、人物は1段）
 * @param {object} data
 */
function renderPersonFlowThingFlowDiagram(data) {
  const font = getFont();
  const canvas = createCanvas(CANVAS_W, 420);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.BG;
  ctx.fillRect(0, 0, CANVAS_W, 420);

  const title = String(data.title || '物の流れ');
  ctx.font = `bold 22px ${font}`;
  ctx.fillStyle = COLORS.GRAY;
  ctx.fillText(title, PAD, PAD + 8);

  const actorMap = Object.fromEntries((data.actors || []).map((a) => [a.id, a]));
  const positions = {};
  const actorOrder = data.actorOrder || (data.actors || []).map((a) => a.id);
  const n = actorOrder.length;
  const edgeInset = 168;
  const span = CANVAS_W - edgeInset * 2;
  const rowY = PAD + 118;
  const hasEdgeThing = (data.flows || []).some((f) => f.thingLabel);

  actorOrder.forEach((id, i) => {
    const x = edgeInset + (n <= 1 ? span / 2 : (span * i) / (n - 1));
    positions[id] = { x, y: rowY };
    drawActorBox(ctx, x, rowY, actorMap[id], font);
  });

  for (const f of data.flows || []) {
    const p1 = positions[f.from];
    const p2 = positions[f.to];
    if (!p1 || !p2) continue;
    const halfW = 82;
    const x1 = p1.x + (p2.x > p1.x ? halfW : -halfW);
    const x2 = p2.x + (p2.x > p1.x ? -halfW : halfW);
    drawHArrow(ctx, x1, rowY, x2, f.label, font, {
      dashed: f.dashed,
      thingLabel: f.thingLabel,
    });
  }

  const note = String(data.note || '').slice(0, 52);
  if (note) {
    ctx.font = `bold 16px ${font}`;
    ctx.fillStyle = '#b91c1c';
    ctx.textAlign = 'center';
    ctx.fillText(note, CANVAS_W / 2, rowY + (hasEdgeThing ? 108 : 96));
    ctx.textAlign = 'left';
  }

  return trimCanvas(canvas, rowY + (note ? (hasEdgeThing ? 138 : 128) : 88));
}

/** @param {object} data */
export function renderPersonFlowDiagram(data) {
  if (data?.layout === 'landBuilding') {
    return renderPersonFlowLandBuildingDiagram(data);
  }
  if (data?.layout === 'thingFlow') {
    return renderPersonFlowThingFlowDiagram(data);
  }
  return renderPersonFlowChainDiagram(data);
}
