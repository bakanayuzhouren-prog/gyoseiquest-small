import { readFileSync, writeFileSync } from 'fs';

// CSVを読み込む
const csvText = readFileSync('temp_bukken_sheet.csv', 'utf-8');

// CSV行をパース（ダブルクォートで囲まれた複数行セルに対応）
function parseCsvRow(row) {
    const cells = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '"' && !inQuotes) {
            inQuotes = true;
        } else if (ch === '"' && inQuotes) {
            if (row[i + 1] === '"') { current += '"'; i++; }
            else inQuotes = false;
        } else if (ch === ',' && !inQuotes) {
            cells.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    cells.push(current);
    return cells;
}

// まず複数行セルに対応した完全パースを行う
const rows = [];
let currentRow = '';
let inQuotes = false;

for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    if (ch === '"') {
        inQuotes = !inQuotes;
        currentRow += ch;
    } else if ((ch === '\r' || ch === '\n') && !inQuotes) {
        if (ch === '\r' && csvText[i + 1] === '\n') i++;
        if (currentRow.trim()) rows.push(parseCsvRow(currentRow));
        currentRow = '';
    } else {
        currentRow += ch;
    }
}
if (currentRow.trim()) rows.push(parseCsvRow(currentRow));

console.log(`Total rows parsed: ${rows.length}`);

// 列インデックス（0起点）
// A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12
const H_COL = 7;
const K_COL = 10;

// H列（問題文）とK列（選択肢）を抽出
const result = [];
let currentQuestion = null;

for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    const h = (row[H_COL] || '').trim();
    const k = (row[K_COL] || '').trim();

    // H列に問題文（「次の記述のうち」等）がある場合 → 新しい問題
    if (h && (h.includes('次の') || h.includes('次のア') || h.includes('次のア〜') || h.includes('場合に関'))) {
        if (currentQuestion) result.push(currentQuestion);
        currentQuestion = { row: ri + 1, text: h, choices: [], answerIndices: [] };
    }

    // K列に選択肢がある場合 → 現在の問題の選択肢に追加
    if (k && currentQuestion) {
        const isCorrect = k.includes('（r）') || k.includes('(r)');
        const isBonus = k.startsWith('※');
        const cleanChoice = k.replace('（r）', '').replace('(r)', '').trim();
        if (isCorrect) {
            currentQuestion.answerIndices.push(currentQuestion.choices.length);
        }
        currentQuestion.choices.push({ text: cleanChoice, isBonus });
    }
}
if (currentQuestion) result.push(currentQuestion);

console.log(`\n問題数: ${result.length}`);
result.forEach((q, i) => {
    const answers = q.answerIndices.map(idx => `${idx}(${q.choices[idx]?.text.substring(0, 15)}...)`).join(', ');
    console.log(`Q${i + 1} (Row${q.row}): ${q.text.substring(0, 60)}...`);
    console.log(`  肢数: ${q.choices.length} 正解: [${q.answerIndices.join(',')}] ${q.answerIndices.length > 0 ? '→ ' + answers : '（正解未設定）'}`);
});

// JSONとして保存
writeFileSync('temp_bukken_parsed.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('\n保存: temp_bukken_parsed.json');
