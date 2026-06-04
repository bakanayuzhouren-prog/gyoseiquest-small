/**
 * 憲法教科書 — learn 問番号 → 章ファイル対応
 * bundleKenpouTextbookFromLearn.mjs / 手修正の参照用
 */
export const KENPOU_TEXTBOOK_CHAPTERS = [
  {
    file: '00-gainen.md',
    title: '憲法の概念',
    learnIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    kenpouImages: ['1-230', '2-230', '4-230'],
  },
  {
    file: '01-hourei-yougo.md',
    title: '法令用語',
    learnIndices: [],
  },
  {
    file: '02-jinken.md',
    title: '基本原理と人権',
    learnIndices: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    kenpouImages: ['10-230'],
  },
  {
    file: '03-shisou-shukyo.md',
    title: '思想・信教',
    learnIndices: [19, 20],
  },
  {
    file: '04-hyogen.md',
    title: '表現の自由と検閲',
    learnIndices: [75, 76, 77, 81, 82, 83, 84, 90, 91, 92],
    kenpouImages: ['75-230', '81-230'],
  },
  {
    file: '05-tochi-a.md',
    title: '統治編（22条・参政権・国会・内閣）',
    learnIndices: [62, 129],
  },
  {
    file: '06-shiho-a.md',
    title: '司法と改正',
    learnIndices: [122, 180, 174, 196],
  },
  {
    file: '07-seizon.md',
    title: '生存権・教育・労働・財産',
    learnIndices: [112, 143, 144, 145, 146, 147],
  },
  {
    file: '08-shijinkan.md',
    title: '私人間効力・違憲審査基準',
    learnIndices: [],
  },
  {
    file: '09-14jo-tekiteshoki.md',
    title: '14条・受益的権利・国会',
    learnIndices: [52],
  },
  {
    file: '10-tochi-b.md',
    title: '衆院優越・内閣・司法',
    learnIndices: [154, 155, 160, 209, 210, 221],
    kenpouImages: ['154-230', '209-230'],
  },
  {
    file: '11-chiho.md',
    title: '地方自治',
    learnIndices: [],
  },
];

/** learnIndex (1始まり) → aNNN.md のパス */
export function learnMdPath(root, learnIndex) {
  const id = String(learnIndex).padStart(3, '0');
  return `${root}/data/knowledge/learn/憲法/a${id}.md`;
}
