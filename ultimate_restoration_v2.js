const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- ULTIMATE RESTORATION START ---');

    // 1. バックアップ全体のロード
    let backupContent = fs.readFileSync(backupPath, 'utf8');

    // export を global に置き換えて eval できるようにする
    const evalScript = backupContent
        .replace(/export const /g, 'global.')
        .replace(/import .*/g, '// $&');

    eval(evalScript);

    if (!global.SUBJECTS || !global.RESOURCES) {
        throw new Error('Failed to extract SUBJECTS or RESOURCES from backup');
    }

    console.log('Successfully extracted SUBJECTS and RESOURCES from backup.');

    // 2. 新しい民法物権データのロードとパース
    const bukkenRaw = fs.readFileSync(bukkenDataPath, 'utf8');
    // temp_bukken_generated.js は [ ... ] の形式なので そのまま eval する
    const bukkenQuestions = eval(bukkenRaw);
    console.log(`Loaded ${bukkenQuestions.length} questions for 民法物権.`);

    // 3. マージ
    if (!global.SUBJECTS['民法']) {
        global.SUBJECTS['民法'] = {};
    }
    global.SUBJECTS['民法']['民法物権'] = bukkenQuestions;
    console.log('Merged bukken questions into SUBJECTS["民法"]["民法物権"].');

    // 4. 全体クレンジング（wordBank などの空配列を空文字に）
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

    // 5. 出力生成
    const output = `// Generated and Restored by Ultimate Restoration Script
export const SUBJECTS = ${JSON.stringify(global.SUBJECTS, null, 2)};

export const RESOURCES = ${JSON.stringify(global.RESOURCES, null, 2)};
`;

    fs.writeFileSync(targetPath, output, 'utf8');
    console.log(`Successfully restored ${targetPath}`);

    // 統計
    console.log('--- Restoration Statistics ---');
    console.log(`SUBJECTS keys: ${Object.keys(global.SUBJECTS).join(', ')}`);
    console.log(`RESOURCES count: ${Object.keys(global.RESOURCES).length}`);

    const totalQuestions = Object.values(global.SUBJECTS).reduce((acc, sub) => {
        return acc + Object.values(sub).reduce((acc2, qs) => acc2 + (Array.isArray(qs) ? qs.length : 0), 0);
    }, 0);
    console.log(`Total questions in SUBJECTS: ${totalQuestions}`);

} catch (err) {
    console.error('CRITICAL RESTORATION ERROR:', err);
    process.exit(1);
}
