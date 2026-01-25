const { SUBJECTS } = require('../src/questions.js');

console.log('--- Top Level Keys ---');
console.log(Object.keys(SUBJECTS));

if (SUBJECTS['行政法']) {
    console.log('\n--- 行政法 Keys ---');
    console.log(Object.keys(SUBJECTS['行政法']));

    if (SUBJECTS['行政法']['行政法総論']) {
        console.log('\n--- 行政法総論 First Question ---');
        const q1 = SUBJECTS['行政法']['行政法総論'][0];
        console.log('Text:', q1.text.substring(0, 50) + '...');
        console.log('RefId:', q1.refId);

        // Also check if valid resources exist
        // We can't easily import RESOURCES because it's a named export in the same file
        // but we can at least verify the refId matches something we expect.
    } else {
        console.log('Key "行政法総論" not found under "行政法"');
    }
} else {
    console.log('Key "行政法" not found');
}
