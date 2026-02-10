const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 44 to 48 (Marriage Name Case)...');

const marriageNameExplain = "[[section:解説：夫婦別姓訴訟（最大判 平27.12.16）]]\\n[[character:boss]]\\n「氏は個人の人格の象徴」でありつつも、夫婦同氏制を合憲とした現代家族法の重要判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 氏（名字）の法的性質]]\\n・[[bold:人格権的側面]]: 氏は個人を識別し、人格の象徴として尊重されるべきものです。\\n・[[bold:社会制度的側面]]: 氏は「家族の呼称」としての機能も持ちます。そのため、どのような制度にするかは[[red:立法府（国会）の合理的な裁量]]に委ねられます。\\n\\n[[bold:2. 合憲か違憲か？（最高裁のスタンス）]]\\n・[[bold:多数意見（合憲）]]: 家族を一つの氏で呼ぶことには合理性があり、通称使用も広まっているため、改姓による不利益は緩和されている。\\n・[[bold:結論]]: 民法750条（夫婦同氏）は憲法13条、14条、24条に[[red:違反しない。]]\\n\\n[[big:【合憲 vs 違憲 議論の対比】]]\\n・[[bold:合憲派]]: 社会の伝統や家族のまとまりを重視。国会で決めるべき。\\n・[[bold:違憲派]]: 個人のアイデンティティと男女の不平等を重視。裁判所が正すべき。\\n\\n[[point:結論は「合憲」！でも、名字が「人格の象徴」であるという前提文を入れ替えたりする問題が出るので注意です！]]";

let subjectStartLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"憲法": {') || lines[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < lines.length; i++) {
    if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

let questionCount = 0;
let updatedCount = 0;
const targetIndices = [44, 45, 46, 47, 48];

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (targetIndices.includes(questionCount)) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${marriageNameExplain}",`;
                    updatedCount++;
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (updatedCount === targetIndices.length) break;
}

if (updatedCount < targetIndices.length) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete for all 5 questions!');
