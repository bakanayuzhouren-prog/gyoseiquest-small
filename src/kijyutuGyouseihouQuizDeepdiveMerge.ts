import { resolveKijyutuGyouseihouCaseImageKey } from '@/src/deepdiveImages';

/** 【ケースA】形式の見出し */
const CASE_LABEL_BRACKET_RE = /(^|\n)(【ケース\s*([A-Za-zＡ-Ｚ0-9])\s*】)/g;

/**
 * 記述・行政法: M列の「もっと深掘る」を開く直前、【ケースA】直後に
 * assets/images/deepdive/kijyutu/gyouseihou/kijyutu-gyouseihou{N}-{S} と対応する [[image:key]] を差し込む。
 * （スプシに同キーの [[image:]] が直後にある場合は追加しない）
 */
export function mergeKijyutuGyouseihouQuizCaseImages(
  body: string,
  quizSubject: string,
  quizField: string,
  questionIndexOnScreen: number,
): string {
  if (
    quizSubject !== '記述' ||
    quizField !== '行政法' ||
    questionIndexOnScreen < 0 ||
    !(body ?? '').trim()
  ) {
    return body ?? '';
  }
  const text = body;
  let out = '';
  let last = 0;
  CASE_LABEL_BRACKET_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CASE_LABEL_BRACKET_RE.exec(text)) !== null) {
    out += text.slice(last, m.index);
    const lead = m[1];
    const heading = m[2];
    const suf = m[3];
    last = CASE_LABEL_BRACKET_RE.lastIndex;
    const imgKey = resolveKijyutuGyouseihouCaseImageKey(questionIndexOnScreen + 1, suf);
    const tag = imgKey ? `[[image:${imgKey}]]` : '';
    let insert = `${lead}${heading}`;
    const restAfterHeading = text.slice(last);
    if (imgKey && tag && !snippetHasImageForKey(restAfterHeading, imgKey)) {
      insert += `\n\n${tag}\n`;
    }
    out += insert;
  }
  out += text.slice(last);
  return out;
}

function snippetHasImageForKey(snippet: string, imgKey: string): boolean {
  const t = snippet.trimStart().slice(0, 2500);
  if (t.includes(`[[image:${imgKey}`)) return true;
  const base = imgKey.includes('/') ? (imgKey.split('/').pop() ?? imgKey) : imgKey;
  return t.includes(`[[image:${base}`);
}
