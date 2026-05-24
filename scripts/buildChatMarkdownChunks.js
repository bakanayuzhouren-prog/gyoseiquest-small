/**
 * content/, data/pin/, data/learn/, data/bonus/ 配下の .md を読み、
 * src/generated/chatMarkdownChunks.ts を再生成する。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'generated', 'chatMarkdownChunks.ts');

const ROOTS = [
  path.join(ROOT, 'content'),
  path.join(ROOT, 'data', 'pin'),
  path.join(ROOT, 'data', 'learn'),
  path.join(ROOT, 'data', 'bonus'),
];

const SKIP_DIR = new Set(['node_modules', '.git', 'archive']);

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

function main() {
  const files = [];
  for (const r of ROOTS) collectMarkdownFiles(r, files);
  files.sort();

  /** @type {{ path: string; title: string; text: string }[]} */
  const rows = [];
  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    let raw = fs.readFileSync(file, 'utf8');
    raw = raw.replace(/\r\n/g, '\n');
    const title = firstHeading(raw) || rel;
    for (const chunk of splitChunks(raw)) {
      rows.push({ path: rel, title, text: chunk });
    }
  }

  const esc = (s) => JSON.stringify(s);
  const lines = [
    '/**',
    ' * Auto-generated — do not edit by hand.',
    ' * Regenerate: node scripts/buildChatMarkdownChunks.js',
    ' */',
    'export type ChatMarkdownChunk = { path: string; title: string; text: string };',
    '',
    'export const CHAT_MARKDOWN_CHUNKS: ChatMarkdownChunk[] = [',
  ];
  for (const r of rows) {
    lines.push(`  { path: ${esc(r.path)}, title: ${esc(r.title)}, text: ${esc(r.text)} },`);
  }
  lines.push('];', '');
  fs.writeFileSync(OUT, lines.join('\n'), 'utf8');
  console.log(`Wrote ${rows.length} chunks from ${files.length} files → ${path.relative(ROOT, OUT)}`);
}

main();
