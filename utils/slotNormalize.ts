/**
 * 語群選択・スロット穴埋め: シートの「ア xxx / イ yyy」形式と表示・採点の整合用
 */

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
  return parts;
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

/** 正解文字列とユーザー選択を同一視（（ｒ）除去 + 先頭のア/イ + 空白正規化） */
export function normalizeSlotAnswerForCompare(s: string): string {
  return (s || '')
    .normalize('NFKC')
    .replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '')
    .replace(/[\s\u3000]+/g, ' ')
    .trim()
    .replace(/^[アイウエ]\s+/, '')
    .replace(/^[A-Z]\s+/, '')
    .trim();
}
