const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

const startText = '"refId": "civil_unqualified_agency_demand"';
const firstPos = content.indexOf(startText);
if (firstPos === -1) {
    console.error('Target not found');
    process.exit(1);
}

const secondPos = content.indexOf(startText, firstPos + startText.length);
if (secondPos !== -1) {
    console.log('Duplicate found at', secondPos);

    // Find the end of the question object (the next '},')
    const endOfObject = content.indexOf('      }', secondPos);
    if (endOfObject === -1) {
        console.error('Could not find end of object');
        process.exit(1);
    }

    // Also include the '      },\n' before the object
    const startOfObject = content.lastIndexOf('      {', secondPos);
    if (startOfObject === -1) {
        console.error('Could not find start of object');
        process.exit(1);
    }

    // Let's refine the range to remove the whole object chunk including its leading '      },\n'
    // Actually, in the duplicated part, it looks like:
    // ... Q53-1 }
    //       },
    //       { Q53-2 }

    let deleteStart = content.lastIndexOf('      },', secondPos);
    let deleteEnd = endOfObject + 7; // up to '      },'

    // Wait, let's look at the actual content around the duplicate to be sure.
    console.log('Context around duplicate:', JSON.stringify(content.substring(secondPos - 100, secondPos + 500)));

    // Correct deletion logic:
    // Find the '      },' just before the duplicate '{'
    let duplicateStart = content.lastIndexOf('      {', secondPos);
    let previousComma = content.lastIndexOf('},', duplicateStart);
    if (previousComma !== -1) {
        // Remove from after that comma up to the end of this object
        const nextObjectEnd = content.indexOf('      }', secondPos);
        if (nextObjectEnd !== -1) {
            const nextObjectComma = content.indexOf('},', nextObjectEnd);
            // We want to remove the ',\n      {\n ... \n      }'
            let toDelete = content.substring(previousComma + 2, nextObjectEnd + 7);
            content = content.substring(0, previousComma + 2) + content.substring(nextObjectEnd + 7);
            fs.writeFileSync(path, content, 'utf8');
            console.log('Successfully removed duplicate question');
        }
    }
} else {
    console.log('No duplicate found');
}
