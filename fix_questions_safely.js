const fs = require('fs');
const readline = require('readline');

async function fixQuestions() {
    const filePath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';
    const tempPath = filePath + '.tmp';

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const outStream = fs.createWriteStream(tempPath);

    for await (const line of rl) {
        // wordBank: [] を wordBank: "" に置換
        const fixedLine = line.replace(/"wordBank":\s*\[\]/g, '"wordBank": ""');
        outStream.write(fixedLine + '\n');
    }

    outStream.end();

    console.log('Replacing original file with fixed temp file...');
    fs.copyFileSync(tempPath, filePath);
    // fs.unlinkSync(tempPath); // 今回は確認のため残しても良いが、安全のため削除
    console.log('Done!');
}

fixQuestions().catch(err => {
    console.error('Error fixing questions:', err);
    process.exit(1);
});
