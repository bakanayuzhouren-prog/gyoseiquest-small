/**
 * A〜H 記号体系に含まれない固有名詞 → 役割表現（表示用第2層）
 * 公庫は置換しない。
 */
const ROLE_REPLACEMENTS: ReadonlyArray<[RegExp, string]> = [
  [/オレンジ大祐/g, '保証人'],
  [/ダイゴ/g, '連帯債務者A'],
  [/ひろゆき|ヒロユキ/gi, '連帯債務者B'],
];

export function applyRolePhrases(text: string): string {
  if (!text) return '';
  let t = text;
  for (const [re, rep] of ROLE_REPLACEMENTS) {
    t = t.replace(re, rep);
  }
  return t;
}
