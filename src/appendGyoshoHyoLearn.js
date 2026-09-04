const SUBJECT = '行政事件訴訟法';

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
    tag: '[[image:learn/gyosho/genkoku-ari]]',
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
];

export function appendGyoshoHyoToLearnDeepdive(learnDeepdive, learnContent) {
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
