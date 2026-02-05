const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');


const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src/bonus_questions.js');
const DATA_DIR = path.join(ROOT_DIR, 'data/bonus');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Find PDF files
const pdfFiles = fs.readdirSync(ROOT_DIR).filter(file => file.endsWith('.pdf'));

if (pdfFiles.length === 0) {
    console.log('No PDF files found in root directory.');
    process.exit(0);
}

const targetPdf = pdfFiles[0]; // Process the first one found
const pdfPath = path.join(ROOT_DIR, targetPdf);

console.log(`Processing ${targetPdf}...`);

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function (data) {
    const text = data.text;

    // 1. Determine Subject/Field
    let subject = '行政法';
    let field = '行政法総合';

    if (text.includes('行政事件訴訟法')) {
        subject = '行政法';
        field = '行政事件訴訟法';
    } else if (text.includes('国家賠償法')) {
        subject = '行政法';
        field = '国家賠償法・損失訴訟';
    } else if (text.includes('行政手続法')) {
        subject = '行政法';
        field = '行政手続法';
    } else if (text.includes('行政不服審査法')) {
        subject = '行政法';
        field = '行政不服審査法';
    } else if (text.includes('地方自治法')) {
        subject = '行政法';
        field = '地方自治法';
    } else if (text.includes('憲法')) {
        subject = '憲法';
        field = '憲法';
    } else if (text.includes('民法')) {
        subject = '民法';
        field = '民法総合'; // Simple fallback
    }

    console.log(`Detected Category: ${subject} - ${field}`);

    // 2. Save Markdown
    const fileName = path.basename(targetPdf, '.pdf') + '.md';
    const mdPath = path.join(DATA_DIR, fileName);

    // Clean text (basic)
    const cleanText = text.replace(/\n\s*\n/g, '\n');

    fs.writeFileSync(mdPath, cleanText);
    console.log(`Saved Markdown to ${mdPath}`);

    // 3. Update bonus_questions.js
    // We need to read the existing file and inject/update logic
    // But evaluating JS file to object is hard.
    // Simpler: Read key structure if possible, or just Append? 
    // Appending is tricky because of "export const ...".
    // We will READ the previous BONUS_QUESTIONS by requiring it (if possible and valid JSON-like)
    // Actually, requiring it might fail if we are in module context mismatch (ESM vs CJS).
    // Let's rely on reading the file as text and replacing the object.

    let existingContent = fs.existsSync(OUTPUT_FILE) ? fs.readFileSync(OUTPUT_FILE, 'utf8') : 'export const BONUS_QUESTIONS = {};';

    // Very basic parsing: find the object inside "{ ... }"
    // This is fragile but sufficient for this specific task where we control the file.
    let jsonPart = existingContent.substring(existingContent.indexOf('{'), existingContent.lastIndexOf('}') + 1);

    // If it's empty or invalid, start fresh
    let questionsData = {};
    if (jsonPart && jsonPart.length > 2) {
        // Only if we could simple-parse it. 
        // Since 'require' is available in this node script, let's try to load it dynamically if it's formatted as standard JS object literal (JSON-like).
        // But 'export const' is ESM. Node running CJS might choke.
        // Let's just create a fresh structure or basic regex edit.
        // ACTUALLY: Let's just use a JSON file for data storage? No, app imports JS.

        // Strategy: Use a regex to pull the content, or just rebuild it if we assume it's machine generated.
        // Let's assumes we are APPENDING to the generated structure.
    }

    // Let's try to maintain existing if possible, but for now, let's just Load -> Modify -> Save (using string search)
    // better: let's use a temporary json file to store state? No.

    // Simplest approach: Just load it via string manipulation if it's consistent.
    // Or, just overwrite it with accumulated data if we scan ALL PDFs.
    // BUT we are only processing ONE PDF.

    // Let's implement a "Load all MDs in bonus dir and regenerate bonus_questions.js" approach.
    // This is idempotent and robust.

    regenerateBonusQuestions();

    function regenerateBonusQuestions() {
        console.log('Regenerating bonus_questions.js from stored MD files...');

        const allMdFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
        const newQuestionsData = {};

        allMdFiles.forEach(mdFile => {
            const content = fs.readFileSync(path.join(DATA_DIR, mdFile), 'utf8');
            // We need to re-detect subject/field from content or filename?
            // Let's use content again.
            let subj = '行政法';
            let fld = '行政法総合';

            if (content.includes('行政事件訴訟法')) { subj = '行政法'; fld = '行政事件訴訟法'; }
            else if (content.includes('国家賠償法')) { subj = '行政法'; fld = '国家賠償法・損失訴訟'; }
            else if (content.includes('行政手続法')) { subj = '行政法'; fld = '行政手続法'; }
            else if (content.includes('行政不服審査法')) { subj = '行政法'; fld = '行政不服審査法'; }
            else if (content.includes('地方自治法')) { subj = '行政法'; fld = '地方自治法'; }
            else if (content.includes('憲法')) { subj = '憲法'; fld = '憲法'; }
            else if (content.includes('民法')) { subj = '民法'; fld = '民法総合'; }

            if (!newQuestionsData[subj]) newQuestionsData[subj] = {};
            if (!newQuestionsData[subj][fld]) newQuestionsData[subj][fld] = [];

            newQuestionsData[subj][fld].push({
                text: content.substring(0, 100) + '... (詳細を見る)', // Summary
                choices: ['理解した', 'もう一度読む'], // Dummy choices for a reading task?
                answer: [0],
                explain: 'ボーナスステージです。',
                wordBank: '',
                memo: '',
                slots: [],
                refId: '', // Ideally we'd link to resource, but for now put text in explain?
                // Or better: put the WHOLE textual content in 'text' if it fits?
                // Or create a special 'isBonusReading' type?
                // The app supports 'refId'. If we add a refId, we need to add to Resources.
                // But Resources are also from Sheets.
                // Setting text to the full content might be too long for the card.
                // But let's try setting full content in `explain` or `text` for now.
                // User said "Use it as a problem".
                // Let's put the full content in `text` for now, assuming the UI scrolls.
                fullContent: content, // Custom field
                text: "【ボーナスステージ】以下の資料を読んでください。\n\n" + content.substring(0, 50) + "...",
                isBonus: true,
                // We will hijack the 'explain' to show full text or use a custom mechanism?
                // Wait, App has "Resource Modal". We can inject a resource if we update `PIN_CASES`? No `RESOURCES`.
                // Let's simple put it in `text` if the UI handles long text (it has `isLongText` state).
                // It limits to 15 lines.
                // Maybe we should put it in `explain` and the user answers "Done"?
            });
        });

        const outputContent = `export const BONUS_QUESTIONS = ${JSON.stringify(newQuestionsData, null, 2)};`;
        fs.writeFileSync(OUTPUT_FILE, outputContent);
        console.log(`Updated ${OUTPUT_FILE}`);
    }

});
