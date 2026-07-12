import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
fs.mkdirSync(path.join(root, 'tmp'), { recursive: true });
fs.mkdirSync(path.join(root, 'data/moshi'), { recursive: true });

function extractObjectLiteral(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const braceStart = src.indexOf('{', start);
  let depth = 0;
  let inStr = null;
  let escape = false;
  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inStr = ch;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  throw new Error('unclosed object');
}

const src = fs.readFileSync(path.join(root, 'src/tac_learn_content.js'), 'utf8');
const objSrc = extractObjectLiteral(src, 'const TAC3_ALL_QUESTION_SHORT_CARDS =');
const cardsBySubject = Function(`"use strict"; return (${objSrc});`)();
const flat = [];
for (const [learnSubject, cards] of Object.entries(cardsBySubject)) {
  for (const c of cards) {
    const m = String(c.text).match(/【TAC3問(\d+)】/);
    flat.push({
      questionNumber: m ? Number(m[1]) : null,
      learnSubject,
      memoryRaw: String(c.text).replace(/^【TAC3問\d+】/, '').trim(),
      statuteRef: c.statuteRef || '',
      source: c.source || '',
    });
  }
}
flat.sort((a, b) => a.questionNumber - b.questionNumber);
const tac3Path = path.join(root, 'data/moshi/tac3-short-cards-source.json');
fs.writeFileSync(tac3Path, JSON.stringify(flat, null, 2));
fs.writeFileSync(path.join(root, 'tmp/tac3-short-cards.json'), JSON.stringify(flat, null, 2));
console.log('TAC3 cards', flat.length);

const md = fs
  .readFileSync(path.join(root, 'data/knowledge/creator/prep-school/tac-moshi-2026-06.md'), 'utf8')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n');
const rows = [];
for (const line of md.split('\n')) {
  const m = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*(.+?)\s*\|$/);
  if (!m) continue;
  rows.push({
    questionNumber: Number(m[1]),
    fieldRaw: m[2].trim(),
    answerRaw: m[3].trim(),
    core: m[4].trim().replace(/\*\*/g, ''),
  });
}
const seen = new Set();
const unique = [];
for (const r of rows) {
  if (seen.has(r.questionNumber)) continue;
  seen.add(r.questionNumber);
  unique.push(r);
}
fs.writeFileSync(path.join(root, 'tmp/tac1-md-rows.json'), JSON.stringify(unique, null, 2));
console.log('TAC1 rows', unique.length);
