export type MoshiQuestionStatus = 'unknown' | 'correct' | 'wrong' | 'needs_review';

export const MOSHI_COMPLETE_INPUT_STORAGE_KEY = 'gq_moshi_complete_input_latest';

export type MoshiQuestion = {
  id: number;
  subject: string;
  field: string;
  text: string;
  answer?: string;
  userAnswer?: string;
  status: MoshiQuestionStatus;
};

export type MoshiUserAnswer = {
  id: number;
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  sourceText: string;
};

export type MoshiGradingSummary = {
  total: number;
  graded: number;
  correct: number;
  wrong: number;
  unanswered: number;
  scoreRate: number;
};

export type MoshiTextbookChapter = {
  id: string;
  questionId: number;
  subject: string;
  field: string;
  status: MoshiQuestionStatus;
  answer?: string;
  userAnswer?: string;
  title: string;
  focus: string;
  reason: string;
  sourceQuestionText: string;
};

export type MoshiPlusCard = {
  id: string;
  questionId: number;
  subject: string;
  field: string;
  text: string;
  deepdive: string;
  source: string;
};

export type MoshiBonusQuestionDraft = {
  id: string;
  questionId: number;
  subject: string;
  field: string;
  prompt: string;
  choices: string[];
  answer: number[];
  explain: string;
  source: string;
};

export type MoshiThreePointSet = {
  plusCards: MoshiPlusCard[];
  bonusQuestions: MoshiBonusQuestionDraft[];
  textbookChapters: MoshiTextbookChapter[];
};

export type MoshiImportPage = {
  index: number;
  file: string;
};

export type MoshiSavedInput = {
  questionOcrText: string;
  answerOcrText: string;
  userAnswerOcrText: string;
  questions: MoshiQuestion[];
  savedAt: string;
  examId?: string;
  sourceFolders?: {
    questions?: string;
    answers?: string;
  };
  counts?: {
    questionImages?: number;
    answerImages?: number;
    parsedQuestions?: number;
    parsedAnswers?: number;
  };
  pages?: {
    questions?: MoshiImportPage[];
    answers?: MoshiImportPage[];
  };
};

export type MoshiSubjectSummary = {
  subject: string;
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  needsReview: number;
  level: number;
  focus: string;
};

export type MoshiAssessment = {
  level: number;
  title: string;
  description: string;
  nextInput: string[];
  subjectSummaries: MoshiSubjectSummary[];
};

const LEVEL_DESCRIPTIONS: Record<number, { title: string; description: string; nextInput: string[] }> = {
  1: {
    title: '入口から作る段階',
    description: '見て聞いて覚えるところから始める段階。用語と条文の入口を先に作る。',
    nextInput: ['短いカードで用語を固定する', '条文番号より先に制度の目的を読む', '誤答した問題は本文を分解する'],
  },
  2: {
    title: '用語がまだ点につながらない段階',
    description: '知っている言葉はあるが、正誤判断の要件に結びついていない。',
    nextInput: ['主語・要件・効果を分ける', '同じ論点を3肢連続で読む', '正解肢だけでなく誤肢理由を読む'],
  },
  3: {
    title: '基礎語句の穴を埋める段階',
    description: '主要科目の基本語句に抜けがあり、横断比較に入る前の補強が必要。',
    nextInput: ['頻出条文を1テーマずつ読む', '判例は結論と理由を1行でまとめる', '用語カードを優先する'],
  },
  4: {
    title: '基本論点を固める段階',
    description: '正解できる問題もあるが、制度の全体像がまだ不安定。',
    nextInput: ['同一テーマの過去問を束ねる', '例外を表にする', '誤答分野を翌日に再読する'],
  },
  5: {
    title: '基礎はあるが変形に弱い段階',
    description: '基礎はできているが、形を変えて出題されると対応できない。',
    nextInput: ['横断比較表を読む', '似た制度の違いを口で説明する', '誤肢の作られ方を分析する'],
  },
  6: {
    title: '合格ラインへ押し上げる段階',
    description: '基礎は動いている。失点源を論点単位で潰せば得点が伸びる。',
    nextInput: ['弱点科目を毎日1章読む', '条文の語尾をチェックする', '模試の誤答だけを再演習する'],
  },
  7: {
    title: '合格ライン目前の段階',
    description: '標準問題は戦える。難問より取りこぼし防止が重要。',
    nextInput: ['Aランク誤答をゼロにする', '時間配分を固定する', '記述の要件暗記を増やす'],
  },
  8: {
    title: '合格安定圏の段階',
    description: '横断知識がつながっている。新法・改正・判例で差がつく。',
    nextInput: ['時事論点を追加する', '比較表を自力再現する', '記述の答案骨格を作る'],
  },
  9: {
    title: '上位合格を狙う段階',
    description: '知識の運用力が高い。未知の問題でも要件から崩せる。',
    nextInput: ['未知論点の推論練習をする', '判例理由を短文化する', '複数科目の接続を読む'],
  },
  10: {
    title: '司法試験合格レベル級',
    description: '制度趣旨、判例射程、要件事実のような深い構造まで見えている段階。',
    nextInput: ['判例射程を比較する', '記述答案を法的三段論法で磨く', '他資格レベルの応用問題に触れる'],
  },
};

function toHalfWidthNumber(value: string): number {
  const normalized = String(value || '').replace(/[０-９]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );
  const n = parseInt(normalized, 10);
  return Number.isFinite(n) ? n : 0;
}

function normalizeAnswer(value: string): string {
  const map: Record<string, string> = {
    '１': '1',
    '２': '2',
    '３': '3',
    '４': '4',
    '５': '5',
    'ア': 'ア',
    'イ': 'イ',
    'ウ': 'ウ',
    'エ': 'エ',
    'オ': 'オ',
  };
  return map[value] || value;
}

function answerToNumber(value: string): string {
  const normalized = normalizeAnswer(String(value || '').trim());
  const kanaMap: Record<string, string> = {
    ア: '1',
    イ: '2',
    ウ: '3',
    エ: '4',
    オ: '5',
  };
  return kanaMap[normalized] || normalized;
}

export function subjectForMoshiQuestion(id: number): { subject: string; field: string } {
  if (id <= 2) return { subject: '基礎法学', field: '基礎法学' };
  if (id <= 7) return { subject: '憲法', field: '憲法' };
  if (id <= 26) return { subject: '行政法', field: '行政法総合' };
  if (id <= 35) return { subject: '民法', field: '民法総合' };
  if (id <= 40) return { subject: '商法・会社法', field: '商法・会社法' };
  if (id <= 46) return { subject: '記述・多肢', field: '記述・多肢' };
  return { subject: '基礎知識', field: '一般知識' };
}

export function parseMoshiAnswers(text: string): Record<number, string> {
  const answers: Record<number, string> = {};
  const lines = String(text || '').split(/\n+/);
  const answerLine = /(?:問|問題)?\s*([0-9０-９]{1,2})\s*(?:の)?\s*(?:正解|解答|答え|答)\s*[:：]?\s*([1-5１-５ア-オ])/;
  const compactLine = /^\s*([0-9０-９]{1,2})\s*[:：.)、]\s*([1-5１-５ア-オ])\s*$/;

  for (const line of lines) {
    const m = line.match(answerLine) || line.match(compactLine);
    if (!m) continue;
    const id = toHalfWidthNumber(m[1] || '');
    if (id <= 0 || id > 60) continue;
    answers[id] = answerToNumber(m[2] || '');
  }
  return answers;
}

export function parseMoshiUserAnswers(text: string): Record<number, MoshiUserAnswer> {
  const source = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const answers: Record<number, MoshiUserAnswer> = {};
  const patterns = [
    /(?:問|問題)?\s*([0-9０-９]{1,2})\s*(?:の)?\s*(?:回答|解答|マーク|答え|答)\s*[:：]?\s*([1-5１-５ア-オ])/g,
    /^\s*([0-9０-９]{1,2})\s*[:：.)、]\s*([1-5１-５ア-オ])\s*$/gm,
    /^\s*([0-9０-９]{1,2})\s+([1-5１-５ア-オ])\s*$/gm,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const id = toHalfWidthNumber(match[1] || '');
      const answer = answerToNumber(match[2] || '');
      if (id <= 0 || id > 60 || !/^[1-5]$/.test(answer)) continue;
      answers[id] = {
        id,
        answer,
        confidence: pattern.source.startsWith('(?:問') ? 'high' : 'medium',
        sourceText: match[0] || '',
      };
    }
  }

  return answers;
}

export function parseMoshiQuestions(questionText: string, answerText = ''): MoshiQuestion[] {
  const source = String(questionText || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const answers = parseMoshiAnswers(`${questionText}\n${answerText}`);
  const matches = [...source.matchAll(/(?:^|\n)\s*(?:問|問題)\s*([0-9０-９]{1,2})\s*[.)、：:]?/g)];

  if (matches.length === 0) {
    return [];
  }

  return matches
    .map((match, index) => {
      const id = toHalfWidthNumber(match[1] || '');
      const start = match.index || 0;
      const next = matches[index + 1]?.index ?? source.length;
      const raw = source.slice(start, next).replace(/^\s*(?:問|問題)\s*[0-9０-９]{1,2}\s*[.)、：:]?/, '').trim();
      const { subject, field } = subjectForMoshiQuestion(id);
      return {
        id,
        subject,
        field,
        text: raw || `問${id} OCR未整理`,
        answer: answers[id],
        status: answers[id] ? 'needs_review' : 'unknown',
      } satisfies MoshiQuestion;
    })
    .filter((q) => q.id > 0 && q.id <= 60)
    .sort((a, b) => a.id - b.id);
}

export function gradeMoshiQuestions(
  questions: MoshiQuestion[],
  userAnswers: Record<number, MoshiUserAnswer>
): { questions: MoshiQuestion[]; summary: MoshiGradingSummary } {
  let graded = 0;
  let correct = 0;
  let wrong = 0;

  const gradedQuestions = questions.map((question) => {
    const userAnswer = userAnswers[question.id]?.answer;
    if (!userAnswer || !question.answer) {
      return {
        ...question,
        userAnswer,
        status: question.answer ? question.status : 'unknown',
      };
    }

    graded += 1;
    const isCorrect = answerToNumber(userAnswer) === answerToNumber(question.answer);
    if (isCorrect) correct += 1;
    else wrong += 1;

    return {
      ...question,
      userAnswer,
      status: isCorrect ? 'correct' : 'wrong',
    } satisfies MoshiQuestion;
  });

  const total = questions.length;
  const unanswered = Math.max(0, total - graded);

  return {
    questions: gradedQuestions,
    summary: {
      total,
      graded,
      correct,
      wrong,
      unanswered,
      scoreRate: graded > 0 ? correct / graded : 0,
    },
  };
}

function extractFocusText(text: string): string {
  const compact = String(text || '').replace(/\s+/g, ' ').trim();
  if (!compact) return 'OCR本文を確認して、論点名を補う';
  return compact.slice(0, 180) + (compact.length > 180 ? '...' : '');
}

function sourceNameForQuestion(question: MoshiQuestion): string {
  return `模試3点セット 問${question.id}`;
}

function conciseKnowledgeText(question: MoshiQuestion): string {
  const focus = extractFocusText(question.text);
  if (question.status === 'wrong') {
    return `【模試ぷらす】問${question.id}で落とした論点。正解は${question.answer || '未確定'}、選択は${question.userAnswer || '未読取'}。主語・要件・例外・時期を分けて読む。`;
  }
  return `【模試ぷらす】問${question.id}の確認論点。${focus}`;
}

export function buildMoshiPlusCards(questions: MoshiQuestion[]): MoshiPlusCard[] {
  return questions
    .filter((question) => question.status === 'wrong' || question.status === 'needs_review')
    .map((question) => ({
      id: `moshi-plus-q${question.id}`,
      questionId: question.id,
      subject: question.subject,
      field: question.field,
      text: conciseKnowledgeText(question),
      deepdive:
        question.status === 'wrong'
          ? '模試本文を転載せず、失点原因を短い正しい知識へ圧縮する。次回は同じ主語・要件のズレを検出する。'
          : 'OCRと正答を確認し、短縮カードとして保存できる形へ整える。',
      source: sourceNameForQuestion(question),
    }));
}

export function buildMoshiBonusQuestionDrafts(questions: MoshiQuestion[]): MoshiBonusQuestionDraft[] {
  return questions
    .filter((question) => question.status === 'wrong')
    .map((question) => {
      const focus = extractFocusText(question.text);
      return {
        id: `moshi-bonus-q${question.id}`,
        questionId: question.id,
        subject: question.subject,
        field: question.field,
        prompt: `【ボーナス】${question.field}の失点論点について、正しい整理はどれか。`,
        choices: [
          '主語、要件、効果、例外を分けてから結論を判断する。',
          '問題文と同じ結論だけを覚えれば、他の出題形式にもそのまま対応できる。',
          '条文番号が出ていれば、適用場面の確認は省略してよい。',
          '例外規定は、原則と反対の結論になるので常に広く読む。',
          '判例問題では、結論だけを暗記し理由付けは読まなくてよい。',
        ],
        answer: [0],
        explain: `正解は1。元の模試文は転載せず、問${question.id}の失点原因を抽象化した再演習問題。確認対象: ${focus}`,
        source: sourceNameForQuestion(question),
      };
    });
}

export function buildMoshiTextbookChapters(questions: MoshiQuestion[]): MoshiTextbookChapter[] {
  return questions
    .filter((question) => question.status === 'wrong' || question.status === 'needs_review')
    .map((question) => ({
      id: `moshi-q${question.id}`,
      questionId: question.id,
      subject: question.subject,
      field: question.field,
      status: question.status,
      answer: question.answer,
      userAnswer: question.userAnswer,
      title:
        question.status === 'wrong'
          ? `模試 問${question.id}の誤答から作る${question.subject}章`
          : `模試 問${question.id}の確認章`,
      focus: extractFocusText(question.text),
      reason:
        question.status === 'wrong'
          ? `正解は${question.answer || '未確定'}、選択は${question.userAnswer || '未読取'}。誤答理由を主語・要件・例外・時期に分けて固定する。`
          : 'OCRまたは正解未確定のため、問題文と解説を確認してから知識化する。',
      sourceQuestionText: question.text,
    }));
}

export function buildMoshiThreePointSet(questions: MoshiQuestion[]): MoshiThreePointSet {
  return {
    plusCards: buildMoshiPlusCards(questions),
    bonusQuestions: buildMoshiBonusQuestionDrafts(questions),
    textbookChapters: buildMoshiTextbookChapters(questions),
  };
}

function levelFromRate(rate: number): number {
  if (rate >= 0.92) return 10;
  if (rate >= 0.86) return 9;
  if (rate >= 0.8) return 8;
  if (rate >= 0.72) return 7;
  if (rate >= 0.64) return 6;
  if (rate >= 0.55) return 5;
  if (rate >= 0.45) return 4;
  if (rate >= 0.35) return 3;
  if (rate >= 0.25) return 2;
  return 1;
}

function focusForSubject(summary: Omit<MoshiSubjectSummary, 'level' | 'focus'>): string {
  if (summary.wrong >= 6) return '見て聞いて覚えるカードから再構築';
  if (summary.wrong >= 3) return '横断比較表と誤肢分析';
  if (summary.needsReview >= 5) return 'OCR確認後に正誤を確定';
  if (summary.correct >= Math.max(3, summary.total * 0.75)) return '維持演習と時事補強';
  return '基礎整理';
}

export function assessMoshiSession(questions: MoshiQuestion[], expectedTotal = 60): MoshiAssessment {
  const total = Math.max(expectedTotal, questions.length || expectedTotal);
  const correct = questions.filter((q) => q.status === 'correct').length;
  const wrong = questions.filter((q) => q.status === 'wrong').length;
  const answered = correct + wrong;
  const coverage = questions.length / total;
  const scoreRate = answered > 0 ? correct / Math.max(1, answered) : 0;
  const readinessRate = answered > 0 ? scoreRate : Math.min(0.35, coverage * 0.35);
  const level = levelFromRate(readinessRate);
  const levelMeta = LEVEL_DESCRIPTIONS[level] || LEVEL_DESCRIPTIONS[1];

  const bySubject = new Map<string, MoshiQuestion[]>();
  for (const question of questions) {
    const key = question.subject;
    bySubject.set(key, [...(bySubject.get(key) || []), question]);
  }

  const subjectSummaries: MoshiSubjectSummary[] = [...bySubject.entries()]
    .map(([subject, list]) => {
      const subjectCorrect = list.filter((q) => q.status === 'correct').length;
      const subjectWrong = list.filter((q) => q.status === 'wrong').length;
      const needsReview = list.filter((q) => q.status === 'needs_review' || q.status === 'unknown').length;
      const subjectAnswered = subjectCorrect + subjectWrong;
      const subjectRate = subjectAnswered > 0 ? subjectCorrect / subjectAnswered : Math.min(0.35, list.length / 10);
      const base = {
        subject,
        total: list.length,
        answered: subjectAnswered,
        correct: subjectCorrect,
        wrong: subjectWrong,
        needsReview,
      };
      return {
        ...base,
        level: levelFromRate(subjectRate),
        focus: focusForSubject(base),
      };
    })
    .sort((a, b) => a.level - b.level || b.wrong - a.wrong || a.subject.localeCompare(b.subject));

  return {
    level,
    title: levelMeta.title,
    description: levelMeta.description,
    nextInput: levelMeta.nextInput,
    subjectSummaries,
  };
}

export function updateQuestionStatus(
  questions: MoshiQuestion[],
  id: number,
  status: MoshiQuestionStatus
): MoshiQuestion[] {
  return questions.map((q) => (q.id === id ? { ...q, status } : q));
}
