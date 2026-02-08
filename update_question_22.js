
const fs = require('fs');
const path = 'src/questions.js';

try {
    let data = fs.readFileSync(path, 'utf8');

    const target = `        "explain": "[[big:1. 不在者財産管理人の選任（民法25条）]]\\n不在者が自分でお金の管理をする人を決めていなかった場合、その財産を放っておくと傷んでしまったり、相続人が困ったりします。\\n\\n[[bold:選任の条件：]]\\n- 本人が管理人を置いていない。\\n- 利害関係人（配偶者、相続人、債権者など）または検察官が請求する。\\n- 家庭裁判所が「必要な処分」として管理人を選任する。\\n\\n[[big:2. 管理人の役割]]\\n家裁に選ばれた管理人は、不在者の代わりに財産を守り、家裁の監督を受けます。\\n\\n[[big:3. ポイント]]\\n「親族でなければならない」という決まりはありません。弁護士や司法書士が選ばれることも多いです。",`;

    const replacement = `        "explain": "[[big:1. 請求権者は誰か？]]\\n利害関係人の請求により家庭裁判所が失踪宣告をした場合、失踪者は死亡したものとみなされます（民法３０条）。\\n（注：失踪宣告の請求権者に検察官は含まれない）\\n\\n[[big:2. 死亡とみなされる時期は？]]\\n普通失踪：生死が７年間明らかでないとき→[[red:７年の期間満了時に死亡とみなされる]]（３１条）。\\n特別失踪：危難が去った時から１年間明らかでないとき→[[red:危難が去った時に死亡とみなされる]]（３１条）。\\n\\n[[big:3. 失踪宣告の効果は？]]\\n死亡したものとみなされ、婚姻は解消し、相続が開始する。\\n権利能力を失うわけではないので、生存することの反証を挙げれば、権利能力を前提とした法律行為は有効。\\n\\n[[big:4. 失踪宣告の取消し（３２条１項）]]\\n本人・利害関係人の請求により、取消さなければならない（検察官は含まれない）。\\n取消されれば、失踪宣告は初めにさかのぼってなかったことになる（３２条１項）。\\n\\n[[marker:Exceptions：]]\\n①取消し前に善意でした行為の効力には影響を及ぼさない（３２条１項但書）。\\n②失踪宣告によって財産を得た者は、現に利益を受けている限度で返還義務を負う（３２条２項）。",`;

    if (data.includes(target)) {
        const newData = data.replace(target, replacement);
        fs.writeFileSync(path, newData, 'utf8');
        console.log('Successfully updated Question 22 explanation.');
    } else {
        console.log('Could not find target string.');
        // Debug: print what IS at line 5486
        const lines = data.split('\n');
        console.log('Line 5486 content:', lines[5485]); // 0-indexed
    }

} catch (err) {
    console.error(err);
}
