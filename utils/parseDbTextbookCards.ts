/**
 * DB教科書（content/textbook/app）の出題カード Markdown を構造化する。
 * 正本の見出し「出題の型」「答案の芯」はそのまま読み、UI側で「問」「解答例」に対応づける。
 */

import { pickGyoshoHikokuRelatedImageKeys } from '@/src/gyoshoHikokuDeepdiveImage';
import { pickGyoshoJunyoRelatedImageKeys } from '@/src/gyoshoJunyoDeepdiveImage';
import { pickKokubaiJuminRelatedImageKeys } from '@/src/kokubaiJuminDeepdiveImage';
import { ISHI_HYOJI_TAIKO_IMAGE_KEY, pickIshiHyojiRelatedImageKeys } from '@/src/ishiHyojiDeepdiveImage';
import { STATUTES } from '@/src/questions';
import { statuteMarkdownForKisochiCard } from '@/utils/kisochiStatuteSnippets';
import {
  formatResolvedStatutesForModal,
  lawNameToStatuteBucket,
  resolveStatuteArticlesFromBucket,
  splitPlainByStatuteRefs,
  type StatuteBucketKey,
} from '@/utils/learnStatuteInline';

export type DbTextbookCard = {
  id: string;
  /** 見出しの本体番号（Q1-2 なら 1） */
  questionNumber: number;
  /** 画像キー textbook/<slug>/q{slot} 用（Q1-2 なら `1-2`） */
  imageSlot: string;
  title: string;
  /** 出題の型 → UI「問」（[[image:]] タグ除去後） */
  question: string;
  /** 問の下に出す画像キー（MDの [[image:]] ＋ 規約キー） */
  questionImageKeys: string[];
  /** 「関連画像」トグルで出すキー（問の下には出さない） */
  relatedImageKeys: string[];
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
  { test: /行政書士法/, law: '行政書士法' },
  { test: /戸籍法/, law: '戸籍法' },
  { test: /住民基本台帳法|住基法/, law: '住民基本台帳法' },
  { test: /個人情報保護法|個情法/, law: '個人情報保護法' },
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
    .replace(/住基法/g, '住民基本台帳法')
    .replace(/行手法/g, '行政手続法')
    .replace(/行審法/g, '行政不服審査法')
    .replace(/行訴法/g, '行政事件訴訟法')
    .replace(/国賠法/g, '国家賠償法')
    .replace(/地自法/g, '地方自治法');

  const parts = [normalized, title, question].filter(Boolean);
  let text = parts.join(' ');
  if (
    contextLaw &&
    !/(憲法|民法|商法|会社法|行政手続法|行政不服審査法|行政事件訴訟法|国家賠償法|地方自治法|個人情報保護法|行政書士法|戸籍法|住民基本台帳法)/.test(
      text,
    )
  ) {
    text = `${contextLaw}${text}`;
  }
  return text;
}

export function resolveStatuteItems(searchText: string): Array<{ title: string; content: string }> {
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

  return collected;
}

export function resolveStatutesMarkdown(searchText: string): string {
  return formatResolvedStatutesForModal(resolveStatuteItems(searchText)).trim();
}

/** 答案と突き合わせるための正規化（表記ゆれを畳む） */
export function normalizeStatuteAnswerMatchText(raw: string): string {
  return String(raw || '')
    .replace(/（\d+字）/g, '')
    .replace(/[\[\]【】]/g, '')
    .replace(/重大な過失/g, '重過失')
    .replace(/若しくは/g, '又は')
    .replace(/表意者に錯誤があることを/g, '錯誤を')
    .replace(/表意者と同一の錯誤に陥っていた/g, '双方同一の錯誤')
    .replace(/同一の錯誤に陥っていた/g, '同一の錯誤')
    .replace(/双方が同一の錯誤/g, '双方同一の錯誤')
    .replace(/によって/g, 'で')
    .replace(/[。、．，,\s　・]/g, '');
}

function statuteOverlapScore(bodyNorm: string, answerNorm: string): number {
  if (!bodyNorm || !answerNorm) return 0;
  if (answerNorm.includes(bodyNorm) || bodyNorm.includes(answerNorm)) return 1;
  const short = bodyNorm.length <= answerNorm.length ? bodyNorm : answerNorm;
  const long = bodyNorm.length <= answerNorm.length ? answerNorm : bodyNorm;
  if (short.length < 5) return long.includes(short) ? 1 : 0;
  const win = Math.min(6, short.length);
  let hits = 0;
  let total = 0;
  for (let i = 0; i <= short.length - win; i += 2) {
    total += 1;
    if (long.includes(short.slice(i, i + win))) hits += 1;
  }
  return total ? hits / total : 0;
}

export function statuteBodyMatchesAnswer(body: string, answerExample: string): boolean {
  const answerNorm = normalizeStatuteAnswerMatchText(answerExample);
  const bodyNorm = normalizeStatuteAnswerMatchText(body);
  if (answerNorm.length < 10 || bodyNorm.length < 8) return false;
  if (statuteOverlapScore(bodyNorm, answerNorm) >= 0.3) return true;
  // 答案を「又は」で割った断片とも照合（95条3項一・二等の併記答案向け）
  const parts = answerNorm.split(/又は/).filter((p) => p.length >= 6);
  if (parts.some((p) => statuteOverlapScore(bodyNorm, p) >= 0.35)) return true;
  // 短い号文向けの核フレーズ共有（同一の錯誤／重過失で知らなかった 等）
  const cores = ['双方同一の錯誤', '同一の錯誤', '重過失で知らなかった', '錯誤を知り'];
  return cores.some((c) => c.length >= 6 && bodyNorm.includes(c) && answerNorm.includes(c));
}

/**
 * 解答例に効く条文箇所を先頭へ寄せ、本文を [[red:...]] で強調する。
 * 記述教科書で「答案の芯」に対応する号が条文トグルの下に埋もれるのを防ぐ。
 */
export function formatStatutesWithAnswerEmphasis(
  items: Array<{ title: string; content: string }>,
  answerExample: string,
): string {
  if (!items.length) return '';
  const matched = items.filter((it) => statuteBodyMatchesAnswer(it.content || '', answerExample));
  if (!matched.length) {
    return formatResolvedStatutesForModal(items).trim();
  }

  const matchedKeys = new Set(matched.map((it) => `${it.title}\n${it.content}`));
  const fullHighlighted = formatResolvedStatutesForModal(
    items.map((it) => {
      const key = `${it.title}\n${it.content}`;
      if (!matchedKeys.has(key) || !(it.content || '').trim()) return it;
      return { ...it, content: `[[red:${(it.content || '').trim()}]]` };
    }),
  ).trim();

  const focus = matched
    .map((it) => {
      const title = (it.title || '').trim();
      const body = (it.content || '').trim();
      if (!body) return title ? `**${title}**` : '';
      const redBody = `[[red:${body}]]`;
      return title ? `**${title}**\n\n${redBody}` : redBody;
    })
    .filter(Boolean)
    .join('\n\n');

  return `**答案対応（赤字）**\n\n${focus}\n\n---\n\n${fullHighlighted}`;
}

/** 手書きの **条文** ブロック内でも、答案と重なる文を赤字化する（簡易） */
export function emphasizeMarkdownStatutesForAnswer(markdown: string, answerExample: string): string {
  const answerNorm = normalizeStatuteAnswerMatchText(answerExample);
  if (!markdown.trim() || answerNorm.length < 10) return markdown;

  return markdown.replace(
    /(^|\n)((?:\*\*[^*\n]+\*\*\s*\n+)?)([^\n【\*\[-][^\n]{7,})/g,
    (full, lead: string, titleBlock: string, line: string) => {
      if (/答案対応|赤字|---/.test(line)) return full;
      if (line.includes('[[red:')) return full;
      if (!statuteBodyMatchesAnswer(line, answerExample)) return full;
      return `${lead}${titleBlock}[[red:${line.trim()}]]`;
    },
  );
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
  if (fromMd) return emphasizeMarkdownStatutesForAnswer(fromMd, card.answerExample);
  const items = resolveStatuteItems(card.statuteSearchText);
  return formatStatutesWithAnswerEmphasis(items, card.answerExample);
}

const IMAGE_TAG_RE = /\[\[image:([^\]]+)\]\]/gi;
const RELATED_TAG_RE = /\[\[related:([^\]]+)\]\]/gi;

/** `Q1` / `Q1-2` / `問3` から本体番号と画像スロットを取る */
export function parseTextbookQuestionHeading(title: string): {
  questionNumber: number;
  imageSlot: string;
} | null {
  const m = title.match(/^Q(\d+)(?:-(\d+))?/i) || title.match(/^問(\d+)/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n < 1) return null;
  const imageSlot = m[2] ? `${n}-${m[2]}` : String(n);
  return { questionNumber: n, imageSlot };
}

function normalizeImageKey(raw: string): string {
  return raw.trim().replace(/\.(png|webp|jpg|jpeg)$/i, '');
}

function isIshiHyojiTaikoKey(key: string): boolean {
  return key === ISHI_HYOJI_TAIKO_IMAGE_KEY || key.endsWith('ishi-hyoji-taiko');
}

/** 問本文から [[image:key]] / [[related:key]] を抜き、本文とキー配列に分ける */
export function extractQuestionImages(questionRaw: string, slug: string, imageSlot: string): {
  question: string;
  imageKeys: string[];
  relatedImageKeys: string[];
} {
  const keys: string[] = [];
  const relatedKeys: string[] = [];
  const seen = new Set<string>();
  const seenRelated = new Set<string>();
  const push = (raw: string, intoRelated = false) => {
    const k = normalizeImageKey(raw);
    if (!k) return;
    if (isIshiHyojiTaikoKey(k) || intoRelated) {
      if (seenRelated.has(k)) return;
      seenRelated.add(k);
      relatedKeys.push(k);
      return;
    }
    if (seen.has(k)) return;
    seen.add(k);
    keys.push(k);
  };

  IMAGE_TAG_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = IMAGE_TAG_RE.exec(questionRaw)) !== null) {
    push(m[1]);
  }
  RELATED_TAG_RE.lastIndex = 0;
  while ((m = RELATED_TAG_RE.exec(questionRaw)) !== null) {
    push(m[1], true);
  }

  // 規約キー（そのスラッグのアセットがあるときだけUI側で表示）。枝番は q1-2
  if (imageSlot) {
    push(`textbook/${slug}/q${imageSlot}`);
  }

  const question = questionRaw
    .replace(IMAGE_TAG_RE, '')
    .replace(RELATED_TAG_RE, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { question, imageKeys: keys, relatedImageKeys: relatedKeys };
}

function flushCard(
  draft: {
    id: string;
    questionNumber: number;
    imageSlot: string;
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
  const { question, imageKeys, relatedImageKeys: relatedFromTags } = extractQuestionImages(
    draft.question,
    slug,
    draft.imageSlot,
  );
  const fromMd = draft.statute.trim();
  const statuteFromMarkdown =
    fromMd || (slug === 'kisochi' ? statuteMarkdownForKisochiCard(draft.imageSlot, draft.title) : '');
  const autoRelated =
    slug === 'minpou-kijutsu'
      ? pickIshiHyojiRelatedImageKeys(`${draft.title}\n${question}\n${draft.answer}`)
      : slug === 'gyosei-kijutsu'
        ? [
            ...pickGyoshoHikokuRelatedImageKeys(`${draft.title}\n${question}\n${draft.answer}`),
            ...pickGyoshoJunyoRelatedImageKeys(`${draft.title}\n${question}\n${draft.answer}`),
            ...pickKokubaiJuminRelatedImageKeys(`${draft.title}\n${question}\n${draft.answer}`),
          ]
        : [];
  const relatedSeen = new Set<string>();
  const relatedImageKeys: string[] = [];
  for (const key of [...relatedFromTags, ...autoRelated]) {
    if (!key || relatedSeen.has(key) || imageKeys.includes(key)) continue;
    relatedSeen.add(key);
    relatedImageKeys.push(key);
  }
  out.push({
    kind: 'card',
    card: {
      id: draft.id,
      questionNumber: draft.questionNumber,
      imageSlot: draft.imageSlot,
      title: draft.title,
      question,
      questionImageKeys: imageKeys,
      relatedImageKeys,
      answerExample: draft.answer.trim(),
      tip: draft.tip.trim(),
      statuteFromMarkdown,
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
    imageSlot: string;
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
        const parsed = parseTextbookQuestionHeading(title);
        const imageSlot = parsed?.imageSlot || String(cardIndex);
        const questionNumber = parsed?.questionNumber || cardIndex;
        draft = {
          id: `q-${imageSlot}`,
          questionNumber,
          imageSlot,
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
