const fs = require('fs');
const path = require('path');

const dir = 'c:\\dev\\gyosei-quest-small\\src';
const files = fs.readdirSync(dir);

console.log('--- File Sizes in src/ ---');
files.forEach(file => {
    if (file.startsWith('questions.js')) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`${file}: ${stats.size} bytes (${sizeMB} MB) | ${stats.mtime}`);
    }
});
