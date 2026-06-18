import { SUBJECTS } from '@/src/questions';
import { extractLearnLinkKey, normalizeLearnLinkKey } from '@/src/quizLearnBridge';

export type QuizLearnGroupItem = {
  subject: string;
  field: string;
  index: number;
  questionPreview: string;
};

export type QuizLearnGroup = {
  key: string;
  items: QuizLearnGroupItem[];
};

function compact(value: unknown, limit = 90): string {
  const s = String(value || '').replace(/\s+/g, ' ').trim();
  return s.length > limit ? `${s.slice(0, limit)}...` : s;
}

function uniqueKeys(keys: string[]): string[] {
  return [...new Set(keys.map(normalizeLearnLinkKey).filter(Boolean))];
}

export function getQuestionLearnLinkKeys(question: unknown): string[] {
  if (!question || typeof question !== 'object') return [];
  const q = question as Record<string, unknown>;
  const keys: string[] = [];
  if (typeof q.learnLinkKey === 'string') keys.push(q.learnLinkKey);
  if (typeof q.text === 'string') keys.push(extractLearnLinkKey(q.text));
  if (Array.isArray(q.choiceLearnLinkKeys)) {
    for (const key of q.choiceLearnLinkKeys) {
      if (typeof key === 'string') keys.push(key);
    }
  }
  if (Array.isArray(q.choices)) {
    for (const choice of q.choices) {
      keys.push(extractLearnLinkKey(choice));
    }
  }
  return uniqueKeys(keys);
}

export function getChoiceLearnLinkKey(
  question: unknown,
  choiceIndex?: number | null,
  fallbackKey?: string
): string {
  if (!question || typeof question !== 'object') return normalizeLearnLinkKey(fallbackKey);
  const q = question as Record<string, unknown>;
  if (choiceIndex != null && choiceIndex >= 0) {
    const choiceKeys = Array.isArray(q.choiceLearnLinkKeys) ? q.choiceLearnLinkKeys : [];
    const directChoiceKey = normalizeLearnLinkKey(choiceKeys[choiceIndex]);
    if (directChoiceKey) return directChoiceKey;
    const choices = Array.isArray(q.choices) ? q.choices : [];
    const embeddedChoiceKey = extractLearnLinkKey(choices[choiceIndex]);
    if (embeddedChoiceKey) return embeddedChoiceKey;
  }
  const questionKey = normalizeLearnLinkKey(q.learnLinkKey);
  if (questionKey) return questionKey;
  const embeddedQuestionKey = extractLearnLinkKey(q.text);
  if (embeddedQuestionKey) return embeddedQuestionKey;
  return normalizeLearnLinkKey(fallbackKey);
}

export function resolveQuizLearnGroup(linkKey: string): QuizLearnGroup | null {
  const key = normalizeLearnLinkKey(linkKey);
  if (!key) return null;
  const items: QuizLearnGroupItem[] = [];
  for (const [subject, group] of Object.entries(SUBJECTS as Record<string, unknown>)) {
    if (!group || typeof group !== 'object') continue;
    for (const [field, list] of Object.entries(group as Record<string, unknown>)) {
      if (!Array.isArray(list)) continue;
      list.forEach((question, index) => {
        if (!getQuestionLearnLinkKeys(question).includes(key)) return;
        items.push({
          subject,
          field,
          index,
          questionPreview: compact((question as Record<string, unknown>)?.text),
        });
      });
    }
  }
  return { key, items };
}
