const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 500 --pretty=format:%H src/learn.js').toString().split('\n').filter(Boolean);

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/learn.js`).toString();
        const matches = [...content.matchAll(/\"憲法\":\s*\[([\s\S]*?)\]/g)];
        let found = false;
        matches.forEach(m => {
            const arr = m[1].trim().split('\n').filter(l => l.trim().startsWith('"'));
            if (arr.length === 233) {
                console.log(`MATCH FOUND: ${commit} has an array with ${arr.length} questions`);
                found = true;
            }
        });
    } catch (e) {
    }
}
