/** 即時強制が続いている限り取消訴訟、の1コマを該当カードへ差し込む。 */

const TAG = '[[image:learn/gyosei/sokuji-kyosei-torikeshi]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/gyosei/sokuji-kyosei-torikeshi')) return false;
  if (/新型コロナウイルス|比例原則|直接強制は|反対解釈/.test(t)) return false;
  if (a.includes('即時強制は義務不履行を前提')) return true;
  if (a.includes('即時強制は義務履行確保の手段ではない')) return true;
  if (a.includes('条例に基づく即時強制')) return true;
  if (/即時強制/.test(t) && /取消訴訟/.test(t)) return true;
  return false;
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendSokujiKyoseiToLearnDeepdive(learnDeepdive, learnContent) {
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
