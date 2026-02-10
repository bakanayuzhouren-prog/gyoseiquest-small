const { execSync } = require('child_process');
const fs = require('fs');

const commits = execSync('git log -n 50 --pretty=format:%H src/learn.js').toString().split('\n');

for (const commit of commits) {
    try {
        const content = execSync(`git show ${commit}:src/learn.js`).toString();
        const match = content.match(/\"憲法\":\s*\[([\s\S]*?)\]/);
        if (match) {
            const arrayContent = match[1].trim();
            if (arrayContent === '') {
                console.log(`${commit}: 0`);
                continue;
            }
            const lines = arrayContent.split('\n').filter(line => line.trim().startsWith('"'));
            console.log(`${commit}: ${lines.length}`);
        }
    } catch (e) {
        // Skip commits where file might not exist or other errors
    }
}
