/** 株主総会決議の比較図を、該当カードの深掘り先頭に差し込む。 */

const RULES = [
  {
    tag: '[[image:learn/shouhou/ketsugi-1-yoken]]',
    test: (t) =>
      /自己株式について議決権を有さず/.test(t) ||
      /監査役の選任は、議決権を行使することができる株主の議決権の過半数/.test(t) ||
      (/監査役の解任は、議決権を行使することができる株主/.test(t) && /3分の2|三分の二/.test(t)),
  },
  {
    tag: '[[image:learn/shouhou/ketsugi-2-tokushu]]',
    test: (t) =>
      (/総株主の同意がなければ/.test(t) && /免除/.test(t)) ||
      /行使可能議決権の過半数かつ出席議決権の3分の2/.test(t) ||
      (/創立総会/.test(t) && /過半数/.test(t) && /3分の2|三分の二/.test(t) && !/発起設立では発起人の過半数/.test(t)) ||
      (/特殊決議/.test(t) && /半数以上/.test(t)),
  },
  {
    tag: '[[image:learn/shouhou/ketsugi-3-kikan-haito]]',
    test: (t) =>
      /監査役の選任は、議決権を行使することができる株主の議決権の過半数/.test(t) ||
      (/監査役の解任は、議決権を行使することができる株主/.test(t) && /3分の2|三分の二/.test(t)) ||
      /金銭分配請求権を与えない/.test(t) ||
      /資本金の減少は原則/.test(t) ||
      /剰余金を減少して資本金を増加/.test(t) ||
      /額が確定しない報酬/.test(t) ||
      /監査等委員である取締役の解任/.test(t),
  },
  {
    tag: '[[image:learn/shouhou/ketsugi-futsu-tokubetsu-ichiran]]',
    test: (t) =>
      /監査役の選任は、議決権を行使することができる株主の議決権の過半数/.test(t) ||
      (/監査役の解任は、議決権を行使することができる株主/.test(t) && /3分の2|三分の二/.test(t)) ||
      /金銭分配請求権を与えない/.test(t) ||
      /資本金の減少は原則/.test(t) ||
      /剰余金を減少して資本金を増加/.test(t) ||
      /監査等委員である取締役の解任/.test(t) ||
      (/普通決議/.test(t) && /特別決議/.test(t) && /解散|会社継続|自己株式|現物配当|資本金/.test(t)),
  },
  {
    tag: '[[image:learn/shouhou/ketsugi-ka-goro]]',
    test: (t) =>
      /監査等委員である取締役の解任/.test(t) ||
      /金銭分配請求権を与えない/.test(t) ||
      /資本金の減少は原則/.test(t) ||
      (/監査役の解任は、議決権を行使することができる株主/.test(t) && /3分の2|三分の二/.test(t)) ||
      (/普通決議/.test(t) && /特別決議/.test(t) && /解散|会社継続|自己株式|現物配当|資本金/.test(t)),
  },
];

function prependTag(body, tag) {
  const next = String(body || '');
  if (next.includes(tag)) return next;
  return next ? `${tag}\n\n${next}` : tag;
}

export function appendKetsugiHikakuToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const text = `${aCol[i] || ''}\n${bCol[i] || ''}`;
      for (const rule of RULES) {
        if (!rule.test(text)) continue;
        bCol[i] = prependTag(bCol[i] || '', rule.tag);
      }
    }
    next[subject] = bCol;
  }
  return next;
}
