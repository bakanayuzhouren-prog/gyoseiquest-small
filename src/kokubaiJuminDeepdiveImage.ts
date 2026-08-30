/**
 * 国賠の被告表・住民訴訟1〜4号 → 「もっと深掘る」／教科書「関連画像」。
 */

export const KOKUBAI_HIKOKU_IMAGE_KEY = 'textbook/gyosei-kijutsu/kokubai-hikoku';
export const JUMIN_1_IMAGE_KEY = 'textbook/gyosei-kijutsu/jumin-1';
export const JUMIN_2_IMAGE_KEY = 'textbook/gyosei-kijutsu/jumin-2';
export const JUMIN_3_IMAGE_KEY = 'textbook/gyosei-kijutsu/jumin-3';
export const JUMIN_4_IMAGE_KEY = 'textbook/gyosei-kijutsu/jumin-4';

function norm(s: string): string {
  return (s || '').normalize('NFKC').replace(/\s+/g, '').toLowerCase();
}

function hasAny(blob: string, words: string[]): boolean {
  return words.some((w) => blob.includes(norm(w)));
}

function alreadyHasTag(body: string, imageKey: string): boolean {
  if (body.includes(`[[image:${imageKey}]]`)) return true;
  const leaf = imageKey.split('/').pop();
  return !!leaf && body.includes(`[[image:${leaf}]]`);
}

export function shouldAttachKokubaiHikokuSheet(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  if (!hasAny(blob, ['国家賠償', '国賠'])) return false;
  if (hasAny(blob, ['取消判決', '無効等確認の判決を得る必要はない']) && !hasAny(blob, ['被告', '求償'])) {
    return false;
  }
  return hasAny(blob, [
    '被告',
    '被告適格',
    '求償',
    '公務員個人',
    '指定確認検査',
    '指定検査確認',
  ]);
}

function isJuminContext(blob: string): boolean {
  return hasAny(blob, ['住民訴訟', '住民監査', '242条の2', '第二百四十二条の二']);
}

export function pickKokubaiJuminImageKeys(text: string): string[] {
  const blob = norm(text);
  const keys: string[] = [];
  if (shouldAttachKokubaiHikokuSheet(text)) keys.push(KOKUBAI_HIKOKU_IMAGE_KEY);
  if (!isJuminContext(blob)) return keys;

  const want1 =
    hasAny(blob, ['1号', '一号', '差止め']) &&
    !hasAny(blob, ['抗告訴訟としての差止め', '仮の差止め']);
  const want2 = hasAny(blob, ['2号', '二号']) || (hasAny(blob, ['無効確認']) && hasAny(blob, ['行政処分たる']));
  const want3 = hasAny(blob, ['3号', '三号', '怠る事実']);
  const want4 = hasAny(blob, ['4号', '四号', '賠償請求をさせる', '損害賠償の請求をすることを']);

  if (want1) keys.push(JUMIN_1_IMAGE_KEY);
  if (want2) keys.push(JUMIN_2_IMAGE_KEY);
  if (want3) keys.push(JUMIN_3_IMAGE_KEY);
  if (want4) keys.push(JUMIN_4_IMAGE_KEY);

  if (keys.filter((k) => k.startsWith('textbook/gyosei-kijutsu/jumin-')).length === 0) {
    if (hasAny(blob, ['被告', '1号', '2号', '3号', '4号', '差止め', '怠る事実'])) {
      keys.push(JUMIN_1_IMAGE_KEY, JUMIN_2_IMAGE_KEY, JUMIN_3_IMAGE_KEY, JUMIN_4_IMAGE_KEY);
    }
  }
  return keys;
}

export function pickKokubaiJuminRelatedImageKeys(text: string): string[] {
  return pickKokubaiJuminImageKeys(text);
}

export function shouldAttachKokubaiJuminDeepdiveImage(text: string): boolean {
  return pickKokubaiJuminImageKeys(text).length > 0;
}

export function prependKokubaiJuminDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  const keys = pickKokubaiJuminImageKeys(haystack).filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
