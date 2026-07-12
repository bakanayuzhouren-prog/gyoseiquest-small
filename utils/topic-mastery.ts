import { LEARN_CONTENT } from '@/src/learn';
import { SUBJECTS } from '@/src/questions';
import type { LearnLinkTarget } from '@/src/quizLearnBridge';
import {
  canResolveMinpouLearnLink,
  getMinpouLearnLinkConfig,
  resolveMinpouPrimaryTarget,
  type MinpouLearnLinkConfig,
} from '@/src/topicMaster/minpouLearnLink';
import {
  getSousokuUnitRoot,
  listSousokuSiblings,
  MINPOU_SOUSOKU_FIELD,
  MINPOU_SOUSOKU_LEARN_SUBJECT,
  MINPOU_SOUSOKU_SUBJECT,
  SOUSOKU_QUIZ_PRIMARY_LEARN,
  type SousokuTopic,
} from '@/src/topicMaster/minpouSousoku';
import { getQuestionStats, getQuestionTextHash, type QuestionStats } from '@/utils/question-stats';
import { canResolveFieldTopics, resolveSousokuTopics, type ResolvedTopic } from '@/utils/topic-resolver';

export type TopicSiblingStat = {
  topicId: string;
  label: string;
  hash: string;
  preview: string;
  correct: number;
  wrong: number;
  rate: number | null;
  isCurrent: boolean;
};

export type TopicMasteryInsight = {
  resolved: ResolvedTopic;
  /** 単元内の得意・不得意バー用 */
  siblings: TopicSiblingStat[];
  /** 単元全体のざっくりレベル（構想の6〜10を意識） */
  unitLevel: number;
  unitLabel: string;
  gapMessage: string;
  nextStep: {
    step1LearnIndex: number | null;
    step1Label: string;
    step2ComicKey: string | null;
    step2Label: string;
  };
  needsReviewTag: boolean;
};

function levelFromRates(rates: number[], wrongHeavy: boolean): { level: number; label: string } {
  if (rates.length === 0) {
    return { level: 1, label: '未測定' };
  }
  const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
  const min = Math.min(...rates);
  const spread = avg - min;

  if (avg < 40 || wrongHeavy) return { level: 2, label: '入口から再構築' };
  if (avg < 55) return { level: 4, label: '基本論点を固める段階' };
  if (spread >= 25 && min < 60) return { level: 6, label: '易しいは分かる／難しいで落ちる' };
  if (avg < 72) return { level: 6, label: '合格ラインへ押し上げる段階' };
  if (avg < 80) return { level: 7, label: '例年通りなら合格点圏' };
  if (avg < 88) return { level: 8, label: '意地悪問題にも耐える入口' };
  if (avg < 95) return { level: 9, label: '意地悪・横断にも対応' };
  return { level: 10, label: '司法試験級の運用力' };
}

function pickLearnIndexes(topic: SousokuTopic, questionText?: string): number[] {
  const unit = getSousokuUnitRoot(topic);
  const raw = topic.learnIndexes.length > 0 ? topic.learnIndexes : unit.learnIndexes;
  const list = [...new Set(raw.filter((n) => Number.isFinite(n) && n >= 0))];
  if (questionText) {
    const hash = getQuestionTextHash(questionText);
    const primary = SOUSOKU_QUIZ_PRIMARY_LEARN[hash];
    if (typeof primary === 'number') {
      return [primary, ...list.filter((n) => n !== primary)];
    }
  }
  return list;
}

function pickLearnIndex(topic: SousokuTopic, questionText?: string): number | null {
  const list = pickLearnIndexes(topic, questionText);
  return list.length > 0 ? list[0]! : null;
}

function pickComicKey(topic: SousokuTopic): string | null {
  const unit = getSousokuUnitRoot(topic);
  return topic.comicKeys[0] || unit.comicKeys[0] || null;
}

function getLearnList(learnSubject: string): string[] {
  const list = (LEARN_CONTENT as Record<string, string[]>)[learnSubject];
  return Array.isArray(list) ? list : [];
}

function primaryTargetFor(cfg: MinpouLearnLinkConfig, questionText: string) {
  return resolveMinpouPrimaryTarget(cfg, questionText);
}

const CHOICE_MATCH_KEYS = [
  '後見監督', '後見開始', '保佐開始', '補助開始', '代理権', '同意', '催告', '詐術', '心裡', '虚偽', '錯誤', '詐欺', '強迫', '表見', '無権', '復代理', '附款', '条件', '期限', '消滅時効', '取得時効', '援用', '不在者', '失踪', '管理人', '公序', '社団', '組合', '総有', '理事', '占有', '善意', '第三者', '到達', '意思表示',
  '地上権', '地役権', '所有権', '共有', '相隣', '即時取得', '占有改定', '留置権', '先取特権', '質権', '抵当権', '根抵当', '譲渡担保', '物権的', '返還請求', '妨害排除', '登記', '時効取得',
  '法定利率', '遅延損害', '債務不履行', '履行遅滞', '履行不能', '債権者代位', '詐害行為', '連帯債務', '連帯保証', '保証', '弁済', '受領遅滞', '相殺', '更改', '債務引受', '債権譲渡', '代物弁済',
  '同時履行', '危険負担', '契約の解除', '損害賠償', '不法行為', '使用者責任', '共同不法行為', '不当利得', '事務管理', '過失相殺',
  '売買', '贈与', '消費貸借', '使用貸借', '賃貸借', '請負', '委任', '寄託', '転貸', '手付', '契約不適合', '敷金',
  '婚姻', '離婚', '縁組', '養子', '特別養子', '親権', '後見', '扶養', '相続', '遺言', '遺留分', '遺産分割', '相続放棄', '特別受益', '寄与分',
];

function scoreChoiceToLearn(choiceText: string, learnText: string): number {
  const a = String(choiceText || '');
  const b = String(learnText || '');
  let score = 0;
  for (const key of CHOICE_MATCH_KEYS) {
    if (a.includes(key) && b.includes(key)) score += key.length;
  }
  return score;
}

function pickChoiceLearnIndex(
  learnList: string[],
  choiceText: string,
  candidates: number[],
  choiceIndex?: number | null,
): number {
  if (candidates.length === 0) return 0;
  const choice = String(choiceText || '');
  let bestIdx = candidates[0]!;
  let bestScore = -1;
  for (const idx of candidates) {
    if (idx < 0 || idx >= learnList.length) continue;
    const sc = scoreChoiceToLearn(choice, String(learnList[idx] || ''));
    const tieBreak =
      typeof choiceIndex === 'number' && choiceIndex >= 0 && idx === candidates[choiceIndex] ? 0.5 : 0;
    const total = sc + tieBreak;
    if (total > bestScore) {
      bestScore = total;
      bestIdx = idx;
    }
  }
  if (
    bestScore <= 0 &&
    typeof choiceIndex === 'number' &&
    choiceIndex >= 0 &&
    choiceIndex < candidates.length
  ) {
    bestIdx = candidates[choiceIndex]!;
  }
  return bestIdx;
}

/** 総則以外: 主カード周辺＋全文照合の候補 */
function buildFieldChoiceCandidates(
  learnList: string[],
  primary: number,
  choiceText: string,
): number[] {
  const near: number[] = [];
  for (let i = Math.max(0, primary - 2); i < Math.min(learnList.length, primary + 12); i++) {
    near.push(i);
  }
  const scored: { idx: number; sc: number }[] = [];
  for (let i = 0; i < learnList.length; i++) {
    const sc = scoreChoiceToLearn(choiceText, String(learnList[i] || ''));
    if (sc > 0) scored.push({ idx: i, sc });
  }
  scored.sort((a, b) => b.sc - a.sc);
  const fromScore = scored.slice(0, 8).map((x) => x.idx);
  return [...new Set([primary, ...near, ...fromScore])];
}

/** 問題を解く → 見て聞いて覚える の主リンク（結果画面用） */
export function resolveTopicLearnLinkTarget(
  subject: string | undefined,
  field: string | undefined,
  questionText: string,
): LearnLinkTarget | null {
  const cfg = getMinpouLearnLinkConfig(subject, field);
  if (!cfg) return null;

  // 総則: 論点マスタ優先
  if (field === MINPOU_SOUSOKU_FIELD && canResolveFieldTopics(subject!, field)) {
    const resolved = resolveSousokuTopics(questionText)[0];
    if (resolved) {
      const index = pickLearnIndex(resolved.topic, questionText);
      if (index != null) {
        return {
          subject: MINPOU_SOUSOKU_LEARN_SUBJECT,
          index,
          field: MINPOU_SOUSOKU_FIELD,
          source: resolved.source === 'hand' ? 'topic-master-hand' : 'topic-master-estimate',
        };
      }
    }
  }

  const target = primaryTargetFor(cfg, questionText);
  if (!target) return null;
  return {
    subject: target.learnSubject,
    index: target.index,
    field: cfg.quizField,
    source: 'topic-master-hand',
  };
}

/**
 * 肢ごとの見て聞いて覚えるリンク。
 * その肢の文言に一番近いカードを1件だけ返す（関連カード一覧は出さない）。
 */
export function resolveTopicLearnLinkTargetForChoice(
  subject: string | undefined,
  field: string | undefined,
  questionText: string,
  choiceText: string,
  choiceIndex?: number | null,
): LearnLinkTarget | null {
  const cfg = getMinpouLearnLinkConfig(subject, field);
  if (!cfg || !canResolveMinpouLearnLink(subject, field)) return null;

  // 総則: 論点の learnIndexes 内で照合
  if (field === MINPOU_SOUSOKU_FIELD && subject === MINPOU_SOUSOKU_SUBJECT) {
    const learnList = getLearnList(cfg.learnSubject);
    if (learnList.length === 0) return null;
    const resolved = resolveSousokuTopics(questionText)[0];
    if (resolved) {
      const candidates = pickLearnIndexes(resolved.topic, questionText);
      if (candidates.length > 0) {
        const bestIdx = pickChoiceLearnIndex(learnList, choiceText, candidates, choiceIndex);
        return {
          subject: MINPOU_SOUSOKU_LEARN_SUBJECT,
          index: bestIdx,
          field: MINPOU_SOUSOKU_FIELD,
          source: resolved.source === 'hand' ? 'topic-master-hand' : 'topic-master-estimate',
        };
      }
    }
  }

  const primaryTarget = primaryTargetFor(cfg, questionText);
  if (!primaryTarget) return null;
  const learnList = getLearnList(primaryTarget.learnSubject);
  if (learnList.length === 0) return null;

  const primary = primaryTarget.index;
  const candidates = buildFieldChoiceCandidates(learnList, primary, choiceText);
  const bestIdx = pickChoiceLearnIndex(learnList, choiceText, candidates, choiceIndex);
  return {
    subject: primaryTarget.learnSubject,
    index: bestIdx,
    field: cfg.quizField,
    source: 'topic-master-hand',
  };
}

/** @deprecated 肢ごと表示では使わない。問単位の一覧が必要なときだけ */
export function listTopicRelatedLearnTargets(
  subject: string | undefined,
  field: string | undefined,
  questionText: string,
  limit = 5,
): LearnLinkTarget[] {
  const primary = resolveTopicLearnLinkTarget(subject, field, questionText);
  if (!primary) return [];
  if (field === MINPOU_SOUSOKU_FIELD) {
    const resolved = resolveSousokuTopics(questionText)[0];
    if (!resolved) return [primary];
    return pickLearnIndexes(resolved.topic, questionText)
      .slice(0, limit)
      .map((index) => ({
        subject: MINPOU_SOUSOKU_LEARN_SUBJECT,
        index,
        field: MINPOU_SOUSOKU_FIELD,
        source: resolved.source === 'hand' ? 'topic-master-hand' : 'topic-master-estimate',
      }));
  }
  const cfg = getMinpouLearnLinkConfig(subject, field);
  if (!cfg) return [primary];
  const learnList = getLearnList(primary.subject);
  const start = primary.index;
  const out: LearnLinkTarget[] = [];
  for (let i = start; i < Math.min(learnList.length, start + limit); i++) {
    out.push({
      subject: primary.subject,
      index: i,
      field: cfg.quizField,
      source: 'topic-master-hand',
    });
  }
  return out;
}

/** 単元内の手付け問題だけを軽量に集計（全AsyncStorage走査はしない） */
export async function buildSousokuMasteryInsight(
  questionText: string,
  currentStats: QuestionStats | null,
): Promise<TopicMasteryInsight | null> {
  const resolvedList = resolveSousokuTopics(questionText);
  if (resolvedList.length === 0) return null;
  const resolved = resolvedList[0]!;
  const currentHash = getQuestionTextHash(questionText);

  const quizList = (SUBJECTS as any)?.[MINPOU_SOUSOKU_SUBJECT]?.[MINPOU_SOUSOKU_FIELD] as
    | { text?: string }[]
    | undefined;
  const questions = Array.isArray(quizList) ? quizList : [];

  const hashToText = new Map<string, string>();
  for (const q of questions) {
    const t = String(q?.text || '');
    if (!t) continue;
    hashToText.set(getQuestionTextHash(t), t);
  }

  const siblingTopics = listSousokuSiblings(resolved.topic);
  const seenHash = new Set<string>();
  const siblings: TopicSiblingStat[] = [];

  for (const topic of siblingTopics) {
    for (const hash of topic.handQuestionHashes) {
      if (seenHash.has(hash)) continue;
      seenHash.add(hash);
      const text = hashToText.get(hash) || '';
      const stats =
        hash === currentHash
          ? currentStats || { correct: 0, wrong: 0, consecutiveCorrect: 0 }
          : text
            ? await getQuestionStats(MINPOU_SOUSOKU_SUBJECT, MINPOU_SOUSOKU_FIELD, text)
            : { correct: 0, wrong: 0, consecutiveCorrect: 0 };
      const attempts = stats.correct + stats.wrong;
      const rate = attempts > 0 ? Math.round((stats.correct / attempts) * 100) : null;
      siblings.push({
        topicId: topic.id,
        label: topic.label,
        hash,
        preview: text ? text.replace(/\s+/g, ' ').slice(0, 36) : hash,
        correct: stats.correct,
        wrong: stats.wrong,
        rate,
        isCurrent: hash === currentHash,
      });
    }
  }

  const measuredRates = siblings.map((s) => s.rate).filter((r): r is number => r != null);
  const wrongHeavy = siblings.some((s) => s.wrong >= 3 && (s.rate ?? 100) < 50);
  const { level, label } = levelFromRates(measuredRates, wrongHeavy);

  const weak = siblings
    .filter((s) => s.rate != null && s.rate < 70)
    .sort((a, b) => (a.rate ?? 0) - (b.rate ?? 0));
  const strong = siblings
    .filter((s) => s.rate != null && s.rate >= 80)
    .sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));

  let gapMessage = resolved.topic.insightHint;
  if (strong.length > 0 && weak.length > 0) {
    gapMessage = `「${strong[0]!.label}」は取れている。次は「${weak[0]!.label}」を埋めれば、この単元は一気に安定する。`;
  } else if (weak.length > 0) {
    gapMessage = `いまの穴は「${weak[0]!.label}」。${resolved.topic.insightHint}`;
  } else if (measuredRates.length === 0) {
    gapMessage = `まだ単元内の分布が見えない。1問解くごとに得意・不得意が分かれていく。`;
  }

  const step1 = pickLearnIndex(resolved.topic, questionText);
  const step2 = pickComicKey(resolved.topic);

  return {
    resolved,
    siblings,
    unitLevel: level,
    unitLabel: label,
    gapMessage,
    nextStep: {
      step1LearnIndex: step1,
      step1Label:
        step1 != null
          ? `Step1: 見て聞いて覚える（${MINPOU_SOUSOKU_LEARN_SUBJECT}）`
          : 'Step1: 対応カード準備中',
      step2ComicKey: step2,
      step2Label: step2 ? 'Step2: 図解・4コマで背景を見直す' : 'Step2: 図解はこれから追加',
    },
    needsReviewTag: resolved.source === 'estimate',
  };
}

export function sousokuLearnRoute(index: number): { pathname: string; params: Record<string, string> } {
  return {
    pathname: '/learn/[subject]',
    params: {
      subject: MINPOU_SOUSOKU_LEARN_SUBJECT,
      index: String(index),
      autoplay: '1',
    },
  };
}
