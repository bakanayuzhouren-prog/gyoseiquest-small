/**
 * 取消訴訟の準用表・仮の救済表 → 「もっと深掘る」／教科書「関連画像」。
 * 市販の全文準用表は転載しない。38条・41条・37条の5の試験芯だけ。
 */

export const GYOSHO_JUNYO_TAIKO_IMAGE_KEY = 'textbook/gyosei-kijutsu/junyo-taiko';
export const GYOSHO_KARI_KYUSAI_IMAGE_KEY = 'textbook/gyosei-kijutsu/kari-kyusai';

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

export function shouldAttachGyoshoJunyoSheet(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  if (hasAny(blob, ['安全認定', '違法の承継'])) return false;
  if (hasAny(blob, ['38条', '第38条', '取消訴訟に関する規定の準用', '準用されない'])) {
    return hasAny(blob, ['準用', '14条', '31条', '事情判決', '執行停止', '被告']);
  }
  return (
    hasAny(blob, ['準用']) &&
    hasAny(blob, ['14条は', '事情判決', '38条1項', '無効等確認', '不作為の違法確認'])
  );
}

export function shouldAttachGyoshoKariKyusaiSheet(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  if (hasAny(blob, ['行政不服審査法']) && !hasAny(blob, ['仮の義務付け', '仮の差止め', '37条の5'])) {
    return false;
  }
  return hasAny(blob, ['仮の義務付け', '仮の差止め', '37条の5', '執行停止制度']);
}

export function pickGyoshoJunyoImageKeys(text: string): string[] {
  const keys: string[] = [];
  if (shouldAttachGyoshoJunyoSheet(text)) keys.push(GYOSHO_JUNYO_TAIKO_IMAGE_KEY);
  if (shouldAttachGyoshoKariKyusaiSheet(text)) keys.push(GYOSHO_KARI_KYUSAI_IMAGE_KEY);
  return keys;
}

export function pickGyoshoJunyoRelatedImageKeys(text: string): string[] {
  return pickGyoshoJunyoImageKeys(text);
}

export function shouldAttachGyoshoJunyoDeepdiveImage(text: string): boolean {
  return pickGyoshoJunyoImageKeys(text).length > 0;
}

export function prependGyoshoJunyoDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  const keys = pickGyoshoJunyoImageKeys(haystack).filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
