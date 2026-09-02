const SUBJECTS = ['行政法総合', '行政法総論'];

const TAGS = ['[[image:learn/gyosei/koubun-lifecycle]]', '[[image:learn/gyosei/koubun-hikake]]'];

function isKoubunCard(text) {
  return /公文書管理法|行政文書管理規則|行政文書ファイル管理簿|当該行政文書について分類|特定歴史公文書等の利用請求|保存期間満了後、移管又は廃棄/.test(
    String(text || ''),
  );
}

function prependTags(body) {
  let next = String(body || '');
  for (const tag of TAGS) {
    if (next.includes(tag)) continue;
    next = next ? `${tag}\n\n${next}` : tag;
  }
  return next;
}

export function appendKoubunToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isKoubunCard(aCol[i])) continue;
      bCol[i] = prependTags(bCol[i] || '');
    }
    next[subject] = bCol;
  }
  return next;
}
