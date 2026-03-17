/**
 * 民法の判例解説用画像
 * assets/images/precedent/ に画像を配置し、ここで require して追加する。
 */
export type CivilPrecedentImage = {
  source: number;
  caption?: string;
};

export const CIVIL_PRECEDENT_IMAGES: CivilPrecedentImage[] = [
  // 例: { source: require('@/assets/images/precedent/example.png'), caption: '判例の解説' },
];
