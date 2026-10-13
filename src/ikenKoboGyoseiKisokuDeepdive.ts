/**
 * 意見公募の対象。命令等の4つと、行政規則の3つ。
 * 図があるとき、もっと深掘るの先頭に足す。
 */

export const IKEN_KOBO_GYOSEI_KISOKU_IMAGE_KEY = 'learn/gyosei/iken-kobo-gyosei-kisoku';

export const IKEN_KOBO_GYOSEI_KISOKU_DEEPDIVE = [
  '**結論**',
  '',
  '意見公募の対象は、命令等を定めようとするときである（行政手続法39条1項）。',
  '',
  '命令等は4つある。法律に基づく命令または規則（処分の要件を定める告示を含む）、審査基準、処分基準、行政指導指針（2条8号）。',
  '',
  'この文脈の行政規則は、あとの3つである。通達や訓令の形でも、中身がこの3つなら対象になる。',
  '',
  '**ひっかけ**',
  '',
  '法規命令だけが対象で、行政規則は対象外。⇒[[red:×]]',
  '',
  '給与その他の勤務条件は対象外である（3条2項5号）。組織と会計は対象外である（4条）。',
  '',
  '**暗記**',
  '',
  '[[red:命令が1つ。行政規則が3つ。給与と組織と会計は対象外。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachIkenKoboGyoseiKisoku(text: string): boolean {
  const t = norm(text);
  return t.includes('意見公募') && t.includes('行政規則');
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${IKEN_KOBO_GYOSEI_KISOKU_IMAGE_KEY}]]`);
}

export function prependIkenKoboGyoseiKisokuDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachIkenKoboGyoseiKisoku(haystack)) return trimmed;
  if (!resolveExists(IKEN_KOBO_GYOSEI_KISOKU_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${IKEN_KOBO_GYOSEI_KISOKU_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
