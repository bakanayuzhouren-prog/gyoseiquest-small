/**
 * sync済み questions.js / learn.js から data/knowledge/ に構造化MDを生成する。
 * Regenerate: npm run export:knowledge-md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { SUBJECTS } from '../src/questions.js';
import {
  LEARN_CONTENT,
  LEARN_DEEPDIVE,
  LEARN_F_EXPLAIN,
  LEARN_STATUTE_REFS,
  LEARN_SOURCE,
  LEARN_LINKS,
} from '../src/learn.js';
import {
  validateKnowledgeText,
  formatValidationBlockquotes,
  extractStatuteTags,
  limbLabel,
} from './lib/knowledgeValidationRules.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'knowledge');
const REPORTS = path.join(OUT, '_reports');

/** @param {unknown} v */
function escYaml(v) {
  if (v == null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object') return JSON.stringify(v);
  const s = String(v);
  if (/[:#\[\]{}&*!|>'"%@`]/.test(s) || s.includes('\n')) return JSON.stringify(s);
  return s;
}

/** @param {string} s */
function stripFlow(s) {
  return (s || '').replace(/\r\n/g, '\n').trim();
}

/** @param {string} content */
function hashContent(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex').slice(0, 16);
}

/**
 * @param {string} filePath
 * @param {string} content
 */
function writeIfChanged(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath)) {
    const prev = fs.readFileSync(filePath, 'utf8');
    if (prev === content) return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

/**
 * @param {Record<string, unknown>} fm
 * @param {string} body
 */
function buildMd(fm, body) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    lines.push(`${k}: ${escYaml(v)}`);
  }
  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
}

/** @param {unknown} answer @param {number} choiceCount */
function getCorrectIndices(answer, choiceCount) {
  if (!Array.isArray(answer) || answer.length === 0) return [];
  if (typeof answer[0] === 'string') return [];
  return answer.filter((i) => typeof i === 'number' && i >= 0 && i < choiceCount);
}

/** @param {Record<string, unknown>} q */
function quizBlob(q) {
  const parts = [];
  if (typeof q.text === 'string') parts.push(q.text);
  if (typeof q.explain === 'string') parts.push(q.explain);
  if (typeof q.memo === 'string') parts.push(q.memo);
  if (typeof q.modelAnswer === 'string') parts.push(q.modelAnswer);
  if (Array.isArray(q.choices)) parts.push(...q.choices.filter((x) => typeof x === 'string'));
  if (Array.isArray(q.choiceExplanations)) parts.push(...q.choiceExplanations.filter(Boolean));
  if (Array.isArray(q.choiceDeepDive)) parts.push(...q.choiceDeepDive.filter(Boolean));
  if (Array.isArray(q.choiceStatuteRefs)) parts.push(...q.choiceStatuteRefs.filter(Boolean));
  if (Array.isArray(q.choiceRelatedStatutes)) parts.push(...q.choiceRelatedStatutes.filter(Boolean));
  return parts.join('\n\n');
}

/** @param {string} subject @param {string} category @param {number} qi @param {Record<string, unknown>} q */
function exportQuizQuestion(subject, category, qi, q) {
  const qNum = qi + 1;
  const id = `quiz/${subject}/${category}/q${String(qNum).padStart(3, '0')}`;
  const relDir = path.join('quiz', subject, category);
  const fileName = `q${String(qNum).padStart(3, '0')}.md`;
  const filePath = path.join(OUT, relDir, fileName);

  const choices = Array.isArray(q.choices) ? q.choices.map(String) : [];
  const correctIndices = getCorrectIndices(q.answer, choices.length);
  const correctLabels = correctIndices.map(limbLabel);
  const isReorder = Boolean(q.isReorder);
  const hasSlots = Array.isArray(q.slots) && q.slots.length > 0;
  const isDescriptive = Boolean(q.modelAnswer) && (!Array.isArray(q.answer) || q.answer.length === 0);
  const isBonus = Boolean(q.isBonus);

  const blob = quizBlob(q);
  const warnings = validateKnowledgeText(blob, {
    type: 'quiz',
    answer: q.answer,
    choices,
    isReorder,
    isDescriptive,
    hasSlots,
  });
  const validationStatus = warnings.length ? 'needs_review' : 'ok';
  const tags = extractStatuteTags(blob);

  const titleSuffix = stripFlow(String(q.text || '')).slice(0, 40).replace(/\n/g, ' ');
  const sections = [];

  if (warnings.length) {
    sections.push(formatValidationBlockquotes(warnings).trim());
  }

  sections.push(`# ${category} 第${qNum}問${titleSuffix ? ` — ${titleSuffix}` : ''}`);

  if (q.text) {
    sections.push('## 問題文\n\n' + stripFlow(String(q.text)));
  }

  if (isDescriptive && q.modelAnswer) {
    sections.push('## 模範解答（K列）\n\n' + stripFlow(String(q.modelAnswer)));
  } else if (isReorder) {
    sections.push('## 並べ替え問題');
    if (choices.length) {
      const rows = choices.map((c, i) => `| ${i + 1} | ${stripFlow(c).replace(/\|/g, '\\|')} |`);
      sections.push('| 番号 | 肢 |\n|------|----|\n' + rows.join('\n'));
    }
    if (Array.isArray(q.answer) && q.answer.length) {
      const order = q.answer.map((idx, pos) => `${pos + 1}番目: 肢${Number(idx) + 1}（${limbLabel(Number(idx))}）`).join('\n');
      sections.push('## 正解順（L列）\n\n' + order);
    }
  } else if (hasSlots) {
    sections.push('## 穴埋め・語群問題');
    if (q.wordBank) sections.push('### 語群（R列）\n\n' + stripFlow(String(q.wordBank)));
    if (Array.isArray(q.slots)) {
      for (const slot of q.slots) {
        if (!slot || typeof slot !== 'object') continue;
        sections.push(`### 枠 ${slot.label || ''}\n\n${stripFlow(String(slot.options || ''))}`);
      }
    }
    if (Array.isArray(q.answer)) {
      sections.push('## 正解\n\n' + q.answer.map(String).join(' / '));
    }
  } else if (choices.length) {
    const rows = choices.map((c, i) => {
      const mark = correctIndices.includes(i) ? '○' : '×';
      const bonus = Array.isArray(q.choiceIsBonus) && q.choiceIsBonus[i] ? ' ※' : '';
      return `| ${limbLabel(i)} | ${mark} | ${stripFlow(c).replace(/\|/g, '\\|')}${bonus} |`;
    });
    sections.push('| 肢 | 正誤 | 内容 |\n|----|------|------|\n' + rows.join('\n'));
  }

  if (q.explain && stripFlow(String(q.explain))) {
    sections.push('## 解説（L列・全体）\n\n' + stripFlow(String(q.explain)));
  }

  if (Array.isArray(q.choiceExplanations)) {
    const parts = q.choiceExplanations
      .map((ex, i) => (ex && stripFlow(String(ex)) ? `### 肢${limbLabel(i)}\n\n${stripFlow(String(ex))}` : ''))
      .filter(Boolean);
    if (parts.length) sections.push('## 肢別解説（L列）\n\n' + parts.join('\n\n'));
  }

  if (Array.isArray(q.choiceStatuteRefs)) {
    const parts = q.choiceStatuteRefs
      .map((ref, i) => (ref && stripFlow(String(ref)) ? `### 肢${limbLabel(i)}\n\n${stripFlow(String(ref))}` : ''))
      .filter(Boolean);
    if (parts.length) sections.push('## 根拠条文（I列）\n\n' + parts.join('\n\n'));
  }

  if (Array.isArray(q.choiceRelatedStatutes)) {
    const parts = q.choiceRelatedStatutes
      .map((ref, i) => (ref && stripFlow(String(ref)) ? `### 肢${limbLabel(i)}\n\n${stripFlow(String(ref))}` : ''))
      .filter(Boolean);
    if (parts.length) sections.push('## 関連条文（J列）\n\n' + parts.join('\n\n'));
  }

  if (Array.isArray(q.choiceDeepDive)) {
    const parts = q.choiceDeepDive
      .map((dd, i) => (dd && stripFlow(String(dd)) ? `### 肢${limbLabel(i)}\n\n${stripFlow(String(dd))}` : ''))
      .filter(Boolean);
    if (parts.length) sections.push('## もっと深掘る（M列）\n\n' + parts.join('\n\n'));
  }

  if (q.memo && stripFlow(String(q.memo))) {
    sections.push('## メモ（M列・問題行）\n\n' + stripFlow(String(q.memo)));
  }

  if (Array.isArray(q.chunks) && q.chunks.length) {
    const parts = q.chunks
      .filter((ch) => ch && typeof ch === 'object')
      .map((ch) => `### ${ch.title || 'チャンク'}\n\n${stripFlow(String(ch.explain || ''))}`);
    if (parts.length) sections.push('## チャンク（U/V列等）\n\n' + parts.join('\n\n'));
  }

  const fm = {
    id,
    type: isDescriptive ? 'descriptive' : isReorder ? 'reorder' : hasSlots ? 'slot' : 'quiz',
    subject,
    category,
    questionIndex: qNum,
    correctIndices,
    correctLabels,
    isBonus,
    isReorder,
    tags,
    validationStatus,
    validationWarnings: warnings.map((w) => w.ruleId),
    sources: [{ sync: 'questions.js', columns: ['H', 'K', 'M', 'I', 'J', 'L'] }],
  };

  const md = buildMd(fm, sections.join('\n\n'));
  const written = writeIfChanged(filePath, md);
  return {
    written,
    file: path.join('data', 'knowledge', relDir, fileName).replace(/\\/g, '/'),
    warnings,
    id,
  };
}

/** @param {string} text */
function isLearnSlotId(text) {
  return /^[a-z]{2}\d{4}$/i.test((text || '').trim());
}

/** @param {string} subject @param {number} i */
function exportLearnCard(subject, i) {
  const aNum = i + 1;
  const id = `learn/${subject}/a${String(aNum).padStart(3, '0')}`;
  const relDir = path.join('learn', subject);
  const fileName = `a${String(aNum).padStart(3, '0')}.md`;
  const filePath = path.join(OUT, relDir, fileName);

  const content = LEARN_CONTENT[subject]?.[i] ?? '';
  const deepdive = LEARN_DEEPDIVE[subject]?.[i] ?? '';
  const fExplain = LEARN_F_EXPLAIN[subject]?.[i] ?? '';
  const statuteRef = LEARN_STATUTE_REFS[subject]?.[i] ?? '';
  const source = LEARN_SOURCE[subject]?.[i] ?? subject;

  if (isLearnSlotId(content) && !deepdive?.trim()) return null;

  const blob = [content, deepdive, fExplain, statuteRef].filter(Boolean).join('\n\n');
  const warnings = validateKnowledgeText(blob, { type: 'learn' });
  const validationStatus = warnings.length ? 'needs_review' : 'ok';
  const tags = extractStatuteTags(blob);

  const linkKeys = Object.entries(LEARN_LINKS || {})
    .filter(([, targets]) => Array.isArray(targets) && targets.some((t) => t.subject === subject && t.index === i))
    .map(([key]) => key);

  const sections = [];
  if (warnings.length) sections.push(formatValidationBlockquotes(warnings).trim());

  const titleSuffix = stripFlow(content).slice(0, 50).replace(/\n/g, ' ');
  sections.push(`# ${subject} 第${aNum}問${titleSuffix ? ` — ${titleSuffix}` : ''}`);

  if (content && !isLearnSlotId(content)) {
    sections.push('## 学習項目（A列）\n\n' + stripFlow(content));
  } else if (isLearnSlotId(content)) {
    sections.push(`## スロットID\n\n\`${content}\``);
  }

  if (deepdive && stripFlow(deepdive)) {
    sections.push('## もっと深掘る（B列）\n\n' + stripFlow(deepdive));
  }

  if (fExplain && stripFlow(fExplain)) {
    sections.push('## 解説（F列）\n\n' + stripFlow(fExplain));
  }

  if (statuteRef && stripFlow(statuteRef)) {
    sections.push('## 根拠条文（I列）\n\n' + stripFlow(statuteRef));
  }

  const fm = {
    id,
    type: 'learn',
    subject,
    learnIndex: aNum,
    learnSource: source,
    learnLinks: linkKeys,
    tags,
    validationStatus,
    validationWarnings: warnings.map((w) => w.ruleId),
    sources: [{ sync: 'learn.js', columns: ['A', 'B', 'F', 'I', 'M'] }],
  };

  const md = buildMd(fm, sections.join('\n\n'));
  const written = writeIfChanged(filePath, md);
  return {
    written,
    file: path.join('data', 'knowledge', relDir, fileName).replace(/\\/g, '/'),
    warnings,
    id,
  };
}

function main() {
  const stats = { quiz: 0, learn: 0, written: 0, skipped: 0, warnings: 0 };
  /** @type {{ file: string; ruleId: string; message: string; severity: string }[]} */
  const report = [];

  for (const [subject, categories] of Object.entries(SUBJECTS || {})) {
    if (!categories || typeof categories !== 'object') continue;
    for (const [category, questions] of Object.entries(categories)) {
      if (!Array.isArray(questions)) continue;
      for (let qi = 0; qi < questions.length; qi++) {
        const q = questions[qi];
        if (!q || typeof q !== 'object') continue;
        const res = exportQuizQuestion(subject, category, qi, q);
        stats.quiz++;
        if (res.written) stats.written++;
        else stats.skipped++;
        for (const w of res.warnings) {
          stats.warnings++;
          report.push({ file: res.file, ruleId: w.ruleId, message: w.message, severity: w.severity });
        }
      }
    }
  }

  for (const subject of Object.keys(LEARN_CONTENT || {})) {
    const items = LEARN_CONTENT[subject];
    if (!Array.isArray(items)) continue;
    for (let i = 0; i < items.length; i++) {
      const res = exportLearnCard(subject, i);
      if (!res) continue;
      stats.learn++;
      if (res.written) stats.written++;
      else stats.skipped++;
      for (const w of res.warnings) {
        stats.warnings++;
        report.push({ file: res.file, ruleId: w.ruleId, message: w.message, severity: w.severity });
      }
    }
  }

  fs.mkdirSync(REPORTS, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const reportPath = path.join(REPORTS, `validation-${date}.json`);
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), stats, warnings: report }, null, 2),
    'utf8'
  );

  console.log(
    `Knowledge MD: quiz=${stats.quiz} learn=${stats.learn} written=${stats.written} unchanged=${stats.skipped} warnings=${stats.warnings}`
  );
  console.log(`Report → ${path.relative(ROOT, reportPath)}`);
}

main();
