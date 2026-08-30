/**
 * 行訴の被告・出訴期間対比表 → 「もっと深掘る」／教科書「関連画像」。
 * 原告適格・国賠の被告・違法の承継・補充性だけのカードには載せない。
 */

export const GYOSHO_HIKOKU_TAIKO_IMAGE_KEY = 'textbook/gyosei-kijutsu/hikoku-taiko';
export const GYOSHO_HIKOKU_TAIKO_2_IMAGE_KEY = 'textbook/gyosei-kijutsu/hikoku-taiko-2';

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

/** 抗告訴訟の被告（取消・無効等・不作為の準用） */
export function shouldAttachGyoshoHikokuSheet1(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  if (hasAny(blob, ['国家賠償']) && !hasAny(blob, ['取消訴訟', '取消しの訴え'])) return false;
  if (hasAny(blob, ['原告適格']) && !hasAny(blob, ['被告適格', '被告として', 'を被告'])) return false;
  if (hasAny(blob, ['安全認定', '違法の承継', '補充性'])) return false;
  if (hasAny(blob, ['被告適格'])) return true;
  if (
    hasAny(blob, ['出訴期間', '知った日から六', '六箇月']) &&
    hasAny(blob, ['14条', '第十四条', '取消訴訟', '不作為の違法確認', '無効等確認'])
  ) {
    return true;
  }
  if (hasAny(blob, ['行訴法11', '行訴11条', '第11条', '第十一条', '11条', '11条1項', '11条2項'])) {
    return hasAny(blob, ['被告', '被告適格', '当該行政庁']);
  }
  return (
    hasAny(blob, ['被告', '被告として']) &&
    hasAny(blob, [
      '所属する国',
      '所属しない',
      '当該行政庁を被告',
      '弁護士会',
      '土地区画整理',
      '指定確認検査',
      '指定検査確認',
      '取消訴訟の被告',
      '裁決取消',
      '法務大臣を被告',
    ])
  );
}

/** 機関・民衆・当事者（43条準用／11条非準用） */
export function shouldAttachGyoshoHikokuSheet2(text: string): boolean {
  const blob = norm(text);
  if (!blob || blob.length < 3) return false;
  const typeHit = hasAny(blob, [
    '機関訴訟',
    '民衆訴訟',
    '当事者訴訟',
    '形式的当事者',
    '実質的当事者',
    '住民訴訟',
    '選挙訴訟',
  ]);
  if (!typeHit) return false;
  return hasAny(blob, [
    '被告',
    '被告適格',
    '11条は準用',
    '11条を準用',
    '第11条を準用',
    '14条準用',
    '裁定の日から',
    '選挙の日から30',
    '監査結果',
  ]);
}

export function pickGyoshoHikokuImageKeys(text: string): string[] {
  const keys: string[] = [];
  if (shouldAttachGyoshoHikokuSheet1(text)) keys.push(GYOSHO_HIKOKU_TAIKO_IMAGE_KEY);
  if (shouldAttachGyoshoHikokuSheet2(text)) keys.push(GYOSHO_HIKOKU_TAIKO_2_IMAGE_KEY);
  return keys;
}

export function pickGyoshoHikokuRelatedImageKeys(text: string): string[] {
  return pickGyoshoHikokuImageKeys(text);
}

export function shouldAttachGyoshoHikokuDeepdiveImage(text: string): boolean {
  return pickGyoshoHikokuImageKeys(text).length > 0;
}

/** マッチした表を本文先頭に [[image:]] で足す */
export function prependGyoshoHikokuDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  const keys = pickGyoshoHikokuImageKeys(haystack).filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
