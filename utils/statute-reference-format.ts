/**
 * スプレッドシート I 列・条文ブロック向け: 見出しのみ太字、項・号の切れ目で改行、MarkdownText 用に ** で囲う。
 * 漢数字の条・項番号はアラビア数字に変換。スプレッドシート由来の改行・[[red:]] / [[c:#]] は維持する。
 */

import { repairBrokenMarkupTags, transformOutsideMarkupBlocks } from '@/utils/markup-tags';

const KANJI_DIGITS: Record<string, number> = {
  '〇': 0,
  '零': 0,
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
};

const KANJI_NUMERAL_RE = /^[〇零一二三四五六七八九十百千]+$/;

const ARTICLE_HEAD_RE =
  /第[一二三四五六七八九十百千〇0-9]+条(?!第[一二三四五六七八九十0-9０-９]+項)/;
const PAREN_HEAD_RE = /（[^）]{1,120}）/g;

/** 条文中の「号」見出し（一　〜 二十　）。長い語を先にマッチ */
const GOU_KANJI_MARKER =
  '二十|十九|十八|十七|十六|十五|十四|十三|十二|十一|十|[一二三四五六七八九]';

/** 漢数字列を数値に。例: 八百三十八→838、十→10 */
export function parseKanjiNumber(kanji: string): number | null {
  const s = String(kanji || '').trim();
  if (!s) return null;
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  if (!KANJI_NUMERAL_RE.test(s)) return null;

  let total = 0;
  let num = 0;
  for (const ch of s) {
    if (ch in KANJI_DIGITS) {
      num = KANJI_DIGITS[ch];
    } else if (ch === '十') {
      total += (num || 1) * 10;
      num = 0;
    } else if (ch === '百') {
      total += (num || 1) * 100;
      num = 0;
    } else if (ch === '千') {
      total += (num || 1) * 1000;
      num = 0;
    } else {
      return null;
    }
  }
  return total + num;
}

/** 条文番号の漢数字をアラビア数字へ（第百六十六条→第166条、条の二→条の2 等） */
export function convertStatuteKanjiNumeralsToArabic(raw: string): string {
  let s = String(raw || '');
  s = s.replace(/第([〇零一二三四五六七八九十百千]+)条/g, (_, kanji: string) => {
    const n = parseKanjiNumber(kanji);
    return n != null ? `第${n}条` : `第${kanji}条`;
  });
  s = s.replace(/第([〇零一二三四五六七八九十百千]+)項/g, (_, kanji: string) => {
    const n = parseKanjiNumber(kanji);
    return n != null ? `第${n}項` : `第${kanji}項`;
  });
  s = s.replace(/条の([〇零一二三四五六七八九十]+)(?![〇零一二三四五六七八九十百千])/g, (_, kanji: string) => {
    const n = parseKanjiNumber(kanji);
    return n != null ? `条の${n}` : `条の${kanji}`;
  });
  return s;
}

/** 全角数字 → 半角 */
function normalizeFullwidthDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 行頭または改行直後の号（一　〜 十一　）をアラビア数字に */
function convertGouKanjiMarkersToArabic(s: string): string {
  const re = new RegExp(`(^|\\n)(${GOU_KANJI_MARKER})([　\\t ])`, 'gm');
  return s.replace(re, (_, prefix, kanji, sp) => {
    const n = parseKanjiNumber(kanji);
    return n != null ? `${prefix}${n}${sp}` : `${prefix}${kanji}${sp}`;
  });
}

/** 2項以降の「２　」「2　」等を行頭に寄せ、数字を半角に */
function normalizeKouLineMarkers(s: string): string {
  let t = s.replace(/。([ \u3000]*)([２-９]|[2-9])([　\t ])/g, '。\n$2$3');
  t = t.replace(/(^|\n)([２-９]|[2-9])([　\t ])/gm, (_, prefix, digit, sp) => {
    const d = normalizeFullwidthDigits(digit);
    return `${prefix}${d}${sp}`;
  });
  return t;
}

/**
 * 1行に詰まった号・項の前に改行を入れる（I列に改行が無い／途中改行が消えたケースも含む）。
 */
function insertNewlineBeforeGouAndKou(s: string): string {
  const gou = GOU_KANJI_MARKER;
  const blocks = s.split('\n');
  const out: string[] = [];
  for (const block of blocks) {
    if (!block.trim()) {
      out.push(block);
      continue;
    }
    let b = block;
    b = b.replace(new RegExp(`([。．!?！？])([ \\u3000]*)(${gou})([　\\t ])`, 'g'), '$1\n$3$4');
    b = b.replace(/([。．!?！？])([ \u3000]*)([２-９]|[2-9])([　\t ])/g, '$1\n$3$4');
    b = b.replace(
      new RegExp(`([\\u3040-\\u9fff〇零]) ([ \\u3000])(${gou})([　\\t ])`, 'g'),
      '$1\n$3$4'
    );
    b = b.replace(new RegExp(`([\\u3040-\\u9fff〇零])(${gou})([　\\t ])`, 'g'), '$1\n$2$3');
    out.push(b);
  }
  return out.join('\n');
}

/** 複数条文が1ブロックに続くとき、（見出し）＋第N条の前に改行 */
function insertNewlineBeforeStatuteSectionHeads(s: string): string {
  return s.replace(/([^\n])(（[^）]{1,80}）[ \u3000]*\n?第)/g, '$1\n$2');
}

/** 句点の直後に続く ただし */
function insertNewlineBeforeTadashi(s: string): string {
  return s.replace(/。([ \u3000]*)ただし、/g, '。\nただし、');
}

/**
 * 次の項（2項以降）: 。の直後に 1〜2 桁の項番 + 全角スペース
 * （全角数字 ２　 / 半角 2　）
 */
function insertNewlineBeforeKouNumbers(s: string): string {
  let t = s;
  t = t.replace(/。([ \u3000]*)([２-９])([　\u3000])/g, '。\n$2$3');
  t = t.replace(/。([ \u3000]*)([2-9])([　\u3000])/g, '。\n$2$3');
  t = t.replace(/。([ \u3000]*)(1[0-9]|[2-9][0-9])([　\u3000])/g, '。\n$2$3');
  return t;
}

function boldHeadlineOnly(s: string): string {
  const firstPeriod = s.search(/[。．]/);
  const headLen = firstPeriod >= 0 ? firstPeriod + 1 : Math.min(s.length, 480);
  let head = s.slice(0, headLen);
  const tail = s.slice(headLen);

  head = head.replace(ARTICLE_HEAD_RE, '**$&**');
  head = head.replace(PAREN_HEAD_RE, '**$&**');

  return head + tail;
}

/** スプレッドシート I 列の改行を維持（行末空白のみ除去） */
function normalizeStatuteRefLineBreaks(s: string): string {
  return String(s || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n');
}

/** 解説欄に条文全文がそのまま貼られているときの簡易判定（民法・I列相手など） */
export function looksLikeMergedStatuteBlock(s: string): boolean {
  const t = String(s || '')
    .replace(/\r\n/g, '\n')
    .trim();
  if (!t) return false;
  const head = (t.split('\n')[0] ?? '').trim();
  return /^（[^）]{1,120}）/.test(head) || /^第[一二三四五六七八九十百千〇0-9]+条/.test(head);
}

/**
 * 根拠条文ブロックを MarkdownText 向けに整形する（**太字** は uniformWeight: false で有効）。
 * スプレッドシート由来の [[red:]] / [[c:#]] / 改行は保持する（タグ内への改行挿入はしない）。
 */
export function formatStatuteReferenceForMarkdown(raw: string): string {
  let s = normalizeStatuteRefLineBreaks(raw).trim();
  if (!s) return s;

  s = repairBrokenMarkupTags(s);
  s = transformOutsideMarkupBlocks(s, convertStatuteKanjiNumeralsToArabic);

  s = transformOutsideMarkupBlocks(s, insertNewlineBeforeGouAndKou);
  s = transformOutsideMarkupBlocks(s, insertNewlineBeforeStatuteSectionHeads);
  s = transformOutsideMarkupBlocks(s, insertNewlineBeforeTadashi);
  s = transformOutsideMarkupBlocks(s, insertNewlineBeforeKouNumbers);
  s = transformOutsideMarkupBlocks(s, normalizeKouLineMarkers);
  s = transformOutsideMarkupBlocks(s, convertGouKanjiMarkersToArabic);

  if (!/\[\[red:|\[\[c:#|\*\*/.test(s)) {
    s = boldHeadlineOnly(s);
  }

  s = repairBrokenMarkupTags(s);
  return s.replace(/\n{3,}/g, '\n\n').trim();
}
