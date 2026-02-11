const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const linesArr = rawContent.split(/\r?\n/);

console.log('Updating Constitution Index 0: Text correction and image removal...');

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

const targetText = "通常の憲法より改正手続が困難な憲法を硬性憲法。法律と同等の手続きで改正できる憲法を軟性憲法。ドイツ、フランスは改正が頻繁にされるが、法律より改正が困難な為、硬性憲法に分類される";

let depth = 0;
let questionCount = 0;
let updated = false;

for (let i = arrayStartLine + 1; i < linesArr.length; i++) {
    const line = linesArr[i].trim();

    if (line.includes('{')) {
        if (depth === 0) {
            if (questionCount === 0) {
                // Found Index 0. Now update fields.
                for (let j = i; j < linesArr.length; j++) {
                    const l = linesArr[j];

                    // Update the first choice if it matches the definition (approximate check)
                    if (l.includes('"通常の法律より改正手続が困難な憲法を硬性憲法')) {
                        console.log(`Updating Choice 1 at Line ${j + 1}...`);
                        linesArr[j] = `          "${targetText}",`;
                    }

                    // Update explain and remove image
                    if (l.includes('"explain":') || l.includes("'explain':")) {
                        console.log(`Updating Explain at Line ${j + 1}...`);
                        // The user wants to REPLACE the content or just tweak?
                        // Given the screenshot, it seems they want the simplified text.
                        linesArr[j] = `        "explain": "${targetText}",`;
                    }

                    if (linesArr[j].trim() === '}' || (linesArr[j].trim() === '},')) {
                        // End of Index 0 object
                        updated = true;
                        break;
                    }
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
    console.log('Successfully updated Index 0!');
} else {
    console.log('Could not find Index 0.');
}
