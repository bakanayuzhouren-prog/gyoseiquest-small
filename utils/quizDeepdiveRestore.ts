import {
  filterHiddenFromQuestions,
  filterQuizQuestionsByMode,
  getMergedSubjectData,
  pickQuestionsForField,
} from '@/utils/quiz-question-pipeline';
import { getQuestionTextHash } from '@/utils/question-stats';

export type QuizDeepdiveSource =
  | 'statuteRef'
  | 'relatedJ'
  | 'deepDive'
  | 'deepDiveBeginner'
  | 'deepDivePeripheral'
  | 'memo';

export function parseChoiceIndexFromLabel(label: string): number | null {
  const m = String(label || '').match(/^(\d{1,2})\.\s/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) && n >= 1 ? n - 1 : null;
}

export function inferQuizDeepdiveSourceFromScreenTitle(screenTitle: string): QuizDeepdiveSource {
  const t = screenTitle.trim();
  if (t === '関連条文') return 'relatedJ';
  if (t === '根拠条文' || t === '根拠・判例' || t === '判例') return 'statuteRef';
  return 'deepDive';
}

function pickAt(question: Record<string, unknown>, source: QuizDeepdiveSource, ci: number): string {
  const arrKey =
    source === 'statuteRef'
      ? 'choiceStatuteRefs'
      : source === 'relatedJ'
        ? 'choiceRelatedStatutes'
        : source === 'deepDiveBeginner'
          ? 'choiceDeepDiveBeginner'
          : source === 'deepDivePeripheral'
            ? 'choiceDeepDivePeripheral'
            : 'choiceDeepDive';
  const arr = question[arrKey];
  if (!Array.isArray(arr)) return '';
  return String(arr[ci] ?? '').trim();
}

/** Web で in-memory 本文が失われたとき、questions.js から深掘り本文を復元 */
export function resolveQuizDeepdiveBodyFromCatalog(input: {
  quizSubject: string;
  quizField: string;
  quizQuestionIndex: number;
  quizChoiceIndex: number;
  quizMode?: string;
  source: QuizDeepdiveSource;
}): string {
  const subject = input.quizSubject.trim();
  const field = input.quizField.trim();
  if (!subject || !field) return '';
  const qi = input.quizQuestionIndex;
  const ci = input.quizChoiceIndex;
  if (!Number.isFinite(qi) || qi < 0 || !Number.isFinite(ci) || ci < 0) return '';

  const subjectData = getMergedSubjectData(subject);
  const { targetQuestions } = pickQuestionsForField(subjectData, field);
  const filtered = filterQuizQuestionsByMode(targetQuestions, subject, input.quizMode);
  const questions = filterHiddenFromQuestions(filtered, new Set(), getQuestionTextHash);
  const question = questions[qi] as Record<string, unknown> | undefined;
  if (!question) return '';

  if (input.source === 'memo') {
    return typeof question.memo === 'string' ? question.memo.trim() : '';
  }

  return pickAt(question, input.source, ci);
}
