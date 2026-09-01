/** 民法20条・催告の相手比較図を、該当カードの深掘り先頭に差し込む。 */

const TAG = '[[image:learn/minnpou/seigen-saikoku-hikaku]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/minnpou/seigen-saikoku-hikaku')) return false;
  if (t.includes('能力回復後の本人又は法定代理人等への催告')) return true;
  if (t.includes('相手方が被保佐人に対して、追認を得るべき催告')) return true;
  if (t.includes('被保佐人・被補助人本人に追認取得を催告')) return true;
  return false;
}

export function appendSeigenSaikokuCompareToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttach(a, b)) continue;
      bCol[i] = b ? `${TAG}\n\n${b}` : TAG;
    }
    next[subject] = bCol;
  }
  return next;
}
