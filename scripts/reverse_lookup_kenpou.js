const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const LEARN_PATH = path.join(__dirname, '../src/learn.js');

function reverseLookup() {
    console.log("Reverse lookup: Identifying which App # each questions.js item corresponds to...");

    const learnContent = fs.readFileSync(LEARN_PATH, 'utf-8');
    const questionsContent = fs.readFileSync(QUEST_PATH, 'utf-8');

    // Parse learn.js Constitution items
    const learnLines = learnContent.split('\n');
    let learnStart = -1, learnEnd = -1;
    for (let i = 0; i < learnLines.length; i++) {
        if (learnLines[i].includes('"憲法": [')) { learnStart = i; break; }
    }
    for (let i = learnStart + 1; i < learnLines.length; i++) {
        if (learnLines[i].trim() === '],') { learnEnd = i; break; }
    }
    const learnList = [];
    for (let i = learnStart + 1; i < learnEnd; i++) {
        const line = learnLines[i].trim();
        learnList.push({
            appNo: learnList.length + 1,
            text: line.replace(/\[\[LINK:\d+\]\]/, "").replace(/",$/, "").replace(/^"/, ""),
            linkId: line.match(/\[\[LINK:(\d+)\]\]/) ? parseInt(line.match(/\[\[LINK:(\d+)\]\]/)[1]) : -1
        });
    }

    // Parse questions.js Constitution items
    const questLines = questionsContent.split('\n');
    let questStart = -1;
    for (let i = 0; i < questLines.length; i++) {
        if (questLines[i].includes('"憲法": [')) { questStart = i; break; }
    }

    let physicalQuestions = [];
    for (let i = questStart + 1; i < questLines.length; i++) {
        if (questLines[i].trim() === '{' && questLines[i].indexOf('{') === 6) {
            let qText = "";
            let img = "None";
            let j = i;
            while(j < questLines.length && questLines[j].trim() !== '},') {
                if (questLines[j].includes('"text":')) qText = questLines[j].trim().replace(/"text":\s*"/, "").replace(/",$/, "");
                if (questLines[j].includes('"explain":')) {
                    const m = questLines[j].match(/\[\[image:([^\]]+)\]\]/);
                    if (m) img = m[1];
                }
                j++;
            }
            physicalQuestions.push({
                idx: physicalQuestions.length,
                text: qText,
                img: img
            });
        }
        if (questLines[i].includes('"行政法": [')) break;
    }

    console.log(`PhysIndex | questions.js Text Snippet | Found in App Item # | Current Img Tag`);
    console.log(`----------|---------------------------|---------------------|----------------`);
    for (let i = 0; i < Math.min(20, physicalQuestions.length); i++) {
        const q = physicalQuestions[i];
        const snippet = q.text.substring(0, 25);
        
        // Find which app item matches this question
        let appNo = "NOT IN APP";
        for (const item of learnList) {
            if (item.linkId === q.idx) {
                appNo = item.appNo;
                break;
            }
        }
        
        console.log(`${q.idx.toString().padEnd(9)} | ${snippet.padEnd(25)} | ${appNo.toString().padEnd(19)} | ${q.img}`);
    }
}

reverseLookup();
