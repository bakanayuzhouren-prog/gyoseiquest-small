const TAG = '[[image:learn/shouhou/shihainin-kengen]]';

function isShihaininKengenCard(text) {
  return /一切の裁判上|裁判上・裁判外|裁判上又は裁判外|表見支配人|ある種類または特定の事項の委任|ある種類又は特定の事項|店舗の使用人は|商業使用人/.test(
    String(text || ''),
  );
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendShihaininKengenToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isShihaininKengenCard(`${aCol[i] || ''}\n${bCol[i] || ''}`)) continue;
      bCol[i] = prependTag(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
