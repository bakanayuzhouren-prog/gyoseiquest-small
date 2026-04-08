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

/** 見て聞いて覚える・憲法: 問番号（1始まり）→ kenpou/N-230（ファイル名の揺れに一部対応） */
export function resolveKenpouProblemImageKey(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 1) return undefined;
  const exact = \`kenpou/\${problemNum1Based}-230\`;
  if (DEEPDIVE_IMAGES[exact]) return exact;
  const re = new RegExp(\`^kenpou/\${problemNum1Based}-230(?:$|[\\\\s-])\`);
  return Object.keys(DEEPDIVE_IMAGES).find((k) => re.test(k));
}

/** 見て聞いて覚える・民法物権: learn/minnpou/bukken/N-110 */
export function resolveMinpoBukkenLearnImageKey(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 1) return undefined;
  const exact = \`learn/minnpou/bukken/\${problemNum1Based}-110\`;
  if (DEEPDIVE_IMAGES[exact]) return exact;
  const re = new RegExp(\`^learn/minnpou/bukken/\${problemNum1Based}-110(?:$|-)\`);
  return Object.keys(DEEPDIVE_IMAGES).find((k) => re.test(k));
}

/**
 * 見て聞いて覚える・民法（物権以外）: learn/minnpou/ 配下で、bukken 以外かつ
 * ファイル名が「問番号N-…」（N-M 形式の先頭N）のものを探す（総則・債権・家族など）
 */
export function resolveMinpoLearnFolderByQuestionNumber(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 1) return undefined;
  const head = new RegExp(\`^\${problemNum1Based}-\`);
  const keys = Object.keys(DEEPDIVE_IMAGES).filter((k) => {
    if (!k.startsWith('learn/minnpou/') || k.startsWith('learn/minnpou/bukken/')) return false;
    const base = k.split('/').pop() || '';
    return head.test(base);
  });
  if (keys.length === 0) return undefined;
  return keys.sort()[0];
}

/**
 * 見て聞いて覚える・債権総論: learn/saikensouron/ 配下、ファイル名が「N-…」（先頭が問番号）。
 * 元画像は temp_images/saikensouron に置き、assets/images/deepdive/learn/saikensouron/ へコピーしてから本スクリプトを実行。
 */
export function resolveSaikensouronLearnImageKey(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 1) return undefined;
  const head = new RegExp(\`^\${problemNum1Based}-\`);
  const keys = Object.keys(DEEPDIVE_IMAGES).filter((k) => {
    if (!k.startsWith('learn/saikensouron/')) return false;
    const base = k.split('/').pop() || '';
    return head.test(base);
  });
  if (keys.length === 0) return undefined;
  return keys.sort()[0];
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} images.`);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
