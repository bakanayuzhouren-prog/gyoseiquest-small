import { readFileSync, writeFileSync } from 'fs';

const questionsJs = readFileSync('src/questions.js', 'utf-8');
const newArrayContent = readFileSync('temp_bukken_generated.js', 'utf-8');

// 民法物権セクションの開始を探す
const sectionKey = '"民法物権"';
const sectionStart = questionsJs.indexOf(sectionKey);
if (sectionStart === -1) {
    console.error('❌ 民法物権セクションが見つかりません');
    process.exit(1);
}
console.log(`✅ 民法物権セクション発見: 文字位置 ${sectionStart}`);

// セクション開始行の [ を探す
let arrayStart = questionsJs.indexOf('[', sectionStart);
if (arrayStart === -1) {
    console.error('❌ 配列開始 [ が見つかりません');
    process.exit(1);
}
console.log(`✅ 配列開始 [ 発見: 文字位置 ${arrayStart}`);

// 対応する ] を探す（ネスト対応）
let depth = 0;
let arrayEnd = -1;
for (let i = arrayStart; i < questionsJs.length; i++) {
    const ch = questionsJs[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
        depth--;
        if (depth === 0) {
            arrayEnd = i;
            break;
        }
    }
}

if (arrayEnd === -1) {
    console.error('❌ 配列終了 ] が見つかりません');
    process.exit(1);
}
console.log(`✅ 配列終了 ] 発見: 文字位置 ${arrayEnd}`);

// 行番号を計算
const beforeArray = questionsJs.substring(0, arrayStart);
const startLine = (beforeArray.match(/\n/g) || []).length + 1;
const beforeEnd = questionsJs.substring(0, arrayEnd);
const endLine = (beforeEnd.match(/\n/g) || []).length + 1;
console.log(`   配列は行 ${startLine} ～ ${endLine} (計 ${endLine - startLine + 1} 行)`);

// 現在の配列内の問題数を確認
const currentArray = questionsJs.substring(arrayStart, arrayEnd + 1);
const currentQuestionCount = (currentArray.match(/"question"/g) || []).length;
console.log(`   現在の問題数: ${currentQuestionCount}`);

// 新しいコンテンツで置き換え
// newArrayContent は "[\n...\n  ]" 形式なのでそのまま使える
const newQuestionsJs = questionsJs.substring(0, arrayStart)
    + newArrayContent
    + questionsJs.substring(arrayEnd + 1);

// 新しい問題数を確認
const newQuestionCount = (newArrayContent.match(/"question"/g) || []).length;
console.log(`   新しい問題数: ${newQuestionCount}`);

// バックアップ作成
writeFileSync('src/questions.js.bukken_backup', questionsJs, 'utf-8');
console.log('✅ バックアップ: src/questions.js.bukken_backup');

// 書き込み
writeFileSync('src/questions.js', newQuestionsJs, 'utf-8');
console.log('✅ 書き込み完了: src/questions.js');
console.log(`   ${currentQuestionCount}問 → ${newQuestionCount}問`);
