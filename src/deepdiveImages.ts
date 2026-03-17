/**
 * 問題を解くモード「もっと深掘る」専用画像マッピング（自動生成）
 * node scripts/generateDeepdiveImages.js で再生成
 * スプレッドシートM列の [[image:xxx]] で参照。xxx はファイル名（拡張子なし可）またはパス。
 */
export const DEEPDIVE_IMAGES: Record<string, ReturnType<typeof require>> = {

};

export function getDeepdiveImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = DEEPDIVE_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(DEEPDIVE_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (DEEPDIVE_IMAGES[byBase] as number) : undefined;
}
