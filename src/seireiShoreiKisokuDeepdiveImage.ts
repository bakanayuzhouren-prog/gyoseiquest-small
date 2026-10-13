/**
 * 政令・省令・規則を誰が定めるか。もっと深掘るの先頭に図を足す。
 * 図が未生成のときは本文だけ返す。
 */

export const SEIREI_SHOEI_KISOKU_IMAGE_KEY = 'learn/gyosei/seirei-shorei-kisoku';

export const SEIREI_SHOEI_KISOKU_DEEPDIVE = [
  '**結論**',
  '',
  '政令は、内閣が定める（憲法73条6号）。',
  '',
  '省令は、各省の大臣が定める（国家行政組織法12条1項）。',
  '',
  '規則は、委員会が定める。庁の長官も、別に法律の定めるところにより、政令および省令以外の規則その他の特別の命令を自ら発することができる（国家行政組織法13条1項）。',
  '',
  '内閣府令は、政令ではない。内閣総理大臣が、内閣府に係る主任の行政事務について発する（内閣府設置法7条3項）。',
  '',
  '**ひっかけ**',
  '',
  '政令のうち内閣府の事務に関するものを内閣府令といい、内閣総理大臣が制定する。⇒[[red:×]]',
  '',
  '規則を定めるのは委員会だけで、庁の長官は発しない。⇒[[red:×]]',
  '',
  '**暗記**',
  '',
  '[[red:政令は内閣。省令は大臣。規則は委員会と庁の長官。内閣府令は総理大臣。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

/** 誰が命令を定めるかを聞く肢・解説か。 */
export function shouldAttachSeireiShoreiKisokuImage(text: string): boolean {
  const t = norm(text);
  if (!t) return false;
  if (t.includes('内閣府令')) return true;
  if (t.includes('政令') && t.includes('省令') && (t.includes('規則') || t.includes('大臣') || t.includes('内閣'))) {
    return true;
  }
  if (t.includes('政令') && t.includes('内閣') && /制定|定める|発する/.test(t)) return true;
  return false;
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${SEIREI_SHOEI_KISOKU_IMAGE_KEY}]]`)
    || body.includes('[[image:seirei-shorei-kisoku]]');
}

export function prependSeireiShoreiKisokuDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachSeireiShoreiKisokuImage(haystack)) return trimmed;
  if (!resolveExists(SEIREI_SHOEI_KISOKU_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${SEIREI_SHOEI_KISOKU_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
