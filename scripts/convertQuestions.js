const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputPath = path.join(__dirname, '..', 'data', 'questions.csv');
const outputPath = path.join(__dirname, '..', 'src', 'questions.js');

const results = {};

fs.createReadStream(inputPath)
  .pipe(csv())
  .on('data', (data) => {
    const subject = data.subject;
    const field = data.field;
    if (!results[subject]) {
      results[subject] = {};
    }
    if (!results[subject][field]) {
      results[subject][field] = [];
    }
    results[subject][field].push({
      text: data.text,
      choices: [data.choice1, data.choice2, data.choice3, data.choice4],
      answer: parseInt(data.answer) - 1, // 0-based
      explain: data.explain,
    });
  })
  .on('end', () => {
    const content = `// 自動生成・手動編集禁止
export const SUBJECTS = ${JSON.stringify(results, null, 2)};
`;
    fs.writeFileSync(outputPath, content);
    console.log('questions.js generated successfully');
  });