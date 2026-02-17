import path from 'path';
import { fileURLToPath } from 'url';
import { SUBJECTS } from '../src/questions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function stripImages(text) {
    return text.replace(/\[\[image:[^\]]+\]\]\s*/g, '').trim();
}

function getImages(text) {
    const matches = text.match(/\[\[image:[^\]]+\]\]/g);
    return matches || [];
}

const explainGroups = new Map();

// Traverse the SUBJECTS object
for (const subjectKey in SUBJECTS) {
    const subject = SUBJECTS[subjectKey];
    for (const subKey in subject) {
        const questions = subject[subKey];
        questions.forEach((q, index) => {
            if (!q.explain) return;

            const cleanText = stripImages(q.explain);
            if (!cleanText) return; // Skip empty explanations

            if (!explainGroups.has(cleanText)) {
                explainGroups.set(cleanText, []);
            }
            explainGroups.get(cleanText).push({
                subject: subjectKey,
                subCategory: subKey,
                index: index,
                originalText: q.explain,
                images: getImages(q.explain)
            });
        });
    }
}

// Analyze groups
let replacementsNeeded = 0;

console.log('--- Analysis Report ---');

for (const [text, occurrences] of explainGroups) {
    if (occurrences.length < 2) continue;

    const allImages = new Set();
    occurrences.forEach(occ => {
        occ.images.forEach(img => allImages.add(img));
    });

    if (allImages.size === 0) continue; // No images in any of them, nothing to sync

    // Check if any occurrence is missing images
    const sortedImages = Array.from(allImages).sort();
    const optimalPrefix = sortedImages.join('\n\n') + (sortedImages.length > 0 ? '\n\n' : '');
    const expectedText = optimalPrefix + text;

    const needsFix = occurrences.some(occ => {
        // Simple check: does the original text contain all images?
        // Better: reconstruct and compare, but original formatting might differ slightly.
        // Let's just check if the set of images matches.
        const currentImageSet = new Set(occ.images);
        if (currentImageSet.size !== allImages.size) return true;
        for (let img of allImages) {
            if (!currentImageSet.has(img)) return true;
        }
        return false;
    });

    if (needsFix) {
        console.log(`\nGroup: "${text.substring(0, 30)}..." has ${occurrences.length} occurrences.`);
        console.log(`Images found in group: ${Array.from(allImages).join(', ')}`);
        replacementsNeeded++;

        occurrences.forEach(occ => {
            const hasAll = occ.images.length === allImages.size; // Simplified check
            if (!hasAll) {
                console.log(`  - [TARGET] ${occ.subject}/${occ.subCategory} Index:${occ.index} missing images.`);
            }
        });
    }
}

console.log(`\nTotal groups needing synchronization: ${replacementsNeeded}`);
