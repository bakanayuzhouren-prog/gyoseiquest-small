import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'qmark_';

function simpleHash(str: string): string {
  if (!str) return '0';
  let h = 0;
  for (let i = 0; i < Math.min(str.length, 500); i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

function buildKey(subject: string, field: string, questionText: string): string {
  return `${PREFIX}${subject}|${field}|${simpleHash(questionText)}`;
}

export type QuestionMark = 'o' | 'x' | null;

export async function getQuestionMark(
  subject: string,
  field: string,
  questionText: string
): Promise<QuestionMark> {
  try {
    const key = buildKey(subject, field, questionText);
    const val = await AsyncStorage.getItem(key);
    if (!val || (val !== 'o' && val !== 'x')) return null;
    return val;
  } catch {
    return null;
  }
}

export async function setQuestionMark(
  subject: string,
  field: string,
  questionText: string,
  mark: QuestionMark
): Promise<void> {
  try {
    const key = buildKey(subject, field, questionText);
    if (mark === null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, mark);
    }
  } catch (e) {
    console.error('Failed to set question mark', e);
  }
}
