import {
  KOUMUIN_JINKEN_COMPARE_MD,
  KOUMUIN_JINKEN_MARKER,
  shouldAttachKoumuinJinkenCompare,
} from '../utils/koumuinJinkenHikaku.ts';

const SUBJECTS = ['憲法', '多肢選択憲法', '基礎知識'];

export function appendKoumuinJinkenToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttachKoumuinJinkenCompare(a, b) && !b.includes(KOUMUIN_JINKEN_MARKER)) {
        continue;
      }
      if (b.includes(KOUMUIN_JINKEN_MARKER)) continue;
      bCol[i] = b ? `${b}\n\n${KOUMUIN_JINKEN_COMPARE_MD}` : KOUMUIN_JINKEN_COMPARE_MD;
    }
    next[subject] = bCol;
  }
  return next;
}
