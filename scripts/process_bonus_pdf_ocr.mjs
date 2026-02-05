import { Canvas, createCanvas, Image } from 'canvas';
import fs from 'fs';
import path from 'path';

// Polyfill Image for pdfjs-dist
if (!global.Image) {
    global.Image = Image;
}
if (!global.HTMLCanvasElement) {
    global.HTMLCanvasElement = Canvas;
}
// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'; // Removed static import
import { createWorker } from 'tesseract.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src/bonus_questions.js');
const DATA_DIR = path.join(ROOT_DIR, 'data/bonus');

// Polyfill DOMMatrix for Node.js
if (!global.DOMMatrix) {
    global.DOMMatrix = class DOMMatrix {
        constructor(init) {
            this.a = 1; this.b = 0;
            this.c = 0; this.d = 1;
            this.e = 0; this.f = 0;
            if (init && typeof init === 'string') {
                // Simplified parsing or ignoring
            } else if (Array.isArray(init) && init.length === 6) {
                [this.a, this.b, this.c, this.d, this.e, this.f] = init;
            }
        }
        setMatrixValue(str) { }
        translate(tx, ty) { return this; }
        scale(sx, sy) { return this; }
        multiply(other) { return this; }
        toString() { return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`; }
    };
}

// NodeCanvasFactory definition
class NodeCanvasFactory {
    create(width, height) {
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        return {
            canvas: canvas,
            context: context,
        };
    }

    reset(canvasAndContext, width, height) {
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext) {
        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    }
}

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

const targetPdf = pdfFiles[0];
const pdfPath = path.join(ROOT_DIR, targetPdf);

console.log(`Processing ${targetPdf} with OCR...`);

async function processPdf() {
    try {
        // Dynamic import after polyfill
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

        const dataBuffer = fs.readFileSync(pdfPath);
        const uint8Array = new Uint8Array(dataBuffer);

        // Prepare font URL with trailing slash
        const fontPath = path.join(ROOT_DIR, 'node_modules/pdfjs-dist/standard_fonts/');
        let fontUrl = pathToFileURL(fontPath).href;
        if (!fontUrl.endsWith('/')) fontUrl += '/';

        const loadingTask = pdfjsLib.getDocument({
            data: uint8Array,
            standardFontDataUrl: fontUrl
        });

        const pdfDocument = await loadingTask.promise;
        const numPages = pdfDocument.numPages;
        console.log(`PDF loaded. Total pages: ${numPages}`);

        // Initialize Tesseract Worker
        const worker = await createWorker('jpn');

        let fullText = '';

        for (let i = 1; i <= numPages; i++) {
            console.log(`Processing page ${i}/${numPages}...`);
            const page = await pdfDocument.getPage(i);
            const ops = await page.getOperatorList();

            // Loop through operators to find images
            for (let j = 0; j < ops.fnArray.length; j++) {
                const fn = ops.fnArray[j];
                const args = ops.argsArray[j];

                if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
                    const imgName = args[0];
                    try {
                        let img;
                        if (fn === pdfjsLib.OPS.paintInlineImageXObject) {
                            img = args[0];
                        } else {
                            img = await page.objs.get(imgName);
                        }

                        if (img && img.width && img.height) {
                            // Construct canvas
                            const canvas = createCanvas(img.width, img.height);
                            const ctx = canvas.getContext('2d');

                            const imgData = ctx.createImageData(img.width, img.height);

                            if (img.data.length === img.width * img.height * 4) {
                                imgData.data.set(img.data);
                            } else if (img.data.length === img.width * img.height * 3) {
                                // RGB to RGBA
                                for (let p = 0, k = 0; p < img.data.length; p += 3, k += 4) {
                                    imgData.data[k] = img.data[p];
                                    imgData.data[k + 1] = img.data[p + 1];
                                    imgData.data[k + 2] = img.data[p + 2];
                                    imgData.data[k + 3] = 255;
                                }
                            } else {
                                if (img.data.length === img.width * img.height) {
                                    for (let p = 0, k = 0; p < img.data.length; p++, k += 4) {
                                        const val = img.data[p];
                                        imgData.data[k] = val;
                                        imgData.data[k + 1] = val;
                                        imgData.data[k + 2] = val;
                                        imgData.data[k + 3] = 255;
                                    }
                                }
                            }

                            ctx.putImageData(imgData, 0, 0);

                            const imageBuffer = canvas.toBuffer('image/png');
                            // const fs = require('fs'); fs.writeFileSync('debug_img_' + i + '_' + j + '.png', imageBuffer);

                            const ret = await worker.recognize(imageBuffer);
                            if (ret.data.text && ret.data.text.trim().length > 0) {
                                fullText += ret.data.text + '\n\n';
                            }
                        }
                    } catch (e) {
                        console.error('Failed to extract/process image:', e);
                    }
                }
            }
        }

        await worker.terminate();
        console.log('OCR Complete.');

        // 1. Determine Subject/Field
        let subject = '行政法';
        let field = '行政法総合';

        if (fullText.includes('行政事件訴訟法')) { subject = '行政法'; field = '行政事件訴訟法'; }
        else if (fullText.includes('国家賠償法')) { subject = '行政法'; field = '国家賠償法・損失訴訟'; }
        else if (fullText.includes('行政手続法')) { subject = '行政法'; field = '行政手続法'; }
        else if (fullText.includes('行政不服審査法')) { subject = '行政法'; field = '行政不服審査法'; }
        else if (fullText.includes('地方自治法')) { subject = '行政法'; field = '地方自治法'; }
        else if (fullText.includes('憲法')) { subject = '憲法'; field = '憲法'; }
        else if (fullText.includes('民法')) { subject = '民法'; field = '民法総合'; }

        console.log(`Detected Category: ${subject} - ${field}`);

        // 2. Save Markdown
        const fileName = path.basename(targetPdf, '.pdf') + '.md';
        const mdPath = path.join(DATA_DIR, fileName);

        const cleanText = fullText.replace(/\n\s*\n/g, '\n');

        fs.writeFileSync(mdPath, cleanText);
        console.log(`Saved Markdown to ${mdPath}`);

        // 3. Regenerate JS
        regenerateBonusQuestions();

    } catch (err) {
        console.error('Error during OCR processing:', err);
    }
}

function regenerateBonusQuestions() {
    console.log('Regenerating bonus_questions.js from stored MD files...');

    if (!fs.existsSync(DATA_DIR)) return;

    const allMdFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
    const newQuestionsData = {};

    allMdFiles.forEach(mdFile => {
        const content = fs.readFileSync(path.join(DATA_DIR, mdFile), 'utf8');

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
            text: "【ボーナスステージ】以下の資料を読んでください。\n\n" + content.substring(0, 100) + "...",
            choices: ['理解した', 'もう一度読む'],
            answer: [0],
            explain: 'ボーナスステージです。全文:\n' + content,
            wordBank: '',
            memo: '',
            slots: [],
            refId: '',
            fullContent: content,
            isBonus: true,
            isLongText: true,
        });
    });

    const outputContent = `export const BONUS_QUESTIONS = ${JSON.stringify(newQuestionsData, null, 2)};`;
    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Updated ${OUTPUT_FILE}`);
}

processPdf();
