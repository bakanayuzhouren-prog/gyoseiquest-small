/** ゴミさん（直接請求）とみっかむっか（行服／行訴）を該当カードの深掘り先頭に差し込む。 */

const GOMI = '[[image:learn/jichi/gomi-san-chokusetsu]]';
const MIKKA = '[[image:learn/gyosho/mikka-mukka]]';

function shouldAttachGomi(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/jichi/gomi-san-chokusetsu')) return false;
  if (a.includes('総数の１/50の連署で監査委員に事務監査請求ができる')) return true;
  if (a.includes('有権者の１/50の連署で長に対し、条例の制定改廃を請求でき')) return true;
  if (a.includes('議会の解散請求は1/3以上の者の連署')) return true;
  if (a.includes('解散の住民投票において過半数の同意があった場合、議会は解散し、要件緩和の特例はない')) return true;
  if (a.includes('お金に関する内容以外の条例の制定、改廃権を有する')) return true;
  if (a.includes('住民監査請求は住民が1人でもできる')) return true;
  if (a.includes('条例請求＝有権者1/50以上の連署で首長へ')) return true;
  return false;
}

function shouldAttachMikka(a, b) {
  const t = `${a}\n${b}`;
  if (t.includes('learn/gyosho/mikka-mukka')) return false;
  if (a.includes('審査請求は、処分があった事を知った日の翌日から起算して3カ月経過したときはできない')) return true;
  if (a.includes('取消訴訟の出訴期間は、処分または裁決があったことを知った日から6か月経過するとできない')) return true;
  if (a.includes('申請拒否処分の取消訴訟の出訴期間は、処分があった事を知ったときから６か月')) return true;
  if (a.includes('処分についての審査請求期間については、初日は不算入')) return true;
  if (a.includes('義務付けの訴え、差止めの訴えに出訴期間はない')) return true;
  return false;
}

function prependTag(body, tag) {
  const next = String(body || '');
  if (next.includes(tag)) return next;
  return next ? `${tag}\n\n${next}` : tag;
}

export function appendGoroMnemonicToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of Object.keys(learnContent || {})) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      const a = aCol[i] || '';
      const b = bCol[i] || '';
      if (shouldAttachGomi(a, b)) bCol[i] = prependTag(bCol[i] || '', GOMI);
      if (shouldAttachMikka(a, b)) bCol[i] = prependTag(bCol[i] || '', MIKKA);
    }
    next[subject] = bCol;
  }
  return next;
}
