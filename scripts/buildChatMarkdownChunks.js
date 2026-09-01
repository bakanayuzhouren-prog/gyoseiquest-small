/**
 * content/, data/pin/, data/learn/, data/bonus/, data/knowledge/ の .md を読み、
 * 短い索引 + シャード本文を再生成する。
 *
 * 出力:
 * - src/generated/chatMarkdownIndex.ts
 * - src/generated/chatMarkdownShards/<shard>.ts
 * - src/generated/chatMarkdownShardLoaders.ts
 * - src/generated/chatMarkdownChunks.ts（互換の空配列。本文はシャード側）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GEN = path.join(ROOT, 'src', 'generated');
const SHARD_DIR = path.join(GEN, 'chatMarkdownShards');
const INDEX_OUT = path.join(GEN, 'chatMarkdownIndex.ts');
const LOADERS_OUT = path.join(GEN, 'chatMarkdownShardLoaders.ts');
const COMPAT_OUT = path.join(GEN, 'chatMarkdownChunks.ts');

const EXCERPT_LEN = 420;

const ROOTS = [
  path.join(ROOT, 'content'),
  path.join(ROOT, 'data', 'pin'),
  path.join(ROOT, 'data', 'learn'),
  path.join(ROOT, 'data', 'bonus'),
  path.join(ROOT, 'data', 'knowledge'),
];

const SKIP_DIR = new Set(['node_modules', '.git', 'archive', '_reports']);

/** @param {string} rel */
function shardKey(rel) {
  const p = rel.replace(/\\/g, '/');
  if (p.startsWith('data/knowledge/quiz/')) return 'knowledge-quiz';
  if (p.startsWith('data/knowledge/learn/')) return 'knowledge-learn';
  if (p.startsWith('data/knowledge/creator/')) return 'knowledge-creator';
  if (p.startsWith('data/knowledge/')) return 'knowledge-other';
  if (p.startsWith('data/learn/')) return 'learn';
  if (p.startsWith('data/pin/')) return 'pin';
  if (p.startsWith('data/bonus/')) return 'bonus';
  if (p.startsWith('content/textbook/')) return 'content-textbook';
  if (p.startsWith('content/')) return 'content';
  return 'other';
}

/** @param {string} dir */
function collectMarkdownFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const st = fs.statSync(dir);
  if (!st.isDirectory()) return acc;
  const base = path.basename(dir);
  if (SKIP_DIR.has(base)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const relFromRoot = path.relative(ROOT, p);
    if (relFromRoot.split(path.sep).includes('archive')) continue;
    const s = fs.statSync(p);
    if (s.isDirectory()) collectMarkdownFiles(p, acc);
    else if (name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

/** @param {string} md */
function firstHeading(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

/**
 * @param {string} raw
 * @param {string} rel
 */
function prepareMarkdownBody(raw, rel) {
  if (!rel.replace(/\\/g, '/').startsWith('data/knowledge/')) return raw;
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fm) return raw;
  const tagsLine = fm[1].match(/^tags:\s*(.+)$/m);
  const prefix = tagsLine ? `tags: ${tagsLine[1].trim()}\n\n` : '';
  return prefix + fm[2];
}

/** @param {string} text */
function splitChunks(text, max = 2400) {
  const parts = text.split(/\n\n+/);
  const out = [];
  let cur = '';
  for (const p of parts) {
    const t = p.trim();
    if (!t) continue;
    if ((cur + '\n\n' + t).length > max) {
      if (cur) out.push(cur.trim());
      cur = t.length > max ? t.slice(0, max) + '…' : t;
    } else {
      cur = cur ? `${cur}\n\n${t}` : t;
    }
  }
  if (cur) out.push(cur.trim());
  return out;
}

/** @param {string} s */
function excerptOf(s) {
  const t = (s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= EXCERPT_LEN) return t;
  return `${t.slice(0, EXCERPT_LEN)}…`;
}

function main() {
  const files = [];
  for (const r of ROOTS) collectMarkdownFiles(r, files);
  files.sort();

  /** @type {Record<string, { path: string; title: string; text: string }[]>} */
  const shards = {};
  /** @type {{ path: string; title: string; excerpt: string; shard: string }[]} */
  const indexRows = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    let raw = fs.readFileSync(file, 'utf8');
    raw = raw.replace(/\r\n/g, '\n');
    raw = prepareMarkdownBody(raw, rel);
    const title = firstHeading(raw) || rel;
    const key = shardKey(rel);
    if (!shards[key]) shards[key] = [];
    const chunks = splitChunks(raw);
    for (const chunk of chunks) {
      shards[key].push({ path: rel, title, text: chunk });
    }
    indexRows.push({
      path: rel,
      title,
      excerpt: excerptOf(chunks[0] || raw),
      shard: key,
    });
  }

  fs.mkdirSync(SHARD_DIR, { recursive: true });
  for (const leftover of fs.readdirSync(SHARD_DIR)) {
    if (leftover.endsWith('.ts')) fs.unlinkSync(path.join(SHARD_DIR, leftover));
  }

  const esc = (s) => JSON.stringify(s);
  const shardKeys = Object.keys(shards).sort();

  for (const key of shardKeys) {
    const rows = shards[key];
    const lines = [
      '/**',
      ' * Auto-generated — do not edit by hand.',
      ' * Regenerate: node scripts/buildChatMarkdownChunks.js',
      ' */',
      "import type { ChatMarkdownChunk } from '../chatMarkdownChunks';",
      '',
      `export const CHAT_MARKDOWN_SHARD: ChatMarkdownChunk[] = [`,
    ];
    for (const r of rows) {
      lines.push(`  { path: ${esc(r.path)}, title: ${esc(r.title)}, text: ${esc(r.text)} },`);
    }
    lines.push('];', '');
    fs.writeFileSync(path.join(SHARD_DIR, `${key}.ts`), lines.join('\n'), 'utf8');
  }

  const indexLines = [
    '/**',
    ' * Auto-generated — do not edit by hand.',
    ' * Regenerate: node scripts/buildChatMarkdownChunks.js',
    ' */',
    'export type ChatMarkdownIndexRow = { path: string; title: string; excerpt: string; shard: string };',
    '',
    'export const CHAT_MARKDOWN_INDEX: ChatMarkdownIndexRow[] = [',
  ];
  for (const r of indexRows) {
    indexLines.push(
      `  { path: ${esc(r.path)}, title: ${esc(r.title)}, excerpt: ${esc(r.excerpt)}, shard: ${esc(r.shard)} },`,
    );
  }
  indexLines.push('];', '');
  fs.writeFileSync(INDEX_OUT, indexLines.join('\n'), 'utf8');

  const loaderLines = [
    '/**',
    ' * Auto-generated — do not edit by hand.',
    ' * Regenerate: node scripts/buildChatMarkdownChunks.js',
    ' */',
    "import type { ChatMarkdownChunk } from './chatMarkdownChunks';",
    '',
    'export const CHAT_MARKDOWN_SHARD_LOADERS: Record<string, () => Promise<ChatMarkdownChunk[]>> = {',
  ];
  for (const key of shardKeys) {
    loaderLines.push(
      `  ${esc(key)}: () => import('./chatMarkdownShards/${key}').then((m) => m.CHAT_MARKDOWN_SHARD),`,
    );
  }
  loaderLines.push('};', '');
  fs.writeFileSync(LOADERS_OUT, loaderLines.join('\n'), 'utf8');

  fs.writeFileSync(
    COMPAT_OUT,
    [
      '/**',
      ' * Auto-generated — do not edit by hand.',
      ' * 本文は chatMarkdownShards/。互換のため型と空配列だけ残す。',
      ' * Regenerate: node scripts/buildChatMarkdownChunks.js',
      ' */',
      'export type ChatMarkdownChunk = { path: string; title: string; text: string };',
      '',
      'export const CHAT_MARKDOWN_CHUNKS: ChatMarkdownChunk[] = [];',
      '',
    ].join('\n'),
    'utf8',
  );

  const shardCounts = shardKeys.map((k) => `${k}:${shards[k].length}`).join(' ');
  console.log(
    `Wrote index ${indexRows.length} files, ${shardKeys.length} shards (${shardCounts}) from ${files.length} md`,
  );
}

main();
