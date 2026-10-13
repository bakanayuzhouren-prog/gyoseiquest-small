import AsyncStorage from '@react-native-async-storage/async-storage';

import { getQuestionTextHash } from '@/utils/question-stats';

const STORAGE_PREFIX = 'qjny_';
const neverAgainMemoryCache = new Map<string, Set<string>>();

function memKey(subject: string, field: string): string {
  return `${subject}|${field}`;
}

function storageKey(subject: string, field: string): string {
  return `${STORAGE_PREFIX}${encodeURIComponent(subject)}|${encodeURIComponent(field)}`;
}

/** 肢文の同一判定。記号と空白の差では分けない。 */
export function normalizeChoiceForNeverAgain(text: string): string {
  return String(text || '')
    .replace(/※/g, '')
    .replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '')
    .replace(/\s+/g, '')
    .trim();
}

export function choiceNeverAgainHash(text: string): string {
  const normalized = normalizeChoiceForNeverAgain(text);
  if (!normalized) return '';
  return getQuestionTextHash(normalized);
}

export function peekNeverAgainHashesSync(subject: string, field: string): Set<string> | null {
  if (!subject || !field) return null;
  const cached = neverAgainMemoryCache.get(memKey(subject, field));
  return cached ? new Set(cached) : null;
}

export async function getNeverAgainHashes(subject: string, field: string): Promise<Set<string>> {
  if (!subject || !field) return new Set();
  const key = memKey(subject, field);
  const cached = neverAgainMemoryCache.get(key);
  if (cached) return new Set(cached);

  try {
    const raw = await AsyncStorage.getItem(storageKey(subject, field));
    const arr: string[] = raw ? JSON.parse(raw) : [];
    const set = new Set(Array.isArray(arr) ? arr.filter((item) => typeof item === 'string') : []);
    neverAgainMemoryCache.set(key, set);
    return new Set(set);
  } catch {
    const empty = new Set<string>();
    neverAgainMemoryCache.set(key, empty);
    return new Set(empty);
  }
}

async function writeNeverAgainHashes(subject: string, field: string, set: Set<string>): Promise<Set<string>> {
  const next = new Set(set);
  neverAgainMemoryCache.set(memKey(subject, field), next);
  await AsyncStorage.setItem(storageKey(subject, field), JSON.stringify([...next]));
  return new Set(next);
}

export async function markChoiceNeverAgain(
  subject: string,
  field: string,
  choiceText: string,
): Promise<Set<string>> {
  const hash = choiceNeverAgainHash(choiceText);
  const set = await getNeverAgainHashes(subject, field);
  if (hash) set.add(hash);
  return writeNeverAgainHashes(subject, field, set);
}

export async function setChoiceNeverAgainHashes(
  subject: string,
  field: string,
  hashes: string[],
  on: boolean,
): Promise<Set<string>> {
  const set = await getNeverAgainHashes(subject, field);
  hashes.forEach((hash) => {
    if (!hash) return;
    if (on) set.add(hash);
    else set.delete(hash);
  });
  return writeNeverAgainHashes(subject, field, set);
}

export async function unmarkChoiceNeverAgain(
  subject: string,
  field: string,
  choiceText: string,
): Promise<Set<string>> {
  const hash = choiceNeverAgainHash(choiceText);
  const set = await getNeverAgainHashes(subject, field);
  if (hash) set.delete(hash);
  return writeNeverAgainHashes(subject, field, set);
}

export function questionHasNeverAgainChoice(question: { choices?: unknown } | null | undefined, hashes: Set<string>): boolean {
  if (!hashes.size || !question || !Array.isArray(question.choices)) return false;
  return question.choices.some((choice) => {
    const hash = choiceNeverAgainHash(String(choice || ''));
    return !!hash && hashes.has(hash);
  });
}

/** ここまでの全問題だけ。N.Y した肢と同じ文を含む問題を出題から外す。 */
export function omitNeverAgainQuestions<T extends { choices?: unknown }>(
  questions: T[],
  hashes: Set<string>,
  mode: string | undefined,
): T[] {
  if (mode !== 'all' || hashes.size === 0) return questions;
  return questions.filter((question) => !questionHasNeverAgainChoice(question, hashes));
}

/** 空白を除いて、この字数だけ連続して重なれば同じ言い回しとみる。 */
const SIMILAR_CHOICE_RUN = 30;

/** 文は違っても、同じ判例を聞いている肢。どちらかの語があれば同じグループ。 */
const SAME_CASE_MARKERS: string[][] = [
  ['児童遊園', '個室付浴場', '個室付き浴場', '個室付'],
];

export type ChoiceLinks = {
  /** 空白を除いて肢文が一致する。画面は赤。 */
  repeated: Set<string>;
  /** 同じ判例・論点で、言い回しが違う。画面は黄。 */
  similar: Set<string>;
  cohortOf: (hash: string) => string[];
};

function rememberCohort(cohorts: Map<string, Set<string>>, hashes: string[]) {
  const merged = new Set<string>();
  hashes.forEach((hash) => {
    merged.add(hash);
    const prev = cohorts.get(hash);
    if (prev) prev.forEach((item) => merged.add(item));
  });
  merged.forEach((hash) => cohorts.set(hash, merged));
}

/** 別の問題にも同じ肢文、同じ言い回し、または同じ判例の聞き方があるものを返す。 */
export function buildChoiceLinks(questions: Array<{ choices?: unknown }>): ChoiceLinks {
  const counts = new Map<string, number>();
  const gramQuestions = new Map<string, Set<number>>();
  const prepared: { hash: string; text: string; questionIndex: number }[] = [];
  const cohorts = new Map<string, Set<string>>();

  questions.forEach((question, questionIndex) => {
    const seen = new Set<string>();
    const choices = Array.isArray(question?.choices) ? question.choices : [];
    for (const choice of choices) {
      const text = normalizeChoiceForNeverAgain(String(choice || ''));
      const hash = text ? choiceNeverAgainHash(text) : '';
      if (!hash || seen.has(hash)) continue;
      seen.add(hash);
      counts.set(hash, (counts.get(hash) || 0) + 1);
      prepared.push({ hash, text, questionIndex });
      if (text.length < SIMILAR_CHOICE_RUN) continue;
      const grams = new Set<string>();
      for (let i = 0; i + SIMILAR_CHOICE_RUN <= text.length; i += 1) {
        grams.add(text.slice(i, i + SIMILAR_CHOICE_RUN));
      }
      grams.forEach((gram) => {
        const owners = gramQuestions.get(gram) || new Set<number>();
        owners.add(questionIndex);
        gramQuestions.set(gram, owners);
      });
    }
  });

  const sharedGrams = new Set<string>();
  gramQuestions.forEach((owners, gram) => {
    if (owners.size >= 2) sharedGrams.add(gram);
  });

  const exact = new Set<string>();
  counts.forEach((count, hash) => {
    if (count >= 2) exact.add(hash);
  });
  const similar = new Set<string>();
  prepared.forEach((item) => {
    if (exact.has(item.hash) || item.text.length < SIMILAR_CHOICE_RUN) return;
    for (let i = 0; i + SIMILAR_CHOICE_RUN <= item.text.length; i += 1) {
      if (sharedGrams.has(item.text.slice(i, i + SIMILAR_CHOICE_RUN))) {
        similar.add(item.hash);
        return;
      }
    }
  });

  SAME_CASE_MARKERS.forEach((markers) => {
    const matched = prepared.filter((item) => markers.some((marker) => item.text.includes(marker)));
    const questionsHit = new Set(matched.map((item) => item.questionIndex));
    if (questionsHit.size < 2) return;
    const hashes = matched.map((item) => item.hash);
    hashes.forEach((hash) => {
      if (!exact.has(hash)) similar.add(hash);
    });
    rememberCohort(cohorts, hashes);
  });

  return {
    repeated: exact,
    similar,
    cohortOf: (hash: string) => {
      const group = cohorts.get(hash);
      return group ? [...group] : hash ? [hash] : [];
    },
  };
}

/** 別の問題にも、空白を除いて同じ肢文があるもの。ここまでの全問題の赤カード用。 */
export function duplicateChoiceHashes(questions: Array<{ choices?: unknown }>): Set<string> {
  return buildChoiceLinks(questions).repeated;
}
