/**
 * Downloads の TAC1/TAC2 ZIP を app/textbook の模試フォルダへ展開する。
 * 画像ファイルだけをフラットにコピー（ZIP内の日本語フォルダ名は捨てる）。
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const DL = path.join(process.env.USERPROFILE || '', 'Downloads');
const IMAGE_RE = /\.(jpe?g|png|webp|heic)$/i;

const JOBS = [
  {
    zip: 'TAC1 問題-3-001.zip',
    dest: path.join(ROOT, 'app/textbook/模試元画像/TAC1'),
  },
  {
    zip: 'TAC1 解答-3-001.zip',
    dest: path.join(ROOT, 'app/textbook/模試解答/TAC1'),
  },
  {
    zip: 'TAC2問題-3-001.zip',
    dest: path.join(ROOT, 'app/textbook/模試元画像/TAC2'),
  },
  {
    zip: 'TAC2 解答-3-001.zip',
    dest: path.join(ROOT, 'app/textbook/模試解答/TAC2'),
  },
];

function listImagesRecursive(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listImagesRecursive(p, acc);
    else if (IMAGE_RE.test(e.name)) acc.push(p);
  }
  return acc;
}

function copyFlat(images, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let copied = 0;
  let skipped = 0;
  for (const src of images) {
    const name = path.basename(src);
    const out = path.join(dest, name);
    if (fs.existsSync(out)) {
      skipped++;
      continue;
    }
    fs.copyFileSync(src, out);
    copied++;
  }
  return { copied, skipped, total: images.length };
}

const stagingRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tac-moshi-'));
console.log('staging', stagingRoot);

try {
  for (const job of JOBS) {
    const zipPath = path.join(DL, job.zip);
    if (!fs.existsSync(zipPath)) {
      console.error('MISSING ZIP', zipPath);
      continue;
    }
    const stage = path.join(stagingRoot, path.basename(job.zip, '.zip'));
    fs.mkdirSync(stage, { recursive: true });
    console.log('\nExtracting', job.zip, '...');
    execFileSync('tar', ['-xf', zipPath, '-C', stage], {
      stdio: 'inherit',
      maxBuffer: 200 * 1024 * 1024,
    });
    const images = listImagesRecursive(stage).sort((a, b) =>
      path.basename(a).localeCompare(path.basename(b), 'ja'),
    );
    const result = copyFlat(images, job.dest);
    console.log('→', job.dest);
    console.log(
      `  images found=${result.total} copied=${result.copied} skippedExisting=${result.skipped}`,
    );
    console.log('  folder now has', fs.readdirSync(job.dest).filter((n) => IMAGE_RE.test(n)).length, 'images');
  }

  // tmp/tac1 に本人解答っぽい写真があれば 俺の解答用紙/TAC1 へ
  const tmpTac1 = path.join(ROOT, 'tmp/tac1');
  const answerSheetDest = path.join(ROOT, 'app/textbook/俺の解答用紙/TAC1');
  if (fs.existsSync(tmpTac1)) {
    const imgs = listImagesRecursive(tmpTac1);
    if (imgs.length) {
      const result = copyFlat(imgs, answerSheetDest);
      console.log('\nCopied tmp/tac1 → 俺の解答用紙/TAC1', result);
    }
  }
} finally {
  fs.rmSync(stagingRoot, { recursive: true, force: true });
}

console.log('\nDone.');
