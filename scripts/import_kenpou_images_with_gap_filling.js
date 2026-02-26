const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');
const IMAGE_DIR = path.join(__dirname, '../temp_images/kenpou');

function importWithGapFilling() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    // 1. Find Constitution section
    let kenStart = -1;
    let kenEnd = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('"憲法": [')) {
            kenStart = i;
            break;
        }
    }
    if (kenStart === -1) {
        console.error("Constitution section not found.");
        return;
    }
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].includes('"行政法": [')) {
            kenEnd = i - 1;
            break;
        }
    }
    if (kenEnd === -1) kenEnd = lines.length - 1;

    // 2. Map existing images in temp_images/kenpou
    const files = fs.readdirSync(IMAGE_DIR);
    const availableImages = new Map(); // pageIndex (1-based) -> fileName (no ext)

    files.forEach(file => {
        const match = file.match(/^(\d+)-/);
        if (match) {
            const pageNum = parseInt(match[1]);
            const nameWithoutExt = path.parse(file).name;
            availableImages.set(pageNum, nameWithoutExt);
        }
    });

    console.log(`Found ${availableImages.size} available images in ${IMAGE_DIR}`);

    // 3. Clear existing image tags in Constitution section first
    for (let i = kenStart; i <= kenEnd; i++) {
        if (lines[i].includes('"explain":')) {
            lines[i] = lines[i].replace(/\[\[image:[^\]]+\]\]\\n\\n/, "").replace(/\[\[image:[^\]]+\]\]/, "");
        }
    }

    // 4. Fill gaps and apply tags
    // Rule: "番号に空きのある場合、前の番号の画像をインポート"
    // We treat questions in "憲法" as 1-based index for image mapping (1-230.png corresponds to the 1st question)
    
    let explainCount = 0;
    let lastAvailableImage = null;

    for (let i = kenStart; i <= kenEnd; i++) {
        if (lines[i].includes('"explain":')) {
            explainCount++;
            const currentImage = availableImages.get(explainCount);
            
            if (currentImage) {
                lastAvailableImage = currentImage;
            }

            if (lastAvailableImage) {
                const tag = `[[image:${lastAvailableImage}]]`;
                const quoteIdx = lines[i].indexOf('"');
                const secondQuoteIdx = lines[i].indexOf('"', quoteIdx + 1);
                const explainStartIdx = lines[i].indexOf(':', secondQuoteIdx) + 1;
                const firstCharIdx = lines[i].indexOf('"', explainStartIdx) + 1;
                
                lines[i] = lines[i].slice(0, firstCharIdx) + tag + "\\n\\n" + lines[i].slice(firstCharIdx);
                console.log(`  Question ${explainCount}: Assigned ${tag}`);
            }
        }
    }

    fs.writeFileSync(QUEST_PATH, lines.join('\n'));
    console.log(`\nSuccessfully re-imported Constitution images with gap filling.`);
}

importWithGapFilling();
