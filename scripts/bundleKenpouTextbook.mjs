/**
 * content/textbook/kenpou/*.md を連結 → src/constitutionContent.ts
 *   npm run bundle:kenpou-textbook
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../content/textbook/kenpou');
const OUT = path.join(__dirname, '../src/constitutionContent.ts');

function collectMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_'))
    .map((e) => path.join(dir, e.name))
    .sort();
}

function main() {
  const files = collectMdFiles(ROOT);
  if (!files.length) {
    console.error('bundleKenpouTextbook: no .md files in', ROOT);
    process.exit(1);
  }
  const parts = files.map((f) => fs.readFileSync(f, 'utf8').trim()).filter(Boolean);
  const body = parts.join('\n\n');
  const banner =
    '// Auto-generated from content/textbook/kenpou/*.md\n' +
    '// Regenerate: npm run bundle:kenpou-textbook\n';
  const ts = `${banner}export const CONSTITUTION_MARKDOWN = ${JSON.stringify('\n' + body + '\n')};\n`;
  fs.writeFileSync(OUT, ts, 'utf8');
  console.log(`bundleKenpouTextbook: ${files.length} file(s) → ${OUT} (${body.length} chars)`);
  for (const f of files) console.log('  -', path.basename(f));
}

main();
