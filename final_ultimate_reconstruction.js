const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- RECONSTRUCTION START ---');
    let content = fs.readFileSync(backupPath, 'utf8');

    // 民法物権 データの読み込み
    const bukkenArrayContent = fs.readFileSync(bukkenDataPath, 'utf8');

    // 以前の不純物を確実にパージするため、backup_ai をそのまま使って
    // SUBJECTS オブジェクトを eval した上で、民法物権を上書きする
    const scriptContent = content
        .replace('export const SUBJECTS =', 'global.SUBJECTS =')
        .replace(/import .*/g, '// $&');

    eval(scriptContent);
    if (!global.SUBJECTS) throw new Error('Failed to eval backup_ai');

    // 民法の構造を確実に整える
    if (!global.SUBJECTS['民法']) global.SUBJECTS['民法'] = {};

    // 文字列としての bukkenArrayContent をパースしてオブジェクトとして統合
    // (eval を使って安全にパース)
    const bukkenQuestions = eval('[' + bukkenArrayContent + ']');
    global.SUBJECTS['民法']['民法物権'] = bukkenQuestions;

    // 全量バリデーション & クレンジング
    let removedItems = 0;
    for (const sKey in global.SUBJECTS) {
        for (const subKey in global.SUBJECTS[sKey]) {
            const arr = global.SUBJECTS[sKey][subKey];
            if (Array.isArray(arr)) {
                global.SUBJECTS[sKey][subKey] = arr.filter(q => {
                    const ok = q && q.text && q.choices && q.answer;
                    if (!ok) removedItems++;
                    return ok;
                });
            }
        }
    }
    console.log(`Validation: ${removedItems} non-question items removed.`);

    // 保存
    const finalContent = `// Optimized and Cleansed\nexport const SUBJECTS = ${JSON.stringify(global.SUBJECTS, null, 2)};\n`;
    fs.writeFileSync(targetPath, finalContent, 'utf8');
    console.log(`Successfully wrote to ${targetPath}`);
    console.log('--- RECONSTRUCTION COMPLETE ---');

} catch (err) {
    console.error('ULTIMATE FAILURE:', err);
    process.exit(1);
}
