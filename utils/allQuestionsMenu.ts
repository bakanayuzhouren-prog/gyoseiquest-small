export type AllQuestionsField = {
  field: string;
  label: string;
};

export type AllQuestionsSubject = {
  id: string;
  title: string;
  fields: AllQuestionsField[];
};

/** 本試験の科目順。分野は問題を解くモードの既存キー。表示名だけ短くする。 */
export const ALL_QUESTIONS_SUBJECTS: AllQuestionsSubject[] = [
  {
    id: '基礎法学',
    title: '基礎法学',
    fields: [
      { field: '基礎法学', label: '基礎法学' },
      { field: '法の分類', label: '法の分類' },
    ],
  },
  {
    id: '憲法',
    title: '憲法',
    fields: [
      { field: '憲法', label: '憲法' },
      { field: '報道の自由・取材の自由', label: '報道の自由・取材の自由' },
    ],
  },
  {
    id: '行政法',
    title: '行政法',
    fields: [
      { field: '行政法総論', label: '総論' },
      { field: '行政手続法', label: '行政手続法' },
      { field: '行政不服審査法', label: '行政不服審査法' },
      { field: '行政事件訴訟法', label: '行政事件訴訟法' },
      { field: '国家賠償法・損失訴訟', label: '国家賠償' },
      { field: '地方自治法', label: '地方自治' },
      { field: '行政法総合', label: '総合' },
      { field: '行政行為の効力', label: '行政行為の効力' },
    ],
  },
  {
    id: '民法',
    title: '民法',
    fields: [
      { field: '民法総則', label: '総則' },
      { field: '民法物権', label: '物権' },
      { field: '債権総論', label: '債権総論' },
      { field: '債権各論', label: '債権各論' },
      { field: '家族法', label: '家族法' },
      { field: '民法総合', label: '民法総合' },
      { field: '遺科分', label: '遺科分' },
      { field: '民法記述', label: '民法記述' },
    ],
  },
  {
    id: '商法・会社法',
    title: '商法・会社法',
    fields: [{ field: '商法・会社法', label: '商法・会社法' }],
  },
  {
    id: '多肢選択',
    title: '多肢選択',
    fields: [
      { field: '憲法', label: '憲法' },
      { field: '行政法', label: '行政法' },
      { field: '民法', label: '民法' },
      { field: '多肢選択憲法', label: '多肢選択憲法' },
      { field: '多肢選択行政法', label: '多肢選択行政法' },
    ],
  },
  {
    id: '記述',
    title: '記述',
    fields: [
      { field: '民法', label: '民法' },
      { field: '行政法', label: '行政法' },
      { field: '民法記述', label: '民法記述' },
      { field: '行政法記述', label: '行政法記述' },
    ],
  },
  {
    id: '基礎知識',
    title: '基礎知識',
    fields: [
      { field: '基礎知識', label: '基礎知識' },
      { field: '行政書士法', label: '行政書士法' },
      { field: '戸籍法', label: '戸籍法' },
      { field: '住民基本台帳法', label: '住民基本台帳法' },
      { field: '個人情報保護法', label: '個人情報保護法' },
      { field: '政治', label: '政治' },
      { field: '経済', label: '経済' },
      { field: '社会', label: '社会' },
      { field: '情報通信', label: '情報通信' },
      { field: '文章理解', label: '文章理解' },
    ],
  },
];

export function findAllQuestionsSubject(id: string | undefined): AllQuestionsSubject | undefined {
  if (!id) return undefined;
  return ALL_QUESTIONS_SUBJECTS.find((subject) => subject.id === id);
}
