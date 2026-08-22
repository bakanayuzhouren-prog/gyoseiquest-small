/**
 * 教科書モード用バンドル生成。
 *
 * - DB/ … 佐藤先生NOTE等の原典置き場（参考用。アプリへ全文転載しない）
 * - content/textbook/app/<科目>/ … 著作権配慮の再構成稿（出題形式・条文順）← アプリが読む
 *
 * 実行: npm run bundle:db-textbooks
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DB_ROOT = path.join(ROOT, 'DB');
const APP_ROOT = path.join(ROOT, 'content', 'textbook', 'app');
const MANIFEST_PATH = path.join(DB_ROOT, 'manifest.json');
const OUT_PATH = path.join(ROOT, 'src', 'content', 'dbTextbookBundles.ts');

function stripFrontmatter(raw) {
  const text = String(raw || '').replace(/^\uFEFF/, '');
  if (!text.startsWith('---')) return text.trim();
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text.trim();
  return text.slice(end + 4).replace(/^\r?\n/, '').trim();
}

function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function loadSubjectMarkdown(dirName) {
  const appDir = path.join(APP_ROOT, dirName);
  if (!fs.existsSync(appDir)) {
    throw new Error(
      `アプリ用稿がありません: content/textbook/app/${dirName}\n` +
        'DBは原典置き場です。再構成した .md を app 側に置いてから再実行してください。',
    );
  }
  const files = fs
    .readdirSync(appDir)
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'ja'));
  if (files.length === 0) {
    throw new Error(`No .md files in ${appDir}`);
  }
  const parts = files.map((name) => {
    const body = stripFrontmatter(fs.readFileSync(path.join(appDir, name), 'utf8'));
    return body;
  });
  return {
    files: files.map((name) => `content/textbook/app/${dirName}/${name}`),
    markdown: parts.join('\n\n---\n\n'),
  };
}

function main() {
  const manifest = readManifest();
  const subjects = Array.isArray(manifest.subjects) ? manifest.subjects : [];
  if (subjects.length === 0) throw new Error('DB/manifest.json has no subjects');

  /** @type {Record<string, any>} */
  const bundles = {};
  for (const subject of subjects) {
    const { files, markdown } = loadSubjectMarkdown(subject.dir);
    bundles[subject.slug] = {
      slug: subject.slug,
      title: subject.title,
      subtitle: subject.subtitle || '',
      description: subject.description || '',
      sourceFiles: files,
      markdown,
    };
  }

  const header =
    '// Auto-generated from content/textbook/app via scripts/bundleDbTextbooks.mjs\n' +
    '// Regenerate: npm run bundle:db-textbooks\n' +
    '// Do not edit by hand.\n\n';

  const body =
    'export type DbTextbookBundle = {\n' +
    '  slug: string;\n' +
    '  title: string;\n' +
    '  subtitle: string;\n' +
    '  description: string;\n' +
    '  sourceFiles: string[];\n' +
    '  markdown: string;\n' +
    '};\n\n' +
    `export const DB_TEXTBOOK_BUNDLES: Record<string, DbTextbookBundle> = ${JSON.stringify(bundles, null, 2)} as const;\n\n` +
    'export const DB_TEXTBOOK_SLUGS = Object.keys(DB_TEXTBOOK_BUNDLES);\n\n' +
    'export function getDbTextbookBundle(slug: string): DbTextbookBundle | null {\n' +
    '  return DB_TEXTBOOK_BUNDLES[slug] ?? null;\n' +
    '}\n';

  fs.writeFileSync(OUT_PATH, header + body, 'utf8');
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
  for (const subject of subjects) {
    const b = bundles[subject.slug];
    console.log(`- ${subject.slug}: ${b.sourceFiles.length} file(s), ${b.markdown.length} chars`);
  }
}

main();
