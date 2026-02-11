const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const linesArr = rawContent.split(/\r?\n/);

console.log('Restoring Rich Explain for Constitution Index 0...');

// The rich text incorporating the user's specific wording
const rich_explain = "[[section:1. 硬性憲法と軟性憲法の定義]]\\n[[bold:通常の憲法より改正手続が困難な憲法を硬性憲法、法律と同等の手続きで改正できる憲法を軟性憲法といいます。]]\\n憲法の改正手続きが、通常の法律（一般法）の制定・改廃手続きよりも厳格か否かで区別されます。\\n\\n[[bold:2. ドイツ・フランスが「硬性」な理由]]\\n[[red:ドイツ、フランスは改正が頻繁にされるが、法律より改正が困難な為、硬性憲法に分類されます。]]\\n\\n[[marker:ドイツ（基本法）の事例]]\\n1949年の制定以来、[[bold:60回以上]]改正されています。改正には連邦議会（下院）と連邦参議院（上院）の[[red:両方で3分の2以上の賛成]]が必要です。\\n\\n[[marker:フランス（第五共和国憲法）の事例]]\\n1958年の制定以来、[[bold:20回以上]]改正されています。改正には両議院の可決に加え、[[red:国民投票]]または両院合同会議での[[red:5分の3以上の賛成]]が必要です。\\n\\n[[section:3. 国別の比較表]]\\n[[bold:国名 | 改正手続き | 回数 | 分類]]\\n----------------------------------------\\n[[bold:日本]] | 各議院の2/3 + 国民投票 | 0回 | [[bold:硬性]]\\n[[bold:米国]] | 2/3以上の賛成 + 3/4の州承認 | 27回 | [[bold:極めて硬性]]\\n[[bold:独国]] | 連邦議会・参議院の2/3 | 60回+ | [[bold:硬性]]\\n[[bold:英国]] | 通常の法律と同じ | 頻繁 | [[bold:軟性]]\\n\\n[[section:周辺知識：なぜ硬性にする必要があるのか？]]\\n憲法を硬性にする最大の目的は[[marker:「少数派の保護」と「法の安定性」]]です。権力者が自分に都合のいいように規定をコロコロ変えてしまうのを防ぎ、最高法規としての重みを担保します。\\n\\n[[point:「硬性」とは「改正不可能」という意味ではなく、[[red:「熟議を必要とする」]]という意味です！]]";

let subjectStartLine = -1;
for (let i = 0; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": {') || linesArr[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": [') || linesArr[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

let depth = 0;
let questionCount = 0;
let updated = false;

for (let i = arrayStartLine + 1; i < linesArr.length; i++) {
    const line = linesArr[i].trim();

    if (line.includes('{')) {
        if (depth === 0) {
            if (questionCount === 0) {
                for (let j = i; j < linesArr.length; j++) {
                    if (linesArr[j].includes('"explain":') || linesArr[j].includes("'explain':")) {
                        console.log(`Updating accurately Index 0 at Line ${j + 1}...`);
                        linesArr[j] = `        "explain": "${rich_explain}",`;
                        updated = true;
                        break;
                    }
                    if (linesArr[j].trim().startsWith('}') && linesArr[j].includes(',')) break;
                }
            }
            questionCount++;
        }
        depth += (line.match(/{/g) || []).length;
    }

    if (line.includes('}')) {
        depth -= (line.match(/}/g) || []).length;
    }

    if (updated || (questionCount > 1 && depth < 0)) break;
}

if (updated) {
    fs.writeFileSync(filePath, linesArr.join('\n'), 'utf8');
    console.log('Index 0 restored with rich text!');
} else {
    console.log('Failed to find Index 0.');
}
