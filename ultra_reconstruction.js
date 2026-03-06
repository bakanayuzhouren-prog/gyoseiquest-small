const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    // 1. 完全なバックアップを読み込む
    console.log(`Reading clean backup: ${backupPath}`);
    let content = fs.readFileSync(backupPath, 'utf8');

    // 2. 民法物権 データの読み込み
    const bukkenArrayContent = fs.readFileSync(bukkenDataPath, 'utf8');

    // 3. SUBJECTS["民法"] を探し、その中の "民法物権": [ ... ] を置換する。
    // backup_ai に "民法": { があるか確認
    const minpoKey = '"民法":';
    const minpoIndex = content.indexOf(minpoKey);

    if (minpoIndex === -1) {
        // もし "民法" がなければ末尾に追加
        console.log('"民法" section not found in backup_ai. Adding to end...');
        const insertPos = content.lastIndexOf('};');
        const minpoSection = `,\n  "民法": {\n    "民法物権": [\n${bukkenArrayContent}\n    ]\n  }`;
        content = content.substring(0, insertPos).trim() + minpoSection + '\n};';
    } else {
        // 存在する場合、"民法物権": [ ... ] を探す
        const bukkenKey = '"民法物権":';
        const bukkenIndex = content.indexOf(bukkenKey, minpoIndex);

        if (bukkenIndex === -1) {
            // "民法": { の直後に挿入
            const braceIndex = content.indexOf('{', minpoIndex);
            content = content.substring(0, braceIndex + 1) +
                `\n    "民法物権": [\n${bukkenArrayContent}\n    ],` +
                content.substring(braceIndex + 1);
        } else {
            // 既存の配列を置換
            const arrayStart = content.indexOf('[', bukkenIndex);
            // 対応する ] を探す（階層を考慮）
            let balance = 1;
            let arrayEnd = -1;
            for (let i = arrayStart + 1; i < content.length; i++) {
                if (content[i] === '[') balance++;
                else if (content[i] === ']') balance--;
                if (balance === 0) {
                    arrayEnd = i;
                    break;
                }
            }
            if (arrayEnd !== -1) {
                content = content.substring(0, arrayStart) + '[\n' + bukkenArrayContent + '\n    ]' + content.substring(arrayEnd + 1);
            }
        }
    }

    // 4. 全体のクレンジング（wordBank 形式の統一など）
    content = content.replace(/"wordBank":\s*\[\]/g, '"wordBank": ""');

    // 5. 書き込み
    console.log(`Writing back to: ${targetPath}`);
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log('Done. src/questions.js is now clean and updated.');

} catch (err) {
    console.error('CRITICAL ERROR in reconstruction:', err);
    process.exit(1);
}
