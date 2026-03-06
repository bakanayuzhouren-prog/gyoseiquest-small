import { readFileSync, writeFileSync } from 'fs';

const text = readFileSync('src/questions.js', 'utf8');

// 民法物権セクション内の壊れた空文字列を修正
// パターン: "fieldName": ", → "fieldName": "",
// これらのフィールドは値が `"` だけで未閉じになっている
let fixed = text;

// 民法物権セクションの範囲のみ修正する
// 9743行目から始まるセクションを対象にする
const sectionMarker = '"民法物権": [';
const sectionIdx = fixed.indexOf(sectionMarker);

if (sectionIdx === -1) {
    console.error('民法物権セクションが見つかりません');
    process.exit(1);
}

// セクションの終わりを探す（次の主要セクション）
// 具体的には民法物権セクション内のみ置換
const beforeSection = fixed.substring(0, sectionIdx + sectionMarker.length);

// セクション以降のテキストで未閉じ文字列を修正
let afterMarker = fixed.substring(sectionIdx + sectionMarker.length);

// 次の主要セクションを探す（例："憲法": [）
// 置換範囲をセクション内だけに限定
const nextSectionMatch = afterMarker.match(/\n\s+"[^"]+": \[/);
// 実際には全ファイルで置換（安全な置換のみ）

// 壊れたパターンを修正: 改行前に単独の " がある場合
// "explain": ",\r\n → "explain": "",\r\n
// "wordBank": ",\r\n → "wordBank": "",\r\n
// "memo": ",\r\n → "memo": "",\r\n
// "refId": ",\r\n → "refId": "",\r\n

const patterns = [
    [/"explain": ",(\r?\n)/g, '"explain": "",$1'],
    [/"wordBank": ",(\r?\n)/g, '"wordBank": "",$1'],
    [/"memo": ",(\r?\n)/g, '"memo": "",$1'],
    [/"refId": ",(\r?\n)/g, '"refId": "",$1'],
];

let count = 0;
for (const [pattern, replacement] of patterns) {
    const before = fixed.length;
    fixed = fixed.replace(pattern, replacement);
    const replaced = (fixed.length - before + replacement.replace('$1', '\n').length - (pattern.toString().length)) || 0;
    const matches = text.match(pattern);
    if (matches) {
        count += matches.length;
        console.log(`✅ Pattern ${pattern.toString().substring(0, 30)}... → ${matches.length} 件修正`);
    }
}

writeFileSync('src/questions.js', fixed, 'utf8');
console.log(`✅ 合計 ${count} 件の未閉じ文字列を修正しました`);
