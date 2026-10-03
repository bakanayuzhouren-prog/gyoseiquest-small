/**
 * questions.js / learnExports / ボーナスを、科目ごとのファイルに分ける。
 * アプリは開いた科目だけ dynamic import する。正本の questions.js は同期用に残す。
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'generated', 'subjects');

function slug(name) {
  return `s${createHash('sha1').update(String(name)).digest('hex').slice(0, 12)}`;
}

function writeJsDefault(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `export default ${JSON.stringify(value)};\n`);
}

function rmDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function mergeFieldQuestions(base, extra) {
  const merged = { ...base };
  Object.keys(extra || {}).forEach((key) => {
    merged[key] = [...(merged[key] || []), ...(extra[key] || [])];
  });
  return merged;
}

function toHalfWidthDigits(value) {
  return String(value).replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
}

function normalizeLearnLinkKey(value) {
  if (value == null) return '';
  const normalized = toHalfWidthDigits(String(value).normalize('NFKC')).replace(/＃/g, '#').trim();
  const match = normalized.match(/#\s*([0-9]{1,6})/);
  return match ? `#${match[1].padStart(3, '0')}` : '';
}

function extractLearnLinkKey(text) {
  if (typeof text !== 'string') return '';
  const matches = [...text.matchAll(/[＃#]\s*([0-9０-９]{1,6})/g)];
  if (matches.length === 0) return '';
  return normalizeLearnLinkKey(matches[matches.length - 1][0]);
}

function questionLearnKeys(question) {
  const keys = [];
  if (!question || typeof question !== 'object') return keys;
  if (typeof question.learnLinkKey === 'string') keys.push(question.learnLinkKey);
  if (typeof question.text === 'string') keys.push(extractLearnLinkKey(question.text));
  if (Array.isArray(question.choiceLearnLinkKeys)) {
    for (const key of question.choiceLearnLinkKeys) {
      if (typeof key === 'string') keys.push(key);
    }
  }
  if (Array.isArray(question.choices)) {
    for (const choice of question.choices) keys.push(extractLearnLinkKey(choice));
  }
  return [...new Set(keys.map(normalizeLearnLinkKey).filter(Boolean))];
}

function compact(value, limit = 90) {
  const s = String(value || '').replace(/\s+/g, ' ').trim();
  return s.length > limit ? `${s.slice(0, limit)}...` : s;
}

function choiceLabel(choice, index) {
  const label = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク'][index] ?? String(index + 1);
  const body = (choice || '').trim();
  return body ? `${label}. ${body}` : label;
}

function relatedPayload(linkKey, quizSubject, quizField, question) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const choiceLinkKeys = Array.isArray(question.choiceLearnLinkKeys) ? question.choiceLearnLinkKeys : [];
  const choiceRelatedStatutes = Array.isArray(question.choiceRelatedStatutes) ? question.choiceRelatedStatutes : [];
  const choiceStatuteRefs = Array.isArray(question.choiceStatuteRefs) ? question.choiceStatuteRefs : [];
  const questionLinkKey = typeof question.learnLinkKey === 'string' ? question.learnLinkKey : '';
  let choiceIndices = choiceLinkKeys.map((key, idx) => (key === linkKey ? idx : -1)).filter((idx) => idx >= 0);
  if (choiceIndices.length === 0 && questionLinkKey === linkKey) {
    choiceIndices = choices
      .map((_, idx) => ((choiceRelatedStatutes[idx] || choiceStatuteRefs[idx] || '').trim() ? idx : -1))
      .filter((idx) => idx >= 0);
  }
  if (choiceIndices.length === 0) return null;
  const segments = choiceIndices
    .map((idx) => {
      const body = (choiceRelatedStatutes[idx] || choiceStatuteRefs[idx] || '').trim();
      if (!body) return '';
      const label = choiceLabel(choices[idx] || '', idx);
      return choiceIndices.length === 1 ? body : `【${label}】\n${body}`;
    })
    .filter(Boolean);
  if (segments.length === 0) return null;
  const firstIdx = choiceIndices[0] ?? -1;
  return {
    content: segments.join('\n\n'),
    choiceLabel: firstIdx >= 0 && choiceIndices.length === 1 ? choiceLabel(choices[firstIdx] || '', firstIdx) : '',
    quizSubject,
    quizField,
  };
}

function linksForSubject(allLinks, subject) {
  const out = {};
  for (const [key, targets] of Object.entries(allLinks || {})) {
    if (!Array.isArray(targets)) continue;
    if (targets.some((t) => t && (t.subject === subject || t.source === subject))) out[key] = targets;
  }
  return out;
}

function emitLoaders(constName, pairs, importPrefix) {
  const lines = pairs.map(
    ([key, fileSlug]) => `  ${JSON.stringify(key)}: () => import(${JSON.stringify(`${importPrefix}${fileSlug}.js`)}),`,
  );
  return `export const ${constName} = {\n${lines.join('\n')}\n};\n`;
}

const { SUBJECTS, RESOURCES, STATUTES } = await import('../src/questions.js');
const { BONUS_QUESTIONS } = await import('../src/bonus_questions.js');
const { TAC_KISO_QUIZ_QUESTIONS } = await import('../src/tac_kiso_quiz_questions.js');
const learn = await import('../src/learnExports.js');

rmDir(outDir);
fs.mkdirSync(outDir, { recursive: true });

const quizPairs = [];
const manifest = {};
const mainCounts = {};
const fieldOwner = {};
const groups = {};
const related = {};

for (const [subject, mainGroup] of Object.entries(SUBJECTS || {})) {
  const main = mainGroup && typeof mainGroup === 'object' ? mainGroup : {};
  const tac = TAC_KISO_QUIZ_QUESTIONS?.[subject] || {};
  const bonus = BONUS_QUESTIONS?.[subject] || {};
  const merged = mergeFieldQuestions(mergeFieldQuestions(main, tac), bonus);
  const fileSlug = slug(subject);
  writeJsDefault(path.join(outDir, 'quiz', `${fileSlug}.js`), { main, merged });
  quizPairs.push([subject, fileSlug]);
  manifest[subject] = Object.keys(merged);
  mainCounts[subject] = {};
  for (const [field, list] of Object.entries(main)) {
    mainCounts[subject][field] = Array.isArray(list) ? list.length : 0;
    if (fieldOwner[field] == null) fieldOwner[field] = subject;
  }
  for (const field of Object.keys(merged)) {
    if (fieldOwner[field] == null) fieldOwner[field] = subject;
  }
  for (const [field, list] of Object.entries(main)) {
    if (!Array.isArray(list)) continue;
    list.forEach((question, index) => {
      for (const key of questionLearnKeys(question)) {
        if (!groups[key]) groups[key] = [];
        groups[key].push({
          subject,
          field,
          index,
          questionPreview: compact(question?.text),
        });
      }
      const questionLinkKey = typeof question?.learnLinkKey === 'string' ? question.learnLinkKey : '';
      const choiceLinkKeys = Array.isArray(question?.choiceLearnLinkKeys) ? question.choiceLearnLinkKeys : [];
      const keys = new Set(choiceLinkKeys.filter(Boolean));
      if (questionLinkKey) keys.add(questionLinkKey);
      for (const linkKey of keys) {
        if (related[linkKey]) continue;
        const payload = relatedPayload(linkKey, subject, field, question);
        if (payload) related[linkKey] = payload;
      }
    });
  }
  const bytes = fs.statSync(path.join(outDir, 'quiz', `${fileSlug}.js`)).size;
  console.log(`quiz ${subject} ${Math.round(bytes / 1024)}KB`);
}

const learnPairs = [];
const learnKeys = new Set([
  ...Object.keys(learn.LEARN_CONTENT || {}),
  ...Object.keys(learn.LEARN_DEEPDIVE || {}),
  ...Object.keys(learn.LEARN_SOURCE || {}),
]);
for (const subject of learnKeys) {
  const pack = {
    content: learn.LEARN_CONTENT?.[subject] || [],
    deepdive: learn.LEARN_DEEPDIVE?.[subject] || [],
    fExplain: learn.LEARN_F_EXPLAIN?.[subject] || [],
    statuteRefs: learn.LEARN_STATUTE_REFS?.[subject] || [],
    source: learn.LEARN_SOURCE?.[subject] || [],
    links: linksForSubject(learn.LEARN_LINKS, subject),
  };
  const empty =
    pack.content.length === 0 &&
    pack.deepdive.length === 0 &&
    pack.fExplain.length === 0 &&
    pack.statuteRefs.length === 0 &&
    pack.source.length === 0 &&
    Object.keys(pack.links).length === 0;
  if (empty) continue;
  const fileSlug = slug(`learn:${subject}`);
  writeJsDefault(path.join(outDir, 'learn', `${fileSlug}.js`), pack);
  learnPairs.push([subject, fileSlug]);
  const bytes = fs.statSync(path.join(outDir, 'learn', `${fileSlug}.js`)).size;
  console.log(`learn ${subject} ${Math.round(bytes / 1024)}KB`);
}

const statutePairs = [];
for (const [bucket, rows] of Object.entries(STATUTES || {})) {
  const fileSlug = slug(`statute:${bucket}`);
  writeJsDefault(path.join(outDir, 'statutes', `${fileSlug}.js`), rows || []);
  statutePairs.push([bucket, fileSlug]);
  const bytes = fs.statSync(path.join(outDir, 'statutes', `${fileSlug}.js`)).size;
  console.log(`statute ${bucket} ${Math.round(bytes / 1024)}KB`);
}

fs.writeFileSync(
  path.join(outDir, 'resources.js'),
  `export const RESOURCES = ${JSON.stringify(RESOURCES || {})};\n`,
);
writeJsDefault(path.join(outDir, 'relatedStatutesByLink.js'), related);
writeJsDefault(path.join(outDir, 'quizLearnGroups.js'), groups);
fs.writeFileSync(
  path.join(outDir, 'quizManifest.ts'),
  `export const QUIZ_MANIFEST: Record<string, string[]> = ${JSON.stringify(manifest)};\nexport const QUIZ_MAIN_COUNTS: Record<string, Record<string, number>> = ${JSON.stringify(mainCounts)};\nexport const FIELD_OWNER: Record<string, string> = ${JSON.stringify(fieldOwner)};\n`,
);
fs.writeFileSync(path.join(outDir, 'quizLoaders.ts'), emitLoaders('QUIZ_LOADERS', quizPairs, './quiz/'));
fs.writeFileSync(path.join(outDir, 'learnLoaders.ts'), emitLoaders('LEARN_LOADERS', learnPairs, './learn/'));
fs.writeFileSync(path.join(outDir, 'statuteLoaders.ts'), emitLoaders('STATUTE_LOADERS', statutePairs, './statutes/'));

const relatedBytes = fs.statSync(path.join(outDir, 'relatedStatutesByLink.js')).size;
const groupBytes = fs.statSync(path.join(outDir, 'quizLearnGroups.js')).size;
console.log(`index related ${Math.round(relatedBytes / 1024)}KB groups ${Math.round(groupBytes / 1024)}KB`);
console.log(`quiz ${quizPairs.length} learn ${learnPairs.length} statutes ${statutePairs.length}`);
