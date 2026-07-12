/**
 * 民法（問題を解く）→ 見て聞いて覚える の分野ブリッジ。
 * 総則は論点マスタ、他分野は主カード map + 肢テキスト照合。
 */

import { SOUSOKU_QUIZ_PRIMARY_LEARN } from '@/src/topicMaster/minpouSousoku';
import { getQuestionTextHash } from '@/utils/question-stats';

export type MinpouPrimaryTarget = {
  learnSubject: string;
  index: number;
};

export type MinpouLearnLinkConfig = {
  /** 問題を解くの科目（民法 / 記述） */
  quizSubject: string;
  quizField: string;
  /** 既定の見て聞いて覚える科目 */
  learnSubject: string;
  /** getQuestionTextHash → 見て聞いて覚える index（0始まり） */
  primaryLearn: Record<string, number>;
  /** 分野をまたぐ主カード（総合・記述の一部） */
  primaryLearnTargets?: Record<string, MinpouPrimaryTarget>;
};

export const MINPOU_QUIZ_SUBJECT = '民法';

/** 民法総則以外の主カード対応（問題文+肢のキーワード照合＋目視補正） */
const BUKKEN_PRIMARY: Record<string, number> = {
  oztkny: 0,
  '4g9w92': 12,
  '6lnqmo': 12,
  cd8yez: 18,
  kwr0a2: 22,
  tkg1dl: 29,
  i9mob0: 39,
  ld2x84: 39,
  qbaf9r: 43,
  '2y89gp': 49,
  '3hwd6w': 53,
  '2sth13': 55,
  '2my5og': 55,
  f0w9v4: 67,
  woqt4l: 72,
  puxb2e: 78,
  psq8bx: 8,
  '9rtk6f': 85,
  '2gv45d': 89,
  uy9q62: 98,
  k8n0ka: 103,
};

const SAIKEN_SORON_PRIMARY: Record<string, number> = {
  '20up4f': 0,
  z9kva9: 21,
  usafvs: 17,
  mm9bi8: 10,
  chk0zd: 21,
  zcqn3f: 23,
  az6pr1: 30,
  lctdzl: 35,
  elx5v1: 40,
  m0r8vw: 40,
  d0ebli: 53,
  z8zykv: 55,
  vsyqpf: 62,
  agi86w: 62,
  hwfzp5: 73,
};

const SAIKEN_KAKURON_PRIMARY: Record<string, number> = {
  '2tzcbh': 0,
  '13tyd4': 6,
  '76c0gs': 15,
  o2e6ki: 15,
  o3do2q: 38,
  y1z173: 6,
  pr8hqt: 44,
  j9831j: 51,
  y6bgmc: 51,
  '5o3xu7': 53,
  dfb7jd: 64,
  iipi3d: 69,
  '4k1dja': 74,
  xqpvyj: 79,
  pn8h4y: 79,
  u5uiqf: 79,
  i7h74: 84,
  e29wpd: 79,
  pan7ve: 79,
  eql9gq: 109,
};

const KAZOKU_PRIMARY: Record<string, number> = {
  ke5azg: 2,
  '4368l2': 2,
  itrai3: 10,
  cpn47v: 14,
  vr4618: 22,
  gtcz2s: 24,
  xzs36x: 31,
  fdotb4: 35,
  pcsroc: 39,
  '4kaqrb': 39,
  oub9z8: 55,
  eewnse: 55,
};

/** 民法総合 → 横断リンク */
const SOGO_PRIMARY_TARGETS: Record<string, MinpouPrimaryTarget> = {
  ugpviq: { learnSubject: '民法物権', index: 55 }, // 留置・修理・先取特権寄り
  dcc5oh: { learnSubject: '家族法', index: 64 }, // 無効・返還／秘密証書遺言
};

/** 記述・民法 → 民法記述（一部は他分野へ） */
const KIJUTSU_PRIMARY: Record<string, number> = {
  nhxt7h: 1, // 無権代理系
  it2fkr: 1, // 無権代理の相続
  y9f8hi: 3, // 背信的悪意者
  wauiu4: 10, // 他主占有→自主占有
  '47xfwo': 14, // 物上代位
  rcw11w: 18, // 代位による妨害排除
  idvfwr: 25, // 代位による移転登記請求
  le3hh7: 31, // 譲渡制限特約
  '5bunyw': 40, // 譲渡禁止特約
  bgxp9l: 47, // 第三者のためにする契約
  '50vss3': 53, // 書面によらない贈与
  z6gcwa: 61, // 請負・契約不適合
  yl2ge0: 68, // 不法行為の時効
  '5yp04i': 73, // 土地工作物責任
  jzd0y8: 78, // 財産分与
  c6egq: 85, // 嫡出否認
};

const KIJUTSU_PRIMARY_TARGETS: Record<string, MinpouPrimaryTarget> = {
  '7cee0m': { learnSubject: '民法総則', index: 49 }, // 詐欺取消
  cmo177: { learnSubject: '民法物権', index: 45 }, // 共有
  tz9w29: { learnSubject: '民法物権', index: 32 }, // 先取特権
};

export const MINPOU_LEARN_LINK_CONFIGS: MinpouLearnLinkConfig[] = [
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '民法総則',
    learnSubject: '民法総則',
    primaryLearn: SOUSOKU_QUIZ_PRIMARY_LEARN,
  },
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '民法物権',
    learnSubject: '民法物権',
    primaryLearn: BUKKEN_PRIMARY,
  },
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '債権総論',
    learnSubject: '債権総論',
    primaryLearn: SAIKEN_SORON_PRIMARY,
  },
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '債権各論',
    learnSubject: '債権各論',
    primaryLearn: SAIKEN_KAKURON_PRIMARY,
  },
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '家族法',
    learnSubject: '家族法',
    primaryLearn: KAZOKU_PRIMARY,
  },
  {
    quizSubject: MINPOU_QUIZ_SUBJECT,
    quizField: '民法総合',
    learnSubject: '民法物権',
    primaryLearn: {},
    primaryLearnTargets: SOGO_PRIMARY_TARGETS,
  },
  {
    quizSubject: '記述',
    quizField: '民法',
    learnSubject: '民法記述',
    primaryLearn: KIJUTSU_PRIMARY,
    primaryLearnTargets: KIJUTSU_PRIMARY_TARGETS,
  },
];

const byQuizKey = new Map(
  MINPOU_LEARN_LINK_CONFIGS.map((c) => [`${c.quizSubject}|${c.quizField}`, c]),
);

export function getMinpouLearnLinkConfig(
  subject: string | undefined,
  field: string | undefined,
): MinpouLearnLinkConfig | null {
  if (!subject || !field) return null;
  return byQuizKey.get(`${subject}|${field}`) || null;
}

export function canResolveMinpouLearnLink(
  subject: string | undefined,
  field: string | undefined,
): boolean {
  return getMinpouLearnLinkConfig(subject, field) != null;
}

export function resolveMinpouPrimaryTarget(
  cfg: MinpouLearnLinkConfig,
  questionText: string,
): MinpouPrimaryTarget | null {
  const hash = getQuestionTextHash(questionText);
  const cross = cfg.primaryLearnTargets?.[hash];
  if (cross && typeof cross.index === 'number' && cross.learnSubject) return cross;
  const idx = cfg.primaryLearn[hash];
  if (typeof idx === 'number' && idx >= 0) {
    return { learnSubject: cfg.learnSubject, index: idx };
  }
  return null;
}
