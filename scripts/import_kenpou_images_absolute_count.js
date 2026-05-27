const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const { PATHS } = require('./tempImagesPaths');
const IMAGE_DIR = PATHS.learnKenpou;

function importWithAbsoluteQuestionCount() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('"憲法": [')) {
            kenStart = i;
            break;
        }
    }
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].includes('"行政法": [')) {
            kenEnd = i - 1;
            break;
        }
    }

    if (kenStart === -1) return;

    // 1. Map available images
    const files = fs.readdirSync(IMAGE_DIR);
    const availableImages = new Map();
    files.forEach(file => {
        const match = file.match(/^(\d+)-/);
        if (match) {
            const pageNum = parseInt(match[1]);
            availableImages.set(pageNum, path.parse(file).name);
        }
    });

    // 2. Clear existing image tags in Constitution
    for (let i = kenStart; i <= kenEnd; i++) {
        if (lines[i].includes('"explain":')) {
            lines[i] = lines[i].replace(/\[\[image:[^\]]+\]\]\\n\\n/g, "").replace(/\[\[image:[^\]]+\]\]/g, "");
        }
    }

    // 3. Apply images by QUESTION OBJECT count
    let questionCount = 0;
    let lastAvailableImage = null;
    let inQuestion = false;

    for (let i = kenStart; i <= kenEnd; i++) {
        const lineTrim = lines[i].trim();
        
        if (lineTrim === '{') {
            inQuestion = true;
            questionCount++;
            
            // At start of question, determine the image for this question count
            const img = availableImages.get(questionCount);
            if (img) lastAvailableImage = img;
        }

        if (inQuestion && lines[i].includes('"explain":')) {
            if (lastAvailableImage) {
                const tag = `[[image:${lastAvailableImage}]]`;
                const quoteIdx = lines[i].indexOf('"');
                const secondQuoteIdx = lines[i].indexOf('"', quoteIdx + 1);
                const explainStartIdx = lines[i].indexOf(':', secondQuoteIdx) + 1;
                const firstCharIdx = lines[i].indexOf('"', explainStartIdx) + 1;
                
                lines[i] = lines[i].slice(0, firstCharIdx) + tag + "\\n\\n" + lines[i].slice(firstCharIdx);
                console.log(`  Question ${questionCount} (L${i+1}): Assigned ${tag}`);
            }
        }

        if (lineTrim === '},' || lineTrim === '}') {
            inQuestion = false;
        }
    }

    fs.writeFileSync(QUEST_PATH, lines.join('\n'));
    console.log(`\nSuccessfully re-imported Constitution images based on true question count: ${questionCount}`);
}

importWithAbsoluteQuestionCount();
