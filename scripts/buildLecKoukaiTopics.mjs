/**
 * LEC公開模試の解答OCR（または手動メタ）から topics JSON を生成。
 * 原文転載せず、論点・判断ルール・ひっかけを自作要約する。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ocrPath = path.join(root, 'tmp/moshi-ocr/lec-koukai-2026-round1/moshi-import.json');
const outPath = path.join(root, 'data/moshi/lec-koukai-2026-round1-topics.json');

const SUBJECT_FROM_THEME = [
  [/基礎知識|行政書士法|諸法令/, { subject: '基礎知識', field: '基礎知識', learnSubject: '基礎知識' }],
  [/基礎法学/, { subject: '基礎法学', field: '基礎法学', learnSubject: '基礎法学' }],
  [/憲法/, { subject: '憲法', field: '憲法', learnSubject: '憲法' }],
  [/多肢選択.*憲法|憲法.*多肢/, { subject: '多肢選択', field: '多肢選択憲法', learnSubject: '多肢選択憲法' }],
  [/多肢選択.*行政|行政.*多肢/, { subject: '多肢選択', field: '多肢選択行政法', learnSubject: '多肢選択行政法' }],
  [/行政事件訴訟|行訴/, { subject: '行政法', field: '行政事件訴訟法', learnSubject: '行政事件訴訟法' }],
  [/行政不服|行服/, { subject: '行政法', field: '行政不服審査法', learnSubject: '行政不服審査法' }],
  [/行政手続|行手法/, { subject: '行政法', field: '行政手続法', learnSubject: '行政手続法' }],
  [/国家賠償|国賠/, { subject: '行政法', field: '国家賠償法', learnSubject: '国家賠償法' }],
  [/地方自治/, { subject: '行政法', field: '地方自治法', learnSubject: '地方自治法' }],
  [/記述.*行政|行政.*記述/, { subject: '記述', field: '行政法記述', learnSubject: '行政法記述' }],
  [/記述.*民法|民法.*記述/, { subject: '記述', field: '民法記述', learnSubject: '民法記述' }],
  [/民法総則|詐欺|強迫|錯誤|代理|時効/, { subject: '民法', field: '民法総則', learnSubject: '民法総則' }],
  [/物権|占有|所有権|抵当|登記/, { subject: '民法', field: '物権', learnSubject: '民法物権' }],
  [/債権総論|同時履行|危険負担/, { subject: '民法', field: '債権総論', learnSubject: '債権総論' }],
  [/債権各論|売買|賃貸|請負|寄託|不法行為/, { subject: '民法', field: '債権各論', learnSubject: '債権各論' }],
  [/相続|遺言|家族/, { subject: '民法', field: '相続', learnSubject: '家族法' }],
  [/会社|商法|株式|取締役|株主/, { subject: '商法・会社法', field: '商法・会社法', learnSubject: '商法・会社法' }],
  [/行政法/, { subject: '行政法', field: '行政法総論', learnSubject: '行政法総論' }],
];

const QUIZ_SUBJECT = {
  行政法総論: '行政法',
  行政手続法: '行政法',
  行政不服審査法: '行政法',
  行政事件訴訟法: '行政法',
  国家賠償法: '行政法',
  地方自治法: '行政法',
  民法総則: '民法',
  民法物権: '民法',
  債権総論: '民法',
  債権各論: '民法',
  家族法: '民法',
  商法・会社法: '商法・会社法',
  基礎知識: '基礎知識',
  基礎法学: '基礎法学',
  憲法: '憲法',
  多肢選択憲法: '多肢選択',
  多肢選択行政法: '多肢選択',
  行政法記述: '記述',
  民法記述: '記述',
};

const QUIZ_FIELD = {
  国家賠償法: '国家賠償法・損失訴訟',
  物権: '民法物権',
  相続: '家族法',
};

function resolveSubject(theme) {
  for (const [re, meta] of SUBJECT_FROM_THEME) {
    if (re.test(theme)) return meta;
  }
  return { subject: '行政法', field: '行政法総論', learnSubject: '行政法総論' };
}

function slugify(s) {
  return String(s)
    .replace(/[（）()・／/\s]+/g, '-')
    .replace(/[^\w\u3040-\u30ff\u4e00-\u9faf-]/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
}

function parseAnswerPages(text, pages) {
  const results = [];
  const chunks = pages?.length
    ? pages.map((p) => ({ ...p, chunk: p.text }))
    : String(text || '')
        .split(/<!-- answers page/)
        .slice(1)
        .map((chunk, i) => ({ index: i + 1, chunk }));

  for (const { index, file, filePath, chunk } of chunks) {
    const body = chunk || '';
    const qMatch = body.match(/問題\s*([0-9０-９]{1,2})/);
    if (!qMatch) continue;
    const qn = Number(String(qMatch[1]).replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)));
    const themeMatch = body.match(/テーマ\s*[:：]?\s*([^\n]+)/);
    const theme = themeMatch ? themeMatch[1].trim() : `問${qn}`;
    const ansMatch = body.match(/正解\s*[:：]?\s*([0-9０-９ア-オ]{1,2})/);
    let correctAnswer = ansMatch ? ansMatch[1] : '';
    if (/^[０-９]$/.test(correctAnswer)) {
      correctAnswer = String.fromCharCode(correctAnswer.charCodeAt(0) - 0xfee0);
    }
    if (/^[ア-オ]$/.test(correctAnswer)) {
      correctAnswer = { ア: '1', イ: '2', ウ: '3', エ: '4', オ: '5' }[correctAnswer];
    }

    const validLines = [...body.matchAll(/([1-5１-５])\s*[.．、]?\s*妥当で(ない|ある)/g)].map((m) => ({
      num: Number(String(m[1]).replace(/[１-５]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))),
      valid: m[2] === 'ある',
    }));

    const refs = [...body.matchAll(/(\d+条[^、。\n]{0,20})/g)].map((m) => m[1]).slice(0, 6);

    results.push({
      questionNumber: qn,
      theme,
      correctAnswer,
      validLines,
      refs,
      answerImage: filePath || `app/模試画像/LEC公開問題/解答/${file || ''}`,
      ocrPageIndex: index,
      rawSnippet: body.slice(0, 800),
    });
  }

  return results.sort((a, b) => a.questionNumber - b.questionNumber);
}

function buildTrap(validLines, correctAnswer) {
  const wrong = validLines.filter((v) => !v.valid).map((v) => v.num);
  const right = validLines.filter((v) => v.valid).map((v) => v.num);
  if (wrong.length && right.length) {
    return `正解は${correctAnswer}番。×になりやすい肢: ${wrong.join('・')}。`;
  }
  return '肢ごとの要件・主語・数字を取り違えない。';
}

function buildPractice(topic, meta) {
  const { rule, trap, topic: title } = topic;
  const choices = [
    `${title}について、${rule.slice(0, 60)}…とする説明は妥当である。`,
    `${title}について、常に／一切／すべてと言い切る説明は妥当である。`,
    `${title}について、主体・期間・手続を取り違えた説明は妥当である。`,
    `${title}について、判例・条文の結論を逆にした説明は妥当である。`,
  ];
  return {
    prompt: `【LEC公開模試系】${title}について、妥当なものはどれか。`,
    choices,
    answer: 0,
    explanation: `正解肢は論点の芯（${rule.slice(0, 80)}…）。ひっかけ: ${trap}`,
  };
}

function enrichFromSnippet(parsed) {
  const { theme, rawSnippet, validLines, correctAnswer, refs } = parsed;
  const topicName = theme.replace(/[（(][^）)]+[）)]/g, '').trim() || theme;
  const meta = resolveSubject(theme);
  const learnSubject = meta.learnSubject;
  const quizSubject = QUIZ_SUBJECT[learnSubject] || meta.subject;
  const quizField = QUIZ_FIELD[meta.field] || learnSubject;

  const correctNums = validLines.filter((v) => v.valid).map((v) => v.num);
  const wrongNums = validLines.filter((v) => !v.valid).map((v) => v.num);

  const rule =
    correctNums.length > 1
      ? `${topicName}は、正解肢${correctNums.join('・')}のとおり。${refs.length ? `根拠: ${refs.join('、')}。` : ''}`
      : `${topicName}の正しい判断は、正解${correctAnswer}番の方向。${refs.length ? `根拠: ${refs.join('、')}。` : ''} OCR要約から論点を確認すること。`;

  const trap = buildTrap(validLines, correctAnswer);
  const memory = `LEC公開模試・問${parsed.questionNumber} ${topicName.slice(0, 30)}。正解${correctAnswer}。${wrongNums.length ? `×肢${wrongNums.join('/')}` : ''}`;

  const deepDive = `■ 結論\n\n${rule}\n\n■ テーマ\n\n${theme}\n\n■ 肢の整理\n\n| 肢 | 正誤 |\n|---|---|\n${validLines.map((v) => `| ${v.num} | ${v.valid ? '○' : '[[red:×]]'} |`).join('\n')}\n\n■ ひっかけ\n\n[[red:${trap}]]\n\n■ 暗記\n\n${memory}`;

  return {
    id: `leckoukai-q${String(parsed.questionNumber).padStart(2, '0')}-${slugify(topicName)}`,
    questionNumber: parsed.questionNumber,
    subject: meta.subject,
    field: meta.field,
    learnSubject,
    quizSubject,
    quizField,
    topic: topicName,
    aim: `${theme}の出題意図を、肢ごとの正誤で切れるようにする。`,
    rule,
    trap,
    references: refs,
    memory,
    deepDive,
    practiceQuestion: buildPractice({ rule, trap, topic: topicName }, meta),
    sourceTrace: {
      answerImage: parsed.answerImage,
      answerSource: `LEC公開模試第1回・正解${correctAnswer}・${theme}`,
      ocrPageIndex: parsed.ocrPageIndex,
    },
    status: validLines.length >= 2 && correctAnswer ? 'confirmed' : 'needs_review',
  };
}

function main() {
  if (!fs.existsSync(ocrPath)) {
    console.error('OCR not found. Run: node scripts/importLecKoukaiMoshi.mjs --answers-only');
    process.exit(1);
  }
  const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
  const parsed = parseAnswerPages(ocr.answerOcrText, ocr.pages?.answers);
  const topics = parsed.map(enrichFromSnippet);

  const payload = {
    schemaVersion: 1,
    examId: 'lec-koukai-2026-round1',
    title: '2026 全日本行政書士公開模試 第1回（LEC）',
    expectedQuestionCount: 60,
    note: '解答冊子OCRから論点を自作要約。原文の問題文・肢は転載しない。',
    topics,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Parsed ${parsed.length} answer pages → ${topics.filter((t) => t.status === 'confirmed').length} confirmed`);
  const missing = Array.from({ length: 60 }, (_, i) => i + 1).filter(
    (n) => !topics.some((t) => t.questionNumber === n),
  );
  if (missing.length) console.log('Missing questions:', missing.join(', '));
  console.log('Wrote', outPath);
}

main();
