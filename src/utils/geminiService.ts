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

export const gradeDescriptiveAnswer = async (
  apiKey: string,
  request: GradeDescriptiveRequest
): Promise<GradeDescriptiveResult> => {
  const { problemText, modelAnswer, userAnswer } = request;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
