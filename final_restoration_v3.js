const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai_v2';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- FINAL ULTIMATE RESTORATION START ---');

    // 1. バックアップのロード (v2)
    let backupContent = fs.readFileSync(backupPath, 'utf8');

    // export const を global に。もし export がなければそのまま global に。
    let evalScript = backupContent
        .replace(/^export const /gm, 'global.')
        .replace(/^import .*/gm, '// $&');

    // 変数名が裸（SUBJECTS = {）の場合に備えて global に。
    evalScript = evalScript.replace(/^(SUBJECTS|RESOURCES|STATUTES) =/gm, 'global.$1 =');

    eval(evalScript);

    // STATUTES があれば RESOURCES にリネーム
    if (global.STATUTES && !global.RESOURCES) {
        global.RESOURCES = global.STATUTES;
    }

    if (!global.SUBJECTS) throw new Error('Failed to extract SUBJECTS from backup');
    if (!global.RESOURCES) {
        console.warn('RESOURCES not found, checking for empty object or other naming');
        global.RESOURCES = {};
    }

    console.log('Successfully extracted SUBJECTS and RESOURCES (from STATUTES if needed).');
    console.log('Subjects keys:', Object.keys(global.SUBJECTS));
    console.log('Resources keys count:', Object.keys(global.RESOURCES).length);

    // 2. 新しい民法物権データのロード
    const bukkenRaw = fs.readFileSync(bukkenDataPath, 'utf8');
    const bukkenQuestions = eval(bukkenRaw);
    console.log(`Loaded ${bukkenQuestions.length} questions for 民法物権.`);

    // 3. マージ
    if (!global.SUBJECTS['民法']) global.SUBJECTS['民法'] = {};
    global.SUBJECTS['民法']['民法物権'] = bukkenQuestions;
    console.log('Merged bukken questions into SUBJECTS["民法"]["民法物権"].');

    // 4. 空配列を空文字に戻すクレンジング
    for (const sKey in global.SUBJECTS) {
        for (const fKey in global.SUBJECTS[sKey]) {
            const qs = global.SUBJECTS[sKey][fKey];
            if (Array.isArray(qs)) {
                qs.forEach(q => {
                    if (Array.isArray(q.wordBank) && q.wordBank.length === 0) {
                        q.wordBank = "";
                    }
                });
            }
        }
    }

    // 5. 出力
    const output = `// Final Restoration Version
export const SUBJECTS = ${JSON.stringify(global.SUBJECTS, null, 2)};

export const RESOURCES = ${JSON.stringify(global.RESOURCES, null, 2)};
`;

    fs.writeFileSync(targetPath, output, 'utf8');
    console.log('Successfully wrote src/questions.js');

    // 統計
    const totalQuestions = Object.values(global.SUBJECTS).reduce((acc, sub) => {
        return acc + Object.values(sub).reduce((acc2, qs) => acc2 + (Array.isArray(qs) ? qs.length : 0), 0);
    }, 0);
    console.log(`Total questions: ${totalQuestions}`);
    console.log(`RESOURCES count: ${Object.keys(global.RESOURCES).length}`);

} catch (err) {
    console.error('FINAL ERROR:', err);
    process.exit(1);
}
