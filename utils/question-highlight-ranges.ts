import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'qhlr_';

function simpleHash(str: string): string {
  if (!str) return '0';
  let h = 0;
  for (let i = 0; i < Math.min(str.length, 500); i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

function buildKey(subject: string, field: string, questionText: string): string {
  return `${PREFIX}${subject}|${field}|${simpleHash(questionText)}`;
}

export type HighlightRange = { start: number; end: number };

export function mergeHighlightRanges(ranges: HighlightRange[]): HighlightRange[] {
  const valid = ranges
    .map((r) => ({
             start: Math.min(r.start, r.end),
             end: Math.max(r.start, r.end),
           }))
    .filter((r) => r.end > r.start && r.start >= 0)
    .sort((a, b) => a.start - b.start);
  if (valid.length === 0) return [];
  const out: HighlightRange[] = [{ ...valid[0] }];
  for (let i = 1; i < valid.length; i++) {
    const cur = valid[i];
    const last = out[out.length - 1];
    if (cur.start <= last.end) last.end = Math.max(last.end, cur.end);
    else out.push({ ...cur });
  }
  return out;
}

export async function getQuestionHighlightRanges(
  subject: string,
  field: string,
  questionText: string
): Promise<HighlightRange[]> {
  try {
    const key = buildKey(subject, field, questionText);
    const val = await AsyncStorage.getItem(key);
    if (!val) return [];
    const arr = JSON.parse(val);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((x: unknown) => {
        if (!x || typeof x !== 'object') return null;
        const o = x as { start?: unknown; end?: unknown };
        const start = parseInt(String(o.start), 10);
        const end = parseInt(String(o.end), 10);
        if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
        return { start, end };
      })
      .filter((r): r is HighlightRange => r !== null && r.end > r.start);
  } catch {
    return [];
  }
}

export async function setQuestionHighlightRanges(
  subject: string,
  field: string,
  questionText: string,
  ranges: HighlightRange[]
): Promise<HighlightRange[]> {
  const merged = mergeHighlightRanges(ranges);
  try {
    const key = buildKey(subject, field, questionText);
    await AsyncStorage.setItem(key, JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.error('Failed to set highlight ranges', e);
    return [];
  }
}

/** マージ済み区間から [cutLo, cutHi) を切り除く（半開区間、文字オフセット） */
export function subtractMergedHighlightCut(
  merged: HighlightRange[],
  cutLo: number,
  cutHi: number
): HighlightRange[] {
  const s = Math.min(cutLo, cutHi);
  const e = Math.max(cutLo, cutHi);
  if (e <= s) return merged;
  const out: HighlightRange[] = [];
  for (const r of merged) {
    const u = r.start;
    const v = r.end;
    if (v <= s || u >= e) {
      out.push({ start: u, end: v });
      continue;
    }
    if (u < s) out.push({ start: u, end: Math.min(s, v) });
    if (v > e) out.push({ start: Math.max(e, u), end: v });
  }
  return mergeHighlightRanges(out);
}

function selectionOverlapsMergedRanges(merged: HighlightRange[], lo: number, hi: number): boolean {
  return merged.some((r) => !(r.end <= lo || r.start >= hi));
}

/** 選択が既存ハイライトと重なればその部分を消し、さもなくば追加する（Web 蛍光ペン） */
export async function addOrSubtractQuestionHighlightRange(
  subject: string,
  field: string,
  questionText: string,
  start: number,
  end: number,
  maxLen: number
): Promise<HighlightRange[]> {
  const lo = Math.max(0, Math.min(start, end, maxLen));
  const hi = Math.max(0, Math.min(Math.max(start, end), maxLen));
  if (hi <= lo) {
    return getQuestionHighlightRanges(subject, field, questionText);
  }
  const current = await getQuestionHighlightRanges(subject, field, questionText);
  const merged = mergeHighlightRanges(current);
  if (selectionOverlapsMergedRanges(merged, lo, hi)) {
    const next = subtractMergedHighlightCut(merged, lo, hi);
    return setQuestionHighlightRanges(subject, field, questionText, next);
  }
  const next = mergeHighlightRanges([...merged, { start: lo, end: hi }]);
  return setQuestionHighlightRanges(subject, field, questionText, next);
}

/** 1 範囲を追加してマージし保存（Web の選択ハイライト用） */
export async function addQuestionHighlightRange(
  subject: string,
  field: string,
  questionText: string,
  start: number,
  end: number,
  maxLen: number
): Promise<HighlightRange[]> {
  const lo = Math.max(0, Math.min(start, end, maxLen));
  const hi = Math.max(0, Math.min(Math.max(start, end), maxLen));
  if (hi <= lo) {
    return getQuestionHighlightRanges(subject, field, questionText);
  }
  const current = await getQuestionHighlightRanges(subject, field, questionText);
  const next = mergeHighlightRanges([...current, { start: lo, end: hi }]);
  return setQuestionHighlightRanges(subject, field, questionText, next);
}

/** 表示用テキストをマージ済み区間で分割（空でない断片のみ返す） */
export function splitTextByHighlightRanges(
  text: string,
  ranges: HighlightRange[]
): { text: string; highlighted: boolean }[] {
  if (!text) return [];
  const merged = mergeHighlightRanges(
    ranges.map((r) => ({
      start: Math.min(r.start, text.length),
      end: Math.min(r.end, text.length),
    }))
  );
  if (merged.length === 0) return [{ text, highlighted: false }];
  const parts: { text: string; highlighted: boolean }[] = [];
  let c = 0;
  for (const r of merged) {
    const s = Math.max(c, r.start);
    const e = Math.min(r.end, text.length);
    if (s > c) parts.push({ text: text.slice(c, s), highlighted: false });
    if (e > s) parts.push({ text: text.slice(s, e), highlighted: true });
    c = Math.max(c, e);
  }
  if (c < text.length) parts.push({ text: text.slice(c), highlighted: false });
  return parts;
}
