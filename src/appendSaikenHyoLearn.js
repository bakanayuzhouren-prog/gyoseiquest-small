const SUBJECTS = ['債権総論', '債権各論', '民法記述'];

const KISAN_MARKER = '<!-- saiken-kisan-hyo -->';
const JUKA_MARKER = '<!-- saiken-juka-hyo -->';

const KISAN_MD = `${KISAN_MARKER}

**時効の起算点と履行遅滞**

時効の客観起算は原則「権利を行使することができる時」（166条1項2号）。遅滞は412条。同じではない。

| 債権の分類 | 時効の起算 | 履行遅滞 |
|---|---|---|
| 確定期限 | 期限到来時 | 期限到来時（412条1項） |
| 不確定期限 | 期限到来時 | 到来後の請求時又は到来を知った時の早い時（412条2項） |
| 期限の定めなし | 債権成立時 | 履行の請求を受けた時（412条3項） |
| 停止条件付 | 条件成就時 | 成就後に履行請求を受けた時 |
| 債務不履行の損害賠償 | 本来の債権について履行請求できる時（判例） | 履行の請求を受けた時 |
| 解除による原状回復 | 契約解除時（判例） | 履行の請求を受けた時 |
| 不法行為の損害賠償 | 損害及び加害者を知った時（3年）。客観は不法行為時から20年 | 不法行為時（判例） |
| 返還時期の定めのない消費貸借 | 債権成立後、相当期間経過後 | 催告後、相当期間経過後（591条） |
`;

const JUKA_MD = `${JUKA_MARKER}

**重過失要件**

| 場面 | 条文 | 重過失があると |
|---|---|---|
| 譲渡制限特約付き債権の譲渡 | 466条3項 | 債務者は履行を拒め、譲渡人への弁済等を対抗できる（譲渡は2項で有効） |
| 預貯金債権の譲渡制限 | 466条の5 | 特約を譲受人その他の第三者に対抗できる（2項の例外。差押えには対抗不可） |
| 相殺制限特約付き債権の譲渡 | 505条2項 | 特約を第三者に対抗できる |
| 売買の担保責任の期間制限 | 566条 | 売主が引渡し時に不適合を知り又は重過失で知らなかったときは、1年通知の失権なし |
`;

function isKisanCard(text) {
  return /履行遅滞の起算|不確定期限付き契約の履行遅滞|期限を定めなかったときは、債務者は、履行の請求|消滅時効|権利を行使することができる時/.test(
    String(text || ''),
  );
}

function isJukaCard(text) {
  return /譲渡制限特約|譲渡禁止特約|預貯金債権|相殺制限特約|相殺を禁止|担保責任の期間|不適合を知った時から|重大な過失によって知らなかった|善意かつ無重過失/.test(
    String(text || ''),
  );
}

function prependOnce(body, marker, block) {
  const next = String(body || '');
  if (next.includes(marker)) return next;
  return next ? `${block}\n\n${next}` : block;
}

export function appendSaikenHyoToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i];
      let body = bCol[i] || '';
      if (isKisanCard(a)) body = prependOnce(body, KISAN_MARKER, KISAN_MD);
      if (isJukaCard(a)) body = prependOnce(body, JUKA_MARKER, JUKA_MD);
      bCol[i] = body;
    }
    next[subject] = bCol;
  }
  return next;
}
