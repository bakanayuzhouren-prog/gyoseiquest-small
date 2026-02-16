const fs = require('fs');
const path = require('path');

const OLD_FILE = path.join(__dirname, '..', 'src', 'questions.js');
// const NEW_FILE = path.join(__dirname, '..', 'src', 'questions_fixed.js'); 

console.log('=== 憲法1, 2, 4問目の画像表示位置修正 (v2) ===\n');

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

    // 毎回content全体から検索し直して更新していくスタイル
    for (const target of targets) {
        console.log(`処理中: ${target.id}...`);

        const textIndex = content.indexOf(target.textSnippet);
        if (textIndex === -1) {
            console.error(`⚠ エラー: 問題文が見つかりません (${target.textSnippet})`);
            continue;
        }

        const chunksIndex = content.indexOf('"chunks": [', textIndex);
        if (chunksIndex === -1) {
            console.error(`⚠ エラー: chunksが見つかりません (${target.id})`);
            continue;
        }

        // chunksの中身（explain）を取得
        // chunksIndex以降の2000文字を取得して検索（]問題の回避）
        const searchArea = content.substring(chunksIndex, chunksIndex + 2000);

        // "explain": "..." を探す
        // 値の中に \" がある場合に備えて、[^"]* ではなく (.*?) と (?<!\\)" を使う
        const explainMatch = searchArea.match(/"explain":\s*"(.*?)(?<!\\)"/s);

        if (!explainMatch) {
            console.error(`⚠ エラー: chunks内のexplainが見つかりません (${target.id})`);
            console.log('Search area preview:', searchArea.substring(0, 200));
            continue;
        }

        let newExplainText = explainMatch[1];

        // エスケープされた改行 \\n を、実際の改行 \n に戻す必要は...ない。
        // content内の文字は \\n のまま扱われるべき。
        // ただし、画像タグが入っていない場合は警告
        if (!newExplainText.includes(target.imageTag)) {
            console.warn(`⚠ 警告: 画像タグが含まれていない可能性があります (${target.id})`);
        }

        // 親のexplainを探す
        // textIndexの直後にあるはず
        // lastIndexOfだと、前の問題のexplainを拾う可能性がゼロではない（構造による）
        // なので、textIndexから順方向に探す
        const explainLabelIndex = content.indexOf('"explain": "', textIndex);

        if (explainLabelIndex === -1 || explainLabelIndex > chunksIndex) {
            console.error(`⚠ エラー: 親のexplainが見つかりません、または位置がおかしいです (${target.id})`);
            continue;
        }

        const explainContentStart = explainLabelIndex + '"explain": "'.length;

        // 親のexplainの終わりを探す
        let explainContentEnd = explainContentStart;
        while (true) {
            // 次の " を探す
            explainContentEnd = content.indexOf('"', explainContentEnd + 1);
            // エスケープされていないかチェック
            if (content[explainContentEnd - 1] !== '\\') {
                break;
            }
        }

        // 親のexplainを置換
        const beforeExplain = content.substring(0, explainContentStart);
        const afterExplain = content.substring(explainContentEnd);

        content = beforeExplain + newExplainText + afterExplain;

        // chunksを空にする
        // 置換後のcontentで再検索が必要
        const newTextIndex = content.indexOf(target.textSnippet); // 位置が変わっている可能性がある
        const newChunksIndex = content.indexOf('"chunks": [', newTextIndex);

        // chunks [ ... ] の終わりを探す
        // 今回は単純に、次の "}]" か "]" を探す...いや、ネストが怖いので
        // chunksの構造は [{ ... }] なので、 }] で終わるはず
        // あるいはもっと単純に、 chunksIndex から、次の "refId" や "isBonus" など次のキーの前まで...いや、chunksは最後かもしれない。

        // 確実なのは、ブラケットのカウントだが面倒。
        // ここでは、chunksの中身は explainMatch で取得した長さ + アルファ であることを利用する。
        // もしくは、次の `},` または `}\n` を探す。

        // 簡易ロジック: chunks: [ ... ] の中身を空にする
        // chunksIndex + '"chunks": ['.length から、括弧のペアを探す...

        // もっと単純に、正規表現で置換してしまう
        // replace('"chunks": [ ... ]', '"chunks": []')
        // ただし、中身に ] があるので注意

        // さっきの searchArea (2000文字) を使って、
        // chunksIndex から始まって、対応する ] までを探す
        // ネスト対応はあきらめて、"explain" の後ろにある `] ` を探す

        const contentAfterExplainInChunk = content.substring(newChunksIndex);
        // explainはさっき取得したやつと同じものがまだ入っているはず

        // chunksの開始 [ から、対応する ] を探す
        let depth = 0;
        let foundEnd = false;
        let chunksEndIndex = -1;

        for (let i = newChunksIndex + '"chunks": '.length; i < content.length; i++) {
            if (content[i] === '[') depth++;
            if (content[i] === ']') {
                depth--;
                if (depth === 0) {
                    chunksEndIndex = i;
                    foundEnd = true;
                    break;
                }
            }
        }

        if (foundEnd) {
            const beforeChunks = content.substring(0, newChunksIndex);
            const afterChunks = content.substring(chunksEndIndex + 1);
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
