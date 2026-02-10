const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 100 --pretty=format:%H src/learn.js').toString().split('\n').filter(Boolean);

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/learn.js`).toString();
        const matches = [...content.matchAll(/\"憲法\":\s*\[([\s\S]*?)\]/g)];
        if (matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            const arrayContent = lastMatch[1].trim();
            if (arrayContent === '') {
                console.log(`${commit}: 0`);
                continue;
            }
            const lines = arrayContent.split('\n').filter(line => line.trim().startsWith('"'));
            if (lines.length === 233) {
                console.log(`FOUND!! ${commit}: ${lines.length}`);
            } else {
                // console.log(`${commit}: ${lines.length}`);
            }
        }
    } catch (e) {
    }
}
