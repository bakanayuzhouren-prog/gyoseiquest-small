const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 300 --pretty=format:%H src/learn.js').toString().split('\n').filter(Boolean);

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/learn.js`).toString();
        const matches = [...content.matchAll(/\"憲法\":\s*\[([\s\S]*?)\]/g)];
        let totalCount = 0;
        let counts = [];
        matches.forEach(m => {
            const arr = m[1].trim().split('\n').filter(l => l.trim().startsWith('"'));
            counts.push(arr.length);
            totalCount += arr.length;
        });
        if (counts.length > 0) {
            console.log(`${commit} (count: ${counts.length}): ${counts.join(' + ')} = ${totalCount}`);
        }
    } catch (e) {
    }
}
