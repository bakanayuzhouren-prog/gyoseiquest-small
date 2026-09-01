/**
 * 国賠1条／2条の定番表 → 問題を解く「もっと深掘る」／見て聞いて覚える。
 */

export const KOKUBAI_1JO_ARI_KEY = 'learn/kokubai/1jo-ari';
export const KOKUBAI_1JO_NASHI_KEY = 'learn/kokubai/1jo-nashi';
export const KOKUBAI_2JO_ARI_KEY = 'learn/kokubai/2jo-ari';
export const KOKUBAI_2JO_NASHI_KEY = 'learn/kokubai/2jo-nashi';
export const KOKUBAI_1_2_KIKIWAKE_KEY = 'learn/kokubai/kikiwake';
export const KOKUBAI_PATROL_KIKYAKU_KEY = 'learn/kokubai/patrol-kikyaku';
export const KOKUBAI_AKAIRO_YOYU_KEY = 'learn/kokubai/akairo-yoyu';
export const KOKUBAI_DAITO_VS_TAMAGAWA_KEY = 'learn/kokubai/daito-vs-tamagawa';

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

export function pickKokubai1jo2joImageKeys(text: string): string[] {
  const blob = norm(text);
  if (!blob || blob.length < 6) return [];

  const keys: string[] = [];

  const oneAri = hasAny(blob, [
    'パトカー追跡',
    '指定確認検査',
    '規制権限',
    '立法不作為',
    '公訴提起',
    '消防の消火',
    '漫然と更正',
    '所得税の更正',
  ]);
  const oneNashi = hasAny(blob, [
    '私経済',
    '公務員個人',
    '相互保証',
    '犯罪被害者',
    '靖国',
    '反射的利益',
    '無罪判決が確定したからといって',
    '当然に違法とは評価されない',
  ]);
  const twoAri = hasAny(blob, [
    '高知落石',
    '落石',
    '故障車',
    '空港騒音',
    '大阪国際空港',
    '通常有すべき安全性',
    '供用関連',
  ]);
  const twoNashi = hasAny(blob, [
    '大東',
    '過渡的',
    '赤色灯',
    '審判台',
    '防護柵',
    '線状降水帯',
  ]);
  const kikiwake =
    (hasAny(blob, ['1条']) && hasAny(blob, ['2条'])) ||
    (hasAny(blob, ['人の行為']) && hasAny(blob, ['モノ', '営造物'])) ||
    hasAny(blob, ['道路と河川', '人なら1条']);

  if (oneAri) keys.push(KOKUBAI_1JO_ARI_KEY);
  if (oneNashi) keys.push(KOKUBAI_1JO_NASHI_KEY);
  if (twoAri) keys.push(KOKUBAI_2JO_ARI_KEY);
  if (twoNashi) keys.push(KOKUBAI_2JO_NASHI_KEY);
  if (kikiwake || (oneAri && twoAri)) keys.push(KOKUBAI_1_2_KIKIWAKE_KEY);
  if (hasAny(blob, ['パトカー追跡'])) keys.push(KOKUBAI_PATROL_KIKYAKU_KEY);
  if (hasAny(blob, ['赤色灯'])) keys.push(KOKUBAI_AKAIRO_YOYU_KEY);
  if (hasAny(blob, ['大東', '多摩川', '計画高水'])) keys.push(KOKUBAI_DAITO_VS_TAMAGAWA_KEY);

  return [...new Set(keys)];
}

/** 教科書「関連画像」。国賠の問で1条と2条を並べて聞くときだけ、表5枚を出す。 */
export function pickKokubai1jo2joRelatedImageKeys(text: string): string[] {
  const blob = norm(text);
  if (!hasAny(blob, ['国賠', '国家賠償'])) return [];
  if (hasAny(blob, ['1条']) && hasAny(blob, ['2条'])) {
    return [
      KOKUBAI_1_2_KIKIWAKE_KEY,
      KOKUBAI_1JO_ARI_KEY,
      KOKUBAI_1JO_NASHI_KEY,
      KOKUBAI_2JO_ARI_KEY,
      KOKUBAI_2JO_NASHI_KEY,
    ];
  }
  return [];
}

export function shouldAttachKokubai1jo2joDeepdiveImage(text: string): boolean {
  return pickKokubai1jo2joImageKeys(text).length > 0;
}

export function prependKokubai1jo2joDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  const keys = pickKokubai1jo2joImageKeys(haystack).filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
