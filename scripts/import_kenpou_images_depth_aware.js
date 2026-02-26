const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const IMAGE_DIR = path.join(__dirname, '../temp_images/kenpou');

function importWithDepthAwareCounting() {
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

    // 3. Apply images by TOP-LEVEL QUESTION count
    let questionCount = 0;
    let lastAvailableImage = null;
    let depth = 0; // nesting depth within the array

    for (let i = kenStart; i <= kenEnd; i++) {
        const line = lines[i];
        const lineTrim = line.trim();
        
        // Depth tracking logic
        const openBraces = (lineTrim.match(/\{/g) || []).length;
        const closeBraces = (lineTrim.match(/\}/g) || []).length;

        // If we see { and depth is 0, it's a NEW TOP-LEVEL QUESTION
        if (lineTrim.includes('{') && depth === 0) {
            questionCount++;
            const img = availableImages.get(questionCount);
            if (img) lastAvailableImage = img;
            if (questionCount <= 10) console.log(`DEBUG: Question ${questionCount} starts at Line ${i+1}`);
        }

        depth += openBraces;
        depth -= closeBraces;

        if (depth > 0 && line.includes('"explain":')) {
            if (lastAvailableImage) {
                const tag = `[[image:${lastAvailableImage}]]`;
                const quoteIdx = line.indexOf('"');
                const secondQuoteIdx = line.indexOf('"', quoteIdx + 1);
                const explainStartIdx = line.indexOf(':', secondQuoteIdx) + 1;
                const firstCharIdx = line.indexOf('"', explainStartIdx) + 1;
                
                lines[i] = line.slice(0, firstCharIdx) + tag + "\\n\\n" + line.slice(firstCharIdx);
            }
        }
    }

    fs.writeFileSync(QUEST_PATH, lines.join('\n'));
    console.log(`\nSuccessfully re-imported Constitution images based on true TOP-LEVEL question count: ${questionCount}`);
}

importWithDepthAwareCounting();
