import { getChunkImageSource } from '@/src/chunkImages';

export type CompareTableDef = {
  id: string;
  title: string;
  caption: string;
  body: string;
  /** chunkImages キー（任意） */
  imageKey?: string;
  isEligible: (text: string, field?: string) => boolean;
};

/** 催告（既存図解） */
export const SAIKOKU_COMPARE_IMAGE_KEY = 'minnpou/sousoku/sousoku11-2';
const SAIKOKU_COMPARE_CAPTION =
  '催告に対する沈黙：20条の相手ごと／無権代理114条は逆';
const SAIKOKU_COMPARE_BODY = `**催告の沈黙（20条・114条）**

「本人に催告＝取消しみなし」と一括しない。未成年者・成年被後見人本人（制限中）への催告は**効力なし**。法定代理人への無回答は**追認みなし**（20条2項）。無権代理の本人催告（114条＝拒絶みなし）をここに貼ると落ちる。

| 催告の相手・中身 | 無回答 | 条文 |
|---|---|---|
| 未成年者・成年被後見人本人（制限中） | **効力なし** | 追認権がない |
| 能力を得た本人 | **追認**みなし | 20条1項 |
| **法定代理人等**（権限内） | **追認**みなし | 20条2項 |
| 特別の方式・方式通知なし | **取消し**みなし | 20条3項 |
| 保佐・補助本人へ「追認を得よ」 | **取消し**みなし | 20条4項 |
| 無権代理の**本人** | **追認拒絶**みなし | 114条 |

覚え方：追認できる人への沈黙＝追認（20条1・2項）。無権代理の本人への沈黙＝拒絶（114条）。`;

function hasKeyword(text: string, patterns: RegExp[]): boolean {
  const t = (text || '').trim();
  if (!t) return false;
  return patterns.some((p) => p.test(t));
}

const COMPARE_TABLE_DEFS: CompareTableDef[] = [
  {
    id: 'sagi-96-aite',
    title: '96条：相手方と第三者',
    caption: '取消しの可否は相手方、対抗は第三者、取消し後の不動産は登記',
    imageKey: 'learn/minnpou/lec-q27-aite-daisansha',
    body: `**誰の主観を見るか（96条・177条）**

強迫は相手方の主観を問わず取り消せる。混ぜるなは「可否」と「対抗」と「取消し後」。

| 聞くこと | 見る人 | 判断軸 |
|---|---|---|
| 第三者の**詐欺**で取消せるか | **相手方** | 知り／知り得た（96条2項） |
| 第三者の**強迫**で取消せるか | 見ない | いつでも取消せる |
| 詐欺取消を取消し**前**の第三者に対抗できるか | **その第三者** | 善意無過失なら対抗不可（96条3項・登記不要） |
| 取消し**後**の不動産の第三者 | 登記 | 177条の先後 |

**暗記** 可否（第三者詐欺）＝相手方。対抗（前）＝第三者。後の不動産＝登記。`,
    isEligible: (text, field) => {
      if (field && !/民法|行政法総論/.test(field)) return false;
      return hasKeyword(text, [/96条/, /詐欺/, /強迫/, /177条/, /復帰的/, /取消し後/, /取消し前/]);
    },
  },
  {
    id: 'jutsu-21',
    title: '21条：詐術（黙秘とあいまって）',
    caption: '判例フレーズは詐術の成立。成立したら取り消せない',
    imageKey: 'learn/minnpou/lec-q28-jutsu',
    body: `**詐術（21条・最判昭44.2.13）**

黙秘だけは詐術にならない。『他の言動とあいまって誤信させ、又は誤信を強めた』は成立の話。右列を見る。

| 事実 | 詐術 | 取消し |
|---|---|---|
| 黙秘しただけ | ならない | **できる** |
| あいまって誤信させ／強めた | **なる** | **できない** |

フレーズが正しくても『取消原因／取り消せる』と書いてあれば×。`,
    isEligible: (text, field) => {
      if (field && !/民法|制限行為|行政法総論/.test(field)) return false;
      return hasKeyword(text, [/詐術/, /黙秘/, /あいまって/, /相まって/, /21条/]);
    },
  },
  {
    id: 'saikoku',
    title: '催告の比較表',
    caption: SAIKOKU_COMPARE_CAPTION,
    body: SAIKOKU_COMPARE_BODY,
    imageKey: 'learn/minnpou/lec-q28-saikoku',
    isEligible: (text, field) => {
      if (field && !/民法|制限行為|行政法総論/.test(field)) return false;
      return hasKeyword(text, [/催告/, /無権代理/, /114条/, /追認/, /20条/, /113条/, /制限行為/, /詐術/]);
    },
  },
  {
    id: 'hotei-chijo-388',
    title: '388条：法定地上権は建物のため',
    caption: '契約不要。居住権ではない。土地共有の持分抵当は原則つかない',
    imageKey: 'learn/minnpou/lec-q30-tochi-kyoyu',
    body: `**法定地上権（388条）**

競売で土地と建物の所有者が割れたあと、建物側に土地利用権がないと収去になるのを防ぐ。守るのは競売後に建物を持っている人。賃借権の契約は不要（地上権みなし）。居住権ではない。

| 状態 | 土地 |
|---|---|
| 法定地上権がつく | 契約なしで地上権 |
| もともと別人／つかない＋借地等 | その契約で使える |
| つかない＋何もない | 使えない |

| 場面 | 成否 |
|---|---|
| 土地AB共有・建物A単独・Aの持分抵当 | 原則NO（昭29.12.23） |
| 土地A単独・建物AB・土地抵当 | YES（昭46.12.21） |
| 土地だけ抵当の再築 | つく。旧建物と同一の範囲（昭10.8.10） |
| 共同抵当のあと建替え | 原則NO。例外は同順位共同抵当（平9.2.14） |

「同一価値だから成立」はない。同等に聞こえるのは同一の範囲／同順位。

**暗記** 建物のため。契約不要。設定時の同一所有者。再築は土地だけか共同抵当か。`,
    isEligible: (text, field) => {
      if (field && !/民法|物権/.test(field)) return false;
      return hasKeyword(text, [/法定地上権/, /388条/, /土地共有/, /建替え/, /再築/, /同一の範囲/, /地上権みなし/, /居住権/, /共同抵当/]);
    },
  },
  {
    id: 'daishokou',
    title: '代執行法1条・2条',
    caption: '行政代執行法：1条（代執行）と2条（代替性）',
    body: `| 項目 | 1条 | 2条 |
|------|-----|-----|
| 「法律」 | 条例は**含まない**（新しい履行確保手続は条例で不可） | 条例**含む**（代替的作為義務の課しは可） |
| 対象 | **代執行** | **代替的作為義務**のみ |
| 即時強制 | 義務履行確保手段**ではない**（1条反対解釈で条例即時強制が可能） | — |

**TAC第1回・問10**: 不作為義務（消火物件の使用禁止）は代執行の対象外。`,
    isEligible: (text, field) => {
      if (field && !/行政法/.test(field)) return false;
      return hasKeyword(text, [/代執行/, /行政代執行/, /即時強制/, /代替的作為/, /1条.*2条/]);
    },
  },
  {
    id: 'kokbai-1-2',
    title: '国賠法1条・2条',
    caption: '国家賠償：職務行為（過失）vs 公の営造物（瑕疵・無過失）',
    body: `| 項目 | 1条 | 2条 |
|------|-----|-----|
| 責任 | **故意・過失** | **無過失**（瑕疵） |
| 瑕疵 | — | 通常用法で生じるおそれ |
| ひっかけ | 公務員個人訴→不適法却下（理由なきとき棄却） | 故障車放置・安全措置なし→瑕疵あり得る |

**TAC第1回・問20・21**`,
    isEligible: (text, field) => {
      if (field && !/国家賠償|国賠|行政法/.test(field)) return false;
      return hasKeyword(text, [/国家賠償/, /国賠法/, /公の営造物/, /瑕疵/, /2条/, /1条.*職務/]);
    },
  },
  {
    id: 'shokken-shoko',
    title: '職権証拠調べ vs 職権探知',
    caption: '行訴法24条：補充的調べ○・未主張事実の認定×',
    body: `| | 職権証拠調べ（○） | 職権探知（×） |
|--|-------------------|---------------|
| 対象 | 当事者が**主張した事実**の立証 | 未主張の**主要事実** |
| 判決の基礎 | 主要事実に限り可 | 未主張の主要事実は不可 |
| 位置づけ | 弁論主義の**補充** | 弁論主義に反する |

**TAC第1回・問17**`,
    isEligible: (text, field) => {
      if (field && !/行政事件訴訟|行訴/.test(field)) return false;
      return hasKeyword(text, [/職権証拠/, /職権探知/, /24条/, /主要事実/, /当事者が主張/]);
    },
  },
  {
    id: 'shoho-1-2',
    title: '商法1条2項の順序',
    caption: '商事：商法→商慣習→民法（民法が商慣習に優先する記述は×）',
    body: `| 順位 | 法源 |
|------|------|
| 1 | 特別法（会社法等） |
| 2 | 商法 |
| 3 | **商慣習** |
| 4 | 民法 |

**×**: 商法→民法→商慣習。**TAC第1回・問36**`,
    isEligible: (text, field) => {
      if (field && !/商法/.test(field)) return false;
      return hasKeyword(text, [/商慣習/, /商法1条/, /1条2項/, /商事.*民法/]);
    },
  },
  {
    id: 'chomon-benmei',
    title: '聴聞 vs 弁明',
    caption: '行手法：閲覧請求・参加人は聴聞のみ（問12）',
    body: `| 項目 | 聴聞 | 弁明 |
|------|------|------|
| 閲覧請求（18条） | **○** | × |
| 参加人（17条） | **○** | × |
| 予定処分の通知 | ○ | ○ |
| 公示送達 | ○ | ○（31条準用） |

**正解の組合せ**: ウ・エのみが聴聞限定。**TAC第1回・問12**`,
    isEligible: (text, field) => {
      if (field && field !== '行政手続法') return false;
      return hasKeyword(text, [/聴聞/, /弁明/, /18条/, /17条/, /閲覧請求/, /参加人/]);
    },
  },
  {
    id: 'sashiboso',
    title: '差し迫った必要・緊急3系列',
    caption: '行手法：14条・13条2項・39条4項',
    body: `| 条文 | 免除 | 事後理由 |
|------|------|----------|
| 14条1項但書（差し迫った必要） | 同時の理由提示 | **あり** |
| 13条2項1号（緊急） | 聴聞・弁明 | なし |
| 39条4項1号（緊急） | 意見公募 | なし |

申請拒否（8条）には14条型の緊急例外なし。`,
    isEligible: (text, field) => {
      if (field && field !== '行政手続法') return false;
      return hasKeyword(text, [/差し迫った必要/, /緊急/, /14条/, /13条2/, /39条4/, /意見公募/]);
    },
  },
  {
    id: 'chitsujo',
    title: '秩序罰の主体と手続',
    caption: '国→非訟・裁判所／地方→長＋自治法',
    body: `| 主体 | 手続 |
|------|------|
| **国** | 非訟事件手続法 → **裁判所** |
| **地方公共団体の長** | 自治法243条の2等 |

過料は秩序罰の一種（戸籍法違反等）。**TAC第1回・問42**`,
    isEligible: (text, field) => {
      if (field && !/行政法|地方自治/.test(field)) return false;
      return hasKeyword(text, [/秩序罰/, /243条/, /過料/, /非訟事件/]);
    },
  },
  {
    id: 'senkyoten',
    title: '占有改定マトリクス',
    caption: '178・333・譲渡担保○／192・質権×',
    body: `**占有改定で「引渡し」に含まれるか**

| 論点 | 占有改定 |
|------|----------|
| 178条対抗 | **○** |
| 333条先取特権 | **○**（大判大6.7.26） |
| 譲渡担保 | **○** |
| 192条即時取得 | **×**（最判昭35.2.11） |
| 質権設定 | **×**（345条） |

詳細: \`data/knowledge/canonical/senkyoten-hosoku-matrix.md\` **TAC・問31周辺**`,
    isEligible: (text, field) => {
      if (field && field !== '民法物権' && field !== '民法総則') return false;
      return hasKeyword(text, [/占有改定/, /183条/, /192条/, /333条/, /178条/, /即時取得/, /譲渡担保/]);
    },
  },
  {
    id: 'mokuteki-kei',
    title: '目的刑論',
    caption: '絶対的応報 vs 相対的応報（予防の位置づけ）',
    body: `| 理論 | 要点 |
|------|------|
| 絶対的応報刑論 | **報応**中心、予防は重視しない |
| 相対的応報刑論 | 応報＋**予防**（通説的） |
| 目的刑論 | 応報と予防の両面 |

**TAC第1回・問1**（令和7年6月・拘禁刑もセット）`,
    isEligible: (text, field) => {
      if (field && field !== '憲法' && field !== '基礎法学') return false;
      return hasKeyword(text, [/応報刑/, /目的刑/, /予防/, /拘禁刑/]);
    },
  },
  {
    id: 'koji-rieki',
    title: '訴えの利益',
    caption: '市街化調整区域は残存／建築完了・免許失効は喪失',
    body: `| 事案 | 訴えの利益 |
|------|-----------|
| 市街化調整区域・開発許可・検査済後 | **残存**し得る |
| 建築確認・建築完了後 | 原則**喪失** |
| 土地区画整理・工事完了 | 原則**喪失** |
| 選挙効力失効・免許失効 | **喪失** |

**TAC第1回・問17**`,
    isEligible: (text, field) => {
      if (field && !/行政事件訴訟|行訴/.test(field)) return false;
      return hasKeyword(text, [/訴えの利益/, /市街化/, /建築確認/, /土地区画/, /利益.*喪失/]);
    },
  },
];

export function listCompareTables(): CompareTableDef[] {
  return COMPARE_TABLE_DEFS;
}

export function findEligibleCompareTables(text: string, field?: string): CompareTableDef[] {
  return COMPARE_TABLE_DEFS.filter((d) => d.isEligible(text, field));
}

export function hasAnyCompareTable(text: string, field?: string): boolean {
  return findEligibleCompareTables(text, field).length > 0;
}

export function buildCompareContext(subject?: string, field?: string): string | undefined {
  const ctx = [subject, field].filter(Boolean).join(' ').trim();
  return ctx || undefined;
}

export function pickCompareTable(
  text: string,
  context?: { subject?: string; field?: string },
): CompareTableDef | undefined {
  return findEligibleCompareTables(text, buildCompareContext(context?.subject, context?.field))[0];
}

export function hasCompareTableForContext(
  text: string,
  context?: { subject?: string; field?: string },
): boolean {
  return !!pickCompareTable(text, context);
}

export function resolveCompareTableImage(imageKey?: string): number | undefined {
  if (!imageKey) return undefined;
  return getChunkImageSource(imageKey);
}

/** @deprecated 後方互換 */
export function isSaikokuCompareEligible(text: string, field?: string): boolean {
  const t = (text || '').trim();
  if (!t || !/催告/.test(t)) return false;
  if (field && field !== '民法総則') return false;
  return /無権代理|114条|追認|確答|被保佐|被後見|制限行為|121条|113条|拒絶/.test(t);
}

export function resolveSaikokuCompareImage(): number | undefined {
  return resolveCompareTableImage(SAIKOKU_COMPARE_IMAGE_KEY);
}

export function hasSaikokuCompareTable(text: string, field?: string): boolean {
  return isSaikokuCompareEligible(text, field) && resolveSaikokuCompareImage() != null;
}

export { SAIKOKU_COMPARE_CAPTION, SAIKOKU_COMPARE_BODY };
