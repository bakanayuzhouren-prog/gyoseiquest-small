/** src/rolePhraseReplacements.ts と同期（バッチ・B列生成用） */
export const ROLE_REPLACEMENTS = [
  [/オレンジ大祐/g, '保証人'],
  [/ダイゴ/g, '連帯債務者A'],
  [/ひろゆき|ヒロユキ/gi, '連帯債務者B'],
];

export function applyRolePhrases(text) {
  if (!text) return '';
  let t = text;
  for (const [re, rep] of ROLE_REPLACEMENTS) {
    t = t.replace(re, rep);
  }
  return t;
}
