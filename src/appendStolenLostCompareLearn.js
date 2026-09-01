import {
  STOLEN_LOST_COMPARE_IMAGE_TAG,
  STOLEN_LOST_VS_POSSESSORY_COMPARE_MD,
  STOLEN_LOST_VS_POSSESSORY_MARKER,
  shouldAttachStolenLostCompare,
} from '../utils/stolenLostVsPossessoryRecovery';

const SUBJECTS = ['民法物権'];

export function appendStolenLostCompareToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttachStolenLostCompare(a, b) && !b.includes(STOLEN_LOST_VS_POSSESSORY_MARKER)) continue;
      if (b.includes(STOLEN_LOST_VS_POSSESSORY_MARKER)) {
        if (!b.includes(STOLEN_LOST_COMPARE_IMAGE_TAG)) {
          bCol[i] = `${STOLEN_LOST_COMPARE_IMAGE_TAG}\n\n${b}`;
        }
        continue;
      }
      bCol[i] = b ? `${b}\n\n${STOLEN_LOST_VS_POSSESSORY_COMPARE_MD}` : STOLEN_LOST_VS_POSSESSORY_COMPARE_MD;
    }
    next[subject] = bCol;
  }
  return next;
}
