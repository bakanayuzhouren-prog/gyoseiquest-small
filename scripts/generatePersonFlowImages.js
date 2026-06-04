const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PERSON_FLOW_DIR = path.join(ROOT, 'assets', 'images', 'person-flow');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'output', 'person-flow-manifest.json');
const OUTPUT_FILE = path.join(ROOT, 'src', 'personFlowImages.ts');

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return { entries: [] };
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return { entries: [] };
  }
}

function scanPngFiles(dir, rel = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    const nextRel = rel ? `${rel}/${item}` : item;
    if (stat.isDirectory()) {
      out.push(...scanPngFiles(full, nextRel));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (!EXTENSIONS.includes(ext)) continue;
      out.push(nextRel.replace(/\\/g, '/'));
    }
  }
  return out;
}

function relToRequire(relPath) {
  return `@/assets/images/person-flow/${relPath}`;
}

function buildMaps(manifest, pngFiles) {
  const byHash = {};
  const byLearn = {};
  const byQuiz = {};

  const manifestByRel = new Map();
  for (const e of manifest.entries || []) {
    if (e.relPath && !e.skipped) manifestByRel.set(e.relPath, e);
  }

  for (const rel of pngFiles) {
    const key = rel.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const resourcePath = relToRequire(rel);
    const item = `{ source: require('${resourcePath}')`;
    const meta = manifestByRel.get(rel) || manifestByRel.get(key);
    const caption = meta?.caption ? `, caption: ${JSON.stringify(meta.caption)}` : '';
    const itemStr = `${item}${caption} }`;

    if (meta?.hash) {
      byHash[meta.hash] = itemStr;
    }
    if (meta?.learnKey) {
      byLearn[meta.learnKey] = itemStr;
    }
    if (meta?.quizKey) {
      byQuiz[meta.quizKey] = itemStr;
    }

    if (!meta?.hash) {
      const base = path.basename(key, path.extname(key));
      if (!byHash[base]) byHash[base] = itemStr;
    }
  }

  return { byHash, byLearn, byQuiz };
}

function formatRecord(name, map) {
  const lines = Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  '${k.replace(/'/g, "\\'")}': ${v}`);
  return `export const ${name}: Record<string, PersonFlowDiagramItem | PersonFlowDiagramItem[]> = {\n${lines.join(',\n')}\n};`;
}

try {
  const manifest = loadManifest();
  const pngFiles = scanPngFiles(PERSON_FLOW_DIR);
  const { byHash, byLearn, byQuiz } = buildMaps(manifest, pngFiles);

  const content = `/**
 * 民法・登場人物関係図（自動生成）
 * node scripts/generatePersonFlowImages.js で再生成
 */
export type PersonFlowDiagramItem = {
  source: number;
  caption?: string;
};

${formatRecord('BY_QUESTION_TEXT_HASH', byHash)}

${formatRecord('BY_LEARN_KEY', byLearn)}

${formatRecord('BY_QUIZ_KEY', byQuiz)}

export function getPersonFlowImageSource(key: string): number | undefined {
  if (!key) return undefined;
  const normalized = key.replace(/\\.(png|jpg|jpeg|webp)$/i, '');
  const allMaps = [BY_QUESTION_TEXT_HASH, BY_LEARN_KEY, BY_QUIZ_KEY];
  for (const map of allMaps) {
    const v = map[normalized] ?? map[key];
    if (!v) continue;
    const item = Array.isArray(v) ? v[0] : v;
    if (item?.source) return item.source;
  }
  return undefined;
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Wrote ${OUTPUT_FILE} (${pngFiles.length} images, ${Object.keys(byHash).length} hash keys)`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
