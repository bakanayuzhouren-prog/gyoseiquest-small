/**
 * 記述問題の長文を人間が見やすいようにフォーマットする
 * - 段落分割（。の後、セクション区切りで改行・余白）
 * - キーワード強調（本件○○、A/B/C/D、甲/乙、法令参照）
 */

export type SegmentType = 'header' | 'section' | 'keyword' | 'person' | 'law' | 'plain';

export interface TextSegment {
  type: SegmentType;
  text: string;
}

export interface FormattedParagraph {
  segments: TextSegment[];
  spacing?: 'before' | 'after' | 'both'; // セクション区切りで余白追加
}

/**
 * テキストをパースしてセグメントに分割
 */
function parseSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let remaining = text;

  // パターン: (20XX年問XX) → header
  const headerRe = /^（(\d{4}年問\d+[a-z]?）)\s*/;
  const headerMatch = remaining.match(headerRe);
  if (headerMatch) {
    segments.push({ type: 'header', text: headerMatch[1] });
    remaining = remaining.slice(headerMatch[0].length);
  }

  // パターン: ［設例］、［判例の解説］など → section
  const sectionRe = /［([^］]+)］/g;
  // パターン: 本件○○, 本件契約, 本件絵画 など
  const keywordRe = /本件[^、。\s　]+/g;
  // パターン: 民法○条、憲法○条 など（数字付き）
  const lawRe = /(民法|憲法|行政手続法|行政不服審査法|行政事件訴訟法|国家賠償法|地方自治法)[\d条]+/g;
  // パターン: 単独の A, B, C, D、甲・乙・丙（人物として）
  const personRe = /\b([A-D])\b|(甲|乙|丙|丁)(?=[^a-zA-Z]|$)/g;

  // 複合パターンで分割: 順序は section > keyword > law > person > plain
  const allPatterns = [
    { re: sectionRe, type: 'section' as const },
    { re: keywordRe, type: 'keyword' as const },
    { re: lawRe, type: 'law' as const },
    { re: personRe, type: 'person' as const },
  ];

  let lastIndex = 0;
  const matches: { index: number; end: number; type: SegmentType; text: string }[] = [];

  for (const { re, type } of allPatterns) {
    const re2 = new RegExp(re.source, re.flags);
    let m;
    while ((m = re2.exec(remaining)) !== null) {
      const text = m[1] || m[2] || m[0];
      matches.push({ index: m.index, end: m.index + m[0].length, type, text });
    }
  }

  matches.sort((a, b) => a.index - b.index);

  // 重複・重なりを排除
  const merged: { index: number; end: number; type: SegmentType; text: string }[] = [];
  for (const m of matches) {
    if (merged.length > 0 && m.index < merged[merged.length - 1].end) continue;
    merged.push(m);
  }

  let pos = 0;
  for (const m of merged) {
    if (m.index > pos) {
      segments.push({ type: 'plain', text: remaining.slice(pos, m.index) });
    }
    segments.push({ type: m.type, text: m.text });
    pos = m.end;
  }
  if (pos < remaining.length) {
    segments.push({ type: 'plain', text: remaining.slice(pos) });
  }

  return segments.length > 0 ? segments : [{ type: 'plain', text: remaining }];
}

/**
 * 長文を段落に分割（。の後で改行、［設例］等の前で余白）
 */
export function formatDescriptiveText(raw: string): FormattedParagraph[] {
  if (!raw || typeof raw !== 'string') return [{ segments: [{ type: 'plain', text: '' }] }];

  const paragraphs: FormattedParagraph[] = [];
  let text = raw;

  // ［設例］［判例の解説］を区切りとして分割
  const sectionSplit = text.split(/(［[^］]+］)/g);
  const blocks: { text: string; isSection: boolean }[] = [];
  for (let i = 0; i < sectionSplit.length; i++) {
    const part = sectionSplit[i];
    if (/^［.+］$/.test(part)) {
      blocks.push({ text: part, isSection: true });
    } else if (part.trim()) {
      blocks.push({ text: part, isSection: false });
    }
  }

  if (blocks.length === 0) {
    blocks.push({ text, isSection: false });
  }

  for (let bi = 0; bi < blocks.length; bi++) {
    const block = blocks[bi];
    const isFirst = bi === 0;
    const isLast = bi === blocks.length - 1;

    if (block.isSection) {
      paragraphs.push({
        segments: [{ type: 'section', text: block.text }],
        spacing: isFirst ? 'after' : 'both',
      });
      continue;
    }

    // 句点で段落分割（長文の場合）
    const sentences = block.text.split(/(。)/);
    const parts: string[] = [];
    let buf = '';
    for (let i = 0; i < sentences.length; i++) {
      buf += sentences[i];
      if (sentences[i] === '。' && buf.length > 80) {
        parts.push(buf);
        buf = '';
      }
    }
    if (buf) parts.push(buf);

    for (let pi = 0; pi < parts.length; pi++) {
      const para = parts[pi].trim();
      if (!para) continue;

      const segments = parseSegments(para);
      paragraphs.push({
        segments,
        spacing: block.isSection || (pi === 0 && !isFirst) ? 'before' : undefined,
      });
    }
  }

  // パース結果が空の場合（単純な長文の場合）
  if (paragraphs.length === 0) {
    const simpleParts = text.split(/(。)/);
    let buf = '';
    for (let i = 0; i < simpleParts.length; i++) {
      buf += simpleParts[i];
      if (simpleParts[i] === '。' && buf.length > 60) {
        paragraphs.push({ segments: parseSegments(buf.trim()) });
        buf = '';
      }
    }
    if (buf.trim()) {
      paragraphs.push({ segments: parseSegments(buf.trim()) });
    }
  }

  return paragraphs.length > 0 ? paragraphs : [{ segments: parseSegments(text) }];
}
