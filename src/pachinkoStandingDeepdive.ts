/**
 * 最判平27.3.3（ぱちんこ店の営業停止）。もっと深掘るの4コマ。
 * 図が未生成のときは本文だけ返す。
 */

export const PACHINKO_STANDING_IMAGE_KEY = 'learn/gyosei/pachinko-teishi-rieki';

export const PACHINKO_STANDING_DEEPDIVE = [
  '**結論**',
  '',
  '公にされた処分基準で、次の停止が重くなる間は、先行の停止を取り消す利益が残る（最判平27.3.3）。',
  '',
  '**1. まず何が起きた**',
  '',
  'ぱちんこ店が、40日の営業停止を受けた。期間は終わった。店は、それでも取り消したい。',
  '',
  '**2. 当事者の言い分**',
  '',
  '公安委員会は、期間が終わったから、争う意味はない、と言う。店は、次の停止が重くなる、と言う。',
  '',
  '**3. 裁判所が見た争点**',
  '',
  '公にされた処分基準では、過去3年以内の停止を理由に、次の停止の期間が重くなる（行政手続法12条1項）。その間も、先行の停止を取り消す利益が残るか。',
  '',
  '**4. 判決の着地**',
  '',
  '残る。基準と違う後行の取扱いは、特段の事情がない限り、裁量権の逸脱または濫用に当たる。取消しうる違法である。',
  '',
  '試験で「当然に無効」と書いてあったら[[red:×]]。',
  '',
  '**暗記**',
  '',
  '[[red:重くなる3年の間は、まだ取り消せる。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachPachinkoStanding(text: string): boolean {
  const t = norm(text);
  return t.includes('処分基準') && t.includes('量定') && t.includes('当然に無効');
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${PACHINKO_STANDING_IMAGE_KEY}]]`);
}

export function prependPachinkoStandingDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachPachinkoStanding(haystack) && !trimmed.includes('最判平27.3.3')) return trimmed;
  if (!resolveExists(PACHINKO_STANDING_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${PACHINKO_STANDING_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
