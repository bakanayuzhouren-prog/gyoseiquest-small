import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const ocrId = process.argv[2] || '合格１-folder';
const outSlug = process.argv[3] || 'goukaku-kakumei-moshi-2026-07-05';
const ocrDir = path.join(ROOT, 'tmp', 'moshi-ocr', ocrId);
const importPath = path.join(ocrDir, 'moshi-import.json');
const outPath = path.join(ROOT, 'data', 'moshi', `${outSlug}-folder-ocr.json`);

if (!fs.existsSync(importPath)) {
  console.error(`OCR import not found: ${path.relative(ROOT, importPath)}`);
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(importPath, 'utf8'));
const answerFiles = fs
  .readdirSync(ocrDir)
  .filter((name) => /^answers-\d+\.txt$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'ja'));

function compact(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function answerCandidatesFromText(text) {
  const lines = String(text || '').split(/\r?\n/);
  const candidates = [];
  lines.forEach((line, index) => {
    const normalized = compact(line);
    if (!normalized) return;
    const explicit = normalized.match(/正\s*解\s*(?:は|=|：|:)?\s*([1-5１-５])/);
    if (explicit) {
      candidates.push({
        line: index + 1,
        type: 'explicit-answer',
        value: explicit[1].replace(/[１-５]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)),
        text: normalized.slice(0, 180),
      });
      return;
    }
    if (/正\s*解|正解|妥当|誤り|正しい|解答|答え/.test(normalized)) {
      candidates.push({
        line: index + 1,
        type: 'status-line',
        value: null,
        text: normalized.slice(0, 180),
      });
    }
  });
  return candidates;
}

function questionIdsFromText(text) {
  const ids = new Set();
  for (const match of String(text || '').matchAll(/(?:問|問題)\s*([0-9０-９]{1,2})/g)) {
    const id = Number(match[1].replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)));
    if (id > 0 && id <= 60) ids.add(id);
  }
  return [...ids].sort((a, b) => a - b);
}

const answerPages = answerFiles.map((file) => {
  const text = fs.readFileSync(path.join(ocrDir, file), 'utf8');
  return {
    file,
    detectedQuestionIds: questionIdsFromText(text),
    candidates: answerCandidatesFromText(text),
    preview: compact(text).slice(0, 240),
  };
});

const summary = {
  examId: payload.examId,
  ocrId,
  createdAt: new Date().toISOString(),
  source: {
    importJson: path.relative(ROOT, importPath),
    ocrDir: path.relative(ROOT, ocrDir),
  },
  counts: payload.counts,
  confirmedAnswersByParser: payload.answers || {},
  parsedQuestionIds: (payload.questions || []).map((q) => q.id),
  answerPagesWithCandidates: answerPages.filter((page) => page.candidates.length > 0),
  note:
    'フォルダ内画像をローカルOCRした結果。explicit-answerは比較的強い候補、status-lineは肢別の正誤行を含むため正解番号としては未確定。',
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outPath: path.relative(ROOT, outPath), counts: summary.counts }, null, 2));
