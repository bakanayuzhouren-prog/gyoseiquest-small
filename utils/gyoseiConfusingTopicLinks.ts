/**
 * 行政法の紛らわしい論点を双方向につなぐ（行手↔行審、行審↔行訴）。
 * 見て聞いて覚えるカード同士のジャンプ、もっと深掘るチャンク。原文転載なし。
 */

export type GyoseiRelatedLearnCard = {
  label: string;
  subject: string;
  index: number;
  axis: string;
};

export const GYOSEI_LINK_SUBJECTS = ['行政手続法', '行政不服審査法', '行政事件訴訟法'] as const;

export type GyoseiLinkSubject = (typeof GYOSEI_LINK_SUBJECTS)[number];

const SHORT: Record<string, string> = {
  行政手続法: '行手',
  行政不服審査法: '行審',
  行政事件訴訟法: '行訴',
};

type ClusterMember = {
  label: string;
  subject: GyoseiLinkSubject;
  test: RegExp;
};

type Cluster = {
  id: string;
  axis: string;
  marker: string;
  trigger: RegExp;
  members: ClusterMember[];
  chunk: string;
};

const CLUSTERS: Cluster[] = [
  {
    id: 'shinin-shusaisha',
    axis: '処分前の司会 vs 処分後の司会',
    marker: '紛らわしい論点チャンク（審理員と主宰者）',
    trigger: /審理員|主宰者/,
    members: [
      { label: '主宰者', subject: '行政手続法', test: /聴聞の主宰者|主宰者になれない|直接関与した者は主催者になれる/ },
      { label: '審理員', subject: '行政不服審査法', test: /再調査の請求に審理員|再調査の請求に審理員の規定|審理員は審査庁に所属/ },
    ],
    chunk: `## 紛らわしい論点チャンク（審理員と主宰者）

どっちも手続の司会だが、棚が違う。今回のカードもこの組から外さない。

| | 主宰者（行手法・聴聞） | 審理員（行服法） |
|---|---|---|
| いつ | **処分の前** | **処分の後**（審査請求） |
| 誰が指名 | 処分をする**行政庁** | **審査庁** |
| 関与した職員 | 不利益処分に直接関与した者でも**なれる** | 処分手続に関与した者は**なれない** |
| 再調査 | — | **審理員なし** |

本番の見分け：**聴聞の司会＝主宰者。審査の司会＝審理員。関与OKなのは主宰者だけ。**`,
  },
  {
    id: 'koto-benmei',
    axis: '口頭は原則か裁量か申立てか',
    marker: '紛らわしい論点チャンク（口頭・聴聞・弁明・意見陳述）',
    trigger: /口頭意見陳述|弁明の機会|聴聞、弁明|聴聞または弁明|口頭で審査請求/,
    members: [
      { label: '聴聞・弁明', subject: '行政手続法', test: /聴聞、弁明の機会|聴聞または弁明の機会/ },
      { label: '口頭意見陳述', subject: '行政不服審査法', test: /口頭意見陳述の機会を与えなければならない|口頭意見陳述の申し立て/ },
    ],
    chunk: `## 紛らわしい論点チャンク（口頭・聴聞・弁明・意見陳述）

「口頭でいい？」を法律ごとに切る。今回のカードもこの組から外さない。

| | 入口 | 原則 |
|---|---|---|
| 聴聞（行手） | 制度が口頭 | 口頭。証拠書類の提出も可 |
| 弁明（行手） | **行政庁が認めたとき** | 書面が原則 |
| 口頭意見陳述（行服31） | **請求人／参加人の申立て** | 申立てれば審理員は与える |
| 口頭審査請求（行服19） | **法令に口頭の定め** | なければ書面 |

本番の見分け：**聴聞＝口頭。弁明の口頭＝裁量。意見陳述＝申立て。**`,
  },
  {
    id: 'kijun-kikan',
    axis: '審査基準は義務・処分基準は努力',
    marker: '紛らわしい論点チャンク（基準と標準期間）',
    trigger: /審査基準|処分基準|標準処理期間|標準審理期間/,
    members: [
      { label: '審査基準／処分基準', subject: '行政手続法', test: /審査基準を作成、公にすることは義務|処分基準を定めること、公にすることは努力義務|審査基準を定めることは義務、処分基準/ },
      { label: '標準処理期間', subject: '行政手続法', test: /標準処理期間を定めるよう努め、定めたときは公にしなければならない/ },
      { label: '標準審理期間', subject: '行政不服審査法', test: /標準審理期間を定めることは努力義務/ },
    ],
    chunk: `## 紛らわしい論点チャンク（基準と標準期間）

努力と義務を取り違えない。今回のカードもこの組から外さない。

| | 行手法 | 行服法 |
|---|---|---|
| 判断の物差し | **審査基準＝義務**／**処分基準＝努力** | （審査請求の中身の物差しではない） |
| 期間の目安 | **標準処理期間**を定める＝努力（定めたら公表は義務） | **標準審理期間**を定める＝努力（定めたら公表は義務） |

本番の見分け：**処分基準を義務と書くな。標準処理期間と標準審理期間は別法律。**`,
  },
  {
    id: 'hosei',
    axis: '申請の補正 vs 請求書の補正',
    marker: '紛らわしい論点チャンク（補正・行手7条と行服23条）',
    trigger: /補正を求めるか|補正しなければならない|形式上の不備|補正命令|補正出来ない/,
    members: [
      { label: '申請の補正', subject: '行政手続法', test: /速やかに補正を求めるか、拒否/ },
      { label: '審査請求の補正', subject: '行政不服審査法', test: /補正しなければならないが補正出来ない|形式上の不備がある場合でも審理員/ },
    ],
    chunk: `## 紛らわしい論点チャンク（補正・行手7条と行服23条）

不備の直し方は入口が違う。今回のカードもこの組から外さない。

| | 行手法7条 | 行服23〜24条 |
|---|---|---|
| 何の不備 | **申請**の形式 | **審査請求書**の記載 |
| 役所の動き | **速やかに**補正求め**又は**拒否 | **補正命令**（相当期間） |
| 直せないとき | 拒否等 | 補正不能が明らかなら命令不要→却下可 |

本番の見分け：**申請＝速やかに。審査請求＝補正命令。**`,
  },
  {
    id: 'shido-chushi',
    axis: '指導の止め方は行手／審査請求は行審',
    marker: '紛らわしい論点チャンク（行政指導と審査請求）',
    trigger: /行政指導の中止|行政指導中止|中止等の求め/,
    members: [
      { label: '指導の中止等の求め', subject: '行政手続法', test: /行政指導の中止、その他必要な措置|行政指導の中止等を求める/ },
      { label: '審査請求の対象', subject: '行政不服審査法', test: /行政指導中止等の求めは行政手続法に規定/ },
    ],
    chunk: `## 紛らわしい論点チャンク（行政指導と審査請求）

指導に審査請求は乗らない。今回のカードもこの組から外さない。

| | 行手法 | 行服法 |
|---|---|---|
| 行政指導 | **中止等の求め**（拘束力なしの申出） | **審査請求の対象外**（処分ではない） |
| 処分 | 聴聞・弁明など事前手続 | **審査請求**（事後の不服） |

本番の見分け：**止めたい指導＝行手の求め。処分への文句＝行審。**`,
  },
  {
    id: 'shikkoteishi',
    axis: '止めるのは審査庁か裁判所か',
    marker: '紛らわしい論点チャンク（執行停止・行審と行訴）',
    trigger: /執行停止|執行不停止/,
    members: [
      { label: '行審の執行停止', subject: '行政不服審査法', test: /審査庁は重大な損害を避けるために緊急の必要があると認めるときは、審査請求人の申立てにより執行停止/ },
      { label: '行訴の執行停止', subject: '行政事件訴訟法', test: /行訴法の執行停止は申し立てによってのみできる/ },
    ],
    chunk: `## 紛らわしい論点チャンク（執行停止・行審と行訴）

どちらも原則は**執行不停止**。止まってほしければ別途もらう。今回のカードもこの組から外さない。

| | 行服法 | 行訴法 |
|---|---|---|
| 誰が止める | **審査庁**（場合により処分庁） | **裁判所** |
| 職権 | **あり得る** | **不可**（申立のみ） |
| 停止の取消し | 事情変更等で**職権**可 | **相手方申立て**（職権不可） |

本番の見分け：**行審＝職権あり得る。行訴＝申立のみ＋総理異議が強制。**`,
  },
  {
    id: 'shikkoteishi-cancel',
    axis: '停止の取消しは職権か申立か',
    marker: '紛らわしい論点チャンク（執行停止の取消し）',
    trigger: /執行停止を取り消|執行停止の取消/,
    members: [
      { label: '行審26条', subject: '行政不服審査法', test: /執行停止が公共の福祉に重大な影響を及ぼすことが明らかとなったとき、その他事情が変更したとき、審査庁は、その執行停止を取り消す/ },
      { label: '行訴の執行停止', subject: '行政事件訴訟法', test: /行訴法の執行停止は申し立てによってのみできる/ },
    ],
    chunk: `## 紛らわしい論点チャンク（執行停止の取消し）

止めたあとの巻き戻しも法律が違う。今回のカードもこの組から外さない。

| | 行服26条 | 行訴26・27条 |
|---|---|---|
| 取消し | 審査庁の**職権**可 | **相手方の申立て**（職権で戻せない） |

本番の見分け：**行審は職権で止めも戻しも動ける。行訴は申立側。**`,
  },
  {
    id: 'jijo',
    axis: '事情裁決 vs 事情判決',
    marker: '紛らわしい論点チャンク（事情裁決と事情判決）',
    trigger: /事情裁決|事情判決/,
    members: [
      { label: '事情裁決', subject: '行政不服審査法', test: /事情裁決の制度あるが、再調査/ },
      { label: '事情判決', subject: '行政事件訴訟法', test: /事情判決は、棄却判決の主文|事情判決は取消訴訟に適用/ },
    ],
    chunk: `## 紛らわしい論点チャンク（事情裁決と事情判決）

名前が似て舞台が違う。今回のカードもこの組から外さない。

| | 事情裁決（行服45条3項） | 事情判決（行訴31条） |
|---|---|---|
| 舞台 | 審査庁の**裁決** | 裁判所の**判決** |
| 主文 | **違法又は不当を宣言**＋**棄却** | **違法を宣言**＋**棄却** |
| ないもの | 不作為・再調査 | 義務付け・差止めには乗らない |

本番の見分け：**役所内＝事情裁決。裁判＝事情判決。どちらも却下ではなく棄却。**`,
  },
  {
    id: 'kikan',
    axis: '知って3か月 vs 知って6か月',
    marker: '紛らわしい論点チャンク（審査請求期間と出訴期間）',
    trigger: /出訴期間|審査請求は、処分があった事を知った|知った日から６か月|3カ月経過/,
    members: [
      { label: '審査請求期間', subject: '行政不服審査法', test: /処分があった事を知った日の翌日から起算して3カ月/ },
      { label: '出訴期間', subject: '行政事件訴訟法', test: /処分または裁決があった事を知った日から６か月|申請拒否処分の取消訴訟の出訴期間は、処分があった事を知ったときから６か月/ },
    ],
    chunk: `## 紛らわしい論点チャンク（審査請求期間と出訴期間）

取消系の時計が違う。今回のカードもこの組から外さない。

| | 行服（審査請求） | 行訴（取消訴訟） |
|---|---|---|
| 知ってから | **3か月** | **6か月** |
| あってから | **1年** | **1年** |
| 不作為 | 期間**なし**（早すぎは却下） | 14条の出訴期間は原則乗らない |

本番の見分け：**役所に文句＝3か月。裁判所に取消＝6か月。数字を入れ替えるな。**`,
  },
  {
    id: 'jiyu-sentaku',
    axis: '原則は自由選択（前置は例外）',
    marker: '紛らわしい論点チャンク（審査請求と取消訴訟の順番）',
    trigger: /事前に審査請求をする必要はない|裁決前置|審査請求前置/,
    members: [
      { label: '審査請求は必須ではない', subject: '行政不服審査法', test: /取消訴訟をする際、事前に審査請求をする必要はない/ },
      { label: '裁決前置の例外', subject: '行政事件訴訟法', test: /裁決前置主義が要件とされていても、裁決を経ずに無効確認/ },
    ],
    chunk: `## 紛らわしい論点チャンク（審査請求と取消訴訟の順番）

原則は**自由選択**。個別法が前置を書いたときだけ先に審査請求。今回のカードもこの組から外さない。

本番の見分け：**いきなり取消訴訟OKが原則。前置は例外。無効確認は前置でも裁決待ち不要、が多い。**`,
  },
];

const SHORT_CARD_MAX = 220;

export function isGyoseiLinkSubject(subject: string | undefined | null): subject is GyoseiLinkSubject {
  return subject === '行政手続法' || subject === '行政不服審査法' || subject === '行政事件訴訟法';
}

function clusterMatchesHaystack(cluster: Cluster, haystack: string): boolean {
  return cluster.trigger.test(haystack);
}

function findCardIndex(cards: string[], test: RegExp): number {
  let fallback = -1;
  for (let i = 0; i < cards.length; i++) {
    const text = cards[i] || '';
    if (!test.test(text)) continue;
    if (text.length <= SHORT_CARD_MAX) return i;
    if (fallback < 0) fallback = i;
  }
  return fallback;
}

export function findRelatedGyoseiLearnCards(args: {
  haystack: string;
  cardsBySubject: Record<string, string[] | undefined>;
  currentSubject?: string;
  currentIndex: number;
}): GyoseiRelatedLearnCard[] {
  const { haystack, cardsBySubject, currentSubject, currentIndex } = args;
  const out: GyoseiRelatedLearnCard[] = [];
  const seen = new Set<string>();
  const push = (subject: string, index: number, label: string, axis: string) => {
    if (index < 0) return;
    if (subject === currentSubject && index === currentIndex) return;
    const key = `${subject}:${index}`;
    if (seen.has(key)) return;
    seen.add(key);
    const prefix = SHORT[subject] ? `${SHORT[subject]} ` : '';
    out.push({ label: `${prefix}${label}`.trim(), subject, index, axis });
  };

  for (const cluster of CLUSTERS) {
    if (!clusterMatchesHaystack(cluster, haystack)) continue;
    for (const member of cluster.members) {
      const cards = cardsBySubject[member.subject] || [];
      const index = findCardIndex(cards, member.test);
      push(member.subject, index, member.label, cluster.axis);
    }
  }
  return out;
}

export function appendGyoseiConfusingTopicChunks(body: string, context: string): string {
  const hay = `${body || ''}\n${context || ''}`;
  let next = body || '';
  for (const cluster of CLUSTERS) {
    if (!clusterMatchesHaystack(cluster, hay)) continue;
    if (next.includes(cluster.marker)) continue;
    next = `${next.trim()}\n\n${cluster.chunk}`;
  }
  return next;
}

export function gyoseiLearnCardsBySubject(
  learnContent: Record<string, string[] | undefined> | undefined,
): Record<string, string[] | undefined> {
  const src = learnContent || {};
  return {
    行政手続法: src['行政手続法'],
    行政不服審査法: src['行政不服審査法'],
    行政事件訴訟法: src['行政事件訴訟法'],
  };
}

export const GYOSEI_TEXTBOOK_ROUTE = '/textbook/gyosei';

export type GyoseiTextbookChapterLink = {
  chapterId: string;
  label: string;
  axis: string;
};

const TEXTBOOK_CHAPTERS: { id: string; label: string; axis: string; trigger: RegExp }[] = [
  {
    id: 'tetsuzuki',
    label: '教科書：行手',
    axis: '処分前の公正手続',
    trigger: /主宰者|聴聞|弁明|審査基準|処分基準|標準処理期間|中止等の求め|行政手続法|行手法|行手/,
  },
  {
    id: 'fufuku',
    label: '教科書：行審',
    axis: '処分後の不服',
    trigger: /審理員|審査請求|執行停止|事情裁決|標準審理期間|行政不服審査|行服|行審/,
  },
  {
    id: 'gyosho',
    label: '教科書：行訴',
    axis: '裁判所の訴訟',
    trigger: /出訴期間|事情判決|取消訴訟|義務付け|差止め|行政事件訴訟|行訴/,
  },
];

export function findRelatedGyoseiTextbookChapters(
  haystack: string,
  currentChapterId?: string,
): GyoseiTextbookChapterLink[] {
  const hay = haystack || '';
  return TEXTBOOK_CHAPTERS.filter((ch) => {
    if (ch.id === currentChapterId) return false;
    return ch.trigger.test(hay);
  }).map((ch) => ({ chapterId: ch.id, label: ch.label, axis: ch.axis }));
}
