const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Searching for target lines for Constitution index 5, 6, and 7...');

// 解説コンテンツ（エスケープ済み）
const comparisonExplain = "[[section:自由権 vs 生存権（社会権） 徹底比較]]\\n[[character:boss]]\\n[[bold:Q. 自由権と生存権って、何が違うんですか？]]\\n\\n[[character:midBoss]]\\n[[bold:A. 「国家に対して何を求めるか」という方向性が正反対なんです！]]\\n\\n[[bold:1. 本質（キャッチコピー）]]\\n・自由権：[[red:「国家からの自由」]]\\n・生存権：[[red:「国家による自由」]]\\n\\n[[bold:2. 国家への要求]]\\n・自由権：[[red:「不作為」]]（私の領域に介入しないで！）\\n・生存権：[[red:「作為」]]（積極的に助けて！）\\n\\n[[bold:3. 権利の性格]]\\n・自由権：[[red:消極的な権利]]（何もしなければ守られる）\\n・生存権：[[red:積極的な権利]]（予算と制度で実現する）\\n\\n[[bold:4. 歴史的背景]]\\n・自由権：近代憲法（市民革命期。絶対王政からの解放）\\n・生存権：現代憲法（20世紀〜。資本主義の弊害を是正）\\n\\n[[bold:5. 主な権利（条文）]]\\n・自由権：精神・身体・経済的自由（20, 21, 22, 29, 31条〜）\\n・生存権：生存権(25条)、教育(26条)、勤労・労働三権(27, 28条)\\n\\n[[bold:6. 裁判での主張しやすさ]]\\n・自由権：[[red:主張しやすい！]] 侵害があれば直ちに違憲主張が可能。\\n・生存権：[[red:主張しにくい場合がある。]] 法律が必要（プログラム規定説）。\\n\\n[[point:「介入するな」が自由権、「助けてくれ」が生存権、と覚えるのが合格への近道です！]]";

// 憲法のセクションを探す
let subjectStartLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"憲法": {') || lines[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

if (subjectStartLine === -1) {
    console.error('憲法 section not found');
    process.exit(1);
}

// 憲法配列の開始を探す
let arrayStartLine = -1;
for (let i = subjectStartLine; i < lines.length; i++) {
    if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

// インデックス 5, 6, 7 を順番に見つける
let questionCount = 0;
const targets = [5, 6, 7];
const foundLineIndices = [];

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (targets.includes(questionCount)) {
            // その問題の explain フィールドを探す
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    foundLineIndices.push(j);
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (foundLineIndices.length === targets.length) break;
}

if (foundLineIndices.length === 0) {
    console.error('No target questions found');
    process.exit(1);
}

console.log(`Found ${foundLineIndices.length} explain fields to update.`);

// 更新実行
foundLineIndices.forEach(idx => {
    console.log(`Updating line ${idx + 1}...`);
    lines[idx] = `        "explain": "${comparisonExplain}",`;
});

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete for all targets!');
