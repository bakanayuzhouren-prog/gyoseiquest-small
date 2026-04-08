import { getHiddenHashes } from '@/utils/question-hidden';
import {
  filterHiddenFromQuestions,
  filterQuizQuestionsByMode,
  getMergedSubjectData,
  pickQuestionsForField,
} from '@/utils/quiz-question-pipeline';
import { getQuestionTextHash } from '@/utils/question-stats';

/**
 * 問題を解く画面と同じパイプラインで、問題文ハッシュに一致するインデックスを返す。
 * 見つからない場合は -1（非表示・出題対象外・シート更新で文言変更など）。
 */
async function findIndexWithMode(
  subject: string,
  field: string,
  textHash: string,
  mode: string
): Promise<number> {
  const subjectData = getMergedSubjectData(subject);
  const { field: resolvedField, targetQuestions } = pickQuestionsForField(subjectData, field);
  if (!resolvedField) return -1;
  let list = filterQuizQuestionsByMode(targetQuestions, subject, mode);
  const hidden = await getHiddenHashes(subject, resolvedField);
  list = filterHiddenFromQuestions(list, hidden, getQuestionTextHash);
  return list.findIndex((q: { text?: string }) => {
    const t = q?.text;
    if (!t || typeof t !== 'string') return false;
    return getQuestionTextHash(t) === textHash;
  });
}

/**
 * 過去問 → ボーナスの順で探索（誤答したモードに依存しない）
 */
export async function findQuizQuestionIndexByTextHash(
  subject: string,
  field: string,
  textHash: string,
  preferredMode: string = 'past'
): Promise<{ index: number; mode: string } | null> {
  if (!subject || !field || !textHash) return null;
  const modes = [preferredMode, preferredMode === 'past' ? 'bonus' : 'past'].filter(
    (m, i, a) => a.indexOf(m) === i
  );
  for (const mode of modes) {
    const idx = await findIndexWithMode(subject, field, textHash, mode);
    if (idx >= 0) return { index: idx, mode };
  }
  return null;
}
