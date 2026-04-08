/**
 * assets/ 配下のラスタ画像を一括で軽量化する。
 * - 縦横を 50% にリサイズ（画素数は約 1/4）
 * - PNG: compressionLevel 9 / effort
 * - JPEG: quality 78（mozjpeg）
 * - WebP: quality 75
 *
 * 実行前に git commit 推奨（上書きのみ・バックアップは作らない）。
 *
 *   node scripts/downscaleAppAssets.mjs
 *   node scripts/downscaleAppAssets.mjs --dry-run
 *   node scripts/downscaleAppAssets.mjs --scale=0.5   （既定 0.5）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const ASSETS_DIR = path.join(root, 'assets');

const dryRun = process.argv.includes('--dry-run');
const scaleArg = process.argv.find((a) => a.startsWith('--scale='));
const SCALE = scaleArg ? Math.min(1, Math.max(0.1, parseFloat(scaleArg.split('=')[1]) || 0.5)) : 0.5;

const EXT_OK = new Set(['.png', '.jpg', '.jpeg', '.webp']);

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
 */
async function processOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXT_OK.has(ext)) return null;

  const buf = await fs.promises.readFile(filePath);
  const before = buf.length;

  let meta;
  try {
    meta = await sharp(buf, { failOn: 'none', animated: false }).metadata();
  } catch (err) {
    console.error(`SKIP meta ${path.relative(root, filePath)}: ${err.message}`);
    return null;
  }

  const w = meta.width || 0;
  const h = meta.height || 0;
  if (w < 2 || h < 2) return null;

  const nw = Math.max(1, Math.round(w * SCALE));
  const nh = Math.max(1, Math.round(h * SCALE));
  if (nw === w && nh === h && ext !== '.png' && ext !== '.webp') {
    // 1px画像などはスキップ扱い
  }

  let pipeline = sharp(buf, { failOn: 'none', animated: false }).resize(nw, nh, {
    fit: 'fill',
    kernel: sharp.kernel.lanczos3,
  });

  let out;
  try {
    if (ext === '.png') {
      out = await pipeline
        .png({
          compressionLevel: 9,
          effort: 10,
          adaptiveFiltering: true,
        })
        .toBuffer();
    } else if (ext === '.webp') {
      out = await pipeline.webp({ quality: 75, effort: 6 }).toBuffer();
    } else {
      out = await pipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
    }
  } catch (err) {
    console.error(`FAIL ${path.relative(root, filePath)}: ${err.message}`);
    return { ok: false, before, after: before, rel: path.relative(root, filePath) };
  }

  const after = out.length;
  if (!dryRun) {
    await fs.promises.writeFile(filePath, out);
  }

  return { ok: true, before, after, rel: path.relative(root, filePath), w, h, nw, nh };
}

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('assets/ がありません');
    process.exit(1);
  }

  console.log(`downscaleAppAssets: scale=${SCALE} dryRun=${dryRun} dir=${ASSETS_DIR}`);

  let totalBefore = 0;
  let totalAfter = 0;
  let n = 0;
  let skipped = 0;

  for await (const filePath of walkFiles(ASSETS_DIR)) {
    const r = await processOne(filePath);
    if (!r) {
      skipped++;
      continue;
    }
    totalBefore += r.before;
    totalAfter += r.after;
    n++;
    if (n % 25 === 0) {
      console.log(`  … ${n} files`);
    }
  }

  console.log(
    `\n完了: ${n} ファイル${dryRun ? '（dry-run・未書き込み）' : '（上書き済み）'}  スキップ相当 ${skipped} パス`
  );
  console.log(
    `合計サイズ: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB（推定 ${dryRun ? 'dry出力' : '実測'}）`
  );

  if (dryRun && n === 0) {
    console.log('ヒント: 画像が無いか、すべてスキップされました。');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
