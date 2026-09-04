const TAG = '[[image:learn/shouhou/mochibun-3sha]]';

function isMochibun3shaCard(text) {
  const t = String(text || '');
  if (/株式交換|株式移転/.test(t)) return false;
  if (/行政書士法人|弁護士法人|司法書士法人|営利法人/.test(t) && !/無限責任|有限責任社員/.test(t)) return false;
  return /持分会社|合名会社|合資会社|無限責任社員|有限責任社員|無限・有限責任/.test(t);
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendMochibun3shaToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isMochibun3shaCard(`${aCol[i] || ''}\n${bCol[i] || ''}`)) continue;
      bCol[i] = prependTag(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
