import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getAllWrongQuestionEntries, getQuestionTextHash, type WrongQuestionListEntry } from '@/utils/question-stats';
import { findQuizQuestionIndexByTextHash } from '@/utils/quiz-resolve-index';
import { getStickyNotes } from '@/utils/sticky-notes';
import { setDeepdiveParams } from '@/src/deepdiveState';
import { TAC_BONUS_QUESTIONS } from '@/src/tac_bonus_questions';
import { GOUKAKU_MOSHI_ROUND3_BONUS_QUESTIONS } from '@/src/goukaku_moshi_round3_bonus_questions';
import {
  MOSHI_COMPLETE_INPUT_STORAGE_KEY,
  buildMoshiThreePointSet,
  type MoshiBonusQuestionDraft,
  type MoshiImportPage,
  type MoshiPlusCard,
  type MoshiSavedInput,
  type MoshiTextbookChapter,
} from '@/utils/moshi-complete-input';

const C = {
  bg: '#F4F1EA',
  paper: '#FFFCF4',
  panel: '#FFFFFF',
  ink: '#2F2A24',
  muted: '#6F665C',
  line: '#D8CFC0',
  accent: '#2F7D7A',
  accentSoft: '#DDF2EF',
  warn: '#A14D2A',
  warnSoft: '#F8E6DB',
  gold: '#8A6A1F',
  goldSoft: '#FFF5CF',
};

const LEARN_SCOPES = [
  '基礎法学',
  '憲法',
  '行政法総論',
  '行政手続法',
  '行政不服審査法',
  '行政事件訴訟法',
  '国家賠償法',
  '地方自治法',
  '行政法総合',
  '民法総則',
  '民法物権',
  '債権総論',
  '債権各論',
  '家族法',
  '商法・会社法',
  '基礎知識',
  '多肢選択:憲法',
  '多肢選択:行政法',
  '民法記述',
  '行政法記述',
];

const TAC_NEW_KNOWLEDGE = [
  {
    title: '令和8年4月 民法親族改正',
    subject: '家族法',
    badge: '最優先',
    body: '離婚後共同親権、財産分与5年、夫婦間契約取消し廃止をまとめて確認する。',
    action: '家族法の改正カードを読み、旧法との比較表で固定する。',
  },
  {
    title: '最判令5.10.25 性同一性障害法',
    subject: '憲法',
    badge: '判例',
    body: '外形要件の違憲方向。記述・穴埋めで条文趣旨と審査密度が狙われる。',
    action: '憲法の令和判例章に追加し、判例ピン化する。',
  },
  {
    title: '最判令5.9.4 国の関与',
    subject: '地方自治法',
    badge: '判例',
    body: '国の関与は必要最小限度。地方自治の本旨と是正指示の距離感を整理する。',
    action: '地方自治法の関与比較表と接続する。',
  },
  {
    title: '秩序罰の主体と手続',
    subject: '地方自治法',
    badge: '比較',
    body: '国の機関は非訟事件手続法で裁判所、地方公共団体の長は地方自治法系で整理する。',
    action: '行政罰の比較表に「行政刑罰・秩序罰・過料」を並べる。',
  },
  {
    title: '個情法26条・33条',
    subject: '基礎知識',
    badge: '条文',
    body: '漏えい報告は常に即時ではない。開示方法は本人請求の方法が原則。',
    action: '基礎知識の通常問題と見て聞くカードで反復する。',
  },
  {
    title: 'AI推進法18条',
    subject: '基礎知識',
    badge: '新法',
    body: '基本計画、本部、国際協力、人材育成を混同しない。',
    action: 'AI推進法だけの短い時事章を作る。',
  },
  {
    title: '管理不全空家・指定管理鳥獣',
    subject: '基礎知識',
    badge: '時事',
    body: '空き家法令と鳥獣管理は、用語の正確性で点差が出る。',
    action: '一般知識の時事カードとして同日に復習する。',
  },
];

const TAC3_MARKSHEET_READING = {
  examId: 'TAC第3回',
  sourceImages: [
    'app/textbook/俺の解答用紙/TAC3/PXL_20260629_064838258.jpg',
    'app/textbook/俺の解答用紙/TAC3/PXL_20260629_064842972.jpg',
  ],
  gradingSummary: {
    status: '暫定採点（赤文字除外・本人マーク再読取）',
    confirmedQuestions: 15,
    confirmedCorrect: 9,
    confirmedScore: 36,
    scoreNote: '択一4点換算。本人マークは問1〜40・47〜60まで再読取済み。正解番号が確実に突合できた15問だけ点数化し、記述式は答案本文の目視確認待ち。',
  },
  confirmedGrading: [
    '問2 基礎法学: あなた2 / 正解2 ○',
    '問4 憲法: あなた5 / 正解5 ○',
    '問5 憲法: あなた2 / 正解1 ×',
    '問8 行政法: あなた2 / 正解1 ×',
    '問9 行政法: あなた2 / 正解3 ×',
    '問13 行政法: あなた4 / 正解4 ○',
    '問17 行政法: あなた3 / 正解1 ×',
    '問19 行政法: あなた2 / 正解2 ○',
    '問27 民法: あなた5 / 正解3 ×',
    '問31 民法: あなた2 / 正解2 ○',
    '問32 民法: あなた5 / 正解2 ×',
    '問57 基礎知識: あなた5 / 正解5 ○',
    '問58 基礎知識: あなた1 / 正解1 ○',
    '問59 基礎知識: あなた2 / 正解2 ○',
    '問60 基礎知識: あなた5 / 正解5 ○',
  ],
  subjectGrading: [
    '基礎法学: 1/1',
    '憲法: 1/2',
    '行政法: 2/5',
    '民法: 1/3',
    '基礎知識: 4/4',
  ],
  markAnswersLaw: [
    '問1〜10: 2 / 2 / 2 / 5 / 2 / 5 / 2 / 2 / 2 / 5',
    '問11〜20: 2 / 3 / 4 / 2 / 2 / 3 / 3 / 2 / 2 / 5',
    '問21〜30: 2 / 2 / 4 / 2 / 2 / 4 / 5 / 4 / 2 / 5',
    '問31〜40: 2 / 5 / 2 / 4 / 2 / 1 / 1 / 1 / 1 / 5',
  ],
  markAnswersKnowledge: [
    '問47〜51: 3 / 3 / 5 / 2 / 5',
    '問52〜56: 5 / 5 / 2 / 4 / 1',
    '問57〜60: 5 / 1 / 2 / 5',
  ],
  highConfidenceAnswers: [
    '問1: 2',
    '問2: 2',
    '問3: 2',
    '問4: 5',
    '問5: 2',
    '問6: 5',
    '問7: 2',
    '問8: 2',
    '問9: 2',
    '問11: 2',
    '問12: 3',
    '問13: 4',
    '問15: 2',
    '問17: 3',
    '問18: 2',
    '問19: 2',
    '問21: 2',
    '問22: 2',
    '問23: 4',
    '問24: 2',
    '問25: 2',
    '問26: 4',
    '問27: 5',
    '問28: 4',
    '問31: 2',
    '問32: 5',
    '問33: 2',
    '問34: 4',
    '問38: 1',
    '問39: 1',
    '問47〜60: 3 / 3 / 5 / 2 / 5 / 5 / 5 / 2 / 4 / 1 / 5 / 1 / 2 / 5',
  ],
  lowConfidenceAnswers: [
    '問10: 5',
    '問14: 2',
    '問16: 3',
    '問20: 5',
    '問29: 2',
    '問30: 5',
    '問35: 2',
    '問36: 1',
    '問37: 1',
    '問40: 5',
  ],
  needsManualCheck: [
    '赤文字・赤ペン由来の画素は本人解答として扱わず、黒い塗りマークだけで再読取。',
    '問10・14・16・20・29・30・35〜37・40は薄い/周辺ノイズがあり、本人マークとしては読めるが目視確認推奨。',
    '問41〜43の多肢選択は、20択グリッドの列歪みが大きく、今回の点数には入れない。',
    '問44〜46の記述はOCRが断片的で採点不能。本文を目視で読める画像が必要。',
    '正解番号は解答解説OCRだけでは全問の自動抽出に失敗。確実に突合できた問だけ採点し、残りは要確認として残す。',
  ],
};

const TAC3_WEAKNESS_CHAPTERS = [
  {
    title: '基礎法学は「時代」と「訴訟原則」を分けて覚える',
    subject: '基礎法学',
    badge: 'TAC3',
    body: '法制史は、明治初期のオランダ法学、ボアソナード、法典論争、戦後のアメリカ法影響を時系列で固定する。訴訟原則は、民事訴訟の処分権主義・弁論主義・自由心証主義、刑事訴訟の違法収集証拠排除と疑わしきは被告人の利益を分ける。',
    memory: '次は「明治初期はオランダ・民法はボアソナード・訴訟は民事3原則/刑事2原則」と唱えてから肢を見る。',
  },
  {
    title: '憲法人権は判例名より判断軸を先に置く',
    subject: '憲法',
    badge: 'TAC3',
    body: '政教分離は目的効果基準、選挙権は外国人地方参政権・在外国民選挙権・投票価値格差、公務員労働基本権は地位の特殊性・職務の公共性・代替措置で整理する。',
    memory: '次は「政教分離=目的と効果」「選挙=保障される主体と制限理由」「公務員労働=特殊性と代替措置」を先にメモする。',
  },
  {
    title: '行政法は条文手続の「主体・タイミング・例外」を固定する',
    subject: '行政法総合',
    badge: 'TAC3',
    body: '行政手続法、不服審査法、事件訴訟法は、似た語句で落としやすい。通知・理由提示・参加・執行停止・事情判決は、誰が、いつ、どの効果を出すかで読む。',
    memory: '次は条文名を見たら、主体、時期、できる/できない、事後救済の4マスに分ける。',
  },
  {
    title: '民法は物権・時効・不法行為を「要件表」で読む',
    subject: '民法',
    badge: 'TAC3',
    body: '解答用紙読取では問27・28付近のマークが比較的明瞭。心裡留保・時効・相隣・法定地上権・不法行為は、結論だけでなく第三者、完成後の承認、土地建物の時点、損害の分担を分ける。',
    memory: '次は「誰に対抗するか」「いつ完成したか」「土地と建物が同一所有だったか」「損害を誰に割るか」を先に確認する。',
  },
  {
    title: '基礎知識は新法・個情法・文章理解を別腹で取る',
    subject: '基礎知識',
    badge: 'TAC3',
    body: '一般知識は、個人情報保護法の開示・訂正・利用停止、AI推進法、文章理解の接続語・並べ替えが点差になる。読取未確定のため、まず論点カードで取りこぼしを防ぐ。',
    memory: '次は「個情法=本人請求と行政機関の義務」「文章理解=接続語と指示語」を見てから選択肢へ入る。',
  },
];

/** 合格革命第3回（合格３）— 採点・弱点。原文転載なし。 */
const GOUKAKU3_MARKSHEET_READING = {
  examId: '合格革命第3回',
  sourceImages: [
    'app/textbook/俺の解答用紙/合格３/PXL_20260713_082415916.jpg',
    'app/textbook/俺の解答用紙/合格３/PXL_20260713_082418530.jpg',
    'app/textbook/俺の解答用紙/合格３/PXL_20260713_082425720.jpg',
  ],
  gradingSummary: {
    status: '見直し後・暫定採点',
    confirmedQuestions: 54,
    confirmedCorrect: 29,
    confirmedScore: 132,
    scoreNote:
      '択一96＋多肢16＋一般知識20＝記述除く132点。記述暫定52で総合184/300。法令はクリア、一般知識20は足切り目安24未満。',
  },
  subjectGrading: [
    '基礎法学 1/2',
    '憲法 4/5',
    '行政法 13/19',
    '民法 6/9',
    '商法 0/5',
    '一般知識 5/14',
  ],
  confirmedGrading: [
    '法令択一: 24/40（96点）',
    '多肢: 8/12スロット（16点）※問41ア・イは要目視',
    '記述暫定: 44=20 / 45=18 / 46=14（52点）',
    '一般知識: 5/14（20点）',
  ],
  markAnswersLaw: [
    '問1〜10: 5 / 4 / 4 / 2 / 4 / 2 / 3 / 5 / 3 / 2',
    '問11〜20: 2 / 1 / 2 / 1 / 5 / 4 / 3 / 4 / 4 / 3',
    '問21〜30: 4 / 5 / 2 / 5 / 1 / 3 / 1 / 3 / 5 / 2',
    '問31〜40: 1 / 3 / 2 / 1 / 1 / 5 / 2 / 4 / 3 / 2',
  ],
  markAnswersKnowledge: [
    '問47〜53: 4 / 3 / 3 / 2 / 5 / 4 / 5',
    '問54〜60: 1 / 3 / 2 / 1 / 3 / 5 / 4',
  ],
  wrongLaw: [
    '問1 罪刑法定（あなた5 / 正解4）',
    '問5 国会の最高機関（あなた4 / 正解2）',
    '問12 聴聞の許可（あなた1 / 正解3）',
    '問16 不服審査会（あなた4 / 正解3）',
    '問19 申請型義務付け（あなた4 / 正解2）',
    '問20 パトカー追跡（あなた3 / 正解4）',
    '問21 国賠2条・異常用法（あなた4 / 正解1）',
    '問26 情報公開・非相続（あなた3 / 正解1）',
    '問28 代理・顕名（あなた3 / 正解1）',
    '問32 相殺×時効（あなた3 / 正解5）',
    '問33 請負・契約不適合（あなた2 / 正解5）',
    '問36〜40 商法全滅（0/5）',
  ],
  wrongKnowledge: [
    '問48〜51 時事系（行政改革・バブル・財投・脱炭素）',
    '問53 日本行政書士会連合会',
    '問54 住民基本台帳',
    '問55 情報セキュリティ用語',
    '問57 個人情報保護法',
    '問60 文章理解',
  ],
  needsManualCheck: [
    '問41ア・イは写真端で切れ気味。ウ・エ（17・6）は正解確定。',
    '記述は採点者裁量あり。見直し後は44=20 / 45=18 / 46=14。',
    '模試本文・肢の全文は転載せず、論点カードと自作ボーナスで復習する。',
  ],
};

const GOUKAKU3_WEAKNESS_CHAPTERS = [
  {
    title: '商法は「5本柱」を暗唱してから肢を見る',
    subject: '商法・会社法',
    badge: '合格３・S',
    body: '今回0/5。商業登記は登記後でも正当事由ある第三者には対抗不可。設立時の現物出資は発起人だけ。共有株式は権利行使者1人／自己株式に配当なし。監査役差止めは法令定款違反＋著しい損害のおそれ。金銭分配請求権なしの現物配当は特別決議。',
    memory: '正当事由／発起人現物／共有・自己株／監査役差止／現物配当特別決議。これだけで＋20点級。',
  },
  {
    title: '行訴・手続は「申請型」と「許可要否」で切る',
    subject: '行政法総合',
    badge: '合格３・S',
    body: '申請型義務付けに「重大な損害」要件はない（非申請型・差止め側の話）。聴聞では代理人・閲覧・陳述書は主宰者許可不要、補佐人は許可を意識。不服審査会は資料提出要求・説明要求ができる。',
    memory: '申請型≠重大損害。代理人・閲覧・陳述書＝許可不要。審査会＝見るだけではない。',
  },
  {
    title: '国賠は枠で切る（追跡＝総合、2条＝通常利用）',
    subject: '国家賠償法',
    badge: '合格３・S',
    body: 'パトカー追跡事故＝即違法ではない。必要性・態様・危険性の総合。営造物は通常の安全性が基準で、異常用法なら瑕疵否定があり得る。',
    memory: '追跡は総合判断。2条は通常利用か異常用法か。',
  },
  {
    title: '民法は顕名・時効相殺・請負不適合を型で固定',
    subject: '民法',
    badge: '合格３・S',
    body: '顕名なしは原則として代理人自身の行為。時効完成前から相殺適状なら救済、時効後に取得した自働債権は不可。請負も契約不適合が重大なら報酬全額拒絶があり得る。',
    memory: '顕名必須。508条は完成前適状。請負不適合＝報酬拒絶があり得る。',
  },
  {
    title: '憲法・基礎法学は美称と罪刑法定を落とさない',
    subject: '憲法',
    badge: '合格３・A',
    body: '国会の最高機関性は政治的美称で、内閣・裁判所を法的に支配する意味ではない。刑事は法律なければ罰しない。民事の条理を刑事に持ち込まない。',
    memory: '最高機関＝美称。刑事＝罪刑法定。',
  },
  {
    title: '一般知識は制度系を先に固めて足切りを安定させる',
    subject: '基礎知識',
    badge: '合格３・B',
    body: '時事ブレより、住基台帳の整備・適正管理、個情法の仮名加工と匿名加工の入れ替え、日本行政書士会連合会の監督・登録、情報セキュリティ用語の入れ替えを先に取る。',
    memory: '住基・個情法・行書会・用語。時事は後回しでよい。',
  },
];

const GOUKAKU3_PRIORITY_QUESTION_IDS = [36, 37, 38, 39, 40, 19, 12, 28, 21, 1, 5, 16, 20, 26, 32, 33, 54, 57, 53, 55];
function compactText(value: string, limit = 150): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function learnSubjectFor(entry: WrongQuestionListEntry): string {
  if (entry.subject === '多肢選択') return '多肢選択';
  if (entry.field && entry.field !== 'past') return entry.field;
  return entry.subject;
}

function buildChapterTitle(entry: WrongQuestionListEntry): string {
  const subject = learnSubjectFor(entry);
  if (entry.wrong >= 2) return `${subject}の最優先復習`;
  return `${subject}の確認章`;
}

function extractIssueText(entry: WrongQuestionListEntry): string {
  return compactText(entry.previewText, 260)
    .replace(/^【[^】]+】/, '')
    .replace(/次の記述のうち、?/, '')
    .trim();
}

function buildTextbookSections(entry: WrongQuestionListEntry) {
  const subject = learnSubjectFor(entry);
  const issue = extractIssueText(entry);
  const isHeavy = entry.wrong >= 2;

  return {
    headline: isHeavy
      ? `${subject}で何度も落としている論点を、1章として固める`
      : `${subject}で一度つまずいた論点を、短い章にして確認する`,
    focus: issue || `${entry.subject} / ${entry.field} の誤答論点`,
    core: [
      '問題文を読むときは、まず「誰が」「何を」「どの条文・判例の要件で」判断するのかを分ける。',
      '正誤判断では、結論だけでなく、主語・対象・時期・例外のどれがずれているかを見る。',
      isHeavy
        ? '同じ論点で複数回間違えているため、暗記カードではなく、要件表と反対肢までセットで読む。'
        : '一度の誤答でも、似た肢に広がりやすい論点なら、周辺知識まで一緒に読む。',
    ],
    traps: [
      '「原則」と「例外」の位置を逆に読む。',
      '条文番号だけ覚えて、適用場面を取り違える。',
      '判例の結論だけ覚えて、理由付けや利益衡量を落とす。',
    ],
    next: [
      `${subject}の関連カードを読み、同じ言葉が出るカードに付箋を付ける。`,
      '誤答問題に戻る前に、要件を3行で言い換える。',
      '再挑戦後、間違えた理由を「主語」「要件」「例外」「時期」のどれかでメモする。',
    ],
  };
}

function buildWrongQuestionDeepdive(entry: WrongQuestionListEntry): string {
  const chapter = buildTextbookSections(entry);
  return [
    `# ${buildChapterTitle(entry)}`,
    `## 間違えた問題`,
    entry.previewText,
    `## もっと深掘る`,
    chapter.headline,
    `### この問題の見方`,
    chapter.core.map((line) => `- ${line}`).join('\n'),
    `### 失点しやすい罠`,
    chapter.traps.map((line) => `- ${line}`).join('\n'),
    `### 次の復習アクション`,
    chapter.next.map((line, index) => `${index + 1}. ${line}`).join('\n'),
  ].join('\n\n');
}

function buildMoshiDeepdive(
  chapter: MoshiTextbookChapter,
  plusCard?: MoshiPlusCard,
  bonusDraft?: MoshiBonusQuestionDraft
): string {
  const reviewLines = buildMoshiReviewLines(chapter, bonusDraft);
  return [
    `# TAC2 問${chapter.questionId}から作る${chapter.subject}章`,
    `## 間違えた過去問`,
    chapter.sourceQuestionText || chapter.focus,
    `## 問題を振り返る`,
    reviewLines.map((line) => `- ${line}`).join('\n'),
    `## もっと深掘る`,
    chapter.reason,
    `### 圧縮知識`,
    plusCard?.text || chapter.focus,
    `### 復習チャンク`,
    '- 問題文の主語、要件、効果、例外を分ける。',
    '- 正解肢だけでなく、誤った選択肢がどの言葉で崩れるかを確認する。',
    '- 次回は同じ論点を、問題形式を変えて解き直す。',
    bonusDraft
      ? `### 再演習問題候補\n${bonusDraft.prompt}\n\n${bonusDraft.explain}`
      : '',
    plusCard?.deepdive ? `### 追加解説\n${plusCard.deepdive}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

function buildMoshiReviewLines(chapter: MoshiTextbookChapter, bonusDraft?: MoshiBonusQuestionDraft): string[] {
  const answer = chapter.answer || '未確定';
  const userAnswer = chapter.userAnswer || '未読取';
  const statusText = chapter.status === 'wrong' ? '誤答' : '要確認';
  const lines = [
    `状態: ${statusText}`,
    `正解: ${answer} / てらしぃの選択: ${userAnswer}`,
    '問題文を、主語・要件・効果・例外・時期に分けて読み直す。',
    '選んだ肢が崩れる語句と、正解肢を支える語句を1つずつ拾う。',
    `復習チャンク候補: ${chapter.field} / ${chapter.focus}`,
  ];
  if (bonusDraft) {
    lines.push(`再演習候補: ${bonusDraft.prompt}`);
  }
  return lines;
}

type StickyScope = {
  scope: string;
  count: number;
};

type TacBonusTextbookChapter = {
  id: string;
  source: string;
  sourceQuestionId?: number;
  subject: string;
  field: string;
  title: string;
  questionText: string;
  choices: string[];
  answerLabels: string;
  explain: string;
  deepdive: string;
};

function tacSourceOfQuestion(question: any): string {
  const sourceText = `${question?.memo || ''} ${question?.text || ''}`;
  if (sourceText.includes('合格革命第3回') || sourceText.includes('合格革命第３回')) return '合格革命第3回';
  if (sourceText.includes('TAC第3回') || sourceText.includes('TAC3')) return 'TAC第3回';
  if (sourceText.includes('TAC第2回') || sourceText.includes('TAC2')) return 'TAC第2回';
  return 'TAC第1回';
}

function toHalfWidthDigits(value: string): string {
  return value.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

function tacSourceQuestionId(question: any): number | undefined {
  if (typeof question?.sourceQuestionId === 'number') return question.sourceQuestionId;
  const sourceText = `${question?.memo || ''} ${question?.explain || ''} ${question?.text || ''}`;
  const match = sourceText.match(/問\s*([0-9０-９]{1,2})|問([0-9０-９]{1,2})系/);
  const raw = match?.[1] || match?.[2];
  if (!raw) return undefined;
  const parsed = Number(toHalfWidthDigits(raw));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildTacBonusTextbookChapters(): TacBonusTextbookChapter[] {
  const chapters: TacBonusTextbookChapter[] = [];
  const sources: Array<Record<string, Record<string, any[]>>> = [
    TAC_BONUS_QUESTIONS as Record<string, Record<string, any[]>>,
    GOUKAKU_MOSHI_ROUND3_BONUS_QUESTIONS as Record<string, Record<string, any[]>>,
  ];
  sources.forEach((bank) => {
    Object.entries(bank).forEach(([subject, fields]) => {
      Object.entries(fields).forEach(([field, questions]) => {
        questions.forEach((question, index) => {
          const source = tacSourceOfQuestion(question);
          const sourceQuestionId = tacSourceQuestionId(question);
          const answerLabels = Array.isArray(question.answer)
            ? question.answer.map((answerIndex: number) => `${answerIndex + 1}`).join('・')
            : '未設定';
          const firstDeepdive = Array.isArray(question.choiceDeepDive)
            ? String(question.choiceDeepDive.find((body: string) => body && body.trim()) || '')
            : '';
          chapters.push({
            id: `${source}-${subject}-${field}-${sourceQuestionId ? `q${sourceQuestionId}` : index}-${index}`,
            source,
            sourceQuestionId,
            subject,
            field,
            title: sourceQuestionId ? `${source} 問${sourceQuestionId} ${field} ボーナス問題` : `${source} ${field} ボーナス問題`,
            questionText: String(question.text || ''),
            choices: Array.isArray(question.choices) ? question.choices.map((choice: unknown) => String(choice)) : [],
            answerLabels,
            explain: String(question.explain || ''),
            deepdive: firstDeepdive || buildTacBonusTextbookDeepdive({
              id: '',
              source,
              sourceQuestionId,
              subject,
              field,
              title: '',
              questionText: String(question.text || ''),
              choices: Array.isArray(question.choices) ? question.choices.map((choice: unknown) => String(choice)) : [],
              answerLabels,
              explain: String(question.explain || ''),
              deepdive: '',
            }),
          });
        });
      });
    });
  });

  const rank: Record<string, number> = { 合格革命第3回: 0, TAC第3回: 1, TAC第2回: 2, TAC第1回: 3 };
  return chapters.sort(
    (a, b) =>
      (rank[a.source] ?? 9) - (rank[b.source] ?? 9) ||
      (a.sourceQuestionId ?? 999) - (b.sourceQuestionId ?? 999) ||
      a.subject.localeCompare(b.subject)
  );
}

function buildTacBonusTextbookDeepdive(chapter: TacBonusTextbookChapter): string {
  const choices = chapter.choices
    .map((choice, index) => `${index + 1}. ${choice}`)
    .join('\n');
  const deepdiveBody = chapter.deepdive?.trim() || chapter.explain;
  return [
    `# ${chapter.title}`,
    '',
    '## ボーナスステージの問題',
    chapter.questionText,
    '',
    choices,
    '',
    `正解: ${chapter.answerLabels}`,
    '',
    '## 元問メモ',
    chapter.sourceQuestionId ? `${chapter.source} 問${chapter.sourceQuestionId}系の論点を、文章と肢を作り直して再演習化。` : `${chapter.source}の論点を、文章と肢を作り直して再演習化。`,
    '',
    '## もっと深掘る',
    deepdiveBody,
    '',
    '## 図解',
    '```text',
    `${chapter.source}`,
    '  ↓ 論点を抽出',
    `${chapter.subject} / ${chapter.field}`,
    '  ↓ 主語・要件・例外をチェック',
    '正解肢と誤答肢を分ける',
    '  ↓',
    '君の教科書で反復 → ボーナスステージで再演習',
    '```',
    '',
    '## 復習チャンク',
    '- 正解肢の根拠語を1つ拾う。',
    '- 誤答肢の崩れる語を1つ拾う。',
    '- 似た論点を見て聞いて覚えるカードで確認する。',
  ].join('\n');
}

function findImportPage(pages: MoshiImportPage[] | undefined, questionId: number): MoshiImportPage | undefined {
  return Array.isArray(pages) ? pages.find((page) => page.index === questionId) : undefined;
}

function buildMoshiImportLines(savedInput: MoshiSavedInput | null, questionId: number): string[] {
  if (!savedInput) {
    return ['OCR結果JSON未読込。模試完全インプットでJSONを読み込むと、元画像ページ情報まで君の教科書に反映される。'];
  }
  const questionPage = findImportPage(savedInput.pages?.questions, questionId);
  const answerPage = findImportPage(savedInput.pages?.answers, questionId);
  return [
    `試験ID: ${savedInput.examId || '未設定'}`,
    `問題元画像: ${questionPage ? `${questionPage.file}（page ${questionPage.index}）` : '未登録または画像未検出'}`,
    `解答画像: ${answerPage ? `${answerPage.file}（page ${answerPage.index}）` : '未登録または画像未検出'}`,
    `取込枚数: 問題${savedInput.counts?.questionImages ?? 0}枚 / 解答${savedInput.counts?.answerImages ?? 0}枚`,
  ];
}

export default function KimiTextbookScreen() {
  const [wrongEntries, setWrongEntries] = useState<WrongQuestionListEntry[]>([]);
  const [stickyScopes, setStickyScopes] = useState<StickyScope[]>([]);
  const [moshiChapters, setMoshiChapters] = useState<MoshiTextbookChapter[]>([]);
  const [moshiPlusCards, setMoshiPlusCards] = useState<MoshiPlusCard[]>([]);
  const [moshiBonusDrafts, setMoshiBonusDrafts] = useState<MoshiBonusQuestionDraft[]>([]);
  const [moshiSavedInput, setMoshiSavedInput] = useState<MoshiSavedInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('すべて');
  const [openChapterKey, setOpenChapterKey] = useState<string | null>(null);
  const [openMistakeKey, setOpenMistakeKey] = useState<string | null>(null);
  const [openingQuestionKey, setOpeningQuestionKey] = useState<string | null>(null);
  const [openingTacBonusKey, setOpeningTacBonusKey] = useState<string | null>(null);
  const tacBonusChapters = useMemo(() => buildTacBonusTextbookChapters(), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const entries = await getAllWrongQuestionEntries();
      setWrongEntries(entries);
      const savedMoshi = await AsyncStorage.getItem(MOSHI_COMPLETE_INPUT_STORAGE_KEY);
      if (savedMoshi) {
        const parsed = JSON.parse(savedMoshi) as MoshiSavedInput;
        const threePointSet = buildMoshiThreePointSet(Array.isArray(parsed.questions) ? parsed.questions : []);
        setMoshiSavedInput(parsed);
        setMoshiChapters(threePointSet.textbookChapters);
        setMoshiPlusCards(threePointSet.plusCards);
        setMoshiBonusDrafts(threePointSet.bonusQuestions);
      } else {
        setMoshiSavedInput(null);
        setMoshiChapters([]);
        setMoshiPlusCards([]);
        setMoshiBonusDrafts([]);
      }
      const scopes = LEARN_SCOPES
        .map((scope) => ({ scope, count: getStickyNotes(scope).length }))
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count || a.scope.localeCompare(b.scope));
      setStickyScopes(scopes);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const subjectFilters = useMemo(() => {
    const subjects = new Set<string>();
    wrongEntries.forEach((entry) => subjects.add(learnSubjectFor(entry)));
    moshiChapters.forEach((chapter) => subjects.add(chapter.subject));
    moshiPlusCards.forEach((card) => subjects.add(card.subject));
    moshiBonusDrafts.forEach((draft) => subjects.add(draft.subject));
    tacBonusChapters.forEach((chapter) => subjects.add(chapter.subject));
    stickyScopes.forEach((item) => subjects.add(item.scope.replace('多肢選択:', '多肢選択 ')));
    TAC_NEW_KNOWLEDGE.forEach((item) => subjects.add(item.subject));
    GOUKAKU3_WEAKNESS_CHAPTERS.forEach((item) => subjects.add(item.subject));
    return ['すべて', ...Array.from(subjects).sort()];
  }, [moshiBonusDrafts, moshiChapters, moshiPlusCards, tacBonusChapters, wrongEntries, stickyScopes]);

  const filteredWrongEntries = useMemo(() => {
    if (selectedSubject === 'すべて') return wrongEntries;
    return wrongEntries.filter((entry) => learnSubjectFor(entry) === selectedSubject);
  }, [wrongEntries, selectedSubject]);

  const filteredTacItems = useMemo(() => {
    if (selectedSubject === 'すべて') return TAC_NEW_KNOWLEDGE;
    return TAC_NEW_KNOWLEDGE.filter((item) => item.subject === selectedSubject);
  }, [selectedSubject]);

  const filteredMoshiChapters = useMemo(() => {
    if (selectedSubject === 'すべて') return moshiChapters;
    return moshiChapters.filter((chapter) => chapter.subject === selectedSubject);
  }, [moshiChapters, selectedSubject]);

  const displayedMoshiChapters = useMemo(() => {
    const priority = filteredMoshiChapters.filter((chapter) => chapter.questionId === 35);
    const rest = filteredMoshiChapters.filter((chapter) => chapter.questionId !== 35).slice(0, 10);
    return [...priority, ...rest].filter(
      (chapter, index, self) => self.findIndex((item) => item.id === chapter.id) === index
    );
  }, [filteredMoshiChapters]);

  const filteredMoshiPlusCards = useMemo(() => {
    if (selectedSubject === 'すべて') return moshiPlusCards;
    return moshiPlusCards.filter((card) => card.subject === selectedSubject);
  }, [moshiPlusCards, selectedSubject]);

  const filteredMoshiBonusDrafts = useMemo(() => {
    if (selectedSubject === 'すべて') return moshiBonusDrafts;
    return moshiBonusDrafts.filter((draft) => draft.subject === selectedSubject);
  }, [moshiBonusDrafts, selectedSubject]);

  const filteredTacBonusChapters = useMemo(() => {
    if (selectedSubject === 'すべて') return tacBonusChapters;
    return tacBonusChapters.filter((chapter) => chapter.subject === selectedSubject);
  }, [selectedSubject, tacBonusChapters]);

  const tacQuestion35Chapter = useMemo(
    () => tacBonusChapters.find((chapter) => chapter.source === 'TAC第2回' && chapter.sourceQuestionId === 35),
    [tacBonusChapters]
  );
  const tacQuestion35ImportLines = useMemo(
    () => buildMoshiImportLines(moshiSavedInput, 35),
    [moshiSavedInput]
  );
  const goukaku3PriorityChapters = useMemo(
    () =>
      tacBonusChapters.filter(
        (chapter) =>
          chapter.source === '合格革命第3回' &&
          typeof chapter.sourceQuestionId === 'number' &&
          GOUKAKU3_PRIORITY_QUESTION_IDS.includes(chapter.sourceQuestionId)
      ),
    [tacBonusChapters]
  );
  const goukaku3AllChapters = useMemo(
    () => tacBonusChapters.filter((chapter) => chapter.source === '合格革命第3回'),
    [tacBonusChapters]
  );
  const filteredGoukaku3Weakness = useMemo(
    () =>
      GOUKAKU3_WEAKNESS_CHAPTERS.filter(
        (chapter) => selectedSubject === 'すべて' || selectedSubject === chapter.subject
      ),
    [selectedSubject]
  );
  const filteredGoukaku3Priority = useMemo(() => {
    if (selectedSubject === 'すべて') return goukaku3PriorityChapters;
    return goukaku3PriorityChapters.filter((chapter) => chapter.subject === selectedSubject);
  }, [goukaku3PriorityChapters, selectedSubject]);

  const topWrong = filteredWrongEntries.slice(0, 8);
  const heavyWrongCount = wrongEntries.filter((entry) => entry.wrong >= 2).length;

  const openLearnReference = (entry: WrongQuestionListEntry) => {
    const subject = learnSubjectFor(entry);
    if (entry.subject === '多肢選択' && entry.field) {
      router.push({ pathname: '/learn/[subject]', params: { subject: '多肢選択', field: entry.field } });
      return;
    }
    router.push({ pathname: '/learn/[subject]', params: { subject } });
  };

  const openWrongQuestion = async (entry: WrongQuestionListEntry) => {
    const key = `${entry.subject}-${entry.field}-${entry.textHash}`;
    setOpeningQuestionKey(key);
    try {
      const found = await findQuizQuestionIndexByTextHash(entry.subject, entry.field, entry.textHash, 'past');
      if (!found) {
        Alert.alert(
          '問題が見つかりません',
          'シート更新で問題文が変わった、または出題対象外になった可能性があります。'
        );
        return;
      }
      router.push({
        pathname: '/question',
        params: {
          subject: entry.subject,
          field: entry.field,
          index: String(found.index),
          mode: found.mode,
        },
      });
    } finally {
      setOpeningQuestionKey(null);
    }
  };

  const openWrongQuestionDeepdive = (entry: WrongQuestionListEntry) => {
    setDeepdiveParams(buildWrongQuestionDeepdive(entry), '君の教科書', {
      quizSubject: entry.subject,
      quizField: entry.field,
      screenTitle: '君の教科書のもっと深掘る',
    });
    router.push('/deepdive');
  };

  const openMoshiDeepdive = (chapter: MoshiTextbookChapter) => {
    const plusCard = moshiPlusCards.find((card) => card.questionId === chapter.questionId);
    const bonusDraft = moshiBonusDrafts.find((draft) => draft.questionId === chapter.questionId);
    setDeepdiveParams(buildMoshiDeepdive(chapter, plusCard, bonusDraft), `TAC2 問${chapter.questionId}`, {
      screenTitle: '模試誤答のもっと深掘る',
    });
    router.push('/deepdive');
  };

  const openTacBonusQuestion = async (chapter: TacBonusTextbookChapter) => {
    setOpeningTacBonusKey(chapter.id);
    try {
      const found = await findQuizQuestionIndexByTextHash(
        chapter.subject,
        chapter.field,
        getQuestionTextHash(chapter.questionText),
        'bonus'
      );
      router.push({
        pathname: '/question',
        params: {
          subject: chapter.subject,
          field: chapter.field,
          mode: 'bonus',
          ...(found ? { index: String(found.index) } : {}),
        },
      });
    } finally {
      setOpeningTacBonusKey(null);
    }
  };

  const openTacBonusDeepdive = (chapter: TacBonusTextbookChapter) => {
    setDeepdiveParams(buildTacBonusTextbookDeepdive(chapter), chapter.title, {
      quizSubject: chapter.subject,
      quizField: chapter.field,
      quizMode: 'bonus',
      screenTitle:
        chapter.source === '合格革命第3回'
          ? '合格革命第3回ボーナスのもっと深掘る'
          : 'TACボーナス問題のもっと深掘る',
    });
    router.push('/deepdive');
  };

  const openGoukaku3Learn = (subject: string) => {
    router.push({ pathname: '/learn/[subject]', params: { subject, plus: '1' } });
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: '君の教科書！',
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.ink,
          headerShadowVisible: false,
        }}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="auto-stories" size={34} color={C.accent} />
          </View>
          <View style={styles.heroBody}>
            <Text style={styles.kicker}>Personal Textbook</Text>
            <Text style={styles.title}>君の教科書！</Text>
            <Text style={styles.lead}>
              誤答、付箋、合格革命・TAC模試の新知識から、いま読むべき章だけを束ねます。
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={C.accent} size="large" />
            <Text style={styles.muted}>教科書を組み立てています。</Text>
          </View>
        ) : (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{wrongEntries.length}</Text>
                <Text style={styles.statLabel}>誤答論点</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{heavyWrongCount}</Text>
                <Text style={styles.statLabel}>重点章</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stickyScopes.reduce((sum, item) => sum + item.count, 0)}</Text>
                <Text style={styles.statLabel}>付箋</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{tacBonusChapters.length}</Text>
                <Text style={styles.statLabel}>ボーナス章</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{goukaku3AllChapters.length}</Text>
                <Text style={styles.statLabel}>合格３</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {subjectFilters.map((subject) => {
                const active = selectedSubject === subject;
                return (
                  <Pressable
                    key={subject}
                    onPress={() => setSelectedSubject(subject)}
                    style={[styles.filterChip, active && styles.filterChipActive]}
                  >
                    <Text style={[styles.filterText, active && styles.filterTextActive]}>{subject}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {tacQuestion35Chapter && (selectedSubject === 'すべて' || selectedSubject === tacQuestion35Chapter.subject) ? (
              <View style={[styles.knowledgeCard, styles.priorityCard]}>
                <View style={styles.chapterTop}>
                  <View style={[styles.badge, styles.badgeWarn]}>
                    <Text style={styles.badgeTextWarn}>TAC2 問35</Text>
                  </View>
                  <Text style={styles.chapterSubject}>{tacQuestion35Chapter.subject} / {tacQuestion35Chapter.field}</Text>
                </View>
                <Text style={styles.chapterTitle}>問35のアを特別寄与料の図で復習する</Text>
                <Text style={styles.chapterBody}>
                  相続の特別寄与料。誰が請求できるか、誰に請求するか、寄与分と何が違うかを先に固定します。
                </Text>
                <View style={styles.sourceBox}>
                  <Text style={styles.sourceTitle}>インポート元</Text>
                  {tacQuestion35ImportLines.map((line) => (
                    <Text key={line} style={styles.sourceLine}>・{line}</Text>
                  ))}
                </View>
                <View style={styles.studyBox}>
                  <Text style={styles.studyTitle}>アの図解ポイント</Text>
                  <Text style={styles.studyLine}>主体は「相続人ではない親族」。共同相続人なら寄与分側。</Text>
                  <Text style={styles.studyLine}>効果は「相続人への金銭請求」。遺産を直接取得する話ではない。</Text>
                  <Text style={styles.studyLine}>金額問題は、解答画像ページの読取結果から「特別寄与料総額 × 各相続人の相続分」で負担額を図に落とす。</Text>
                </View>
                <MissedQuestionPanel
                  label="TAC2回目"
                  title="問35の間違えた過去問"
                  meta={`正解 ${tacQuestion35Chapter.answerLabels} / アはもっと深掘るで図解`}
                  questionText={tacQuestion35Chapter.questionText}
                  detailHeading="問35を振り返る"
                  reviewLines={[
                    'ア: 特別寄与料は、相続人ではない親族の無償の療養看護等を救済する。',
                    '主体: 共同相続人ではなく、相続人ではない親族。',
                    '効果: 遺産を直接取得するのではなく、相続人への金銭請求。',
                    '金額: 特別寄与料総額を各相続人の相続分で按分して、誰がいくら負担するかを見る。',
                    ...tacQuestion35ImportLines,
                    '比較: 寄与分は共同相続人、特別寄与料は相続人ではない親族。',
                  ]}
                  opened={openMistakeKey === tacQuestion35Chapter.id}
                  openingQuestion={openingTacBonusKey === tacQuestion35Chapter.id}
                  onToggle={() => setOpenMistakeKey(openMistakeKey === tacQuestion35Chapter.id ? null : tacQuestion35Chapter.id)}
                  onOpenQuestion={() => openTacBonusQuestion(tacQuestion35Chapter)}
                  onOpenDeepdive={() => openTacBonusDeepdive(tacQuestion35Chapter)}
                />
              </View>
            ) : null}


            {selectedSubject === 'すべて' ? (
              <View style={[styles.knowledgeCard, styles.priorityCard]}>
                <View style={styles.chapterTop}>
                  <View style={[styles.badge, styles.badgeWarn]}>
                    <Text style={styles.badgeTextWarn}>{GOUKAKU3_MARKSHEET_READING.examId}</Text>
                  </View>
                  <Text style={styles.chapterSubject}>解答用紙読取 / 伸びしろ分析</Text>
                </View>
                <Text style={styles.chapterTitle}>合格革命第3回から作る復習メモ</Text>
                <Text style={styles.chapterBody}>
                  記述込み暫定184点。商法全滅と行政法・民法の定番取りこぼしが次の伸びしろ。模試本文は転載せず、見て聞いて覚えるカードと自作ボーナスで反復する。
                </Text>
                <View style={styles.sourceBox}>
                  <Text style={styles.sourceTitle}>読取元</Text>
                  {GOUKAKU3_MARKSHEET_READING.sourceImages.map((line) => (
                    <Text key={line} style={styles.sourceLine}>・{line}</Text>
                  ))}
                </View>
                <View style={styles.studyBox}>
                  <Text style={styles.studyTitle}>採点結果</Text>
                  <Text style={styles.studyLine}>
                    {GOUKAKU3_MARKSHEET_READING.gradingSummary.status}: 記述除く{GOUKAKU3_MARKSHEET_READING.gradingSummary.confirmedScore}点 / 記述込み184点
                  </Text>
                  <Text style={styles.studyLine}>{GOUKAKU3_MARKSHEET_READING.gradingSummary.scoreNote}</Text>
                  <Text style={styles.studyTitle}>科目別（法令択一＋一般知識）</Text>
                  <Text style={styles.studyLine}>{GOUKAKU3_MARKSHEET_READING.subjectGrading.join(' / ')}</Text>
                  <Text style={styles.studyTitle}>区分別</Text>
                  {GOUKAKU3_MARKSHEET_READING.confirmedGrading.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>本人マーク読取（問1〜40）</Text>
                  {GOUKAKU3_MARKSHEET_READING.markAnswersLaw.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>本人マーク読取（問47〜60）</Text>
                  {GOUKAKU3_MARKSHEET_READING.markAnswersKnowledge.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>法令誤答</Text>
                  {GOUKAKU3_MARKSHEET_READING.wrongLaw.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>一般知識誤答</Text>
                  {GOUKAKU3_MARKSHEET_READING.wrongKnowledge.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>要目視確認</Text>
                  {GOUKAKU3_MARKSHEET_READING.needsManualCheck.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                </View>
                <View style={styles.actionRow}>
                  <Pressable style={styles.primaryButton} onPress={() => openGoukaku3Learn('商法・会社法')}>
                    <MaterialIcons name="headphones" size={18} color="#fff" />
                    <Text style={styles.primaryButtonText}>商法カードへ（見て聞くぷらす）</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}

            {filteredGoukaku3Weakness.length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>合格革命第3回 苦手分析から作る章</Text>
                  <Text style={styles.sectionCount}>{filteredGoukaku3Weakness.length}章</Text>
                </View>
                {filteredGoukaku3Weakness.map((chapter) => (
                  <View key={chapter.title} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={[styles.badge, styles.badgeWarn]}>
                        <Text style={styles.badgeTextWarn}>{chapter.badge}</Text>
                      </View>
                      <Text style={styles.chapterSubject}>{chapter.subject}</Text>
                    </View>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterBody}>{chapter.body}</Text>
                    <View style={styles.studyBox}>
                      <Text style={styles.studyTitle}>何を覚えれば、次は間違えないか</Text>
                      <Text style={styles.studyLine}>{chapter.memory}</Text>
                    </View>
                    <View style={styles.actionRow}>
                      <Pressable
                        style={styles.primaryButton}
                        onPress={() =>
                          openGoukaku3Learn(
                            chapter.subject === '行政法総合'
                              ? '行政事件訴訟法'
                              : chapter.subject === '民法'
                                ? '民法総則'
                                : chapter.subject
                          )
                        }
                      >
                        <MaterialIcons name="headphones" size={18} color="#fff" />
                        <Text style={styles.primaryButtonText}>見て聞いて覚えるへ</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </>
            ) : null}

            {filteredGoukaku3Priority.length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>合格３ 優先ボーナス再演習</Text>
                  <Text style={styles.sectionCount}>{filteredGoukaku3Priority.length}問</Text>
                </View>
                {filteredGoukaku3Priority.map((chapter) => (
                  <View key={chapter.id} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={[styles.badge, styles.badgeWarn]}>
                        <Text style={styles.badgeTextWarn}>
                          {chapter.sourceQuestionId ? `問${chapter.sourceQuestionId}系` : '合格３'}
                        </Text>
                      </View>
                      <Text style={styles.chapterSubject}>
                        {chapter.subject} / {chapter.field}
                      </Text>
                    </View>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterBody}>{compactText(chapter.questionText, 180)}</Text>
                    <View style={styles.studyBox}>
                      <Text style={styles.studyTitle}>復習の進め方</Text>
                      <Text style={styles.studyLine}>1. 見て聞いて覚えるぷらすで同論点カードを読む。</Text>
                      <Text style={styles.studyLine}>2. 誤答肢の崩れる語を探す。</Text>
                      <Text style={styles.studyLine}>3. ボーナスステージで自作問題を解き直す（原文転載なし）。</Text>
                    </View>
                    <MissedQuestionPanel
                      label="ボーナスステージ"
                      title={`${chapter.field || chapter.subject}の再演習`}
                      meta={`正解 ${chapter.answerLabels} / 模試本文の転載ではなく論点再構成`}
                      questionText={chapter.questionText}
                      detailHeading="自作ボーナスを振り返る"
                      reviewLines={[
                        `正解: ${chapter.answerLabels}`,
                        chapter.explain,
                        '問題文・肢は模試本文の転載ではなく、論点抽出で再構成。',
                      ]}
                      opened={openMistakeKey === chapter.id}
                      openingQuestion={openingTacBonusKey === chapter.id}
                      onToggle={() => setOpenMistakeKey(openMistakeKey === chapter.id ? null : chapter.id)}
                      onOpenQuestion={() => openTacBonusQuestion(chapter)}
                      onOpenDeepdive={() => openTacBonusDeepdive(chapter)}
                    />
                  </View>
                ))}
              </>
            ) : null}

            {selectedSubject === 'すべて' ? (
              <View style={[styles.knowledgeCard, styles.priorityCard]}>
                <View style={styles.chapterTop}>
                  <View style={[styles.badge, styles.badgeWarn]}>
                    <Text style={styles.badgeTextWarn}>{TAC3_MARKSHEET_READING.examId}</Text>
                  </View>
                  <Text style={styles.chapterSubject}>解答用紙読取 / 苦手分析</Text>
                </View>
                <Text style={styles.chapterTitle}>TAC3 解答用紙から作る復習メモ</Text>
                <Text style={styles.chapterBody}>
                  追加画像2枚から赤文字を除外し、黒い塗りマークだけを再読取。正解表OCRで確実に突合できた問だけ採点し、未確定部分は要目視として残します。
                </Text>
                <View style={styles.sourceBox}>
                  <Text style={styles.sourceTitle}>読取元</Text>
                  {TAC3_MARKSHEET_READING.sourceImages.map((line) => (
                    <Text key={line} style={styles.sourceLine}>・{line}</Text>
                  ))}
                </View>
                <View style={styles.studyBox}>
                  <Text style={styles.studyTitle}>採点結果（確定突合できた範囲）</Text>
                  <Text style={styles.studyLine}>
                    {TAC3_MARKSHEET_READING.gradingSummary.status}: {TAC3_MARKSHEET_READING.gradingSummary.confirmedQuestions}問中{TAC3_MARKSHEET_READING.gradingSummary.confirmedCorrect}問正解 / {TAC3_MARKSHEET_READING.gradingSummary.confirmedScore}点分確定
                  </Text>
                  <Text style={styles.studyLine}>{TAC3_MARKSHEET_READING.gradingSummary.scoreNote}</Text>
                  <Text style={styles.studyTitle}>科目別（確定分）</Text>
                  <Text style={styles.studyLine}>{TAC3_MARKSHEET_READING.subjectGrading.join(' / ')}</Text>
                  <Text style={styles.studyTitle}>突合済み</Text>
                  {TAC3_MARKSHEET_READING.confirmedGrading.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>本人マーク読取（問1〜40）</Text>
                  {TAC3_MARKSHEET_READING.markAnswersLaw.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>本人マーク読取（問47〜60）</Text>
                  {TAC3_MARKSHEET_READING.markAnswersKnowledge.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                  <Text style={styles.studyTitle}>高信頼で読めた選択</Text>
                  <Text style={styles.studyLine}>{TAC3_MARKSHEET_READING.highConfidenceAnswers.join(' / ')}</Text>
                  <Text style={styles.studyTitle}>低信頼の読取候補</Text>
                  <Text style={styles.studyLine}>{TAC3_MARKSHEET_READING.lowConfidenceAnswers.join(' / ')}</Text>
                  <Text style={styles.studyTitle}>要目視確認</Text>
                  {TAC3_MARKSHEET_READING.needsManualCheck.map((line) => (
                    <Text key={line} style={styles.studyLine}>・{line}</Text>
                  ))}
                </View>
              </View>
            ) : null}

            {TAC3_WEAKNESS_CHAPTERS.filter((chapter) => selectedSubject === 'すべて' || selectedSubject === chapter.subject).length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>TAC3 苦手分析から作る章</Text>
                  <Text style={styles.sectionCount}>{TAC3_WEAKNESS_CHAPTERS.filter((chapter) => selectedSubject === 'すべて' || selectedSubject === chapter.subject).length}章</Text>
                </View>
                {TAC3_WEAKNESS_CHAPTERS.filter((chapter) => selectedSubject === 'すべて' || selectedSubject === chapter.subject).map((chapter) => (
                  <View key={chapter.title} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={[styles.badge, styles.badgeWarn]}>
                        <Text style={styles.badgeTextWarn}>{chapter.badge}</Text>
                      </View>
                      <Text style={styles.chapterSubject}>{chapter.subject}</Text>
                    </View>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterBody}>{chapter.body}</Text>
                    <View style={styles.studyBox}>
                      <Text style={styles.studyTitle}>何を覚えれば、次は間違えないか</Text>
                      <Text style={styles.studyLine}>{chapter.memory}</Text>
                    </View>
                  </View>
                ))}
              </>
            ) : null}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>苦手分野から作る章</Text>
              <Pressable style={styles.smallLink} onPress={() => router.push('/wrong-answers')}>
                <Text style={styles.smallLinkText}>誤答リストへ</Text>
                <MaterialIcons name="chevron-right" size={18} color={C.accent} />
              </Pressable>
            </View>

            {topWrong.length === 0 ? (
              <View style={styles.emptyBox}>
                <MaterialIcons name="check-circle" size={28} color={C.accent} />
                <Text style={styles.emptyTitle}>まだ苦手章はありません</Text>
                <Text style={styles.emptyText}>
                  問題を解いて不正解が記録されると、ここに自動で教科書章が生成されます。
                </Text>
              </View>
            ) : (
              topWrong.map((entry) => (
                <View key={`${entry.subject}-${entry.field}-${entry.textHash}`} style={styles.chapterCard}>
                  <View style={styles.chapterTop}>
                    <View style={[styles.badge, entry.wrong >= 2 ? styles.badgeWarn : styles.badgeNormal]}>
                      <Text style={[styles.badgeText, entry.wrong >= 2 && styles.badgeTextWarn]}>
                        誤答 {entry.wrong}回
                      </Text>
                    </View>
                    <Text style={styles.chapterSubject}>
                      {entry.subject} / {entry.field}
                    </Text>
                  </View>
                  <Text style={styles.chapterTitle}>{buildChapterTitle(entry)}</Text>
                  <Text style={styles.chapterBody}>{compactText(entry.previewText)}</Text>
                  <View style={styles.studyBox}>
                    <Text style={styles.studyTitle}>この章でやること</Text>
                    <Text style={styles.studyLine}>1. 問題文の主語・要件・例外を分ける。</Text>
                    <Text style={styles.studyLine}>2. 関連する見て聞くカードを読み直す。</Text>
                    <Text style={styles.studyLine}>3. もう一度問題へ戻り、誤答理由を1行でメモする。</Text>
                  </View>
                  <MissedQuestionPanel
                    label="問題を解く"
                    title={`${entry.field || entry.subject}の誤答問題`}
                    meta={`誤答 ${entry.wrong}回 / 正解 ${entry.correct}回`}
                    questionText={entry.previewText}
                    opened={openMistakeKey === `${entry.subject}-${entry.field}-${entry.textHash}`}
                    openingQuestion={openingQuestionKey === `${entry.subject}-${entry.field}-${entry.textHash}`}
                    onToggle={() => {
                      const key = `${entry.subject}-${entry.field}-${entry.textHash}`;
                      setOpenMistakeKey(openMistakeKey === key ? null : key);
                    }}
                    onOpenQuestion={() => openWrongQuestion(entry)}
                    onOpenDeepdive={() => openWrongQuestionDeepdive(entry)}
                  />
                  {openChapterKey === `${entry.subject}-${entry.field}-${entry.textHash}` ? (
                    <GeneratedTextbookChapter
                      entry={entry}
                      onOpenReference={() => openLearnReference(entry)}
                      onClose={() => setOpenChapterKey(null)}
                    />
                  ) : null}
                  <View style={styles.actionRow}>
                    <Pressable
                      style={styles.primaryButton}
                      onPress={() => {
                        const key = `${entry.subject}-${entry.field}-${entry.textHash}`;
                        setOpenChapterKey(openChapterKey === key ? null : key);
                      }}
                    >
                      <MaterialIcons name="menu-book" size={18} color="#fff" />
                      <Text style={styles.primaryButtonText}>
                        {openChapterKey === `${entry.subject}-${entry.field}-${entry.textHash}` ? '教科書を閉じる' : '教科書を生成'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}

            {filteredMoshiChapters.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>模試から作る章</Text>
                {displayedMoshiChapters.map((chapter) => {
                  const bonusDraft = moshiBonusDrafts.find((draft) => draft.questionId === chapter.questionId);
                  return (
                    <View key={chapter.id} style={styles.knowledgeCard}>
                      <View style={styles.chapterTop}>
                        <View style={[styles.badge, styles.badgeWarn]}>
                          <Text style={styles.badgeTextWarn}>TAC2 問{chapter.questionId}</Text>
                        </View>
                        <Text style={styles.chapterSubject}>{chapter.subject} / {chapter.field}</Text>
                      </View>
                      <Text style={styles.chapterTitle}>{chapter.title}</Text>
                      <Text style={styles.chapterBody}>{chapter.reason}</Text>
                      <Text style={styles.actionText}>{chapter.focus}</Text>
                      {bonusDraft ? (
                        <View style={styles.replayHint}>
                          <MaterialIcons name="extension" size={16} color={C.accent} />
                          <Text style={styles.replayHintText}>ボーナス再演習候補あり: {bonusDraft.prompt}</Text>
                        </View>
                      ) : null}
                      <MissedQuestionPanel
                        label="TAC2回目"
                        title={`問${chapter.questionId}の間違えた過去問`}
                        meta={`正解 ${chapter.answer || '未確定'} / 選択 ${chapter.userAnswer || '未読取'}`}
                        questionText={chapter.sourceQuestionText || chapter.focus}
                        detailHeading="問題を振り返る"
                        reviewLines={buildMoshiReviewLines(chapter, bonusDraft)}
                        opened={openMistakeKey === chapter.id}
                        onToggle={() => setOpenMistakeKey(openMistakeKey === chapter.id ? null : chapter.id)}
                        onOpenDeepdive={() => openMoshiDeepdive(chapter)}
                      />
                    </View>
                  );
                })}
              </>
            ) : null}

            {filteredMoshiPlusCards.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>見て聞いて覚えるモードぷらす候補</Text>
                {filteredMoshiPlusCards.slice(0, 10).map((card) => (
                  <View key={card.id} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={styles.badgeNormal}>
                        <Text style={styles.badgeText}>ぷらす</Text>
                      </View>
                      <Text style={styles.chapterSubject}>{card.subject} / {card.field}</Text>
                    </View>
                    <Text style={styles.chapterTitle}>問{card.questionId}を短縮カード化</Text>
                    <Text style={styles.chapterBody}>{card.text}</Text>
                    <Text style={styles.actionText}>{card.deepdive}</Text>
                  </View>
                ))}
              </>
            ) : null}

            {filteredMoshiBonusDrafts.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>ボーナスステージ問題候補</Text>
                {filteredMoshiBonusDrafts.slice(0, 10).map((draft) => (
                  <View key={draft.id} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={[styles.badge, styles.badgeWarn]}>
                        <Text style={styles.badgeTextWarn}>再演習</Text>
                      </View>
                      <Text style={styles.chapterSubject}>{draft.subject} / {draft.field}</Text>
                    </View>
                    <Text style={styles.chapterTitle}>{draft.prompt}</Text>
                    <Text style={styles.chapterBody}>{draft.explain}</Text>
                    <Text style={styles.actionText}>形式変更済みの候補として、ボーナス問題データへ移す前に内容確認する。</Text>
                  </View>
                ))}
              </>
            ) : null}

            {filteredTacBonusChapters.length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>TACボーナス問題から作る章</Text>
                  <Text style={styles.sectionCount}>{filteredTacBonusChapters.length}問</Text>
                </View>
                {filteredTacBonusChapters.map((chapter) => (
                  <View key={chapter.id} style={styles.knowledgeCard}>
                    <View style={styles.chapterTop}>
                      <View style={[styles.badge, chapter.source === 'TAC第1回' ? styles.badgeNormal : styles.badgeWarn]}>
                        <Text style={chapter.source === 'TAC第1回' ? styles.badgeText : styles.badgeTextWarn}>
                          {chapter.sourceQuestionId ? `${chapter.source} 問${chapter.sourceQuestionId}` : chapter.source}
                        </Text>
                      </View>
                      <Text style={styles.chapterSubject}>{chapter.subject} / {chapter.field}</Text>
                    </View>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterBody}>{compactText(chapter.questionText, 220)}</Text>
                    <View style={styles.studyBox}>
                      <Text style={styles.studyTitle}>この章の復習ポイント</Text>
                      {chapter.sourceQuestionId ? <Text style={styles.studyLine}>元問: {chapter.source} 問{chapter.sourceQuestionId}</Text> : null}
                      <Text style={styles.studyLine}>正解: {chapter.answerLabels}</Text>
                      <Text style={styles.studyLine}>1. 正解肢の根拠語を拾う。</Text>
                      <Text style={styles.studyLine}>2. 誤答肢の崩れる語を探す。</Text>
                      <Text style={styles.studyLine}>3. もっと深掘るで図解を見てから、ボーナスステージで解き直す。</Text>
                    </View>
                    <MissedQuestionPanel
                      label="ボーナスステージ"
                      title={chapter.title}
                      meta={`正解 ${chapter.answerLabels} / ${chapter.choices.length}肢`}
                      questionText={chapter.questionText}
                      detailHeading="今回作った自作問題"
                      reviewLines={[
                        `出典メモ: ${chapter.sourceQuestionId ? `${chapter.source} 問${chapter.sourceQuestionId}` : chapter.source}`,
                        `正解番号: ${chapter.answerLabels}`,
                        '問題文・肢は模試本文の転載ではなく、論点抽出で再構成。',
                        '深掘りには解説とテキスト図解を付与済み。',
                      ]}
                      opened={openMistakeKey === chapter.id}
                      openingQuestion={openingTacBonusKey === chapter.id}
                      onToggle={() => setOpenMistakeKey(openMistakeKey === chapter.id ? null : chapter.id)}
                      onOpenQuestion={() => openTacBonusQuestion(chapter)}
                      onOpenDeepdive={() => openTacBonusDeepdive(chapter)}
                    />
                  </View>
                ))}
              </>
            ) : null}

            {stickyScopes.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>付箋から作る章</Text>
                <View style={styles.stickyGrid}>
                  {stickyScopes.slice(0, 10).map((item) => (
                    <View key={item.scope} style={styles.stickyCard}>
                      <MaterialIcons name="bookmark" size={20} color={C.gold} />
                      <View style={styles.stickyBody}>
                        <Text style={styles.stickyTitle}>{item.scope}</Text>
                        <Text style={styles.stickyText}>{item.count}件の付箋を復習候補にしています。</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            ) : null}

            <Text style={styles.sectionTitle}>TAC模試から入れる新知識</Text>
            {filteredTacItems.map((item) => (
              <View key={item.title} style={styles.knowledgeCard}>
                <View style={styles.chapterTop}>
                  <View style={styles.badgeNormal}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                  <Text style={styles.chapterSubject}>{item.subject}</Text>
                </View>
                <Text style={styles.chapterTitle}>{item.title}</Text>
                <Text style={styles.chapterBody}>{item.body}</Text>
                <Text style={styles.actionText}>{item.action}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function GeneratedTextbookChapter({
  entry,
  onOpenReference,
  onClose,
}: {
  entry: WrongQuestionListEntry;
  onOpenReference: () => void;
  onClose: () => void;
}) {
  const chapter = buildTextbookSections(entry);

  return (
    <View style={styles.generatedBook}>
      <View style={styles.generatedHeader}>
        <View>
          <Text style={styles.generatedKicker}>Generated Chapter</Text>
          <Text style={styles.generatedTitle}>{chapter.headline}</Text>
        </View>
        <Pressable onPress={onClose} style={styles.iconButton}>
          <MaterialIcons name="close" size={18} color={C.muted} />
        </Pressable>
      </View>

      <View style={styles.bookSection}>
        <Text style={styles.bookHeading}>この章の問い</Text>
        <Text style={styles.bookParagraph}>{chapter.focus}</Text>
      </View>

      <View style={styles.bookSection}>
        <Text style={styles.bookHeading}>読み解き</Text>
        {chapter.core.map((line) => (
          <Text key={line} style={styles.bookBullet}>・{line}</Text>
        ))}
      </View>

      <View style={styles.compareTable}>
        <View style={styles.compareRowHead}>
          <Text style={styles.compareHead}>見る場所</Text>
          <Text style={styles.compareHead}>判断のしかた</Text>
        </View>
        <View style={styles.compareRow}>
          <Text style={styles.compareCellTitle}>主語</Text>
          <Text style={styles.compareCell}>行政庁、処分庁、裁判所、本人、第三者などを取り違えない。</Text>
        </View>
        <View style={styles.compareRow}>
          <Text style={styles.compareCellTitle}>要件</Text>
          <Text style={styles.compareCell}>条文の入口条件と効果を分け、片方だけで結論を出さない。</Text>
        </View>
        <View style={styles.compareRow}>
          <Text style={styles.compareCellTitle}>例外</Text>
          <Text style={styles.compareCell}>「できる」「しなければならない」「できない」の語尾で落とさない。</Text>
        </View>
      </View>

      <View style={styles.bookSection}>
        <Text style={styles.bookHeading}>失点しやすい罠</Text>
        {chapter.traps.map((line) => (
          <Text key={line} style={styles.bookBullet}>・{line}</Text>
        ))}
      </View>

      <View style={styles.checkBox}>
        <Text style={styles.checkTitle}>30秒チェック</Text>
        <Text style={styles.checkText}>この問題でズレていたのは、主語・要件・例外・時期のどれ？</Text>
        <Text style={styles.checkText}>根拠条文や判例名を見ずに、結論まで1文で言える？</Text>
      </View>

      <View style={styles.bookSection}>
        <Text style={styles.bookHeading}>次の復習アクション</Text>
        {chapter.next.map((line, index) => (
          <Text key={line} style={styles.bookBullet}>{index + 1}. {line}</Text>
        ))}
      </View>

      <Pressable style={styles.secondaryButton} onPress={onOpenReference}>
        <MaterialIcons name="library-books" size={17} color={C.accent} />
        <Text style={styles.secondaryButtonText}>関連カードで補強する</Text>
      </Pressable>
    </View>
  );
}

function MissedQuestionPanel({
  label,
  title,
  meta,
  questionText,
  detailHeading = '間違えた過去問',
  reviewLines,
  opened,
  openingQuestion = false,
  onToggle,
  onOpenQuestion,
  onOpenDeepdive,
}: {
  label: string;
  title: string;
  meta: string;
  questionText: string;
  detailHeading?: string;
  reviewLines?: string[];
  opened: boolean;
  openingQuestion?: boolean;
  onToggle: () => void;
  onOpenQuestion?: () => void;
  onOpenDeepdive: () => void;
}) {
  return (
    <View style={styles.missedWrap}>
      <Pressable style={styles.missedSummary} onPress={onToggle}>
        <View style={styles.missedIcon}>
          <MaterialIcons name="error-outline" size={18} color={C.warn} />
        </View>
        <View style={styles.missedTextBlock}>
          <Text style={styles.missedLabel}>{label}</Text>
          <Text style={styles.missedTitle}>{title}</Text>
          <Text style={styles.missedMeta}>{meta}</Text>
        </View>
        <MaterialIcons name={opened ? 'expand-less' : 'expand-more'} size={22} color={C.muted} />
      </Pressable>

      {opened ? (
        <View style={styles.missedDetail}>
          <Text style={styles.missedDetailHeading}>{detailHeading}</Text>
          <Text style={styles.missedQuestionText}>{compactText(questionText, 520)}</Text>
          {reviewLines && reviewLines.length > 0 ? (
            <View style={styles.reviewBox}>
              {reviewLines.map((line) => (
                <Text key={line} style={styles.reviewLine}>・{line}</Text>
              ))}
            </View>
          ) : null}
          <View style={styles.missedActions}>
            {onOpenQuestion ? (
              <Pressable style={styles.outlineButton} onPress={onOpenQuestion} disabled={openingQuestion}>
                {openingQuestion ? (
                  <ActivityIndicator size="small" color={C.accent} />
                ) : (
                  <MaterialIcons name="play-arrow" size={17} color={C.accent} />
                )}
                <Text style={styles.outlineButtonText}>この問題を解き直す</Text>
              </Pressable>
            ) : null}
            <Pressable style={styles.deepdiveButton} onPress={onOpenDeepdive}>
              <MaterialIcons name="travel-explore" size={17} color="#fff" />
              <Text style={styles.deepdiveButtonText}>もっと深掘る</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 18,
    paddingBottom: 40,
    gap: 16,
  },
  hero: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: C.paper,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: C.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBody: {
    flex: 1,
  },
  kicker: {
    fontSize: 12,
    color: C.accent,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: C.ink,
    marginBottom: 4,
  },
  lead: {
    fontSize: 14,
    lineHeight: 21,
    color: C.muted,
  },
  loadingBox: {
    paddingVertical: 48,
    gap: 12,
    alignItems: 'center',
  },
  muted: {
    color: C.muted,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: C.ink,
  },
  statLabel: {
    fontSize: 12,
    color: C.muted,
    marginTop: 2,
  },
  filterRow: {
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: C.panel,
  },
  filterChipActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  filterText: {
    color: C.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: C.ink,
    marginTop: 8,
  },
  sectionCount: {
    color: C.muted,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  smallLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallLinkText: {
    color: C.accent,
    fontWeight: '700',
    fontSize: 13,
  },
  emptyBox: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 18,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: C.ink,
  },
  emptyText: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  chapterCard: {
    backgroundColor: C.paper,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  knowledgeCard: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  priorityCard: {
    backgroundColor: C.goldSoft,
    borderColor: C.gold,
  },
  chapterTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeNormal: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: C.accentSoft,
  },
  badgeWarn: {
    backgroundColor: C.warnSoft,
  },
  badgeText: {
    color: C.accent,
    fontSize: 12,
    fontWeight: '800',
  },
  badgeTextWarn: {
    color: C.warn,
  },
  chapterSubject: {
    fontSize: 12,
    color: C.muted,
    fontWeight: '700',
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.ink,
    lineHeight: 24,
  },
  chapterBody: {
    fontSize: 14,
    lineHeight: 22,
    color: C.ink,
  },
  sourceBox: {
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#D8C8A5',
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  sourceTitle: {
    color: C.gold,
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 2,
  },
  sourceLine: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  studyBox: {
    backgroundColor: '#F8F5EE',
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  studyTitle: {
    color: C.ink,
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 2,
  },
  studyLine: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
  },
  missedWrap: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5C4B6',
    borderRadius: 10,
    backgroundColor: '#FFF8F3',
    overflow: 'hidden',
  },
  missedSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  missedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.warnSoft,
  },
  missedTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  missedLabel: {
    color: C.warn,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 2,
  },
  missedTitle: {
    color: C.ink,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  missedMeta: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  missedDetail: {
    borderTopWidth: 1,
    borderTopColor: '#E5C4B6',
    padding: 12,
    gap: 9,
    backgroundColor: '#FFFDF8',
  },
  missedDetailHeading: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '900',
  },
  missedQuestionText: {
    color: C.ink,
    fontSize: 13,
    lineHeight: 21,
  },
  reviewBox: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 9,
    padding: 10,
    gap: 4,
    backgroundColor: '#F8F5EE',
  },
  reviewLine: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  missedActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  outlineButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 11,
    backgroundColor: C.accentSoft,
  },
  outlineButtonText: {
    color: C.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  deepdiveButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: C.warn,
  },
  deepdiveButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  generatedBook: {
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#CDBFAD',
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  generatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  generatedKicker: {
    color: C.accent,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  generatedTitle: {
    color: C.ink,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2EDE5',
  },
  bookSection: {
    gap: 6,
  },
  bookHeading: {
    color: C.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  bookParagraph: {
    color: C.ink,
    fontSize: 15,
    lineHeight: 24,
  },
  bookBullet: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 23,
  },
  compareTable: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    overflow: 'hidden',
  },
  compareRowHead: {
    flexDirection: 'row',
    backgroundColor: C.accentSoft,
  },
  compareRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.line,
  },
  compareHead: {
    flex: 1,
    padding: 10,
    color: C.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  compareCellTitle: {
    width: 86,
    padding: 10,
    color: C.ink,
    fontSize: 13,
    fontWeight: '900',
    backgroundColor: '#F8F5EE',
  },
  compareCell: {
    flex: 1,
    padding: 10,
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  checkBox: {
    backgroundColor: C.warnSoft,
    borderRadius: 10,
    padding: 12,
    gap: 5,
  },
  checkTitle: {
    color: C.warn,
    fontSize: 14,
    fontWeight: '900',
  },
  checkText: {
    color: C.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: C.accentSoft,
  },
  secondaryButtonText: {
    color: C.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  stickyGrid: {
    gap: 10,
  },
  stickyCard: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: C.goldSoft,
    borderWidth: 1,
    borderColor: '#E6D58E',
    borderRadius: 10,
    padding: 12,
  },
  stickyBody: {
    flex: 1,
  },
  stickyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: C.ink,
  },
  stickyText: {
    fontSize: 13,
    color: C.muted,
    marginTop: 2,
  },
  actionText: {
    fontSize: 13,
    lineHeight: 20,
    color: C.accent,
    fontWeight: '700',
  },
  replayHint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    borderWidth: 1,
    borderColor: '#B9D8D4',
    borderRadius: 9,
    padding: 9,
    backgroundColor: C.accentSoft,
  },
  replayHintText: {
    flex: 1,
    color: C.accent,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '800',
  },
});


