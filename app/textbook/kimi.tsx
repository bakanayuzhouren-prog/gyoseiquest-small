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
  Object.entries(TAC_BONUS_QUESTIONS as Record<string, Record<string, any[]>>).forEach(([subject, fields]) => {
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

  const rank: Record<string, number> = { TAC第3回: 0, TAC第2回: 1, TAC第1回: 2 };
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
      screenTitle: 'TACボーナス問題のもっと深掘る',
    });
    router.push('/deepdive');
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
              誤答、付箋、TAC模試の新知識から、いま読むべき章だけを束ねます。
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
                <Text style={styles.statLabel}>TACボーナス</Text>
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
