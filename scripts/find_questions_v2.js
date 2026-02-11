const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 500 --pretty=format:%H src/questions.js').toString().split('\n').filter(Boolean);

console.log(`Checking ${commits.length} commits...`);

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/questions.js`).toString();
        // Look for the "憲法" subject block
        const kempouIndex = content.indexOf('"憲法":');
        if (kempouIndex !== -1) {
            // Find the array [ ... ] inside this block
            const arrayStartIndex = content.indexOf('[', kempouIndex);
            if (arrayStartIndex !== -1) {
                let bracketCount = 0;
                let arrayEndIndex = -1;
                for (let i = arrayStartIndex; i < content.length; i++) {
                    if (content[i] === '[') bracketCount++;
                    else if (content[i] === ']') {
                        bracketCount--;
                        if (bracketCount === 0) {
                            arrayEndIndex = i;
                            break;
                        }
                    }
                }

                if (arrayEndIndex !== -1) {
                    const arrayStr = content.substring(arrayStartIndex, arrayEndIndex + 1);
                    const count = (arrayStr.match(/\{\s*\"text\"/g) || []).length;
                    if (count >= 200) {
                        console.log(`FOUND!! Commit: ${commit} | Count: ${count}`);
                        fs.writeFileSync('restored_questions_const.json', JSON.stringify({ commit, count, content: arrayStr }, null, 2));
                        process.exit(0);
                    } else {
                        console.log(`Commit: ${commit.substring(0, 7)} | Count: ${count}`);
                    }
                }
            }
        }
    } catch (e) {
        // console.error(`Error checking ${commit}:`, e.message);
    }
}

console.log("Finished searching. No commit with >= 200 items found.");
process.exit(1);
