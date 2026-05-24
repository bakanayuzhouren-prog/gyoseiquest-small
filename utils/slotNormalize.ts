/**
 * 語群選択・スロット穴埋め: シートの「ア xxx / イ yyy」形式と表示・採点の整合用
 */

/** 末尾が …（…） / …(...) で終わるか（シート折り返し結合判定用） */
function endsWithInlineParenthetical(s: string): boolean {
  return /[（(][^）)]{1,240}[）)]\s*$/.test(s.trim());
}

/** 行全体が括弧1組だけか（折り返された注釈行） */
function isParentheticalOnlySegment(s: string): boolean {
  return /^[（(]\s*[^）)]{1,240}\s*[）)]\s*$/.test(s.trim());
}

/** N列セル内の語群を個別選択肢に分割（/ 改行 + ア・イ / A・B 見出しのスペース区切り） */
export function splitSlotOptionParts(optStr: string): string[] {
  if (!optStr) return [];
  const raw = optStr.trim();
  const norm = raw.normalize('NFKC');
  let parts = norm
    .split(/\n+|(?=[①②③④⑤])|(?=\d+[\.．]\s*)|[\/／]|\t+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 1 && /[アイウエ]\s/.test(parts[0])) {
    const expanded = parts[0].split(/\s+(?=[アイウエ]\s)/).map((p) => p.trim()).filter(Boolean);
    if (expanded.length > 1) parts = expanded;
  }
  if (parts.length === 1 && /^[A-Z]\s/.test(parts[0])) {
    const expanded = parts[0].split(/\s+(?=[A-Z]\s)/).map((p) => p.trim()).filter(Boolean);
    if (expanded.length > 1) parts = expanded;
  }
  // セル内改行で「語句」と「（…原則）」が分かれたとき 1 肢に戻す（直前肢がまだ括弧で閉じていない場合のみ）
  const merged: string[] = [];
  for (const p of parts) {
    const t = p.trim();
    if (!t) continue;
    if (isParentheticalOnlySegment(t) && merged.length > 0 && !endsWithInlineParenthetical(merged[merged.length - 1])) {
      merged[merged.length - 1] = `${merged[merged.length - 1]}${t}`;
    } else {
      merged.push(t);
    }
  }
  return merged;
}

/**
 * 組合せ肢1行（「特別　有しない　有する…」）をスロット数ぶんに分割。
 * answer が肢インデックスのみの穴埋め問題で結果画面の正解表示・採点に使う。
 */
export function splitComboChoiceLineToSlots(choiceLine: string, expectedParts: number): string[] | null {
  if (!choiceLine || expectedParts <= 0) return null;
  const base = choiceLine
    .replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '')
    .trim();
  const run = (re: RegExp) => base.split(re).map((s) => s.trim()).filter(Boolean);
  let parts = run(/[\u3000\t]+/);
  if (parts.length !== expectedParts) parts = run(/\s+/);
  if (parts.length !== expectedParts) return null;
  return parts;
}

/**
 * K列が「1行目＝ア・2行目＝イ」＋末尾の（…原則）だけの行が混在する形式のとき、スロット2つ分に還元。
 * シートの折り返しで splitComboChoiceLineToSlots が失敗する問題を補う。
 */
export function parseComboChoiceParts(choiceLine: string): { partA: string; partB: string } | null {
  const base = choiceLine.replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
  const lines = base
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const filtered = lines.filter((l) => !/^（[^）]{1,120}）\s*$/.test(l));
  if (filtered.length < 2) return null;
  return { partA: filtered[0], partB: filtered[1] };
}

/** 正解肢テキストからスロット用文字列列を得る（全角スペース区切り or 2行組合せ） */
export function splitComboChoiceLineToSlotsFlexible(choiceLine: string, expectedParts: number): string[] | null {
  const direct = splitComboChoiceLineToSlots(choiceLine, expectedParts);
  if (direct) return direct;
  if (expectedParts === 2) {
    const p = parseComboChoiceParts(choiceLine);
    if (p) return [p.partA, p.partB];
  }
  return null;
}

/** 正解文字列とユーザー選択を同一視（（ｒ）除去 + 先頭のア/イ + 空白正規化） */
export function normalizeSlotAnswerForCompare(s: string): string {
  let t = (s || '')
    .normalize('NFKC')
    .replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '')
    .replace(/[\s\u3000]+/g, ' ')
    .trim()
    .replace(/^[アイウエ]\s+/, '')
    .replace(/^[A-Z]\s+/, '')
    .trim();
  // K列2行＋（…原則）行で得た正解は本文明のみ、語群タップは（国会○○の原則）まで1語句 — 末尾の注釈括弧を剥がして一致させる
  let prev = '';
  while (prev !== t) {
    prev = t;
    t = t
      .replace(/\s*（[^）]{4,240}）\s*$/u, '')
      .replace(/\s*\([^)]{4,240}\)\s*$/, '')
      .trim();
  }
  return t;
}
