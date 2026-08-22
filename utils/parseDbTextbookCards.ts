/**
 * DB教科書（content/textbook/app）の出題カード Markdown を構造化する。
 * 正本の見出し「出題の型」「答案の芯」はそのまま読み、UI側で「問」「解答例」に対応づける。
 */

import { STATUTES } from '@/src/questions';
import {
  formatResolvedStatutesForModal,
  lawNameToStatuteBucket,
  resolveStatuteArticlesFromBucket,
  splitPlainByStatuteRefs,
  type StatuteBucketKey,
} from '@/utils/learnStatuteInline';

export type DbTextbookCard = {
  id: string;
  /** 1始まりの問番号（画像キー textbook/<slug>/q{N} 用） */
  questionNumber: number;
  title: string;
  /** 出題の型 → UI「問」（[[image:]] タグ除去後） */
  question: string;
  /** 問の下に出す画像キー（MDの [[image:]] ＋ 規約キー） */
  questionImageKeys: string[];
  /** 答案の芯 → UI「解答例」 */
  answerExample: string;
  tip: string;
  /** MDの **条文**（あれば）。なければタイトル等から遅延解決 */
  statuteFromMarkdown: string;
  /** 条文解決用の検索テキスト */
  statuteSearchText: string;
};

export type DbTextbookBlock =
  | { kind: 'preamble'; markdown: string }
  | { kind: 'section'; title: string }
  | { kind: 'card'; card: DbTextbookCard };

const SECTION_ALIASES: Record<string, 'question' | 'answer' | 'tip' | 'statute'> = {
  出題の型: 'question',
  問: 'question',
  答案の芯: 'answer',
  解答例: 'answer',
  切るポイント: 'tip',
  条文: 'statute',
};

const LAW_FROM_HEADING: { test: RegExp; law: string }[] = [
  { test: /行政手続法|行手法/, law: '行政手続法' },
  { test: /行政不服審査法|行審法/, law: '行政不服審査法' },
  { test: /行政事件訴訟法|行訴法/, law: '行政事件訴訟法' },
  { test: /国家賠償法|国賠/, law: '国家賠償法' },
  { test: /地方自治法|地自法/, law: '地方自治法' },
  { test: /民法/, law: '民法' },
  { test: /憲法/, law: '憲法' },
  { test: /会社法|商法/, law: '会社法' },
];

function normalizeHeadingLabel(raw: string): string {
  return raw.replace(/\*+/g, '').replace(/[:：]/g, '').trim();
}

function defaultLawForSlug(slug: string): string {
  if (slug === 'minpou-kijutsu') return '民法';
  if (slug === 'gyosei-kijutsu') return '行政手続法';
  if (slug === 'kisochi') return '個人情報保護法';
  return '';
}

function detectLawFromHeading(title: string): string | null {
  for (const row of LAW_FROM_HEADING) {
    if (row.test.test(title)) return row.law;
  }
  return null;
}

/** タイトル内の 〔…〕 や条表記を条文解決用テキストにする */
export function buildStatuteSearchText(title: string, question: string, contextLaw: string): string {
  const bracket = title.match(/〔([^〕]+)〕/);
  const fromBracket = bracket?.[1]?.trim() || '';
  const normalized = fromBracket
    .replace(/個情法/g, '個人情報保護法')
    .replace(/行手法/g, '行政手続法')
    .replace(/行審法/g, '行政不服審査法')
    .replace(/行訴法/g, '行政事件訴訟法')
    .replace(/国賠法/g, '国家賠償法')
    .replace(/地自法/g, '地方自治法');

  const parts = [normalized, title, question].filter(Boolean);
  let text = parts.join(' ');
  if (
    contextLaw &&
    !/(憲法|民法|商法|会社法|行政手続法|行政不服審査法|行政事件訴訟法|国家賠償法|地方自治法|個人情報保護法)/.test(
      text,
    )
  ) {
    text = `${contextLaw}${text}`;
  }
  return text;
}

export function resolveStatutesMarkdown(searchText: string): string {
  const segs = splitPlainByStatuteRefs(searchText);
  const seen = new Set<string>();
  const collected: { title: string; content: string }[] = [];

  for (const seg of segs) {
    if (seg.kind !== 'statute') continue;
    const bucketKey = lawNameToStatuteBucket(seg.lawName, seg.articleNum);
    if (!bucketKey) continue;
    const bucket = (STATUTES as Record<string, { title: string; content: string }[]>)[
      bucketKey as StatuteBucketKey
    ];
    const found = resolveStatuteArticlesFromBucket(bucket, seg.articleNum, {
      articleOf: seg.articleOf,
      paragraphNum: seg.paragraphNum,
    });
    for (const item of found) {
      const key = `${item.title}\n${item.content}`;
      if (seen.has(key)) continue;
      seen.add(key);
      collected.push(item);
    }
  }

  return formatResolvedStatutesForModal(collected).trim();
}

/** 条文トグルを出すか（MD本文 or 解決可能な条参照） */
export function cardHasStatuteContent(card: DbTextbookCard): boolean {
  if (card.statuteFromMarkdown.trim()) return true;
  const segs = splitPlainByStatuteRefs(card.statuteSearchText);
  return segs.some((seg) => {
    if (seg.kind !== 'statute') return false;
    return Boolean(lawNameToStatuteBucket(seg.lawName, seg.articleNum));
  });
}

export function resolveCardStatuteText(card: DbTextbookCard): string {
  const fromMd = card.statuteFromMarkdown.trim();
  if (fromMd) return fromMd;
  return resolveStatutesMarkdown(card.statuteSearchText);
}

const IMAGE_TAG_RE = /\[\[image:([^\]]+)\]\]/gi;

/** 問本文から [[image:key]] を抜き、本文とキー配列に分ける */
export function extractQuestionImages(questionRaw: string, slug: string, questionNumber: number): {
  question: string;
  imageKeys: string[];
} {
  const keys: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const k = raw.trim().replace(/\.(png|webp|jpg|jpeg)$/i, '');
    if (!k || seen.has(k)) return;
    seen.add(k);
    keys.push(k);
  };

  IMAGE_TAG_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = IMAGE_TAG_RE.exec(questionRaw)) !== null) {
    push(m[1]);
  }

  // 規約キー（アセット登録済みならUI側で表示）
  push(`textbook/${slug}/q${questionNumber}`);

  const question = questionRaw.replace(IMAGE_TAG_RE, '').replace(/\n{3,}/g, '\n\n').trim();
  return { question, imageKeys: keys };
}

function flushCard(
  draft: {
    id: string;
    questionNumber: number;
    title: string;
    question: string;
    answer: string;
    tip: string;
    statute: string;
  } | null,
  contextLaw: string,
  slug: string,
  out: DbTextbookBlock[],
): void {
  if (!draft) return;
  const { question, imageKeys } = extractQuestionImages(draft.question, slug, draft.questionNumber);
  out.push({
    kind: 'card',
    card: {
      id: draft.id,
      questionNumber: draft.questionNumber,
      title: draft.title,
      question,
      questionImageKeys: imageKeys,
      answerExample: draft.answer.trim(),
      tip: draft.tip.trim(),
      statuteFromMarkdown: draft.statute.trim(),
      statuteSearchText: buildStatuteSearchText(draft.title, question, contextLaw),
    },
  });
}

/**
 * bundle.markdown を preamble / 章見出し / Qカードに分解する。
 */
export function parseDbTextbookBlocks(markdown: string, slug: string): DbTextbookBlock[] {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks: DbTextbookBlock[] = [];
  const preamble: string[] = [];
  let sawCard = false;
  let contextLaw = defaultLawForSlug(slug);
  let cardIndex = 0;

  let draft: {
    id: string;
    questionNumber: number;
    title: string;
    question: string;
    answer: string;
    tip: string;
    statute: string;
    section: 'question' | 'answer' | 'tip' | 'statute' | null;
  } | null = null;

  const appendToSection = (text: string) => {
    if (!draft || !draft.section) return;
    const key =
      draft.section === 'question'
        ? 'question'
        : draft.section === 'answer'
          ? 'answer'
          : draft.section === 'tip'
            ? 'tip'
            : 'statute';
    if (draft[key]) draft[key] += `\n${text}`;
    else draft[key] = text;
  };

  for (const rawLine of lines) {
    const line = rawLine;
    const trimmed = line.trim();

    if (/^---+$/.test(trimmed)) {
      continue;
    }

    const h2 = trimmed.match(/^##\s+(.*)$/);
    if (h2) {
      const title = h2[1].trim();
      if (/^Q\d+/i.test(title) || /^問\d+/.test(title)) {
        if (!sawCard && preamble.length) {
          blocks.push({ kind: 'preamble', markdown: preamble.join('\n').trim() });
          preamble.length = 0;
        }
        flushCard(draft, contextLaw, slug, blocks);
        sawCard = true;
        cardIndex += 1;
        const fromTitle = detectLawFromHeading(title);
        if (fromTitle) contextLaw = fromTitle;
        draft = {
          id: `q-${cardIndex}`,
          questionNumber: cardIndex,
          title,
          question: '',
          answer: '',
          tip: '',
          statute: '',
          section: null,
        };
        continue;
      }
    }

    const h1 = trimmed.match(/^#\s+(.*)$/);
    if (h1 && !trimmed.startsWith('##')) {
      const title = h1[1].trim();
      if (!sawCard) {
        preamble.push(line);
        continue;
      }
      flushCard(draft, contextLaw, slug, blocks);
      draft = null;
      const law = detectLawFromHeading(title);
      if (law) contextLaw = law;
      blocks.push({ kind: 'section', title });
      continue;
    }

    if (!draft) {
      if (!sawCard) preamble.push(line);
      continue;
    }

    const boldOnly = trimmed.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    if (boldOnly) {
      const label = normalizeHeadingLabel(boldOnly[1]);
      const mapped = SECTION_ALIASES[label];
      if (mapped) {
        draft.section = mapped;
        const rest = boldOnly[2].trim();
        if (rest) appendToSection(rest);
        continue;
      }
    }

    if (draft.section) {
      appendToSection(line);
    }
  }

  flushCard(draft, contextLaw, slug, blocks);
  if (!sawCard && preamble.length) {
    blocks.push({ kind: 'preamble', markdown: preamble.join('\n').trim() });
  }

  return blocks.filter((b) => {
    if (b.kind === 'preamble') return Boolean(b.markdown.trim());
    if (b.kind === 'section') return Boolean(b.title.trim());
    return true;
  });
}
