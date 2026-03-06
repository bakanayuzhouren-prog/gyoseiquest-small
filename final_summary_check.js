const fs = require('fs');
const content = fs.readFileSync('c:/dev/gyosei-quest-small/src/questions.js', 'utf8');

function countOccurrences(str, keyword) {
    let count = 0;
    let pos = str.indexOf(keyword);
    while (pos !== -1) {
        count++;
        pos = str.indexOf(keyword, pos + 1);
    }
    return count;
}

const subjects = ['基礎法学', '憲法', '行政法', '民法'];
subjects.forEach(s => {
    const start = content.indexOf(`"${s}":`);
    if (start === -1) {
        console.log(`${s}: Not found`);
        return;
    }
    // Approximate end of section (next subject or end of object)
    let end = content.length;
    subjects.forEach(otherS => {
        const otherStart = content.indexOf(`"${otherS}":`, start + 1);
        if (otherStart !== -1 && otherStart < end) end = otherStart;
    });

    const section = content.substring(start, end);
    const qCount = countOccurrences(section, '"text":');
    console.log(`${s}: ${qCount} questions found`);
});

console.log('Total characters:', content.length);
console.log('Total text occurrences:', countOccurrences(content, '"text":'));
