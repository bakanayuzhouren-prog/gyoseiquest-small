/**
 * スプレッドシート I 列・条文ブロック向け: 見出しのみ太字、項・号の切れ目で改行、MarkdownText 用に ** で囲う。
 * 例: （補助開始の審判）と第十五条のみ太字 / ただし・２項・３項・号（一　…）で改行。
 */

const ARTICLE_HEAD_RE =
  /第[一二三四五六七八九十百千〇0-9]+条(?!第[一二三四五六七八九十0-9０-９]+項)/;
const PAREN_HEAD_RE = /（[^）]{1,120}）/g;

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

/**
 * 号の典型的な列挙: 。の後に 一〜十 の 1 字 + 全角スペース（「一　」「二　」）
 */
function insertNewlineBeforeSingleKanjiGou(s: string): string {
  return s.replace(/。([ \u3000]*)([一二三四五六七八九十])([　\u3000])/g, '。\n$2$3');
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
 */
export function formatStatuteReferenceForMarkdown(raw: string): string {
  let s = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
  if (!s) return s;

  s = insertNewlineBeforeTadashi(s);
  s = insertNewlineBeforeKouNumbers(s);
  s = insertNewlineBeforeSingleKanjiGou(s);

  s = boldHeadlineOnly(s);

  return s.replace(/\n{3,}/g, '\n\n').trim();
}
