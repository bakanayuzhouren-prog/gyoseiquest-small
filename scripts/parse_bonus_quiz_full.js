import fs from 'fs';

// Input/Output paths
const INPUT_MD_PATH = 'data/bonus/2025 lec1解答 (2).md';
const OUTPUT_JS_PATH = 'src/bonus_questions.js';
const DEBUG_LOG_PATH = 'debug_parse.txt';

// Read Markdown file
const rawText = fs.readFileSync(INPUT_MD_PATH, 'utf-8');
const lines = rawText.split('\n');

const questions = {};
let currentCategory = '未分類';
let currentTheme = '未分類';
let currentQuestion = null;

// Regex patterns
// Header might look like: | 1 | Theme... or just 1 | Theme... or | 1 Theme... 
// But "1. 妥当" is a choice.
// We look for Number followed by Pipe? Or Pipe Number Pipe?
// Let's look for "Number | Theme" pattern where Theme is not "妥当".
const QUESTION_HEADER_REGEX = /^\|?\s*(\d+)\s*\|\s*(?!妥当|正|誤)(.+)/;
const CHOICE_REGEX = /^(\d+)\s*(?:[\.．])?\s*(妥当|正|誤)/;

// Helper to clean text
const cleanText = (text) => {
    return text
        .replace(/\s+/g, '')
        .replace(/mm/g, '')
        .replace(/_/g, '')
        .replace(/\|/g, '')
        .trim();
};

const logBuffer = [];
const log = (msg) => {
    console.log(msg);
    logBuffer.push(msg);
};

log(`Processing ${lines.length} lines from markdown...`);
// Dump first 100 lines to debug more headers if needed
log("--- START HEADER DUMP ---");
for (let k = 0; k < 100 && k < lines.length; k++) {
    // Only log lines that look like they might be headers (numbers)
    if (lines[k].match(/\d/)) {
        log(`[${k}] ${JSON.stringify(lines[k])}`);
    }
}
log("--- END HEADER DUMP ---");


let qCount = 0;
let choiceCount = 0;

// Main parsing loop
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Detect Question Header
    const qMatch = line.match(QUESTION_HEADER_REGEX);

    // Check if it's NOT a choice (Choice regex matches "1 妥当")
    // Header regex requires "1 | Theme".
    // Note: "| 1 |" matches choice regex? No, choice starts with number.

    if (qMatch) {
        const qNum = qMatch[1];

        // Parse Parts
        const parts = line.split('|').map(p => p.trim());
        const numIdx = parts.findIndex(p => p.match(new RegExp(`^${qNum}$`)));

        let themeRaw = "不明";
        let categoryRaw = "未分類";

        // Attempt to extract Theme/Category
        // Usually after the number
        if (numIdx !== -1 && parts.length > numIdx + 1) {
            let content = parts[numIdx + 1];
            if (content) {
                const catMatch = content.match(/^(.+?)\s*[\(（](.+?)[\)）]/);
                if (catMatch) {
                    themeRaw = catMatch[1];
                    categoryRaw = catMatch[2];
                } else {
                    themeRaw = content;
                }
            }
        } else {
            // Retry with regex capture group 2
            let content = qMatch[2];
            const catMatch = content.match(/^(.+?)\s*[\(（](.+?)[\)）]/);
            if (catMatch) {
                themeRaw = catMatch[1];
                categoryRaw = catMatch[2];
            } else {
                themeRaw = content;
            }
        }

        categoryRaw = cleanText(categoryRaw).replace(/基礎法学.*/, '基礎法学').replace(/憲法.*/, '憲法').replace(/行政法.*/, '行政法').replace(/民法.*/, '民法').replace(/商法.*/, '商法').replace(/一般知識.*/, '一般知識');
        themeRaw = cleanText(themeRaw);

        if (!questions[categoryRaw]) questions[categoryRaw] = {};
        if (!questions[categoryRaw][themeRaw]) questions[categoryRaw][themeRaw] = [];

        currentCategory = categoryRaw;
        currentTheme = themeRaw;

        currentQuestion = {
            qNum: qNum,
            theme: themeRaw,
            choicesRaw: [],
            correctAnswer: null,
            explanation: ""
        };

        questions[currentCategory][currentTheme].push(currentQuestion);
        qCount++;
        log(`Found Question ${qNum}: ${categoryRaw} - ${themeRaw}`);
        continue;
    }

    // 2. Detect Choices 
    if (currentQuestion) {
        const choiceMatch = line.match(CHOICE_REGEX);
        if (choiceMatch) {
            const choiceNum = parseInt(choiceMatch[1]);
            const status = choiceMatch[2];

            let choiceTextLines = [];
            choiceTextLines.push(line);
            let j = i + 1;
            while (j < lines.length) {
                const nextLine = lines[j].trim();
                // Stop if next line is choice or header or Block start
                if (nextLine.match(CHOICE_REGEX) || nextLine.match(QUESTION_HEADER_REGEX) || nextLine.startsWith('【') || (nextLine.startsWith('|') && nextLine.match(/\d/))) {
                    break;
                }
                choiceTextLines.push(nextLine);
                j++;
            }
            i = j - 1;

            const fullText = choiceTextLines.join('');
            let explainText = fullText.replace(/^.*?(\d+)\s*(?:[\.．])?\s*(妥当|正|誤)(.+?p\.?\s*\d+)?\s*/, '');
            explainText = explainText.replace(/『.+?』p\.\d+/, '').trim();

            // FIX: Check for "そのとおり" with spaces removed
            if (fullText.replace(/\s+/g, '').includes('そのとおり')) {
                currentQuestion.correctAnswer = currentQuestion.choicesRaw.length;
                currentQuestion.explanation = explainText;
            }

            currentQuestion.choicesRaw.push({
                num: choiceNum,
                status: status,
                text: explainText,
                raw: fullText
            });
            choiceCount++;
        }
    }
}

log(`Parsed ${qCount} questions and ${choiceCount} choices.`);

// 3. Post-Process
const finalQuestions = {};
let generatedQCount = 0;

Object.keys(questions).forEach(cat => {
    finalQuestions[cat] = {};

    // Gather all themes for distractor generation
    const allThemes = Object.keys(questions[cat]);

    Object.keys(questions[cat]).forEach(theme => {
        const qs = questions[cat][theme].filter(q => q.choicesRaw.length > 0);

        qs.forEach(q => {
            // FIX: Check for matches with spaces removed
            let correctChoice = q.choicesRaw.find(c => c.raw.replace(/\s+/g, '').includes('そのとおり'));

            if (correctChoice) {
                const cleanExplain = correctChoice.text.replace(/その\s*と\s*お\s*り\s*[。、]/, '').trim();
                const correctStatement = cleanExplain.substring(0, 100) + (cleanExplain.length > 100 ? '...' : '');

                // Generate Distractors from OTHER themes
                const otherThemes = allThemes.filter(t => t !== theme);
                let distractors = [];

                for (let k = 0; k < 3; k++) {
                    if (otherThemes.length === 0) break;
                    const randTheme = otherThemes[Math.floor(Math.random() * otherThemes.length)];
                    const otherQs = questions[cat][randTheme];
                    if (otherQs && otherQs.length > 0) {
                        const qOther = otherQs[0];
                        if (qOther.choicesRaw.length > 0) {
                            const cOther = qOther.choicesRaw[Math.floor(Math.random() * qOther.choicesRaw.length)];
                            if (cOther) {
                                let dText = cOther.text.substring(0, 80) + '...';
                                if (!distractors.includes(dText)) {
                                    distractors.push(dText);
                                }
                            }
                        }
                    }
                }

                // Pad match
                while (distractors.length < 3) {
                    distractors.push("（該当なし）");
                }

                const newQ = {
                    text: `${theme}に関する記述として、妥当なもの（正解肢の解説）はどれか。`,
                    choices: [correctStatement, ...distractors],
                    answer: [0],
                    explain: `元問題(${q.qNum})の解説: ${cleanExplain}`
                };

                if (!finalQuestions[cat][theme]) finalQuestions[cat][theme] = [];
                finalQuestions[cat][theme].push(newQ);
                generatedQCount++;
            }
        });
    });
});

log(`Generated ${generatedQCount} questions.`);

let outputContent = 'export const BONUS_QUESTIONS = ' + JSON.stringify(finalQuestions, null, 2) + ';';
fs.writeFileSync(OUTPUT_JS_PATH, outputContent);
fs.writeFileSync(DEBUG_LOG_PATH, logBuffer.join('\n'));
