/** 共産党袴田事件（最判昭63.12.20）4コマを該当カードへ差し込む。 */

const TAG = '[[image:learn/kenpou/kyosanto-hakamada-yonkoma]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/kenpou/kyosanto-hakamada-yonkoma')) return false;
  if (t.includes('袴田巌')) return false;
  if (a.includes('政党の党員に対する処分は、内部的問題にとどまる限り')) return true;
  if (a.includes('政党の除名などの内部問題は、原則として司法審査')) return true;
  if (/共産党袴田/.test(t)) return true;
  if (/袴田事件/.test(t) && /政党/.test(t)) return true;
  return false;
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendHakamadaYonkomaToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttach(a, b)) continue;
      bCol[i] = prependTag(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
