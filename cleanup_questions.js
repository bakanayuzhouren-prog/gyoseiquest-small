const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// Find the start of the corruption
const corruptionStart = '      },,';
if (content.includes(corruptionStart)) {
    console.log('Found corruption at', content.indexOf(corruptionStart));

    // We want to replace everything from the corruption until the start of "民法物権"
    const nextSubject = '"民法物権": [';
    const subjectStart = content.indexOf(nextSubject);

    if (subjectStart !== -1) {
        const targetRangeStart = content.indexOf(corruptionStart);
        // We want to replace from 'corruptionStart' to just before '"民法物権": ['
        // The correct ending of "民法総論" should be:
        //       }
        //     ],
        //     "民法物権": [

        const cleanEnding = '      }\n    ],\n    ';
        // Wait, the newline could be CRLF
        const isCRLF = content.includes('\r\n');
        const finalEnding = isCRLF ? cleanEnding.replace(/\n/g, '\r\n') : cleanEnding;

        content = content.substring(0, targetRangeStart) + finalEnding + content.substring(subjectStart);
        fs.writeFileSync(path, content, 'utf8');
        console.log('Successfully cleaned up questions.js');
    }
} else {
    console.log('Corruption not found exactly. Checking for other artifacts...');
}
