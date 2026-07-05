import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const inputDir = path.resolve(ROOT, process.argv[2] || 'tmp/moshi-winocr/合格１-questions');
const slug = process.argv[3] || 'goukaku-kakumei-moshi-2026-07-05';
const jsonOut = path.join(ROOT, 'data', 'moshi', `${slug}-question-transcript.json`);
const mdOut = path.join(ROOT, 'data', 'moshi', `${slug}-question-transcript.md`);

function compactRaw(text) {
  return String(text || '')
    .replace(/\u000c/g, '')
    .replace(/[ \t\r\n]+/g, ' ')
    .trim();
}

function normalizeText(text) {
  let s = compactRaw(text);
  s = s
    .replace(/問\s*題/g, '問題')
    .replace(/間\s*題/g, '問題')
    .replace(/最\s*高\s*裁\s*判\s*所/g, '最高裁判所')
    .replace(/普\s*通\s*地\s*方\s*公\s*共\s*団\s*体/g, '普通地方公共団体')
    .replace(/地\s*方\s*公\s*共\s*団\s*体/g, '地方公共団体')
    .replace(/行\s*政\s*手\s*続\s*法/g, '行政手続法')
    .replace(/行\s*政\s*不\s*服\s*審\s*査\s*法/g, '行政不服審査法')
    .replace(/行\s*政\s*事\s*件\s*訴\s*訟\s*法/g, '行政事件訴訟法')
    .replace(/国\s*家\s*賠\s*償\s*法/g, '国家賠償法')
    .replace(/日\s*本\s*国\s*憲\s*法/g, '日本国憲法');

  s = s.replace(
    /(?<=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}々ー])\s+(?=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}々ー])/gu,
    '',
  );
  s = s.replace(
    /(?<=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}々ー])\s+(?=[、。，．・「」（）])/gu,
    '',
  );
  s = s.replace(
    /(?<=[「」（）])\s+(?=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}々ー])/gu,
    '',
  );
  s = s.replace(/\s+([、。，．・」）])/g, '$1').replace(/([「（])\s+/g, '$1');
  s = s.replace(/\s{2,}/g, ' ').trim();

  return s;
}

function detectQuestionIds(text) {
  const ids = new Set();
  for (const match of text.matchAll(/問題\s*([0-9０-９]{1,2})/g)) {
    const id = Number(match[1].replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)));
    if (id > 0 && id <= 60) ids.add(id);
  }
  return [...ids].sort((a, b) => a - b);
}

function subjectGuess(ids, text) {
  const first = ids[0] || 0;
  if (first >= 1 && first <= 7) return first <= 2 ? '基礎法学' : '憲法';
  if (first >= 8 && first <= 26) return '行政法';
  if (first >= 27 && first <= 35) return '民法';
  if (first >= 36 && first <= 40) return '商法・会社法';
  if (first >= 41 && first <= 46) return '多肢選択・記述周辺';
  if (first >= 47) return '一般知識等';
  if (/地方自治法|住民監査|普通地方公共団体/.test(text)) return '行政法';
  if (/民法|相続|債権|抵当/.test(text)) return '民法';
  if (/会社法|株式|取締役/.test(text)) return '商法・会社法';
  if (/憲法|最高裁判例|表現の自由/.test(text)) return '憲法';
  return '未判定';
}

const files = fs
  .readdirSync(inputDir)
  .filter((name) => /\.txt$/i.test(name) && name !== 'manifest.json')
  .sort((a, b) => a.localeCompare(b, 'ja'));

const pages = files.map((file, index) => {
  const raw = fs.readFileSync(path.join(inputDir, file), 'utf8');
  const normalized = normalizeText(raw);
  const questionIds = detectQuestionIds(normalized);
  return {
    pageIndex: index + 1,
    ocrFile: path.relative(ROOT, path.join(inputDir, file)),
    sourceImage: file.replace(/^\d+-/, '').replace(/\.txt$/i, ''),
    questionIds,
    subject: subjectGuess(questionIds, normalized),
    text: normalized,
    rawText: compactRaw(raw),
  };
});

const payload = {
  examId: '合格１',
  source: 'Windows.Media.Ocr local OCR',
  createdAt: new Date().toISOString(),
  inputDir: path.relative(ROOT, inputDir),
  status: 'ocr_draft_needs_review',
  notes: [
    '外部APIを使わず、Windows内蔵OCRで問題画像52枚を文字起こししたドラフト。',
    'OCR誤字が残るため、問題文として利用する前に人間確認が必要。',
    '著作権保護のため、アプリ学習カードへはこの全文ではなく論点要約として展開する。',
  ],
  counts: {
    pages: pages.length,
    pagesWithQuestionIds: pages.filter((page) => page.questionIds.length > 0).length,
    detectedQuestionIds: [...new Set(pages.flatMap((page) => page.questionIds))].sort((a, b) => a - b),
  },
  pages,
};

fs.mkdirSync(path.dirname(jsonOut), { recursive: true });
fs.writeFileSync(jsonOut, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

const lines = [];
lines.push('---');
lines.push('id: data/moshi/goukaku-kakumei-moshi-2026-07-05-question-transcript');
lines.push('type: moshi-question-transcript');
lines.push('examId: 合格１');
lines.push('source: Windows.Media.Ocr local OCR');
lines.push('status: ocr_draft_needs_review');
lines.push('---');
lines.push('');
lines.push('# 合格革命 模擬試験 合格1 問題文字起こしドラフト');
lines.push('');
lines.push('外部APIを使わず、Windows内蔵OCRで問題画像52枚を文字起こししたドラフト。OCR誤字が残るため、問題文として利用する前に人間確認が必要。');
lines.push('');
lines.push(`- 入力: \`${path.relative(ROOT, inputDir)}\``);
lines.push(`- JSON: \`${path.relative(ROOT, jsonOut)}\``);
lines.push(`- OCRページ数: ${payload.counts.pages}`);
lines.push(`- 問題番号検出ページ数: ${payload.counts.pagesWithQuestionIds}`);
lines.push(`- 検出問番号: ${payload.counts.detectedQuestionIds.join(', ') || 'なし'}`);
lines.push('');
lines.push('## ページ別文字起こし');
for (const page of pages) {
  const ids = page.questionIds.length ? page.questionIds.join(', ') : '未検出';
  lines.push('');
  lines.push(`### OCRページ${page.pageIndex}: ${page.sourceImage}`);
  lines.push('');
  lines.push(`- 検出問番号: ${ids}`);
  lines.push(`- 科目推定: ${page.subject}`);
  lines.push('');
  lines.push(page.text || '（OCRテキストなし）');
}

fs.writeFileSync(mdOut, `${lines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      jsonOut: path.relative(ROOT, jsonOut),
      mdOut: path.relative(ROOT, mdOut),
      counts: payload.counts,
    },
    null,
    2,
  ),
);
