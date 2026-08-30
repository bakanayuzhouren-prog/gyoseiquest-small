#!/usr/bin/env node
/**
 * Codex 用：未生成の教材画像プロンプトを列挙する（古いプロンプトから順）。
 *
 * 用法:
 *   node scripts/listPendingCodexImages.mjs
 *   node scripts/listPendingCodexImages.mjs --json
 *   node scripts/listPendingCodexImages.mjs --folder fufuku
 *   node scripts/listPendingCodexImages.mjs --all   # 生成済みも表示
 *
 * てらしぃ → Codex:「画像生成して」
 * → 本スクリプトの pending を上から（mtime 古い順）1枚ずつ生成。
 *
 * 触らない（修正前）:
 *   - ファイル名が codex-fix-* / codex-batch-*
 *   - 本文先頭が「廃止」
 *   - frontmatter retired / doNotGenerate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS = path.join(ROOT, 'skills');

/** 修正前・束ね指示・手順書。codex-gen-* は新規1枚プロンプトなので含める */
const EXCLUDE_BASENAMES = [/^codex-fix-/i, /^codex-batch-/i, /^codex-image-batch/i];

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

function shouldSkipBasename(basename) {
  return EXCLUDE_BASENAMES.some((re) => re.test(basename));
}

function isRetiredPrompt(content) {
  const head = content.slice(0, 1200);
  return (
    /^\s*#\s*廃止/m.test(head) ||
    /^\s*\*\*廃止/m.test(head) ||
    /^retired:\s*true\s*$/m.test(head) ||
    /^doNotGenerate:\s*true\s*$/m.test(head)
  );
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

function sortOldestFirst(a, b) {
  if (a.mtimeMs !== b.mtimeMs) return a.mtimeMs - b.mtimeMs;
  const byFile = a.promptFile.localeCompare(b.promptFile, 'ja');
  if (byFile !== 0) return byFile;
  return a.outputRel.localeCompare(b.outputRel, 'ja');
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const showAll = args.includes('--all');
  const folderIdx = args.indexOf('--folder');
  const folderArg = folderIdx >= 0 ? args[folderIdx + 1] : null;

  const files = walkMdFiles(SKILLS).filter((f) => !shouldSkipBasename(path.basename(f)));

  const entries = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (isRetiredPrompt(content)) continue;
    if (!hasGptPrompt(content)) continue;

    const outputs = extractOutputPaths(content);
    if (outputs.length === 0) continue;

    const relPrompt = path.relative(ROOT, file).replace(/\\/g, '/');
    if (!folderFilter(relPrompt, folderArg)) continue;

    const mtimeMs = fs.statSync(file).mtimeMs;

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
        mtimeMs,
        promptMtime: new Date(mtimeMs).toISOString(),
      });
    }
  }

  entries.sort(sortOldestFirst);

  const pending = entries.filter((e) => e.status === 'pending');
  const done = entries.filter((e) => e.status === 'done');

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          scannedAt: new Date().toISOString(),
          sort: 'oldest-prompt-first',
          skip: ['codex-fix-*', 'codex-batch-*', '廃止 / retired / doNotGenerate'],
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

  console.log('=== Codex 教材画像：未生成プロンプト（古い順） ===\n');
  console.log(`pending: ${pending.length} 件`);
  if (showAll) console.log(`done: ${done.length} 件`);
  console.log('除外: codex-fix-* / codex-batch-* / 廃止');
  console.log(`手順: skills/gyosei-image-style/prompts/CODEX-IMAGE-BATCH.md\n`);

  if (pending.length === 0) {
    console.log('（未生成なし。すべて PNG あり）');
    return;
  }

  pending.forEach((e, i) => {
    console.log(`[${i + 1}] [PENDING] ${e.outputRel}`);
    console.log(`  prompt: ${e.promptFile}`);
    console.log(`  mtime: ${e.promptMtime}`);
    if (e.title) console.log(`  title: ${e.title}`);
    console.log('');
  });

  console.log('--- Codex ---');
  console.log('各枚の前に PRE-GENERATE-CHECK.md。おかしい点があればその枚は生成しない。');
  console.log('上から順（古いプロンプトから）チェックOKだけ1枚ずつ生成。');
  console.log('codex-fix-* と「廃止」ファイルは触るな。アプリ埋め込みは Cursor へ。');
}

main();
