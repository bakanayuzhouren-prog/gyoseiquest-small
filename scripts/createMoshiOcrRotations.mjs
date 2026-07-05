import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const inputDir = path.resolve(ROOT, process.argv[2] || 'app/textbook/模試元画像/合格１');
const outputDir = path.resolve(ROOT, process.argv[3] || 'tmp/moshi-ocr-rotations/合格１-questions');
const IMAGE_RE = /\.(png|jpe?g|webp)$/i;
const ROTATIONS = [0, 90, 180, 270];

fs.mkdirSync(outputDir, { recursive: true });

const files = fs
  .readdirSync(inputDir)
  .filter((name) => IMAGE_RE.test(name))
  .sort((a, b) => a.localeCompare(b, 'ja'));

const manifest = [];

for (const [index, file] of files.entries()) {
  const inputPath = path.join(inputDir, file);
  const base = path.parse(file).name;
  const page = String(index + 1).padStart(3, '0');

  for (const rotation of ROTATIONS) {
    const outName = `${page}-${base}__r${String(rotation).padStart(3, '0')}.jpg`;
    const outputPath = path.join(outputDir, outName);

    await sharp(inputPath, { failOn: 'none' })
      .rotate()
      .grayscale()
      .normalize()
      .linear(1.08, -4)
      .sharpen({ sigma: 0.85, m1: 0.5, m2: 1.2 })
      .rotate(rotation, { background: '#ffffff' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(outputPath);

    manifest.push({
      page: index + 1,
      sourceImage: file,
      rotation,
      output: path.relative(ROOT, outputPath),
    });
  }

  console.log(`[${index + 1}/${files.length}] ${file}`);
}

fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(
  JSON.stringify(
    {
      inputDir: path.relative(ROOT, inputDir),
      outputDir: path.relative(ROOT, outputDir),
      pages: files.length,
      variants: manifest.length,
    },
    null,
    2,
  ),
);
