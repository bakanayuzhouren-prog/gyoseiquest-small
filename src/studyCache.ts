import { FIELD_OWNER, QUIZ_MANIFEST } from '@/src/generated/subjects/quizManifest';
import { LEARN_LOADERS } from '@/src/generated/subjects/learnLoaders';
import { QUIZ_LOADERS } from '@/src/generated/subjects/quizLoaders';
import { STATUTE_LOADERS } from '@/src/generated/subjects/statuteLoaders';

type QuizPack = {
  main?: Record<string, any[]>;
  merged?: Record<string, any[]>;
};
type LearnPack = {
  content?: any;
  deepdive?: any;
  fExplain?: any;
  statuteRefs?: any;
  source?: any;
  links?: Record<string, unknown>;
};

export const QUIZ_SUBJECTS: Record<string, Record<string, any[]>> = {};
export const QUIZ_MAIN: Record<string, Record<string, any[]>> = {};
export const LEARN_CONTENT: Record<string, any> = {};
export const LEARN_DEEPDIVE: Record<string, any> = {};
export const LEARN_F_EXPLAIN: Record<string, any> = {};
export const LEARN_STATUTE_REFS: Record<string, any> = {};
export const LEARN_SOURCE: Record<string, any> = {};
export const LEARN_LINKS: Record<string, any> = {};
export const STATUTES: Record<string, Array<{ title: string; content: string }>> = {};
export const RESOURCES: Record<string, unknown> = {};

const quizLoaded = new Set<string>();
const quizPending = new Map<string, Promise<void>>();
const learnLoaded = new Set<string>();
const learnPending = new Map<string, Promise<void>>();
const statutePending = new Map<string, Promise<Array<{ title: string; content: string }>>>();

let resourcesReady = false;
let resourcesPending: Promise<void> | null = null;
let relatedStatutes: Record<string, { content: string; choiceLabel: string; quizSubject: string; quizField: string }> | null = null;
let relatedPending: Promise<void> | null = null;
let quizGroups: Record<string, Array<{ subject: string; field: string; index: number; questionPreview: string }>> | null = null;
let groupsPending: Promise<void> | null = null;
let statuteVersion = 0;

export function getStatuteVersion(): number {
  return statuteVersion;
}

export function getRelatedStatutes() {
  return relatedStatutes;
}

export function getQuizLearnGroups() {
  return quizGroups;
}

export function quizFieldNames(subject: string | undefined): string[] {
  if (!subject) return [];
  return QUIZ_MANIFEST[subject] || [];
}

async function loadQuizPack(subject: string): Promise<void> {
  if (!subject || quizLoaded.has(subject)) return;
  const pending = quizPending.get(subject);
  if (pending) return pending;
  const job = (async () => {
    const load = QUIZ_LOADERS[subject as keyof typeof QUIZ_LOADERS] as
      | (() => Promise<{ default: QuizPack }>)
      | undefined;
    const pack = load ? (await load()).default : {};
    QUIZ_SUBJECTS[subject] = pack?.merged || {};
    QUIZ_MAIN[subject] = pack?.main || {};
    quizLoaded.add(subject);
  })();
  quizPending.set(subject, job);
  return job;
}

export async function ensureQuizSubject(subject: string | undefined): Promise<Record<string, any[]>> {
  if (!subject) return {};
  await loadQuizPack(subject);
  return QUIZ_SUBJECTS[subject] || {};
}

export async function ensureQuizMain(subject: string | undefined): Promise<Record<string, any[]>> {
  if (!subject) return {};
  await loadQuizPack(subject);
  return QUIZ_MAIN[subject] || {};
}

export async function ensureLearnSubject(subject: string | undefined): Promise<void> {
  if (!subject || learnLoaded.has(subject)) return;
  const pending = learnPending.get(subject);
  if (pending) return pending;
  const job = (async () => {
    const load = LEARN_LOADERS[subject as keyof typeof LEARN_LOADERS] as
      | (() => Promise<{ default: LearnPack }>)
      | undefined;
    const pack = load ? (await load()).default : {};
    LEARN_CONTENT[subject] = pack?.content || [];
    LEARN_DEEPDIVE[subject] = pack?.deepdive || [];
    LEARN_F_EXPLAIN[subject] = pack?.fExplain || [];
    LEARN_STATUTE_REFS[subject] = pack?.statuteRefs || [];
    LEARN_SOURCE[subject] = pack?.source || [];
    Object.assign(LEARN_LINKS, pack?.links || {});
    learnLoaded.add(subject);
  })();
  learnPending.set(subject, job);
  return job;
}

export async function ensureStatuteBucket(bucket: string): Promise<Array<{ title: string; content: string }>> {
  if (!bucket) return [];
  if (STATUTES[bucket]) return STATUTES[bucket];
  const pending = statutePending.get(bucket);
  if (pending) return pending;
  const job = (async () => {
    const load = STATUTE_LOADERS[bucket as keyof typeof STATUTE_LOADERS] as
      | (() => Promise<{ default: Array<{ title: string; content: string }> }>)
      | undefined;
    const rows = load ? (await load()).default || [] : [];
    STATUTES[bucket] = rows;
    statuteVersion += 1;
    return rows;
  })();
  statutePending.set(bucket, job);
  return job;
}

export async function ensureAllStatutes(): Promise<void> {
  await Promise.all(Object.keys(STATUTE_LOADERS).map((bucket) => ensureStatuteBucket(bucket)));
}

export async function ensureResources(): Promise<Record<string, unknown>> {
  if (resourcesReady) return RESOURCES;
  if (!resourcesPending) {
    resourcesPending = import('@/src/generated/subjects/resources').then((mod) => {
      Object.assign(RESOURCES, mod.RESOURCES || {});
      resourcesReady = true;
    });
  }
  await resourcesPending;
  return RESOURCES;
}

export async function ensureRelatedStatutes(): Promise<void> {
  if (relatedStatutes) return;
  if (!relatedPending) {
    relatedPending = import('@/src/generated/subjects/relatedStatutesByLink').then((mod) => {
      relatedStatutes = mod.default || {};
    });
  }
  await relatedPending;
}

export async function ensureQuizIndexes(): Promise<void> {
  await ensureRelatedStatutes();
  if (quizGroups) return;
  if (!groupsPending) {
    groupsPending = import('@/src/generated/subjects/quizLearnGroups').then((mod) => {
      quizGroups = mod.default || {};
    });
  }
  await groupsPending;
}

export function learnKeysForQuiz(quizSubject?: string, quizField?: string): string[] {
  const out = new Set<string>();
  if (quizSubject === '多肢選択' && quizField) out.add(`多肢選択${quizField}`);
  if (quizSubject === '行政法' && quizField) {
    out.add(quizField);
    if (quizField.startsWith('国家賠償法')) out.add('国家賠償法');
    out.add('行政手続法');
    out.add('行政不服審査法');
    out.add('行政事件訴訟法');
  }
  if (quizSubject === '民法') {
    if (quizField) out.add(quizField);
    ['民法総則', '民法総論', '民法物権', '債権総論', '債権各論', '家族法', '民法記述'].forEach((key) => out.add(key));
  }
  if (quizSubject === '記述' && quizField) out.add(`${quizField}記述`);
  if (quizSubject === '憲法') out.add('憲法');
  if (quizField) out.add(quizField);
  if (quizSubject) out.add(quizSubject);
  return [...out];
}

export async function loadLearnScreenData(subject?: string): Promise<void> {
  const learnKeys = new Set<string>();
  if (subject) learnKeys.add(subject);
  if (subject === '民法総則') learnKeys.add('民法総論');
  if (subject === '多肢選択') {
    learnKeys.add('多肢選択');
    learnKeys.add('多肢選択憲法');
    learnKeys.add('多肢選択行政法');
  }
  if (subject === '行政手続法' || subject === '行政不服審査法' || subject === '行政事件訴訟法') {
    learnKeys.add('行政手続法');
    learnKeys.add('行政不服審査法');
    learnKeys.add('行政事件訴訟法');
  }
  const quizKeys = new Set<string>();
  if (subject && subject in QUIZ_LOADERS) quizKeys.add(subject);
  if (subject && FIELD_OWNER[subject]) quizKeys.add(FIELD_OWNER[subject]);
  if (subject === '多肢選択') quizKeys.add('多肢選択');
  await Promise.all([
    ...[...learnKeys].map((key) => ensureLearnSubject(key)),
    ...[...quizKeys].map((key) => ensureQuizMain(key)),
    ensureRelatedStatutes(),
  ]);
}
