// For Expo we usually use process.env via babel-dotenv or expo-constants.
// However, since this is a utility potentially used by scripts (Node) and App (Expo), we need to be careful.
// Let's rely on passed-in key or typical process.env for now.
// For the purpose of the script, I will assume process.env is populated by dotenv.

interface ExplanationRequest {
  problem: string;
  limb: string;
  article: string;
  correctness: string; // "正解" or "不正解" or "妥当である"
}

export const generateExplanation = async (
  apiKey: string,
  request: ExplanationRequest
): Promise<string> => {
  const { problem, limb, article, correctness } = request;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `
【システム指示】
あなたは行政書士試験の専門講師です。与えられた「問題」「肢」「正誤」「条文」を元に、受験生が深く納得できる解説を作成してください。

【入力データ】
・問題：${problem}
・肢：${limb}
・正解の判断：${correctness}
・根拠条文：${article}

【出力ルール】

1. **結論をズバッと**: 冒頭に「本肢は【${correctness}】です。」と書く。（※【】の中身は入力データの正誤判断に従う）
2. **理由の言語化**: 条文（${article}）のどの文言が、問題文（あるいは肢）のどこに対応しているかを明確にする。
3. **専門用語の翻訳**: 「つまり、〇〇という意味です」と、平易な言葉で補足する。
4. **視覚的工夫**: 重要なキーワードは **太字** で囲む。
5. **トーン**: 講師として少し厳しくも情熱的、かつ分かりやすく。「てらしぃ」さん（ユーザー）に向けた語りかけは不要だが、講師としての威厳を持つこと。
`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Failed to generate explanation:", error);
    throw error;
  }
};

/** 記述スコープ: 択一問題から記述式問題を生成 */
export const generateDescriptiveQuestion = async (
  apiKey: string,
  params: { problemText: string; choices: string[]; selectedChoiceText: string }
): Promise<{ question: string; modelAnswer: string }> => {
  const { problemText, choices, selectedChoiceText } = params;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `【指示】
公務員試験・資格試験の択一問題を、記述式問題に変換してください。

【元の問題文】
${problemText}

【選択肢】
${choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}

【ユーザーが選択した肢】
${selectedChoiceText}

【出力ルール】
1. 上記択一問題の趣旨・争点を踏まえ、同じ知識を問う「記述式の問題」を1問作成する
2. 40字程度で答えられる形式（「〇〇とは何か、40字程度で記述せよ」など）
3. 模範解答も作成する（選択肢の内容を要約した形で、40字前後）

【出力形式】必ず次のJSONのみを1行で出力。他に説明は書かないこと。
{"question": "記述式の問題文", "modelAnswer": "模範解答（40字前後）"}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
  }
  const data = await response.json();
  let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  rawText = rawText.replace(/^```json\s*/i, '').replace(/\s*```\s*$/, '').trim();
  let parsed: { question?: string; modelAnswer?: string };
  try {
    parsed = JSON.parse(rawText) as { question?: string; modelAnswer?: string };
  } catch {
    parsed = {};
  }
  return {
    question: typeof parsed.question === 'string' ? parsed.question : '記述問題を生成できませんでした。',
    modelAnswer: typeof parsed.modelAnswer === 'string' ? parsed.modelAnswer : selectedChoiceText,
  };
};

/** 模範図: 問題文から関係図（Mermaid）を生成 */
export const generateDiagramMermaid = async (
  apiKey: string,
  params: { problemText: string }
): Promise<string> => {
  const { problemText } = params;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `【指示】
以下の法律・資格試験の問題文を読み、登場人物（A, B, C など）の関係を Mermaid flowchart で図示してください。

【問題文】
${problemText}

【厳守ルール】
1. 必ず flowchart LR で始める（1行目）
2. ノードIDは英数字のみ: A, B, C, D
3. 矢印は A --> B の形式のみ。ラベルは付けない（|xxx| は使わない）
4. 1行1本の矢印。例: A --> B
5. 出力は Mermaid コードのみ。説明・\`\`\` は不要。

【正しい例】
flowchart LR
  A --> B
  B --> C
  C --> A`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
  }
  const data = await response.json();
  let raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  raw = raw.replace(/^```mermaid\s*/i, '').replace(/\s*```\s*$/, '').trim();
  // 構文エラー防止: ラベル付き矢印・特殊文字を除去し、安全な形式に正規化
  const lines = raw.split('\n').filter((l: string) => l.trim());
  const safe: string[] = ['flowchart LR'];
  for (const line of lines) {
    const t = line.trim();
    if (/^flowchart\s/i.test(t)) continue;
    // A --> B または A -->|label| B を A --> B に簡略化
    const m = t.match(/^([A-Za-z0-9]+)\s*-->\s*(?:\|[^|]*\|)?\s*([A-Za-z0-9]+)/) || t.match(/^([A-Za-z0-9]+)\s*-->\s*([A-Za-z0-9]+)/);
    if (m) safe.push(`  ${m[1]} --> ${m[2]}`);
  }
  return safe.length > 1 ? safe.join('\n') : 'flowchart LR\n  A --> B';
};

/** 教えて先生: 問題・選択肢の意図説明 */
export const explainChoiceIntent = async (
  apiKey: string,
  params: { problemText: string; choiceText: string; explain?: string }
): Promise<string> => {
  const { problemText, choiceText, explain } = params;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `【指示】
公務員試験・資格試験の専門講師として、以下の「問題文」と「選択肢」について、**深い知識**をふんだんに盛り込んだ解説を作成してください。

【必須で含める内容】
1. **問題の趣旨・争点** - 何が問われているか、法的な論点を明確に
2. **条文・ルールの立法趣旨** - なぜその規定が存在するのか、政策目的・背景
3. **判例の考え方** - 関連判例があれば、判旨・結論の理由を具体的に
4. **関連概念との整理** - 似た制度との違い、区別のポイント
5. **実務・試験での落とし穴** - よくある誤解、ひっかけの典型

【問題文】
${problemText}

【選択肢】
${choiceText}
${explain ? `\n【参考: 既存解説】\n${explain}` : ''}

【出力ルール】
- 専門用語は **太字** で囲む
- 600〜1000字程度で丁寧に、深掘りして説明
- 条文番号・判例名があれば具体的に記載
- 講師として威厳を持ち、受験生が「なるほど」と納得できるレベルで`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '説明を取得できませんでした。';
};

/** AI先生: 誤答から復習すべき知識と補講を生成 */
export const generateWeaknessLesson = async (
  apiKey: string,
  params: {
    subject: string;
    field: string;
    topic: string;
    questionText: string;
    selectedText?: string;
    correctText?: string;
    explanation?: string;
    mistakeCount?: number;
  }
): Promise<string> => {
  const { subject, field, topic, questionText, selectedText, correctText, explanation, mistakeCount } = params;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `【指示】
あなたは行政書士試験のAI先生です。受験生が間違えた問題から、合格に必要な知識を短く補講してください。

【科目・分野】
${subject} / ${field}

【AIが検出した復習テーマ】
${topic}

【問題文】
${questionText}

【受験生の回答】
${selectedText || '（記録なし）'}

【正解・模範解答】
${correctText || '（記録なし）'}

【既存解説】
${explanation || '（なし）'}

【誤答回数】
${mistakeCount || 1}回

【出力ルール】
- 350字以内
- 見出しは「復習テーマ」「なぜ間違えたか」「合格ラインの覚え方」の3つ
- 問題文と正解から推測できる範囲だけで書く
- 最後に、音声で読み上げても自然な一文の励ましを入れる
- Markdownで簡潔に`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.25, maxOutputTokens: 768 },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '補講を生成できませんでした。';
};

/** 記述式: 部分点と分析を返す */
export interface GradeDescriptiveRequest {
  problemText: string;
  modelAnswer: string;
  userAnswer: string;
}

export interface GradeDescriptiveResult {
  score: number;   // 0-100
  analysis: string;
}

export type ChatContextChunk = {
  source: string;
  title: string;
  text: string;
  score?: number;
};

export type ChatHistoryTurn = {
  role: 'user' | 'bot';
  text: string;
};

const CHAT_MODEL_PRIMARY = 'gemini-2.5-pro';
const CHAT_MODEL_FALLBACK = 'gemini-2.5-flash';

function extractGeminiText(data: any): { text: string; finishReason?: string } {
  const candidate = data?.candidates?.[0];
  const parts = candidate?.content?.parts;
  const text = Array.isArray(parts)
    ? parts.map((p: { text?: string }) => p?.text || '').join('')
    : candidate?.content?.parts?.[0]?.text || '';
  return { text: text || '回答を取得できませんでした。', finishReason: candidate?.finishReason };
}

function buildChatTopicStructure(userQuery: string): string {
  const qHints = userQuery.normalize('NFKC').toLowerCase();
  const blocks: string[] = [];

  if (qHints.includes('理由の提示') || qHints.includes('理由提示')) {
    blocks.push(`【この質問の回答構成（必須）】
ユーザーが「理由の提示」を尋ねている場合は、行政手続法の論点として、次の**2つを必ず区別して**説明すること。
1）**申請により求められた許認可等を拒否する処分**の理由の提示（**第8条**。1項本文＝申請者に対し同時に示す。2項＝書面でするときは書面で示す。1項ただし書＝数量的指標が明確で不適合が申請内容から明らかなとき、求めがあれば足りる）
2）**不利益処分**の理由の提示（**第14条**。1項本文＝名あて人に対し同時に示す。ただし差し迫った必要があるときは同時でなくてよい。2項＝困難な事情がなければ処分後相当の期間内に示す）
不利益処分を第8条、申請拒否を第8条第2項第1号とするのは条文にない誤りである。参考テキストにない但書・細部は創作しないこと。`);
  }

  if (/比較|違い|相違|対比|vs\.?|versus|と\s*の\s*違い|どちら/.test(qHints)) {
    blocks.push(`【比較質問の構成（必須）】
共通点→相違点（要件・主体・効果・時期）→試験での見分け方、の順で短く対比すること。表が分かりやすければ Markdown 表を使ってよい。`);
  }

  if (
    /詳しく|詳細|ほかの判例|他の判例|一覧|全部|主な判例/.test(qHints)
  ) {
    blocks.push(`【詳細・列挙の求め（必須）】
ユーザーが詳しく・ほかの判例・一覧・全部を求めたときは、参考テキストにある範囲で応える。判例を2つで打ち切らない。収録範囲を明示し、全裁判例の網羅とは書かない。各判例は、事案→判断基準→当てはめ・理由→結論→混同しやすい点、の順で足りる分を書く。`);
  }

  if (/例外|できない|不可|認められな|要件|成立要件/.test(qHints)) {
    blocks.push(`【要件・例外質問の構成】
原則→要件（番号付き）→例外／不可の場合→ひっかけ一言、の順で整理すること。`);
  }

  return blocks.length ? `\n${blocks.join('\n')}\n` : '';
}

export type ChatStudyLevel = 'beginner' | 'intermediate' | 'advanced';

function buildStudyLevelInstruction(level: ChatStudyLevel = 'beginner'): string {
  if (level === 'beginner') {
    return `【学習レベル：初級（初学者）】
想定：勉強を始めて間もなく、過去問を1〜2周程度。用語にまだ慣れていない。
- 専門用語は必ず直後にかみ砕く（例: 原告適格＝その処分を裁判で争える資格）
- 結論は先に短く。聞かれた条件・結論・判例は落とさない
- 短い確認質問まで毎回長文化しない
- 「今はこれだけ覚えればOK」の暗記を1行
- 学説対立や参考テキストにない深い総合考慮は書かない`;
  }
  if (level === 'intermediate') {
    return `【学習レベル：中級（およそ150点帯）】
想定：一通り触れているが伸び悩んでいる。枠組みとひっかけで点を取りたい。
- 結論→判断枠組み→あてはめ→ひっかけ、の順
- 似た判例は対比表で聞き分ける
- 取り違えポイントを1つ
- 条文番号・事件名は正確に。学説の細かい対立は最小限
- 暗記は本番で切れる合言葉にする`;
  }
  return `【学習レベル：上級（合格点〜170点以上を確実化）】
想定：模試で合格点前後〜170点以上。取りこぼしと深い択一・多肢を潰したい。
- 判断枠組みを答案型で明示（要件列挙、例外）
- 類似判例との聞き分け、ひっかけ肢の作り方まで書く
- 参考テキストにある判旨キーワードは省略しない
- それでも結論先出し。冗長な前置きは禁止`;
}

async function callGeminiGenerate(
  apiKey: string,
  model: string,
  prompt: string
): Promise<{ text: string; finishReason?: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.15,
      topP: 0.9,
      maxOutputTokens: 8192,
    },
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${model}): ${response.status} ${response.statusText} - ${errText}`);
  }
  return extractGeminiText(await response.json());
}

/** 質問するモード: アプリ内検索結果のみを根拠に回答（Pro優先・Flashフォールバック） */
export const answerChatFromContext = async (
  apiKey: string,
  params: {
    userQuery: string;
    contextChunks: ChatContextChunk[];
    history?: ChatHistoryTurn[];
    studyLevel?: ChatStudyLevel;
  }
): Promise<string> => {
  const { userQuery, contextChunks, history = [], studyLevel = 'beginner' } = params;

  const ctx =
    contextChunks.length === 0
      ? '（該当するアプリ内テキストは見つかりませんでした）'
      : contextChunks
          .map((c, i) => {
            const rank = typeof c.score === 'number' ? ` 関連度:${Math.round(c.score)}` : '';
            return `---\n[${i + 1}] 出典: ${c.source} / ${c.title}${rank}\n${c.text}`;
          })
          .join('\n');

  const historyBlock =
    history.length === 0
      ? ''
      : `\n【直前の会話（フォローアップの文脈。根拠は参考テキストのみ）】\n${history
          .slice(-6)
          .map((h) => `${h.role === 'user' ? 'ユーザー' : '助手'}: ${h.text.slice(0, 800)}`)
          .join('\n')}\n`;

  const topicStructure = buildChatTopicStructure(userQuery);
  const levelBlock = buildStudyLevelInstruction(studyLevel);

  const prompt = `【役割】
あなたは行政書士試験の**鬼教官級**の学習アシスタントです。受験生が本番で得点できるように、結論から短く、根拠つきで教える。

${levelBlock}

【根拠ルール（厳守）】
- 「参考テキスト」に書いてあることだけを根拠にする。一般知識・推測・条文創作・架空の判例は禁止。
- 根拠がない点は「手元のデータには載っていません」と明示する。
- 参考テキスト同士が食い違うときは、より具体的な条文・判例・解説を優先し、食い違いも一言述べる。
- 条文番号・判例名・要件は参考にある表記を優先して引用する。出典は [1] [2] のように示す。
- 関連度スコアは検索の並びであり、法的正確性の根拠ではない。スコアが高くても誤った一般化（周辺住民なら常に○、同業者なら常に○）をしない。
- ユーザーの誤った前提には迎合せず、どの利益・どの訴訟要件の話かを区別して訂正する。
- 「棚」「あり寄り」「生命身体」などのスローガンだけで終わらせず、法律日本語で書く。
- 判例一覧は収録範囲を明示し、全裁判例を網羅したと書かない。
${topicStructure}
【回答フォーマット（毎回この順）】
### 結論
（1〜3文。先に答え）
### 理由・根拠
（必要なときだけ、事案→判断基準→当てはめ・理由→結論→混同しやすい点。短い確認は結論と1点の区別で足りる）
### 試験のひっかけ
（よくある誤肢・取り違えを1つ）
### 暗記
（合言葉を1行）
比較・例外・詳細列挙の質問では上の専用構成を優先しつつ、最後にひっかけと暗記を残す。
余計な前置き・「承知しました」は不要。
構造は Markdown でよいが、アプリが表示用に整形する前提で次を守る:
- 見出しは ### 見出し名（# だけの行は不可）
- 箇条書きは行頭を「- 」（ハイフン＋スペース）。「* 」は使わない
- 太字は **このように**
- 短い表は | 列 | 形式で可
- 学習レベルは**用語の丁寧さ・例えの量**にだけ反映する。ユーザーが詳しく・ほかの判例・一覧・全部を求めた内容や、成立条件・結論は、初級でも省略しない。学習レベルを理由に判例を2つで打ち切らない。

${historyBlock}
【ユーザーの質問】
${userQuery}

【参考テキスト】
${ctx}`;

  try {
    const primary = await callGeminiGenerate(apiKey, CHAT_MODEL_PRIMARY, prompt);
    let raw = primary.text;
    if (primary.finishReason === 'MAX_TOKENS' && !raw.endsWith('。') && !raw.endsWith('．')) {
      raw += '\n\n…（出力上限に達しました。短い質問に分けると全文が得られやすいです。）';
    }
    return raw;
  } catch (primaryErr) {
    try {
      const fallback = await callGeminiGenerate(apiKey, CHAT_MODEL_FALLBACK, prompt);
      let raw = fallback.text;
      if (fallback.finishReason === 'MAX_TOKENS' && !raw.endsWith('。') && !raw.endsWith('．')) {
        raw += '\n\n…（出力上限に達しました。短い質問に分けると全文が得られやすいです。）';
      }
      return raw;
    } catch {
      throw primaryErr instanceof Error ? primaryErr : new Error(String(primaryErr));
    }
  }
};

export const gradeDescriptiveAnswer = async (
  apiKey: string,
  request: GradeDescriptiveRequest
): Promise<GradeDescriptiveResult> => {
  const { problemText, modelAnswer, userAnswer } = request;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `【指示】
公務員試験の記述式問題です。以下の「問題文」「模範解答」「受験生の解答」を読み、受験生の解答を採点し、部分点（0〜100点）と短い分析コメントを付けてください。

【問題文】
${problemText}

【模範解答】
${modelAnswer}

【受験生の解答】
${userAnswer}

【出力形式】必ず次のJSONのみを1行で出力してください。他に説明は書かないこと。
{"score": 数値0以上100以下, "analysis": "分析コメント（200字程度。良い点・足りない点・改善のヒントを簡潔に）"}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
    }

    const data = await response.json();
    let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    rawText = rawText.replace(/^```json\s*/i, "").replace(/\s*```\s*$/, "").trim();
    let parsed: { score?: number; analysis?: string };
    try {
      parsed = JSON.parse(rawText) as { score?: number; analysis?: string };
    } catch {
      parsed = {};
    }
    const score = typeof parsed.score === "number" ? Math.max(0, Math.min(100, parsed.score)) : 0;
    const analysis = typeof parsed.analysis === "string" ? parsed.analysis : "分析を取得できませんでした。";
    return { score, analysis };
  } catch (error) {
    console.error("Failed to grade descriptive answer:", error);
    throw error;
  }
};
