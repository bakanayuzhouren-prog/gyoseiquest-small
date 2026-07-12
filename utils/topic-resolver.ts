import { getQuestionTextHash } from '@/utils/question-stats';
import {
  getSousokuTopicById,
  getSousokuUnitRoot,
  MINPOU_SOUSOKU_FIELD,
  MINPOU_SOUSOKU_SUBJECT,
  MINPOU_SOUSOKU_TOPICS,
  type SousokuTopic,
  type TopicSource,
} from '@/src/topicMaster/minpouSousoku';

export type ResolvedTopic = {
  topic: SousokuTopic;
  unit: SousokuTopic;
  source: TopicSource;
};

function normalizeHaystack(text: string): string {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 手付けを優先。なければキーワード推定（最長キーワード優先） */
export function resolveSousokuTopics(questionText: string): ResolvedTopic[] {
  const hash = getQuestionTextHash(questionText);
  const handHits = MINPOU_SOUSOKU_TOPICS.filter((t) => t.handQuestionHashes.includes(hash));
  if (handHits.length > 0) {
    // より具体的なサブ論点を優先（parent 付きを先に）
    const sorted = [...handHits].sort((a, b) => Number(!!b.parentId) - Number(!!a.parentId));
    const primary = sorted[0]!;
    return [
      {
        topic: primary,
        unit: getSousokuUnitRoot(primary),
        source: 'hand',
      },
    ];
  }

  const hay = normalizeHaystack(questionText);
  if (!hay) return [];

  type Cand = { topic: SousokuTopic; score: number };
  const cands: Cand[] = [];
  for (const topic of MINPOU_SOUSOKU_TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (!kw) continue;
      if (hay.includes(kw)) score = Math.max(score, kw.length);
    }
    if (score > 0) cands.push({ topic, score });
  }
  if (cands.length === 0) return [];

  cands.sort((a, b) => b.score - a.score || Number(!!b.topic.parentId) - Number(!!a.topic.parentId));
  const primary = cands[0]!.topic;
  return [
    {
      topic: primary,
      unit: getSousokuUnitRoot(primary),
      source: 'estimate',
    },
  ];
}

export function canResolveFieldTopics(subject: string, field: string): boolean {
  return subject === MINPOU_SOUSOKU_SUBJECT && field === MINPOU_SOUSOKU_FIELD;
}

export function resolveFieldTopics(
  subject: string,
  field: string,
  questionText: string,
): ResolvedTopic[] {
  if (!canResolveFieldTopics(subject, field)) return [];
  return resolveSousokuTopics(questionText);
}

export function getTopicById(id: string): SousokuTopic | undefined {
  return getSousokuTopicById(id);
}
