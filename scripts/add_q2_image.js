/**
 * questions.jsに画像タグを追加するスクリプト（改良版）
 * 
 * 複数の問題が同じchunks.titleを持つ場合に対応
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '..', 'src', 'questions.js');

console.log('=== 憲法2/230に画像タグ追加 ===\n');

let content = fs.readFileSync(QUESTIONS_FILE, 'utf8');

// バックアップを作成
const backupFile = QUESTIONS_FILE + '.backup';
fs.writeFileSync(backupFile, content, 'utf8');
console.log(`✓ バックアップを作成しました\n`);

// 憲法2/230の問題を特定する
// "特定の意味を持つ憲法を実質的意味の憲法" というテキストで特定
const pattern = /"text": "特定の意味を持つ憲法を実質的意味の憲法[^"]*"[^}]*"chunks": \[\s*\{\s*"title": "参考解説",\s*"explain": "([^"]*1\. 実質的意味の憲法)/;

const match = content.match(pattern);

if (match) {
    console.log('✓ 憲法2/230を発見しました');

    // 既に画像タグがあるか確認
    if (match[1].includes('[[image:substantive_formal_constitution]]')) {
        console.log('- 既に画像タグが存在します');
    } else {
        // 画像タグを追加
        const replacement = content.replace(
            pattern,
            (fullMatch) => {
                return fullMatch.replace(
                    /"explain": "1\. 実質的意味の憲法/,
                    '"explain": "[[image:substantive_formal_constitution]]\\\\n\\\\n1. 実質的意味の憲法'
                );
            }
        );

        fs.writeFileSync(QUESTIONS_FILE, replacement, 'utf8');
        console.log('✓ 画像タグを追加しました');
    }
} else {
    console.log('✗ 憲法2/230が見つかりませんでした');
}

console.log('\n=== 完了 ===');
