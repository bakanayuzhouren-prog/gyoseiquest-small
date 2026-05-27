/**
 * 画像一括追加スクリプト
 * 
 * 使い方:
 * 1. 画像を temp_images/learn/ または temp_images/quiz/ に配置（深掘り用）
 *    レガシー一括追加は temp_images/ 直下も可（addImages.js）
 * 2. node scripts/addImages.js を実行
 * 
 * このスクリプトは以下を自動で行います:
 * - temp_images/ から assets/images/ へ画像をコピー
 * - IMAGE_RESOURCES_MAP に画像エントリを追加
 */

const fs = require('fs');
const path = require('path');

// 設定
const SOURCE_DIR = path.join(__dirname, '..', 'temp_images');
const TARGET_DIR = path.join(__dirname, '..', 'assets', 'images');
const TSX_FILE = path.join(__dirname, '..', 'src', 'imageMap.js');

console.log('=== 画像一括追加スクリプト ===\n');

// temp_images フォルダの存在確認
if (!fs.existsSync(SOURCE_DIR)) {
    console.log('❌ temp_images フォルダが見つかりません。');
    console.log(`   作成してください: ${SOURCE_DIR}`);
    process.exit(1);
}

// 画像ファイルを検索
const imageFiles = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

if (imageFiles.length === 0) {
    console.log('❌ temp_images フォルダに画像がありません。');
    process.exit(1);
}

console.log(`✓ ${imageFiles.length}個の画像を発見しました:\n`);
imageFiles.forEach((file, i) => {
    console.log(`  ${i + 1}. ${file}`);
});
console.log('');

// ステップ1: 画像を一括コピー
console.log('[ステップ1] 画像をコピー中...');
let copiedCount = 0;

imageFiles.forEach(file => {
    const source = path.join(SOURCE_DIR, file);
    const target = path.join(TARGET_DIR, file);

    try {
        fs.copyFileSync(source, target);
        console.log(`  ✓ ${file}`);
        copiedCount++;
    } catch (error) {
        console.log(`  ✗ ${file} - エラー: ${error.message}`);
    }
});

console.log(`\n${copiedCount}/${imageFiles.length} 個の画像をコピーしました。\n`);

// ステップ2: IMAGE_RESOURCES_MAP に追加
console.log('[ステップ2] IMAGE_RESOURCES_MAP を更新中...');

try {
    let mapContent = fs.readFileSync(TSX_FILE, 'utf8');

    // IMAGE_RESOURCES_MAP を検索
    // export const IMAGE_RESOURCES_MAP = { ... };
    const mapPattern = /export const IMAGE_RESOURCES_MAP = \{([^}]+)\};/s;
    const mapMatch = mapContent.match(mapPattern);

    if (!mapMatch) {
        console.log('❌ IMAGE_RESOURCES_MAP が見つかりません。');
        process.exit(1);
    }

    const existingMap = mapMatch[1];

    // 新しいエントリを生成
    const newEntries = imageFiles.map(file => {
        const name = path.basename(file, path.extname(file));
        // 既に存在するか確認
        if (existingMap.includes(`'${name}':`)) {
            console.log(`  - ${name} (既に存在)`);
            return null;
        }

        console.log(`  ✓ ${name}`);
        return `  '${name}': require('@/assets/images/${file}'),`;
    }).filter(entry => entry !== null);

    if (newEntries.length > 0) {
        // マップを更新
        let currentMapStr = mapMatch[0];

        // 既存の最後のエントリにカンマがない場合に追加
        if (/\)\s*\}$/.test(currentMapStr)) {
            currentMapStr = currentMapStr.replace(/\)(\s*)\}$/, '),$1}');
        }

        const updatedMap = currentMapStr.replace(
            /(\s+)(};)/,
            `\n${newEntries.join('\n')}\n$1$2`
        );

        mapContent = mapContent.replace(mapMatch[0], updatedMap);
        fs.writeFileSync(TSX_FILE, mapContent, 'utf8');

        console.log(`\n✓ ${newEntries.length}個のエントリを IMAGE_RESOURCES_MAP に追加しました。`);
    } else {
        console.log('\n- すべての画像が既に登録されています。');
    }

} catch (error) {
    console.log(`❌ エラー: ${error.message}`);
    process.exit(1);
}

console.log('\n=== 完了 ===');
console.log(`\n次のステップ:`);
console.log(`1. node scripts/addImageTags.js を実行して、questions.jsにタグを追加`);
console.log(`2. ブラウザをリロードして確認`);
