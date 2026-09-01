/**
 * 行訴・処分性／原告適格の定番表 → 問題を解く「もっと深掘る」／見て聞いて覚える。
 * 無効等確認36条・10条の主張制限・国賠だけのカードには載せない。
 */

export const GYOSHO_SHOBUNSEI_ARI_KEY = 'learn/gyosho/shobunsei-ari';
export const GYOSHO_SHOBUNSEI_NASHI_KEY = 'learn/gyosho/shobunsei-nashi';
export const GYOSHO_SHOBUNSEI_KIKIWAKE_KEY = 'learn/gyosho/shobunsei-kikiwake';
export const GYOSHO_GENKOKU_ARI_KEY = 'learn/gyosho/genkoku-ari';
export const GYOSHO_GENKOKU_NASHI_KEY = 'learn/gyosho/genkoku-nashi';
export const GYOSHO_GENKOKU_KIKIWAKE_KEY = 'learn/gyosho/genkoku-kikiwake';

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

function skipGenkokuOnly(blob: string): boolean {
  if (hasAny(blob, ['無効等確認']) && hasAny(blob, ['36条', '第36条', '第三十六条'])) {
    if (
      !hasAny(blob, [
        '周辺住民',
        '空港',
        'もんじゅ',
        '公衆浴場',
        '鉄道料金',
        '運賃',
        '消費者',
        '場外車券',
        '一般廃棄物',
      ])
    ) {
      return true;
    }
  }
  if (hasAny(blob, ['自己の法律上の利益に関係のない', '関係のない違法'])) return true;
  return false;
}

export function pickGyoshoShobunseiGenkokuImageKeys(text: string): string[] {
  const blob = norm(text);
  if (!blob || blob.length < 6) return [];

  const keys: string[] = [];

  const shobunAri = hasAny(blob, [
    '二項道路',
    'みなし道路',
    '労災就学',
    '病院開設中止',
    '区画整理事業計画',
    '土地区画整理事業計画',
    '第二種市街地再開発',
    '保育所廃止',
    '代執行の戒告',
  ]);
  const shobunNashi = hasAny(blob, [
    '用途地域',
    '工業地域を指定',
    '工業地域を指定する',
    '水道料金',
    '開発同意',
    '開発行為への同意',
    '採用内定',
    '普通財産',
  ]);
  const kenchikuAsShobun =
    hasAny(blob, ['建築確認']) && hasAny(blob, ['処分性', '行政処分にあたる', '抗告訴訟の対象']);

  if (shobunAri || kenchikuAsShobun) keys.push(GYOSHO_SHOBUNSEI_ARI_KEY);
  if (shobunNashi) keys.push(GYOSHO_SHOBUNSEI_NASHI_KEY);
  if (
    (shobunAri && shobunNashi) ||
    hasAny(blob, ['病院開設中止', '保育所廃止', '開発同意', '水道料金の一般', '名前ではなく中身'])
  ) {
    keys.push(GYOSHO_SHOBUNSEI_KIKIWAKE_KEY);
  }

  if (!skipGenkokuOnly(blob)) {
    const genkokuAri = hasAny(blob, [
      '空港周辺',
      '新潟空港',
      'もんじゅ',
      '原子炉設置',
      '小田急',
      '健康に直接',
      '公衆浴場',
      '一般廃棄物処理業',
      '長沼',
      '保安林指定解除',
      'たばこ小売',
    ]);
    const genkokuNashi = hasAny(blob, [
      '鉄道料金',
      '運賃認可',
      '単なる消費者',
      '商品表示',
      '学術研究者',
      '史跡の指定解除',
      '風俗営業',
      '他病院の開設',
    ]);
    const shagaiByoin = hasAny(blob, ['場外車券']) && hasAny(blob, ['病院', '診療所']);
    const shagaiJumin = hasAny(blob, ['場外車券']) && hasAny(blob, ['周辺住民', '近隣住民']);

    if (genkokuAri || shagaiByoin) keys.push(GYOSHO_GENKOKU_ARI_KEY);
    if (genkokuNashi || shagaiJumin) keys.push(GYOSHO_GENKOKU_NASHI_KEY);
    if ((genkokuAri || shagaiByoin) && (genkokuNashi || shagaiJumin)) {
      keys.push(GYOSHO_GENKOKU_KIKIWAKE_KEY);
    }
  }

  return [...new Set(keys)];
}

export function shouldAttachGyoshoShobunseiGenkokuDeepdiveImage(text: string): boolean {
  return pickGyoshoShobunseiGenkokuImageKeys(text).length > 0;
}

export function prependGyoshoShobunseiGenkokuDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  const keys = pickGyoshoShobunseiGenkokuImageKeys(haystack).filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
