import { readFileSync, writeFileSync } from 'fs';

// temp_bukken_parsed.json を読み込む
const rawData = JSON.parse(readFileSync('temp_bukken_parsed.json', 'utf-8'));

// src/questions.js の現在の民法物権セクションで使われている explain フィールド等を確認するため
// questions.js から現在の民法物権の explain データを取得（参照用）
const questionsJs = readFileSync('src/questions.js', 'utf-8');

// 各問題をquestions.js形式に変換
// 注意: choices テキストに（ｒ）が残っているので、それを正解判定に使う
function cleanChoiceText(text) {
    // （ｒ）と (r) を除去（全角・半角両対応）
    return text.replace(/[（(]ｒ[）)]/g, '').replace(/\(r\)/gi, '').trim();
}

function isCorrectChoice(text) {
    return text.includes('（ｒ）') || text.includes('(r)') || text.includes('（r）');
}

// 問題ごとにJSオブジェクト文字列を生成
const questions = rawData.map((q, qIdx) => {
    // bonus（※）を除いた通常選択肢のみ
    const normalChoices = q.choices.filter(c => !c.isBonus);
    const bonusChoices = q.choices.filter(c => c.isBonus);

    // 正解インデックスを特定
    const answerIndices = [];
    const choices = normalChoices.map((c, idx) => {
        if (isCorrectChoice(c.text)) {
            answerIndices.push(idx);
        }
        return cleanChoiceText(c.text);
    });

    // ボーナス（※）はwordbank/memoに格納
    const bonusTexts = bonusChoices.map(c => cleanChoiceText(c.text.replace(/^※/, '').trim()));

    // 問題文の先頭にある「問題文 」を除去
    const questionText = q.text.replace(/^問題文\s*/, '').trim();

    // answer は配列の場合はそのまま、単一ならインデックス番号
    // questions.jsの形式に合わせる（配列）
    const answerText = answerIndices.length > 0
        ? JSON.stringify(answerIndices)
        : '[]';

    // 選択肢のJSコード
    const choicesCode = choices.map(c => {
        const escaped = c.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
        return `      "${escaped}"`;
    }).join(',\n');

    // 正解の解説文（正解肢のテキスト）
    const explainText = answerIndices.length > 0 && normalChoices[answerIndices[0]]
        ? cleanChoiceText(normalChoices[answerIndices[0]].text)
        : '';
    const explainEscaped = explainText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

    // memo は bonusTexts を結合
    const memoText = bonusTexts.join(' / ');
    const memoEscaped = memoText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

    const questionEscaped = questionText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

    return `    {
      "text": "${questionEscaped}",
      "choices": [
${choicesCode}
      ],
      "answer": ${answerText},
      "explain": "${explainEscaped}",
      "wordBank": "",
      "memo": "${memoEscaped}",
      "slots": [],
      "refId": "",
      "isBonus": false,
      "chunks": []
    }`;
});

// 確認用ログ
console.log(`問題数: ${questions.length}`);
rawData.forEach((q, i) => {
    const normals = q.choices.filter(c => !c.isBonus);
    const correctOnes = normals.filter(c => isCorrectChoice(c.text));
    const indices = normals.map((c, idx) => isCorrectChoice(c.text) ? idx : -1).filter(x => x >= 0);
    console.log(`Q${i + 1}: 選択肢${normals.length}個 正解: [${indices.join(',')}] ${correctOnes.length === 0 ? '⚠️正解なし' : '✅'}`);
});

// 生成されたJSコード（配列の中身のみ）
const output = `[\n${questions.join(',\n')}\n  ]`;
writeFileSync('temp_bukken_generated.js', output, 'utf-8');
console.log('\n✅ 生成: temp_bukken_generated.js');
console.log(`   ${questions.length}問分のデータを書き込みました`);
