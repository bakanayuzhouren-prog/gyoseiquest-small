/**
 * TAC2 既存カード＋画像確認済み論点から topics / learn / bonus を生成。
 * 模試原文の転載はしない。初学者が読める短文にする。
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

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

function slug(s) {
  return String(s)
    .replace(/[^\w一-龥ぁ-んァ-ンー]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

function extractObjectLiteral(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const braceStart = src.indexOf('{', start);
  let depth = 0;
  let inStr = null;
  let escape = false;
  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inStr = ch;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  throw new Error('unclosed object');
}

function guessLearnSubject(text) {
  if (/裁判員|法解釈|拡張解釈|類推|縮小解釈|反対解釈/.test(text)) return '基礎法学';
  if (/GPS|傍受|国籍|芸術助成|弾劾|予算|決算|表現|憲法/.test(text)) return '憲法';
  if (/行政行為|裁量|代執行|公定力|取消|撤回/.test(text)) return '行政法総論';
  if (/聴聞|弁明|審査基準|意見公募|行政手続/.test(text)) return '行政手続法';
  if (/審査請求|不服|裁決|教示/.test(text)) return '行政不服審査法';
  if (/取消訴訟|処分性|原告適格|執行停止|義務付け|行訴/.test(text)) return '行政事件訴訟法';
  if (/国賠|営造物|損失補償/.test(text)) return '国家賠償法';
  if (/条例|公の施設|住民監査|地方自治|指定都市/.test(text)) return '地方自治法';
  if (/心裡|時効|意思表示|制限行為|無権代理/.test(text)) return '民法総則';
  if (/物権|抵当|留置|地役|占有|法定地上/.test(text)) return '民法物権';
  if (/詐害|相殺|代位|債権者/.test(text)) return '債権総論';
  if (/売買|賃貸|不法行為|請負|委任/.test(text)) return '債権各論';
  if (/相続|離婚|親権|家族|婚姻/.test(text)) return '家族法';
  if (/会社|株式|株主|取締役|商行為|運送/.test(text)) return '商法・会社法';
  if (/個人情報|情報公開|行政書士法|文章|時事/.test(text)) return '基礎知識';
  return '基礎法学';
}

function polishMemory(text) {
  let s = String(text || '')
    .replace(/^【TAC2】/, '')
    .trim();
  s = s
    .replace(/について、試験では「([^」]+)」を軸に判断する。言い切りや取り違えに注意する。/g, '$1')
    .replace(/初学者は結論の語だけ覚えず、誰に・いつ・何が起きるかをセットで押さえる。?/g, '')
    .replace(/で覚える。?/g, '。')
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

  if ((s.match(/、/g) || []).length >= 4 && (s.match(/。/g) || []).length <= 1) {
    const parts = s.replace(/。$/g, '').split('、').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 4) {
      const mid = Math.ceil(parts.length / 2);
      s = `${parts.slice(0, mid).join('、')}。${parts.slice(mid).join('、')}。`;
    }
  }

  if (!s.endsWith('。') && !s.endsWith('？') && !s.endsWith('！')) s += '。';
  s = s.replace(/両者。/g, '').replace(/。+/g, '。');
  return s.replace(/。。+/g, '。').replace(/^。/, '');
}

function beginnerMemory(text) {
  return polishMemory(text);
}

function buildPractice(topic, memory, trap) {
  return {
    prompt: `${topic}について、正しいものはどれか。`,
    choices: [
      `${topic}は、例外なく常に同じ結論になる。`,
      memory.length > 60 ? `${memory.slice(0, 58)}…` : memory,
      `${topic}では、主語や例外を確認しなくても結論が決まる。`,
      trap || `${topic}では、「できる」と「しなければならない」を区別しなくてよい。`,
    ],
    answer: 1,
    explanation: `正解は2。${memory}`,
  };
}

/** 画像で確認した TAC2 問1（裁判員）を初学者向けに固定 */
const TAC2_CONFIRMED_TOPICS = [
  {
    id: 'tac2-q01-saibanin-kousei',
    questionNumber: 1,
    learnSubject: '基礎法学',
    topic: '裁判員裁判の合議体の人数',
    aim: '原則は合計9名（内訳・例外・第一審）まで言える。',
    rule: '裁判員裁判の合議体は、原則として裁判官3人・裁判員6人の合計9名（裁判員法2条2項）。「裁判員が9名」ではない。争いがなく適当なときは裁判官1人・裁判員4人の合計5名になり得る（2条3項）。対象は地方裁判所の重大刑事の第一審であり、控訴審・上告審には裁判員は入らない。',
    trap: '「裁判員9名」。6と3の入れ替え。控訴審も裁判員。「18歳」だけ覚えて衆議院選挙権を落とす。',
    memory: '原則は合計9名（裁判員6＋職業裁判官3）。入口は衆議院選挙権（18歳以上）。第一審のみ。例外は4＋1の5名。',
    deepDive: `[[image:learn/kiso/saibanin-kousei]]

■ 結論

原則の合議体は職業裁判官3＋裁判員6＝合計9名（裁判員法2条2項）。裁判員は衆議院議員の選挙権を有する者から選任する（13条）。選挙権が18歳以上なので、入口は18歳以上になる。民事や軽微な刑事は対象外。対象事件の第一審（地方裁判所）に限る。

■ 例外

公訴事実に争いがなく適当なときは、裁判官1＋裁判員4＝合計5名（2条3項）。検察官・被告人・弁護人に異議がないことが必要。

■ ひっかけ

[[red:裁判員が9名]]、[[red:裁判員3＋裁判官6]]、[[red:控訴審・上告審も裁判員]]、[[red:全刑事・民事も対象]]。

■ 暗記

6＋3＝9。入口は衆議院選挙権。第一審だけ。`,
    references: ['裁判員法2条', '裁判員法13条'],
    practiceQuestion: {
      prompt: '裁判員裁判の合議体について、正しいものはどれか。',
      choices: [
        '原則は裁判員9名だけで審理する。',
        '原則は合計9名で、内訳は裁判員6名と職業裁判官3名である。控訴審には裁判員は参加しない。',
        '原則は裁判員6名と職業裁判官1名で審理する。',
        '重大事件なら控訴審でも裁判員が加わる。',
      ],
      answer: 1,
      explanation:
        '原則は合計9名（裁判員6＋職業裁判官3）。対象は地方裁判所の第一審。控訴審・上告審に裁判員は入らない。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問1／裁判員法2条・13条で解像度更新' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q01-saibanin-hyouketsu',
    questionNumber: 1,
    learnSubject: '基礎法学',
    topic: '裁判員裁判の評決',
    aim: '過半数に、裁判官と裁判員の双方の意見が要ることを知る。',
    rule: '裁判員の関与する判断（事実認定・法令の適用・量刑）は、構成裁判官及び裁判員の双方の意見を含む合議体の員数の過半数による（裁判員法67条1項）。試験の言い回しでは「過半数＋その中に職業裁判官1名以上」。裁判員だけの多数では足りない。法令の解釈と訴訟手続は裁判官のみ（6条2項）。',
    trap: '単なる多数決。3分の2。裁判員だけの過半数で足りる。職業裁判官1名と言って、双方要件を忘れる。',
    memory: '評決は過半数。その過半数に裁判官と裁判員の双方が入る。裁判員だけの多数では足りない。',
    deepDive: `■ 結論

法67条の本文は「構成裁判官及び裁判員の双方の意見を含む合議体の員数の過半数」。合計9名なら過半数は5。その5の中に裁判官が1人以上、かつ裁判員も入っていなければならない。

てらしぃメモの「職業裁判官1名の賛成が必要」は、試験でよく使う圧縮であり、裁判員だけの過半数では足りないという向きでは正しい。ただし条文は裁判官側だけでなく、双方が過半数に入ること。

■ ひっかけ

[[red:裁判員だけの過半数で足りる]]、[[red:全員一致]]、[[red:3分の2]]、[[red:法令の解釈も裁判員が決める]]。

■ 暗記

過半数＋双方。裁判員だけ多数は×。解釈・手続は職裁。`,
    references: ['裁判員法67条', '裁判員法6条'],
    practiceQuestion: {
      prompt: '裁判員裁判の評決について、正しいものはどれか。',
      choices: [
        '裁判員だけの過半数があれば、職業裁判官が反対でも決まる。',
        '過半数の意見によるが、その中に構成裁判官と裁判員の双方の意見が含まれていなければならない。',
        '必ず全員一致でなければ決まらない。',
        '3分の2以上の賛成があれば、職業裁判官の賛成は不要である。',
      ],
      answer: 1,
      explanation:
        '法67条は双方の意見を含む過半数。試験圧縮は「過半数＋職業裁判官1名以上」。裁判員だけの多数では足りない。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問1 肢イ／裁判員法67条で解像度更新' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q01-saibanin-gyouseishoshi',
    questionNumber: 1,
    learnSubject: '基礎法学',
    topic: '行政書士と裁判員の就職禁止',
    aim: '欠格・就職禁止・辞退を分けて、行政書士がなれるかを言える。',
    rule: '就職禁止（法15条）は国会議員・裁判官・検察官・弁護士・司法書士・弁理士・公証人・自衛官・知事・市町村長など。行政書士・社労士・税理士は15条に無いのでなり得る。地方議会議員は就職禁止ではなく、会期中に限り辞退できる（16条2号）。欠格（14条）は義務教育未了・拘禁刑以上の刑など、別枠。',
    trap: '行政書士もなれない。法律専門職は全部ダメ。地方議会議員は絶対なれない。欠格と就職禁止と辞退を混ぜる。',
    memory: '弁護士・司法書士は就職禁止。行政書士・社労士・税理士はなり得る。地方議会は会期中の辞退。',
    deepDive: `■ 結論

試験で「なれない職業」として並べる国会議員・裁判官・検察官・弁護士・司法書士は、欠格（14条）ではなく就職禁止（15条）。行政書士・社会保険労務士・税理士は15条に無い。なり得る。

■ 地方議会議員

「除く（なれる）」は大筋○。ただし会期中は辞退の申立てができる（16条2号）。「必ずなれない」も「会期中でも辞退できない」も×。

■ ひっかけ

[[red:行政書士も就職禁止]]、[[red:地方議会議員は絶対ダメ]]、[[red:欠格＝職業リスト]]。

■ 暗記

士業でも司法書士は×、行政書士は○。地方議会は辞退。`,
    references: ['裁判員法14条', '裁判員法15条', '裁判員法16条'],
    practiceQuestion: {
      prompt: '裁判員の資格について、正しいものはどれか。',
      choices: [
        '行政書士は、裁判員になることが法律上禁止されている。',
        '行政書士・税理士・社労士は就職禁止事由に含まれないので、なり得る。司法書士は就職禁止である。',
        '地方議会議員は、会期中かどうかにかかわらず裁判員になれない。',
        '弁護士は裁判員になれるが、司法書士はなれない。',
      ],
      answer: 1,
      explanation:
        '就職禁止（15条）に弁護士・司法書士は入る。行政書士・税理士・社労士は入らない。地方議会議員は就職禁止ではなく、会期中の辞退（16条）。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問1／裁判員法14〜16条で解像度更新' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q01-saibanin-karyo',
    questionNumber: 1,
    learnSubject: '基礎法学',
    topic: '裁判員の出頭と過料',
    aim: '正当な理由なく出頭しないときの過料を言える。',
    rule: '呼出しを受けた裁判員候補者が正当な理由なく出頭しないとき、裁判員が正当な理由なく公判期日に出頭しないときなどは、10万円以下の過料（裁判員法112条）。質問票の虚偽や正当な理由なく陳述を拒むと30万円以下の過料（111条）。懲役・罰金ではない。',
    trap: '罰金・拘禁刑と覚える。理由がなくても自由に拒否できる。過料額を検審の罰金と混ぜる。',
    memory: '正当な理由なく出頭しないと10万円以下の過料。虚偽・陳述拒否は30万円以下の過料。刑罰ではない。',
    deepDive: `■ 結論

出頭義務がある。正当な理由なく拒むと10万円以下の過料（112条）。これは刑罰（懲役・罰金）ではない。検審の秘密漏示（拘禁刑又は罰金）と混ぜない。

■ ひっかけ

[[red:罰金10万円]]、[[red:50万円以下の懲役]]、[[red:理由なく拒否してよい]]。

■ 暗記

不出頭＝過料10万円。刑罰ではない。`,
    references: ['裁判員法112条', '裁判員法111条'],
    practiceQuestion: {
      prompt: '裁判員の出頭義務について、正しいものはどれか。',
      choices: [
        '正当な理由がなく出頭しなくても制裁はない。',
        '正当な理由がなく出頭しないときは、10万円以下の過料に処せられることがある。',
        '正当な理由がなく出頭しないときは、6月以下の拘禁刑又は50万円以下の罰金である。',
        '裁判員候補者は、気が進まなければ理由なく出頭を拒否できる。',
      ],
      answer: 1,
      explanation:
        '法112条は正当な理由なく出頭しないときに10万円以下の過料。検審の秘密漏示の罰則と混ぜない。',
    },
    sourceTrace: { answerSource: 'てらしぃ復習＋裁判員法112条で追加' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q06-kaishaku-shihyo',
    questionNumber: 6,
    learnSubject: '基礎法学',
    topic: '法解釈の資料と指針',
    aim: '立法者意思と法的安定性が、唯一の答えではなく考慮資料だと言える。',
    rule: '法の解釈では、条文の文言が出発点。立法者の意思は重要な資料の一つだが、それだけに縛られない。法的安定性（予測可能性）も考慮する。同時に具体的妥当性との調和を見る。文理解釈が基本で、趣旨・目的を踏まえるのが論理解釈。',
    trap: '立法者意思が唯一絶対。法的安定性だけ見れば足りる。文言を無視して結論を決める。',
    memory: '立法者意思は重要資料の一つ。法的安定性も考慮。文言が出発点。絶対唯一ではない。',
    deepDive: `■ 結論

てらしぃメモの「立法者の意思も重要な資料」「法的安定性を考慮」はどちらも○。ポイントは「も」「考慮」。立法者意思だけ、法的安定性だけで切らない。

■ 整理

文理解釈＝文言どおり。論理解釈＝趣旨・目的を踏まえて拡張・縮小・類推・反対・もちろん。資料は立法者意思・立法過程・判例・学説。指針は法的安定性と具体的妥当性の調和。

■ ひっかけ

[[red:立法者意思が唯一の正解]]、[[red:安定性のためなら不当な結論でもよい]]、[[red:刑法でも類推してよい]]。

■ 暗記

意思も資料。安定性も考慮。出発点は文言。`,
    references: [],
    practiceQuestion: {
      prompt: '法の解釈について、正しいものはどれか。',
      choices: [
        '立法者の意思が分かれば、文言や法的安定性は無視してよい。',
        '立法者の意思は重要な資料の一つであり、法的安定性も考慮する。文言が解釈の出発点である。',
        '法的安定性のためなら、具体的に不当な結論でも常に維持する。',
        '刑法では、罪刑法定主義の下でも類推解釈が原則として許される。',
      ],
      answer: 1,
      explanation:
        '立法者意思は重要資料だが唯一ではない。法的安定性も考慮する。刑法の類推は罪刑法定主義から原則禁止。',
    },
    sourceTrace: { answerSource: 'てらしぃ復習・TAC2法解釈／通説整理' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q06-kaishaku-rei',
    questionNumber: 6,
    learnSubject: '基礎法学',
    topic: '拡張・類推・縮小・反対解釈の具体例',
    aim: '定番具体例で4類型を聞き分けられる。',
    rule: '拡張＝717条の土地の工作物に工場内の据付機械を含める。類推＝768条の財産分与を内縁解消に及ぼす。縮小＝177条の第三者を、当事者・包括承継人以外で登記欠缺を主張する正当な利益を有する者に限る。反対＝条文がAだけ定めるならA以外は反対の結論。',
    trap: '拡張と類推の入れ替え。177条を拡張と覚える。内縁財産分与を拡張と覚える。刑法でも類推OK。',
    memory: '工作物に工場機械＝拡張。内縁に財産分与＝類推。177条第三者＝縮小。書いてない側は逆＝反対。',
    deepDive: `[[image:learn/kiso/kaishaku-4type]]

■ 結論

拡張は文言の枠の中を広く。類推は文言の外の似た事へ橋をかける。縮小は広すぎる文言を絞る。反対は書いてない側を逆にする。

■ 定番具体例

**拡張解釈**
- 民法717条「土地の工作物」に、工場内に据え付けられた機械を含める。
- 同じく工作物にエレベーターや軌道施設（電車）を含める方向。
- 刑法では拡張は許され得るが、類推は罪刑法定主義で原則禁止。

**類推解釈**
- 民法768条の離婚時財産分与を、内縁の解消にも及ぼす（最判昭33.4.11）。「離婚」の文言の外なので拡張ではない。
- 民法94条2項の類推適用（権利の外観を信頼した第三者保護）。

**縮小解釈**
- 民法177条の「第三者」＝当事者およびその包括承継人以外の者で、登記の欠缺を主張する正当な利益を有する者（大連判明41.12.15）。日常語の第三者より狭い。
- てらしぃメモの「包括承継人以外の正当な利益」は芯だが、当事者除外と「登記の欠缺を主張する」が抜けると不完全。

**反対解釈**
- 「未成年者は法定代理人の同意が必要」→ 成年者にはこの規定上は同意不要。
- 行政代執行法1条の対象を代執行に限ると読み、即時強制は同法の義務履行確保手段ではない、と切る型。

**もちろん解釈（補）**
- 公園に車進入禁止とあれば、より危険な飛行機の進入は当然禁止、と読む。

■ ひっかけ

[[red:工場機械＝類推]]、[[red:内縁財産分与＝拡張]]、[[red:177条第三者＝拡張]]、[[red:刑法でも類推してよい]]。

■ 暗記

中を広く＝拡張。外へ橋＝類推。狭める＝縮小。書いてない側は逆＝反対。`,
    references: ['民法717条', '民法768条', '民法177条'],
    practiceQuestion: {
      prompt: '法の解釈の具体例について、誤っているものはどれか。',
      choices: [
        '民法717条の土地の工作物に、工場内に据え付けられた機械を含めるのは拡張解釈である。',
        '民法768条の財産分与を内縁の解消に及ぼすのは拡張解釈である。',
        '民法177条の第三者を、当事者・包括承継人以外で登記欠缺を主張する正当な利益を有する者に限るのは縮小解釈である。',
        '条文が特定の場合だけを定めるとき、それ以外に反対の結論を導くのは反対解釈である。',
      ],
      answer: 1,
      explanation:
        '誤りは「内縁への財産分与＝拡張」。離婚の明文の外の類似なので類推解釈。工場機械＝拡張、177条第三者＝縮小、書いてない側は逆＝反対。',
    },
    sourceTrace: { answerSource: 'てらしぃ復習・TAC2法解釈／判例定番例で解像度更新' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q41-chousha-shuukai',
    questionNumber: 41,
    learnSubject: '多肢選択憲法',
    topic: '庁舎利用と集会の自由',
    aim: '庁舎利用拒否の判断軸を短く言える。',
    rule: '庁舎の利用拒否は、管理上の支障が具体的に認められるときに問題になる。公務員の職務の政治的中立性が害されるおそれも、管理上の支障になり得る。集会の自由は民主主義社会で重要だが、公共の福祉のため必要かつ合理的な制限はあり得る。',
    trap: '庁舎なら政治的中立を理由に常に拒否できる、と覚える。',
    memory: '庁舎利用の拒否は管理上の支障が具体的なとき。政治的中立性の維持も支障になり得る。',
    deepDive:
      '最判令5.2.21型。空欄は管理・中立性・民主主義・合理的が芯。集会の自由は重要だが、庁舎管理と政治的中立の具体的支障があれば制限され得る。',
    references: ['憲法21条1項', '最判令5.2.21'],
    practiceQuestion: {
      prompt: '庁舎の利用拒否と集会の自由について、妥当なものはどれか。',
      choices: [
        '庁舎の利用は、政治的意見を述べる集会なら常に拒否できる。',
        '管理上の支障が具体的に認められるときは拒否し得る。政治的中立性の維持も支障になり得る。',
        '集会の自由は絶対で、庁舎管理を理由に制限できない。',
        '政治的中立性は、庁舎管理とは無関係なので拒否理由にならない。',
      ],
      answer: 1,
      explanation:
        '管理上の支障が具体的に認められるとき拒否し得る。政治的中立性の維持も支障になり得る。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問41 ア管理・イ中立性・ウ民主主義・エ合理的' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q42-fukyu-joukyu',
    questionNumber: 42,
    learnSubject: '多肢選択行政法',
    topic: '不作為の審査請求先と応答義務',
    aim: '誤った審査請求先では応答義務が生じないことを言える。',
    rule: '不作為についての審査請求は、原則として上級行政庁に対してする。監督関係のない知事へ出しても、本来の不作為庁に応答義務は生じない。その場合、不作為の違法確認の訴えは不適法となり得る。',
    trap: '審査請求先を間違えても補正すれば常に適法になる、と覚える。',
    memory: '審査請求は上級行政庁へ。監督関係がない相手へ出しても応答義務は生じない。',
    deepDive:
      '最判令3.1.22。ア上級行政庁、イ不作為の違法確認の訴え、ウ応答義務、エ不適法。誤った請求先では応答義務がなく、訴訟も不適法になり得る。',
    references: ['行政不服審査法4条1号', '行訴法3条5項', '最判令3.1.22'],
    practiceQuestion: {
      prompt: '不作為についての審査請求と訴訟について、妥当なものはどれか。',
      choices: [
        '監督関係のない知事へ審査請求すれば、本来の不作為庁にも応答義務が生じる。',
        '審査請求は原則として上級行政庁へする。監督関係がない相手へ出しても応答義務は生じない。',
        '審査請求先を間違えても、不作為の違法確認の訴えは常に適法である。',
        '不作為の違法確認の訴えは、審査請求なしで常に提起できる。',
      ],
      answer: 1,
      explanation:
        '審査請求は原則上級行政庁へ。監督関係がない相手へ出しても応答義務は生じない。',
    },
    sourceTrace: {
      answerSource: 'TAC2解答画像 問42 ア上級行政庁・イ不作為の違法確認の訴え・ウ応答義務・エ不適法',
    },
    status: 'confirmed',
  },
  {
    id: 'tac2-q43-sashitome-yoken',
    questionNumber: 43,
    learnSubject: '多肢選択行政法',
    topic: '差止めの訴えの訴訟要件',
    aim: '差止めの訴えの入口要件を短く言える。',
    rule: '差止めの訴えの訴訟要件として、一定の処分がされる蓋然性があることと、重大な損害を生ずるおそれがあることが必要である。事後に取消訴訟と執行停止で容易に救済できるなら、差止めは認めにくい。',
    trap: '差止めの損害文言を「償うことのできない損害」と取り違える。',
    memory: '差止めは処分の蓋然性と重大な損害のおそれが入口。事後の執行停止で足りるなら認めにくい。',
    deepDive:
      '最判平24.2.9。ア訴訟要件、イ蓋然性、ウ重大な損害、エ執行停止。仮の差止めの「償うことのできない損害」と混ぜない。',
    references: ['行訴法3条7項', '行訴法37条の4', '最判平24.2.9'],
    practiceQuestion: {
      prompt: '差止めの訴えについて、妥当なものはどれか。',
      choices: [
        '差止めの訴えでは、償うことのできない損害のおそれが訴訟要件である。',
        '処分がされる蓋然性と、重大な損害を生ずるおそれが訴訟要件となる。',
        '執行停止で救済できる場合でも、差止めは常に認められる。',
        '差止めの訴えに、処分の蓋然性は不要である。',
      ],
      answer: 1,
      explanation: '差止めは蓋然性と重大な損害のおそれが入口。執行停止で足りるなら認めにくい。',
    },
    sourceTrace: {
      answerSource: 'TAC2解答画像 問43 ア訴訟要件・イ蓋然性・ウ重大な損害・エ執行停止',
    },
    status: 'confirmed',
  },
  {
    id: 'tac2-q44-torikeshi-riyuu',
    questionNumber: 44,
    learnSubject: '行政法記述',
    topic: '取消しの理由の制限',
    aim: '自己の利益と無関係な違法主張の帰結を言える。',
    rule: '取消訴訟では、自己の法律上の利益に関係のない違法を理由に取消しを求めることはできない。そのような主張だけのときは、却下ではなく棄却判決となる。',
    trap: '原告適格があるなら、どんな違法事由でも主張できると覚える。却下と棄却を取り違える。',
    memory: '自己の法律上の利益に関係のない違法を理由とする取消し主張は、棄却される。',
    deepDive:
      '行訴法10条1項。原告適格があっても、公益のみを守る規定違反を理由には取消しを求められない。判決は棄却。',
    references: ['行訴法10条1項'],
    practiceQuestion: {
      prompt: '取消訴訟における違法事由の主張について、妥当なものはどれか。',
      choices: [
        '原告適格があれば、自己の利益と無関係な違法でも取消しを求められる。',
        '自己の法律上の利益に関係のない違法を理由とする主張は、棄却される。',
        '自己の利益と無関係な違法主張だけのときは、常に却下される。',
        '公益規定の違反は、周辺住民なら常に取消し理由になる。',
      ],
      answer: 1,
      explanation:
        '自己の法律上の利益に関係のない違法を理由とする取消し主張は棄却される。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問44 解答例（棄却判決）' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q45-shichiken-sokuji',
    questionNumber: 45,
    learnSubject: '民法記述',
    topic: '質権の即時取得',
    aim: '質権の即時取得の要件を短く言える。',
    rule: '動産の質権でも、取引行為により平穏かつ公然と占有を始め、善意無過失であれば、即時取得により質権を取得できる。',
    trap: '所有者でない者からの質入れは常に無効、と覚える。',
    memory: '取引行為により平穏かつ公然と占有を始め、善意無過失なら質権を即時取得できる。',
    deepDive:
      '民法192条・359条。要件は取引行為、平穏・公然、占有開始、善意無過失。効果は質権の即時取得。',
    references: ['民法192条', '民法359条'],
    practiceQuestion: {
      prompt: '質権の即時取得について、妥当なものはどれか。',
      choices: [
        '所有者でない者から質入れを受けた場合、質権は常に成立しない。',
        '取引行為により平穏かつ公然と占有を始め、善意無過失なら質権を即時取得できる。',
        '即時取得には悪意でも足りる。',
        '質権には即時取得の規定は及ばない。',
      ],
      answer: 1,
      explanation:
        '取引行為により平穏かつ公然と占有を始め、善意無過失なら質権を即時取得できる。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問45 解答例（質権の即時取得）' },
    status: 'confirmed',
  },
  {
    id: 'tac2-q46-kitaku-kaijo',
    questionNumber: 46,
    learnSubject: '民法記述',
    topic: '書面の無報酬寄託の解除',
    aim: '書面の無報酬寄託で受寄者が解除できる場合を言える。',
    rule: '書面による無報酬の寄託では、受寄者は、相当の期間を定めて引渡しを催告し、その期間内に引渡しがないときに契約を解除できる。',
    trap: '書面の無報酬寄託でも、受寄者はいつでも自由に解除できる、と覚える。',
    memory: '書面の無報酬寄託では、相当期間を定めて引渡しを催告し、期間内にないときに解除できる。',
    deepDive:
      '民法657条の2。無報酬寄託でも書面があると自由解除は制限される。受寄者は催告と期間徒過が鍵。',
    references: ['民法657条', '民法657条の2'],
    practiceQuestion: {
      prompt: '書面による無報酬の寄託契約の解除について、妥当なものはどれか。',
      choices: [
        '受寄者は、書面の有無にかかわらずいつでも自由に解除できる。',
        '相当の期間を定めて引渡しを催告し、期間内に引渡しがないときに解除できる。',
        '寄託物の引渡し前なら、催告なしで常に解除できる。',
        '無報酬の寄託では、書面があっても催告は不要である。',
      ],
      answer: 1,
      explanation:
        '書面の無報酬寄託では、相当期間を定めて引渡しを催告し、期間内にないときに解除できる。',
    },
    sourceTrace: { answerSource: 'TAC2解答画像 問46 解答例（催告と期間徒過）' },
    status: 'confirmed',
  },
];

function cardToTopic(card, index) {
  const text = String(card.text || '').replace(/^【TAC2】/, '').trim();
  const learnSubject = card.learnSubject || guessLearnSubject(text);
  const topic = text.slice(0, 24).replace(/[。、].*$/, '') || `TAC2論点${index + 1}`;
  const memory = polishMemory(text);
  const trap = '主語や例外を飛ばした言い切りを選ぶ。';
  return {
    id: `tac2-card-${String(index + 1).padStart(2, '0')}-${slug(topic)}`,
    questionNumber: card.questionNumber || index + 1,
    subject: QUIZ_SUBJECT_BY_LEARN[learnSubject] || learnSubject,
    field: learnSubject,
    learnSubject,
    quizSubject: QUIZ_SUBJECT_BY_LEARN[learnSubject] || learnSubject,
    quizField: QUIZ_FIELD_BY_LEARN[learnSubject] || learnSubject,
    topic,
    aim: `${topic}の結論を短く言えるようにする。`,
    rule: polishMemory(text),
    trap,
    references: card.statuteRef ? String(card.statuteRef).split(/\s+/).filter(Boolean) : [],
    memory,
    deepDive: String(card.deepdive || '').includes('■ 判例4コマ')
      ? String(card.deepdive)
      : [polishMemory(text), '主語、要件、効果、例外の順で読む。'].join('\n\n'),
    practiceQuestion: buildPractice(topic, memory, trap),
    sourceTrace: { answerSource: card.source || 'TAC第2回既存カード' },
    status: 'confirmed',
  };
}

function formatLearnDeepdive(t) {
  const d = String(t.deepDive || '');
  if (d.includes('■ 結論') || d.includes('■ 判例4コマ')) return d;
  return `■ 結論\n\n${t.rule}\n\n■ なぜそうなる\n\n${t.deepDive}\n\n■ ひっかけ\n\n[[red:${t.trap}]]\n\n■ 暗記\n\n${t.memory}`;
}

function emitBundle(topics, label) {
  const bySubject = {};
  const bonus = {};
  for (const t of topics) {
    const learnSubject = t.learnSubject;
    const quizSubject = t.quizSubject || QUIZ_SUBJECT_BY_LEARN[learnSubject] || learnSubject;
    const quizField = t.quizField || QUIZ_FIELD_BY_LEARN[learnSubject] || learnSubject;
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
  return { bySubject, bonus };
}

function writeJs(file, exportName, value) {
  const banner = '// Generated by scripts/buildTac2TopicLearning.mjs. Edit topics JSON / this script.\n';
  fs.writeFileSync(file, banner + `export const ${exportName} = ${JSON.stringify(value, null, 2)};\n`);
}

// --- extract TAC2 cards from tac_learn_content.js ---
const src = fs.readFileSync(path.join(root, 'src/tac_learn_content.js'), 'utf8');
const objSrc = extractObjectLiteral(src, 'export const TAC_LEARN_BY_SUBJECT =');
const bySubject = Function(`"use strict"; return (${objSrc});`)();
const tac2Cards = [];
for (const [learnSubject, cards] of Object.entries(bySubject)) {
  for (const c of cards) {
    if (!String(c.text || '').includes('【TAC2')) continue;
    if (String(c.text || '').includes('【TAC2問')) continue;
    tac2Cards.push({
      ...c,
      learnSubject,
      text: String(c.text || ''),
    });
  }
}

const fromCards = tac2Cards.map((c, i) => cardToTopic(c, i));
// 画像確認済みの問1系を先頭に置き、カード由来の裁判員重複は後段に残す（学習の厚み）
const topics = [
  ...TAC2_CONFIRMED_TOPICS.map((t) => ({
    ...t,
    subject: QUIZ_SUBJECT_BY_LEARN[t.learnSubject] || t.learnSubject,
    field: t.learnSubject,
    quizSubject: QUIZ_SUBJECT_BY_LEARN[t.learnSubject] || t.learnSubject,
    quizField: QUIZ_FIELD_BY_LEARN[t.learnSubject] || t.learnSubject,
  })),
  ...fromCards,
];

fs.mkdirSync(path.join(root, 'data/moshi'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'data/moshi/tac2-topics.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      examId: 'tac-2026-round2',
      title: 'TAC 全国公開模試 第2回',
      expectedQuestionCount: 60,
      note: '問1と問41-46は解答画像で確認。他は既存TAC2カードを初学者向けに再構成。全問OCR突合は未完了。',
      topics,
    },
    null,
    2,
  ),
);

const bundle = emitBundle(topics, 'TAC第2回');
writeJs(path.join(root, 'src/tac2_moshi_learn_content.js'), 'TAC2_MOSHI_LEARN_BY_SUBJECT', bundle.bySubject);
writeJs(path.join(root, 'src/tac2_moshi_bonus_questions.js'), 'TAC2_MOSHI_BONUS_QUESTIONS', bundle.bonus);

const md = [
  '---',
  'id: creator/prep-school/tac2-topics',
  'type: mock-exam-topic-index',
  'source: TAC 全国公開模試 第2回',
  'tags: [TAC, 模試, 論点, もっと深掘る, ボーナス問題]',
  'validationStatus: needs_review',
  '---',
  '',
  '# TAC 全国公開模試 第2回 論点インデックス',
  '',
  '> 原文転載ではなく、出題された法律論点を学習用に再構成。',
  '',
  `- 構造化・アプリ接続済み: ${topics.length}論点（うち画像確認の問1系 3、問41-46系 6）`,
  '',
];
for (const t of topics.filter((x) => x.questionNumber === 1 || (x.questionNumber >= 41 && x.questionNumber <= 46))) {
  md.push(`### 問${t.questionNumber}：${t.topic}`, '', `- 暗記: ${t.memory}`, '');
}
fs.writeFileSync(path.join(root, 'data/knowledge/creator/prep-school/tac2-topics.md'), md.join('\n') + '\n');

console.log(
  `TAC2: ${topics.length} topics (confirmed image q1: 3, q41-46: 6, from cards: ${fromCards.length})`,
);
console.log('learn keys:', Object.keys(bundle.bySubject).join(', '));
