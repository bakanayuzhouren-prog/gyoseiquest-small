/**
 * 見て聞いて覚える・B列から固有名詞を役割名に置換
 * 公庫はそのまま。A〜H 記号対象（緒方・寺島等）は B列用に役割名へ。
 */
import { applyRolePhrases } from './rolePhraseReplacements.mjs';

const B_COLUMN_EXTRA = [
  [/寺島/g, '主債務者'],
  [/緒方/g, '売主'],
  [/宮田/g, '第三取得者'],
];

export function normalizeLearnProperNames(text) {
  if (!text) return text;
  let t = applyRolePhrases(text);
  for (const [re, rep] of B_COLUMN_EXTRA) {
    t = t.replace(re, rep);
  }
  return t;
}

/** A列をB列生成用に要約提示（固有名詞→役割） */
export function normalizeQuestionForPrompt(aText) {
  return normalizeLearnProperNames(String(aText || '').trim());
}
