import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const originalOcrDir = path.resolve(ROOT, process.argv[2] || 'tmp/moshi-winocr/合格１-questions');
const rotatedOcrDir = path.resolve(ROOT, process.argv[3] || 'tmp/moshi-winocr/合格１-questions-rotations');
const outputDir = path.resolve(ROOT, process.argv[4] || 'tmp/moshi-winocr/合格１-questions-best');

const LEGAL_KEYWORDS = [
  '問題',
  '次の',
  '妥当',
  '正しい',
  '誤って',
  '判例',
  '憲法',
  '行政',
  '行政法',
  '地方自治法',
  '国家賠償法',
  '行政手続法',
  '行政不服審査法',
  '行政事件訴訟法',
  '民法',
  '債権',
  '相続',
  '会社法',
  '株式',
  '取締役',
  '一般知識',
  '情報通信',
];

function compact(text) {
  return String(text || '').replace(/\u000c/g, '').replace(/\s+/g, '');
}

function countMatches(text, re) {
  return [...text.matchAll(re)].length;
}

function scoreText(raw) {
  const text = compact(raw);
  const length = text.length;
  const jp = countMatches(text, /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}々ー]/gu);
  const kana = countMatches(text, /[\p{Script=Hiragana}\p{Script=Katakana}ー]/gu);
  const questionIds = countMatches(text, /(?:問題|間題|問)[0-9０-９]{1,2}/g);
  const choices = countMatches(text, /(?:^|[^0-9０-９])[1-5１-５](?=[^\d０-９]{4,})/g);
  const punctuation = countMatches(text, /[、。]/g);
  const latinNoise = countMatches(text, /[A-Za-zØ]/g);
  const oddNoise = countMatches(text, /[罅爨鸚澀滝汁呼]/g);
  const keywords = LEGAL_KEYWORDS.reduce((sum, word) => sum + countMatches(text, new RegExp(word, 'g')), 0);
  const japaneseRatio = length ? jp / length : 0;

  let score = 0;
  score += Math.min(length, 5000) * 0.12;
  score += jp * 1.5;
  score += kana * 0.25;
  score += questionIds * 450;
  score += choices * 55;
  score += punctuation * 4;
  score += keywords * 65;
  score += japaneseRatio * 500;
  score -= latinNoise * 8;
  score -= oddNoise * 80;
  if (length < 120) score -= 500;
  if (japaneseRatio < 0.45) score -= 400;
  return Math.round(score * 100) / 100;
}

function ensureCandidate(bucket, candidate) {
  if (!bucket.has(candidate.page)) bucket.set(candidate.page, []);
  bucket.get(candidate.page).push(candidate);
}

function readOriginalCandidates(bucket) {
  if (!fs.existsSync(originalOcrDir)) return;
  const files = fs
    .readdirSync(originalOcrDir)
    .filter((name) => /\.txt$/i.test(name))
    .sort((a, b) => a.localeCompare(b, 'ja'));
  for (const file of files) {
    const match = file.match(/^(\d{3})-(.+)\.txt$/i);
    if (!match) continue;
    const textPath = path.join(originalOcrDir, file);
    const raw = fs.readFileSync(textPath, 'utf8');
    ensureCandidate(bucket, {
      page: Number(match[1]),
      sourceBase: match[2],
      rotation: 'original',
      textPath,
      score: scoreText(raw),
      length: raw.length,
    });
  }
}

function readRotatedCandidates(bucket) {
  const manifestPath = path.join(rotatedOcrDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return;
  const manifestText = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestText.charCodeAt(0) === 0xfeff ? manifestText.slice(1) : manifestText);
  for (const item of manifest) {
    const match = String(item.file || '').match(/^(\d{3})-(.+)__r([0-9]{3})\.(?:jpe?g|png|webp)$/i);
    if (!match) continue;
    const textPath = path.join(rotatedOcrDir, item.output);
    if (!fs.existsSync(textPath)) continue;
    const raw = fs.readFileSync(textPath, 'utf8');
    ensureCandidate(bucket, {
      page: Number(match[1]),
      sourceBase: match[2],
      rotation: Number(match[3]),
      textPath,
      score: scoreText(raw),
      length: raw.length,
    });
  }
}

const byPage = new Map();
readOriginalCandidates(byPage);
readRotatedCandidates(byPage);

fs.mkdirSync(outputDir, { recursive: true });

const selections = [];
for (const [page, candidates] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
  candidates.sort((a, b) => b.score - a.score || b.length - a.length);
  const best = candidates[0];
  const outName = `${String(page).padStart(3, '0')}-${best.sourceBase}.txt`;
  const outPath = path.join(outputDir, outName);
  fs.copyFileSync(best.textPath, outPath);
  selections.push({
    page,
    output: path.relative(ROOT, outPath),
    sourceBase: best.sourceBase,
    selectedRotation: best.rotation,
    selectedScore: best.score,
    selectedLength: best.length,
    candidates: candidates.map((candidate) => ({
      rotation: candidate.rotation,
      score: candidate.score,
      length: candidate.length,
      textPath: path.relative(ROOT, candidate.textPath),
    })),
  });
}

fs.writeFileSync(path.join(outputDir, 'selection-manifest.json'), `${JSON.stringify(selections, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      pages: selections.length,
      outputDir: path.relative(ROOT, outputDir),
      selectedRotations: selections.reduce((acc, item) => {
        const key = String(item.selectedRotation);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    },
    null,
    2,
  ),
);


