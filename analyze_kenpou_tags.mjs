import fs from 'fs';

const path = 'src/questions.js.bak';
const content = fs.readFileSync(path, 'utf8');

function analyzeKenpou() {
    const searchStr = `"憲法": [`;
    const startIdx = content.indexOf(searchStr);
    if (startIdx === -1) return;

    let braceCount = 0;
    let subContent = "";
    for (let i = startIdx + 8; i < content.length; i++) {
        subContent += content[i];
        if (content[i] === '[') braceCount++;
        if (content[i] === ']') braceCount--;
        if (braceCount === -1) break;
    }

    const items = [];
    let currentItem = "";
    let innerBrace = 0;
    for (let j = 0; j < subContent.length; j++) {
        currentItem += subContent[j];
        if (subContent[j] === '{') innerBrace++;
        if (subContent[j] === '}') {
            innerBrace--;
            if (innerBrace === 0) {
                items.push(currentItem);
                currentItem = "";
            }
        }
    }

    console.log(`Analyzing ${items.length} items in Kenpou...`);

    let imageTags = [];
    items.forEach((item, idx) => {
        const match = item.match(/\[\[image:(\d+)-230\]\]/);
        if (match) {
            imageTags.push({ index: idx, tag: match[0], num: parseInt(match[1]) });
        }
    });

    console.log(`Found ${imageTags.length} items with [[image:n-230]] tags.`);
    if (imageTags.length > 0) {
        console.log(`First tag: ${imageTags[0].tag} at item index ${imageTags[0].index}`);
        console.log(`Last tag: ${imageTags[imageTags.length - 1].tag} at item index ${imageTags[imageTags.length - 1].index}`);
    }

    // Check if there are gaps
    let gaps = [];
    for (let k = 1; k <= 230; k++) {
        if (!imageTags.some(t => t.num === k)) {
            gaps.push(k);
        }
    }
    if (gaps.length > 0) {
        console.log(`Gaps in 1-230 sequence: ${gaps.slice(0, 10).join(', ')}... (Total ${gaps.length} gaps)`);
    } else {
        console.log("No gaps in 1-230 sequence! All 230 questions are present.");
    }
}

analyzeKenpou();
