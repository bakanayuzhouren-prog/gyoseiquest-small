const fs = require('fs');
const path = require('path');

const DEEPDIVE_DIR = path.join(__dirname, '..', 'assets', 'images', 'deepdive');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'deepdiveImages.ts');

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

console.log('Generating deepdive images map...');

if (!fs.existsSync(DEEPDIVE_DIR)) {
  fs.mkdirSync(DEEPDIVE_DIR, { recursive: true });
  console.log(`Created ${DEEPDIVE_DIR}`);
}

function scanDir(dir, relPath = '') {
  const entries = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const nextRel = relPath ? relPath + '/' + item : item;
    if (stat.isDirectory()) {
      entries.push(...scanDir(fullPath, nextRel));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (!EXTENSIONS.includes(ext)) continue;
      const key = nextRel.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
      const resourcePath = '@/assets/images/deepdive/' + nextRel.replace(/\\/g, '/');
      entries.push({ key, resourcePath });
    }
  }
  return entries;
}

try {
  const entries = scanDir(DEEPDIVE_DIR);
  entries.sort((a, b) => a.key.localeCompare(b.key));

  const mapLines = entries.map((e) => `  '${e.key.replace(/'/g, "\\'")}': require('${e.resourcePath}')`);
  const content = `/**
 * 問題を解くモード「もっと深掘る」専用画像マッピング（自動生成）
 * node scripts/generateDeepdiveImages.js で再生成
 * スプレッドシートM列の [[image:xxx]] で参照。xxx はファイル名（拡張子なし可）またはパス。
 */
export const DEEPDIVE_IMAGES: Record<string, ReturnType<typeof require>> = {
${mapLines.length > 0 ? mapLines.join(',\n') : ''}
};

export function getDeepdiveImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = DEEPDIVE_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(DEEPDIVE_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (DEEPDIVE_IMAGES[byBase] as number) : undefined;
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} images.`);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
