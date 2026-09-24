/** 標準処理期間・標準審理期間。到達前の郵送は含めない。 */

const TAG = '[[image:learn/tetsuzuki/hyojun-yuso-totatsu]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/tetsuzuki/hyojun-yuso-totatsu')) return false;
  if (a.includes('補正に要する期間は含めない')) return true;
  if (/到達前の郵送|郵送に要する期間/.test(t)) return true;
  if (t.includes('（標準処理期間）') && t.includes('申請がその事務所に到達してから')) return true;
  if (t.includes('（標準審理期間）') && t.includes('審査請求がその事務所に到達してから')) return true;
  return false;
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendHyojunYusoToLearnDeepdive(learnDeepdive, learnContent) {
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
