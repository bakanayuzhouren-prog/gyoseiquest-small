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

/**
 * 問題を解く・民法 債権各論: assets/images/deepdive/kakuronn/kakuronnN-M-C
 * N=問題番号（1始まり）、M=当該分野の問題数、C=選択肢番号（1始まり）。
 */
export function resolveKakuronnQuizChoiceImageKey(
  questionNum1Based: number,
  totalQuestions: number,
  choiceNum1Based: number
): string | undefined {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return undefined;
  const exact = \`kakuronn/kakuronn\${questionNum1Based}-\${totalQuestions}-\${choiceNum1Based}\`;
  if (DEEPDIVE_IMAGES[exact]) return exact;
  const re = new RegExp(\`^kakuronn/kakuronn\${questionNum1Based}-\\\\d+-\${choiceNum1Based}$\`);
  return Object.keys(DEEPDIVE_IMAGES).find((k) => re.test(k));
}

/**
 * 問題を解く・憲法: kennpou-toku/kenpouN があれば全肢共通で最優先。
 * 次に kenpou/N-M-C（存在すれば）、なければ kenpou/N-230。218問目は 184 へエイリアス。
 */
export function resolveKenpouQuizChoiceImageKey(
  questionNum1Based: number,
  totalQuestions: number,
  choiceNum1Based: number
): string | undefined {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return undefined;

  const tokuExact = \`kennpou-toku/kenpou\${questionNum1Based}\`;
  if (DEEPDIVE_IMAGES[tokuExact]) return tokuExact;

  const tryWithN = (n: number) => {
    const exact = \`kenpou/\${n}-\${totalQuestions}-\${choiceNum1Based}\`;
    if (DEEPDIVE_IMAGES[exact]) return exact;
    const re = new RegExp(\`^kenpou/\${n}-\\\\d+-\${choiceNum1Based}$\`);
    return Object.keys(DEEPDIVE_IMAGES).find((k) => re.test(k));
  };

  let key = tryWithN(questionNum1Based);
  if (!key && questionNum1Based === 218) key = tryWithN(184);
  if (key) return key;

  if (questionNum1Based === 218) {
    const alias184 = resolveKenpouProblemImageKey(184);
    if (alias184) return alias184;
  }
  return resolveKenpouProblemImageKey(questionNum1Based);
}

/**
 * 問題を解く・記述（行政法）: assets/images/deepdive/kijyutu/gyouseihou/kijyutu-gyouseihouN-S
 * N=行政法記述の問番号（1始まり）、S=【ケースA】などの末尾英字または数字。
 * 例: kijyutu-gyouseihou3-A.png
 */
export function resolveKijyutuGyouseihouCaseImageKey(
  questionNum1Based: number,
  caseSuffix: string,
): string | undefined {
  if (questionNum1Based < 1 || !caseSuffix) return undefined;
  const flat = String(caseSuffix).normalize('NFKC').trim();
  if (!flat) return undefined;
  const c0 = flat[0];
  const token =
    /^[a-z]$/i.test(c0) ? c0.toUpperCase() : /^[0-9]$/u.test(c0) ? c0 : '';
  if (!token) return undefined;
  const exact = \`kijyutu/gyouseihou/kijyutu-gyouseihou\${questionNum1Based}-\${token}\`;
  if (DEEPDIVE_IMAGES[exact]) return exact;
  // 過去資産など「kijyutu-gyouseihou-{N}-{S}.png」（N の前にもハイフン）にも対応
  const hyphenBeforeNum = \`kijyutu/gyouseihou/kijyutu-gyouseihou-\${questionNum1Based}-\${token}\`;
  if (DEEPDIVE_IMAGES[hyphenBeforeNum]) return hyphenBeforeNum;
  const base = \`kijyutu-gyouseihou\${questionNum1Based}-\${token}\`;
  const baseHyphenBeforeNum = \`kijyutu-gyouseihou-\${questionNum1Based}-\${token}\`;
  const hitKey = Object.keys(DEEPDIVE_IMAGES).find((k) => {
    const b = k.split('/').pop() || '';
    return b === base || b === baseHyphenBeforeNum;
  });
  return hitKey;
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} images.`);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
