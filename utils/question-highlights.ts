import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'qhl_';

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

export async function getQuestionHighlights(
  subject: string,
  field: string,
  questionText: string
): Promise<Set<number>> {
  try {
    const key = buildKey(subject, field, questionText);
    const val = await AsyncStorage.getItem(key);
    if (!val) return new Set();
    const arr = JSON.parse(val);
    return new Set(Array.isArray(arr) ? arr.map((n: number) => parseInt(String(n), 10)) : []);
  } catch {
    return new Set();
  }
}

export async function toggleQuestionHighlight(
  subject: string,
  field: string,
  questionText: string,
  segmentIndex: number
): Promise<Set<number>> {
  try {
    const current = await getQuestionHighlights(subject, field, questionText);
    const next = new Set(current);
    if (next.has(segmentIndex)) {
      next.delete(segmentIndex);
    } else {
      next.add(segmentIndex);
    }
    const key = buildKey(subject, field, questionText);
    await AsyncStorage.setItem(key, JSON.stringify([...next]));
    return next;
  } catch (e) {
    console.error('Failed to toggle highlight', e);
    return new Set();
  }
}

/** 蛍光ペン（ドラッグ）など、ハイライト行をまとめて保存 */
export async function setQuestionHighlights(
  subject: string,
  field: string,
  questionText: string,
  segments: Set<number> | number[]
): Promise<Set<number>> {
  try {
    const next = new Set(segments instanceof Set ? [...segments] : segments.map((n) => parseInt(String(n), 10)));
    const key = buildKey(subject, field, questionText);
    await AsyncStorage.setItem(key, JSON.stringify([...next]));
    return next;
  } catch (e) {
    console.error('Failed to set highlights', e);
    return new Set();
  }
}
