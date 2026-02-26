const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../temp_images/minpo_bukken');
const LEARN_PATH = path.join(__dirname, '../src/learn.js');

const imageFiles = fs.readdirSync(SRC_DIR)
    .filter(f => /^\d+-110\.png$/.test(f))
    .sort((a, b) => {
        const na = parseInt(a.split('-')[0], 10);
        const nb = parseInt(b.split('-')[0], 10);
        return na - nb;
    });

const validIndices = imageFiles.map(f => parseInt(f.split('-')[0], 10));

let learnSrc = fs.readFileSync(LEARN_PATH, 'utf-8');
const learnModule = {};
let modifiedSrc = learnSrc.replace('export const LEARN_CONTENT =', 'learnModule.LEARN_CONTENT =');

try {
    eval(modifiedSrc);
} catch (e) {
    console.error("learn.js parse error:", e);
    process.exit(1);
}

const learnContent = learnModule.LEARN_CONTENT;
const bukkenLearn = learnContent['民法物権'] || [];
let learnUpdated = 0;

for (const idx of validIndices) {
    if (idx < bukkenLearn.length) {
        if (!/\[\[LINK:\d+\]\]/.test(bukkenLearn[idx])) {
            bukkenLearn[idx] = `${bukkenLearn[idx]}[[LINK:${idx}]]`;
            learnUpdated++;
            console.log(`[${idx}] learn.js に [[LINK:${idx}]] を追加しました。`);
        } else if (!bukkenLearn[idx].includes(`[[LINK:${idx}]]`)) {
            // Already has different LINK, replace it
            bukkenLearn[idx] = bukkenLearn[idx].replace(/\[\[LINK:\d+\]\]/g, '');
            bukkenLearn[idx] = `${bukkenLearn[idx]}[[LINK:${idx}]]`;
            learnUpdated++;
            console.log(`[${idx}] learn.js の [[LINK]] を [[LINK:${idx}]] に置換しました。`);
        } else {
            console.log(`[${idx}] スキップ（既に [[LINK:${idx}]] があります）`);
        }
    } else {
        console.warn(`[${idx}] learn配列の長さを超えています (length: ${bukkenLearn.length})`);
    }
}

if (learnUpdated > 0) {
    // 最初の 'export const LEARN_CONTENT =' までを維持する形にするため、全体を文字列化
    const newLearnSrc = `export const LEARN_CONTENT = ${JSON.stringify(learnContent, null, 2)};\n`;
    fs.writeFileSync(LEARN_PATH, newLearnSrc);
    console.log(`\nlearn.js: ${learnUpdated}件の[[LINK:]]タグを更新しました`);
} else {
    console.log(`\n更新は不要でした`);
}
