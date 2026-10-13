/**
 * 内閣府には、何を置くか。64条の外局と、外局ではない庁を分ける。
 * 図があるとき、問題の「図」と、もっと深掘るの先頭に足す。
 */

export const NAIKAKUFU_GAIKYOKU_IMAGE_KEY = 'learn/gyosei/naikakufu-gaikyoku';

export const NAIKAKUFU_GAIKYOKU_DEEPDIVE = [
  `[[image:${NAIKAKUFU_GAIKYOKU_IMAGE_KEY}]]`,
  '',
  '**結論**',
  '',
  '内閣府には、外局として委員会と庁を置ける（内閣府設置法49条、64条）。',
  '',
  '64条の委員会は、公正取引委員会、国家公安委員会、個人情報保護委員会、カジノ管理委員会、サイバー通信情報監理委員会。庁は、金融庁、消費者庁、こども家庭庁。',
  '',
  '宮内庁は内閣府に置くが、64条の表の外局ではない（48条）。警察庁は国家公安委員会の下であり、内閣府の外局の庁ではない。',
  '',
  '**ひっかけ**',
  '',
  '内閣府に外局は置けない。⇒[[red:×]]',
  '',
  '宮内庁は、64条の表の外局である。⇒[[red:×]]',
  '',
  'デジタル庁、国税庁、特許庁は、内閣府の外局である。⇒[[red:×]] デジタル庁は内閣に置く。国税庁は財務省、特許庁は経済産業省の外局。',
  '',
  '**暗記**',
  '',
  '[[red:外局は委員会と庁。宮内庁は48条。警察庁は国家公安委員会の下。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachNaikakufuGaikyoku(text: string): boolean {
  const t = norm(text);
  if (t.includes('国税庁') && t.includes('特許庁') && t.includes('デジタル庁')) return true;
  if (t.includes('内閣府に外局を置くことはできない')) return true;
  if (t.includes('内閣府の外局') && (t.includes('公正取引委員会') || t.includes('金融庁') || t.includes('カジノ'))) return true;
  return false;
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${NAIKAKUFU_GAIKYOKU_IMAGE_KEY}]]`);
}

export function prependNaikakufuGaikyokuDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachNaikakufuGaikyoku(haystack)) return trimmed;
  if (!resolveExists(NAIKAKUFU_GAIKYOKU_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${NAIKAKUFU_GAIKYOKU_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
