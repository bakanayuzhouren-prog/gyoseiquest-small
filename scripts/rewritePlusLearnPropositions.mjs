/**
 * ぷらす学習カードの本文を、通常の見て聞いて覚えると同じ命題文に寄せる。
 * タグは外す。topics の rule があればそれを優先。deepdive は触らない。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function stripLeadTag(text) {
  return String(text || '')
    .replace(/^(【[^】]+】\s*)+/, '')
    .trim();
}

function polishProposition(text) {
  let t = stripLeadTag(text);
  if (!t) return t;
  if (/＝/.test(t) && !/[はをが]/.test(t)) {
    t = t.replace(/([^、。＝]{1,24})＝/g, '$1は');
    t = t.replace(/≠/g, 'ではなく');
  }
  if (!/[。！？]$/.test(t)) t += '。';
  return t;
}

function loadRuleMaps() {
  const files = [
    ['lec', 'data/moshi/lec-koukai-2026-round1-topics.json'],
    ['g1', 'data/moshi/goukaku-kakumei-round1-topics.json'],
    ['g2', 'data/moshi/goukaku-kakumei-round2-topics.json'],
    ['g3', 'data/moshi/goukaku-kakumei-round3-topics.json'],
    ['t1', 'data/moshi/tac1-topics.json'],
    ['t2', 'data/moshi/tac2-topics.json'],
    ['t3', 'data/moshi/tac3-topics.json'],
  ];
  const maps = {};
  for (const [key, rel] of files) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const data = JSON.parse(fs.readFileSync(full, 'utf8'));
    const map = new Map();
    for (const t of data.topics || []) {
      if (t.status && t.status !== 'confirmed') continue;
      const n = Number(t.questionNumber);
      if (!n) continue;
      const rule = String(t.rule || '').trim();
      if (!rule) continue;
      if (/趣旨/.test(String(t.topic || ''))) {
        map.set(`${n}-趣旨`, rule);
      } else if (!map.has(n)) {
        map.set(n, rule);
      }
    }
    maps[key] = map;
  }
  return maps;
}

function pickExam(source, fallback) {
  const s = String(source || '');
  if (/LEC公開/.test(s)) return 'lec';
  if (/合格革命/.test(s) && /第3回/.test(s)) return 'g3';
  if (/合格革命/.test(s) && /第2回/.test(s)) return 'g2';
  if (/合格革命/.test(s)) return 'g1';
  if (/TAC第3|TAC3/.test(s)) return 't3';
  if (/TAC第2|TAC2/.test(s)) return 't2';
  if (/TAC第1|TAC1/.test(s)) return 't1';
  return fallback;
}

function rewriteBundle(obj, fallbackExam, maps) {
  let changed = 0;
  for (const cards of Object.values(obj)) {
    if (!Array.isArray(cards)) continue;
    for (const card of cards) {
      const raw = String(card.text || '');
      const source = String(card.source || '');
      const qMatch = `${source} ${raw}`.match(/問(\d+)/);
      const exam = pickExam(source, fallbackExam);
      const n = qMatch ? Number(qMatch[1]) : 0;
      const isShushi = /趣旨/.test(raw);
      const rule =
        (isShushi && maps[exam]?.get(`${n}-趣旨`)) ||
        (!isShushi && maps[exam]?.get(n)) ||
        '';
      const next = polishProposition(rule || raw);
      if (next !== raw) {
        card.text = next;
        changed += 1;
      }
    }
  }
  return changed;
}

function extractObjectLiteral(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const braceStart = src.indexOf('{', start);
  let depth = 0;
  let inStr = null;
  let escape = false;
  for (let i = braceStart; i < src.length; i += 1) {
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
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  throw new Error(`unclosed object: ${marker}`);
}

function rewriteJsonExport(rel, exportName, fallbackExam, maps) {
  const file = path.join(root, rel);
  const src = fs.readFileSync(file, 'utf8');
  const objSrc = extractObjectLiteral(src, `export const ${exportName} =`);
  const obj = Function(`"use strict"; return (${objSrc});`)();
  const changed = rewriteBundle(obj, fallbackExam, maps);
  const banner = src.slice(0, src.indexOf('export const'));
  fs.writeFileSync(file, `${banner}export const ${exportName} = ${JSON.stringify(obj, null, 2)};\n`);
  return changed;
}

function stripTagsInJsFile(rel) {
  const file = path.join(root, rel);
  const src = fs.readFileSync(file, 'utf8');
  const next = src
    .replace(/(text:\s*')((?:【[^】]+】\s*)+)/g, '$1')
    .replace(/("text":\s*")((?:【[^】]+】\s*)+)/g, '$1');
  if (next !== src) fs.writeFileSync(file, next);
  return (src.match(/【[^】]+】/g) || []).length - (next.match(/【[^】]+】/g) || []).length;
}

const maps = loadRuleMaps();
const jsonJobs = [
  ['src/lec_koukai_moshi_learn_content.js', 'LEC_KOUKAI_MOSHI_LEARN_BY_SUBJECT', 'lec'],
  ['src/goukaku_moshi_learn_content.js', 'GOUKAKU_MOSHI_LEARN_BY_SUBJECT', 'g1'],
  ['src/goukaku_moshi_round2_learn_content.js', 'GOUKAKU_MOSHI_ROUND2_LEARN_BY_SUBJECT', 'g2'],
  ['src/goukaku_moshi_round3_learn_content.js', 'GOUKAKU_MOSHI_ROUND3_LEARN_BY_SUBJECT', 'g3'],
  ['src/tac1_moshi_learn_content.js', 'TAC1_MOSHI_LEARN_BY_SUBJECT', 't1'],
  ['src/tac2_moshi_learn_content.js', 'TAC2_MOSHI_LEARN_BY_SUBJECT', 't2'],
  ['src/tac3_moshi_learn_content.js', 'TAC3_MOSHI_LEARN_BY_SUBJECT', 't3'],
];

let total = 0;
for (const [rel, name, exam] of jsonJobs) {
  if (!fs.existsSync(path.join(root, rel))) continue;
  const n = rewriteJsonExport(rel, name, exam, maps);
  console.log(`${rel}: ${n} cards`);
  total += n;
}

const jsFiles = [
  'src/tac_learn_content.js',
  'src/lec_bonus_kenpou_learn_content.js',
  'src/kokubai_learn_content.js',
  'src/minpou_joshiki_learn_content.js',
  'src/gyoseihou_joshiki_learn_content.js',
];
for (const rel of jsFiles) {
  if (!fs.existsSync(path.join(root, rel))) continue;
  const n = stripTagsInJsFile(rel);
  console.log(`${rel}: stripped ${n} tags`);
}

console.log(`done. json cards rewritten: ${total}`);
