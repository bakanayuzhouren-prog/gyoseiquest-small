require('dotenv').config();
// Polyfill not needed for Node 18+


// Reuse the logic from geminiService.ts (duplicated here for pure Node script execution without TS compilation)
// In a real scenario, use ts-node or compiled output.
const generateExplanation = async (apiKey, request) => {
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

1. **結論をズバッと**: 冒頭に「本肢は【${correctness}】です。」と書く。
2. **理由の言語化**: 条文（以下の条文）のどの文言が、問題文（${limb}）のどこに対応しているかを明確にする。
   - 条文テキスト: ${article}
3. **専門用語の翻訳**: 「つまり、〇〇という意味です」と、平易な言葉で補足する。
4. **視覚的工夫**: 重要なキーワードは **太字** で囲む。
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
        if (!data.candidates || data.candidates.length === 0) {
            return "Error: No candidates returned from Gemini.";
        }
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Failed to generate explanation:", error);
        throw error;
    }
};

// --- Test Data ---
// Problem: Line 2028 of questions.js
// Problem: User provided question about definitions
const PROBLEM = "行政手続法の用語に関する次の記述のうち、同法の定義に照らし、正しいものはどれか。";

// Limb: Choice 3 (Disposition Standards) - This appears to be the correct one based on definition
const LIMB = "「処分基準」とは、不利益処分をするかどうか、またはどのような不利益処分とするかについてその法令の定めに従って判断するために必要とされる基準をいう。";

// Article: Article 2 Item 8 (c)
const ARTICLE = `
（定義）
第二条　この法律において、次の各号に掲げる用語の意義は、当該各号に定めるところによる。
八　処分基準　不利益処分をするかどうか又はどのような不利益処分とするかについてその法令の定めに従って判断するために必要とされる基準をいう。
`;

const CORRECTNESS = "正しい";

async function main() {
    const apiKey = process.env.GEMINI_API_KEY; // Using env variable
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is not set in environment.");
        process.exit(1);
    }

    console.log("Generating explanation for single Gyote question...");
    console.log("Problem:", PROBLEM.substring(0, 50) + "...");
    console.log("Limb:", LIMB.substring(0, 50) + "...");
    console.log("---------------------------------------------------");

    try {
        const explanation = await generateExplanation(apiKey, {
            problem: PROBLEM,
            limb: LIMB,
            article: ARTICLE,
            correctness: CORRECTNESS
        });

        console.log("\n--- Generated Output ---\n");
        console.log(explanation);
        console.log("\n------------------------\n");

        const fs = require('fs');
        fs.writeFileSync('gemini_result.txt', explanation);

    } catch (e) {
        console.error(e);
    }
}

main();
