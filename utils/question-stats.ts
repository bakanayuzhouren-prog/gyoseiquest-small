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

/** 非表示フィルタなどで question-stats と同一の問題文ハッシュを使う */
export function getQuestionTextHash(questionText: string): string {
  return simpleHash(questionText);
}

function buildKey(subject: string, field: string, questionText: string): string {
  return `${PREFIX}${subject}|${field}|${simpleHash(questionText)}`;
}

export interface QuestionStats {
  correct: number;
  wrong: number;
  /** 直近の連続正解回数（不正解で 0 にリセット） */
  consecutiveCorrect: number;
  /** 誤答リスト表示用（最新の問題文プレビュー） */
  previewText?: string;
  /**
   * true のとき「見て聞いて覚える」を青表示に固定（手動解除）。
   * 再度誤答すると false に戻る。
   */
  learnLinkBlueOverride?: boolean;
}

/** AsyncStorage キー qstats_{subject}|{field}|{hash} を分解 */
export function parseQuestionStatsStorageKey(key: string): { subject: string; field: string; textHash: string } | null {
  if (!key.startsWith(PREFIX)) return null;
  const rest = key.slice(PREFIX.length);
  const parts = rest.split('|');
  if (parts.length < 3) return null;
  const textHash = parts[parts.length - 1]!;
  const field = parts[parts.length - 2]!;
  const subject = parts.slice(0, -2).join('|');
  return { subject, field, textHash };
}

export interface WrongQuestionListEntry {
  subject: string;
  field: string;
  textHash: string;
  wrong: number;
  correct: number;
  previewText: string;
}

/** wrong > 0 の問題のみ（誤答問題リスト用） */
export async function getAllWrongQuestionEntries(): Promise<WrongQuestionListEntry[]> {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith(PREFIX));
    if (keys.length === 0) return [];
    const pairs = await AsyncStorage.multiGet(keys);
    const out: WrongQuestionListEntry[] = [];
    for (const [key, raw] of pairs) {
      if (!raw) continue;
      const parsed = parseQuestionStatsStorageKey(key);
      if (!parsed) continue;
      let stats: QuestionStats;
      try {
        stats = JSON.parse(raw);
      } catch {
        continue;
      }
      const wrong = Math.max(0, parseInt(String(stats.wrong), 10) || 0);
      if (wrong <= 0) continue;
      const correct = Math.max(0, parseInt(String(stats.correct), 10) || 0);
      const previewText = (stats.previewText && String(stats.previewText).trim()) || '（問題文プレビューなし・タップで解く）';
      out.push({
        subject: parsed.subject,
        field: parsed.field,
        textHash: parsed.textHash,
        wrong,
        correct,
        previewText,
      });
    }
    out.sort((a, b) => b.wrong - a.wrong || b.correct - a.correct);
    return out;
  } catch (e) {
    console.error('getAllWrongQuestionEntries', e);
    return [];
  }
}

export async function getQuestionStats(
  subject: string,
  field: string,
  questionText: string
): Promise<QuestionStats> {
  try {
    const key = buildKey(subject, field, questionText);
    const val = await AsyncStorage.getItem(key);
    if (!val) return { correct: 0, wrong: 0, consecutiveCorrect: 0 };
    const parsed = JSON.parse(val);
    return {
      correct: Math.max(0, parseInt(parsed.correct, 10) || 0),
      wrong: Math.max(0, parseInt(parsed.wrong, 10) || 0),
      consecutiveCorrect: Math.max(0, parseInt(parsed.consecutiveCorrect, 10) || 0),
      previewText: typeof parsed.previewText === 'string' ? parsed.previewText : undefined,
      learnLinkBlueOverride: parsed.learnLinkBlueOverride === true,
    };
  } catch {
    return { correct: 0, wrong: 0, consecutiveCorrect: 0 };
  }
}

// React Strict Mode 等で useEffect が二重実行された際の重複カウント防止
let lastUpdateSig = '';
let lastUpdateTime = 0;
const DEDUPE_MS = 2000;

/**
 * 誤不正解などで wrong が付いたあと、当該問題の試行回数をすべて「正解」として扱い直す（正答率 100%）。
 * UI: 問題画面の「正答率: x/y」を長押しで実行。
 */
export async function reconcileAllAttemptsAsCorrect(
  subject: string,
  field: string,
  questionText: string
): Promise<QuestionStats> {
  const current = await getQuestionStats(subject, field, questionText);
  const total = current.correct + current.wrong;
  if (total <= 0) return current;
  const next: QuestionStats = {
    correct: total,
    wrong: 0,
    consecutiveCorrect: Math.max(current.consecutiveCorrect ?? 0, total),
    previewText: current.previewText,
    learnLinkBlueOverride: true,
  };
  const key = buildKey(subject, field, questionText);
  await AsyncStorage.setItem(key, JSON.stringify(next));
  return next;
}

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
      current.consecutiveCorrect = (current.consecutiveCorrect ?? 0) + 1;
    } else {
      current.wrong += 1;
      current.consecutiveCorrect = 0;
      // 再誤答したら赤表示に戻す
      current.learnLinkBlueOverride = false;
    }
    const qt = (questionText || '').trim();
    if (qt) {
      current.previewText = qt.length > 400 ? `${qt.slice(0, 400)}…` : qt;
    }
    await AsyncStorage.setItem(key, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to update question stats', e);
  }
}

/** 「見て聞いて覚える」を青表示に固定／解除（長押し用） */
export async function setLearnLinkBlueOverride(
  subject: string,
  field: string,
  questionText: string,
  enabled: boolean,
): Promise<QuestionStats> {
  const current = await getQuestionStats(subject, field, questionText);
  const next: QuestionStats = {
    ...current,
    learnLinkBlueOverride: enabled,
  };
  const key = buildKey(subject, field, questionText);
  await AsyncStorage.setItem(key, JSON.stringify(next));
  return next;
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
