/**
 * assets/images/deepdive/kenpou の既存PNG/JPEGを軽量化する。
 * ファイル名と拡張子は維持するため、deepdiveImages.ts のキーは変わらない。
 *
 *   node scripts/compressKenpouDeepdiveImages.mjs --dry-run
 *   node scripts/compressKenpouDeepdiveImages.mjs
 *   node scripts/compressKenpouDeepdiveImages.mjs --max-width=1600 --min-bytes=600000
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET_DIR = path.join(ROOT, 'assets', 'images', 'deepdive', 'kenpou');

function parseArgs(argv) {
  const args = {
    dryRun: argv.includes('--dry-run'),
    maxWidth: 1600,
    minBytes: 600_000,
  };
  for (const arg of argv) {
    if (arg.startsWith('--max-width=')) args.maxWidth = Number(arg.slice('--max-width='.length)) || args.maxWidth;
    if (arg.startsWith('--min-bytes=')) args.minBytes = Number(arg.slice('--min-bytes='.length)) || args.minBytes;
  }
  args.maxWidth = Math.max(900, Math.min(2400, args.maxWidth));
  args.minBytes = Math.max(0, args.minBytes);
  return args;
}

async function* walkFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkFiles(full);
    else yield full;
  }
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / 1024 / 1024).toFixed(2)} MiB`;
}

async function optimizeOne(filePath, args) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const before = (await fs.promises.stat(filePath)).size;
  if (before < args.minBytes) return null;

  const input = await fs.promises.readFile(filePath);
  const image = sharp(input, { failOn: 'none', animated: false });
  const meta = await image.metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;
  if (!width || !height) return null;

  const resized =
    width > args.maxWidth
      ? sharp(input, { failOn: 'none', animated: false }).resize({
          width: args.maxWidth,
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3,
        })
      : sharp(input, { failOn: 'none', animated: false });

  const out =
    ext === '.png'
      ? await resized
          .png({
            compressionLevel: 9,
            effort: 10,
            adaptiveFiltering: true,
            palette: true,
            quality: 92,
          })
          .toBuffer()
      : await resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  if (out.length >= before) {
    return { rel: path.relative(ROOT, filePath), before, after: before, width, height, skipped: 'no smaller' };
  }

  if (!args.dryRun) {
    await fs.promises.writeFile(filePath, out);
  }

  const outMeta = await sharp(out, { failOn: 'none' }).metadata();
  return {
    rel: path.relative(ROOT, filePath),
    before,
    after: out.length,
    width,
    height,
    outWidth: outMeta.width || width,
    outHeight: outMeta.height || height,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(TARGET_DIR)) {
    throw new Error(`Target directory not found: ${TARGET_DIR}`);
  }

  console.log(`kenpou deepdive image compression: maxWidth=${args.maxWidth}, minBytes=${args.minBytes}, dryRun=${args.dryRun}`);

  let totalBefore = 0;
  let totalAfter = 0;
  let rewritten = 0;
  let skipped = 0;

  for await (const filePath of walkFiles(TARGET_DIR)) {
    const result = await optimizeOne(filePath, args);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    if (result.skipped) {
      skipped += 1;
      continue;
    }
    rewritten += 1;
    const pct = (((result.before - result.after) / result.before) * 100).toFixed(1);
    console.log(
      `${result.rel}: ${fmtBytes(result.before)} -> ${fmtBytes(result.after)} (-${pct}%) ` +
        `${result.width}x${result.height} -> ${result.outWidth}x${result.outHeight}`,
    );
  }

  console.log('---');
  console.log(`rewritten: ${rewritten}, skipped: ${skipped}`);
  console.log(`total: ${fmtBytes(totalBefore)} -> ${fmtBytes(totalAfter)}`);
  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    console.log(`saved: ${fmtBytes(saved)} (${((saved / totalBefore) * 100).toFixed(1)}%)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
