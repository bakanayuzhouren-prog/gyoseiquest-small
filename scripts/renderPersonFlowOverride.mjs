/**
 * 手修正オーバーライドで登場人物図 PNG を再生成
 *
 *   node scripts/renderPersonFlowOverride.mjs l9ze71
 *   node scripts/renderPersonFlowOverride.mjs --all
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPersonFlowDiagram } from './lib/personFlowCanvasLayout.mjs';
import { PERSON_FLOW_OVERRIDES } from './lib/personFlowOverrides.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'output', 'person-flow-manifest.json');

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return { entries: [] };
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return { entries: [] };
  }
}

function renderOne(hash) {
  const data = PERSON_FLOW_OVERRIDES[hash];
  if (!data) {
    console.error(`No override for hash: ${hash}`);
    return false;
  }
  const manifest = loadManifest();
  const entry = manifest.entries.find((e) => e.hash === hash);
  const relPath = entry?.relPath || `minnpou/bukken/${hash}.png`;
  const outPath = path.join(ROOT, 'assets', 'images', 'person-flow', relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const canvas = renderPersonFlowDiagram(data);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`✓ ${relPath}`);
  return true;
}

const args = process.argv.slice(2);
if (args.includes('--all')) {
  const hashes = Object.keys(PERSON_FLOW_OVERRIDES);
  let ok = 0;
  for (const hash of hashes) {
    if (renderOne(hash)) ok++;
  }
  console.log(`Done: ${ok}/${hashes.length}`);
} else {
  const hash = args[0] || 'l9ze71';
  if (!renderOne(hash)) process.exit(1);
}
