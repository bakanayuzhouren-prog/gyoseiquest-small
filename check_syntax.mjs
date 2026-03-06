import { readFileSync } from 'fs';

try {
    // questions.js ファイルを読み込み、構文エラー箇所を特定する
    const text = readFileSync('src/questions.js', 'utf8');

    // バイナリ的な文字チェック
    let badChars = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code > 0 && code < 9) {
            badChars.push({ pos: i, code, context: text.substring(Math.max(0, i - 20), i + 20) });
        }
    }
    if (badChars.length > 0) {
        console.log('Bad characters found:');
        badChars.slice(0, 5).forEach(b => console.log(`  pos=${b.pos} code=${b.code} ctx="${b.context}"`));
    }

    // 行数と周辺の確認 - 民法物権セクション前後
    const lines = text.split('\n');
    console.log('Total lines:', lines.length);

    // 9743行目前後を確認
    console.log('\n--- Lines 9740-9760 ---');
    for (let i = 9739; i <= Math.min(9759, lines.length - 1); i++) {
        console.log(`${i + 1}: ${lines[i].substring(0, 100)}`);
    }

    // 10185-10195 (セクション終了付近) 確認
    console.log('\n--- Lines 10185-10200 ---');
    for (let i = 10184; i <= Math.min(10199, lines.length - 1); i++) {
        console.log(`${i + 1}: ${lines[i].substring(0, 100)}`);
    }

} catch (err) {
    console.error('Error:', err.message);
}
