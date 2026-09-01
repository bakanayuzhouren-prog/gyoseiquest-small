/**
 * LEC公開模試特典・憲法おまけ（tmp/模試画像/LECおまけ/憲法/）のOCR。
 * 出力: tmp/lec-bonus-kenpou-2026/
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'tmp', '模試画像', 'LECおまけ', '憲法');
const OUTPUT_DIR = path.join(ROOT, 'tmp', 'lec-bonus-kenpou-2026');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function parseArgs(argv) {
  const args = { limit: 0, start: 0 };
  for (const arg of argv) {
    if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length)) || 0;
    if (arg.startsWith('--start=')) args.start = Number(arg.slice('--start='.length)) || 0;
  }
  return args;
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => {
      if (!entry.isFile()) return false;
      const lower = entry.name.toLowerCase();
      return IMAGE_EXTENSIONS.has(path.extname(lower)) || lower.endsWith('.mp.jpg');
    })
    .map((entry) => path.join(dir, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), 'ja'));
}

function compactOcrText(text) {
  return String(text || '')
    .replace(/\u000c/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const pagesDir = path.join(OUTPUT_DIR, 'pages');
  await fs.mkdir(pagesDir, { recursive: true });

  let files = await listImages(SOURCE_DIR);
  if (args.start > 0) files = files.slice(args.start);
  if (args.limit > 0) files = files.slice(0, args.limit);
  if (files.length === 0) throw new Error(`画像が見つかりません: ${SOURCE_DIR}`);

  const manifestPath = path.join(OUTPUT_DIR, 'ocr-manifest.json');
  const previous = await fs
    .readFile(manifestPath, 'utf8')
    .then((raw) => JSON.parse(raw))
    .catch(() => ({ pages: [] }));
  const byFile = new Map((previous.pages || []).map((p) => [p.file, p]));

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const name = path.basename(file);
    if (byFile.get(name)?.text) {
      console.log(`[skip] ${name}`);
      continue;
    }
    console.log(`[ocr] ${i + 1}/${files.length}: ${name}`);
    const result = await Tesseract.recognize(file, 'jpn', {
      logger: (message) => {
        if (message.status === 'recognizing text' && typeof message.progress === 'number') {
          process.stdout.write(`\r  ${Math.round(message.progress * 100)}%`);
        }
      },
    });
    process.stdout.write('\n');
    const text = compactOcrText(result?.data?.text || '');
    const page = { file: name, filePath: path.relative(ROOT, file), text };
    byFile.set(name, page);
    await fs.writeFile(path.join(pagesDir, `${name.replace(/\./g, '_')}.txt`), text, 'utf8');
    await fs.writeFile(
      manifestPath,
      JSON.stringify(
        {
          examId: 'lec-bonus-kenpou-2026',
          title: '2026 全日本行政書士公開模試〈特典〉憲法',
          updatedAt: new Date().toISOString(),
          pages: [...byFile.values()],
        },
        null,
        2,
      ),
      'utf8',
    );
  }

  const ordered = [...byFile.values()].sort((a, b) => a.file.localeCompare(b.file, 'ja'));
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'combined-shoot-order.txt'),
    ordered.map((p) => `\n\n<!-- ${p.file} -->\n\n${p.text}`).join('\n').trim(),
    'utf8',
  );

  const mapPath = path.join(OUTPUT_DIR, 'image-map.json');
  try {
    const map = JSON.parse(await fs.readFile(mapPath, 'utf8'));
    const byName = new Map(ordered.map((p) => [p.file, p]));
    const adopted = (map.images || []).filter((img) => img.disposition === 'adopt');
    const pageOrderText = adopted
      .map((img) => {
        const page = byName.get(img.file);
        return `\n\n<!-- p${img.estimatedPage} ${img.file} ${img.heading || ''} -->\n\n${page?.text || '(OCR未了)'}`;
      })
      .join('\n')
      .trim();
    await fs.writeFile(path.join(OUTPUT_DIR, 'combined-page-order.txt'), pageOrderText, 'utf8');
  } catch {
    // image-map が無いときは撮影順のみ
  }

  console.log(`Done. ${ordered.length} pages -> ${path.relative(ROOT, OUTPUT_DIR)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
