/** 見て聞いて覚えるに、委任・寄託・組合・事務管理の比較図を差し込む。 */

const TAGS = `[[image:learn/minnpou/inin-kitaku-gimu]]
[[image:learn/minnpou/inin-kitaku-kenri]]`;

const SUBJECTS = ['債権各論', '民法総則'];

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (/inin-kitaku-gimu|inin-kitaku-kenri/.test(t)) return true;
  if (t.includes('委任は費用前払') && t.includes('事務管理')) return true;
  if (t.includes('委任契約は、各当事者がいつでも契約を解除')) return true;
  if (t.includes('受任者が事務処理に費用')) return true;
  if (t.includes('事務管理の管理者が本人すなわち')) return true;
  if (t.includes('無報酬の寄託物契約の受寄者')) return true;
  return false;
}

export function appendIninKitakuCompareToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttach(a, b)) continue;
      if (b.includes('learn/minnpou/inin-kitaku-gimu')) continue;
      bCol[i] = b ? `${TAGS}\n\n${b}` : TAGS;
    }
    next[subject] = bCol;
  }
  return next;
}
