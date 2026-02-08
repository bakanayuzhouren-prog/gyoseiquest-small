const fs = require('fs');

const newPinCase = {
    id: "civil_guardian_supervisor",
    category: "minpo",
    title: "後見監督人",
    youtube: "",
    tags: ["民法", "親族", "行為能力"],
    content: `<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">民法 知識</span>
    <h3>後見監督人の業務と役割</h3>
    <p>「後見人を監督する」ってどういうこと？</p>
  </div>

  <div class="ruling-box" style="background: #fff; border: none;">
    <div class="logic-flow">
      <h4>📌 後見監督人の主な仕事（職務）</h4>
      <p>一言で言えば<strong>「後見人のウォッチ（監視）」</strong>です。<br>
      民法851条で定められた主な4つの業務：</p>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 10px;"><strong>① 後見人の事務を監督</strong><br>使い込みや不適切な契約がないか厳しくチェック！</li>
        <li style="margin-bottom: 10px;"><strong>② 後見人が欠けた時の選任請求</strong><br>後見人がいなくなったら、すぐに後任を選ぶよう家裁に請求！</li>
        <li style="margin-bottom: 10px;"><strong>③ 急迫の事情がある時の処分</strong><br>緊急時に財産を守るためのピンチヒッター！</li>
        <li style="margin-bottom: 10px;"><strong>④ 利益相反時の代表</strong><br>後見人と本人の利益がぶつかる時は、監督人が本人を代表！（※ここ重要）</li>
      </ul>

      <hr style="margin: 20px 0; border: 0; border-top: 1px dashed #ccc;">

      <h4>📌 試験に出る「ここが重要！」</h4>

      <p><span class="check">POINT 1</span> <strong>誰が選ぶ？</strong><br>
      家庭裁判所が必要があると認めた時に選任（請求 or 職権）。<br>
      必置機関ではなく<strong>「任意設置」</strong>です。</p>

      <p><span class="check">POINT 2</span> <strong>誰がなれる？（欠格事由）</strong><br>
      身内は甘くなるのでNG！<br>
      ❌ 後見人の配偶者、直系血族、兄弟姉妹</p>

      <p><span class="check">POINT 3</span> <strong>利益相反のルール</strong><br>
      ここが一番狙われる！</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9em;">
        <tr style="background: #eef9fe;">
          <th style="border: 1px solid #5A9BD5; padding: 8px;">ケース</th>
          <th style="border: 1px solid #5A9BD5; padding: 8px;">対応</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">監督人が<strong>いない</strong>場合</td>
          <td style="border: 1px solid #ddd; padding: 8px;">家裁に<strong>特別代理人</strong>を選んでもらう</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background: #fffbe6;">監督人が<strong>いる</strong>場合</td>
          <td style="border: 1px solid #ddd; padding: 8px; background: #fffbe6;"><strong>後見監督人</strong>が本人を代表（特別代理人は不要！）</td>
        </tr>
      </table>
    </div>
  </div>
</div>`
};

try {
    let content = fs.readFileSync('src/pinData.ts', 'utf8');

    // Find where existing array ends
    const endMarker = '];';
    const insertPos = content.lastIndexOf(endMarker);

    if (insertPos === -1) {
        console.error('Could not find end of PIN_CASES array');
        process.exit(1);
    }

    const newEntryString = `,\n  ${JSON.stringify(newPinCase, null, 2)}`;

    // Insert before the closing bracket
    const newContent = content.slice(0, insertPos) + newEntryString + content.slice(insertPos);

    fs.writeFileSync('src/pinData.ts', newContent, 'utf8');
    console.log('Successfully added new PinCase to src/pinData.ts');

} catch (e) {
    console.error('Error updating pinData.ts:', e);
    process.exit(1);
}
