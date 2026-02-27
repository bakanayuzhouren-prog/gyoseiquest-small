
const fs = require('fs');
const path = require('path');

const questionsPath = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(questionsPath, 'utf8');

// 1. 民法物権の画像タグを順番に付与する (1-110 ~ 50-110, 43欠番)
// SUBJECTS["民法"]["民法物権"] の中身を正規表現で置換するのは難しいので、
// JSONとしてパースして処理し、再度文字列化する。
// ただし、ファイルが巨大（8MB）なので、メモリ制限に注意しつつ慎重に行う。

try {
    // questions.js は "export const SUBJECTS = { ... };" という形式
    const jsonMatch = content.match(/export const SUBJECTS = (\{[\s\S]*\});/);
    if (!jsonMatch) {
        throw new Error('SUBJECTS constant not found');
    }

    const subjects = JSON.parse(jsonMatch[1]);
    const bukkenList = subjects["民法"]["民法物権"];

    if (bukkenList && Array.isArray(bukkenList)) {
        console.log(`Processing ${bukkenList.length} questions in 民法物権...`);
        let imgNum = 1;
        bukkenList.forEach((q, index) => {
            // 欠番 43 を飛ばす
            if (imgNum === 43) imgNum++;

            const newImgTag = `[[image:${imgNum}-110]]`;

            // 既存の [[image:223-230]] を削除または置換、あるいは単に先頭に追加
            // ユーザーからの指示：憲法の画像が出ているのでそれを正しいものに。
            if (q.explain) {
                // 既存のタグを消して、新しいタグを先頭に入れる
                q.explain = newImgTag + '\n\n' + q.explain.replace(/\[\[image:223-230\]\]\n*/g, '').trim();
            } else {
                q.explain = newImgTag;
            }

            imgNum++;
            // 画像は 50 まで
            if (imgNum > 50) {
                // 足りない場合はループするか、そのままにする（今回は50までとのこと）
            }
        });
    }

    // 2. クリーンアップ：憲法セクション以外から [[image:223-230]] を削除
    // 憲法セクションは "憲法": { ... } の中にある。
    // jsonオブジェクト上で処理する。
    Object.keys(subjects).forEach(subjectKey => {
        if (subjectKey === "憲法") return; // 憲法はスキップ

        const subCategories = subjects[subjectKey];
        Object.keys(subCategories).forEach(catKey => {
            const questions = subCategories[catKey];
            if (Array.isArray(questions)) {
                questions.forEach(q => {
                    if (q.explain && subjectKey !== "憲法") {
                        // 民法物権は上のステップで処理済みだが、念のため他でも消す
                        if (subjectKey === "民法" && catKey === "民法物権") return;
                        q.explain = q.explain.replace(/\[\[image:223-230\]\]\n*/g, '').trim();
                    }
                });
            }
        });
    });

    // 文字列に戻す
    const newJsonStr = JSON.stringify(subjects, null, 2);
    const newFileContent = `export const SUBJECTS = ${newJsonStr};`;

    fs.writeFileSync(questionsPath, newFileContent, 'utf8');
    console.log('Successfully updated questions.js');

} catch (e) {
    console.error('Error processing questions.js:', e);
    process.exit(1);
}
