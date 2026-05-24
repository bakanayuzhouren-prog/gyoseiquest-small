// content/textbook/teitouken 配下の .md を連結し、src/content/teitoukenTextbookMarkdown.ts を生成する（辞書順）。
// archive/ は走査しないが、PDF シート1の master 原稿（sheet1-pdf-extract-original.md）のみ連結に明示的に含める。
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../content/textbook/teitouken');
const OUT = path.join(__dirname, '../src/content/teitoukenTextbookMarkdown.ts');

function collectMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'archive' || e.name.startsWith('.') || e.name === 'node_modules') continue;
      out.push(...collectMdFiles(full));
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out.sort();
}

function main() {
  const files = collectMdFiles(ROOT);
  const sheet1Archive = path.join(ROOT, 'archive/sheet1-pdf-extract-original.md');
  if (fs.existsSync(sheet1Archive)) files.push(sheet1Archive);
  files.sort();
  const parts = files.map((f) => fs.readFileSync(f, 'utf8').trim()).filter(Boolean);
  const body = parts.join('\n\n---\n\n');
  const banner =
    '// Auto-generated from content/textbook/teitouken (*.md)\n' +
    '// Regenerate: npm run bundle:teitouken-textbook\n';
  const ts = `${banner}export const TEITOUKEN_TEXTBOOK_MARKDOWN = ${JSON.stringify(body)};\n`;
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, ts, 'utf8');
  console.log(`bundleTeitoukenTextbook: ${files.length} file(s) → ${OUT} (${body.length} chars)`);
}

main();
