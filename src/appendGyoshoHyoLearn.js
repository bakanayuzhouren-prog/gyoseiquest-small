const SUBJECT = '行政事件訴訟法';

const HANKETSU_A = '処分取消判決には第三者効がある';
const HANKETSU_B = [
  '**結論**',
  '',
  '認容判決には、形成力、第三者効、拘束力、[[red:既判力]]がある。棄却判決にあるのは、[[red:既判力]]だけである。',
  '',
  '**ひっかけ**',
  '',
  '取消判決の第三者効は、既判力が一般の第三者に及ぶことだ。⇒[[red:×]]',
  '棄却判決に拘束力がある。⇒[[red:×]]',
  '',
  '**暗記**',
  '',
  '第三者に及ぶのは[[red:32条]]。行政庁を縛るのは[[red:33条]]。主文を縛るのは[[red:既判力]]。',
].join('\n');

const RULES = [
  {
    tag: '[[image:learn/gyosho/shobunsei-ari]]',
    test: (a) => /二項道路|みなし道路|保育所廃止条例は処分|労災就学援護費/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/shobunsei-nashi]]',
    test: (a) =>
      /用途地域の指定は行政行為に該当しない|用途地域の指定は行政処分にあたらない|工業地域を指定/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/shobunsei-kikiwake]]',
    test: (a) => /病院開設中止の勧告|保育所廃止条例は処分|特定の保育所の廃止/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/genkoku-ari-v2]]',
    test: (a) => /空港周辺住民には原告適格|健康に直接的に被害を受けるものに原告適格/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/genkoku-nashi]]',
    test: (a) => /鉄道料金の改定に原告適格はない|消費者に当該商品表示/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/genkoku-kikiwake]]',
    test: (a) => /原告適格は法律上保護された利益で切る/.test(a),
  },
  {
    tag: '[[image:learn/gyosho/hanketsu-4kouka]]',
    test: (a) => a === HANKETSU_A,
  },
];

export function appendGyoshoHyoToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  const aCol = learnContent[SUBJECT] || [];
  const bCol = [...(next[SUBJECT] || [])];
  const len = Math.max(aCol.length, bCol.length);
  for (let i = 0; i < len; i++) {
    const a = String(aCol[i] || '');
    let b = bCol[i] || '';
    if (a === HANKETSU_A && !b.includes('棄却判決にあるのは')) {
      b = HANKETSU_B;
    }
    for (const { tag, test } of RULES) {
      if (!test(a) || b.includes(tag)) continue;
      b = b ? `${tag}\n\n${b}` : tag;
    }
    bCol[i] = b;
  }
  next[SUBJECT] = bCol;
  return next;
}
