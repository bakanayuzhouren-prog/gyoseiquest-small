/**
 * 最二小判平18.9.4。公園区域に民有地を入れた裁量。
 * 図があるとき、もっと深掘るの先頭に4コマを足す。
 */

export const KOEN_MINYUCHI_SAIRYO_IMAGE_KEY = 'learn/gyosei/koen-minyuchi-sairyo';

export const KOEN_MINYUCHI_SAIRYO_DEEPDIVE = [
  '**結論**',
  '',
  '最二小判平18.9.4。公有地を使えることは、公園区域の合理性を見る一つの考慮要素である。必ず国有地、ではない。',
  '',
  '**1. まず何が起きた**',
  '',
  '公園の区域に、隣の国有地ではなく民有地が入った。隣は、林業試験場の国有地だよね。',
  '',
  '**2. 当事者の言い分**',
  '',
  '建設大臣は、南門を動かすと試験場の木が傷む、と言う。原審は、木への影響を審理しないまま、逸脱・濫用ではない、とした。',
  '',
  '**3. 裁判所が見た争点**',
  '',
  '公有地を使えることは、合理性の考慮要素か。木を審理しないで、民有地を選んだ判断に合理性があると言えるか。',
  '',
  '**4. 判決の着地**',
  '',
  '合理性を欠くなら、特段の事情がない限り、逸脱または濫用で違法となる。木を審理しない原審には法令違反がある。破棄して差し戻す。この判決は、公園の決定を違法と断じていない。',
  '',
  '試験で「この判決が公園の決定を違法と断じた」と書いてあったら[[red:×]]。',
  '',
  '**暗記**',
  '',
  '[[red:公有地は考慮要素の一つ。木を審理しない原審は破棄差戻し。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachKoenMinyuchiSairyo(text: string): boolean {
  const t = norm(text);
  return t.includes('平成18年9月4日') || t.includes('平18.9.4');
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${KOEN_MINYUCHI_SAIRYO_IMAGE_KEY}]]`);
}

export function prependKoenMinyuchiSairyoDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachKoenMinyuchiSairyo(haystack)) return trimmed;
  if (!resolveExists(KOEN_MINYUCHI_SAIRYO_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${KOEN_MINYUCHI_SAIRYO_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
