const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- ULTIMATE REGEX RECONSTRUCTION START ---');
    let content = fs.readFileSync(backupPath, 'utf8');

    // SUBJECTS = { ... }; の中身だけを抽出
    // 最も外側の波括弧を探す
    const startMatch = content.match(/export const SUBJECTS = \{/);
    if (!startMatch) throw new Error('Could not find SUBJECTS start');

    const startPos = startMatch.index + startMatch[0].length - 1; // '{' の位置

    // 対応する最後の }; を探す
    const endPos = content.lastIndexOf('};');
    if (endPos === -1) throw new Error('Could not find SUBJECTS end');

    const subjectsStr = content.substring(startPos, endPos + 1);

    // eval を使ってオブジェクト化
    // (外側が波括弧なら、( ) で囲めば eval できる)
    const SUBJECTS = eval('(' + subjectsStr + ')');
    console.log('Successfully extracted SUBJECTS object.');

    // 民法物権 データの読み込み & パース
    const bukkenArrayContent = fs.readFileSync(bukkenDataPath, 'utf8');
    const bukkenQuestions = eval('[' + bukkenArrayContent + ']');

    if (!SUBJECTS['民法']) SUBJECTS['民法'] = {};
    SUBJECTS['民法']['民法物権'] = bukkenQuestions;

    // 全量バリデーション & クレンジング
    let removedItems = 0;
    for (const sKey in SUBJECTS) {
        for (const subKey in SUBJECTS[sKey]) {
            const arr = SUBJECTS[sKey][subKey];
            if (Array.isArray(arr)) {
                SUBJECTS[sKey][subKey] = arr.filter(q => {
                    const ok = q && q.text && q.choices && q.answer;
                    if (!ok) removedItems++;
                    return ok;
                });
            }
        }
    }
    console.log(`Validation: ${removedItems} non-question items removed.`);

    // 保存
    const finalContent = `// Optimized and Cleansed\nexport const SUBJECTS = ${JSON.stringify(SUBJECTS, null, 2)};\n`;
    fs.writeFileSync(targetPath, finalContent, 'utf8');
    console.log(`Successfully wrote to ${targetPath}`);
    console.log('--- RECONSTRUCTION COMPLETE ---');

} catch (err) {
    console.error('REGEX RECONSTRUCTION FAILURE:', err);
    process.exit(1);
}
