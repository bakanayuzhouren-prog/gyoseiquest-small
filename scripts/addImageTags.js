/**
 * questions.jsに画像タグを一括追加するスクリプト
 * 
 * 使い方:
 * 1. image_mappings.json を編集してマッピングを定義
 * 2. node scripts/addImageTags.js を実行
 * 
 * このスクリプトは questions.js の chunks[].explain に [[image:...]] タグを追加します
 */

const fs = require('fs');
const path = require('path');

// 設定
const QUESTIONS_FILE = path.join(__dirname, '..', 'src', 'questions.js');
const MAPPINGS_FILE = path.join(__dirname, '..', 'scripts', 'image_mappings.json');

console.log('=== 画像タグ一括追加スクリプト ===\n');

// マッピングファイルの存在確認
if (!fs.existsSync(MAPPINGS_FILE)) {
    console.log('❌ image_mappings.json が見つかりません。');
    console.log(`   サンプルを作成します: ${MAPPINGS_FILE}\n`);

    const sampleMappings = [
        {
            "searchText": "戸別訪問禁止事件",
            "imageName": "door_to_door_4panel",
            "position": "start",
            "comment": "事件名で検索して、chunksのexplainの最初に画像を追加"
        },
        {
            "searchText": "マクリーン事件",
            "imageName": "mclean_case",
            "position": "start",
            "comment": "別の例"
        }
    ];

    fs.writeFileSync(MAPPINGS_FILE, JSON.stringify(sampleMappings, null, 2), 'utf8');
    console.log('✓ サンプルファイルを作成しました。');
    console.log('  編集してから再度実行してください。');
    process.exit(0);
}

// マッピングを読み込み
let mappings;
try {
    const mappingsContent = fs.readFileSync(MAPPINGS_FILE, 'utf8');
    mappings = JSON.parse(mappingsContent);
    console.log(`✓ ${mappings.length}個のマッピングを読み込みました。\n`);
} catch (error) {
    console.log(`❌ マッピングファイルの読み込みエラー: ${error.message}`);
    process.exit(1);
}

// questions.js を読み込み
let content;
try {
    content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
} catch (error) {
    console.log(`❌ questions.js の読み込みエラー: ${error.message}`);
    process.exit(1);
}

// バックアップを作成
const backupFile = QUESTIONS_FILE + '.backup';
fs.writeFileSync(backupFile, content, 'utf8');
console.log(`✓ バックアップを作成しました: ${backupFile}\n`);

console.log('[処理中]\n');

let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

mappings.forEach((mapping, index) => {
    const { searchText, imageName, position } = mapping;

    console.log(`${index + 1}. 処理中: ${searchText}`);

    // chunksのexplainフィールドを検索
    // まず、既に画像タグがあるか確認
    const checkPattern = new RegExp(
        `"title":\\s*"${escapeRegex(searchText)}",[^}]*"explain":\\s*"[^"]*\\[\\[image:${imageName}\\]\\]`,
        's'
    );

    if (checkPattern.test(content)) {
        console.log(`   - スキップ (既に画像タグが存在)`);
        skippedCount++;
        return;
    }

    // 画像タグを追加
    if (position === 'start') {
        // explainの最初に追加
        const pattern = new RegExp(
            `("title":\\s*"${escapeRegex(searchText)}",\\s*"explain":\\s*")((?!\\[\\[image).)`,
            'g'
        );

        const replacement = `$1[[image:${imageName}]]\\\\n\\\\n$2`;
        const before = content;
        content = content.replace(pattern, replacement);

        if (content !== before) {
            console.log(`   ✓ 追加完了`);
            processedCount++;
        } else {
            console.log(`   ✗ パターンが見つかりませんでした`);
            errorCount++;
        }
    } else if (position === 'end') {
        // explainの最後に追加
        const pattern = new RegExp(
            `("title":\\s*"${escapeRegex(searchText)}",[^}]*"explain":\\s*"[^"]+)(")`,
            's'
        );

        const replacement = `$1\\\\n\\\\n[[image:${imageName}]]$2`;
        const before = content;
        content = content.replace(pattern, replacement);

        if (content !== before) {
            console.log(`   ✓ 追加完了`);
            processedCount++;
        } else {
            console.log(`   ✗ パターンが見つかりませんでした`);
            errorCount++;
        }
    }
});

// ファイルを保存
if (processedCount > 0) {
    fs.writeFileSync(QUESTIONS_FILE, content, 'utf8');
    console.log(`\n✓ questions.js を更新しました。`);
}

console.log('\n=== 結果 ===');
console.log(`処理済み: ${processedCount}`);
console.log(`スキップ: ${skippedCount}`);
console.log(`エラー:   ${errorCount}`);
console.log(`合計:     ${mappings.length}`);

if (processedCount > 0) {
    console.log(`\n✓ ブラウザをリロード（Ctrl+Shift+R）して確認してください。`);
}

// 正規表現用のエスケープ関数
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
