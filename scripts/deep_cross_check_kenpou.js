const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const LEARN_PATH = path.join(__dirname, '../src/learn.js');

function deepCrossCheck() {
    console.log("Deep cross-checking learn.js vs questions.js...");

    const learnContent = fs.readFileSync(LEARN_PATH, 'utf-8');
    const questionsContent = fs.readFileSync(QUEST_PATH, 'utf-8');

    // Extract Constitution array from learn.js
    const learnLines = learnContent.split('\n');
    let learnStart = -1;
    let learnEnd = -1;
    for (let i = 0; i < learnLines.length; i++) {
        if (learnLines[i].includes('"憲法": [')) {
            learnStart = i;
            break;
        }
    }
    for (let i = learnStart + 1; i < learnLines.length; i++) {
        if (learnLines[i].trim() === '],') {
            learnEnd = i;
            break;
        }
    }

    const learnItems = [];
    for (let i = learnStart + 1; i < learnEnd; i++) {
        const line = learnLines[i].trim();
        const linkMatch = line.match(/\[\[LINK:(\d+)\]\]/);
        if (linkMatch) {
            learnItems.push({
                itemIdx: learnItems.length,
                linkId: parseInt(linkMatch[1]),
                text: line.replace(/\[\[LINK:\d+\]\]/, "").replace(/",$/, "").replace(/^"/, "")
            });
        }
    }

    // Extract questions.js topo elements
    const questLines = questionsContent.split('\n');
    let questStart = -1;
    for (let i = 0; i < questLines.length; i++) {
        if (questLines[i].includes('"憲法": [')) {
            questStart = i;
            break;
        }
    }

    let topoQuestions = [];
    for (let i = questStart + 1; i < questLines.length; i++) {
        if (questLines[i].trim() === '{' && questLines[i].indexOf('{') === 6) {
            let qText = "";
            let qImg = "None";
            let j = i;
            while(j < questLines.length && questLines[j].trim() !== '},') {
                if (questLines[j].includes('"text":')) {
                    qText = questLines[j].trim().replace(/"text":\s*"/, "").replace(/",$/, "");
                }
                if (questLines[j].includes('"explain":')) {
                    const m = questLines[j].match(/\[\[image:([^\]]+)\]\]/);
                    if (m) qImg = m[1];
                }
                j++;
            }
            topoQuestions.push({
                idx: topoQuestions.length,
                text: qText,
                img: qImg
            });
        }
        if (questLines[i].includes('"行政法": [')) break;
    }

    console.log(`Mismatch Investigation (First 30 items):`);
    console.log(`App# | LINK:N | questions[N] Match? | Image`);
    console.log(`-----|--------|--------------------|-------`);
    for (let i = 0; i < Math.min(30, learnItems.length); i++) {
        const item = learnItems[i];
        const targetQ = topoQuestions[item.linkId];
        let match = "UNKNOWN";
        if (targetQ) {
            // Check if learn item text is contained in question text or vice-versa
            const cleanLearn = item.text.substring(0, 20);
            const cleanQuest = targetQ.text.substring(0, 20);
            if (targetQ.text.includes(cleanLearn) || item.text.includes(cleanQuest)) {
                match = "YES";
            } else {
                match = "NO!";
            }
        }
        console.log(`${(i+1).toString().padEnd(4)} | LINK:${item.linkId.toString().padEnd(2)} | Text Match: ${match.padEnd(4)} | Img: ${targetQ ? targetQ.img : 'N/A'}`);
        if (match === "NO!") {
            console.log(`      LEARN: ${item.text.substring(0, 50)}...`);
            console.log(`      QUEST: ${targetQ ? targetQ.text.substring(0, 50) : 'MISSING'}...`);
        }
    }
}

deepCrossCheck();
