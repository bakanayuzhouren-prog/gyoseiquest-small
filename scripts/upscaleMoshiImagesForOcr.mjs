import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const EXAM_ID = process.argv[2] || '合格１';
const SCALE = Number(process.argv[3] || 2);

const TARGETS = [
  {
    label: 'questions',
    input: path.join(ROOT, 'app', 'textbook', '模試元画像', EXAM_ID),
    output: path.join(ROOT, 'app', 'textbook', '模試元画像_高解像度OCR用', EXAM_ID),
  },
  {
    label: 'answers',
    input: path.join(ROOT, 'app', 'textbook', '模試解答', EXAM_ID),
    output: path.join(ROOT, 'app', 'textbook', '模試解答_高解像度OCR用', EXAM_ID),
  },
];

const IMAGE_RE = /\.(png|jpe?g|webp)$/i;

async function enhanceImage(inputPath, outputPath) {
  const meta = await sharp(inputPath, { failOn: 'none' }).rotate().metadata();
  const width = Math.max(1, Math.round((meta.width || 1) * SCALE));
  const height = Math.max(1, Math.round((meta.height || 1) * SCALE));

  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize(width, height, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .grayscale()
    .normalize()
    .linear(1.16, -10)
    .sharpen({
      sigma: 1.05,
      m1: 0.8,
      m2: 1.6,
      x1: 2,
      y2: 10,
      y3: 20,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

async function processDir(target) {
  if (!fs.existsSync(target.input)) {
    console.warn(`[skip] ${target.label}: input not found: ${path.relative(ROOT, target.input)}`);
    return { label: target.label, count: 0 };
  }

  fs.mkdirSync(target.output, { recursive: true });

  const files = fs
    .readdirSync(target.input)
    .filter((name) => IMAGE_RE.test(name))
    .sort((a, b) => a.localeCompare(b, 'ja'));

  let count = 0;
  for (const [index, file] of files.entries()) {
    const inputPath = path.join(target.input, file);
    const base = path.parse(file).name;
    const outputPath = path.join(target.output, `${String(index + 1).padStart(3, '0')}-${base}.png`);
    await enhanceImage(inputPath, outputPath);
    count += 1;
    console.log(`[${target.label}] ${count}/${files.length} ${path.basename(outputPath)}`);
  }

  return { label: target.label, count };
}

const results = [];
for (const target of TARGETS) {
  results.push(await processDir(target));
}

console.log(
  JSON.stringify(
    {
      examId: EXAM_ID,
      scale: SCALE,
      outputs: TARGETS.map((target) => path.relative(ROOT, target.output)),
      results,
    },
    null,
    2,
  ),
);
