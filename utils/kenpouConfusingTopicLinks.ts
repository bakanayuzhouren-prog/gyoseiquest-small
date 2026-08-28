/**
 * 憲法の紛らわしい論点を双方向につなぐ。
 * 見て聞いて覚えるカード同士のジャンプ、もっと深掘るチャンク、質問モード比較の種。
 * 原文転載なし。
 */

export type KenpouRelatedLearnCard = {
  label: string;
  subject: string;
  index: number;
  axis: string;
};

type ClusterMember = {
  label: string;
  test: RegExp;
};

type Cluster = {
  id: string;
  axis: string;
  marker: string;
  members: ClusterMember[];
  chunk: string;
};

const CLUSTERS: Cluster[] = [
  {
    id: 'gid-yusei',
    axis: '13条だけ vs 13＋14＋国賠',
    marker: '紛らわしい論点チャンク（GIDと旧優生）',
    members: [
      { label: 'GID特例法4号', test: /特例法は4号|性同一性障害特例法|GID4号|生殖不能要件|特例法3条1項/ },
      { label: '旧優生保護法', test: /旧優生保護法/ },
    ],
    chunk: `## 紛らわしい論点チャンク（GIDと旧優生）

この2つは「身体への侵襲を受けない自由（13条）」が重なる。今回のカードもこの組から外さない。

| | GID特例法4号 | 旧優生保護法 |
|---|---|---|
| 条 | 主に**13条** | **13条かつ14条1項** |
| 結論の種類 | 法令違憲（4号無効）。5号は差戻し | 法令違憲＋**国賠認容** |
| ひっかけ | 5号まで違憲。旧優生と同じ条で揃える | 13条だけ。GIDと同一視。除斥で当然消滅 |

本番の見分け：**手術要件の性別変更＝GID4号。強制不妊立法＝旧優生。**`,
  },
  {
    id: 'google-twitter',
    axis: '明らかに優越 vs 優越',
    marker: '紛らわしい論点チャンク（GoogleとTwitter）',
    members: [
      { label: 'Google検索結果削除', test: /Google削除|検索結果削除|明らかに優越|最決平29\.1\.31|グーグル/ },
      { label: 'Twitter投稿削除', test: /Twitter＝優越|ツイッター|最決令4\.6\.24|SNS投稿削除|優越で足りる/ },
    ],
    chunk: `## 紛らわしい論点チャンク（GoogleとTwitter）

どちらも私法上の人格権に基づく差止め。根拠を憲法13条と書かない。今回のカードもこの組から外さない。

| | Google（最決平29.1.31） | Twitter（最決令4.6.24） |
|---|---|---|
| 閾値 | 公表されない利益が**明らかに優越** | **優越**で足りる |
| 媒体 | 検索は情報流通のハブ | 個別投稿の閲覧 |

本番の見分け：**検索は「明らかに」。投稿にGoogle基準を持ち込むな。**`,
  },
  {
    id: 'yusei-keibi-kokubai',
    axis: '違憲でも国賠するか',
    marker: '紛らわしい論点チャンク（旧優生と旧警備業法）',
    members: [
      { label: '旧優生（国賠あり）', test: /旧優生保護法/ },
      { label: '旧警備業法欠格（国賠なし）', test: /旧警備業法|警備欠格|被保佐人 警備|誘導員/ },
    ],
    chunk: `## 紛らわしい論点チャンク（旧優生と旧警備業法）

どちらも近時の法令違憲。国賠は別棚。今回のカードもこの組から外さない。

| | 旧優生 | 旧警備業法欠格 |
|---|---|---|
| 条 | 13＋14 | 22条1項＋14条1項 |
| 国賠 | **認容** | **認めない** |

本番の見分け：**違憲＝賠償、と揃えない。**`,
  },
  {
    id: 'miyamoto-kenetsu',
    axis: '取消し vs 検閲 vs 事前差止め',
    marker: '紛らわしい論点チャンク（宮本と検閲）',
    members: [
      { label: '宮本から君へ', test: /宮本から君へ|助成不交付|助成金不交付/ },
      { label: '北方ジャーナル', test: /北方ジャーナル|事前差止め/ },
    ],
    chunk: `## 紛らわしい論点チャンク（宮本と検閲）

21条周辺でも結論の種類が違う。今回のカードもこの組から外さない。

| | 宮本から君へ | 北方ジャーナル | 税関検査 |
|---|---|---|---|
| 何をしたか | 助成**不交付** | 出版**前**の差止め | 輸入貨物の検査 |
| 結論 | 裁量逸脱で**取消し**。法令違憲ではない | 検閲ではない。事前抑制は原則禁止 | 検閲に**当たらない** |

本番の見分け：**宮本＝処分の取消し。検閲4要素の問題ではない。**`,
  },
  {
    id: 'kekka-shurui',
    axis: '法令違憲／適用違憲／取消し／国賠',
    marker: '紛らわしい論点チャンク（結論の種類）',
    members: [
      { label: '結論の種類カタログ', test: /カタログは事件名|法令違憲／適用違憲／違憲状態/ },
      { label: '宮本から君へ', test: /宮本から君へ/ },
    ],
    chunk: `## 紛らわしい論点チャンク（結論の種類）

事件名の次に結論の種類を固定する。今回のカードもこの組から外さない。

| 言葉 | 意味 | 例 |
|---|---|---|
| 法令違憲 | 規定そのもの | GID4号、旧優生、薬局距離、旧警備欠格 |
| 適用違憲 | 法令は残し、使い方が違憲 | 個別適用の事件 |
| 取消し | 処分が違法 | **宮本から君へ** |
| 違憲でも国賠なし | 違憲判断と賠償は別 | 旧警備業法 |

本番の見分け：**宮本を法令違憲と書かない。警備違憲を国賠認容と書かない。**`,
  },
  {
    id: '31-40-17',
    axis: '適正手続 vs 刑事補償 vs 国賠',
    marker: '紛らわしい論点チャンク（31条と40条と17条）',
    members: [
      { label: '31条・40条', test: /31条に罪刑法定|刑事補償|40条は補償/ },
      { label: '宮本から君へ', test: /宮本から君へ/ },
    ],
    chunk: `## 紛らわしい論点チャンク（31条と40条と17条）

救済の棚を混ぜない。今回のカードもこの組から外さない。

| | 31条 | 40条 | 17条 |
|---|---|---|---|
| 中身 | 適正手続（罪刑法定の**明文なし**） | **刑事補償** | **国家賠償** |
| ひっかけ | 行政手続は常に事前聴聞 | 40条＝国賠 | 宮本の取消しと揃える |

本番の見分け：**40条は補償。宮本は取消し。17条は国賠。**`,
  },
  {
    id: 'shiningen',
    axis: '私人間効力の三大判決',
    marker: '紛らわしい論点チャンク（私人間）',
    members: [
      { label: 'LEC私人間まとめ', test: /私人間は間接適用|三菱樹脂＝採用調査/ },
      { label: '三菱樹脂カード', test: /三菱樹脂：私人間に憲法を直接適用/ },
    ],
    chunk: `## 紛らわしい論点チャンク（私人間）

直接適用も類推適用もしない。結論は事件で分かれる。今回のカードもこの組から外さない。

| | 三菱樹脂 | 昭和女子大 | 日産 |
|---|---|---|---|
| 場面 | 採用・思想調査 | 私立大学学則 | 女子若年定年 |
| 試験の芯 | 当然違法としない | 国立と混ぜない | 90条で無効（間接の成果） |`,
  },
  {
    id: 'shokugyo',
    axis: '薬局×・小売○・警備×（国賠別）・楽天○',
    marker: '紛らわしい論点チャンク（職業選択）',
    members: [
      { label: 'LEC職業選択', test: /薬局距離×、小売市場距離○|職業選択。薬局距離/ },
      { label: '旧警備業法欠格', test: /旧警備業法違憲|被保佐人であることを警備員/ },
    ],
    chunk: `## 紛らわしい論点チャンク（職業選択）

距離規制と欠格と態様規制を揃えない。今回のカードもこの組から外さない。

| 事件 | 結論 |
|---|---|
| 薬局距離 | **違憲** |
| 小売市場距離 | **合憲** |
| 旧警備業法欠格 | **22＋14違憲。国賠は別（なし）** |
| 要指導薬対面（楽天） | **合憲**（態様） |`,
  },
];

const LEC_BONUS_CARD = /【LEC憲法おまけ】/;
const HUB_CARD = /カタログは事件名/;

function clusterMatchesHaystack(cluster: Cluster, haystack: string): boolean {
  return cluster.members.some((m) => m.test.test(haystack));
}

function findCardIndex(cards: string[], test: RegExp, preferLec: boolean): number {
  let fallback = -1;
  for (let i = 0; i < cards.length; i++) {
    const text = cards[i] || '';
    if (!test.test(text)) continue;
    if (preferLec && LEC_BONUS_CARD.test(text)) return i;
    if (fallback < 0) fallback = i;
  }
  return fallback;
}

export function findRelatedKenpouLearnCards(args: {
  haystack: string;
  cards: string[];
  currentIndex: number;
  subject?: string;
}): KenpouRelatedLearnCard[] {
  const { haystack, cards, currentIndex } = args;
  const subject = args.subject || '憲法';
  const out: KenpouRelatedLearnCard[] = [];
  const seen = new Set<number>();
  const push = (index: number, label: string, axis: string) => {
    if (index < 0 || index === currentIndex || seen.has(index)) return;
    seen.add(index);
    out.push({ label, subject, index, axis });
  };

  const preferLec = LEC_BONUS_CARD.test(haystack) || HUB_CARD.test(haystack);

  if (HUB_CARD.test(haystack) || /LECおまけ全体/.test(haystack)) {
    cards.forEach((text, index) => {
      if (!LEC_BONUS_CARD.test(text || '') || HUB_CARD.test(text || '')) return;
      const label = String(text || '')
        .replace(/^【LEC憲法おまけ】/, '')
        .slice(0, 28);
      push(index, label.trim() || `おまけ${index + 1}`, 'おまけカタログ');
    });
    return out;
  }

  for (const cluster of CLUSTERS) {
    if (!clusterMatchesHaystack(cluster, haystack)) continue;
    for (const member of cluster.members) {
      const index = findCardIndex(cards, member.test, preferLec);
      push(index, member.label, cluster.axis);
    }
  }

  if (out.length === 0 && LEC_BONUS_CARD.test(haystack) && !HUB_CARD.test(haystack)) {
    const hubIdx = cards.findIndex((t) => HUB_CARD.test(t || ''));
    push(hubIdx, '結論の種類カタログ', 'おまけ全体へ戻る');
  }
  return out;
}

export function appendKenpouConfusingTopicChunks(body: string, context: string): string {
  const hay = `${body || ''}\n${context || ''}`;
  if (HUB_CARD.test(hay)) return body;
  let next = body || '';
  for (const cluster of CLUSTERS) {
    if (!clusterMatchesHaystack(cluster, hay)) continue;
    if (next.includes(cluster.marker)) continue;
    next = `${next.trim()}\n\n${cluster.chunk}`;
  }
  return next;
}
