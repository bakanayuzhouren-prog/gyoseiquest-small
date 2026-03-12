/**
 * 問題文がすでに番号で始まっているか（①〜㊿、(1)等）
 */
export function hasNumberPrefix(text: string): boolean {
  const t = (text || '').trim();
  if (/^[\u2460-\u2473\u3251-\u325F\u32B1-\u32BF]/.test(t)) return true; // ①〜㊿
  if (/^\(\d+\)/.test(t)) return true; // (1) (2) 等
  return false;
}

/**
 * 問題番号を丸数字で統一（①〜⑳、㉑〜㉟、㊱〜㊿）
 */
export function getChoicePrefix(index: number): string {
  if (index < 20) return String.fromCharCode(0x2460 + index); // ①〜⑳
  if (index < 35) return String.fromCharCode(0x3251 + (index - 20)); // ㉑〜㉟
  if (index < 50) return String.fromCharCode(0x32b1 + (index - 35)); // ㊱〜㊿
  return `(${index + 1})`;
}
