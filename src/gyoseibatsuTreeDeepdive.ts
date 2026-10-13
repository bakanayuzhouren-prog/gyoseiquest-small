/**
 * 行政上の強制手段と行政罰の樹。執行罰は強制執行。行政罰は別の枝。
 * 図があるとき、もっと深掘るの先頭に足す。
 */

export const GYOSEIBATSU_TREE_IMAGE_KEY = 'learn/gyosei/gyoseibatsu-tree';

export const GYOSEIBATSU_TREE_DEEPDIVE = [
  '**結論**',
  '',
  '行政罰は、行政上の強制執行の中にない。',
  '',
  '行政上の強制手段は、行政強制と行政罰に分かれる。',
  '',
  '行政強制は、行政上の強制執行と即時強制に分かれる。強制執行は、代執行、執行罰、直接強制、行政上の強制徴収。即時強制は、義務の不履行を前提にしない。',
  '',
  '行政罰は、行政刑罰と秩序罰に分かれる。行政刑罰は裁判所の刑罰。秩序罰は過料で、法律違反は裁判所、条例違反は長。',
  '',
  '**ひっかけ**',
  '',
  '執行罰は行政罰である。⇒[[red:×]]',
  '',
  '執行罰も過料だが、場所は強制執行。現行の例は砂防法36条。',
  '',
  '**暗記**',
  '',
  '[[red:執行罰は左の強制。秩序罰は右の制裁。過料でも枝が違う。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachGyoseibatsuTree(text: string): boolean {
  const t = norm(text);
  return t.includes('行政罰') || t.includes('行政刑罰') || t.includes('秩序罰') || t.includes('執行罰');
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${GYOSEIBATSU_TREE_IMAGE_KEY}]]`);
}

export function prependGyoseibatsuTreeDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachGyoseibatsuTree(haystack)) return trimmed;
  if (!resolveExists(GYOSEIBATSU_TREE_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${GYOSEIBATSU_TREE_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
