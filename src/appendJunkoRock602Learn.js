/** 民法602条の期間語呂図を、13条・管理権限カードの深掘り先頭に差し込む。 */

const TAG = '[[image:learn/minnpou/602-junko-rock]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/minnpou/602-junko-rock')) return false;
  if (/明渡し猶予|395条1項/.test(t) && /買受け/.test(t)) return false;
  if (a.includes('民法１３条以外の被保佐人が保佐人の同意を得なければならない行為')) return true;
  if (a.includes('管理人は保存行為、性質を変えない利用、改良行為ができる')) return true;
  return false;
}

export function appendJunkoRock602ToLearnDeepdive(learnDeepdive, learnContent) {
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
