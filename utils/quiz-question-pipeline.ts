import { BONUS_QUESTIONS } from '@/src/bonus_questions';
import { SUBJECTS } from '@/src/questions';

/** SUBJECTS とボーナス問題をマージ（問題を解く画面と同一） */
export function getMergedSubjectData(subject: string | undefined): Record<string, any[]> {
  if (!subject) return {};
  const main = (SUBJECTS as any)[subject] || {};
  const bonus = (BONUS_QUESTIONS as any)[subject] || {};
  const merged: Record<string, any[]> = { ...main };
  Object.keys(bonus).forEach((k) => {
    merged[k] = [...(merged[k] || []), ...bonus[k]];
  });
  return merged;
}

export function pickQuestionsForField(
  subjectData: Record<string, any[]>,
  paramField: string | null | undefined
): { field: string | null; targetQuestions: any[] } {
  const fields = Object.keys(subjectData);
  if (fields.length === 0) return { field: null, targetQuestions: [] };

  if (paramField && fields.includes(paramField)) {
    return { field: paramField, targetQuestions: subjectData[paramField] || [] };
  }
  const selectedField = fields[Math.floor(Math.random() * fields.length)];
  return { field: selectedField, targetQuestions: subjectData[selectedField] || [] };
}

/** 記述／選択・ボーナス肢ルールでフィルタ（question.tsx と同一） */
export function filterQuizQuestionsByMode(
  targetQuestions: any[],
  subject: string | undefined,
  mode: string | undefined
): any[] {
  return targetQuestions.filter((q: any) => {
    const hasText = q && typeof q === 'object' && q.text;
    const hasChoices = Array.isArray(q?.choices) && q.choices.length > 0;
    const isDescriptive = subject === '記述';
    const isValid = hasText && (isDescriptive || hasChoices);
    if (!isValid) return false;

    const cb = q.choiceIsBonus as boolean[] | undefined;
    const hasCb = cb && cb.length > 0;
    if (mode === 'bonus') {
      return hasCb ? cb.some((b: boolean) => b) : !!q.isBonus;
    }
    // mode === 'shisho'（師匠モード）は過去問と同じ出題プール（ボーナス専用は除外）
    if (q.isBonus && (!hasCb || cb.every((b: boolean) => b) || cb.every((b: boolean) => !b))) return false;
    return hasCb ? cb.some((b: boolean) => !b) : !q.isBonus;
  });
}

export function shuffleQuestionsCopy<T>(arr: T[]): T[] {
  const list = [...arr];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function filterHiddenFromQuestions(
  questions: any[],
  hiddenHashes: Set<string>,
  hashFn: (text: string) => string
): any[] {
  return questions.filter((q) => {
    const t = q?.text;
    if (!t || typeof t !== 'string') return true;
    return !hiddenHashes.has(hashFn(t));
  });
}
