/**
 * 民法総則の論点マスタ（方式C）
 * - 問題を解くモードの総則18問は textHash で手付け
 * - ボーナス等の未タグ問題は keywords で推定（needs_review）
 * - 見て聞いて覚えるは learnIndexes で Step1 導線
 */

export type TopicSource = 'hand' | 'estimate';

export type SousokuTopic = {
  id: string;
  label: string;
  /** 親単元ID。単元ルートは省略 */
  parentId?: string;
  /** 見て聞いて覚える（民法総則）のカード index（0始まり） */
  learnIndexes: number[];
  /** 4コマ／図解キー（deepdive or chunk）。未整備なら空 */
  comicKeys: string[];
  /** 推定用キーワード（長い／特異なもの優先でマッチ） */
  keywords: string[];
  /** 手付け: utils/question-stats の getQuestionTextHash と一致 */
  handQuestionHashes: string[];
  /** 気づき用の短い一言 */
  insightHint: string;
};

/** 単元ルート → サブ論点 */
export const MINPOU_SOUSOKU_TOPICS: SousokuTopic[] = [
  {
    id: 'sousoku.seigen',
    label: '制限行為能力',
    learnIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 48, 50, 97, 98],
    comicKeys: ['minnpou/sousoku/seigennkouinoiryokusya-taihizu'],
    keywords: ['制限行為能力', '後見開始', '保佐開始', '補助開始', '被保佐', '被補助', '成年被後見', '詐術'],
    handQuestionHashes: ['wfye8b', 'ikaxs6'],
    insightHint: '後見・保佐・補助の同意／代理権の要否を取り違えない。',
  },
  {
    id: 'sousoku.seigen.hojo-douri',
    label: '補助・保佐の代理権付与',
    parentId: 'sousoku.seigen',
    learnIndexes: [2, 3, 6, 7],
    comicKeys: ['minnpou/sousoku/seigennkouinoiryokusya-taihizu'],
    keywords: ['代理権を付与', '補助開始', '保佐人に代理'],
    handQuestionHashes: [],
    insightHint: '同意権と代理権付与、本人同意の要否を分ける。',
  },
  {
    id: 'sousoku.seigen.saikoku',
    label: '催告・詐術',
    parentId: 'sousoku.seigen',
    learnIndexes: [8, 9],
    comicKeys: [],
    keywords: ['催告', '詐術', '黙秘'],
    handQuestionHashes: [],
    insightHint: '催告の効果と詐術による取消権喪失をセットで見る。',
  },
  {
    id: 'sousoku.houjin',
    label: '法人・社団・組合',
    learnIndexes: [10, 11, 12, 13, 14, 17, 31, 58, 87, 88, 89, 90, 91, 92, 93],
    comicKeys: [],
    keywords: ['一般社団', '権利能力なき社団', '組合員', '総有', '理事'],
    handQuestionHashes: ['jc0dcz'],
    insightHint: '社団の総有と組合財産、代表・代理の対抗を分ける。',
  },
  {
    id: 'sousoku.koujo',
    label: '公序良俗・強行法規',
    learnIndexes: [15, 18, 19],
    comicKeys: [],
    keywords: ['公序良俗', '強行法規', '定年'],
    handQuestionHashes: ['5a6ddq'],
    insightHint: '成立時の公序か、目的・効果のどちらで切るかを見る。',
  },
  {
    id: 'sousoku.fuzaisha',
    label: '不在者・管理人',
    learnIndexes: [20, 21, 22],
    comicKeys: [],
    keywords: ['不在者', '管理人を置', '改任'],
    handQuestionHashes: ['nbpjli'],
    insightHint: '不在者財産管理と失踪宣告を混ぜない。',
  },
  {
    id: 'sousoku.shisso',
    label: '失踪宣告',
    learnIndexes: [23, 24, 25, 26, 27, 28, 29],
    comicKeys: [],
    keywords: ['失踪の宣告', '失踪宣告', '普通失踪', '特別失踪'],
    handQuestionHashes: ['vkjj8x'],
    insightHint: 'みなす死亡時期と取消し後の返還範囲が急所。',
  },
  {
    id: 'sousoku.ishi',
    label: '意思表示',
    learnIndexes: [35, 36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47, 49, 94, 95, 99, 100, 102, 103],
    comicKeys: [],
    keywords: ['意思表示'],
    handQuestionHashes: ['jvwg51'],
    insightHint: '心裡・虚偽・錯誤・詐欺強迫の効果を横断比較する。',
  },
  {
    id: 'sousoku.ishi.shinri-kyogi',
    label: '心裡留保・虚偽表示',
    parentId: 'sousoku.ishi',
    learnIndexes: [35, 36, 37, 38],
    comicKeys: [],
    keywords: ['心裡留保', '虚偽表示', '通謀'],
    handQuestionHashes: ['xjfk5f'],
    insightHint: '原則有効／無効と、善意第三者への対抗を分ける。',
  },
  {
    id: 'sousoku.ishi.kyogi-daisansha',
    label: '虚偽表示と善意の第三者',
    parentId: 'sousoku.ishi',
    learnIndexes: [37, 38],
    comicKeys: [],
    keywords: ['虚偽表示の無効を対抗', '善意の第三者'],
    handQuestionHashes: ['befbnv'],
    insightHint: '対抗できない第三者の範囲がひっかけになる。',
  },
  {
    id: 'sousoku.ishi.sakugo',
    label: '錯誤',
    parentId: 'sousoku.ishi',
    learnIndexes: [39, 40, 42],
    comicKeys: [],
    keywords: ['錯誤'],
    handQuestionHashes: ['7mnyv4'],
    insightHint: '動機の錯誤と表示の錯誤、取消し要件を確認する。',
  },
  {
    id: 'sousoku.dairi',
    label: '代理',
    learnIndexes: [51, 52, 53, 56, 57, 59, 60, 61, 62, 63, 75],
    comicKeys: [],
    keywords: ['代理に関する', '復代理', '自己契約', '双方代理'],
    handQuestionHashes: ['gfxb73'],
    insightHint: '有権代理の要件と無権・表見の入口を先に決める。',
  },
  {
    id: 'sousoku.dairi.mukendairi',
    label: '無権代理・他人物売買',
    parentId: 'sousoku.dairi',
    learnIndexes: [56, 57, 59, 60],
    comicKeys: [],
    keywords: ['代理人と称して', '代理権がない', '他人物', '無権代理'],
    handQuestionHashes: ['r4mvm4', 'rgrg7r'],
    insightHint: '無権代理の効果と表見・追認・相手方保護を分ける。',
  },
  {
    id: 'sousoku.joken',
    label: '条件・期限（附款）',
    learnIndexes: [67],
    comicKeys: [],
    keywords: ['附款', '停止条件', '解除条件', '期限'],
    handQuestionHashes: ['jt7aog'],
    insightHint: '条件成就の擬制・妨害と期限の区別が芯。',
  },
  {
    id: 'sousoku.jiko',
    label: '時効',
    learnIndexes: [69, 70, 71, 72, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 96, 101, 104],
    comicKeys: ['minnpou/sousoku/sousoku-jikoumatome'],
    keywords: ['消滅時効', '取得時効', '時効の援用', '援用権者', '完成猶予', '更新'],
    handQuestionHashes: ['lot8iz', 'eg6tbf', 'pddx28', 'oqhv6'],
    insightHint: '完成・援用・援用権者を分けて覚える。',
  },
  {
    id: 'sousoku.jiko.enyo',
    label: '時効の援用・援用権者',
    parentId: 'sousoku.jiko',
    learnIndexes: [76, 77, 78, 79, 80],
    comicKeys: ['minnpou/sousoku/sousoku-jikoumatome'],
    keywords: ['時効の援用', '援用権者'],
    handQuestionHashes: ['pddx28', 'oqhv6'],
    insightHint: '誰が援用できるかが得点源。',
  },
];

export const MINPOU_SOUSOKU_FIELD = '民法総則';
export const MINPOU_SOUSOKU_SUBJECT = '民法';
export const MINPOU_SOUSOKU_LEARN_SUBJECT = '民法総則';

/**
 * 問題を解くモード（民法総則）各問 → 見て聞いて覚えるの主カード index（0始まり）
 * textHash は utils/question-stats の getQuestionTextHash と一致させる。
 */
export const SOUSOKU_QUIZ_PRIMARY_LEARN: Record<string, number> = {
  wfye8b: 0, // Q1 制限行為能力 → 後見監督人選任義務なし
  ikaxs6: 2, // Q2 制限行為能力 → 保佐人への代理権付与と本人同意
  jc0dcz: 11, // Q3 団体・社団 → 権利能力なき社団の総有
  '5a6ddq': 15, // Q4 公序良俗
  nbpjli: 20, // Q5 不在者・管理人
  vkjj8x: 23, // Q6 失踪宣告
  xjfk5f: 35, // Q7 心裡留保・虚偽表示
  befbnv: 37, // Q8 虚偽表示と善意の第三者
  '7mnyv4': 40, // Q9 錯誤（錯誤による取消し）
  jvwg51: 46, // Q10 意思表示（到達・効力）
  gfxb73: 51, // Q11 代理・表見代理
  r4mvm4: 56, // Q12 他人物売買・無権代理
  rgrg7r: 56, // Q13 無断で代理人と称して売却
  jt7aog: 67, // Q14 附款・条件
  lot8iz: 69, // Q15 取得時効・占有
  eg6tbf: 72, // Q16 消滅時効
  pddx28: 77, // Q17 時効の援用
  oqhv6: 80, // Q18 援用権者
};

const byId = new Map(MINPOU_SOUSOKU_TOPICS.map((t) => [t.id, t]));

export function getSousokuTopicById(id: string): SousokuTopic | undefined {
  return byId.get(id);
}

export function getSousokuUnitRoot(topic: SousokuTopic): SousokuTopic {
  let cur = topic;
  while (cur.parentId) {
    const parent = byId.get(cur.parentId);
    if (!parent) break;
    cur = parent;
  }
  return cur;
}

export function listSousokuSiblings(topic: SousokuTopic): SousokuTopic[] {
  const root = getSousokuUnitRoot(topic);
  return MINPOU_SOUSOKU_TOPICS.filter(
    (t) => t.id === root.id || t.parentId === root.id || getSousokuUnitRoot(t).id === root.id,
  );
}
