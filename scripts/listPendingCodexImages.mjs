#!/usr/bin/env node
/**
 * Codex 用：未生成の教材画像プロンプトを列挙する。
 *
 * 用法:
 *   node scripts/listPendingCodexImages.mjs
 *   node scripts/listPendingCodexImages.mjs --json
 *   node scripts/listPendingCodexImages.mjs --folder fufuku
 *   node scripts/listPendingCodexImages.mjs --all   # 生成済みも表示
 *
 * てらしぃ → Codex:「画像生成していないコーデックス用プロンプトを探して、画像生成して」
 * → Codex は本スクリプト → pending 一覧 → 各 codex-*.md の GPT Image プロンプトで1枚ずつ生成
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS = path.join(ROOT, 'skills');

const EXCLUDE_BASENAMES = [
  /^codex-fix-/i,
  /^codex-batch-/i,
  /^codex-gen-/i,
];

/** バッチ用プレースホルダ（個別 codex ファイルを使う） */
const PLACEHOLDER = /\{[^}]+\}/;

const OUTPUT_PATTERNS = [
  /(?:^|\n)\s*[-*]?\s*(?:保存先|保存)(?:（[^）\n]+）)?[:：]\s*`?(assets\/images\/[^\s`|\n]+)`?/gim,
  /(?:^|\n)\s*[-*]?\s*コマ\d+[:：]\s*`?(assets\/images\/[^\s`|\n]+)`?/gim,
  /\|\s*保存\s*\|\s*`?(assets\/images\/[^\s`|\n]+)`?/gim,
];

function walkMdFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkMdFiles(full, acc);
    } else if (ent.isFile() && /^codex-.*\.md$/i.test(ent.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function shouldSkipFile(basename) {
  return EXCLUDE_BASENAMES.some((re) => re.test(basename));
}

function hasGptPrompt(content) {
  return /GPT Image プロンプト|```text\s*\nCreate a NEW/i.test(content);
}

function extractOutputPaths(content) {
  const found = new Set();
  for (const re of OUTPUT_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      let p = m[1].trim().replace(/[）).,、]+$/u, '');
      if (PLACEHOLDER.test(p)) continue;
      if (!p.endsWith('.png') && !p.endsWith('.jpg') && !p.endsWith('.webp')) {
        if (!p.includes('.')) p += '.png';
      }
      found.add(p.replace(/\//g, path.sep));
    }
  }
  return [...found];
}

function extractTitle(content) {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/^Codex用\s*[—\-–]\s*/i, '').trim();
  return '';
}

function folderFilter(relPrompt, folderArg) {
  if (!folderArg) return true;
  const norm = folderArg.replace(/\\/g, '/').toLowerCase();
  return relPrompt.toLowerCase().includes(norm);
}

function sortEntries(a, b) {
  const numA = a.promptBasename.match(/(\d+)/);
  const numB = b.promptBasename.match(/(\d+)/);
  const dirA = a.promptFile.split('/')[0];
  const dirB = b.promptFile.split('/')[0];
  if (dirA === dirB) {
    if (numA && numB) return Number(numA[1]) - Number(numB[1]);
  }
  return a.promptFile.localeCompare(b.promptFile, 'ja');
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const showAll = args.includes('--all');
  const folderIdx = args.indexOf('--folder');
  const folderArg = folderIdx >= 0 ? args[folderIdx + 1] : null;

  const files = walkMdFiles(SKILLS)
    .filter((f) => !shouldSkipFile(path.basename(f)))
    .sort();

  const entries = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (!hasGptPrompt(content)) continue;

    const outputs = extractOutputPaths(content);
    if (outputs.length === 0) continue;

    const relPrompt = path.relative(ROOT, file).replace(/\\/g, '/');
    if (!folderFilter(relPrompt, folderArg)) continue;

    for (const outRel of outputs) {
      const absOut = path.join(ROOT, outRel);
      const exists = fs.existsSync(absOut);
      if (!showAll && exists) continue;

      entries.push({
        promptFile: relPrompt,
        promptBasename: path.basename(file),
        title: extractTitle(content),
        outputRel: outRel.replace(/\\/g, '/'),
        outputExists: exists,
        status: exists ? 'done' : 'pending',
      });
    }
  }

  entries.sort(sortEntries);

  const pending = entries.filter((e) => e.status === 'pending');
  const done = entries.filter((e) => e.status === 'done');

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          scannedAt: new Date().toISOString(),
          pendingCount: pending.length,
          doneCount: showAll ? done.length : undefined,
          pending,
          done: showAll ? done : undefined,
          codexHandoff: 'skills/gyosei-image-style/prompts/CODEX-IMAGE-BATCH.md',
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log('=== Codex 教材画像：未生成プロンプト ===\n');
  console.log(`pending: ${pending.length} 件`);
  if (showAll) console.log(`done: ${done.length} 件`);
  console.log(`手順: skills/gyosei-image-style/prompts/CODEX-IMAGE-BATCH.md\n`);

  if (pending.length === 0) {
    console.log('（未生成なし。すべて PNG あり）');
    return;
  }

  for (const e of pending) {
    console.log(`[PENDING] ${e.outputRel}`);
    console.log(`  prompt: ${e.promptFile}`);
    if (e.title) console.log(`  title: ${e.title}`);
    console.log('');
  }

  console.log('--- Codex への指示例 ---');
  console.log(
    '上記 pending を promptFile の順に開き、各ファイルの「GPT Image プロンプト」を1枚ずつ生成。',
  );
  console.log('保存先は outputRel 通り。アプリ埋め込みは Cursor へ。');
}

main();
