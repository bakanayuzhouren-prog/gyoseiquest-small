/**
 * temp_images/learn/kenpou 配下の PNG / JPEG を再圧縮（上書き）。
 * 出力が元より大きい場合はスキップしてファイルを触らない。
 *
 *   node scripts/compressTempKenpouImages.mjs
 *   node scripts/compressTempKenpouImages.mjs --dry-run
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { PATHS } = require('./tempImagesPaths.js');
const TARGET_DIR = PATHS.learnKenpou;

const dryRun = process.argv.includes('--dry-run');

/** @param {string} dir */
async function* walkFiles(dir) {
  let entries;
  try {
    entries = await fs.promises.readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (e.code === 'ENOENT') return;
    throw e;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkFiles(full);
    else yield full;
  }
}

/**
 * @param {string} filePath
 * @returns {Promise<{ ok: boolean, before: number, after: number, skipped?: string } | null>}
 */
async function compressOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const buf = await fs.promises.readFile(filePath);
  const before = buf.length;

  let out;
  try {
    const img = sharp(buf, { failOn: 'none' });
    if (ext === '.png') {
      out = await img
        .png({
          compressionLevel: 9,
          effort: 10,
          adaptiveFiltering: true,
        })
        .toBuffer();
    } else {
      out = await img
        .jpeg({
          quality: 90,
          mozjpeg: true,
        })
        .toBuffer();
    }
  } catch (err) {
    console.error(`FAIL ${path.relative(root, filePath)}: ${err.message}`);
    return { ok: false, before, after: before, skipped: String(err.message) };
  }

  if (out.length >= before) {
    return { ok: true, before, after: before, skipped: 'no smaller' };
  }

  if (!dryRun) {
    await fs.promises.writeFile(filePath, out);
  }

  return { ok: true, before, after: out.length };
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MiB`;
}

async function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error('Directory not found:', TARGET_DIR);
    process.exit(1);
  }

  if (dryRun) console.log('DRY RUN (no writes)\n');

  let totalBefore = 0;
  let totalAfter = 0;
  let written = 0;
  let noSmaller = 0;
  let failed = 0;

  for await (const filePath of walkFiles(TARGET_DIR)) {
    const r = await compressOne(filePath);
    if (!r) continue;

    const rel = path.relative(root, filePath);
    if (!r.ok) {
      failed++;
      continue;
    }

    totalBefore += r.before;
    if (r.skipped) {
      noSmaller++;
      totalAfter += r.before;
      if (r.skipped !== 'no smaller') {
        console.log(`skip ${rel} (${r.skipped})`);
      }
    } else {
      written++;
      totalAfter += r.after;
      const pct = (((r.before - r.after) / r.before) * 100).toFixed(1);
      console.log(`${rel}: ${fmtBytes(r.before)} → ${fmtBytes(r.after)} (−${pct}%)`);
    }
  }

  const touched = written + noSmaller;
  console.log('\n---');
  console.log(`images processed: ${touched}, rewritten (smaller): ${written}, skipped (already optimal): ${noSmaller}`);
  if (failed) console.log(`failed: ${failed}`);
  console.log(`total: ${fmtBytes(totalBefore)} → ${fmtBytes(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(
      `saved: ${fmtBytes(totalBefore - totalAfter)} (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
