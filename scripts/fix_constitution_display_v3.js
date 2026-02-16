const fs = require('fs');
const path = require('path');

const OLD_FILE = path.join(__dirname, '..', 'src', 'questions.js');

console.log('=== 憲法1, 2, 4問目の画像表示位置修正 (v3) ===\n');

try {
    let content = fs.readFileSync(OLD_FILE, 'utf8');

    const targets = [
        {
            id: '1-230',
            textSnippet: '通常の憲法より改正手続が困難な憲法を硬性憲法',
            imageTag: '[[image:1-230]]'
        },
        {
            id: '2-230',
            textSnippet: '特定の意味を持つ憲法を実質的意味の憲法と呼び',
            imageTag: '[[image:2-230]]'
        },
        {
            id: '4-230',
            textSnippet: '判例では憲法は条約に優越する立場を前提とする',
            imageTag: '[[image:4-230]]'
        }
    ];

    let totalUpdated = 0;

    for (const target of targets) {
        console.log(`処理中: ${target.id}...`);

        const textIndex = content.indexOf(target.textSnippet);
        if (textIndex === -1) {
            console.log(`- 問題文が見つかりません (${target.textSnippet}) - スキップ`);
            continue;
        }

        const chunksIndex = content.indexOf('"chunks": [', textIndex);
        if (chunksIndex === -1) {
            console.log(`- chunksが見つかりません - スキップ`);
            continue;
        }

        // chunksの中身が空配列 [] ならスキップ
        const nextChar = content.substring(chunksIndex + 11, chunksIndex + 13); // ': [' の後
        if (nextChar.includes(']')) {
            console.log(`- chunksは既に空です - スキップ`);
            continue;
        }

        // chunksの中身（explain）を取得
        const searchArea = content.substring(chunksIndex, chunksIndex + 5000); // 範囲を広めに

        const explainMatch = searchArea.match(/"explain":\s*"(.*?)(?<!\\)"/s);

        if (!explainMatch) {
            console.log(`- chunks内のexplainが見つかりません - スキップ`);
            continue;
        }

        let newExplainText = explainMatch[1];

        // タグの整合性チェックと修正
        const openMatches = (newExplainText.match(/\[\[/g) || []).length;
        const closeMatches = (newExplainText.match(/\]\]/g) || []).length;
        if (openMatches > closeMatches) {
            const diff = openMatches - closeMatches;
            console.warn(`⚠ 警告: 閉じカッコが ${diff} 個足りません (${target.id})。補完します。`);
            newExplainText += ']]'.repeat(diff);
        }

        // 親のexplainを探す
        const explainLabelIndex = content.indexOf('"explain": "', textIndex);
        if (explainLabelIndex === -1 || explainLabelIndex > chunksIndex) {
            console.error(`⚠ エラー: 親のexplainが見つかりません (${target.id})`);
            continue;
        }

        const explainContentStart = explainLabelIndex + '"explain": "'.length;
        let explainContentEnd = explainContentStart;
        while (true) {
            explainContentEnd = content.indexOf('"', explainContentEnd + 1);
            if (content[explainContentEnd - 1] !== '\\') break;
        }

        // 親のexplainを置換
        const beforeExplain = content.substring(0, explainContentStart);
        const afterExplain = content.substring(explainContentEnd);
        content = beforeExplain + newExplainText + afterExplain;

        // contentが更新されたので、chunksの位置を再取得
        // textIndexはずれないはず（explainはtextの後ろ）だが念のため再検索
        const newTextIndex = content.indexOf(target.textSnippet);
        const newChunksIndex = content.indexOf('"chunks": [', newTextIndex);

        // chunks [...] の終わりを探すロジック V3 (ブラケットカウント回避)
        // explain値の終わりを探し、その後の「}」その後の「]」を探す

        const chunkContentStart = newChunksIndex + 10;
        const chunkExplainLabelIndex = content.indexOf('"explain": "', chunkContentStart);

        if (chunkExplainLabelIndex === -1) {
            // ここに来ることはないはず（さっき見つかったから）
            console.error('致命的エラー: 置換後にchkunks内explainが見つからない');
            continue;
        }

        let chunkExplainValueEnd = chunkExplainLabelIndex + '"explain": "'.length;
        while (true) {
            chunkExplainValueEnd = content.indexOf('"', chunkExplainValueEnd + 1);
            if (content[chunkExplainValueEnd - 1] !== '\\') break;
        }

        const structureEndIndex = content.indexOf('}', chunkExplainValueEnd);
        const chunksEndIndexV3 = content.indexOf(']', structureEndIndex);

        if (chunksEndIndexV3 !== -1) {
            const beforeChunks = content.substring(0, newChunksIndex);
            const afterChunks = content.substring(chunksEndIndexV3 + 1);
            content = beforeChunks + '"chunks": []' + afterChunks;
            console.log(`✓ 修正完了: ${target.id}`);
            totalUpdated++;
        } else {
            console.error(`⚠ エラー: chunksの終わりが見つかりません (${target.id})`);
        }
    }

    if (totalUpdated > 0) {
        fs.writeFileSync(OLD_FILE, content, 'utf8');
        console.log(`\n=== 完了: ${totalUpdated}件修正しました ===`);
        console.log(`${OLD_FILE} を更新しました。`);
    } else {
        console.log('\n更新対象がありませんでした。');
    }

} catch (err) {
    console.error('エラーが発生しました:', err);
}
