import AsyncStorage from '@react-native-async-storage/async-storage';

import { getQuestionTextHash } from '@/utils/question-stats';

const PREFIX = 'qallw_';

export type AllQuestionsWrongEntry = {
  subject: string;
  field: string;
  textHash: string;
  wrong: number;
  correct: number;
  previewText: string;
};

type StoredAttempt = {
  wrong: number;
  correct: number;
  previewText?: string;
};

let lastSig = '';
let lastAt = 0;

function storageKey(subject: string, field: string, textHash: string): string {
  return `${PREFIX}${subject}|${field}|${textHash}`;
}

function parseKey(key: string): { subject: string; field: string; textHash: string } | null {
  if (!key.startsWith(PREFIX)) return null;
  const parts = key.slice(PREFIX.length).split('|');
  if (parts.length < 3) return null;
  const textHash = parts[parts.length - 1] || '';
  const field = parts[parts.length - 2] || '';
  const subject = parts.slice(0, -2).join('|');
  if (!subject || !field || !textHash) return null;
  return { subject, field, textHash };
}

function previewOf(questionText: string): string {
  const text = questionText.replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.length > 180 ? `${text.slice(0, 180)}…` : text;
}

/** ここまでの全問題で答えたときだけ。④誤答問題リストとは別の記録。 */
export async function recordAllQuestionsAttempt(
  subject: string,
  field: string,
  questionText: string,
  isCorrect: boolean,
): Promise<void> {
  if (!subject || !field || !questionText) return;
  const textHash = getQuestionTextHash(questionText);
  const sig = `${subject}|${field}|${textHash}|${isCorrect ? '1' : '0'}`;
  const now = Date.now();
  if (sig === lastSig && now - lastAt < 2000) return;
  lastSig = sig;
  lastAt = now;

  const key = storageKey(subject, field, textHash);
  let current: StoredAttempt = { wrong: 0, correct: 0 };
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw) current = { ...current, ...JSON.parse(raw) };
  } catch {
    current = { wrong: 0, correct: 0 };
  }
  if (isCorrect) current.correct = Math.max(0, current.correct || 0) + 1;
  else current.wrong = Math.max(0, current.wrong || 0) + 1;
  const preview = previewOf(questionText);
  if (preview) current.previewText = preview;
  await AsyncStorage.setItem(key, JSON.stringify(current));
}

export async function getAllQuestionsWrongEntries(): Promise<AllQuestionsWrongEntry[]> {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter((key) => key.startsWith(PREFIX));
    if (keys.length === 0) return [];
    const pairs = await AsyncStorage.multiGet(keys);
    const out: AllQuestionsWrongEntry[] = [];
    for (const [key, raw] of pairs) {
      if (!raw) continue;
      const parsed = parseKey(key);
      if (!parsed) continue;
      let stored: StoredAttempt;
      try {
        stored = JSON.parse(raw);
      } catch {
        continue;
      }
      const wrong = Math.max(0, Number(stored.wrong) || 0);
      if (wrong <= 0) continue;
      out.push({
        subject: parsed.subject,
        field: parsed.field,
        textHash: parsed.textHash,
        wrong,
        correct: Math.max(0, Number(stored.correct) || 0),
        previewText: (stored.previewText || '').trim() || '（問題文の控えなし）',
      });
    }
    out.sort((a, b) => b.wrong - a.wrong || a.subject.localeCompare(b.subject, 'ja'));
    return out;
  } catch {
    return [];
  }
}
