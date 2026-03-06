import { readFileSync, writeFileSync } from 'fs';

try {
    // ── temp_check.mjs から 民法物権 配列の中身を抽出 ──
    const tempText = readFileSync('temp_check.mjs', 'utf8');
    const tempLines = tempText.split('\n');

    let tempStart = -1;
    let tempEnd = -1;
    let depth = 0;

    for (let i = 0; i < tempLines.length; i++) {
        const line = tempLines[i];
        if (line.includes('"民法物権"') || line.includes("'民法物権'")) {
            console.log(`temp_check: 民法物権 found at line ${i + 1}: ${line.trim().substring(0, 60)}`);
            // 同行に [ がある場合（例: "民法物権": [）
            if (line.includes('[')) {
                tempStart = i;
                console.log(`  → tempStart (same line) = ${i + 1}`);
                break;
            }
            // 次の [ を探す（最大5行先まで）
            for (let j = i + 1; j < Math.min(i + 6, tempLines.length); j++) {
                const t = tempLines[j].trim();
                if (t === '[' || t.endsWith('[')) {
                    tempStart = j;
                    console.log(`  → tempStart = ${j + 1}`);
                    break;
                }
            }
            if (tempStart !== -1) break;
        }
    }

    if (tempStart === -1) {
        console.error('ERROR: temp_check の民法物権 開始行が見つかりません');
        process.exit(1);
    }

    // [ から対応する ] を探す（深さカウント）
    // 開始行の [ を含む
    depth = 0;
    for (let i = tempStart; i < tempLines.length; i++) {
        for (const ch of tempLines[i]) {
            if (ch === '[') depth++;
            else if (ch === ']') {
                depth--;
                if (depth === 0) {
                    tempEnd = i;
                    break;
                }
            }
        }
        if (tempEnd !== -1) break;
    }

    if (tempEnd === -1) {
        console.error('ERROR: temp_check の民法物権 終了行が見つかりません');
        process.exit(1);
    }

    console.log(`temp_check: 民法物権 array → lines ${tempStart + 1}〜${tempEnd + 1}`);

    // [ の後から ] の前まで（配列の内容部分）を取得
    // "民法物権": [ の行から ] の行まで含めて取得し、questions.js 側と対応させる
    // tempContent = lines (tempStart .. tempEnd) → ただし先頭行は "[" のみにする
    const innerLines = tempLines.slice(tempStart, tempEnd + 1);
    // 先頭行を "[" のみに正規化（"民法物権": [ の場合）
    const firstLine = innerLines[0];
    const bracketIdx = firstLine.indexOf('[');
    const cleanFirst = firstLine.substring(bracketIdx); // "[" から始まる
    innerLines[0] = cleanFirst;
    const tempContent = innerLines.join('\n');

    // ── questions.js の 民法物権 配列の中身を置き換え ──
    const qText = readFileSync('src/questions.js', 'utf8');
    const qLines = qText.split('\n');

    let qStart = -1;
    let qEnd = -1;

    for (let i = 0; i < qLines.length; i++) {
        const line = qLines[i];
        if (line.includes('"民法物権"') || line.includes("'民法物権'")) {
            console.log(`questions.js: 民法物権 found at line ${i + 1}: ${line.trim().substring(0, 60)}`);
            if (line.includes('[')) {
                qStart = i;
                console.log(`  → qStart (same line) = ${i + 1}`);
                break;
            }
            for (let j = i + 1; j < Math.min(i + 6, qLines.length); j++) {
                const t = qLines[j].trim();
                if (t === '[' || t.endsWith('[')) {
                    qStart = j;
                    console.log(`  → qStart = ${j + 1}`);
                    break;
                }
            }
            if (qStart !== -1) break;
        }
    }

    if (qStart === -1) {
        console.error('ERROR: questions.js の民法物権 開始行が見つかりません');
        process.exit(1);
    }

    depth = 0;
    for (let i = qStart; i < qLines.length; i++) {
        for (const ch of qLines[i]) {
            if (ch === '[') depth++;
            else if (ch === ']') {
                depth--;
                if (depth === 0) {
                    qEnd = i;
                    break;
                }
            }
        }
        if (qEnd !== -1) break;
    }

    if (qEnd === -1) {
        console.error('ERROR: questions.js の民法物権 終了行が見つかりません');
        process.exit(1);
    }

    console.log(`questions.js: 民法物権 array → lines ${qStart + 1}〜${qEnd + 1}`);

    // questions.js の先頭行（"民法物権": [）のインデント・キー部分を保持
    const qFirstLine = qLines[qStart];
    const qBracketIdx = qFirstLine.indexOf('[');
    const qKeyPart = qFirstLine.substring(0, qBracketIdx); // "    \"民法物権\": " など

    // 置き換え: [ から ] の中身を temp に差し替え
    const replacedArray = qKeyPart + tempContent;

    const newContent = [
        ...qLines.slice(0, qStart),
        ...replacedArray.split('\n'),
        ...qLines.slice(qEnd + 1)
    ].join('\n');

    // バックアップ（存在しない場合のみ）
    try {
        readFileSync('src/questions.js.bukken_backup');
        console.log('バックアップは既に存在します（スキップ）');
    } catch {
        writeFileSync('src/questions.js.bukken_backup', qText, 'utf8');
        console.log('バックアップ作成: src/questions.js.bukken_backup');
    }

    writeFileSync('src/questions.js', newContent, 'utf8');
    console.log('✅ 置き換え完了');

    // 問題数確認
    const newLines2 = newContent.split('\n');
    let qCount = 0;
    let inSection = false;
    for (const line of newLines2) {
        if (line.includes('"民法物権"')) { inSection = true; continue; }
        if (inSection) {
            if (line.trim().startsWith('"text":')) qCount++;
            if (line.includes('"憲法"') || line.includes('"行政法"') || line.includes('"民法債権"')) break;
        }
    }
    console.log(`✅ 新しい民法物権の問題数: ${qCount}`);

} catch (err) {
    console.error('FATAL ERROR:', err.message);
    console.error(err.stack);
    process.exit(1);
}
