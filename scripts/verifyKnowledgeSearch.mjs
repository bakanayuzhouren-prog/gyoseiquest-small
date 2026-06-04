/**
 * Phase1: 占有改定論点が canonical 知識MDに索引されているか簡易検証
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const chunksPath = path.join(ROOT, 'src', 'generated', 'chatMarkdownChunks.ts');

const raw = fs.readFileSync(chunksPath, 'utf8');
const query = '333条 占有改定 先取特権 譲渡担保';
const tokens = query.split(/\s+/).filter(Boolean);

/** @param {string} text */
function score(text) {
  const low = text.toLowerCase();
  let s = 0;
  for (const t of tokens) {
    if (low.includes(t.toLowerCase()) || text.includes(t)) s += 2;
  }
  if (text.includes('大判大6.7.26')) s += 5;
  return s;
}

/** @type {{ path: string; title: string; text: string; score: number }[]} */
const hits = [];
const re = /\{\s*path:\s*"([^"]+)",\s*title:\s*"([^"]*)",\s*text:\s*"((?:\\.|[^"\\])*)"\s*\}/g;
let m;
while ((m = re.exec(raw)) !== null) {
  const p = m[1];
  if (!p.startsWith('data/knowledge/')) continue;
  const text = JSON.parse(`"${m[2].replace(/\\/g, '\\\\')}"`) + '\n' + JSON.parse(`"${m[3]}"`);
  const sc = score(text) + (p.includes('canonical/') ? 3 : 0);
  if (sc > 0) hits.push({ path: p, title: m[2], text: text.slice(0, 120), score: sc });
}

hits.sort((a, b) => b.score - a.score);
const top = hits.slice(0, 5);

console.log('=== verifyKnowledgeSearch ===');
console.log('Query:', query);
console.log('Top knowledge MD hits:');
for (const h of top) {
  console.log(`  [${h.score}] ${h.path}`);
  console.log(`       ${h.title.slice(0, 60)}`);
}

const canonicalFirst = top[0]?.path.includes('canonical/senkyoten-hosoku-matrix');
const a104Hit = hits.some((h) => h.path.includes('learn/民法物権/a104'));
console.log('\nCanonical matrix ranked first:', canonicalFirst ? 'OK' : 'FAIL');
console.log('Learn 民法物権 a104 indexed:', a104Hit ? 'OK' : 'FAIL');
process.exit(canonicalFirst && a104Hit ? 0 : 1);
