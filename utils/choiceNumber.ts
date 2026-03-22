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
 * 番号接頭辞と本文に分割。⑱を上段、問題文を下段に表示する用
 */
export function splitNumberPrefix(text: string): { prefix: string; body: string } {
  const t = (text || '').trim();
  const match = t.match(/^([\u2460-\u2473\u3251-\u325F\u32B1-\u32BF]+|\(\d+\))\s*(.*)$/s);
  if (match) return { prefix: match[1], body: match[2].trim() };
  return { prefix: '', body: t };
}

/** 「1.2. A / B」または「1.2. 1,A\n2,B」形式を「１，A」改行「２，B」に変換（問題文・解説肢表示用）。「1.2.」および「1,」「2,」の重複を除去 */
export function formatNumberedClauses(text: string): string {
  if (!text) return text;
  // 先頭の「1.2. 」を常に除去（単独表示のフォールバック）
  let t = text.replace(/^1\.2\.\s*/, '').trim();
  if (!t) return text;
  let parts: string[];
  if (t.includes(' / ')) {
    parts = t.split(/\s*\/\s*/);
  } else if (/[\n\r]\s*2[,，]/.test(t)) {
    // 改行で区切られた「1,A\n2,B」形式（1.2.は既に除去済み）
    parts = t.split(/\s*[\n\r]+\s*(?=2[,，])/);
  } else {
    return t;
  }
  if (parts.length !== 2) return t;
  let a = parts[0].replace(/^1\.2\.\s*/, '').replace(/^1\.?[,，]\s*/, '').trim();
  let b = parts[1].replace(/^2\.?[,，]\s*/, '').trim();
  if (!a || !b) return t;
  return `１．${a}\n\n２．${b}`;
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
