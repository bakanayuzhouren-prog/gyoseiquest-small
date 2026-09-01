/** 商法12点教科書・登場人物図を、該当カードの深掘り先頭に差し込む。 */

const SUBJECT = '商法・会社法';

const RULES = [
  {
    tag: '[[image:textbook/shouhou/cast-agency]]',
    test: (a) => /非顕名/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/cast-506]]',
    test: (a) => /本人の死亡で消滅/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/cast-kengen]]',
    test: (a) => /支配人以外の重要な使用人/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-1]]',
    test: (a) => /現物出資/.test(a) && /発起人|引受人/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-2]]',
    test: (a) => /発行可能株式総数/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-3]]',
    test: (a) => /当然失権/.test(a) || (/募集設立/.test(a) && /履行/.test(a)),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-hokki-boshu]]',
    test: (a) => /発起設立/.test(a) && /募集設立/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-yonshiichi]]',
    test: (a) => /四分の一|四倍/.test(a) && /発行可能|設立時発行/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/setsu-kahansu]]',
    test: (a) => /設立時役員|創立総会/.test(a) && /過半数|三分の二/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/touki-1]]',
    test: (a) => /正当な事由/.test(a) && /登記|対抗/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/kabu-1]]',
    test: (a) => /自己株式/.test(a) && /配当|議決権|消却/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/kikan-2]]',
    test: (a) => /会計監査人/.test(a) && /大会社|会計参与|必置/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/hai-1]]',
    test: (a) => /現物配当|金銭分配請求権/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/sai-1]]',
    test: (a) => /株式交換/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/apply-1]]',
    test: (a) => /商慣習/.test(a) && /民法/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/mer-2]]',
    test: (a) => /自己の名をもって/.test(a) || (/自己の計算/.test(a) && /商人/.test(a)),
  },
  {
    tag: '[[image:textbook/shouhou/cast-dairisho]]',
    test: (a) => /代理商/.test(a) && !/仲立|問屋/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/cast-nakadachi-tonya]]',
    test: (a) => /仲立人|問屋/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/kabu-2]]',
    test: (a) => /公開会社/.test(a) && /譲渡制限|非公開/.test(a),
  },
  {
    tag: '[[image:textbook/shouhou/kikan-1]]',
    test: (a) => /監査役/.test(a) && /特別決議|解任/.test(a),
  },
];

export function appendShouhouCastToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  const aCol = learnContent[SUBJECT] || [];
  const bCol = [...(next[SUBJECT] || [])];
  const len = Math.max(aCol.length, bCol.length);
  for (let i = 0; i < len; i++) {
    const a = String(aCol[i] || '');
    let b = bCol[i] || '';
    for (const { tag, test } of RULES) {
      if (!test(a) || b.includes(tag)) continue;
      b = b ? `${tag}\n\n${b}` : tag;
    }
    bCol[i] = b;
  }
  next[SUBJECT] = bCol;
  return next;
}
