import { KISO_HOUGAKU_SUMMARY_MARKDOWN } from '@/src/content/kisoHougakuSummary';
import { TEITOUKEN_TEXTBOOK_MARKDOWN } from '@/src/content/teitoukenTextbookMarkdown';
import { CHAT_MARKDOWN_CHUNKS } from '@/src/generated/chatMarkdownChunks';
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '@/src/learnExports';
import { PIN_CASES } from '@/src/pinData';
import {
  KISO_HOUGAKU_CHAT_TOPIC_BRIEFS,
  KISO_HOUGAKU_KEY_PHRASES,
  KISO_HOUGAKU_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKisoHougaku';
import { KISO_HOUGAKU_COMPARISON_BRIEFS } from '@/utils/chatTopicBriefsKisoComparisons';
import {
  KISO_HOUGAKU_MOSHI_BRIEFS,
  KISO_HOUGAKU_MOSHI_KEY_PHRASES,
} from '@/utils/chatTopicBriefsKisoMoshi';
import {
  GYOSEI_SORON_CHAT_BRIEFS,
  GYOSEI_SORON_KEY_PHRASES,
  GYOSEI_SORON_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiSoron';
import {
  GYOSEI_SORON_NET_CHAT_BRIEFS,
  GYOSEI_SORON_NET_KEY_PHRASES,
  GYOSEI_SORON_NET_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiSoronNet';
import {
  GYOSEI_TETSUZUKI_CHAT_BRIEFS,
  GYOSEI_TETSUZUKI_KEY_PHRASES,
  GYOSEI_TETSUZUKI_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiTetsuzuki';
import {
  GYOSEI_FUFUKU_CHAT_BRIEFS,
  GYOSEI_FUFUKU_KEY_PHRASES,
  GYOSEI_FUFUKU_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiFufuku';
import {
  GYOSEI_PROC_COMPARISON_BRIEFS,
  GYOSEI_PROC_COMPARISON_KEY_PHRASES,
  GYOSEI_PROC_COMPARISON_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiComparisons';
import {
  GYOSEI_GYOSHO_CHAT_BRIEFS,
  GYOSEI_GYOSHO_KEY_PHRASES,
  GYOSEI_GYOSHO_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGyoseiGyosho';
import {
  KENPOU_CHAT_BRIEFS,
  KENPOU_KEY_PHRASES,
  KENPOU_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKenpou';
import {
  KENPOU_HANREI_CHAT_BRIEFS,
  KENPOU_HANREI_KEY_PHRASES,
  KENPOU_HANREI_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKenpouHanrei';
import {
  KENPOU_HANREI2_CHAT_BRIEFS,
  KENPOU_HANREI2_KEY_PHRASES,
  KENPOU_HANREI2_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKenpouHanrei2';
import {
  KENPOU_DEEP_CHAT_BRIEFS,
  KENPOU_DEEP_KEY_PHRASES,
  KENPOU_DEEP_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKenpouDeep';
import {
  KOKUBAI_CHAT_BRIEFS,
  KOKUBAI_KEY_PHRASES,
  KOKUBAI_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKokubai';
import {
  GOUKAKU_ROUND3_CHAT_BRIEFS,
  GOUKAKU_ROUND3_KEY_PHRASES,
  GOUKAKU_ROUND3_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsGoukakuRound3';
import {
  JICHI_CHAT_BRIEFS,
  JICHI_KEY_PHRASES,
  JICHI_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsJichi';
import {
  MOSHI_BEYOND_PAST_CHAT_BRIEFS,
  MOSHI_BEYOND_PAST_KEY_PHRASES,
  MOSHI_BEYOND_PAST_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsMoshiBeyondPast';
import {
  SHOHO_KIMEUCHI_CHAT_BRIEFS,
  SHOHO_KIMEUCHI_KEY_PHRASES,
  SHOHO_KIMEUCHI_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsShohoKimeuchi';
import {
  MINPOU_CHAT_BRIEFS,
  MINPOU_KEY_PHRASES,
  MINPOU_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsMinpou';
import {
  NAKA_GYOSEI_YAMA_CHAT_BRIEFS,
  NAKA_GYOSEI_YAMA_KEY_PHRASES,
  NAKA_GYOSEI_YAMA_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsNakaGyoseiYama';
import {
  NAKA_MINPOU_YAMA_CHAT_BRIEFS,
  NAKA_MINPOU_YAMA_KEY_PHRASES,
  NAKA_MINPOU_YAMA_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsNakaMinpouYama';
import {
  KENPOU_YAMA_CHAT_BRIEFS,
  KENPOU_YAMA_KEY_PHRASES,
  KENPOU_YAMA_PHRASE_ALIASES,
} from '@/utils/chatTopicBriefsKenpouYama';
// @ts-ignore
import { LINE_HISTORY } from '@/src/data/lineHistory';

/** chatSearch.ts 互換 */
export type SearchResult = {
  type: 'case' | 'knowledge' | 'memory';
  title: string;
  content: string;
  id?: string;
  category?: string;
  matchType?: 'title' | 'tag' | 'content' | 'keyword';
};

export type ScoredKnowledgeChunk = {
  source: string;
  title: string;
  text: string;
  score: number;
};

const STATUTE_LAW_LABEL: Record<string, string> = {
  gyote: '行政手続法',
  gyoshin: '行政不服審査法',
  gyoso: '行政事件訴訟法',
  jichi: '地方自治法',
  kokubai: '国家賠償法',
  minpo_sosoku: '民法（総則）',
  minpo_bukken: '民法（物権）',
  minpo_saiken_soron: '民法（債権総論）',
  minpo_saiken_kakuron: '民法（債権各論）',
  minpo_kazoku: '民法（親族・相続）',
  sho_kai: '商法・会社法',
  kenpo: '日本国憲法',
};

/** 略称・俗称 → 検索語に足す（キーは normalize 後の想定文言に近づける） */
const PHRASE_ALIASES: [string, string[]][] = [
  ['行手法', ['行政手続法']],
  ['行訴法', ['行政事件訴訟法']],
  ['行審法', ['行政不服審査法']],
  ['国賠法', ['国家賠償法']],
  ['国賠', ['国家賠償']],
  ['自治法', ['地方自治法']],
  ['手続法', ['行政手続法']],
  ['会社法', ['商法・会社法', '会社']],
  ['取消訴訟', ['行政事件訴訟法', '処分性', '原告適格']],
  ['抗告訴訟', ['行政事件訴訟法']],
  ['当事者訴訟', ['行政事件訴訟法']],
  ['民衆訴訟', ['行政事件訴訟法']],
  ['審査請求', ['行政不服審査法']],
  ['執行停止', ['行政不服審査法', '行政事件訴訟法']],
  ['処分性', ['行政処分', '取消訴訟', '行政事件訴訟法']],
  ['原告適格', ['法律上の利益', '取消訴訟']],
  ['聴聞', ['行政手続法', '弁明の機会']],
  ['弁明', ['行政手続法', '聴聞']],
  ['即時取得', ['192条', '占有改定']],
  ['譲渡担保', ['占有改定', '178条']],
  ['時効', ['消滅時効', '取得時効']],
  ['信義則', ['信義則', '信義']],
  ['公序良俗', ['公序良俗']],
  ['悪意の受益', ['悪意の受益者']],
  ['抵抗権', ['抵抗権']],
  ['比例代表', ['比例代表']],
  ['朝日', ['朝日訴訟', '生活保護']],
  ['堀木', ['堀木訴訟']],
  ['米軍基地', ['日米地位協定', '基地']],
  ['私人間効力', ['間接適用', '憲法']],
  ['統治行為', ['憲法', '司法審査']],
  ['期限の許与', ['有益費', '608条', '196条', '留置権', '償還']],
  ['有益費', ['期限の許与', '608条', '196条', '必要費']],
  ...KISO_HOUGAKU_PHRASE_ALIASES,
  ...GYOSEI_SORON_PHRASE_ALIASES,
  ...GYOSEI_SORON_NET_PHRASE_ALIASES,
  ...GYOSEI_TETSUZUKI_PHRASE_ALIASES,
  ...GYOSEI_FUFUKU_PHRASE_ALIASES,
  ...GYOSEI_PROC_COMPARISON_PHRASE_ALIASES,
  ...GYOSEI_GYOSHO_PHRASE_ALIASES,
  ...KENPOU_PHRASE_ALIASES,
  ...KENPOU_HANREI_PHRASE_ALIASES,
  ...KENPOU_HANREI2_PHRASE_ALIASES,
  ...KENPOU_DEEP_PHRASE_ALIASES,
  ...KOKUBAI_PHRASE_ALIASES,
  ...GOUKAKU_ROUND3_PHRASE_ALIASES,
  ...JICHI_PHRASE_ALIASES,
  ...MOSHI_BEYOND_PAST_PHRASE_ALIASES,
  ...SHOHO_KIMEUCHI_PHRASE_ALIASES,
  ...MINPOU_PHRASE_ALIASES,
  ...NAKA_GYOSEI_YAMA_PHRASE_ALIASES,
  ...NAKA_MINPOU_YAMA_PHRASE_ALIASES,
  ...KENPOU_YAMA_PHRASE_ALIASES,
];

/** 質問語に一致したとき必ずコンテキスト先頭に載せる短い論点ガイド（判例タグだけでは足りない論点用） */
const CHAT_TOPIC_BRIEFS: { triggers: string[]; title: string; text: string }[] = [
  {
    triggers: ['理由の提示', '理由提示', '処分の理由を示す', '処分理由', '示さなければならない理由'],
    title: '論点ガイド：理由の提示（行政手続法）',
    text: [
      '## 理由の提示（行政手続法）',
      '',
      '行政手続法**第8条**は「理由の提示」の中心的な規定です。試験では次の**2類型**を対比して説明します。',
      '',
      '### 1. 不利益処分（第8条第1項）',
      '法令に基づき、特定の者をあて先として**義務を課し、又はその権利を制限する処分**（不利益処分）をするときは、**処分の理由を示さなければならない**。争いの材料を与え、裁量の統制や信頼保護に資する趣旨があります。',
      '',
      '### 2. 申請拒否・不許可等（第8条第2項第1号）',
      '**法令に基づく申請に対し拒否する処分**（許認可の不許可、申請の却下など）をするときも、**理由を示さなければならない**のが典型です。概ね「申請に基づく不利益な処分」と整理される問題でも、試験では**不利益処分（1項）と申請拒否類型（2項1号）の両方に触れる**と answer の厚みが出ます。',
      '',
      '※但書、手続の簡素化、通知、公表、大量処分等の特例は、参考にある条文・解説の範囲に限って補足してください。',
    ].join('\n'),
  },
  {
    triggers: ['占有改定の要件', '占有改定とは', '183条 占有改定', '占有改定 183'],
    title: '論点ガイド：占有改定の要件（民法183条）',
    text: [
      '## 占有改定の要件（民法183条）',
      '',
      '**条文**',
      '「代理人が自己の占有物を以後**本人のために占有する意思を表示**したときは、本人は、これによって**占有権を取得**する。」',
      '',
      '### 要件',
      '1. **代理人**：引き続き物を占有する者（売主・譲渡担保設定者など）',
      '2. **本人**：占有権を取得する者（買主・譲渡担保権者など）',
      '3. **自己の占有物**：代理人が占有している動産',
      '4. **意思表示**：「以後本人のために占有する」旨（現実の引渡し不要）',
      '',
      '### 効果',
      '占有権が本人に移転し、**178条の「引渡し」**に含まれる（対抗要件・譲渡担保の引渡し等）。',
      '',
      '### 各条との関係（別論点）',
      '- 178条・333条・譲渡担保：占有改定も「引渡し」に**含む**',
      '- 192条（即時取得）・345条（質権）：占有改定は**含まない／不可**',
    ].join('\n'),
  },
  {
    triggers: ['期限の許与', '相当の期限を許与', '期限を許与'],
    title: '論点ガイド：期限の許与（有益費償還）',
    text: [
      '## 期限の許与とは',
      '',
      '裁判所が、**有益費などの償還債務**について、支払う側（回復者・賃貸人・所有者など）の請求により、**相当の履行猶予（弁済期の先延ばし）**を与えること。',
      '',
      '### 試験で出る典型（民法）',
      '1. **占有・有益費（196条2項ただし書）**：悪意の占有者に対し、回復者の請求で有益費償還に期限の許与可',
      '2. **留置権（299条2項ただし書）**：所有者の請求で有益費償還に期限の許与可',
      '3. **賃貸借の有益費（608条2項ただし書）**：賃貸人の請求で有益費償還に期限の許与可（必要費にはない）',
      '4. **買戻しの有益費（583条2項ただし書）**：売主の請求で有益費に期限の許与可',
      '5. **遺留分侵害額（1047条5項）**：受遺者・受贈者の請求で支払に期限の許与可',
      '',
      '### なぜあるか（ひっかけの芯）',
      '有益費債権があると占有者側が**留置権**を主張しうる。期限の許与で**弁済期が先に延びる**と、留置権の「弁済期到来」要件を欠き、**留置できなくなる**（居座り封じ）。',
      '',
      '### 暗記',
      '**有益費は待ってもらえる／必要費は待ったなし。期限の許与＝大家・所有者側の救済＋留置封じ。**',
    ].join('\n'),
  },
  ...KISO_HOUGAKU_CHAT_TOPIC_BRIEFS,
  ...KISO_HOUGAKU_COMPARISON_BRIEFS,
  ...KISO_HOUGAKU_MOSHI_BRIEFS,
  ...GYOSEI_SORON_CHAT_BRIEFS,
  ...GYOSEI_SORON_NET_CHAT_BRIEFS,
  ...GYOSEI_TETSUZUKI_CHAT_BRIEFS,
  ...GYOSEI_FUFUKU_CHAT_BRIEFS,
  ...GYOSEI_PROC_COMPARISON_BRIEFS,
  ...GYOSEI_GYOSHO_CHAT_BRIEFS,
  ...KENPOU_CHAT_BRIEFS,
  ...KENPOU_HANREI_CHAT_BRIEFS,
  ...KENPOU_HANREI2_CHAT_BRIEFS,
  ...KENPOU_DEEP_CHAT_BRIEFS,
  ...KOKUBAI_CHAT_BRIEFS,
  ...GOUKAKU_ROUND3_CHAT_BRIEFS,
  ...JICHI_CHAT_BRIEFS,
  ...MOSHI_BEYOND_PAST_CHAT_BRIEFS,
  ...SHOHO_KIMEUCHI_CHAT_BRIEFS,
  ...MINPOU_CHAT_BRIEFS,
  ...NAKA_GYOSEI_YAMA_CHAT_BRIEFS,
  ...NAKA_MINPOU_YAMA_CHAT_BRIEFS,
  ...KENPOU_YAMA_CHAT_BRIEFS,
];

/** 口語ノイズを除いた検索核（「〜ってなん？」「とは」等） */
function stripChatQuestionNoise(s: string): string {
  let t = (s || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[?？!！。．、,，･・…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 末尾から口語質問の接尾辞を繰り返し剥がす
  const tail =
    /(ってなに|って何|ってなん|って誰|ってだれ|とは何|とはなに|とはなん|ってどういう意味|どういう意味|について教えて|を教えて|を説明して|について|とは|って|教えてくれ|教えて|説明して)$/;
  for (let i = 0; i < 4; i++) {
    const next = t.replace(tail, '').trim();
    if (next === t) break;
    t = next;
  }
  // 単独の「何／なん」だけ残ったら落とす（核語の一部は触らない）
  t = t.replace(/(?:^|\s)(なに|何|なん|誰|だれ)$/u, '').trim();
  return t;
}

/** クエリに含まれる定番論点フレーズをトークンとして拾う */
const KEY_LEGAL_PHRASES = [
  '期限の許与',
  '相当の期限を許与',
  '占有改定',
  '理由の提示',
  '処分性',
  '原告適格',
  '即時取得',
  '期限の利益',
  '信義則',
  '公序良俗',
  '執行停止',
  '審査請求',
  '取消訴訟',
  '必要費',
  '有益費',
  '留置権',
  '譲渡担保',
  '私人間効力',
  '統治行為',
  ...KISO_HOUGAKU_KEY_PHRASES,
  ...KISO_HOUGAKU_MOSHI_KEY_PHRASES,
  ...GYOSEI_SORON_KEY_PHRASES,
  ...GYOSEI_SORON_NET_KEY_PHRASES,
  ...GYOSEI_TETSUZUKI_KEY_PHRASES,
  ...GYOSEI_FUFUKU_KEY_PHRASES,
  ...GYOSEI_PROC_COMPARISON_KEY_PHRASES,
  ...GYOSEI_GYOSHO_KEY_PHRASES,
  ...KENPOU_KEY_PHRASES,
  ...KENPOU_HANREI_KEY_PHRASES,
  ...KENPOU_HANREI2_KEY_PHRASES,
  ...KENPOU_DEEP_KEY_PHRASES,
  ...KOKUBAI_KEY_PHRASES,
  ...GOUKAKU_ROUND3_KEY_PHRASES,
  ...JICHI_KEY_PHRASES,
  ...MOSHI_BEYOND_PAST_KEY_PHRASES,
  ...SHOHO_KIMEUCHI_KEY_PHRASES,
  ...MINPOU_KEY_PHRASES,
  ...NAKA_GYOSEI_YAMA_KEY_PHRASES,
  ...NAKA_MINPOU_YAMA_KEY_PHRASES,
  ...KENPOU_YAMA_KEY_PHRASES,
];

function normalizeQueryForMatch(s: string): string {
  return (s || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function topicBriefsForQuery(...haystacks: string[]): { title: string; text: string }[] {
  const blob = haystacks.map((h) => normalizeQueryForMatch(h)).join('\n');
  const wantsCompare =
    blob.includes('違いをまとめて') ||
    blob.includes('比較して') ||
    blob.includes('並べて') ||
    blob.includes('比較表');
  const wantsBeyondPast =
    blob.includes('過去10年') ||
    blob.includes('過去問以外') ||
    blob.includes('過去問を回した') ||
    blob.includes('過去問は回した') ||
    blob.includes('それ以外') ||
    blob.includes('他に何か知識') ||
    blob.includes('知識って得られない') ||
    blob.includes('プラスアルファ') ||
    blob.includes('プラスα') ||
    blob.includes('模試由来') ||
    blob.includes('取りこぼし') ||
    blob.includes('過去問だけでは');
  const wantsKimeuchi =
    blob.includes('決め打ち') ||
    blob.includes('全部2') ||
    blob.includes('全部4') ||
    blob.includes('全部に振る') ||
    blob.includes('どれに振る') ||
    ((blob.includes('商法') || blob.includes('会社法')) &&
      (blob.includes('捨て') || blob.includes('時間ない') || blob.includes('勉強してない') || blob.includes('当て勘') || blob.includes('勘で')));
  const matched: { title: string; text: string; priority: number }[] = [];
  for (const b of CHAT_TOPIC_BRIEFS) {
    if (b.triggers.some((t) => blob.includes(normalizeQueryForMatch(t)))) {
      const isCompareTitle = b.title.startsWith('比較：') || b.title.includes('並列');
      const isBeyondPastMenu = b.title.includes('過去問の外側') || b.title.includes('模試由来・本試験');
      const isKimeuchiMenu = b.title.includes('決め打ちしたい人への三段案内');
      let priority = 2;
      if (wantsKimeuchi && isKimeuchiMenu) priority = 0;
      else if (wantsBeyondPast && isBeyondPastMenu) priority = 0;
      else if (wantsCompare && isCompareTitle) priority = 0;
      else if (isCompareTitle) priority = 1;
      else if (isBeyondPastMenu || isKimeuchiMenu) priority = 1;
      matched.push({
        title: b.title,
        text: b.text,
        priority,
      });
    }
  }
  const doryokuTitle = '比較：努力義務の並列（行政手続法｜行政不服審査法）';
  const doryokuRe = /努力義務|努めなければならない|努めるものとする/;
  const otherSubjectDoryoku = /憲法|個人情報|住民基本|予防接種|社会福祉|公衆衛生/;
  const alreadyDoryoku = matched.some((m) => m.title === doryokuTitle);
  const queryWantsDoryoku = doryokuRe.test(blob) && !otherSubjectDoryoku.test(blob);
  const contentWantsDoryoku = matched.some(
    (m) =>
      (m.title.startsWith('行手法：') || m.title.includes('行政不服') || m.title.includes('努力義務')) &&
      doryokuRe.test(`${m.title}\n${m.text}`)
  );
  if (!alreadyDoryoku && (queryWantsDoryoku || contentWantsDoryoku)) {
    const src = CHAT_TOPIC_BRIEFS.find((b) => b.title === doryokuTitle);
    if (src) {
      matched.push({
        title: src.title,
        text: src.text,
        priority: queryWantsDoryoku ? 0 : 3,
      });
    }
  }
  matched.sort((a, b) => a.priority - b.priority);
  return matched.map(({ title, text }) => ({ title, text }));
}

/** 略称展開・条番号バリアント・分割トークン */
function expandSearchTokens(trimmed: string): { fullNormalized: string; rawNormalized: string; tokens: string[] } {
  const rawNormalized = normalizeQueryForMatch(trimmed);
  const core = stripChatQuestionNoise(trimmed);
  const fullNormalized = core || rawNormalized;
  const bag = new Set<string>();

  if (fullNormalized.length >= 2) bag.add(fullNormalized);
  if (rawNormalized.length >= 2 && rawNormalized !== fullNormalized) bag.add(rawNormalized);

  for (const part of fullNormalized.split(/[\s　、,.]+/).filter(Boolean)) {
    if (part.length >= 2) bag.add(part);
    if (/条|項|号|章|節/.test(part) && part.length >= 2) bag.add(part);
  }

  // 「期限の許与」のように「の」を挟む複合語も核として残す
  for (const m of fullNormalized.matchAll(/[\u3040-\u30ff\u4e00-\u9fff\u3400-\u4dbf]{2,}(?:の[\u3040-\u30ff\u4e00-\u9fff\u3400-\u4dbf]{2,})+/g)) {
    if (m[0].length >= 4) bag.add(m[0]);
  }

  for (const phrase of KEY_LEGAL_PHRASES) {
    const p = normalizeQueryForMatch(phrase);
    if (rawNormalized.includes(p) || fullNormalized.includes(p)) bag.add(p);
  }

  for (const [needle, adds] of PHRASE_ALIASES) {
    if (rawNormalized.includes(needle) || fullNormalized.includes(needle)) {
      for (const a of adds) bag.add(normalizeQueryForMatch(a));
    }
  }
  if (fullNormalized.includes('理由の提示') || fullNormalized.includes('理由提示') || rawNormalized.includes('理由の提示')) {
    ['行政手続法', '不利益処分', '申請', '拒否', '第8条', '却下', '不許可'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('占有改定') || rawNormalized.includes('占有改定')) {
    ['183条', '第183条', '意思を表示', '占有権', '178条'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('処分性') || rawNormalized.includes('処分性')) {
    ['行政処分', '公権力の行使', '取消訴訟', '直接強制'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('原告適格') || rawNormalized.includes('原告適格')) {
    ['法律上の利益', '取消訴訟', '個別的利益'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('即時取得') || fullNormalized.includes('192') || rawNormalized.includes('即時取得')) {
    ['192条', '占有改定', '善意無過失'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('期限の許与') || rawNormalized.includes('期限の許与') || rawNormalized.includes('期限を許与')) {
    ['有益費', '必要費', '608条', '196条', '留置権', '賃貸借', '償還'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('くじ') ||
    fullNormalized.includes('くじ') ||
    rawNormalized.includes('抽選') ||
    rawNormalized.includes('無作為')
  ) {
    ['検察審査員', '検察審査会', '裁判員', '11人', '有権者', '一般市民'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('薬局') ||
    rawNormalized.includes('距離制限') ||
    rawNormalized.includes('距離規制') ||
    rawNormalized.includes('適正配置')
  ) {
    ['薬事法', '小売市場', '公衆浴場', '職業選択の自由', '原告適格'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (rawNormalized.includes('病院') && (rawNormalized.includes('勧告') || rawNormalized.includes('距離') || rawNormalized.includes('開設'))) {
    ['中止勧告', '処分性', '保険医療機関', '行政指導'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('処分性') ||
    rawNormalized.includes('原告適格') ||
    rawNormalized.includes('法律の留保') ||
    rawNormalized.includes('侵害留保')
  ) {
    ['取消訴訟', '法律上の利益', '公定力', '行政指導'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('聴聞') ||
    rawNormalized.includes('弁明') ||
    rawNormalized.includes('審査基準') ||
    rawNormalized.includes('意見公募') ||
    rawNormalized.includes('行手法') ||
    rawNormalized.includes('行政手続')
  ) {
    ['行政手続法', '不利益処分', '申請', '届出'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('審査請求') ||
    rawNormalized.includes('再調査') ||
    rawNormalized.includes('審理員') ||
    rawNormalized.includes('執行停止') ||
    rawNormalized.includes('行服') ||
    rawNormalized.includes('不服審査')
  ) {
    ['行政不服審査法', '裁決', '教示', '不作為'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('取消訴訟') ||
    rawNormalized.includes('義務付け') ||
    rawNormalized.includes('差止め') ||
    rawNormalized.includes('行訴') ||
    rawNormalized.includes('出訴期間') ||
    rawNormalized.includes('事情判決') ||
    rawNormalized.includes('無効確認')
  ) {
    ['行政事件訴訟法', '原告適格', '処分性', '訴えの利益'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (
    rawNormalized.includes('二重の基準') ||
    rawNormalized.includes('私人間効力') ||
    rawNormalized.includes('政教分離') ||
    rawNormalized.includes('検閲') ||
    rawNormalized.includes('マクリーン') ||
    (rawNormalized.includes('憲法') && (rawNormalized.includes('人権') || rawNormalized.includes('違憲')))
  ) {
    ['公共の福祉', '表現の自由', '職業選択の自由', '違憲審査'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  // 基礎法学まとめを拾いやすくする
  if (
    KISO_HOUGAKU_KEY_PHRASES.some((p) => rawNormalized.includes(normalizeQueryForMatch(p)) || fullNormalized.includes(normalizeQueryForMatch(p)))
  ) {
    ['基礎法学', '法源', '法系'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }

  let m: RegExpExecArray | null;
  const reArt = /(\d{1,4})条/g;
  while ((m = reArt.exec(rawNormalized)) !== null) {
    const n = m[1];
    bag.add(`${n}条`);
    bag.add(`第${n}条`);
  }
  const reKo = /(\d{1,3})項/g;
  while ((m = reKo.exec(rawNormalized)) !== null) {
    bag.add(`第${m[1]}項`);
    bag.add(`${m[1]}項`);
  }

  // 口語ノイズだけの長トークンは落とす（核語を優先）
  const tokens = [...bag]
    .filter((t) => t.length >= 2 || /^\d+条/.test(t))
    .filter((t) => !/(ってなん|ってなに|教えて|どういう意味)$/.test(t))
    .sort((a, b) => b.length - a.length);
  return { fullNormalized, rawNormalized, tokens: tokens.slice(0, 48) };
}

function statuteChunkBonus(lawLabel: string, tokens: string[]): number {
  const L = normalizeQueryForMatch(lawLabel);
  let b = 0;
  for (const t of tokens) {
    if (t.length < 2) continue;
    if (L.includes(t) || t.includes(L.replace(/（[^）]+）/g, ''))) b += 5;
  }
  return Math.min(b, 12);
}

function stripImageTags(s: string): string {
  return (s || '').replace(/\[\[image:[^\]]*\]\]/gi, '');
}

function stripHtml(html: string): string {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isLearnSlotId(s: string): boolean {
  return /^[a-z]{2}\d{4}$/i.test((s || '').trim());
}

function scoreHaystack(haystackNorm: string, tokens: string[], fullNormalized: string): number {
  if (!haystackNorm) return 0;
  let s = 0;
  if (fullNormalized.length >= 2 && haystackNorm.includes(fullNormalized)) s += 8;
  for (const t of tokens) {
    if (haystackNorm.includes(t)) s += 2;
  }
  return s;
}

/** 複合クエリ（占有改定＋要件等）で無関係ヒットを下げ、関連チャンクを上げる */
function queryCoherenceBonus(fullNormalized: string, haystackNorm: string): number {
  let b = 0;
  const wantsSenkyoten = fullNormalized.includes('占有改定');
  const wantsYoken = fullNormalized.includes('要件');
  const hasSenkyoten = haystackNorm.includes('占有改定') || haystackNorm.includes('183条');
  const hasYoken =
    haystackNorm.includes('要件') ||
    haystackNorm.includes('183条') ||
    haystackNorm.includes('意思を表示');

  if (wantsSenkyoten && wantsYoken) {
    if (hasSenkyoten && hasYoken) b += 12;
    else if (hasYoken && !hasSenkyoten) b -= 10;
    else if (hasSenkyoten) b += 4;
  } else if (wantsSenkyoten && hasSenkyoten) {
    b += 4;
  }
  if (fullNormalized.includes('183') && haystackNorm.includes('183条')) b += 6;
  return b;
}

function pushCandidate(
  list: ScoredKnowledgeChunk[],
  source: string,
  title: string,
  text: string,
  tokens: string[],
  fullNormalized: string,
  maxLen: number,
  extraScore = 0
): void {
  const t = stripImageTags(text || '').trim();
  if (!t) return;
  const slice = t.length > maxLen ? `${t.slice(0, maxLen)}…` : t;
  const low = normalizeQueryForMatch(slice);
  const sc = scoreHaystack(low, tokens, fullNormalized) + extraScore + queryCoherenceBonus(fullNormalized, low);
  if (sc <= 0) return;
  list.push({ source, title, text: slice, score: sc });
}

function dedupeChunks(chunks: ScoredKnowledgeChunk[]): ScoredKnowledgeChunk[] {
  const best = new Map<string, ScoredKnowledgeChunk>();
  for (const c of chunks) {
    const key = `${c.source}||${c.title}`.slice(0, 240);
    const prev = best.get(key);
    if (!prev || c.score > prev.score || (c.score === prev.score && c.text.length > prev.text.length)) {
      best.set(key, c);
    }
  }
  return [...best.values()];
}

function mergeChunksForModel(chunks: ScoredKnowledgeChunk[], maxChunks: number, maxTotalChars: number): ScoredKnowledgeChunk[] {
  const sorted = dedupeChunks(chunks).sort((a, b) => b.score - a.score);
  const out: ScoredKnowledgeChunk[] = [];
  let total = 0;
  for (const c of sorted) {
    if (out.length >= maxChunks) break;
    if (total + c.text.length > maxTotalChars) {
      const room = maxTotalChars - total;
      if (room < 280) break;
      out.push({ ...c, text: c.text.slice(0, room) + '…' });
      break;
    }
    out.push(c);
    total += c.text.length;
  }
  return out;
}

/** 同期検索（従来 chat と同じ形状・上位5件） */
export function searchKnowledge(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results: SearchResult[] = [];
  const { fullNormalized, rawNormalized, tokens } = expandSearchTokens(trimmed);

  const textMatches = (raw: string) => {
    const h = normalizeQueryForMatch(stripHtml(raw));
    return h.includes(fullNormalized) || tokens.some((t) => h.includes(t));
  };

  PIN_CASES.forEach((item) => {
    const titleMatch = textMatches(item.title);
    const tagsMatch = item.tags.some((tag) => textMatches(tag));
    const plain = stripHtml(item.content);
    const contentMatch = textMatches(plain);
    if (titleMatch || tagsMatch || contentMatch) {
      results.push({
        type: 'case',
        title: item.title,
        content: contentMatch
          ? `【判例】${item.title} (${item.category})\n${stripHtml(item.content).slice(0, 1200)}`
          : `【判例】${item.title} (${item.category})\nタグ: ${item.tags.join(', ')}`,
        id: item.id,
        matchType: titleMatch ? 'title' : tagsMatch ? 'tag' : 'content',
      });
    }
  });

  Object.entries(LEARN_CONTENT).forEach(([category, items]) => {
    (items as string[]).forEach((text) => {
      if (isLearnSlotId(text)) return;
      if (textMatches(text)) {
        results.push({
          type: 'knowledge',
          title: category,
          content: text,
          category,
          matchType: 'content',
        });
      }
    });
  });

  LINE_HISTORY.forEach((chat: { id: string; keywords: string[]; message: string }) => {
    const keywordMatch =
      chat.keywords.some((k: string) => textMatches(k)) || textMatches(chat.message);

    if (keywordMatch) {
      let cleanContent = chat.message;
      const namesToRemove = ['てらしぃ', 'ちばまぞこ', 'ちばみほこ', '寺島さん', '寺島', 'まみさん', '相田理恵'];
      namesToRemove.forEach((name) => {
        cleanContent = cleanContent.split(name).join('***');
      });

      results.push({
        type: 'memory',
        title: '過去の会話メモリ',
        content: `「${cleanContent}」`,
        id: chat.id,
        matchType: 'keyword',
      });
    }
  });

  const briefList = topicBriefsForQuery(fullNormalized, rawNormalized);
  for (let i = briefList.length - 1; i >= 0; i--) {
    const b = briefList[i];
    results.unshift({
      type: 'knowledge',
      title: b.title,
      content: b.text,
      category: '論点ガイド',
      matchType: 'content',
    });
  }

  return results.slice(0, 5);
}

/**
 * アプリ内データ＋MDチャンクを横断検索し、スコア順のチャンクを返す。
 * questions（クイズ・条文）は動的 import により初回のみ読み込み。
 */
export async function searchKnowledgeFull(query: string): Promise<ScoredKnowledgeChunk[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { fullNormalized, rawNormalized, tokens } = expandSearchTokens(trimmed);
  const candidates: ScoredKnowledgeChunk[] = [];

  for (const brief of topicBriefsForQuery(fullNormalized, rawNormalized)) {
    const beyondPastBoost = brief.title.includes('過去問の外側') ? 500 : 0;
    const kimeuchiBoost = brief.title.includes('決め打ちしたい人への三段案内') ? 600 : 0;
    candidates.push({
      source: '質問モード・論点ガイド',
      title: brief.title,
      text: brief.text,
      score: 1000 + beyondPastBoost + kimeuchiBoost,
    });
  }

  for (const item of PIN_CASES) {
    const blob = [item.title, ...item.tags, stripHtml(item.content)].join('\n');
    pushCandidate(candidates, 'ピンと図', item.title, blob, tokens, fullNormalized, 4000);
  }

  Object.entries(LEARN_CONTENT).forEach(([category, items]) => {
    (items as string[]).forEach((text, i) => {
      if (isLearnSlotId(text)) return;
      const dd = (LEARN_DEEPDIVE as Record<string, string[]>)[category]?.[i];
      const blob = dd && dd.length > 30 ? `${text}\n\n${dd}` : text;
      const deepBoost = dd && dd.length > 80 ? 2 : 0;
      pushCandidate(
        candidates,
        `見て聞いて覚える · ${category}`,
        `${category} #${i + 1}`,
        blob,
        tokens,
        fullNormalized,
        4500,
        deepBoost
      );
    });
  });

  for (const chat of LINE_HISTORY as { keywords: string[]; message: string }[]) {
    const blob = [...chat.keywords, chat.message].join('\n');
    pushCandidate(candidates, '過去の会話メモリ', 'LINEメモ', blob, tokens, fullNormalized, 2000);
  }

  const kisoHit = KISO_HOUGAKU_KEY_PHRASES.some(
    (p) => fullNormalized.includes(normalizeQueryForMatch(p)) || rawNormalized.includes(normalizeQueryForMatch(p))
  );
  pushCandidate(
    candidates,
    '基礎法学まとめ',
    '基礎法学まとめ（アプリ内）',
    KISO_HOUGAKU_SUMMARY_MARKDOWN,
    tokens,
    fullNormalized,
    12000,
    kisoHit ? 8 : 0
  );

  pushCandidate(
    candidates,
    '抵当権教科書',
    '抵当権の教科書（アプリ内）',
    TEITOUKEN_TEXTBOOK_MARKDOWN,
    tokens,
    fullNormalized,
    12000
  );

  for (const row of CHAT_MARKDOWN_CHUNKS) {
    const rel = row.path.replace(/\\/g, '/');
    const isKnowledge = rel.startsWith('data/knowledge/');
    const isCreator = rel.includes('/creator/');
    const subjectMatch = isKnowledge ? rel.match(/data\/knowledge\/(?:quiz|learn|creator)\/([^/]+)/) : null;
    const sourceLabel = isCreator
      ? `知識MD · ${subjectMatch?.[1] || 'creator'}（要約）`
      : isKnowledge
        ? `知識MD · ${subjectMatch?.[1] || 'canonical'}`
        : `MD:${rel}`;
    const boost = isKnowledge ? (isCreator ? 4 : 3) : 0;
    pushCandidate(candidates, sourceLabel, row.title || row.path, row.text, tokens, fullNormalized, 3500, boost);
  }

  try {
    const mod = await import('@/src/questions');
    const SUBJECTS = mod.SUBJECTS as Record<string, Record<string, any[]>>;
    const STATUTES = mod.STATUTES as Record<string, { title: string; content: string }[]>;

    for (const [subject, fields] of Object.entries(SUBJECTS || {})) {
      for (const [field, questions] of Object.entries(fields || {})) {
        if (!Array.isArray(questions)) continue;
        for (let qi = 0; qi < questions.length; qi++) {
          const qn = questions[qi];
          if (!qn || typeof qn !== 'object') continue;
          const parts: string[] = [];
          if (typeof qn.text === 'string') parts.push(qn.text);
          if (typeof qn.explain === 'string') parts.push(qn.explain);
          if (Array.isArray(qn.choices)) parts.push(...qn.choices.filter((x: unknown) => typeof x === 'string'));
          if (Array.isArray(qn.choiceExplanations))
            parts.push(...qn.choiceExplanations.filter((x: unknown) => typeof x === 'string'));
          if (Array.isArray(qn.choiceDeepDive))
            parts.push(...qn.choiceDeepDive.filter((x: unknown) => typeof x === 'string'));
          const blob = stripImageTags(parts.join('\n'));
          if (!blob.trim()) continue;
          const title = `過去問・一問一答 · ${subject} › ${field} · 問${qi + 1}`;
          pushCandidate(candidates, '問題データ', title, blob, tokens, fullNormalized, 6000);
        }
      }
    }

    for (const [key, articles] of Object.entries(STATUTES || {})) {
      const law = STATUTE_LAW_LABEL[key] || key;
      if (!Array.isArray(articles)) continue;
      for (const art of articles) {
        if (!art || typeof art !== 'object') continue;
        const t = `${art.title || ''}\n${art.content || ''}`;
        if (!t.trim()) continue;
        const bonus = statuteChunkBonus(law, tokens);
        pushCandidate(
          candidates,
          '条文データ',
          `${law} · ${(art.title || '').split('\n')[0]}`,
          t,
          tokens,
          fullNormalized,
          3500,
          bonus
        );
      }
    }
  } catch (e) {
    console.warn('chatKnowledgeSearch: questions import failed', e);
  }

  return mergeChunksForModel(candidates, 22, 18000);
}
