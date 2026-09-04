const TAG = '[[image:learn/gyosei/kounen-bessou-ryokin]]';

function isKounenCard(text) {
  return /別荘給水|旧高根|別荘料金|別荘の基本料金|別荘の給水契約/.test(String(text || ''));
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendKounenBessouToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isKounenCard(`${aCol[i] || ''}\n${bCol[i] || ''}`)) continue;
      bCol[i] = prependTag(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
