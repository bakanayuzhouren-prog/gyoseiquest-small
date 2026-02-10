const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');

// 憲法 4/230 の explain 部分が壊れていることを想定
// "explain": "[[section:... で始まり、途中で改行されている

console.log('Searching for the broken explain field...');

// 修正後の Q&A テキスト（エスケープ済み）
const correctExplainValue = "[[section:憲法と条約の優越関係 Q&A]]\\n[[character:boss]]\\n[[bold:Q1. 憲法と条約、どちらが法的に上位ですか？]]\\n[[character:midBoss]]\\n[[red:A. 憲法です（憲法優位説）。]]\\n日本の判例（砂川事件）は、憲法が条約に対して優越する立場を前提としていると解釈されています。\\n\\n[[character:boss]]\\n[[bold:Q2. なぜ条約より憲法が優先されるのですか？]]\\n[[character:midBoss]]\\n[[red:A. 日本が「硬性憲法」を採用しているからです。]]\\nもし条約が優先されると、政府が外国と約束するだけで、厳しい改正手続き（96条）を経ずに実質的に憲法の内容を変えられてしまうため、これを防ぐ必要があります。\\n\\n[[character:boss]]\\n[[bold:Q3. 裁判所は条約が違憲かどうかを審査しますか？]]\\n[[character:midBoss]]\\n[[red:A. 原則として審査しません（統治行為論）。]]\\n安保条約のような「高度の政治性」を持つものは、司法審査になじまないとして判断を避けます。\\n\\n[[character:boss]]\\n[[bold:Q4. 審査される例外はありますか？]]\\n[[character:midBoss]]\\n[[red:A. 「一見してきわめて明白に違憲無効」な場合のみ審査の対象になります。]]\\n砂川事件の判決では、この例外を認めているため、「条約よりも憲法が上」という立場（憲法優位説）を前提にしていると言えます。\\n\\n[[point:砂川事件の核心は、「一見して明白」でない限り政治の判断を尊重する（統治行為論）という点にあります！」";

// 正規表現で、壊れた explain フィールドを特定して置換
// "explain": "[[section:憲法と条約の優越関係 Q&A]] で始まり、
// 次の "wordBank": までの間にある「本物の改行」を含んだ塊を狙い撃ち
const regex = /"explain": "\[\[section:憲法と条約の優越関係 Q&A\]\][\s\S]*?"wordBank": ""/;
const replacement = `"explain": "${correctExplainValue}",\n        "wordBank": ""`;

if (regex.test(rawContent)) {
    const fixedContent = rawContent.replace(regex, replacement);
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log('Fixed exactly using regex!');
} else {
    console.log('Regex did not match. Trying manual line scan...');
    // もし正規表現が効かない場合は、行ごとのスキャンで修復
    const lines = rawContent.split(/\r?\n/);
    let startLine = -1;
    let endLine = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"explain": "[[section:憲法と条約の優越関係 Q&A]]')) {
            startLine = i;
        }
        if (startLine !== -1 && lines[i].includes('"wordBank": ""')) {
            endLine = i;
            break;
        }
    }

    if (startLine !== -1 && endLine !== -1) {
        lines.splice(startLine, endLine - startLine, `        "explain": "${correctExplainValue}",`);
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log('Fixed using line surgery!');
    } else {
        console.error('Could not find the target to fix.');
    }
}
