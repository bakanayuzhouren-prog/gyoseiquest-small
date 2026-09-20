import {
  SEIJI_TAISEI_COMPARE_MD,
  SEIJI_TAISEI_MARKER,
  shouldAttachSeijiTaiseiCompare,
} from '../utils/seijiTaiseiHikaku';

const SUBJECTS = ['基礎知識', '基礎法学'];

export function appendSeijiTaiseiToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttachSeijiTaiseiCompare(a, b) && !b.includes(SEIJI_TAISEI_MARKER)) continue;
      if (b.includes(SEIJI_TAISEI_MARKER)) continue;
      bCol[i] = b ? `${b}\n\n${SEIJI_TAISEI_COMPARE_MD}` : SEIJI_TAISEI_COMPARE_MD;
    }
    next[subject] = bCol;
  }
  return next;
}
