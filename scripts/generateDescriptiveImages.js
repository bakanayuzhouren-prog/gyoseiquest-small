const fs = require('fs');
const path = require('path');

const DESCRIPTIVE_DIR = path.join(__dirname, '..', 'assets', 'images', 'descriptive');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'descriptiveImages.ts');

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

console.log('Generating descriptive (記述式) explanation images map...');

if (!fs.existsSync(DESCRIPTIVE_DIR)) {
  fs.mkdirSync(DESCRIPTIVE_DIR, { recursive: true });
  fs.writeFileSync(path.join(DESCRIPTIVE_DIR, '.gitkeep'), '', 'utf8');
  console.log(`Created ${DESCRIPTIVE_DIR}`);
}

function scanDir(dir, relPath = '') {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === '.gitkeep') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const nextRel = relPath ? relPath + '/' + item : item;
    if (stat.isDirectory()) {
      entries.push(...scanDir(fullPath, nextRel));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (!EXTENSIONS.includes(ext)) continue;
      const key = nextRel.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
      const resourcePath = '@/assets/images/descriptive/' + nextRel.replace(/\\/g, '/');
      entries.push({ key, resourcePath });
    }
  }
  return entries;
}

try {
  const entries = scanDir(DESCRIPTIVE_DIR);
  entries.sort((a, b) => a.key.localeCompare(b.key));

  const mapLines = entries.map((e) => `  '${e.key.replace(/'/g, "\\'")}': require('${e.resourcePath}')`);
  const content = `/**
 * 記述式問題の解説画像マッピング（自動生成）
 * node scripts/generateDescriptiveImages.js で再生成
 * スプレッドシートL列（解説）に [[image:xxx]] で参照。xxx はファイル名（拡張子なし可）またはパス。
 * 画像は assets/images/descriptive/ に配置。
 */
export const DESCRIPTIVE_IMAGES: Record<string, ReturnType<typeof require>> = {
${mapLines.length > 0 ? mapLines.join(',\n') : ''}
};

export function getDescriptiveImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = DESCRIPTIVE_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(DESCRIPTIVE_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (DESCRIPTIVE_IMAGES[byBase] as number) : undefined;
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} images.`);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
