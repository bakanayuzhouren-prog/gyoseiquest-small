/**
 * 民法・登場人物関係図を一括生成
 *
 *   node scripts/generateMinpouPersonFlowDiagrams.mjs --field 民法総則 --limit 10
 *   node scripts/generateMinpouPersonFlowDiagrams.mjs --field 民法総則
 *   node scripts/generatePersonFlowImages.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { LEARN_CONTENT } from '../src/learn.js';
import { SUBJECTS } from '../src/questions.js';
import { renderPersonFlowDiagram } from './lib/personFlowCanvasLayout.mjs';
import {
  FIELD_SLUG,
  MINPO_FIELDS,
  getQuestionTextHash,
  isPersonFlowEligible,
  normalizePersonFlowText,
} from './lib/personFlowText.mjs';
import { getPersonFlowOverride } from './lib/personFlowOverrides.mjs';
import { buildPersonFlowDiagramFromText, normalizeDiagramData } from './lib/personFlowDiagramFromText.mjs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'images', 'person-flow', 'minnpou');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'output', 'person-flow-manifest.json');

const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();

function parseArgs() {
  const fieldIdx = process.argv.indexOf('--field');
  const limitIdx = process.argv.indexOf('--limit');
  return {
    field: fieldIdx >= 0 ? process.argv[fieldIdx + 1] : null,
    limit: limitIdx >= 0 ? parseInt(process.argv[limitIdx + 1], 10) : Infinity,
    dryRun: process.argv.includes('--dry-run'),
    force: process.argv.includes('--force'),
    local: process.argv.includes('--local') || !process.env.GEMINI_API_KEY,
  };
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return { entries: [] };
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return { entries: [] };
  }
}

function saveManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

function stripLearnDisplay(text) {
  return (text || '')
    .replace(/\[\[LINK:.+?\]\]/g, '')
    .replace(/\[\[image:.+?\]\]/g, '')
    .split('※')[0]
    .trim();
}

function collectItems(fieldFilter) {
  /** @type {{ source:'learn'|'quiz', field:string, index:number, text:string, learnKey?:string, quizKey?:string }[]} */
  const items = [];
  const seenHash = new Set();

  for (const field of MINPO_FIELDS) {
    if (fieldFilter && field !== fieldFilter) continue;

    const learnArr = LEARN_CONTENT[field];
    if (Array.isArray(learnArr)) {
      learnArr.forEach((raw, i) => {
        const text = stripLearnDisplay(raw);
        const normalized = normalizePersonFlowText(text);
        if (!isPersonFlowEligible(normalized) || !hasMinTwoChars(normalized)) return;
        const hash = getQuestionTextHash(normalized);
        if (seenHash.has(`learn:${hash}`)) return;
        seenHash.add(`learn:${hash}`);
        items.push({
          source: 'learn',
          field,
          index: i,
          text: normalized,
          learnKey: `learn|${field}|${i + 1}`,
          hash,
        });
      });
    }

    const quizArr = SUBJECTS?.民法?.[field];
    if (Array.isArray(quizArr)) {
      quizArr.forEach((q, i) => {
        const text = normalizePersonFlowText(q?.text || '');
        if (!isPersonFlowEligible(text) || !hasMinTwoChars(text)) return;
        const hash = getQuestionTextHash(text);
        const key = `quiz:${hash}`;
        if (seenHash.has(key)) {
          const existing = items.find((it) => it.hash === hash);
          if (existing) existing.quizKey = `quiz|${field}|${i + 1}`;
          return;
        }
        seenHash.add(key);
        items.push({
          source: 'quiz',
          field,
          index: i,
          text,
          quizKey: `quiz|${field}|${i + 1}`,
          hash,
        });
      });
    }
  }

  return items;
}

function fallbackDiagramFromText(text) {
  const built = buildPersonFlowDiagramFromText(text);
  if (built) return built;
  const ids = extractOrderedChars(text);
  if (ids.length < 2) return null;
  const edges = [];
  for (let i = 0; i < ids.length - 1; i++) {
    edges.push({ from: ids[i], to: ids[i + 1], label: `${['①', '②', '③', '④', '⑤'][i] || '→'}` });
  }
  return normalizeDiagramData({ nodes: ids.map((id) => ({ id })), edges }, text);
}

function extractOrderedChars(text) {
  const ids = [];
  for (const m of String(text).matchAll(/\b([A-H])\b/g)) {
    if (!ids.includes(m[1])) ids.push(m[1]);
  }
  return ids;
}

function hasMinTwoChars(text) {
  return extractOrderedChars(text).length >= 2;
}

async function fetchDiagramJson(problemText, attempt = 1) {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY is not set');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
  const prompt = `民法問題文から「登場人物関係図」JSONを作る。JSONのみ出力。

問題文:
${problemText.slice(0, 1200)}

形式（Q40型・動きが分かる形式）:
{
  "nodes":[
    {"id":"B"},
    {"id":"C","above":"①Bの物を保管"},
    {"id":"D","above":"③承諾"}
  ],
  "edges":[
    {"from":"B","to":"C","label":"②Dの為に保管せよ","labelAbove":true},
    {"from":"C","to":"D","arrow":false}
  ]
}

ルール:
- idはA〜Hの1文字、nodes最大6、edges最大8
- 「関係」禁止。各edgeのlabelは①②③付きの具体的動詞・命令（8〜16字）
- 状態はnodesのabove（①③等）。命令・行為はedgesのlabel（②等）
- 承諾・同意のみのつながりは arrow:false
- 長いlabelは labelAbove:true
- 時系列順に左から右`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: attempt > 1 ? 0 : 0.1,
      maxOutputTokens: 768,
      responseMimeType: 'application/json',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 300)}`);
  }
  const data = await res.json();
  let raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  raw = raw.replace(/^```json\s*/i, '').replace(/\s*```\s*$/g, '').trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) raw = jsonMatch[0];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.nodes)) parsed.nodes = [];
    if (!Array.isArray(parsed.edges)) parsed.edges = [];
    if (!Array.isArray(parsed.assets)) parsed.assets = [];
    return normalizeDiagramData(parsed, problemText);
  } catch {
    if (attempt < 3) return fetchDiagramJson(problemText, attempt + 1);
    return fallbackDiagramFromText(problemText);
  }
}

function validateDiagramData(data) {
  if (data?.layout === 'landBuilding' && data.land && data.before && data.after) return true;
  if (!data?.nodes?.length && !data?.edges?.length) return false;
  return true;
}

async function main() {
  const { field, limit, dryRun, force, local } = parseArgs();
  if (!field) {
    console.error('Usage: node scripts/generateMinpouPersonFlowDiagrams.mjs --field 民法総則 [--limit N] [--dry-run]');
    process.exit(1);
  }
  if (!MINPO_FIELDS.includes(field)) {
    console.error(`Unknown field: ${field}. Use one of: ${MINPO_FIELDS.join(', ')}`);
    process.exit(1);
  }

  const items = collectItems(field).slice(0, limit);
  console.log(`Field: ${field}, eligible: ${items.length}${dryRun ? ' (dry-run)' : ''}${local ? ' (local)' : ''}`);

  const manifest = loadManifest();
  const slug = FIELD_SLUG[field];
  const outFieldDir = path.join(OUT_DIR, slug);
  fs.mkdirSync(outFieldDir, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const relPath = `minnpou/${slug}/${item.hash}.png`;
    const outPath = path.join(ROOT, 'assets', 'images', 'person-flow', relPath);

    if (fs.existsSync(outPath) && !force && !getPersonFlowOverride(item.hash, item.learnKey)) {
      console.log(`[${i + 1}/${items.length}] skip (exists): ${item.hash}`);
      skipped++;
      const existing = manifest.entries.find((e) => e.hash === item.hash);
      if (!existing) {
        manifest.entries.push({
          hash: item.hash,
          relPath,
          field: item.field,
          learnKey: item.learnKey,
          quizKey: item.quizKey,
          caption: item.text.slice(0, 60),
        });
      }
      continue;
    }

    if (dryRun) {
      console.log(`[${i + 1}/${items.length}] would generate: ${item.hash} — ${item.text.slice(0, 50)}…`);
      continue;
    }

    console.log(`[${i + 1}/${items.length}] generating: ${item.hash}`);
    try {
      const override = getPersonFlowOverride(item.hash, item.learnKey);
      let diagramData = override ?? buildPersonFlowDiagramFromText(item.text);
      if (!diagramData && !local) {
        diagramData = await fetchDiagramJson(item.text);
      }
      if (!diagramData) {
        diagramData = fallbackDiagramFromText(item.text);
      }
      diagramData = normalizeDiagramData(diagramData, item.text);
      if (!validateDiagramData(diagramData)) {
        console.warn('  skipped: invalid diagram data');
        manifest.entries.push({ hash: item.hash, skipped: true, reason: 'invalid_data', text: item.text.slice(0, 80) });
        continue;
      }
      const canvas = renderPersonFlowDiagram(diagramData);
      const buf = canvas.toBuffer('image/png');
      fs.writeFileSync(outPath, buf);

      manifest.entries = manifest.entries.filter((e) => e.hash !== item.hash);
      manifest.entries.push({
        hash: item.hash,
        relPath,
        field: item.field,
        learnKey: item.learnKey,
        quizKey: item.quizKey,
        caption: item.text.slice(0, 60),
      });
      created++;
      if (!local) await new Promise((r) => setTimeout(r, 800));
    } catch (e) {
      console.error(`  error: ${e.message}`);
      manifest.entries.push({ hash: item.hash, skipped: true, reason: e.message, text: item.text.slice(0, 80) });
    }
  }

  saveManifest(manifest);
  console.log(`Done. created=${created}, skipped=${skipped}, manifest=${manifest.entries.length} entries`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
