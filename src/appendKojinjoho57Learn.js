import {
  KOJINJOHO57_COMPARE_MD,
  KOJINJOHO57_MARKER,
  shouldAttachKojinjoho57Compare,
} from '../utils/kojinjoho57Hikaku';

const SUBJECTS = ['基礎知識', '個人情報'];

export function appendKojinjoho57ToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttachKojinjoho57Compare(a, b) && !b.includes(KOJINJOHO57_MARKER)) continue;
      if (b.includes(KOJINJOHO57_MARKER)) continue;
      bCol[i] = b ? `${b}\n\n${KOJINJOHO57_COMPARE_MD}` : KOJINJOHO57_COMPARE_MD;
    }
    next[subject] = bCol;
  }
  return next;
}
