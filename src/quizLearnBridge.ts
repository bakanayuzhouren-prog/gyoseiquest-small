import { Platform } from 'react-native';

const QUIZ_LEARN_RETURN_KEY = 'gq_quiz_learn_return_v1';

export type QuizLearnReturnParams = Record<string, string>;

export type LearnLinkTarget = {
  subject: string;
  index: number;
  field?: string | null;
  source?: string;
};

let quizLearnReturnParams: QuizLearnReturnParams | null = null;

function toHalfWidthDigits(value: string): string {
  return value.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
}

export function normalizeLearnLinkKey(value: unknown): string {
  if (value == null) return '';
  const normalized = toHalfWidthDigits(String(value).normalize('NFKC')).replace(/＃/g, '#').trim();
  const match = normalized.match(/#\s*([0-9]{1,6})/);
  return match ? `#${match[1].padStart(3, '0')}` : '';
}

export function extractLearnLinkKey(text: unknown): string {
  if (typeof text !== 'string') return '';
  const matches = [...text.matchAll(/[＃#]\s*([0-9０-９]{1,6})/g)];
  if (matches.length === 0) return '';
  return normalizeLearnLinkKey(matches[matches.length - 1][0]);
}

export function stripLearnLinkTag(text: string): string {
  return text.replace(/\s*[＃#]\s*[0-9０-９]{1,6}/g, '').trim();
}

function asTargetArray(value: unknown): LearnLinkTarget[] {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list
    .map((item): LearnLinkTarget | null => {
      if (!item || typeof item !== 'object') return null;
      const raw = item as Record<string, unknown>;
      const subject = typeof raw.subject === 'string' ? raw.subject.trim() : '';
      const index = typeof raw.index === 'number' ? raw.index : Number(raw.index);
      if (!subject || !Number.isFinite(index) || index < 0) return null;
      return {
        subject,
        index: Math.floor(index),
        field: typeof raw.field === 'string' && raw.field.trim() ? raw.field.trim() : null,
        source: typeof raw.source === 'string' ? raw.source : undefined,
      };
    })
    .filter((item): item is LearnLinkTarget => !!item);
}

function expectedLearnSubjects(quizSubject?: string, quizField?: string): string[] {
  const out = new Set<string>();
  if (quizSubject) out.add(quizSubject);
  if (quizField) out.add(quizField);
  if (quizSubject === '多肢選択' && quizField) out.add(`多肢選択${quizField}`);
  if (quizSubject === '行政法' && quizField) out.add(quizField);
  if (quizSubject === '民法' && quizField) out.add(quizField);
  if (quizSubject === '記述' && quizField) out.add(`${quizField}記述`);
  return [...out].filter(Boolean);
}

export function pickLearnLinkTarget(
  rawTarget: unknown,
  quizSubject?: string,
  quizField?: string
): LearnLinkTarget | null {
  const targets = asTargetArray(rawTarget);
  if (targets.length === 0) return null;
  const expected = expectedLearnSubjects(quizSubject, quizField);
  return (
    targets
      .map((target) => ({
        target,
        score: expected.includes(target.subject) ? 2 : target.field && target.field === quizField ? 1 : 0,
      }))
      .sort((a, b) => b.score - a.score)[0]?.target ?? null
  );
}

export function getLearnRouteParams(target: LearnLinkTarget): {
  subject: string;
  index: string;
  field?: string;
  returnToResult: string;
} {
  if (target.subject === '多肢選択憲法') {
    return { subject: '多肢選択', field: '憲法', index: String(target.index), returnToResult: '1' };
  }
  if (target.subject === '多肢選択行政法') {
    return { subject: '多肢選択', field: '行政法', index: String(target.index), returnToResult: '1' };
  }
  return {
    subject: target.subject,
    ...(target.field ? { field: target.field } : {}),
    index: String(target.index),
    returnToResult: '1',
  };
}

export function setQuizLearnReturnParams(params: QuizLearnReturnParams): void {
  quizLearnReturnParams = params;
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(QUIZ_LEARN_RETURN_KEY, JSON.stringify(params));
  } catch {
    /* noop */
  }
}

export type QuizLearnReturnHref =
  | { pathname: '/result'; params: QuizLearnReturnParams }
  | { pathname: '/question'; params: QuizLearnReturnParams };

/** 復習後の戻り先。returnToQuestion=1 なら元の問題画面へ */
export function getQuizLearnReturnHref(): QuizLearnReturnHref | null {
  if (!quizLearnReturnParams && Platform.OS === 'web' && typeof sessionStorage !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(QUIZ_LEARN_RETURN_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          quizLearnReturnParams = Object.fromEntries(
            Object.entries(parsed as Record<string, unknown>).map(([key, value]) => [key, String(value)])
          );
        }
      }
    } catch {
      /* noop */
    }
  }
  if (!quizLearnReturnParams) return null;

  if (quizLearnReturnParams.returnToQuestion === '1') {
    const qParams: QuizLearnReturnParams = {
      subject: quizLearnReturnParams.subject || '',
      field: quizLearnReturnParams.field || '',
      index: quizLearnReturnParams.questionIndex || '0',
    };
    if (quizLearnReturnParams.correctCountSession) {
      qParams.correctCountSession = quizLearnReturnParams.correctCountSession;
    }
    if (quizLearnReturnParams.wrongCounts) qParams.wrongCounts = quizLearnReturnParams.wrongCounts;
    if (quizLearnReturnParams.mode) qParams.mode = quizLearnReturnParams.mode;
    if (quizLearnReturnParams.shuffle) qParams.shuffle = quizLearnReturnParams.shuffle;
    return { pathname: '/question', params: qParams };
  }

  return { pathname: '/result', params: quizLearnReturnParams };
}

export function clearQuizLearnReturnParams(): void {
  quizLearnReturnParams = null;
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(QUIZ_LEARN_RETURN_KEY);
  } catch {
    /* noop */
  }
}
