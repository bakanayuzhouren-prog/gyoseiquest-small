/**
 * 問題の T 列 refId（解説資料シートの A 列 ID）を複数指定可能にし、
 * RESOURCES の targetChoice または「refId の並び ↔ 肢番号」で肢別に表示する。
 */

const KATAKANA_CHOICE = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'] as const;

export type QuizResourceEntry = {
  title?: string;
  content?: string;
  imageUrl?: string;
  order?: number;
  targetChoice?: string | null;
  type?: string;
};

function sortByOrder(pages: QuizResourceEntry[]): QuizResourceEntry[] {
  return [...pages].sort((a, b) => (a?.order ?? 999) - (b?.order ?? 999));
}

/** 0 始まり肢インデックス → スプシ F 列と対応しやすい アイウエオ… */
export function quizChoiceKatakanaLabel(choiceIndex: number): string {
  if (choiceIndex >= 0 && choiceIndex < KATAKANA_CHOICE.length) {
    return KATAKANA_CHOICE[choiceIndex];
  }
  return String(choiceIndex + 1);
}

/** F 列 targetChoice を肢ラベルに正規化（1・１→ア、空白除去、NFKC） */
export function normalizeResourceTargetChoice(raw: unknown): string {
  const s0 = String(raw ?? '')
    .normalize('NFKC')
    .trim();
  if (!s0) return '';
  const digitNorm = s0.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
  if (/^[1-9]$/.test(digitNorm)) {
    const n = parseInt(digitNorm, 10);
    if (n >= 1 && n <= KATAKANA_CHOICE.length) return KATAKANA_CHOICE[n - 1];
  }
  const c0 = digitNorm[0];
  if (KATAKANA_CHOICE.includes(c0 as (typeof KATAKANA_CHOICE)[number])) return c0;
  return c0;
}

export function parseQuizRefIds(refId: string | undefined | null): string[] {
  const raw = String(refId ?? '').trim();
  if (!raw) return [];
  const parts = raw
    .split(/[,、，\s]+/u)
    .map((p) => p.trim())
    .filter(Boolean);
  return [...new Set(parts)];
}

export function mergeQuizResourcePages(
  refIds: string[],
  resourcesData: Record<string, QuizResourceEntry[] | undefined>,
): QuizResourceEntry[] {
  const out: QuizResourceEntry[] = [];
  for (const id of refIds) {
    const arr = resourcesData[id];
    if (Array.isArray(arr)) out.push(...arr);
  }
  return sortByOrder(out);
}

function mergedHasAnyTargetChoice(pages: QuizResourceEntry[]): boolean {
  return pages.some((p) => String(p?.targetChoice ?? '').trim());
}

/**
 * この肢用の解説画像ページ。
 * - いずれかの行に targetChoice があれば: F 列がアイウ…と一致する行のみ（空の行は除外）
 * - すべて targetChoice が空なら: refId を複数並べた順で肢 0→refIds[0]、肢 1→refIds[1]…
 */
export function filterResourcePagesForChoice(
  allMergedSorted: QuizResourceEntry[],
  choiceIndex: number,
  refIds: string[],
  resourcesData: Record<string, QuizResourceEntry[] | undefined>,
): QuizResourceEntry[] {
  if (allMergedSorted.length === 0) return [];
  if (mergedHasAnyTargetChoice(allMergedSorted)) {
    const want = quizChoiceKatakanaLabel(choiceIndex);
    return allMergedSorted.filter((p) => {
      const tc = normalizeResourceTargetChoice(p?.targetChoice);
      return tc === want;
    });
  }
  if (choiceIndex < refIds.length) {
    const id = refIds[choiceIndex];
    const arr = resourcesData[id];
    return sortByOrder(Array.isArray(arr) ? [...arr] : []);
  }
  return [];
}
