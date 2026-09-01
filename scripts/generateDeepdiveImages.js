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
  const exact = DEEPDIVE_IMAGES[normalized];
  if (exact) return exact as number;
  // パス付きは exact（またはフルパスの末尾一致）のみ。
  // textbook/kisochi/q1 が textbook/minpou-kijutsu/q1 を盗まない。
  if (normalized.includes('/')) {
    const byPath = Object.keys(DEEPDIVE_IMAGES).find((k) => k.endsWith('/' + normalized));
    return byPath ? (DEEPDIVE_IMAGES[byPath] as number) : undefined;
  }
  const byBase = Object.keys(DEEPDIVE_IMAGES).find((k) => k === normalized || k.endsWith('/' + normalized));
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

const MINPO_BUKKEN_REFERENCE_IMAGES_BY_QUESTION: Record<number, string[]> = {
  1: [
    'bukken/reference/minpo-bukken-emphyteusis-vs-superficies',
    'bukken/reference/minpo-bukken-aggregate-movables-security',
  ],
  3: [
    'bukken/reference/minpo-bukken-possessory-actions',
    'bukken/reference/minpo-bukken-possessory-action-periods',
    'bukken/reference/minpo-bukken-third-party-177',
    'textbook/minpou-kijutsu/q15-2',
  ],
  4: ['bukken/reference/minpo-bukken-third-party-177'],
  6: [
    'bukken/reference/minpo-bukken-delivery-patterns',
    'bukken/reference/minpo-bukken-immediate-acquisition',
    'bukken/reference/minpo-bukken-stolen-lost-recovery',
    'bukken/reference/minpo-bukken-aggregate-movables-security',
    'textbook/minpou-kijutsu/q15-2',
  ],
  7: [
    'bukken/reference/minpo-bukken-possession-transfer-cases',
    'bukken/reference/minpo-bukken-delivery-patterns',
    'bukken/reference/minpo-bukken-immediate-acquisition',
    'bukken/reference/minpo-bukken-stolen-lost-recovery',
    'textbook/minpou-kijutsu/q15-2',
  ],
  8: [
    'bukken/reference/minpo-bukken-possessory-actions',
    'bukken/reference/minpo-bukken-possessory-action-periods',
    'bukken/reference/minpo-bukken-possessor-owner-recovery',
    'bukken/reference/minpo-bukken-expense-reimbursement',
    'textbook/minpou-kijutsu/q15-2',
  ],
  9: ['bukken/reference/minpo-bukken-neighboring-land-use'],
  10: ['bukken/reference/minpo-bukken-co-ownership-use'],
  11: [
    'bukken/reference/minpo-bukken-neighboring-land-use',
    'bukken/reference/minpo-bukken-emphyteusis-vs-superficies',
    'bukken/reference/minpo-bukken-co-ownership-use',
  ],
  12: [
    'bukken/reference/minpo-bukken-security-real-rights-map',
    'bukken/reference/minpo-bukken-expense-reimbursement',
  ],
  13: [
    'bukken/reference/minpo-bukken-expense-reimbursement',
    'bukken/reference/minpo-bukken-security-real-rights-map',
  ],
  14: [
    'bukken/reference/minpo-bukken-real-estate-priority',
    'bukken/reference/minpo-bukken-security-real-rights-map',
  ],
  15: [
    'bukken/reference/minpo-bukken-security-real-rights-map',
    'bukken/reference/minpo-bukken-possessory-action-periods',
  ],
  16: ['bukken/reference/minpo-bukken-security-real-rights-map'],
  21: ['bukken/reference/minpo-bukken-aggregate-movables-security'],
};

const MINPO_SAIKEN_SOURON_REFERENCE_IMAGES_BY_QUESTION: Record<number, string[]> = {
  2: [
    'saikensouron/reference/minpo-saikensouron-alternative-obligation-selection',
    'saikensouron/reference/minpo-saikensouron-specific-obligation-care',
    'saikensouron/reference/minpo-saikensouron-due-date-delay',
  ],
  3: [
    'saikensouron/reference/minpo-saikensouron-specific-obligation-care',
    'saikensouron/reference/minpo-saikensouron-creditor-delay-risk',
    'saikensouron/reference/minpo-saikensouron-nonperformance-remedies',
  ],
  4: [
    'saikensouron/reference/minpo-saikensouron-creditor-delay-risk',
    'saikensouron/reference/minpo-saikensouron-due-date-delay',
    'saikensouron/reference/minpo-saikensouron-nonperformance-remedies',
  ],
  5: [
    'saikensouron/reference/minpo-saikensouron-due-date-delay',
    'saikensouron/reference/minpo-saikensouron-damages-scope-foreseeability',
    'saikensouron/reference/minpo-saikensouron-nonperformance-remedies',
  ],
  6: [
    'saikensouron/reference/minpo-saikensouron-nonperformance-remedies',
    'saikensouron/reference/minpo-saikensouron-damages-scope-foreseeability',
  ],
  7: ['saikensouron/reference/minpo-saikensouron-creditor-subrogation-vs-fraudulent'],
  8: ['saikensouron/reference/minpo-saikensouron-creditor-subrogation-vs-fraudulent'],
  9: ['saikensouron/reference/minpo-saikensouron-multiple-debtors-map'],
  10: ['saikensouron/reference/minpo-saikensouron-third-party-performance-subrogation'],
  11: [
    'saikensouron/reference/minpo-saikensouron-third-party-performance-subrogation',
    'saikensouron/reference/minpo-saikensouron-multiple-debtors-map',
  ],
  12: ['saikensouron/reference/minpo-saikensouron-multiple-debtors-map'],
  13: ['saikensouron/reference/minpo-saikensouron-third-party-performance-subrogation'],
  14: ['saikensouron/reference/minpo-saikensouron-third-party-performance-subrogation'],
  15: ['saikensouron/reference/minpo-saikensouron-damages-scope-foreseeability'],
};

const MINPO_SAIKEN_KAKURON_REFERENCE_IMAGES_BY_QUESTION: Record<number, string[]> = {
  1: [
    'kakuronn/reference/minpo-saikenkakuron-simultaneous-performance-cancellation',
    'kakuronn/reference/minpo-saikenkakuron-sale-expenses-risk',
  ],
  2: [
    'kakuronn/reference/minpo-saikenkakuron-simultaneous-performance-cancellation',
    'kakuronn/reference/minpo-saikenkakuron-earnest-money-and-performance',
  ],
  3: [
    'kakuronn/reference/minpo-saikenkakuron-simultaneous-performance-cancellation',
    'kakuronn/reference/minpo-saikenkakuron-earnest-money-and-performance',
    'kakuronn/reference/minpo-saikenkakuron-seller-warranty-remedies',
  ],
  4: [
    'kakuronn/reference/minpo-saikenkakuron-simultaneous-performance-cancellation',
    'kakuronn/reference/minpo-saikenkakuron-earnest-money-and-performance',
  ],
  5: ['kakuronn/reference/minpo-saikenkakuron-gift-vs-death-gift'],
  6: [
    'kakuronn/reference/minpo-saikenkakuron-seller-warranty-remedies',
    'kakuronn/reference/minpo-saikenkakuron-sale-expenses-risk',
  ],
  7: [
    'kakuronn/reference/minpo-saikenkakuron-loan-return-timing',
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
  ],
  8: [
    'kakuronn/reference/minpo-saikenkakuron-loan-return-timing',
    'kakuronn/reference/minpo-saikenkakuron-lease-assignment-sublease',
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
  ],
  9: [
    'kakuronn/reference/minpo-saikenkakuron-lease-assignment-sublease',
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
  ],
  10: [
    'kakuronn/reference/minpo-saikenkakuron-lease-assignment-sublease',
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
  ],
  11: ['kakuronn/reference/minpo-saikenkakuron-contract-type-map'],
  12: [
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
    'kakuronn/reference/minpo-saikenkakuron-mandate-termination-reward',
  ],
  13: [
    'kakuronn/reference/minpo-saikenkakuron-contract-type-map',
    'kakuronn/reference/minpo-saikenkakuron-mandate-termination-reward',
    'kakuronn/reference/minpo-saikenkakuron-management-without-mandate',
  ],
  14: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  15: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  16: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  17: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  18: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  19: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  20: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  21: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
  22: ['kakuronn/reference/minpo-saikenkakuron-tort-basic-map'],
};

function existingDeepdiveImageKeys(keys: string[]): string[] {
  return keys.filter((key) => DEEPDIVE_IMAGES[key]);
}

/** 問題を解く・民法物権: 元画像から再構成した横断整理を、対応問題の「もっと深掘る」へ自動配置する。 */
export function resolveMinpoBukkenQuizChoiceImageKeys(
  questionNum1Based: number,
  choiceNum1Based: number
): string[] {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return [];
  return existingDeepdiveImageKeys(MINPO_BUKKEN_REFERENCE_IMAGES_BY_QUESTION[questionNum1Based] || []);
}

/** 旧呼び出し互換: 複数候補の先頭だけを返す。 */
export function resolveMinpoBukkenQuizChoiceImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  return resolveMinpoBukkenQuizChoiceImageKeys(questionNum1Based, choiceNum1Based)[0];
}

/** 問題を解く・民法物権: チャンクボタン用。関連画像を肢ごとに循環させ、全画像に導線を作る。 */
export function resolveMinpoBukkenSupplementChunkImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  const keys = resolveMinpoBukkenQuizChoiceImageKeys(questionNum1Based, choiceNum1Based);
  if (keys.length === 0) return undefined;
  return keys[(choiceNum1Based - 1) % keys.length];
}

/** 問題を解く・民法 債権総論: 元画像から再構成した横断整理を関連問題へ自動配置する。 */
export function resolveSaikensouronQuizChoiceImageKeys(
  questionNum1Based: number,
  choiceNum1Based: number
): string[] {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return [];
  return existingDeepdiveImageKeys(MINPO_SAIKEN_SOURON_REFERENCE_IMAGES_BY_QUESTION[questionNum1Based] || []);
}

/** 問題を解く・民法 債権各論: 既存の肢別画像に加えて、元画像ベースの横断整理を関連問題へ自動配置する。 */
export function resolveSaikenkakuronQuizChoiceImageKeys(
  questionNum1Based: number,
  totalQuestions: number,
  choiceNum1Based: number
): string[] {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return [];
  const keys = new Set<string>();
  const exact = resolveKakuronnQuizChoiceImageKey(questionNum1Based, totalQuestions, choiceNum1Based);
  if (exact) keys.add(exact);
  for (const key of MINPO_SAIKEN_KAKURON_REFERENCE_IMAGES_BY_QUESTION[questionNum1Based] || []) {
    if (DEEPDIVE_IMAGES[key]) keys.add(key);
  }
  return Array.from(keys);
}

export function resolveSaikensouronSupplementChunkImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  const keys = resolveSaikensouronQuizChoiceImageKeys(questionNum1Based, choiceNum1Based);
  if (keys.length === 0) return undefined;
  return keys[(choiceNum1Based - 1) % keys.length];
}

export function resolveSaikenkakuronSupplementChunkImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  const keys = existingDeepdiveImageKeys(MINPO_SAIKEN_KAKURON_REFERENCE_IMAGES_BY_QUESTION[questionNum1Based] || []);
  if (keys.length === 0) return undefined;
  return keys[(choiceNum1Based - 1) % keys.length];
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
 * 元画像は temp_images/learn/saikensouron に置き、assets/images/deepdive/learn/saikensouron/ へコピーしてから本スクリプトを実行。
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

const MINPO_SOUSOKU_ITO_IMAGE_KEYS: Record<string, string> = {
  mukendairiAitegataHogo: 'sousoku/ito-sosoku-01-mukendairi-aitegata-hogo',
  jikouKanseiyuyoKoushin: 'sousoku/ito-sosoku-02-jikou-kanseiyuyo-koushin',
  kyougiGoui151: 'sousoku/ito-sosoku-03-kyougi-goui-151',
  kenriBetsuJikou: 'sousoku/ito-sosoku-04-kenri-betsu-jikou',
  shoumetsuJikouKikan: 'sousoku/ito-sosoku-05-shoumetsu-jikou-kikan',
  kisantenRikouchitai: 'sousoku/ito-sosoku-06-kisanten-rikouchitai',
  dairikenShoumetsu: 'sousoku/ito-sosoku-07-dairiken-shoumetsu',
  mukendairiSouzoku: 'sousoku/ito-sosoku-08-mukendairi-souzoku',
};

function existingMinpoSousokuItoImage(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return DEEPDIVE_IMAGES[key] ? key : undefined;
}

/**
 * 問題を解く・民法総則: 添付教材から生成した横断図を、関連する選択肢の「もっと深掘る」へ自動配置する。
 * 直接対応が弱い図は resolveMinpoSousokuSupplementChunkImageKey 側でチャンク表示する。
 */
export function resolveMinpoSousokuQuizChoiceImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return undefined;
  const k = MINPO_SOUSOKU_ITO_IMAGE_KEYS;
  const key =
    questionNum1Based === 11 && [2, 5, 6].includes(choiceNum1Based)
      ? k.mukendairiAitegataHogo
      : questionNum1Based === 11 && choiceNum1Based === 10
        ? k.dairikenShoumetsu
        : questionNum1Based === 12 && choiceNum1Based === 4
          ? k.mukendairiAitegataHogo
          : questionNum1Based === 13 && [1, 2, 3, 4, 5].includes(choiceNum1Based)
            ? k.mukendairiSouzoku
            : questionNum1Based === 14 && choiceNum1Based === 5
              ? k.kisantenRikouchitai
              : questionNum1Based === 16 && [1, 2, 3, 4, 5, 6, 7, 8].includes(choiceNum1Based)
                ? k.shoumetsuJikouKikan
                : questionNum1Based === 17 && [6, 7, 8, 9].includes(choiceNum1Based)
                  ? k.kenriBetsuJikou
                  : undefined;
  return existingMinpoSousokuItoImage(key);
}

/**
 * 民法総則の周辺チャンク表示用。関連問題が薄い横断図は、近い時効問題のチャンクとして出す。
 */
export function resolveMinpoSousokuSupplementChunkImageKey(
  questionNum1Based: number,
  choiceNum1Based: number
): string | undefined {
  if (questionNum1Based === 16 && choiceNum1Based === 1) {
    return existingMinpoSousokuItoImage(MINPO_SOUSOKU_ITO_IMAGE_KEYS.jikouKanseiyuyoKoushin);
  }
  if (questionNum1Based === 16 && choiceNum1Based === 2) {
    return existingMinpoSousokuItoImage(MINPO_SOUSOKU_ITO_IMAGE_KEYS.kyougiGoui151);
  }
  return undefined;
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
 * 見て聞いて覚える・国家賠償法: gyouseihou/kokubai/N-M（先頭 N = 問番号）
 * 例: 26-136.png → 26問目
 */
export function resolveKokubaiLearnImageKey(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 1) return undefined;
  const head = new RegExp(\`^\${problemNum1Based}-\`);
  const keys = Object.keys(DEEPDIVE_IMAGES).filter((k) => {
    if (!k.startsWith('gyouseihou/kokubai/')) return false;
    const base = k.split('/').pop() || '';
    return head.test(base);
  });
  if (keys.length === 0) return undefined;
  return keys.sort()[0];
}

/**
 * 問題を解く・国家賠償法: gyouseihou/kokubai/M-N-C
 * M=全問数、N=問題番号、C=選択肢番号（いずれも1始まり）。例: 20-1-1.png
 */
export function resolveKokubaiQuizChoiceImageKey(
  questionNum1Based: number,
  totalQuestions: number,
  choiceNum1Based: number
): string | undefined {
  if (questionNum1Based < 1 || choiceNum1Based < 1) return undefined;
  const exact = \`gyouseihou/kokubai/\${totalQuestions}-\${questionNum1Based}-\${choiceNum1Based}\`;
  if (DEEPDIVE_IMAGES[exact]) return exact;
  const re = new RegExp(
    \`^gyouseihou/kokubai/\\\\d+-\${questionNum1Based}-\${choiceNum1Based}$\`
  );
  return Object.keys(DEEPDIVE_IMAGES).find((k) => re.test(k));
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
