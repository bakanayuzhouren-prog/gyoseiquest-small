const SUBJECTS = ['民法物権', '債権総論', '債権各論', '家族法', '商法・会社法'];

const MARKER = '<!-- chui-gimu-tables -->';

const IMAGE_TAG = '[[image:learn/minnpou/jiko-zaisan-chui]]';

const TABLES_MD = `${MARKER}

${IMAGE_TAG}

**自己の財産と同一の注意（軽い。条文に「動産」はない）**

| 場面 | 条文 | 文言 |
|---|---|---|
| 無報酬の受寄者 | 659条 | 自己の財産に対するのと同一の注意 |
| 受領遅滞後の特定物の保存 | 413条1項 | 自己の財産に対するのと同一の注意 |
| 親権者の財産管理 | 827条 | 自己のためにするのと同一の注意 |
| 承認又は放棄前の相続人 | 918条1項 | 固有財産におけるのと同一の注意 |
| 限定承認者 | 926条1項 | 固有財産におけるのと同一の注意 |
| 放棄者が現に占有する財産の保存 | 940条1項 | 自己の財産におけるのと同一の注意 |

**善管注意義務（重い。取引上通常期待される客観的注意）**

| 場面 | 条文 |
|---|---|
| 特定物の引渡しまでの保存 | 400条 |
| 留置権者 | 298条1項 |
| 質権者 | 350条が298条を準用 |
| 受任者 | 644条 |
| 後見人 | 869条が644条を準用 |
| 遺言執行者 | 1012条2項が644条を準用 |
| 有償の受寄者 | 400条 |
| 商人の営業の範囲内の寄託（無報酬でも） | 商法593条 |
| 株式会社の役員 | 会社法330条が644条を準用 |
| 使用貸借の借主・賃貸借の賃借人 | 400条（特定物の返還） |

**聞き分け** 無償寄託は659条。商人の営業内寄託は商法593条で善管。親権者は827条、後見人は善管。受領遅滞前の特定物は400条、提供後は413条1項。
`;

function isChuiGimuCard(text) {
  return /自己の財産に対するのと同一|自己の財産と同一の注意|自己のためにするのと同一|固有財産におけるのと同一|善管注意義務は自己の財産|無報酬の受寄|無報酬で寄託|善良な管理者の注意をもって留置/.test(
    String(text || ''),
  );
}

export function appendChuiGimuToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isChuiGimuCard(aCol[i])) continue;
      const body = String(bCol[i] || '');
      if (body.includes(MARKER)) continue;
      bCol[i] = body ? `${TABLES_MD}\n\n${body}` : TABLES_MD;
    }
    next[subject] = bCol;
  }
  return next;
}
