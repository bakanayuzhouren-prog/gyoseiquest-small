const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 50 --pretty=format:%H src/learn.js').toString().split('\n');

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/learn.js`).toString();
        // Use a global match and take the last match to find the second "憲法" array
        const matches = [...content.matchAll(/\"憲法\":\s*\[([\s\S]*?)\]/g)];
        if (matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            const arrayContent = lastMatch[1].trim();
            if (arrayContent === '') {
                console.log(`${commit}: 0`);
                continue;
            }
            const lines = arrayContent.split('\n').filter(line => line.trim().startsWith('"'));
            console.log(`${commit}: ${lines.length}`);
        }
    } catch (e) {
    }
}
