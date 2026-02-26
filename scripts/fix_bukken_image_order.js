/**
 * fix_bukken_image_order.js
 * src/questions.js の「民法物権」セクションにおいて、
 * explain フィールドの末尾にある [[image:...]] タグを先頭に移動させる。
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_PATH = path.join(__dirname, '../src/questions.js');

function run() {
    console.log('questions.js を読み込み中...');
    let src = fs.readFileSync(QUESTIONS_PATH, 'utf-8');

    // explain フィールドを正規表現で一括検索
    // "explain": "..." の形式を探す。
    const explainRegex = /"explain"\s*:\s*("(?:[^"\\]|\\.)*")/g;

    let updatedCount = 0;
    let newSrc = src.replace(explainRegex, (match, explainJson) => {
        // 文字列の中身を取り出す（前後の引用符を除く）
        let content = explainJson.substring(1, explainJson.length - 1);

        // [[image:xxx]] タグを探す (エスケープされた改行 \n を含む場合と含まない場合)
        const imageRegex = /(?:\\n)*\[\[image:[^\]]+\]\](?:\\n)*/g;
        let imageTags = [];
        let matchImage;

        // content のコピーに対して exec を実行し、元の content は変更しない
        let tempContentForRegex = content;
        while ((matchImage = imageRegex.exec(tempContentForRegex)) !== null) {
            imageTags.push(matchImage[0].trim().replace(/^(\\n)+|(\\n)+$/g, ''));
        }

        if (imageTags.length > 0) {
            // タグを除去したクリーンな説明文を作成
            // 全ての画像タグを除去
            let cleanContent = content.replace(imageRegex, '').trim();

            // 画像タグを先頭に移動し、2つの改行を入れる
            let newContent = imageTags.join('\\n') + '\\n\\n' + cleanContent;

            let newExplainJson = '"' + newContent + '"';

            if (newExplainJson !== explainJson) {
                updatedCount++;
                return `"explain": ${newExplainJson}`;
            }
        }
        return match;
    });

    if (updatedCount > 0) {
        fs.writeFileSync(QUESTIONS_PATH, newSrc);
        console.log(`questions.js 更新完了: ${updatedCount} 件修正`);
    } else {
        console.log('修正が必要な箇所は見つかりませんでした。');
    }
}

run();
