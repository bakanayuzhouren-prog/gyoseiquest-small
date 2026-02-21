const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find the entry for 156-230 and update it
const oldExplain = '"explain": "[[image:156-230]]\\n\\n出席議員の5分の1以上の要求があれば、各議員の表決は、これを会議録に記載しなければならない"';
const newExplain = '"explain": "出席議員の5分の1以上の要求があれば、各議員の表決は、これを会議録に記載しなければならない"';

const oldChunks = `        "chunks": []
      },
      {
        "text": "内閣総理大臣は、内閣を代表し`;

const newChunks = `        "chunks": [
          {
            "title": "定足数・表決数まとめ",
            "explain": "[[image:156-230]]"
          }
        ]
      },
      {
        "text": "内閣総理大臣は、内閣を代表し`;

// Find the index of oldExplain first to make sure we're editing the right block
const explainIndex = content.indexOf(oldExplain);
if (explainIndex === -1) {
    console.log('ERROR: explain string not found');
    process.exit(1);
}

// Check that old chunks pattern appears after the explain
const chunksIndex = content.indexOf(oldChunks, explainIndex);
if (chunksIndex === -1) {
    console.log('ERROR: chunks pattern not found after explain');
    process.exit(1);
}

content = content.replace(oldExplain, newExplain);
content = content.replace(oldChunks, newChunks);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: question 156 chunks updated');
