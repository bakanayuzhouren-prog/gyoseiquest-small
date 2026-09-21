/** 会社法212条1項1号の4コマを、該当カードの深掘り先頭に差し込む。 */

const TAG = '[[image:learn/shouhou/212-fukosei-yonkoma]]';

export const FUKOSEI_212_LEARN_BY_SUBJECT = {
  '商法・会社法': [
    {
      text: '取締役と通じて著しく不公正な払込金額で募集株式を引き受けた者は、払込金額と公正な価額との差額を株式会社に支払う義務を負う。',
      deepdive: `${TAG}

■ 結論

212条1項1号は差額の支払義務だけを定める。株主の権利行使を止める定めはない。

■ なぜそうなる

定められた払込金額を払い込めば出資の履行（208条）があり、株主となる時期は209条1項による。未払込みで株主となる権利を失うのは208条5項で、別論点である。仮装払込み（213条の2）は支払後でなければ権利を行使できない。混ぜない。

■ ひっかけ

[[red:差額を支払った後でなければ株主の権利を行使できない。]]
[[red:安い払込みは出資の履行にならない。]]
[[red:株券の交付が株主となる要件である。]]

■ 暗記

取締役と通じて著しく不公正な払込金額で引き受けた者は差額を支払う。株主の権利は行使できる。`,
      fExplain: '212条1項1号は差額の支払義務。権利行使の停止はない。',
      statuteRef: '会社法212条1項1号、208条、209条1項',
      source: '会社法212条',
    },
    {
      text: '取締役と通じて著しく不公正な払込金額で引き受けた者も、差額の支払前から株主の権利を行使できる。',
      deepdive: `${TAG}

■ 結論

支払義務はある。支払の完了は権利行使の条件ではない。

■ ひっかけ

[[red:仮装払込みと同じく、支払後でなければ権利を行使できない。]]

■ 暗記

不公正払込みは払う。権利は止まらない。`,
      fExplain: '212条に権利行使停止はない。仮装払込みと混ぜない。',
      statuteRef: '会社法212条1項1号、213条の2',
      source: '会社法212条',
    },
  ],
};

function shouldAttach(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/shouhou/212-fukosei-yonkoma')) return false;
  if (/仮装|設立時|特に有利|有利発行|新株予約権/.test(t)) return false;
  if (a.includes('不公正な払込金額')) return true;
  if (a.includes('取締役と通じ') && a.includes('払込')) return true;
  if (a.includes('公正な価額との差額') && a.includes('募集株式')) return true;
  return false;
}

function prependTag(body) {
  const next = String(body || '');
  if (next.includes(TAG)) return next;
  return next ? `${TAG}\n\n${next}` : TAG;
}

export function appendFukosei212ToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (!shouldAttach(a, b)) continue;
      bCol[i] = prependTag(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
