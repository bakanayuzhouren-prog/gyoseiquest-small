const fs = require('fs');
const path = require('path');

const CHUNK_DIR = path.join(__dirname, '..', 'assets', 'images', 'chunk');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'chunkImages.ts');

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

console.log('Generating chunk images map...');

if (!fs.existsSync(CHUNK_DIR)) {
  fs.mkdirSync(CHUNK_DIR, { recursive: true });
  console.log(`Created ${CHUNK_DIR}`);
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
      const resourcePath = '@/assets/images/chunk/' + nextRel.replace(/\\/g, '/');
      entries.push({ key, resourcePath });
    }
  }
  return entries;
}

try {
  const entries = scanDir(CHUNK_DIR);
  entries.sort((a, b) => a.key.localeCompare(b.key));

  const mapLines = entries.map((e) => `  '${e.key.replace(/'/g, "\\'")}': require('${e.resourcePath}')`);
  const content = `/**
 * チャンク用ローカル画像マッピング（自動生成）
 * node scripts/generateChunkImages.js で再生成
 * スプレッドシートY列にファイル名（拡張子なし可）またはパスを記入。
 * 命名規則: {科目}/{トピック}/{トピック}{問番号}-{肢番号}.png（例: minnpou/sousoku/sousoku1-2.3.4 = 1問目の肢2,3,4）
 */
export const CHUNK_IMAGES: Record<string, ReturnType<typeof require>> = {
${mapLines.join(',\n')}
};

export function getChunkImageSource(filename: string): number | undefined {
  if (!filename) return undefined;
  const normalized = filename.replace(/\\.(png|jpg|jpeg|gif|webp)$/i, '');
  const base = normalized.includes('/') ? normalized.split('/').pop()! : normalized;
  const exact = CHUNK_IMAGES[normalized];
  if (exact) return exact as number;
  const byBase = Object.keys(CHUNK_IMAGES).find((k) => k === base || k.endsWith('/' + base));
  return byBase ? (CHUNK_IMAGES[byBase] as number) : undefined;
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} images.`);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
