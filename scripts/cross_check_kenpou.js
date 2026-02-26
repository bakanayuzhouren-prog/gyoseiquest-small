const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const LEARN_PATH = path.join(__dirname, '../src/learn.js');

function crossCheck() {
    console.log("Cross-checking learn.js vs questions.js for Constitution...");

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
                textSnippet: line.substring(0, 30)
            });
        }
    }

    // Extract Constitution array from questions.js
    const questLines = questionsContent.split('\n');
    let questStart = -1;
    for (let i = 0; i < questLines.length; i++) {
        if (questLines[i].includes('"憲法": [')) {
            questStart = i;
            break;
        }
    }

    let topoQuestions = [];
    let questionCount = 0;
    for (let i = questStart + 1; i < questLines.length; i++) {
        if (questLines[i].trim() === '{' && questLines[i].indexOf('{') === 6) {
            let img = "None";
            let j = i;
            while(j < questLines.length && questLines[j].trim() !== '},') {
                if (questLines[j].includes('"explain":')) {
                    const m = questLines[j].match(/\[\[image:([^\]]+)\]\]/);
                    if (m) img = m[1];
                    break;
                }
                j++;
            }
            topoQuestions.push({
                idx: questionCount++,
                img: img
            });
        }
        if (questLines[i].includes('"行政法": [')) break;
    }

    console.log(`App Order | learn.js Info | points to LINK:N | questions[N] Image`);
    console.log(`----------|---------------|----------------|-------------------`);
    for (let i = 0; i < Math.min(10, learnItems.length); i++) {
        const item = learnItems[i];
        const targetQ = topoQuestions[item.linkId];
        console.log(`${(i+1).toString().padEnd(10)} | ${item.textSnippet.padEnd(13)} | LINK:${item.linkId.toString().padEnd(8)} | ${targetQ ? targetQ.img : 'MISSING'}`);
    }
}

crossCheck();
