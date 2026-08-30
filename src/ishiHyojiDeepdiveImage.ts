/**
 * 意思表示対比表（93・94・95・96）→ 「もっと深掘る」／教科書「関連画像」。
 * 21条詐術だけのカードには載せない。
 */

export const ISHI_HYOJI_TAIKO_IMAGE_KEY = 'textbook/minpou-kijutsu/ishi-hyoji-taiko';

const HIT_KEYWORDS = [
  '心裡留保',
  '虚偽表示',
  '通謀虚偽',
  '通謀して',
  '重過失錯誤',
  '基礎事情の錯誤',
  '要素の錯誤',
  '錯誤の例外',
  '双方同一の錯誤',
  '民法93',
  '民法94',
  '民法95',
  '民法96',
  '第93条',
  '第94条',
  '第95条',
  '第96条',
  '93条ただし',
  '94条2項',
  '95条3項',
  '96条3項',
];

function norm(s: string): string {
  return (s || '').normalize('NFKC').replace(/\s+/g, '').toLowerCase();
}

function blobHasHit(blob: string): boolean {
  return HIT_KEYWORDS.some((k) => blob.includes(norm(k)));
}

/** 本文が意思表示5類型の対比表を出す対象か */
export function shouldAttachIshiHyojiDeepdiveImage(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  if (blob.includes(norm('詐術')) && !blobHasHit(blob)) return false;
  return blobHasHit(blob);
}

export function pickIshiHyojiRelatedImageKeys(text: string): string[] {
  return shouldAttachIshiHyojiDeepdiveImage(text) ? [ISHI_HYOJI_TAIKO_IMAGE_KEY] : [];
}

function alreadyHasTag(body: string, imageKey: string): boolean {
  if (body.includes(`[[image:${imageKey}]]`)) return true;
  const leaf = imageKey.split('/').pop();
  return !!leaf && body.includes(`[[image:${leaf}]]`);
}

/** マッチしたら本文先頭に [[image:]] を足す */
export function prependIshiHyojiDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachIshiHyojiDeepdiveImage(haystack)) return trimmed;
  if (!resolveExists(ISHI_HYOJI_TAIKO_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed, ISHI_HYOJI_TAIKO_IMAGE_KEY)) return trimmed;
  const tag = `[[image:${ISHI_HYOJI_TAIKO_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
