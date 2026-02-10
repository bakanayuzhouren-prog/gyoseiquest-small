const fs = require('fs');
const oldContent = fs.readFileSync('c:/dev/gyosei-quest-small/old_learn.js', 'utf8');
const curContent = fs.readFileSync('c:/dev/gyosei-quest-small/src/learn.js', 'utf8');

const startMarker = '  "憲法": [';
const endMarker = '  ],';

const startIdxOld = oldContent.indexOf(startMarker);
const endIdxOld = oldContent.indexOf(endMarker, startIdxOld);

if (startIdxOld === -1 || endIdxOld === -1) {
    console.error('Markers not found in old_learn.js');
    process.exit(1);
}

const arrayOld = oldContent.substring(startIdxOld, endIdxOld + 4);

const startIdxCur = curContent.indexOf(startMarker);
const endIdxCur = curContent.indexOf(endMarker, startIdxCur);

if (startIdxCur === -1 || endIdxCur === -1) {
    console.error('Markers not found in src/learn.js');
    process.exit(1);
}

const newContent = curContent.substring(0, startIdxCur) + arrayOld + curContent.substring(endIdxCur + 4);

fs.writeFileSync('c:/dev/gyosei-quest-small/src/learn.js', newContent);
console.log('Successfully restored Constitutional array from old_learn.js');
