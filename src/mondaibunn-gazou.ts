/**
 * 問題文が複雑なとき用の模範図（静的画像）
 *
 * 1. `assets/images/mondaibunn-gazou/` に PNG 等を置く
 * 2. 下の Record に `require` を登録する
 *
 * キーの付け方（どちらか一方でよい。ハッシュを優先）:
 * - **BY_QUESTION_TEXT_HASH**: `getQuestionTextHash(問題の text)` の戻り値（非表示・統計と同じハッシュ）
 * - **BY_SUBJECT_FIELD_ORDER**: `${科目}|${分野}|${画面の問番号1始まり}`（非表示・シャッフルで順番が変わるとズレるので補助）
 */
import { getQuestionTextHash } from '@/utils/question-stats';

export type MondaibunnGazoItem = {
  /** require('@/assets/...') の戻り値 */
  source: number;
  caption?: string;
};

function flattenItems(v: MondaibunnGazoItem | MondaibunnGazoItem[] | undefined): MondaibunnGazoItem[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

/** アプリ・sync 後の `question.text` と同一文字列から計算されるハッシュ */
export const BY_QUESTION_TEXT_HASH: Record<string, MondaibunnGazoItem | MondaibunnGazoItem[]> = {
  // 例（ハッシュは実問題に合わせてログや一時コードで確認）:
  // x7k2mz: [{ source: require('@/assets/images/mondaibunn-gazou/sample.png'), caption: '構成の整理図' }],
};

/** `${科目}|${分野}|${1始まりのインデックス}` */
export const BY_SUBJECT_FIELD_ORDER: Record<string, MondaibunnGazoItem | MondaibunnGazoItem[]> = {
  // 例:
  // '民法|債権各論|3': [{ source: require('@/assets/images/mondaibunn-gazou/minpou-so-3.png') }],
};

export function resolveMondaibunnGazoItems(params: {
  subject: string;
  field: string;
  /** 問題データの raw `text`（strip しない） */
  questionText: string;
  /** 画面内の 0 始まりインデックス */
  questionIndex: number;
}): MondaibunnGazoItem[] {
  const { subject, field, questionText, questionIndex } = params;
  if (!questionText.trim()) return [];

  const fromHash = flattenItems(BY_QUESTION_TEXT_HASH[getQuestionTextHash(questionText)]);
  if (fromHash.length > 0) return fromHash;

  const scopeKey = `${subject}|${field}|${questionIndex + 1}`;
  return flattenItems(BY_SUBJECT_FIELD_ORDER[scopeKey]);
}
