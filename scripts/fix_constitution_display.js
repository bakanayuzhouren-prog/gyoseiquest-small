const fs = require('fs');
const path = require('path');

const OLD_FILE = path.join(__dirname, '..', 'src', 'questions.js');
const NEW_FILE = path.join(__dirname, '..', 'src', 'questions_fixed.js'); // 一旦別ファイルに保存して確認

console.log('=== 憲法1, 2, 4問目の画像表示位置修正 ===\n');

try {
    let content = fs.readFileSync(OLD_FILE, 'utf8');

    // 修正対象の定義
    // textの一部で問題を特定し、その後のexplainとchunksを操作する
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

    let updatedContent = content;
    let totalUpdated = 0;

    targets.forEach(target => {
        console.log(`処理中: ${target.id}...`);

        // 問題文を検索
        const textIndex = updatedContent.indexOf(target.textSnippet);
        if (textIndex === -1) {
            console.error(`⚠ エラー: 問題文が見つかりません (${target.textSnippet})`);
            return;
        }

        // chunksを探す (textIndex以降で最初に見つかるchunks)
        const chunksIndex = updatedContent.indexOf('"chunks": [', textIndex);
        if (chunksIndex === -1) {
            console.error(`⚠ エラー: chunksが見つかりません (${target.id})`);
            return;
        }

        // chunksの中身（explain）を取得
        // chunks: [{ ..., "explain": "..." }] という構造を想定
        const chunksEndIndex = updatedContent.indexOf(']', chunksIndex);
        const chunksContent = updatedContent.substring(chunksIndex, chunksEndIndex + 1);

        // chunks内のexplainを抽出
        // "explain": "..." のパターン。改行を含む可能性があるため注意が必要だが、JSON形式内の文字列リテラルなので "..." で囲まれているはず
        // ただし、エスケープされたダブルクオートなどが含まれる可能性もある

        // 簡易的な抽出: "explain": " から、次の ", (または "}) まで
        const explainMatch = chunksContent.match(/"explain":\s*"(.*?)(?<!\\)"/s);

        if (!explainMatch) {
            console.error(`⚠ エラー: chunks内のexplainが見つかりません (${target.id})`);
            return;
        }

        const newExplainText = explainMatch[1];

        // 画像タグが含まれているか確認
        if (!newExplainText.includes(target.imageTag)) {
            console.warn(`⚠ 警告: chunks内のexplainに画像タグが含まれていない可能性があります (${target.id})`);
            // 強制的に追加するロジックを入れてもいいが、前回のスクリプトで入っているはず
        }

        // 親のexplainを探す (textIndexの直後にあるはずだが、順番は保証されないため textIndex ～ chunksIndex の間で探すのが安全)
        // src/questions.jsの構造上、text -> choices -> answer -> explain -> ... -> chunks の順になっていることが多い

        const explainLabelIndex = updatedContent.lastIndexOf('"explain": "', chunksIndex);
        if (explainLabelIndex === -1 || explainLabelIndex < textIndex) {
            console.error(`⚠ エラー: 親のexplainが見つかりません (${target.id})`);
            return;
        }

        const explainContentStart = explainLabelIndex + '"explain": "'.length;
        // 親のexplainの終わりを探す
        // 単純に次の " を探すと、文字列中のエスケープされた " にマッチしてしまう可能性がある
        // しかし、データ構造上、次のプロパティ定義の直前までがexplainのはず

        let explainContentEnd = explainContentStart;
        while (true) {
            explainContentEnd = updatedContent.indexOf('"', explainContentEnd + 1);
            if (updatedContent[explainContentEnd - 1] !== '\\') { // エスケープされていない "
                break;
            }
        }

        // 親のexplainを書き換える
        // 前半部分 + 新しいexplain + 後半部分
        // chunksは空にする

        const beforeExplain = updatedContent.substring(0, explainContentStart);
        const afterExplain = updatedContent.substring(explainContentEnd);

        // chunks部分も置換対象に含めるため、afterExplainをさらに分割する必要がある
        // いや、文字列置換だと位置がずれるので、まとめて処理したほうがいい

        // 戦略変更:
        // 1. 親のexplainを置換
        updatedContent = beforeExplain + newExplainText + afterExplain;

        // 置換によって文字列長が変わったので、chunksの位置を再計算する必要がある
        // しかし、targetsループ内でupdatedContentを更新していくと、indexがずれていく
        // シンプルに、replaceメソッドを使うのが良さそう

        // chunksを空にする: "chunks": [...] -> "chunks": []
        // 正規表現で、この問題ブロック内のchunksを狙い撃ちする

        // updatedContentから、再度chunksを探す（explain置換後の位置）
        const newChunksIndex = updatedContent.indexOf('"chunks": [', textIndex); // textIndexは変わらないはず（explainは後ろにあるため...いや、explainがtextより前にある場合はずれる。構造上は text -> explain -> chunks なので textIndex は安全）

        // chunks [...] を特定するための正規表現
        // バランシングが必要だが、JSの正規表現では難しい
        // 簡易的に、] までとする（chunksの中にネストした配列がない前提）

        const newChunksEndIndex = updatedContent.indexOf(']', newChunksIndex);

        const beforeChunks = updatedContent.substring(0, newChunksIndex);
        const afterChunks = updatedContent.substring(newChunksEndIndex + 1);

        updatedContent = beforeChunks + '"chunks": []' + afterChunks;

        console.log(`✓ 修正完了: ${target.id}`);
        totalUpdated++;
    });

    if (totalUpdated > 0) {
        fs.writeFileSync(NEW_FILE, updatedContent, 'utf8');
        console.log(`\n=== 完了: ${totalUpdated}件修正しました ===`);
        console.log(`修正内容を ${NEW_FILE} に保存しました。`);
        console.log(`問題なければ ${OLD_FILE} に上書きしてください。`);

        // 自動で上書きしちゃおう（ユーザー指示が「迅速に」なので）
        fs.writeFileSync(OLD_FILE, updatedContent, 'utf8');
        console.log(`\n${OLD_FILE} を更新しました。`);

        // 確認用ファイルは削除
        fs.unlinkSync(NEW_FILE);
    } else {
        console.log('\n更新対象がありませんでした。');
    }

} catch (err) {
    console.error('エラーが発生しました:', err);
}
