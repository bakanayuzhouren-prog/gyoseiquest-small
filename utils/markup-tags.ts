/**
 * MarkdownText 向け [[red:]] / [[c:#]] タグの修復・保護。
 * スプレッドシート由来の改行・ネストでタグが行をまたぐと [[red: や ]] が露出する。
 */

const MARKUP_BLOCK_RE =
  /\[\[red:[\s\S]*?\]\]|\[\[c:#[0-9a-fA-F]{6}(?:&b)?\]\][\s\S]*?\[\[\/c\]\]/g;

const PLACEHOLDER_PREFIX = '\uE010';
const PLACEHOLDER_SUFFIX = '\uE011';

function protectMarkupBlocks(text: string): { protectedText: string; blocks: string[] } {
  const blocks: string[] = [];
  const protectedText = text.replace(MARKUP_BLOCK_RE, (m) => {
    blocks.push(m);
    return `${PLACEHOLDER_PREFIX}${blocks.length - 1}${PLACEHOLDER_SUFFIX}`;
  });
  return { protectedText, blocks };
}

function restoreMarkupBlocks(text: string, blocks: string[]): string {
  if (blocks.length === 0) return text;
  return text.replace(
    new RegExp(`${PLACEHOLDER_PREFIX}(\\d+)${PLACEHOLDER_SUFFIX}`, 'g'),
    (_, idx) => blocks[parseInt(idx, 10)] ?? ''
  );
}

/** ネストした [[red:…[[red:…]]…]] の内側マーカーを除去して1ブロックに */
function flattenNestedRedTags(s: string): string {
  let cur = s;
  let prev = '';
  while (cur !== prev) {
    prev = cur;
    cur = cur.replace(
      /\[\[red:([\s\S]*?)\[\[red:([\s\S]*?)\]\]([\s\S]*?)\]\]/g,
      '[[red:$1$2$3]]'
    );
  }
  return cur;
}

/** [[red:…]] の対応 ]] を深さカウントで求め、内部改行はスペースに潰して1行化 */
function repairRedTagsWithStack(raw: string): string {
  let out = '';
  let i = 0;
  while (i < raw.length) {
    const start = raw.indexOf('[[red:', i);
    if (start < 0) {
      out += raw.slice(i);
      break;
    }
    out += raw.slice(i, start);
    let depth = 1;
    let pos = start + 6;
    let close = -1;
    while (pos < raw.length) {
      const nextOpen = raw.indexOf('[[red:', pos);
      const nextClose = raw.indexOf(']]', pos);
      if (nextClose < 0) break;
      if (nextOpen >= 0 && nextOpen < nextClose) {
        depth += 1;
        pos = nextOpen + 6;
        continue;
      }
      depth -= 1;
      if (depth === 0) {
        close = nextClose;
        break;
      }
      pos = nextClose + 2;
    }
    if (close < 0) {
      const inner = raw.slice(start + 6).replace(/\s*\n\s*/g, ' ').trim();
      out += inner ? `[[red:${inner}]]` : '';
      break;
    }
    const inner = raw
      .slice(start + 6, close)
      .replace(/\s*\n\s*/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    out += `[[red:${inner}]]`;
    i = close + 2;
  }
  return out;
}

function repairColorTags(raw: string): string {
  let out = '';
  let i = 0;
  while (i < raw.length) {
    const start = raw.indexOf('[[c:#', i);
    if (start < 0) {
      out += raw.slice(i);
      break;
    }
    out += raw.slice(i, start);
    const openEnd = raw.indexOf(']]', start + 4);
    if (openEnd < 0) {
      out += raw.slice(start);
      break;
    }
    const closeTag = '[[/c]]';
    const close = raw.indexOf(closeTag, openEnd + 2);
    if (close < 0) {
      out += raw.slice(start);
      break;
    }
    const openTag = raw.slice(start, openEnd + 2);
    const inner = raw.slice(openEnd + 2, close).replace(/\s*\n\s*/g, ' ').trim();
    out += `${openTag}${inner}${closeTag}`;
    i = close + closeTag.length;
  }
  return out;
}

/** 修復後も残った孤立 [[red: / ]] を除去（完全な [[red:…]] は残す） */
function stripOrphanMarkupDelimiters(s: string): string {
  return s
    .split('\n')
    .map((line) => {
      let ln = line;
      if (/^\s*\]\]\s*$/.test(ln)) return '';
      if (ln.includes('[[red:') && !/\[\[red:[^\]]*\]\]/.test(ln)) {
        ln = ln.replace(/\[\[red:/g, '');
      }
      ln = ln.replace(/^\s*\]\]\s*/, '');
      ln = ln.replace(/\]\]+$/g, ']]');
      if (ln.includes('[[c:#') && !/\[\[c:#[0-9a-fA-F]{6}(?:&b)?\]\][\s\S]*?\[\[\/c\]\]/.test(ln)) {
        ln = ln.replace(/\[\[c:#[0-9a-fA-F]{6}(?:&b)?\]\]/g, '').replace(/\[\[\/c\]\]/g, '');
      }
      return ln;
    })
    .join('\n');
}

/** 赤タグの内側に残った [[red: / ]] 文字列を除去 */
function stripMarkersInsideRedTags(s: string): string {
  return s.replace(/\[\[red:([\s\S]*?)\]\]/g, (_, inner: string) => {
    const cleaned = inner.replace(/\[\[red:/g, '').replace(/\]\]/g, '').trim();
    return `[[red:${cleaned}]]`;
  });
}

/** 行をまたいで割れた [[red:…]] を1行に戻す */
export function repairBrokenMarkupTags(raw: string): string {
  let s = String(raw || '').replace(/\r\n/g, '\n');
  if (!s.includes('[[red:') && !s.includes('[[c:#')) return s;

  s = flattenNestedRedTags(s);
  s = repairRedTagsWithStack(s);
  s = stripMarkersInsideRedTags(s);
  s = repairColorTags(s);
  s = stripOrphanMarkupDelimiters(s);
  return s;
}

/** マークアップブロック外だけ fn を適用（改行挿入など） */
export function transformOutsideMarkupBlocks(text: string, fn: (plain: string) => string): string {
  const repaired = repairBrokenMarkupTags(text);
  const { protectedText, blocks } = protectMarkupBlocks(repaired);
  return restoreMarkupBlocks(fn(protectedText), blocks);
}

/** MarkdownText 描画直前の正規化 */
export function normalizeMarkupForRender(raw: string): string {
  return repairBrokenMarkupTags(String(raw || ''));
}
