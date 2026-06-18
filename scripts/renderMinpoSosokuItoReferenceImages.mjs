import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.join(process.cwd(), 'assets', 'images', 'deepdive', 'sousoku');
const W = 1440;
const H = 1180;
const C = {
  ink: '#1F2A24',
  muted: '#5F6F68',
  paper: '#FFFDF6',
  bg: '#EEF5F1',
  line: '#C9D8D1',
  green: '#277564',
  greenSoft: '#DDF1EA',
  orange: '#D98632',
  orangeSoft: '#FFF0D8',
  blue: '#3F6EA8',
  blueSoft: '#E5EFFB',
  red: '#B94646',
  redSoft: '#FBE3E3',
  purple: '#6D5CA8',
  purpleSoft: '#ECE7FA',
  gray: '#EFF3F1',
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrap(s, max) {
  const text = String(s);
  const out = [];
  let line = '';
  for (const ch of text) {
    const weight = /[A-Za-z0-9 .,;:()\-]/.test(ch) ? 0.55 : 1;
    const len = [...line].reduce((n, c) => n + (/[A-Za-z0-9 .,;:()\-]/.test(c) ? 0.55 : 1), 0);
    if (len + weight > max && line && !/[。、，．！？]/.test(ch)) {
      out.push(line);
      line = ch;
    } else {
      line += ch;
    }
  }
  if (line) out.push(line);
  return out;
}

function text(x, y, value, opts = {}) {
  const size = opts.size ?? 28;
  const color = opts.color ?? C.ink;
  const weight = opts.weight ?? 700;
  const anchor = opts.anchor ?? 'start';
  const family = opts.family ?? 'Yu Gothic, Meiryo, Noto Sans CJK JP, sans-serif';
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${esc(family)}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
}

function lines(x, y, value, opts = {}) {
  const size = opts.size ?? 24;
  const lineH = opts.lineH ?? Math.round(size * 1.55);
  const max = opts.max ?? 28;
  const color = opts.color ?? C.ink;
  const weight = opts.weight ?? 600;
  const arr = Array.isArray(value) ? value.flatMap((v) => wrap(v, max)) : wrap(value, max);
  return arr.map((l, i) => text(x, y + i * lineH, l, { size, color, weight })).join('');
}

function rect(x, y, w, h, fill = C.paper, stroke = C.line, r = 22, sw = 2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function pill(x, y, label, fill, color = '#fff', w = 160) {
  return `${rect(x, y, w, 42, fill, fill, 21, 0)}${text(x + w / 2, y + 29, label, { size: 21, color, weight: 900, anchor: 'middle' })}`;
}

function header(title, subtitle) {
  return `
    ${rect(48, 34, W - 96, 112, C.paper, C.line, 24)}
    ${pill(78, 64, '民法総則', C.green, '#fff', 132)}
    ${text(232, 82, title, { size: 38, weight: 900 })}
    ${text(234, 120, subtitle, { size: 21, color: C.muted, weight: 700 })}
  `;
}

function svg(title, subtitle, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  ${header(title, subtitle)}
  ${body}
</svg>`;
}

function table(x, y, widths, rowH, rows, opts = {}) {
  const fill = opts.fill ?? C.paper;
  const headFill = opts.headFill ?? C.green;
  const stripeFill = opts.stripeFill ?? '#F1F4F2';
  const out = [];
  const totalW = widths.reduce((a, b) => a + b, 0);
  const totalH = rowH * rows.length;
  out.push(rect(x, y, totalW, totalH, fill, C.line, 16));
  for (let ri = 1; ri < rows.length; ri += 1) {
    if (ri % 2 === 0) {
      out.push(`<rect x="${x}" y="${y + rowH * ri}" width="${totalW}" height="${rowH}" fill="${stripeFill}"/>`);
    }
  }
  let cy = y;
  rows.forEach((row, ri) => {
    let cx = x;
    if (ri === 0) out.push(`<rect x="${x}" y="${y}" width="${totalW}" height="${rowH}" rx="16" fill="${headFill}"/>`);
    widths.forEach((cw, ci) => {
      if (ci > 0) out.push(`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + rowH}" stroke="${C.line}" stroke-width="2"/>`);
      if (ri > 0) out.push(`<line x1="${cx}" y1="${cy}" x2="${cx + cw}" y2="${cy}" stroke="${C.line}" stroke-width="2"/>`);
      const cell = row[ci] ?? '';
      const isHead = ri === 0;
      const max = Math.max(6, Math.floor(cw / (opts.charW ?? 26)));
      out.push(lines(cx + 18, cy + (isHead ? 38 : 34), cell, {
        size: isHead ? (opts.headSize ?? 22) : (opts.size ?? 21),
        lineH: opts.lineH ?? 31,
        max,
        color: isHead ? '#fff' : C.ink,
        weight: isHead ? 900 : 700,
      }));
      cx += cw;
    });
    cy += rowH;
  });
  out.push(`<rect x="${x}" y="${y}" width="${totalW}" height="${totalH}" rx="16" fill="none" stroke="${C.line}" stroke-width="2"/>`);
  return out.join('');
}

function card(x, y, w, h, titleText, bodyText, tone = 'green') {
  const toneMap = {
    green: [C.green, C.greenSoft],
    orange: [C.orange, C.orangeSoft],
    blue: [C.blue, C.blueSoft],
    red: [C.red, C.redSoft],
    purple: [C.purple, C.purpleSoft],
  };
  const [main, soft] = toneMap[tone] ?? toneMap.green;
  return `
    ${rect(x, y, w, h, C.paper, main, 18, 3)}
    ${pill(x + 18, y + 18, titleText, main, '#fff', Math.min(w - 36, 230))}
    ${lines(x + 24, y + 88, bodyText, { max: Math.floor((w - 48) / 25), size: 24, lineH: 38, color: C.ink })}
  `;
}

function person(cx, cy, fill, label, mood = 'normal') {
  const eyeLeft =
    mood === 'happy'
      ? `<path d="M${cx - 8} ${cy - 8} Q${cx - 5} ${cy - 13} ${cx - 2} ${cy - 8}" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="${cx - 6}" cy="${cy - 8}" r="2.8" fill="${C.ink}"/>`;
  const eyeRight =
    mood === 'happy'
      ? `<path d="M${cx + 3} ${cy - 8} Q${cx + 6} ${cy - 13} ${cx + 9} ${cy - 8}" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="${cx + 7}" cy="${cy - 8}" r="2.8" fill="${C.ink}"/>`;
  const mouth =
    mood === 'angry'
      ? `<path d="M${cx - 8} ${cy + 7} Q${cx} ${cy + 2} ${cx + 8} ${cy + 7}" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      : mood === 'worried'
        ? `<path d="M${cx - 7} ${cy + 7} Q${cx} ${cy + 4} ${cx + 7} ${cy + 7}" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
        : `<path d="M${cx - 7} ${cy + 5} Q${cx} ${cy + 12} ${cx + 7} ${cy + 5}" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const effect =
    mood === 'angry'
      ? `<path d="M${cx - 30} ${cy - 28} l8 -10 l5 12 l10 -8" stroke="${C.red}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : mood === 'worried'
        ? `<path d="M${cx + 27} ${cy - 22} q10 10 0 22" stroke="${C.blue}" stroke-width="4" fill="none" stroke-linecap="round"/>`
        : `<path d="M${cx + 25} ${cy - 30} l6 12 l12 3 l-11 5 l-3 12 l-5 -12 l-12 -3 l11 -5 z" fill="#FFD95A" opacity="0.95"/>`;
  return `
    ${effect}
    <circle cx="${cx}" cy="${cy}" r="28" fill="#fff" stroke="${fill}" stroke-width="5"/>
    <path d="M${cx - 24} ${cy - 5} Q${cx - 12} ${cy - 33} ${cx + 12} ${cy - 27} Q${cx + 28} ${cy - 21} ${cx + 24} ${cy + 1} Q${cx + 4} ${cy - 15} ${cx - 24} ${cy - 5}" fill="${fill}"/>
    <circle cx="${cx}" cy="${cy - 2}" r="18" fill="#FFF0D8"/>
    ${eyeLeft}
    ${eyeRight}
    ${mouth}
    <path d="M${cx - 18} ${cy + 26} Q${cx} ${cy + 10} ${cx + 18} ${cy + 26}" fill="${fill}"/>
    ${text(cx, cy + 55, label, { size: 17, weight: 900, anchor: 'middle', color: C.ink })}
  `;
}

function speech(x, y, w, h, value, fill = '#fff') {
  return `
    ${rect(x, y, w, h, fill, C.line, 12, 2)}
    ${lines(x + 12, y + 26, value, { size: 16, lineH: 22, max: Math.floor((w - 24) / 16), weight: 800 })}
  `;
}

function weaponSceneCard(x, y, w, h, titleText, bullets, tone, scene) {
  const toneMap = {
    blue: [C.blue, C.blueSoft],
    orange: [C.orange, C.orangeSoft],
    red: [C.red, C.redSoft],
  };
  const [main, soft] = toneMap[tone] ?? toneMap.blue;
  return `
    ${rect(x, y, w, h, C.paper, main, 18, 3)}
    ${pill(x + 18, y + 18, titleText, main, '#fff', Math.min(w - 36, 230))}
    ${scene(x + 20, y + 72, w - 40, 154, main, soft)}
    ${lines(x + 24, y + 258, bullets, { max: Math.floor((w - 48) / 21), size: 19, lineH: 27, color: C.ink })}
  `;
}

function demandScene(x, y, w, h, main, soft) {
  const left = x + 76;
  const right = x + w - 76;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${soft}" stroke="${main}" stroke-width="1.5"/>
    ${person(left, y + 58, '#4B7DB8', '相手方', 'angry')}
    ${person(right, y + 58, '#75A878', '本人', 'happy')}
    <path d="M${left + 42} ${y + 56} C${x + w / 2 - 26} ${y + 28}, ${x + w / 2 + 26} ${y + 28}, ${right - 42} ${y + 56}" fill="none" stroke="${main}" stroke-width="5" stroke-linecap="round"/>
    <polygon points="${right - 46},${y + 46} ${right - 24},${y + 56} ${right - 46},${y + 66}" fill="${main}"/>
    ${speech(x + 12, y + 10, 132, 50, '払ってよ！', '#fff')}
    ${speech(x + w - 144, y + 92, 132, 38, 'わかったよ！', '#fff')}
  `;
}

function threePartyScene(x, y, w, h, main, soft) {
  const cx = x + w / 2;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${soft}" stroke="${main}" stroke-width="1.5"/>
    ${person(x + 58, y + 76, '#75A878', '本人', 'worried')}
    ${person(cx, y + 76, '#D79A45', '代理人', 'worried')}
    ${person(x + w - 58, y + 76, '#4B7DB8', '相手方', 'normal')}
    ${speech(x + 10, y + 8, 112, 38, '取消すよ', '#fff')}
    ${speech(cx - 58, y + 8, 116, 38, '代理権なし', '#fff')}
    ${speech(x + w - 124, y + 8, 114, 38, '善意なら可', '#fff')}
  `;
}

function damagesScene(x, y, w, h, main, soft) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${soft}" stroke="${main}" stroke-width="1.5"/>
    ${person(x + 78, y + 62, '#4B7DB8', '相手方', 'angry')}
    ${person(x + w - 78, y + 62, '#C95B5B', '無権代理人', 'worried')}
    <path d="M${x + 124} ${y + 60} H${x + w - 124}" stroke="${main}" stroke-width="5" stroke-linecap="round"/>
    <polygon points="${x + w - 132},${y + 49} ${x + w - 108},${y + 60} ${x + w - 132},${y + 71}" fill="${main}"/>
    ${speech(x + 12, y + 10, 150, 54, '損害賠償だ！', '#fff')}
    ${speech(x + w - 164, y + 90, 152, 42, 'ただし追認前', '#fff')}
  `;
}

function simpleFigure(x, y, label, color = C.green, mood = 'normal') {
  return `
    ${person(x, y, color, label, mood)}
  `;
}

function miniPanel(x, y, w, h, titleText, caption, tone = 'green', body = '') {
  const toneMap = {
    green: [C.green, C.greenSoft],
    orange: [C.orange, C.orangeSoft],
    blue: [C.blue, C.blueSoft],
    red: [C.red, C.redSoft],
    purple: [C.purple, C.purpleSoft],
  };
  const [main, soft] = toneMap[tone] ?? toneMap.green;
  return `
    ${rect(x, y, w, h, soft, main, 18, 2)}
    ${pill(x + 18, y + 18, titleText, main, '#fff', Math.min(w - 36, 190))}
    ${body}
    ${lines(x + 24, y + h - 54, caption, { size: 19, lineH: 26, max: Math.floor((w - 48) / 20), weight: 800 })}
  `;
}

function clockIcon(cx, cy, color = C.orange) {
  return `
    <circle cx="${cx}" cy="${cy}" r="42" fill="#fff" stroke="${color}" stroke-width="7"/>
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 24}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + 24}" y2="${cy + 12}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
  `;
}

function resetArrow(cx, cy, color = C.blue) {
  return `
    <path d="M${cx + 42} ${cy} A42 42 0 1 1 ${cx - 10} ${cy - 39}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
    <polygon points="${cx - 17},${cy - 61} ${cx + 9},${cy - 43} ${cx - 22},${cy - 31}" fill="${color}"/>
    ${text(cx, cy + 13, '0', { size: 38, weight: 900, anchor: 'middle', color })}
  `;
}

function scaleIcon(cx, cy, color = C.green) {
  return `
    <line x1="${cx}" y1="${cy - 44}" x2="${cx}" y2="${cy + 42}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <line x1="${cx - 62}" y1="${cy - 22}" x2="${cx + 62}" y2="${cy - 22}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <path d="M${cx - 48} ${cy - 22} l-24 48 h48 z" fill="#fff" stroke="${color}" stroke-width="5"/>
    <path d="M${cx + 48} ${cy - 22} l-24 48 h48 z" fill="#fff" stroke="${color}" stroke-width="5"/>
    <rect x="${cx - 38}" y="${cy + 45}" width="76" height="14" rx="7" fill="${color}"/>
  `;
}

function rightArrow(x1, y, x2, color = C.green) {
  return `
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
    <polygon points="${x2},${y} ${x2 - 24},${y - 14} ${x2 - 24},${y + 14}" fill="${color}"/>
  `;
}

const images = [
  {
    file: 'ito-sosoku-01-mukendairi-aitegata-hogo.png',
    svg: svg('無権代理：相手方の3つの手段', '元資料の表構造を主役に、催告・取消・117条責任を整理', `
      ${miniPanel(78, 180, 390, 225, '催告', '本人へ「追認する？」', 'blue', `
        ${simpleFigure(185, 278, '相手方', C.blue, 'angry')}
        ${rightArrow(230, 276, 314, C.blue)}
        ${simpleFigure(360, 278, '本人', C.green, 'worried')}
      `)}
      ${miniPanel(525, 180, 390, 225, '取消', '本人・無権代理人へ通知', 'orange', `
        ${simpleFigure(620, 278, '本人', C.green, 'worried')}
        ${simpleFigure(720, 278, '代理人', C.orange, 'worried')}
        ${simpleFigure(820, 278, '相手方', C.blue, 'normal')}
      `)}
      ${miniPanel(972, 180, 390, 225, '責任追及', '履行又は損害賠償', 'red', `
        ${simpleFigure(1082, 278, '相手方', C.blue, 'angry')}
        ${rightArrow(1130, 276, 1210, C.red)}
        ${simpleFigure(1260, 278, '無権代理人', C.red, 'worried')}
      `)}
      ${table(70, 450, [160, 210, 660, 260], 118, [
        ['制度', '使う相手', '内容', '相手方の主観要件'],
        ['催告権', '本人', '相当期間を定めて、追認するかどうか確答するよう催告できる。期間内に確答がなければ追認拒絶扱い。', '善悪問わない'],
        ['取消権', '本人・無権代理人', '本人が追認するまでは、無権代理人と結んだ契約を取り消せる。本人が追認した後は不可。', '善意'],
        ['117条責任（損害賠償）', '無権代理人', '代理権を証明できず、本人の追認もないとき、相手方の選択で履行又は損害賠償。ただし取消後は不可。', '善意無過失']
      ], { size: 19, lineH: 28, charW: 22 })}
      ${card(150, 970, 1140, 145, '試験の急所', ['表見代理が成立し得る場面でも、相手方は無権代理人責任を選べることがある。', 'ただし、相手方が取消権を行使した後は117条責任を追及できない。'], 'green')}
    `),
  },
  {
    file: 'ito-sosoku-02-jikou-kanseiyuyo-koushin.png',
    svg: svg('時効：完成猶予と更新', '完成を止めるだけか、期間をゼロに戻すか', `
      ${miniPanel(105, 178, 560, 215, '完成猶予', '完成を一時停止', 'orange', `
        ${clockIcon(270, 270, C.orange)}
        ${text(380, 270, '止める', { size: 34, weight: 900, color: C.orange })}
      `)}
      ${miniPanel(775, 178, 560, 215, '更新', '0から再スタート', 'blue', `
        ${resetArrow(940, 270, C.blue)}
        ${text(1050, 270, 'リセット', { size: 34, weight: 900, color: C.blue })}
      `)}
      ${table(84, 440, [350, 245, 245, 455], 58, [
        ['事由', '完成猶予', '更新', '整理'],
        ['裁判上の請求等', '○', '○', '裁判で権利確定まで進めば更新'],
        ['強制執行等', '○', '○', '実現手続まで行けば更新'],
        ['仮差押え・仮処分等', '○', '×', '仮の保全は完成猶予にとどまる'],
        ['催告', '○', '×', '6か月以内に次の手続へ進む'],
        ['協議を行う旨の合意', '○', '×', '話合い中は止めるが更新しない'],
        ['承認', '×', '○', '債務者が認めたら0から進む'],
        ['未成年者・成年被後見人', '○', '×', '保護期間だけ完成を止める'],
        ['夫婦間の権利', '○', '×', '婚姻解消後6か月まで保護'],
        ['相続財産・天災等', '○', '×', '権利行使不能を救済']
      ], { size: 18, lineH: 25, charW: 23 })}
    `),
  },
  {
    file: 'ito-sosoku-03-kyougi-goui-151.png',
    svg: svg('151条：協議を行う旨の合意', '話合い中に時効完成する事故を防ぐ', `
      ${miniPanel(92, 176, 390, 220, '合意', '書面・電磁的記録で残す', 'green', `
        ${simpleFigure(202, 250, '債権者', C.blue, 'normal')}
        ${rightArrow(248, 276, 324, C.green)}
        ${simpleFigure(370, 250, '債務者', C.orange, 'normal')}
      `)}
      ${miniPanel(525, 176, 390, 220, '効力', '完成猶予。更新ではない', 'orange', `
        ${clockIcon(720, 278, C.orange)}
      `)}
      ${miniPanel(958, 176, 390, 220, '上限', '再合意しても通算5年', 'blue', `
        ${text(1148, 292, '5年', { size: 56, weight: 900, anchor: 'middle', color: C.blue })}
      `)}
      ${table(100, 445, [350, 890], 104, [
        ['完成猶予が終わる時点', '内容'],
        ['合意から1年', '期間を定めない合意なら、原則ここまで猶予'],
        ['協議期間を定めた場合', 'その期間が経過した時まで猶予'],
        ['協議拒絶の通知', '一方が続行拒絶を通知したときは、通知から6か月まで猶予'],
        ['再度の合意', '再合意は可能。ただし完成猶予の通算は5年を超えられない']
      ], { size: 23, lineH: 34, charW: 25 })}
      ${card(170, 990, 1100, 150, '一言で', '151条は「交渉中だけ時効完成を待ってもらう制度」。承認のように時効を更新する制度ではない。', 'purple')}
    `),
  },
  {
    file: 'ito-sosoku-04-kenri-betsu-jikou.png',
    svg: svg('権利別：取得時効・消滅時効', '権利の性質ごとに○×を整理', `
      ${miniPanel(90, 178, 390, 190, '取得時効', '外形ある権利取得', 'green', `${scaleIcon(285, 272, C.green)}`)}
      ${miniPanel(525, 178, 390, 190, '消滅時効', '不行使で消える', 'orange', `${clockIcon(720, 272, C.orange)}`)}
      ${miniPanel(960, 178, 390, 190, '担保権', '例外が出やすい', 'blue', `${text(1155, 286, '例外', { size: 42, weight: 900, anchor: 'middle', color: C.blue })}`)}
      ${table(86, 410, [390, 280, 280, 340], 94, [
        ['権利の種類', '取得時効', '消滅時効', '注意'],
        ['地上権・永小作権・地役権', '○', '○', '用益物権は両方あり得る'],
        ['債権', '×', '○', '例外：不動産賃借権は取得時効に注意'],
        ['抵当権', '×', '原則×', '396条・397条の例外に注意'],
        ['留置権・先取特権', '×', '×', '担保権でも時効になじまない'],
        ['質権', '○', '×', '占有を伴うため取得時効はあり得る']
      ], { size: 21, lineH: 30, charW: 23 })}
      ${card(130, 995, 1180, 120, '覚え方', '取得時効は「外から見える行使状態」があるか。消滅時効は「権利不行使を理由に消せるか」で見る。', 'green')}
    `),
  },
  {
    file: 'ito-sosoku-05-shoumetsu-jikou-kikan.png',
    svg: svg('消滅時効期間：5年・10年・20年', '主観的起算点と客観的起算点を分ける', `
      ${miniPanel(95, 180, 390, 200, '5年', '知った時から', 'blue', `${text(290, 290, '知った', { size: 44, weight: 900, anchor: 'middle', color: C.blue })}`)}
      ${miniPanel(525, 180, 390, 200, '10年', '行使できる時から', 'orange', `${clockIcon(720, 280, C.orange)}`)}
      ${miniPanel(955, 180, 390, 200, '20年', '生命身体・財産権', 'green', `${text(1150, 290, '20', { size: 56, weight: 900, anchor: 'middle', color: C.green })}`)}
      ${table(88, 430, [430, 520, 330], 118, [
        ['権利', '起算点', '消滅時効期間'],
        ['債権（主観的）', '債権者が権利を行使できることを知った時', '5年'],
        ['債権（客観的）', '権利を行使することができる時', '10年'],
        ['人の生命・身体侵害による損害賠償', '権利を行使することができる時', '20年'],
        ['債権・所有権以外の財産権', '権利を行使することができる時', '20年']
      ], { size: 24, lineH: 36, charW: 24 })}
      ${card(145, 1030, 1150, 112, '試験の急所', '債権は「知った時5年」と「行使可能時10年」のどちらか早い方。生命身体侵害は20年が出る。', 'blue')}
    `),
  },
  {
    file: 'ito-sosoku-06-kisanten-rikouchitai.png',
    svg: svg('起算点比較：時効と履行遅滞', '同じ債権でも、時効と遅滞のスタートはずれる', `
      ${miniPanel(80, 174, 600, 170, '時効の起算点', '行使可能時から', 'green', `${clockIcon(330, 260, C.green)}${text(450, 270, '期間が進む', { size: 32, weight: 900, color: C.green })}`)}
      ${miniPanel(760, 174, 600, 170, '履行遅滞の起算点', '請求・期限到来との関係', 'orange', `${simpleFigure(940, 258, '債権者', C.blue, 'angry')}${rightArrow(990, 256, 1070, C.orange)}${simpleFigure(1120, 258, '債務者', C.orange, 'worried')}`)}
      ${table(54, 380, [310, 430, 560], 68, [
        ['債権類型', '時効の主観的起算点', '履行遅滞の起算点'],
        ['確定期限あり', '期限到来時', '期限到来時（412条1項）'],
        ['不確定期限あり', '期限到来時', '期限到来後の請求時 又は 期限到来を知った時'],
        ['期限の定めなし', '債権成立時', '履行請求を受けた時（412条3項）'],
        ['停止条件付', '条件成就時', '条件成就後に履行請求を受けた時'],
        ['債務不履行の損害賠償', '本来の債権を請求できる時', '履行請求を受けた時'],
        ['契約解除の原状回復', '契約解除時', '履行請求を受けた時'],
        ['不法行為損害賠償', '損害及び加害者を知った時', '不法行為時（判例）'],
        ['返還時期なし消費貸借', '成立後、相当期間経過後', '催告後、相当期間経過後（591条）']
      ], { size: 19, lineH: 27, charW: 23 })}
      ${card(100, 1038, 1240, 92, '注意', '割賦払債権は、1回の支払遅滞だけで残額全部の消滅時効が直ちに進行するわけではない。', 'purple')}
    `),
  },
  {
    file: 'ito-sosoku-07-dairiken-shoumetsu.png',
    svg: svg('代理権の消滅原因', '任意代理と法定代理を並べて見る', `
      ${miniPanel(95, 180, 390, 190, '任意代理', '', 'blue', `${simpleFigure(205, 276, '本人', C.green, 'normal')}${rightArrow(252, 274, 326, C.blue)}${simpleFigure(372, 276, '代理人', C.blue, 'normal')}${text(120, 350, '基礎関係も見る', { size: 18, weight: 900 })}`)}
      ${miniPanel(525, 180, 390, 190, '法定代理', '法律上の代理関係', 'green', `${scaleIcon(720, 272, C.green)}`)}
      ${miniPanel(955, 180, 390, 190, '注意', '本人死亡だけで効力否定ではない', 'red', `${text(1150, 285, '別問題', { size: 40, weight: 900, anchor: 'middle', color: C.red })}`)}
      ${table(84, 420, [330, 260, 260, 440], 84, [
        ['消滅原因', '任意代理', '法定代理', '整理'],
        ['本人の死亡', '○', '○', '111条。本人死亡で代理権は消滅'],
        ['代理人の死亡', '○', '○', '代理人の人格に結びつくため消滅'],
        ['代理人の破産手続開始', '○', '○', '代理人側の信用・管理能力の問題'],
        ['代理人の後見開始', '○', '○', '代理人が行為能力を失う場面'],
        ['本人の破産手続開始', '○', '原則×', '任意代理は委任等の基礎関係で消えることがある'],
        ['解除・解約告知', '○', '×', '任意代理は基礎契約を終了させられる']
      ], { size: 22, lineH: 32, charW: 24 })}
    `),
  },
  {
    file: 'ito-sosoku-08-mukendairi-souzoku.png',
    svg: svg('無権代理と相続', '地位融合説と資格併存説を場面で使い分ける', `
      ${miniPanel(90, 180, 600, 190, '地位融合説', '無権代理人が本人を相続', 'green', `${simpleFigure(250, 280, '無権代理人', C.red, 'worried')}${rightArrow(315, 278, 410, C.green)}${simpleFigure(470, 280, '本人地位', C.green, 'normal')}`)}
      ${miniPanel(750, 180, 600, 190, '資格併存説', '本人が無権代理人を相続', 'blue', `${simpleFigure(915, 280, '本人', C.green, 'normal')}${rightArrow(970, 278, 1065, C.blue)}${simpleFigure(1130, 280, '代理人責任', C.red, 'worried')}`)}
      ${table(70, 410, [390, 430, 430], 98, [
        ['場面', '結論', '理由・試験処理'],
        ['無権代理人が本人を単独相続', '追認拒絶できない', '信義則上、本人の地位で拒絶するのは許されない'],
        ['本人が無権代理人を相続', '追認拒絶できる', '本人としての資格は残る。ただし無権代理人責任も相続し得る'],
        ['無権代理人が本人を共同相続', '当然有効にはならない', '追認は共同相続人全員で行う必要'],
        ['本人が追認拒絶後、無権代理人が相続', '有効化しない', '既に確定した追認拒絶の効果は消えない'],
        ['無権代理人を相続した者が本人も相続', '追認拒絶できない方向', '最終的に無権代理人の責任を負う地位を引き継ぐため']
      ], { size: 20, lineH: 29, charW: 22 })}
      ${card(140, 1032, 1160, 100, '試験の急所', '誰が誰を相続したかを先に固定する。本人資格と無権代理人責任を混ぜると結論を誤る。', 'green')}
    `),
  },
];

await fs.mkdir(OUT_DIR, { recursive: true });

for (const item of images) {
  const svgText = item.svg;
  const svgPath = path.join(OUT_DIR, item.file.replace(/\.png$/, '.svg'));
  const pngPath = path.join(OUT_DIR, item.file);
  await fs.writeFile(svgPath, svgText, 'utf8');
  await sharp(Buffer.from(svgText)).png().toFile(pngPath);
  console.log(`wrote ${path.relative(process.cwd(), pngPath)}`);
}
