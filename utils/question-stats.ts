import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'qstats_';

/** 問題文を正規化（前後空白・連続空白・改行を統一してハッシュの一貫性を確保） */
function normalizeQuestionText(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function simpleHash(str: string): string {
  const normalized = normalizeQuestionText(str);
  if (!normalized) return '0';
  let h = 0;
  for (let i = 0; i < Math.min(normalized.length, 500); i++) {
    h = ((h << 5) - h) + normalized.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

function buildKey(subject: string, field: string, questionText: string): string {
  return `${PREFIX}${subject}|${field}|${simpleHash(questionText)}`;
}

export interface QuestionStats {
  correct: number;
  wrong: number;
}

export async function getQuestionStats(
  subject: string,
  field: string,
  questionText: string
): Promise<QuestionStats> {
  try {
    const key = buildKey(subject, field, questionText);
    const val = await AsyncStorage.getItem(key);
    if (!val) return { correct: 0, wrong: 0 };
    const parsed = JSON.parse(val);
    return {
      correct: Math.max(0, parseInt(parsed.correct, 10) || 0),
      wrong: Math.max(0, parseInt(parsed.wrong, 10) || 0),
    };
  } catch {
    return { correct: 0, wrong: 0 };
  }
}

// React Strict Mode 等で useEffect が二重実行された際の重複カウント防止
let lastUpdateSig = '';
let lastUpdateTime = 0;
const DEDUPE_MS = 2000;

export async function updateQuestionStats(
  subject: string,
  field: string,
  questionText: string,
  isCorrect: boolean
): Promise<void> {
  try {
    const sig = `${buildKey(subject, field, questionText)}|${isCorrect}`;
    const now = Date.now();
    if (sig === lastUpdateSig && now - lastUpdateTime < DEDUPE_MS) {
      return; // 同一回答の重複更新をスキップ
    }
    lastUpdateSig = sig;
    lastUpdateTime = now;

    const key = buildKey(subject, field, questionText);
    const current = await getQuestionStats(subject, field, questionText);
    if (isCorrect) {
      current.correct += 1;
    } else {
      current.wrong += 1;
    }
    await AsyncStorage.setItem(key, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to update question stats', e);
  }
}

export async function getCorrectRate(
  subject: string,
  field: string,
  questionText: string
): Promise<number | null> {
  const { correct, wrong } = await getQuestionStats(subject, field, questionText);
  const total = correct + wrong;
  if (total === 0) return null;
  return Math.round((correct / total) * 100);
}
