/**
 * チャンク用ローカル画像マッピング（自動生成）
 * node scripts/generateChunkImages.js で再生成
 * スプレッドシートY列にファイル名（拡張子なし可）またはパスを記入。
 * 命名規則: {科目}/{トピック}/{トピック}{問番号}-{肢番号}.png（例: minnpou/sousoku/sousoku1-2.3.4 = 1問目の肢2,3,4）
 */
export const CHUNK_IMAGES: Record<string, ReturnType<typeof require>> = {
  'minnpou/sousoku/sousoku1-2.3.4': require('@/assets/images/chunk/minnpou/sousoku/sousoku1-2.3.4.png'),
  'minnpou/sousoku/sousoku11-2': require('@/assets/images/chunk/minnpou/sousoku/sousoku11-2.png'),
  'minnpou/sousoku/sousoku6-1.2.3.4.5': require('@/assets/images/chunk/minnpou/sousoku/sousoku6-1.2.3.4.5.png'),
  'minnpou/sousoku/sousoku7,8': require('@/assets/images/chunk/minnpou/sousoku/sousoku7,8.png')
};

export function getChunkImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = CHUNK_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(CHUNK_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (CHUNK_IMAGES[byBase] as number) : undefined;
}
