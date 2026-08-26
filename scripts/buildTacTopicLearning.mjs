/**
 * TAC1（MD57問）・TAC3（既存60カード）から
 * 見て聞いて覚える / ボーナス問題を生成する。
 * 模試原文の転載はしない。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const LEARN_SUBJECT_BY_FIELD = {
  行政組織法: '行政法総論',
  義務履行確保: '行政法総論',
  行政法総論: '行政法総論',
  行政法・法理: '行政法総論',
  行政法・行政立法: '行政法総論',
  行政手続法: '行政手続法',
  行政不服審査法: '行政不服審査法',
  行政事件訴訟法: '行政事件訴訟法',
  国家賠償法: '国家賠償法',
  地方自治法: '地方自治法',
  行政法総合: '行政法総合',
  民法総則: '民法総則',
  物権: '民法物権',
  民法物権: '民法物権',
  債権総論: '債権総論',
  債権各論: '債権各論',
  相続: '家族法',
  家族法: '家族法',
  商法・会社法: '商法・会社法',
  会社法: '商法・会社法',
  基礎知識: '基礎知識',
  基礎法学: '基礎法学',
  憲法: '憲法',
  多肢選択憲法: '多肢選択憲法',
  多肢選択行政法: '多肢選択行政法',
  行政法記述: '行政法記述',
  民法記述: '民法記述',
};

const QUIZ_SUBJECT_BY_LEARN = {
  行政法総論: '行政法',
  行政手続法: '行政法',
  行政不服審査法: '行政法',
  行政事件訴訟法: '行政法',
  国家賠償法: '行政法',
  地方自治法: '行政法',
  行政法総合: '行政法',
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

const QUIZ_FIELD_BY_LEARN = {
  国家賠償法: '国家賠償法・損失訴訟',
};

function mapTac1Field(fieldRaw, { isDesc = false } = {}) {
  const f = fieldRaw;
  // 記述・穴埋めは専用キーへ（択一の行政法総論等に落とさない）
  if (isDesc) {
    if (/住民監査|行政罰|秩序罰|行政法/.test(f)) {
      if (/行政罰|秩序罰/.test(f)) return pack('多肢選択行政法', '多肢選択', '多肢選択行政法');
      if (/住民監査/.test(f)) return pack('行政法記述', '記述', '行政法記述');
      return pack('行政法記述', '記述', '行政法記述');
    }
    if (/性同一性|国の関与|憲法/.test(f)) {
      if (/性同一性/.test(f)) return pack('多肢選択憲法', '多肢選択', '多肢選択憲法');
      return pack('憲法', '憲法');
    }
    if (/抵当|有益費|民法|物権/.test(f)) return pack('民法記述', '記述', '民法記述');
  }
  if (/基礎法学/.test(f)) return pack('基礎法学', '基礎法学');
  if (/憲法/.test(f)) return pack('憲法', '憲法');
  if (/行手法|聴聞|意見公募|弾明/.test(f)) return pack('行政手続法', '行政法');
  if (/不服|再調査|教示/.test(f) && /行政法/.test(f)) return pack('行政不服審査法', '行政法');
  if (/訴えの利益|行訴|義務付け|執行停止/.test(f)) return pack('行政事件訴訟法', '行政法');
  if (/国賠/.test(f)) return pack('国家賠償法', '行政法', '国家賠償法・損失訴訟');
  if (/自治|大都市|公の施設|公物|道路|条例/.test(f)) return pack('地方自治法', '行政法');
  if (/義務履行|代執行|行政立法|法理/.test(f)) return pack('行政法総論', '行政法');
  if (/行政法/.test(f)) return pack('行政法総論', '行政法');
  if (/民法総則|意思表示|時効/.test(f)) return pack('民法総則', '民法');
  if (/物権|相隣|法定地上|抵当/.test(f)) return pack('民法物権', '民法');
  if (/詐害|相殺/.test(f)) return pack('債権総論', '民法');
  if (/契約解除|不法行為|有益費/.test(f)) return pack('債権各論', '民法');
  if (/親族|離婚|家族/.test(f)) return pack('家族法', '民法');
  if (/民法/.test(f)) return pack('民法総則', '民法');
  if (/物品運送|商法/.test(f)) return pack('商法・会社法', '商法・会社法');
  if (/会社法|設立|株式|株主総会|計算|中間配当/.test(f)) return pack('商法・会社法', '商法・会社法');
  if (/行政書士法|一般知識|女性|政治|税|墓地|クマ|空き家|附票|サイバー|AI|個情/.test(f)) {
    return pack('基礎知識', '基礎知識');
  }
  return pack('基礎知識', '基礎知識');
}

function pack(learnSubject, quizSubject, quizField = learnSubject) {
  return {
    learnSubject,
    quizSubject,
    quizField: QUIZ_FIELD_BY_LEARN[learnSubject] || quizField,
    field: learnSubject,
    subject: quizSubject,
  };
}

function slug(s) {
  return String(s)
    .replace(/[^\w一-龥ぁ-んァ-ンー]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

/** 見て聞いて覚える用の表面文を短く滑らかにする */
function polishMemory(text) {
  let s = String(text || '').trim();
  s = s
    .replace(/について、試験では「([^」]+)」を軸に判断する。言い切りや取り違えに注意する。/g, '$1')
    .replace(/初学者は結論の語だけ覚えず、誰に・いつ・何が起きるかをセットで押さえる。?/g, '')
    .replace(/試験では、この結論を「常に」「一切」など強い言葉で言い換えた肢がひっかけになります。?/g, '')
    .replace(/の判断ルールは次のとおりです。/g, 'は、')
    .replace(/で覚える。?/g, '。')
    .replace(/を時系列で覚える。?/g, '。')
    .replace(/をセットで見る。?/g, '。')
    .replace(/をセットで覚える。?/g, '。')
    .replace(/を固定する。?/g, '。')
    .replace(/を分ける。?/g, '。')
    .replace(/両者を混ぜない。?/g, '民訴と刑訴を混ぜない。')
    .replace(/・/g, '、')
    .replace(/、+/g, '、')
    .replace(/。+/g, '。')
    .replace(/、。/g, '。')
    .replace(/\s+/g, '')
    .trim();

  // 読点だらけのカタログ文を、最大2文に整える
  if ((s.match(/、/g) || []).length >= 4 && (s.match(/。/g) || []).length <= 1) {
    const parts = s.replace(/。$/g, '').split('、').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 4) {
      const head = parts.slice(0, Math.ceil(parts.length / 2)).join('、');
      const tail = parts.slice(Math.ceil(parts.length / 2)).join('、');
      s = `${head}。${tail}。`;
    }
  }

  if (!s.endsWith('。') && !s.endsWith('？') && !s.endsWith('！')) s += '。';
  s = s.replace(/両者。/g, '').replace(/。+/g, '。');
  return s.replace(/。。+/g, '。').replace(/^。/, '');
}

function beginnerMemory(core, topic) {
  const clean = String(core || '')
    .replace(/（.*?）/g, '')
    .replace(/\*\*/g, '')
    .trim();
  if (!clean) return polishMemory(topic);
  const polished = polishMemory(clean);
  // キーワード断片は、読みやすい一文に言い直す
  if (
    polished.length <= 18 ||
    /規定説、|型、|条、|判例。$|文言。$|準用。$|利益。$/.test(polished) ||
    ((polished.match(/、/g) || []).length >= 1 && polished.length <= 24)
  ) {
    const body = clean.replace(/。$/g, '').replace(/・/g, 'や');
    return polishMemory(`${topic}は、${body}で整理する`);
  }
  return polished;
}

function beginnerRule(core, topic) {
  const polished = polishMemory(core);
  return `${topic}はこう覚える。${polished}`;
}

function beginnerDeepDive(core, topic, refs) {
  const refLine = refs.length ? `根拠: ${refs.join('、')}。` : '';
  return [
    polishMemory(core),
    '主語、要件、効果、例外の順で読む。',
    refLine,
  ]
    .filter(Boolean)
    .join('\n\n');
}

function extractRefs(core, statuteRef = '') {
  const refs = [];
  if (statuteRef) refs.push(...statuteRef.split(/\s+/).filter(Boolean));
  const m = core.matchAll(/(\d+条(?:\d+項)?|[ぁ-んァ-ン一-龥]{2,12}法\d+条|最判[昭平令]\d+[^\s、。]*)/g);
  for (const x of m) refs.push(x[1]);
  return [...new Set(refs)].slice(0, 6);
}

function buildPractice(topic, memory, trapHint) {
  const correct = memory.length > 60 ? `${memory.slice(0, 58)}…` : memory;
  const wrongs = [
    `${topic}は、例外なく常に同じ結論になる。`,
    `${topic}では、主語や時期を確認しなくても結論が決まる。`,
    `${topic}は、似た制度名があれば同じ効果として扱ってよい。`,
    trapHint || `${topic}では、「できる」と「しなければならない」を区別しなくてよい。`,
  ];
  // Keep 4 choices; correct at index 1 for variety
  return {
    prompt: `${topic}について、妥当なものはどれか。`,
    choices: [wrongs[0], correct, wrongs[1], wrongs[2]],
    answer: 1,
    explanation: `正解は2。${memory} 他の肢は、例外や主語・時期を無視した言い切りです。`,
  };
}

function buildDescriptivePractice(topic, memory) {
  return {
    prompt: `${topic}について、次のうち最も適切な説明はどれか。`,
    choices: [
      '要件を確認せず結論だけ暗記すれば足りる。',
      memory.length > 70 ? `${memory.slice(0, 68)}…` : memory,
      '似た制度は常に同じ手続・同じ効果になる。',
      '例外規定は試験では無視してよい。',
    ],
    answer: 1,
    explanation: `正解は2。記述・穴埋めでも、まず制度の骨格（${topic}）を短く言えることが重要です。`,
  };
}

/** TAC1: hand-tuned overrides for clearer beginner text / better practice */
const TAC1_OVERRIDES = {
  1: {
    topic: '拘禁刑と応報刑論・目的刑論',
    aim: '拘禁刑・刑罰の種類・応報／目的を、旧法の名簿と取り違えずに言える。',
    rule: '令和7年6月1日から、懲役と禁錮を廃止して拘禁刑に一本化した。拘禁刑は刑事施設に拘置し、改善更生のため必要な作業を行わせ、又は必要な指導を行うことができる（刑法12条）。応報刑論は犯した罪への報い（過去）、目的刑論は将来の犯罪防止（一般予防・特別予防／再犯防止）。現行の主刑は死刑・拘禁刑・罰金・拘留・科料で、没収は付加刑（刑法9条）。',
    trap: '禁固と書く。拘禁刑＝収監刑。作業が常に義務。主刑を旧法の懲役・禁錮のまま覚える。応報と目的を入れ替える。拘留を拘禁刑と混ぜる。没収を忘れる。',
    memory: '拘禁刑＝懲役と禁錮の一本化（R7.6.1〜）。作業は必ずではない。応報＝過去の報い、目的＝将来の防止。主刑は死刑・拘禁刑・罰金・拘留・科料。付加刑は没収。',
    deepDive: `[[image:learn/kiso/kokin-ouhou-mokuteki]]

■ 結論

令和7年6月1日から、懲役と禁錮を廃止し、拘禁刑に一本化した（刑法12条）。刑事施設に拘置し、改善更生のため必要な作業又は指導を行い得る。作業はかつての懲役のように常に義務ではない。

応報刑論は犯した罪への報い（過去）。目的刑論は将来の犯罪防止（一般予防・特別予防。再犯防止は特別予防側）。現行法の考え方は、応報を基礎に予防も加味する相対的応報刑論として整理されることが多い。

■ 刑罰の種類（刑法9条）

現行の主刑は[[red:死刑・拘禁刑・罰金・拘留・科料]]。付加刑は[[red:没収]]。

旧法の主刑は死刑・懲役・禁錮・罰金・拘留・科料。今もこの名簿で覚えると、拘禁刑導入後は×。漢字は[[red:禁錮]]（禁固ではない）。拘留は短期の主刑で、拘禁刑とは別物。

■ なぜそうなる

一本化の趣旨は、作業の有無で刑種を切らず、受刑者の特性に応じて作業と指導を組み合わせ、改善更生・再犯防止を図る点にある。試験の穴埋めは「拘禁刑／再犯防止／応報刑論／目的刑論」が骨格。

■ ひっかけ

[[red:懲役＋禁固と足し算のように覚える]]、[[red:作業が常に義務]]、[[red:応報と目的の入れ替え]]、[[red:主刑にまだ懲役・禁錮がある]]、[[red:没収を主刑にする]]、[[red:拘留＝拘禁刑]]。

■ 暗記

拘禁＝一本化。作業は必ずではない。応報＝振り返る／目的＝これから防ぐ。主刑5＋付加刑の没収。`,
    practiceQuestion: {
      prompt: '拘禁刑と刑罰の種類について、正しいものはどれか。',
      choices: [
        '現行刑法の主刑は、死刑・懲役・禁錮・罰金・拘留・科料である。',
        '拘禁刑は懲役と禁錮を一本化した刑で、改善更生のため必要な作業又は指導を行うことができる。',
        '応報刑論は、将来の犯罪を防ぐことだけを理由に刑罰を正当化する。',
        '没収は主刑の一つであり、拘留は付加刑である。',
      ],
      answer: 1,
      explanation:
        '拘禁刑は懲役・禁錮の一本化（R7.6.1〜）。作業・指導は改善更生のため行い得る。応報は過去の報い、目的は将来の防止。現行の主刑は死刑・拘禁刑・罰金・拘留・科料。没収は付加刑。',
    },
  },
  2: {
    topic: '検察審査会',
    aim: '検審は誰が何人で、何を審査し、申立先はどこかまで言える。',
    rule: '検察審査会は、管轄区域内の衆議院議員の選挙権を有する者からくじで選定した11人の検察審査員で組織する（検察審査会法4条）。置く場所は政令で定める地方裁判所及び地方裁判所支部の所在地（1条）。審査の対象は検察官が公訴を提起しない処分（不起訴）の当否（2条）。申立先は、その検察官の属する検察庁の所在地を管轄する検察審査会（30条）。',
    trap: '控訴と公訴を取り違える。人数を裁判員の9（6+3）と取り違える。支所と支部を取り違える。検審だけが衆議院選挙の有権者、と思い込む。秘密漏示の刑を「50万円以下の懲役」と覚える。告訴期間経過で審査申立不可、と覚える。',
    memory: '検審＝衆議院選挙権者からくじの11人。不起訴（公訴を提起しない処分）を審査。申立先はその検察庁の所在地を管轄する検審。地裁・地裁支部。審査補助員は弁護士1人。秘密漏示は6月以下の拘禁刑又は50万円以下の罰金。',
    deepDive: `[[image:learn/kiso/kenshin-vs-saibanin]]

■ 結論

検察審査会は、検察官の[[red:公訴を提起しない処分（不起訴）]]の当否を、市民が審査する機関（検察審査会法2条1項1号）。「ゴーサインを出さなかったことへの不服」という理解は大筋正しいが、試験の言葉は[[red:控訴]]ではなく[[red:公訴]]。

構成は、当該検審の管轄区域内の衆議院議員の選挙権を有する者からくじで選定した11人（4条）。裁判員も衆議院選挙の選挙権者から選ぶ。検審だけが衆議院有権者、という切り方は×。

■ 申立は誰が・どこへ

申立できるのは、告訴・告発をした者、請求を待って受理すべき事件の請求をした者、犯罪により害を被った者（死亡時は配偶者・直系親族・兄弟姉妹）（2条2項・30条）。申立先は[[red:その検察官の属する検察庁の所在地を管轄する検察審査会]]。裁判所へ控訴する話ではない。

審査申立に法律上の期間制限はない。親告罪の告訴期間（刑訴235条）と混ぜない。ただし公訴時効は止まらないので、事実上は急ぐ。過半数の議決があれば職権でも審査できる（2条3項）。

■ 設置・補助・罰則

置く場所は政令で定める地方裁判所及び地方裁判所支部の所在地（1条）。[[red:支所]]ではなく[[red:支部]]。簡易裁判所には置かない。

審査補助員は、必要があるときに弁護士から事件ごとに委嘱でき、人数は1人（39条の2）。第2段階の再審査では必ず委嘱する（41条の4）。

秘密漏示は、6月以下の[[red:拘禁刑]]又は50万円以下の[[red:罰金]]（44条）。「6月以下の拘禁または50万円以下の懲役」は×。

起訴相当・起訴議決は8人以上（39条の5・41条の6）。通常の議事は過半数（27条）。

■ 裁判員との比較

| | 検察審査会 | 裁判員裁判（原則） |
|---|---|---|
| 人数 | **11人** | **合計9名**（裁判員6＋職業裁判官3） |
| 選任 | 衆議院選挙権者からくじ | 同じく有権者からくじ等 |
| 役割 | 不起訴の当否 | 重大刑事の第一審で有罪・量刑 |

■ ひっかけ

[[red:控訴を提起しない]]、[[red:11人と9人の入れ替え]]、[[red:地裁支所]]、[[red:秘密漏示＝50万円以下の懲役]]、[[red:告訴期間経過後は審査申立不可]]、[[red:審査補助員が常にいる／複数]]。

■ 暗記

検審＝くじ11人＝不起訴チェック。申立は管轄の検審。補助員は弁護士1人。漏示は拘禁刑又は罰金50万円。`,
    practiceQuestion: {
      prompt: '検察審査会について、誤っているものはどれか。',
      choices: [
        '管轄区域内の衆議院議員の選挙権を有する者からくじで選定した11人の検察審査員で組織される。',
        '告訴又は告発をした者は、検察官が控訴を提起しない処分に不服があるときに、審査を申し立てることができる。',
        '審査の申立ては、その検察官の属する検察庁の所在地を管轄する検察審査会にする。',
        '審査補助員は弁護士の中から事件ごとに委嘱でき、人数は1人である。秘密を漏らしたときは6月以下の拘禁刑又は50万円以下の罰金に処せられる。',
      ],
      answer: 1,
      explanation:
        '誤りは「控訴」。審査対象は検察官が公訴を提起しない処分（不起訴）。申立先はその検察庁の所在地を管轄する検察審査会。11人・衆議院選挙権・くじ。審査補助員は弁護士1人。秘密漏示は6月以下の拘禁刑又は50万円以下の罰金。',
    },
  },
  10: {
    topic: '行政代執行の対象',
    aim: '代執行が使える義務の種類を区別する。',
    rule: '行政代執行は、代替的作為義務（他人が代わりにできる行為義務）に使います。不作為義務や、本人にしかできない非代替的義務は代執行の対象になりません。',
    trap: 'あらゆる義務違反に代執行できると思い込む。',
    memory: '代執行は代替的作為義務だけ。不作為義務や非代替的義務には使えない。',
    deepDive:
      '代執行の流れは、戒告→令書→実行→費用徴収。不作為義務や本人にしかできない義務には使えない。',
    practiceQuestion: {
      prompt: '行政代執行について妥当なものはどれか。',
      choices: [
        '不作為義務の違反にも代執行できる。',
        '代替的作為義務の履行確保に用いられる。',
        '本人にしかできない義務でも常に代執行できる。',
        '代執行に戒告は不要である。',
      ],
      answer: 1,
      explanation: '代執行は代替的作為義務だけが対象。',
    },
  },
  12: {
    topic: '聴聞と弁明',
    aim: '聴聞と弁明の違いを短く言える。',
    rule: '聴聞では文書閲覧や参加人が問題になる。弁明は書面中心の手続として整理する。',
    trap: '聴聞と弁明の手続を同じものとして扱う。',
    memory: '聴聞は閲覧や参加人が出る。弁明は書面中心。',
  },
  27: {
    topic: '心裡留保と94条2項の第三者',
    aim: '心裡留保の効力和第三者保護の関係を整理する。',
    rule: '心裡留保は原則として有効です。ただし相手方が悪意または有過失のときは無効になり得ます。94条2項の第三者保護も、似た場面で一緒に問われます。',
    trap: '心裡留保を常に無効、または常に有効と決めつける。',
    memory: '心裡留保は原則有効。相手が悪意または有過失なら無効になり得る。',
    deepDive:
      '意思表示の瑕疵は、無効か取消しか、誰を保護するかを先に見る。心裡留保、虚偽表示、錯誤を同じ箱に入れない。',
    practiceQuestion: {
      prompt: '心裡留保について妥当なものはどれか。',
      choices: [
        '心裡留保による意思表示は常に無効である。',
        '原則有効だが、相手方が悪意または有過失なら無効となり得る。',
        '相手方の主観は結論に影響しない。',
        '94条2項の第三者保護は心裡留保と無関係なので無視してよい。',
      ],
      answer: 1,
      explanation: '心裡留保は原則有効。相手の悪意・有過失で無効になり得る。',
    },
  },
  41: {
    topic: '性同一性障害特例法の手術要件',
    aim: '令5.10.25の違憲判断の芯を短く言える。',
    rule: '特例法の手術要件は、制定当時は医学的・合理的と見られたが、医学の進展で症状や治療が多様になり、いまは医学的・合理的関連性を欠くとされた。',
    trap: '手術要件は今も当然に合理的、と覚える。',
    memory: '性同一性障害特例法の手術要件は、医学の進展で合理性を欠き違憲とされた。',
  },
  42: {
    topic: '行政罰と秩序罰',
    aim: '行政罰・秩序罰・過料の関係を短く言える。',
    rule: '行政罰は行政上の義務違反への制裁。軽い形式的違反には秩序罰があり、その例が過料。条例の過料手続は地方自治法による。',
    trap: '過料と罰金を同じものとして扱う。',
    memory: '行政罰の軽いものが秩序罰。秩序罰の例が過料。条例の過料は地方自治法の手続。',
  },
  43: {
    topic: '国の関与と地方自治',
    aim: '国の関与の限界を短く言える。',
    rule: '国の関与は地方自治の本旨に反しない範囲で、必要最小限度にとどまる。是正の指示など手段を混ぜない。',
    trap: '国は地方に何でも指示できる、と読む。',
    memory: '国の関与は必要最小限度。地方自治の本旨を外さない。',
  },
  44: {
    topic: '住民監査請求の資格',
    aim: '誰が住民監査請求できるかを短く言える。',
    rule: 'その普通地方公共団体の住民であれば、監査委員に住民監査請求ができ、その後に住民訴訟を提起できる。',
    trap: '選挙権がないと請求できない、と決めつける。',
    memory: '住民なら監査委員へ住民監査請求できる。その後に住民訴訟もできる。',
  },
  45: {
    topic: '抵当権に基づく妨害排除',
    aim: '抵当権者が明渡しを求める入口を短く言える。',
    rule: '占有により目的物の交換価値の実現が妨げられ、優先弁済請求権の行使が困難になる場合に、抵当権に基づく妨害排除が問題になる。',
    trap: '抵当権者は常に占有者へ明渡しを請求できる、と覚える。',
    memory: '抵当権の妨害排除は、交換価値の実現が妨げられ優先弁済が難しくなる場合。',
  },
  46: {
    topic: '賃借人の有益費償還',
    aim: '有益費をいつ・いくら請求できるかを短く言える。',
    rule: '賃借人の有益費は、賃貸借終了時に価額増加が残る場合に限り、支出額または増価額を請求できる。',
    trap: '有益費はいつでも全額請求できる、と覚える。',
    memory: '有益費は終了時に値上がりが残るときだけ。支出額か増価額を請求できる。',
  },
};

function buildTac1Topic(row) {
  const isDesc = row.answerRaw === '—' || row.answerRaw === '-' || !/^\d+$/.test(row.answerRaw);
  const mapped = mapTac1Field(row.fieldRaw, { isDesc });
  const ov = TAC1_OVERRIDES[row.questionNumber];
  const topic = ov?.topic || row.fieldRaw.replace(/^[^・]+・/, '') || `問${row.questionNumber}の論点`;
  const refs = extractRefs(row.core);
  const memory = polishMemory(ov?.memory || beginnerMemory(row.core, topic));
  const rule = ov?.rule || beginnerRule(row.core, topic);
  const trap = ov?.trap || `${topic}の結論を、例外や主語を無視して言い切る。`;
  const deepDive = ov?.deepDive || beginnerDeepDive(row.core, topic, refs);
  const practiceQuestion =
    ov?.practiceQuestion ||
    (isDesc ? buildDescriptivePractice(topic, memory) : buildPractice(topic, memory, trap));

  return {
    id: `tac1-q${String(row.questionNumber).padStart(2, '0')}-${slug(topic)}`,
    questionNumber: row.questionNumber,
    subject: mapped.subject,
    field: mapped.field,
    learnSubject: mapped.learnSubject,
    quizSubject: mapped.quizSubject,
    quizField: mapped.quizField,
    topic,
    aim: ov?.aim || `${topic}の結論とひっかけを短く言えるようにする。`,
    rule,
    trap,
    references: refs,
    memory,
    deepDive,
    practiceQuestion,
    sourceTrace: {
      answerSource: isDesc
        ? `TAC1 MD（記述・穴埋め・正解要確認）核心: ${row.core}`
        : `TAC1 MD 正解${row.answerRaw}／核心: ${row.core}`,
    },
    status: 'confirmed',
  };
}

/** TAC3 confirmed correct answers from kimi grading (1-based) */
const TAC3_CONFIRMED_ANSWER = {
  2: 2,
  4: 5,
  5: 1,
  8: 1,
  9: 3,
  13: 4,
  17: 1,
  19: 2,
  27: 3,
  31: 2,
  32: 2,
  57: 5,
  58: 1,
  59: 2,
  60: 5,
};

const TAC3_OVERRIDES = {
  1: {
    topic: '明治期の法制史',
    aim: 'オランダ法学からフランス・ドイツ法、戦後の米法影響までを時系列で言える。',
    rule: '明治初期の日本は、まずオランダ法学に触れ、その後フランス法・ドイツ法を継受して法制度を整備しました。民法草案にはボアソナードが関与し、法典論争を経て施行延期・修正へ進みます。戦後はアメリカ法の影響も加わります。',
    trap: 'オランダ・フランス・ドイツ・アメリカ法の時期を取り違える。',
    memory: '明治初期はオランダ法学から入る。民法はボアソナード、法典論争を経て修正。戦後は米法影響も加わる。',
  },
  3: {
    topic: '政教分離の判断枠組み',
    aim: '目的効果基準と総合考慮の使い分けを知る。',
    rule: '愛媛玉串料事件は目的効果基準で判断します。空知太神社・孔子廟では、経緯・利用状況・一般人の評価などを総合考慮する整理が重要です。',
    trap: '政教分離を「一切の接触禁止」と読む。',
    memory: '愛媛玉串料は目的効果基準。空知太、孔子廟は経緯や利用状況の総合考慮。',
    deepDive: `[[image:kenpou/tsu-jichinsai-4koma]]

[[image:kenpou/ehime-tamagushi-4koma]]

[[image:kenpou/sorachibuto-jinja-4koma]]

[[image:kenpou/koushibyo-soshou-4koma]]

■ 結論

愛媛玉串料は目的効果基準。空知太神社・孔子廟は経緯・利用状況・一般人評価などを総合考慮。政教分離の物差しを事件ごとに取り違えない。

■ 判例4コマ（政教分離・愛媛玉串料ほか）

友だちに話す感じで、流れだけ先に掴もう。

**1. まず何が起きた**

自治体が神社に玉串料などを公金で支出した。特定宗教への援助になるのでは、と住民らが争った（愛媛玉串料）。似た争いは、公有地の無償提供（空知太神社）や孔子廟でも出る。

**2. 言い分のぶつかり**

「公金で宗教にお金を出すのは政教分離違反」という方向と、「社交儀礼・文化的行為で宗教色は薄い」という方向がぶつかる。

**3. 裁判所が見た争点**

目的に宗教的意義があるか、効果として特定宗教を援助・促進・圧迫するか（目的効果基準）。事件によっては、経緯・利用状況・一般人の受け止めを総合考慮する型もある。

**4. 判決の着地（試験用の整理）**

愛媛玉串料は目的効果基準で整理。空知太・孔子廟は総合考慮の言い回しが重要。物差しを入れ替えない。

■ 試験で切るポイント

[[red:政教分離＝一切の接触禁止]]、は切る。

愛媛＝目的効果、空知太・孔子廟＝総合考慮、で固定。

■ 暗記

愛媛玉串料＝目的効果基準。空知太・孔子廟＝総合考慮。`,
  },
  4: {
    topic: '選挙権の主体と制限',
    aim: '外国人地方参政権と在外選挙制限を分ける。',
    rule: '外国人地方参政権は憲法上当然に保障されない。在外国民選挙権制限は、やむを得ない事由がない限り違憲となり得る。',
    trap: '外国人にも地方参政権が憲法上当然にある、と読む。',
    memory: '選挙権は主体と制限理由。外国人地方参政権、在外選挙、投票価値格差、重複立候補。',
    deepDive: `■ 結論

外国人地方参政権は憲法上当然に保障されない。在外国民選挙権制限は、やむを得ない事由がない限り違憲となり得る。主体と制限理由を分ける。

■ 判例4コマ（選挙権・在外選挙・外国人参政権）

友だちに話す感じで、流れだけ先に掴もう。

**1. まず何が起きた**

選挙に関わる制限が争われた。典型は、在外国民の投票制限や、外国人に地方選挙権があるか、という場面。

**2. 言い分のぶつかり**

「選挙権は大事な権利なのに制限しすぎ」という方向と、「国政・地方の性質や制度設計から制限は許される」という方向がぶつかる。

**3. 裁判所が見た争点**

誰の選挙権か（日本人か外国人か）。制限にやむを得ない事由があるか。投票価値の平等は「違憲状態」から合理的期間内に是正されたかも別軸。

**4. 判決の着地（試験用の整理）**

外国人地方参政権は憲法上当然保障ではない。在外国民の選挙権制限は、やむを得ない事由がない限り違憲となり得る。重複立候補制は直接選挙制違反ではない、もセット。

■ 試験で切るポイント

[[red:外国人にも地方参政権が憲法上当然にある]]、は切る。

主体（誰か）と制限理由を先に見る。

■ 暗記

外国人地方参政権＝当然保障なし。在外選挙制限＝やむを得ない事由が鍵。`,
  },
  8: {
    topic: '取消し・撤回・無効',
    aim: '行政行為の効力を動かす理由を区別する。',
    rule: '取消しは成立時の瑕疵を理由にする。撤回は後から出た事情を理由にする。無効は瑕疵が重大かつ明白な場合。',
    trap: '取消しと撤回、無効の理由を混ぜる。',
    memory: '取消しは初めからの瑕疵。撤回は後から出た事情。無効は重大明白な瑕疵。',
  },
  10: {
    topic: '行政代執行の対象',
    aim: '代執行が使える義務の種類を区別する。',
    rule: '代執行は代替的作為義務に使う。不作為義務や非代替的義務には使えない。',
    trap: 'あらゆる義務違反に代執行できると思い込む。',
    memory: '代執行は代替的作為義務だけ。不作為義務や非代替的義務には使えない。',
  },
  26: {
    topic: '住民監査請求と住民訴訟',
    aim: '監査請求前置と請求の型を固定する。',
    rule: '住民監査請求と住民訴訟は、誰が何をいつ請求できるかを先に見る。監査請求前置、期間、請求の型を混ぜない。',
    trap: '選挙権の有無だけで請求可否を決めつける。',
    memory: '住民監査と住民訴訟は、前置と期間と請求の型を先に確認する。',
  },
  41: {
    topic: '多肢選択の読み方',
    aim: '空欄前後から判断軸を拾う。',
    rule: '多肢選択は判例名より、空欄の前後にある目的・効果・必要性・審査密度を拾う。強い断定語は疑う。',
    trap: '空欄を見ずに判例名だけで選ぶ。',
    memory: '多肢選択は空欄の前後を読む。目的や効果、必要性を先に拾う。',
  },
  42: {
    topic: '行政罰と秩序罰',
    aim: '刑罰と過料を混ぜない。',
    rule: '行政罰のうち刑罰と、秩序罰である過料を分ける。手続は国の機関か地方公共団体の長かで変わる。',
    trap: '罰金と過料を同じものとして扱う。',
    memory: '行政罰の刑罰と、秩序罰の過料を混ぜない。手続の主体も分ける。',
  },
  43: {
    topic: '国の関与',
    aim: '是正の指示など手段を混ぜない。',
    rule: '国の関与は法定受託事務や是正の指示など手段を分け、地方自治の本旨と必要最小限度を意識する。',
    trap: '関与の手段名を入れ替える。',
    memory: '国の関与は是正の指示など手段を取り違えない。地方自治の本旨と必要最小限度を外さない。',
  },
  44: {
    topic: '住民監査請求の記述骨子',
    aim: '40字で骨組みを言える。',
    rule: '住民監査請求と住民訴訟の記述は、監査請求前置、請求先、請求類型、期間制限を骨組みにする。',
    trap: '前置や期間を落とす。',
    memory: '住民監査の記述は前置・請求先・請求の型・期間を骨組みにする。',
  },
  45: {
    topic: '抵当権妨害排除',
    aim: '明渡しまで求められる場合を短く言える。',
    rule: '抵当権妨害排除の入口は交換価値侵害。直接の明渡しは、所有者の管理不能など追加事情が必要なことが多い。',
    trap: '抵当権者は常に明渡しを請求できる、と覚える。',
    memory: '抵当権妨害排除は交換価値侵害が入口。明渡しは追加事情が要ることが多い。',
  },
  46: {
    topic: '賃貸借の費用償還',
    aim: '必要費と有益費を短く言える。',
    rule: '必要費は直ちに請求できる。有益費は終了時に価額増加が残る限度で請求する。',
    trap: '必要費と有益費の時期を入れ替える。',
    memory: '必要費はすぐに請求できる。有益費は終了時に値上がりが残るときだけ。',
  },
};

function normalizeLearnSubject(learnSubject) {
  const map = {
    '多肢選択:憲法': '多肢選択憲法',
    '多肢選択:行政法': '多肢選択行政法',
    多肢選択憲法: '多肢選択憲法',
    多肢選択行政法: '多肢選択行政法',
  };
  return map[learnSubject] || learnSubject;
}

function buildTac3Topic(card) {
  const learnSubject = normalizeLearnSubject(card.learnSubject);
  const quizSubject = QUIZ_SUBJECT_BY_LEARN[learnSubject] || learnSubject;
  const quizField = QUIZ_FIELD_BY_LEARN[learnSubject] || learnSubject;
  const ov = TAC3_OVERRIDES[card.questionNumber];
  const topic = ov?.topic || card.memoryRaw.slice(0, 18).replace(/[。、].*$/, '') || `問${card.questionNumber}`;
  const memory = polishMemory(ov?.memory || card.memoryRaw);
  const rule = ov?.rule || beginnerRule(card.memoryRaw, topic);
  const trap = ov?.trap || '主語や例外を飛ばした言い切りを選ぶ。';
  const refs = extractRefs(card.memoryRaw, card.statuteRef);
  const deepDive =
    ov?.deepDive ||
    beginnerDeepDive(card.memoryRaw, topic, refs) +
      (TAC3_CONFIRMED_ANSWER[card.questionNumber]
        ? `\n\n（参考）正解突合済み。本番の正解は ${TAC3_CONFIRMED_ANSWER[card.questionNumber]}。`
        : '');
  const isDesc = learnSubject.includes('記述') || (card.questionNumber >= 44 && card.questionNumber <= 46);
  const practiceQuestion = isDesc
    ? buildDescriptivePractice(topic, memory)
    : buildPractice(topic, memory, trap);

  return {
    id: `tac3-q${String(card.questionNumber).padStart(2, '0')}-${slug(topic)}`,
    questionNumber: card.questionNumber,
    subject: quizSubject,
    field: learnSubject,
    learnSubject,
    quizSubject,
    quizField,
    topic,
    aim: ov?.aim || `${topic}の判断軸を短く言えるようにする。`,
    rule,
    trap,
    references: refs,
    memory,
    deepDive,
    practiceQuestion,
    sourceTrace: {
      answerSource: TAC3_CONFIRMED_ANSWER[card.questionNumber]
        ? `TAC3既存カード＋君の教科書突合正解${TAC3_CONFIRMED_ANSWER[card.questionNumber]}`
        : 'TAC3既存ショートカード（正解番号は一部未突合）',
    },
    status: 'confirmed',
  };
}

function formatLearnDeepdive(t) {
  const d = String(t.deepDive || '');
  if (d.includes('■ 結論') || d.includes('■ 判例4コマ')) return d;
  return `■ 結論\n\n${t.rule}\n\n■ なぜそうなる\n\n${t.deepDive}\n\n■ ひっかけ\n\n[[red:${t.trap}]]\n\n■ 暗記\n\n${t.memory}`;
}

function emitBundle(exam, topics, label) {
  const confirmed = topics.filter((t) => t.status === 'confirmed');
  const bySubject = {};
  const bonus = {};

  for (const t of confirmed) {
    const learnSubject = t.learnSubject;
    const quizSubject = t.quizSubject;
    const quizField = t.quizField;

    (bySubject[learnSubject] ??= []).push({
      text: `【${label}・問${t.questionNumber}】${t.memory}`,
      deepdive: formatLearnDeepdive(t),
      fExplain: t.aim,
      statuteRef: (t.references || []).join('、'),
      source: `${label} 問${t.questionNumber}`,
    });

    bonus[quizSubject] ??= {};
    (bonus[quizSubject][quizField] ??= []).push({
      text: `【ボーナス${label}・問${t.questionNumber}系】${t.practiceQuestion.prompt}`,
      choices: t.practiceQuestion.choices,
      answer: [t.practiceQuestion.answer],
      explain: t.practiceQuestion.explanation,
      choiceExplanations: t.practiceQuestion.choices.map((_, i) =>
        i === t.practiceQuestion.answer
          ? `正解肢。${t.practiceQuestion.explanation}`
          : `誤答肢。${t.trap}`,
      ),
      isBonus: true,
      wordBank: '',
      memo: `${label}・${t.topic}`,
      slots: [],
    });
  }

  const mdLines = [
    '---',
    `id: creator/prep-school/${exam.examId}-topics`,
    'type: mock-exam-topic-index',
    `source: ${exam.title}`,
    `tags: [TAC, 模試, 論点, もっと深掘る, ボーナス問題]`,
    'validationStatus: confirmed',
    '---',
    '',
    `# ${exam.title} 論点インデックス`,
    '',
    '> 原文転載ではなく、出題された法律論点を学習用に再構成。',
    '',
    `- 構造化・アプリ接続済み: ${confirmed.length}論点`,
    '',
  ];
  const grouped = Object.groupBy(confirmed, (t) => t.learnSubject);
  for (const [s, ts] of Object.entries(grouped)) {
    mdLines.push(`## ${s}`, '');
    for (const t of ts) {
      mdLines.push(
        `### 問${t.questionNumber}：${t.topic}`,
        '',
        `- 出題の狙い: ${t.aim}`,
        `- 判断ルール: ${t.rule}`,
        `- ひっかけ: ${t.trap}`,
        `- 暗記: ${t.memory}`,
        '',
      );
    }
  }

  return { bySubject, bonus, mdLines, confirmed };
}

function writeJs(file, exportName, value) {
  const banner = '// Generated by scripts/buildTacTopicLearning.mjs. Edit topics JSON / this script.\n';
  fs.writeFileSync(file, banner + `export const ${exportName} = ${JSON.stringify(value, null, 2)};\n`);
}

// --- main ---
const tac1Rows = JSON.parse(fs.readFileSync(path.join(root, 'tmp/tac1-md-rows.json'), 'utf8'));
const tac3SourceCandidates = [
  path.join(root, 'data/moshi/tac3-short-cards-source.json'),
  path.join(root, 'tmp/tac3-short-cards.json'),
];
const tac3SourcePath = tac3SourceCandidates.find((p) => fs.existsSync(p));
if (!tac3SourcePath) throw new Error('TAC3 short cards source not found. Run tmpExtractTacSources.mjs first.');
const tac3Cards = JSON.parse(fs.readFileSync(tac3SourcePath, 'utf8'));

const tac1Topics = tac1Rows.map(buildTac1Topic);
const tac3Topics = tac3Cards.map(buildTac3Topic);

fs.mkdirSync(path.join(root, 'data/moshi'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'data/moshi/tac1-topics.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      examId: 'tac-2026-round1',
      title: 'TAC 全国公開模試 第1回（2026-06）',
      expectedQuestionCount: 57,
      topics: tac1Topics,
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  path.join(root, 'data/moshi/tac3-topics.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      examId: 'tac-2026-round3',
      title: 'TAC 全国公開模試 第3回',
      expectedQuestionCount: 60,
      topics: tac3Topics,
    },
    null,
    2,
  ),
);

const tac1 = emitBundle(
  { examId: 'tac-2026-round1', title: 'TAC 全国公開模試 第1回（2026-06）' },
  tac1Topics,
  'TAC第1回',
);
const tac3 = emitBundle(
  { examId: 'tac-2026-round3', title: 'TAC 全国公開模試 第3回' },
  tac3Topics,
  'TAC第3回',
);

writeJs(path.join(root, 'src/tac1_moshi_learn_content.js'), 'TAC1_MOSHI_LEARN_BY_SUBJECT', tac1.bySubject);
writeJs(path.join(root, 'src/tac1_moshi_bonus_questions.js'), 'TAC1_MOSHI_BONUS_QUESTIONS', tac1.bonus);
writeJs(path.join(root, 'src/tac3_moshi_learn_content.js'), 'TAC3_MOSHI_LEARN_BY_SUBJECT', tac3.bySubject);
writeJs(path.join(root, 'src/tac3_moshi_bonus_questions.js'), 'TAC3_MOSHI_BONUS_QUESTIONS', tac3.bonus);

fs.writeFileSync(
  path.join(root, 'data/knowledge/creator/prep-school/tac1-topics.md'),
  tac1.mdLines.join('\n') + '\n',
);
fs.writeFileSync(
  path.join(root, 'data/knowledge/creator/prep-school/tac3-topics.md'),
  tac3.mdLines.join('\n') + '\n',
);

console.log(`TAC1: ${tac1.confirmed.length} topics`);
console.log('  learn keys:', Object.keys(tac1.bySubject).join(', '));
console.log(
  '  bonus:',
  Object.entries(tac1.bonus)
    .map(([s, f]) => `${s}:{${Object.keys(f).join(',')}}`)
    .join(' | '),
);
console.log(`TAC3: ${tac3.confirmed.length} topics`);
console.log('  learn keys:', Object.keys(tac3.bySubject).join(', '));
console.log(
  '  bonus:',
  Object.entries(tac3.bonus)
    .map(([s, f]) => `${s}:{${Object.keys(f).join(',')}}`)
    .join(' | '),
);
