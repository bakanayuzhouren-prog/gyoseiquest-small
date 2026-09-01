/** 民法177条・登記なし対抗の比較図を、該当カードの深掘り先頭に差し込む。 */

const TAG = '[[image:learn/minnpou/minpo-bukken-third-party-177-v2]]';

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/minnpou/minpo-bukken-third-party-177-v2')) return false;
  if (t.includes('Aの土地をBが時効取得した後、Aが背信的悪意者であるGに土地を売却した場合')) return true;
  if (t.includes('Aの土地にBが無断で建物を築造し、登記も備えた場合、Aから土地を買い受けたCは')) return true;
  if (t.includes('登記しなければ原則として第三者に対抗できません。ただし背信的悪意者')) return true;
  if (t.includes('177条の第三者を絞るという考え方は、縮小解釈である')) return true;
  return false;
}

export function appendMinpo177ThirdPartyToLearnDeepdive(learnDeepdive, learnContent) {
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
