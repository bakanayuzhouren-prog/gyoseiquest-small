import { KNOWLEDGE_GAP_INDEX } from '@/src/generated/knowledgeGapIndex';
import { ensureQuizSubject } from '@/src/studyCache';
import { ALL_QUESTIONS_SUBJECTS } from '@/utils/allQuestionsMenu';
import { getHiddenHashes } from '@/utils/question-hidden';
import { getQuestionTextHash } from '@/utils/question-stats';
import { filterHiddenFromQuestions, filterQuizQuestionsByMode } from '@/utils/quiz-question-pipeline';

export type AllQuestionSearchHit = {
  key: string;
  subject: string;
  subjectTitle: string;
  field: string;
  fieldLabel: string;
  index: number;
  textHash: string;
  preview: string;
  reason: string;
};

export type SearchDoc = {
  subject: string;
  subjectTitle: string;
  field: string;
  fieldLabel: string;
  index: number;
  textHash: string;
  preview: string;
  blob: string;
};

type Alias = {
  triggers: string[];
  label: string;
  /** 各配列は「どれか一つ」。配列どうしはすべて満たす。 */
  groups: string[][];
};

const ALIASES: Alias[] = [
  {
    triggers: ['聴聞'],
    label: '聴聞',
    groups: [['聴聞', '弁明の機会']],
  },
  {
    triggers: ['先取特権'],
    label: '先取特権',
    groups: [['先取特権', '一般の先取特権', '動産先取特権', '不動産先取特権']],
  },
  {
    triggers: ['令和の判例', '令和判例', 'れいわの判例', 'れいわ判例'],
    label: '令和の判例',
    groups: [
      ['令和', '令元', '令2', '令3', '令4', '令5', '令6', '令7', '令8', '令9', '最判令', '最大判令', '最大決令'],
      ['判例', '最判', '最大判', '最大決', '最決', '最高裁'],
    ],
  },
  {
    triggers: ['ジェンダー問題', 'ジェンダー', '性差別'],
    label: 'ジェンダー問題',
    groups: [[
      'ジェンダー',
      '女性活躍',
      '女性の職業',
      '男女平等',
      '男女共同',
      '両性の本質的平等',
      '性別',
      '女性差別',
      '性的指向',
      'セクハラ',
      '同一の氏',
      '女子の定年',
    ]],
  },
];

const GENERIC_TAGS = new Set(['民法', '憲法', '行政法', '商法', '会社法', '基礎知識', '基礎法学']);

let docsPromise: Promise<SearchDoc[]> | null = null;

function normalize(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function previewOf(text: string): string {
  const cleaned = text.replace(/^(?:【[^】]*TAC[^】]*】\s*)+/, '').replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').replace(/※/g, '').replace(/\s+/g, ' ').trim();
  return cleaned.length > 52 ? `${cleaned.slice(0, 52)}…` : cleaned;
}

function blobOf(question: {
  text?: string;
  choices?: unknown;
  explain?: string;
  memo?: string;
  choiceExplanations?: unknown;
}): string {
  const pieces = [
    question.text,
    question.choices,
    question.explain,
    question.memo,
    question.choiceExplanations,
  ];
  return normalize(pieces.map(stringifyPiece).filter(Boolean).join('\n'));
}

function stringifyPiece(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(stringifyPiece).join('\n');
  return '';
}

function matchedAlias(query: string): Alias | null {
  const q = normalize(query);
  return ALIASES.find((alias) => alias.triggers.some((trigger) => q.includes(normalize(trigger)))) || null;
}

function knowledgeNeedles(query: string): string[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const needles = new Set<string>();
  for (const entry of KNOWLEDGE_GAP_INDEX) {
    for (const tag of entry.tags) {
      const needle = normalize(tag);
      if (needle.length < 2 || GENERIC_TAGS.has(tag)) continue;
      if (q.includes(needle) || needle.includes(q)) needles.add(needle);
    }
    const title = normalize(entry.title);
    if (title.length >= 4 && (title.includes(q) || q.includes(title))) needles.add(title.slice(0, 12));
    for (const bullet of entry.bullets) {
      const text = normalize(bullet);
      if (text.includes(q) && q.length >= 2) needles.add(q);
    }
  }
  return [...needles];
}

function groupHit(blob: string, group: string[]): boolean {
  return group.some((needle) => blob.includes(normalize(needle)));
}

export function loadAllQuestionSearchDocs(): Promise<SearchDoc[]> {
  const job = buildDocs().catch((error) => {
    if (docsPromise === job) docsPromise = null;
    throw error;
  });
  docsPromise = job;
  return job;
}

async function buildDocs(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];
  for (const subject of ALL_QUESTIONS_SUBJECTS) {
    const data = await ensureQuizSubject(subject.id);
    for (const field of subject.fields) {
      const source = data[field.field];
      if (!Array.isArray(source) || source.length === 0) continue;
      const hidden = await getHiddenHashes(subject.id, field.field);
      const list = filterHiddenFromQuestions(
        filterQuizQuestionsByMode(source, subject.id, 'all'),
        hidden,
        getQuestionTextHash,
      );
      list.forEach((question, index) => {
        const text = String(question?.text || '');
        if (!text) return;
        docs.push({
          subject: subject.id,
          subjectTitle: subject.title,
          field: field.field,
          fieldLabel: field.label,
          index,
          textHash: getQuestionTextHash(text),
          preview: previewOf(text),
          blob: blobOf(question),
        });
      });
    }
  }
  return docs;
}

export function searchAllQuestions(docs: SearchDoc[], rawQuery: string, limit = 40): AllQuestionSearchHit[] {
  const query = rawQuery.trim();
  const q = normalize(query);
  if (q.length < 2) return [];
  const alias = matchedAlias(query);
  const fromKnowledge = knowledgeNeedles(query);
  return docs
    .map((doc) => ({ doc, score: scoreDoc(doc, alias, fromKnowledge, q) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc, score }) => ({
      key: `${doc.subject}|${doc.field}|${doc.index}|${score}`,
      subject: doc.subject,
      subjectTitle: doc.subjectTitle,
      field: doc.field,
      fieldLabel: doc.fieldLabel,
      index: doc.index,
      textHash: doc.textHash,
      preview: doc.preview,
      reason: reasonFor(doc, q, query, alias, fromKnowledge),
    }));
}

function scoreDoc(doc: SearchDoc, alias: Alias | null, fromKnowledge: string[], q: string): number {
  let score = 0;
  if (alias && alias.groups.every((group) => groupHit(doc.blob, group))) score += 24;
  const knowledgeHits = fromKnowledge.filter((needle) => needle.length >= 2 && doc.blob.includes(needle)).length;
  if (knowledgeHits > 0) score += 8 + Math.min(knowledgeHits, 4);
  if (doc.blob.includes(q)) score += 30;
  if (doc.preview && normalize(doc.preview).includes(q)) score += 6;
  return score;
}

function reasonFor(doc: SearchDoc, q: string, query: string, alias: Alias | null, fromKnowledge: string[]): string {
  if (doc.blob.includes(q)) return query;
  if (alias && alias.groups.every((group) => groupHit(doc.blob, group))) return alias.label;
  if (fromKnowledge.some((needle) => doc.blob.includes(needle))) return '知識ベースの関連';
  return query;
}

/** ここまでの全問題の出題順で、問題文ハッシュの位置を返す。 */
export async function findAllModeIndex(subject: string, field: string, textHash: string): Promise<number> {
  if (!subject || !field || !textHash) return -1;
  const data = await ensureQuizSubject(subject);
  const source = data[field];
  if (!Array.isArray(source)) return -1;
  const hidden = await getHiddenHashes(subject, field);
  const list = filterHiddenFromQuestions(
    filterQuizQuestionsByMode(source, subject, 'all'),
    hidden,
    getQuestionTextHash,
  );
  return list.findIndex((question) => getQuestionTextHash(String(question?.text || '')) === textHash);
}
