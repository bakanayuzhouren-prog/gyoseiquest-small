require('dotenv').config();
const fs = require('fs');
const path = require('path');

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log('GOOGLE_APPLICATION_CREDENTIALS:', credPath);

if (credPath) {
    const absPath = path.resolve(credPath);
    console.log('Absolute path:', absPath);
    if (fs.existsSync(absPath)) {
        console.log('File exists.');
    } else {
        console.log('File DOES NOT exist.');
        // Check if it's in a subfolder or different relative path
        const adjacentPath = path.join(__dirname, credPath);
        console.log('Checking relative to scripts folder:', adjacentPath);
        if (fs.existsSync(adjacentPath)) {
            console.log('File exists relative to scripts folder!');
        }
    }
} else {
    console.log('GOOGLE_APPLICATION_CREDENTIALS is not set.');
}
