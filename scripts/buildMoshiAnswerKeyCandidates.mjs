import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const ocrDir = path.resolve(ROOT, process.argv[2] || 'tmp/moshi-winocr/合格１-answers-best');
const slug = process.argv[3] || 'goukaku-kakumei-moshi-2026-07-05';
const outJson = path.join(ROOT, 'data', 'moshi', `${slug}-answer-key-candidates.json`);
const outMd = path.join(ROOT, 'data', 'moshi', `${slug}-answer-key-candidates.md`);

const SIMPLE_QUESTION_IDS = new Set([
  ...Array.from({ length: 40 }, (_, index) => index + 1),
  ...Array.from({ length: 14 }, (_, index) => index + 47),
]);

const NON_SIMPLE_PATTERNS = [
  /採点基準/,
  /解答例/,
  /答例】/,
  /完成全文/,
  /租税法律主義/,
  /暴力団員.*憲法14条/,
  /出席停止の懲罰/,
];

const TOPIC_HINTS = [
  { id: 1, patterns: [/法の効力/] },
  { id: 2, patterns: [/裁判外紛争解決/, /紛争解決制度/] },
  { id: 3, patterns: [/外国人の人権/] },
  { id: 4, patterns: [/表現の自由/] },
  { id: 5, patterns: [/議席喪失/, /党籍/, /比例代表選出議員/] },
  { id: 7, patterns: [/明文規/] },
  { id: 8, patterns: [/行政機関の権限/, /行機関畍限/, /行政85行機関/] },
  { id: 10, patterns: [/代執行/] },
  { id: 11, patterns: [/審査請求の対象/] },
  { id: 12, patterns: [/聴聞/] },
  { id: 13, patterns: [/行政指導/] },
  { id: 14, patterns: [/適用除外/] },
  { id: 17, patterns: [/処分性/, /抗告訴訟.*対象/] },
  { id: 18, patterns: [/差止め訴訟/] },
  { id: 21, patterns: [/国家賠償法/] },
  { id: 24, patterns: [/住民監査請求/] },
  { id: 26, patterns: [/国の行政組織/] },
  { id: 27, patterns: [/行為能力/] },
  { id: 28, patterns: [/意思表示/] },
  { id: 29, patterns: [/抵当権/] },
  { id: 31, patterns: [/債権者代位権/] },
  { id: 32, patterns: [/弁済/] },
  { id: 33, patterns: [/賃貸借/] },
  { id: 34, patterns: [/不法行為/] },
  { id: 36, patterns: [/商業使用人/] },
  { id: 37, patterns: [/創立総会/] },
  { id: 39, patterns: [/取締役.*責任/] },
  { id: 40, patterns: [/持分会社/] },
  { id: 47, patterns: [/各国の政治体制/] },
  { id: 48, patterns: [/選挙制度/] },
  { id: 49, patterns: [/日本銀行/] },
  { id: 50, patterns: [/国債/, /国哉/, /建設国債/, /借換債/] },
  { id: 52, patterns: [/日本の産業/] },
  { id: 53, patterns: [/行政書士法/] },
  { id: 55, patterns: [/マイナンバー/] },
  { id: 56, patterns: [/情報通信用語/, /情報通信/] },
  { id: 58, patterns: [/立体的な考え/, /思考の整理学/] },
  { id: 59, patterns: [/自立/, /依存/] },
];

const REVIEW_HINTS_BY_FILE = {
  '007-PXL_20260705_041134988.txt': {
    questionId: 49,
    answer: '4',
    reason: 'ocr-says-i-o-combination-and-choice-table-needs-review',
  },
  '012-PXL_20260705_041153220.MP.txt': {
    questionId: 5,
    answer: '2',
    reason: 'topic-match-and-choice-logic-needs-review',
  },
  '021-PXL_20260705_041223072.txt': {
    questionId: 24,
    answer: '3',
    reason: 'ocr-tail-answer-digit-needs-review',
  },
  '037-PXL_20260705_041322212.MP.txt': {
    questionId: 10,
    answer: '4',
    reason: 'ocr-tail-after-choice-5-needs-review',
  },
  '045-PXL_20260705_041347984.txt': {
    questionId: 1,
    answer: '3',
    reason: 'ocr-choice-3-error-marker-needs-review',
  },
  '039-PXL_20260705_041331570.txt': {
    questionId: 8,
    answer: '5',
    reason: 'topic-match-answer-digit-needs-review',
  },
  '046-PXL_20260705_041349862.MP.txt': {
    questionId: 56,
    answer: '1',
    reason: 'topic-match-first-wrong-choice-needs-review',
  },
};

function toHalfWidth(value) {
  return String(value || '').replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
}

function compact(text) {
  return toHalfWidth(text).replace(/[\s　]+/g, '');
}

function uniq(values) {
  return [...new Set(values)];
}

function normalizeAnswer(value) {
  const s = toHalfWidth(value).trim();
  return /^[1-5]$/.test(s) ? s : '';
}

function isSimpleQuestionId(id) {
  return SIMPLE_QUESTION_IDS.has(Number(id));
}

function isNonSimpleAnswerPage(text) {
  return NON_SIMPLE_PATTERNS.some((pattern) => pattern.test(text));
}

function confidenceRank(confidence) {
  return { high: 3, medium: 2, low: 1 }[confidence] || 0;
}

function detectTopicQuestionCandidates(text) {
  const candidates = [];
  for (const hint of TOPIC_HINTS) {
    for (const pattern of hint.patterns) {
      const match = text.match(pattern);
      if (!match) continue;
      candidates.push({
        id: hint.id,
        reason: 'topic-match',
        pattern: pattern.source,
        matchIndex: match.index ?? -1,
        matchEnd: (match.index ?? 0) + match[0].length,
      });
      break;
    }
  }
  return candidates;
}

function detectQuestionCandidates(text) {
  const candidates = [];
  for (const match of text.matchAll(/(?:問題|問)([0-9]{1,2})/g)) {
    const id = Number(match[1]);
    if (id > 0 && id <= 60) candidates.push({ id, reason: 'explicit-question-label', matchIndex: match.index ?? -1 });
  }
  for (const match of text.matchAll(/(?:^|[^0-9])([1-9][0-9]?)[（(][^）)]{1,34}[）)]/g)) {
    const id = Number(match[1]);
    if (id > 0 && id <= 60) candidates.push({ id, reason: 'header-number-before-topic', matchIndex: match.index ?? -1 });
  }
  return candidates;
}

function inferTopicAnswerFromDigits(digits, questionId) {
  if (!digits) return '';
  const q = String(questionId);
  const normalized = String(digits).replace(/^0+/, '');
  if (!normalized) return '';

  if (normalized.startsWith(q)) {
    const next = normalized.slice(q.length, q.length + 1);
    if (/^[1-5]$/.test(next)) return next;
  }
  if (questionId >= 10 && normalized.endsWith(q)) {
    const prefix = normalized.slice(0, -q.length);
    if (/^[1-5]$/.test(prefix)) return prefix;
  }
  if (normalized.length === 1 && /^[1-5]$/.test(normalized) && normalized !== q) return normalized;
  if (questionId >= 10 && /^[1-5]$/.test(normalized[0]) && !q.startsWith(normalized[0])) return normalized[0];
  if (questionId < 10 && normalized.length === 2 && normalized.endsWith(q) && /^[1-5]$/.test(normalized[0])) {
    return normalized[0];
  }
  return '';
}

function detectAnswerCandidates(text, topicCandidates) {
  const candidates = [];
  const directPatterns = [
    /正解(?:は|=|：|:)?([1-5])(?:とな|で|。|$)/g,
    /正解は?([1-5])/g,
    /以上より[^。]{0,80}正解(?:は)?([1-5])/g,
    /(?:解正|難易度正|難易度解正|重要度難易度正|重要度難易度解正)([1-5])/g,
  ];
  for (const pattern of directPatterns) {
    for (const match of text.matchAll(pattern)) {
      const answer = normalizeAnswer(match[1]);
      if (answer) candidates.push({ answer, reason: 'explicit-answer-phrase', matchIndex: match.index ?? -1 });
    }
  }

  // Many answer pages have a header like "22(普通地方公共団体の議会)5 ..."
  for (const match of text.matchAll(/(?:^|[^0-9])([1-9][0-9]?)[（(][^）)]{1,34}[）)]([1-5])(?=[^0-9]{0,8})/g)) {
    const id = Number(match[1]);
    const answer = normalizeAnswer(match[2]);
    if (id > 0 && id <= 60 && answer) {
      candidates.push({ answer, questionHint: id, reason: 'header-answer-after-topic', matchIndex: match.index ?? -1 });
    }
  }

  for (const topic of topicCandidates) {
    if (!isSimpleQuestionId(topic.id) || topic.matchEnd < 0) continue;
    const after = text.slice(topic.matchEnd, topic.matchEnd + 28);
    const digitMatch = after.match(/^[^0-9]{0,8}([0-9]{1,4})/);
    const answer = inferTopicAnswerFromDigits(digitMatch?.[1] || '', topic.id);
    if (answer) {
      candidates.push({
        answer,
        questionHint: topic.id,
        reason: 'topic-leading-digits',
        matchIndex: topic.matchEnd,
      });
    }
  }

  return candidates;
}

function chooseCandidate({ file, questionCandidates, topicCandidates, answerCandidates, nonSimple }) {
  if (nonSimple) return null;

  const reviewHint = REVIEW_HINTS_BY_FILE[file];
  if (reviewHint && isSimpleQuestionId(reviewHint.questionId) && normalizeAnswer(reviewHint.answer)) {
    return {
      questionId: reviewHint.questionId,
      answer: reviewHint.answer,
      confidence: 'low',
      reason: reviewHint.reason,
    };
  }

  const headerAnswerPairs = answerCandidates.filter((item) => item.questionHint && isSimpleQuestionId(item.questionHint));
  const explicitQuestions = questionCandidates.filter(
    (item) => item.reason === 'explicit-question-label' && isSimpleQuestionId(item.id),
  );
  const headerQuestions = questionCandidates.filter(
    (item) => item.reason === 'header-number-before-topic' && isSimpleQuestionId(item.id),
  );
  const topicQuestions = topicCandidates.filter((item) => isSimpleQuestionId(item.id));
  const explicitAnswers = answerCandidates.filter((item) => item.reason === 'explicit-answer-phrase');

  for (const pair of headerAnswerPairs) {
    return {
      questionId: pair.questionHint,
      answer: pair.answer,
      confidence: pair.reason === 'topic-leading-digits' ? 'low' : 'medium',
      reason: pair.reason,
    };
  }

  const uniqueAnswers = uniq(explicitAnswers.map((item) => item.answer));
  const questionId = explicitQuestions[0]?.id || headerQuestions[0]?.id || topicQuestions[0]?.id;
  if (questionId && uniqueAnswers.length === 1) {
    const hasExplicitQuestion = Boolean(explicitQuestions[0] || headerQuestions[0]);
    return {
      questionId,
      answer: uniqueAnswers[0],
      confidence: hasExplicitQuestion ? 'high' : 'medium',
      reason: hasExplicitQuestion ? 'question-and-explicit-answer' : 'topic-and-explicit-answer',
    };
  }

  return null;
}

function addAnswer(answerMap, conflicts, selected, page) {
  if (!selected?.questionId || !selected?.answer) return;
  const next = {
    answer: selected.answer,
    confidence: selected.confidence,
    sourceFile: page.file,
    reason: selected.reason,
  };
  const existing = answerMap[selected.questionId];
  if (!existing) {
    answerMap[selected.questionId] = next;
    return;
  }
  if (existing.answer !== next.answer) {
    conflicts.push({ questionId: selected.questionId, existing, next });
  }
  if (confidenceRank(next.confidence) > confidenceRank(existing.confidence)) {
    answerMap[selected.questionId] = next;
  }
}

const files = fs
  .readdirSync(ocrDir)
  .filter((name) => /\.txt$/i.test(name))
  .sort((a, b) => a.localeCompare(b, 'ja'));

const pages = [];
const answerMap = {};
const conflicts = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(ocrDir, file), 'utf8');
  const text = compact(raw);
  const nonSimple = isNonSimpleAnswerPage(text);
  const questionCandidates = detectQuestionCandidates(text);
  const topicCandidates = detectTopicQuestionCandidates(text);
  const answerCandidates = detectAnswerCandidates(text, topicCandidates);
  const selected = chooseCandidate({ file, questionCandidates, topicCandidates, answerCandidates, nonSimple });
  const page = {
    pageIndex: pages.length + 1,
    file,
    nonSimple,
    selected,
    questionCandidates,
    topicCandidates,
    answerCandidates,
    snippet: text.slice(0, 260),
  };
  pages.push(page);
  addAnswer(answerMap, conflicts, selected, page);
}

const selectedQuestionIds = Object.keys(answerMap).map(Number).sort((a, b) => a - b);
const missingSimpleQuestionIds = [...SIMPLE_QUESTION_IDS].filter((id) => !answerMap[id]).sort((a, b) => a - b);

const payload = {
  examId: '合格１',
  source: 'Windows.Media.Ocr answer explanation OCR with header/topic heuristics',
  createdAt: new Date().toISOString(),
  inputDir: path.relative(ROOT, ocrDir),
  status: 'answer_key_candidates_needs_review',
  notes: [
    '5肢択一の採点候補だけを answerMap に入れる。多肢選択・記述式ページは nonSimple として除外する。',
    'low confidence はOCR崩れや論点照合による候補であり、採点確定前に人間確認が必要。',
  ],
  counts: {
    pages: pages.length,
    nonSimplePages: pages.filter((item) => item.nonSimple).length,
    selectedAnswers: selectedQuestionIds.length,
    highConfidence: Object.values(answerMap).filter((item) => item.confidence === 'high').length,
    mediumConfidence: Object.values(answerMap).filter((item) => item.confidence === 'medium').length,
    lowConfidence: Object.values(answerMap).filter((item) => item.confidence === 'low').length,
    conflicts: conflicts.length,
    missingSimpleQuestions: missingSimpleQuestionIds.length,
  },
  answerMap,
  conflicts,
  missingSimpleQuestionIds,
  pages,
};

fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

const lines = [];
lines.push('---');
lines.push('id: data/moshi/goukaku-kakumei-moshi-2026-07-05-answer-key-candidates');
lines.push('type: moshi-answer-key-candidates');
lines.push('examId: 合格１');
lines.push('status: answer_key_candidates_needs_review');
lines.push('---');
lines.push('');
lines.push('# 合格革命 模擬試験 合格1 正解番号候補');
lines.push('');
lines.push('解答解説画像をWindows内蔵OCRで読み、問番号・正解番号を確信度付きで抽出した候補。誤確定を避けるため、人間確認前は `needs_review` とする。');
lines.push('');
lines.push(`- 入力: \`${path.relative(ROOT, ocrDir)}\``);
lines.push(`- JSON: \`${path.relative(ROOT, outJson)}\``);
lines.push(`- 候補抽出: ${payload.counts.selectedAnswers}問`);
lines.push(`- high: ${payload.counts.highConfidence} / medium: ${payload.counts.mediumConfidence} / low: ${payload.counts.lowConfidence}`);
lines.push(`- 多肢・記述として除外: ${payload.counts.nonSimplePages}ページ`);
lines.push(`- 未抽出の5肢択一候補: ${missingSimpleQuestionIds.join(', ') || 'なし'}`);
lines.push('');
lines.push('## 正解番号候補');
lines.push('');
lines.push('| 問 | 候補正解 | 確信度 | 根拠ファイル | 抽出根拠 |');
lines.push('|---:|:---:|---|---|---|');
for (const id of selectedQuestionIds) {
  const item = answerMap[id];
  lines.push(`| ${id} | ${item.answer} | ${item.confidence} | \`${item.sourceFile}\` | ${item.reason} |`);
}

if (conflicts.length) {
  lines.push('');
  lines.push('## 衝突候補');
  for (const conflict of conflicts) {
    lines.push('');
    lines.push(`- 問${conflict.questionId}: ${conflict.existing.answer} (${conflict.existing.sourceFile}) / ${conflict.next.answer} (${conflict.next.sourceFile})`);
  }
}

lines.push('');
lines.push('## 多肢・記述として除外したページ');
for (const page of pages.filter((item) => item.nonSimple)) {
  lines.push('');
  lines.push(`- OCR解答ページ${page.pageIndex}: \`${page.file}\``);
}

lines.push('');
lines.push('## 未確定ページ');
for (const page of pages.filter((item) => !item.selected && !item.nonSimple)) {
  lines.push('');
  lines.push(`### OCR解答ページ${page.pageIndex}: ${page.file}`);
  lines.push('');
  lines.push(`- 問番号候補: ${page.questionCandidates.map((item) => `${item.id}/${item.reason}`).join(', ') || 'なし'}`);
  lines.push(`- 論点候補: ${page.topicCandidates.map((item) => `${item.id}/${item.reason}:${item.pattern}`).join(', ') || 'なし'}`);
  lines.push(`- 正解候補: ${page.answerCandidates.map((item) => `${item.answer}${item.questionHint ? `(問${item.questionHint})` : ''}/${item.reason}`).join(', ') || 'なし'}`);
  lines.push('');
  lines.push(page.snippet || '（OCRテキストなし）');
}

fs.writeFileSync(outMd, `${lines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      jsonOut: path.relative(ROOT, outJson),
      mdOut: path.relative(ROOT, outMd),
      counts: payload.counts,
    },
    null,
    2,
  ),
);

