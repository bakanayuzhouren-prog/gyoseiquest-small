/**
 * 常識で切る画像 → 「もっと深掘る」へのキーワード差し込み。
 * 教科書・ボーナス以外の関連問題でも、本文に論点語があれば先頭に [[image:]] を足す。
 * PNG未配置（マップ未登録）のキーは resolveImageAsset 側で落ちるので安全。
 */

export type JoshikiDeepdiveImageRule = {
  /** 本文にすべて含まれる必要はない。いずれか1つでヒット */
  anyKeywords: string[];
  /** あればすべて含まれるときだけ（誤爆防止） */
  allKeywords?: string[];
  /** 除外（例: 行服の執行停止だけの話） */
  excludeKeywords?: string[];
  imageKeys: string[];
};

/** 優先度は配列順（先にマッチしたルールを採用） */
export const JOSHIKI_DEEPDIVE_IMAGE_RULES: JoshikiDeepdiveImageRule[] = [
  {
    anyKeywords: [
      '執行停止は申し立て',
      '執行停止は申立て',
      '職権で執行停止',
      '行訴法25',
      '行訴法２５',
      '執行停止（25',
      '25 執行停止',
      '参加と証拠は双方向',
    ],
    excludeKeywords: ['行審法', '審査庁は'],
    imageKeys: ['行政法/shikkou-teishi-taihikou'],
  },
  {
    anyKeywords: [
      '38条1項で準用',
      '38条１項で準用',
      '当事者訴訟は22だけ',
      '22は準用なし',
      '22は当事者訴訟に乗らない',
      'その他の抗告',
      'その他抗告',
      '41条1項',
      '41条１項',
      '準用されないが、取消以外',
      '当事者訴訟に準用されない',
    ],
    imageKeys: ['行政法/junyo-22-24'],
  },
  {
    anyKeywords: [
      '職権証拠調べ',
      '行訴法24',
      '行訴法２４',
      '結果について当事者の意見',
      '職権探知ではない',
    ],
    excludeKeywords: ['準用されない', '38条1項で準用', 'その他の抗告'],
    imageKeys: ['行政法/shokken-junyo'],
  },
  {
    anyKeywords: [
      '第三者の訴訟参加',
      '行訴法22',
      '行訴法２２',
      '関連業者',
      '申し立て、職権で第三者',
      '申立てにより又は職権で、決定をもつて、その第三者',
      '置き去りにするな',
    ],
    imageKeys: ['行政法/sanka-kaihatsu'],
  },
];

function norm(s: string): string {
  return (s || '')
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .toLowerCase();
}

/**
 * @returns 差し込む画像キー（存在確認は呼び出し側）
 */
export function pickJoshikiDeepdiveImageKeys(body: string): string[] {
  const blob = norm(body);
  if (!blob || blob.length < 4) return [];
  for (const rule of JOSHIKI_DEEPDIVE_IMAGE_RULES) {
    if (rule.excludeKeywords?.some((k) => blob.includes(norm(k)))) continue;
    if (rule.allKeywords?.length && !rule.allKeywords.every((k) => blob.includes(norm(k)))) continue;
    if (!rule.anyKeywords.some((k) => blob.includes(norm(k)))) continue;
    return [...rule.imageKeys];
  }
  return [];
}

/** 本文先頭に未掲載の [[image:]] を足す */
export function prependJoshikiDeepdiveImages(body: string, resolveExists: (key: string) => boolean): string {
  const trimmed = (body || '').trim();
  const keys = pickJoshikiDeepdiveImageKeys(trimmed).filter((k) => resolveExists(k));
  if (keys.length === 0) return trimmed;
  const tags = keys
    .filter((imageKey) => {
      const tag = `[[image:${imageKey}]]`;
      return !(trimmed.includes(tag) || trimmed.includes(`[[image:${imageKey.split('/').pop()}]]`));
    })
    .map((imageKey) => `[[image:${imageKey}]]`);
  if (tags.length === 0) return trimmed;
  if (!trimmed) return tags.join('\n\n');
  return `${tags.join('\n\n')}\n\n${trimmed}`;
}
