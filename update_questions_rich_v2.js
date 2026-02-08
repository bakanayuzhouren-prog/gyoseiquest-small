
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'src', 'questions.js');
const tempPath = path.join(__dirname, 'src', 'questions_temp.js');

const readStream = fs.createReadStream(filePath);
const writeStream = fs.createWriteStream(tempPath);

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const searchString = `"explain": "後見監督人の主な仕事は`;
const newContent = `        "explain": "[[big:後見監督人の主な仕事は「後見人の監視」です。]]\\n詳しい業務内容や、試験に出る重要ポイント（利益相反のルールなど）は、\\n下の「[[red:📌 もっと深掘る（詳細図解）]]」ボタンを押して確認してください！\\n\\n[[bold:後見監督人（こうけんかんとくにん）]]とは、成年後見人の仕事をチェックする人のこと。\\n\\n[[marker:家庭裁判所が必要だと判断したときに選ばれます。]]\\n必ず選ばなきゃいけないわけではありません。\\n\\n後見監督人の主な仕事は[[red:４つ]]\\n１．後見人の事務を監督する\\n２．後見人がいなくなったときに、遅滞なく後見人を選任する\\n３．急迫の事情があるときに、必要な処分をする\\n４．後見人と本人の利益が相反するときに、本人を代表する",`;

let found = false;

rl.on('line', (line) => {
    if (!found && line.includes(searchString)) {
        writeStream.write(newContent + '\n');
        found = true;
        console.log('Found and replaced the target line.');
    } else {
        writeStream.write(line + '\n');
    }
});

rl.on('close', () => {
    writeStream.end();
    writeStream.on('finish', () => {
        if (found) {
            fs.copyFileSync(tempPath, filePath);
            fs.unlinkSync(tempPath);
            console.log('Successfully updated questions.js');
        } else {
            console.error('Target line not found.');
            fs.unlinkSync(tempPath);
            process.exit(1);
        }
    });
});
