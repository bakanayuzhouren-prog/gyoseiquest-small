/**
 * learn knowledge MD から B列を抽出し、章ごとの下書きを生成
 *   node scripts/bundleKenpouTextbookFromLearn.mjs           # _drafts/ に出力
 *   node scripts/bundleKenpouTextbookFromLearn.mjs --stdout  # 確認用
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KENPOU_TEXTBOOK_CHAPTERS, learnMdPath } from './kenpouTextbookChapterMap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DRAFT_DIR = path.join(ROOT, 'content/textbook/kenpou/_drafts');

function extractBColumn(md) {
  const marker = '## もっと深掘る（B列）';
  const i = md.indexOf(marker);
  if (i < 0) return '';
  return md.slice(i + marker.length).trim();
}

function extractATitle(md) {
  const m = md.match(/## 学習項目（A列）\s*\n\n([^\n]+)/);
  return m ? m[1].trim() : '';
}

function compressFourComic(text) {
  return text
    .replace(/【(\d)コマ目[^】]*】/g, '\n**$1.** ')
    .replace(/(\d)：/g, '\n**$1.** ')
    .replace(/\n{3,}/g, '\n\n');
}

function draftForChapter(chapter) {
  const blocks = [];
  for (const n of chapter.learnIndices) {
    const fp = learnMdPath(ROOT, n);
    if (!fs.existsSync(fp)) {
      blocks.push(`<!-- learn Q${n}: file not found -->\n`);
      continue;
    }
    const md = fs.readFileSync(fp, 'utf8');
    const a = extractATitle(md);
    const b = compressFourComic(extractBColumn(md));
    blocks.push(`### learn 第${n}問${a ? ` — ${a.slice(0, 40)}` : ''}\n\n${b}\n`);
  }
  if (chapter.kenpouImages?.length) {
    blocks.push(
      chapter.kenpouImages.map((k) => `[[image:kenpou/${k}]]`).join('\n') + '\n',
    );
  }
  return blocks.join('\n---\n\n');
}

function main() {
  const stdout = process.argv.includes('--stdout');
  if (!stdout) {
    fs.mkdirSync(DRAFT_DIR, { recursive: true });
  }

  for (const ch of KENPOU_TEXTBOOK_CHAPTERS) {
    if (!ch.learnIndices.length) continue;
    const body = draftForChapter(ch);
    const outName = ch.file.replace('.md', '.learn-draft.md');
    if (stdout) {
      console.log(`\n===== ${ch.file} =====\n`);
      console.log(body.slice(0, 800) + (body.length > 800 ? '\n…' : ''));
    } else {
      const outPath = path.join(DRAFT_DIR, outName);
      fs.writeFileSync(outPath, body, 'utf8');
      console.log(`wrote ${outPath} (${body.length} chars)`);
    }
  }
}

main();
