/** 書面による教示の請求。行審法82条3項／行訴法46条に請求規定なし。 */

const TAG = '[[image:learn/tetsuzuki/kyouji-shomen]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/tetsuzuki/kyouji-shomen')) return false;
  if (a.includes('教示をしなかった') && /83条/.test(t) && !/書面による教示を求め/.test(t)) return false;
  if (/書面による教示を求め/.test(t)) return true;
  if (a.includes('利害関係人から教示を求め')) return true;
  return false;
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendKyoujiShomenToLearnDeepdive(learnDeepdive, learnContent) {
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
