/**
 * 伊藤塾PDF抽出テキスト → 構造化パース（著作権配慮: 長文は切り詰め）
 */

/** @param {string} line */
export function slugify(name) {
  return name
    .replace(/\.pdf$/i, '')
    .replace(/[^\w\u3040-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** @param {string} text */
export function stripExtractHeader(text) {
  return text.replace(/^#[^\n]+\n\npages:[^\n]+\n\n/m, '');
}

/** @param {string} s @param {number} max */
export function trunc(s, max) {
  const t = (s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max) + '…';
}

/** @param {string} line */
function parseNumberedLine(line) {
  const trimmed = line.trim();
  if (!trimmed || /^\d{1,3}$/.test(trimmed)) return null;
  const circ = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';
  const cIdx = [...trimmed].findIndex((ch) => circ.includes(ch));
  if (cIdx === 0 && circ.includes(trimmed[0])) {
    const n = circ.indexOf(trimmed[0]) + 1;
    return { n, body: trimmed.slice(1).trim(), mark: undefined };
  }
  const m = trimmed.match(/^(\d+)[\.．、\s]\s*(.+)/) || trimmed.match(/^(\d+)\s+(.{3,})/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n < 1 || n > 999) return null;
  const markM = m[2].match(/^([〇×○✕])\s*(.*)/);
  if (markM) return { n, mark: markM[1].replace('○', '〇').replace('✕', '×'), body: markM[2].trim() };
  return { n, body: m[2].trim(), mark: undefined };
}

/** @param {string} chunk @param {number} maxItems @param {number} maxBodyLen */
export function parseNumberedChunk(chunk, maxItems = 200, maxBodyLen = 400) {
  /** @type {{n:number;body:string;mark?:string}[]} */
  const items = [];
  let cur = null;
  for (const line of chunk.split('\n')) {
    const parsed = parseNumberedLine(line);
    if (parsed && parsed.n <= maxItems) {
      if (cur) items.push(cur);
      cur = { ...parsed, body: trunc(parsed.body, maxBodyLen) };
    } else if (cur && line.trim()) {
      cur.body = trunc(`${cur.body} ${line.trim()}`, maxBodyLen);
    }
  }
  if (cur) items.push(cur);
  const byN = new Map();
  for (const it of items) byN.set(it.n, it);
  return [...byN.values()].sort((a, b) => a.n - b.n);
}

/** @param {string} text */
export function splitByBrackets(text) {
  /** @type {{heading:string;body:string}[]} */
  const sections = [];
  const re = /【([^】]+)】/g;
  let lastIdx = 0;
  let lastHeading = '本文';
  let m;
  const hits = [];
  while ((m = re.exec(text)) !== null) {
    hits.push({ heading: m[1].trim(), index: m.index, end: m.index + m[0].length });
  }
  if (!hits.length) return [{ heading: '本文', body: text }];
  for (const h of hits) {
    if (h.index > lastIdx) {
      sections.push({ heading: lastHeading, body: text.slice(lastIdx, h.index) });
    }
    lastHeading = h.heading;
    lastIdx = h.end;
  }
  sections.push({ heading: lastHeading, body: text.slice(lastIdx) });
  return sections.filter((s) => s.body.trim().length > 20);
}

/** @param {string} text @param {number} maxLen */
export function chunkParagraphs(text, maxLen = 800) {
  const paras = text.split(/\n{2,}/).map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
  /** @type {{n:number;body:string}[]} */
  const items = [];
  let n = 1;
  for (const p of paras) {
    if (p.length < 30) continue;
    items.push({ n: n++, body: trunc(p, maxLen) });
    if (n > 80) break;
  }
  return items;
}

/**
 * @param {string} text
 * @param {import('./itoJukuTypes.d.ts').ItoJukuParseMode} mode
 * @param {{ maxItems?: number; maxBodyLen?: number; sectionMarkers?: string[] }} opts
 */
export function parseExtract(text, mode = 'auto', opts = {}) {
  const maxItems = opts.maxItems ?? 200;
  const maxBodyLen = opts.maxBodyLen ?? 400;
  const body = stripExtractHeader(text);

  if (mode === 'chunks') {
    return [{ heading: '要点', items: chunkParagraphs(body, maxBodyLen * 2) }];
  }

  const bracketCount = (body.match(/【[^】]+】/g) || []).length;
  const numberedSample = parseNumberedChunk(body.slice(0, 8000), 5, maxBodyLen).length;

  let effective = mode;
  if (mode === 'auto') {
    if (bracketCount >= 2) effective = 'sections';
    else if (numberedSample >= 3) effective = 'numbered';
    else effective = 'chunks';
  }

  if (effective === 'numbered') {
    return [{ heading: '論点', items: parseNumberedChunk(body, maxItems, maxBodyLen) }];
  }

  if (effective === 'sections') {
    const rawSections = splitByBrackets(body);
    const markers = opts.sectionMarkers;
    const filtered = markers?.length
      ? rawSections.filter((s) => markers.some((mk) => s.heading.includes(mk)))
      : rawSections;
    return (filtered.length ? filtered : rawSections).map((sec) => ({
      heading: sec.heading,
      items: parseNumberedChunk(sec.body, maxItems, maxBodyLen).length
        ? parseNumberedChunk(sec.body, maxItems, maxBodyLen)
        : chunkParagraphs(sec.body, maxBodyLen * 2).slice(0, 30),
    }));
  }

  return [{ heading: '要点', items: chunkParagraphs(body, maxBodyLen * 2) }];
}

/** @param {import('./itoJukuTypes.d.ts').ItoJukuSource} src @param {import('./itoJukuTypes.d.ts').ParsedSection[]} sections */
export function buildItoJukuMd(src, sections) {
  const tagStr = src.tags.map((t) => t.replace(/,/g, '')).join(', ');
  const lines = [
    '---',
    `id: creator/ito-juku/${src.slug}`,
    'type: creator-summary',
    'source: 伊藤塾講義教材',
    `subject: ${src.subject}`,
    `tags: [${tagStr}]`,
    'validationStatus: ok',
    'disclaimer: 講義教材の論点要約。問題文・長文事案の全文転載なし。条文は六法で要確認。',
    '---',
    '',
    `# ${src.title}`,
    '',
    '出典: 伊藤塾講義教材（要約）。**原文の問題文・選択肢全文は含まない**。',
    '',
  ];
  for (const sec of sections) {
    if (!sec.items.length) continue;
    lines.push('---', '', `## ${sec.heading}（${sec.items.length}項）`, '');
    for (const { n, body, mark, note } of sec.items) {
      const markStr = mark ? `**${mark}** ` : '';
      lines.push(`**${n}.** ${markStr}${body}`, '');
      if (note) lines.push(`- 解説: ${trunc(note, 280)}`, '');
    }
  }
  if (lines.length <= 12) {
    lines.push('', '*（PDF到着後に `npm run sync:ito-juku` で再生成）*', '');
  }
  return lines.join('\n');
}
