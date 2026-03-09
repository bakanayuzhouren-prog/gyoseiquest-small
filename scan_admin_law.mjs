import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src').filter(f => f.includes('questions.js') || f.includes('learn.js'));
files.forEach(f => {
    try {
        const filePath = path.join('src', f);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) return;

        console.log(`\n--- Checking File: ${f} (${(stats.size / 1024 / 1024).toFixed(2)} MB) ---`);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for Admin Law in SUBJECTS
        if (content.includes('SUBJECTS')) {
            const adminMatch = content.match(/"行政法":\s*\{([\s\S]*?)\}/);
            if (adminMatch) {
                const subPart = adminMatch[1];
                const keys = subPart.match(/"(.*?)"/g) || [];
                // Filter unique possible keys
                const uniqueKeys = [...new Set(keys)].map(k => k.replace(/"/g, ''));
                console.log('  Admin Law keys found in SUBJECTS:', uniqueKeys.filter(k => k.includes('行政')));
            }
        }

        // Check for Admin Law in LEARN_CONTENT
        if (content.includes('LEARN_CONTENT')) {
            const keys = content.match(/"行政(.*?)"/g) || [];
            const uniqueKeys = [...new Set(keys)].map(k => k.replace(/"/g, ''));
            console.log('  Admin Law keys found in LEARN_CONTENT:', uniqueKeys);
        }

    } catch (e) {
        console.log(`  Error processing ${f}: ${e.message}`);
    }
});
