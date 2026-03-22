/**
 * 記述式問題の解説画像マッピング（自動生成）
 * node scripts/generateDescriptiveImages.js で再生成
 * スプレッドシートL列（解説）に [[image:xxx]] で参照。xxx はファイル名（拡張子なし可）またはパス。
 * 画像は assets/images/descriptive/ に配置。
 */
export const DESCRIPTIVE_IMAGES: Record<string, ReturnType<typeof require>> = {
  'gyouseihou/ｋｊ１': require('@/assets/images/descriptive/gyouseihou/ｋｊ１.png'),
  'gyouseihou/ｋｊ１０': require('@/assets/images/descriptive/gyouseihou/ｋｊ１０.png'),
  'gyouseihou/ｋｊ２': require('@/assets/images/descriptive/gyouseihou/ｋｊ２.png'),
  'gyouseihou/ｋｊ３': require('@/assets/images/descriptive/gyouseihou/ｋｊ３.png'),
  'gyouseihou/ｋｊ４': require('@/assets/images/descriptive/gyouseihou/ｋｊ４.png'),
  'gyouseihou/ｋｊ５': require('@/assets/images/descriptive/gyouseihou/ｋｊ５.png'),
  'gyouseihou/ｋｊ６': require('@/assets/images/descriptive/gyouseihou/ｋｊ６.png'),
  'gyouseihou/ｋｊ７': require('@/assets/images/descriptive/gyouseihou/ｋｊ７.png'),
  'gyouseihou/ｋｊ８': require('@/assets/images/descriptive/gyouseihou/ｋｊ８.png'),
  'gyouseihou/ｋｊ９': require('@/assets/images/descriptive/gyouseihou/ｋｊ９.png'),
  'minnpou/ｋｊｍ１': require('@/assets/images/descriptive/minnpou/ｋｊｍ１.png'),
  'minnpou/ｋｊｍ２': require('@/assets/images/descriptive/minnpou/ｋｊｍ２.png'),
  'minnpou/ｋｊｍ３': require('@/assets/images/descriptive/minnpou/ｋｊｍ３.png'),
  'minnpou/ｋｊｍ４': require('@/assets/images/descriptive/minnpou/ｋｊｍ４.png'),
  'minnpou/ｋｊｍ５': require('@/assets/images/descriptive/minnpou/ｋｊｍ５.png'),
  'minnpou/ｋｊｍ６': require('@/assets/images/descriptive/minnpou/ｋｊｍ６.png')
};

export function getDescriptiveImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = DESCRIPTIVE_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(DESCRIPTIVE_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (DESCRIPTIVE_IMAGES[byBase] as number) : undefined;
}
