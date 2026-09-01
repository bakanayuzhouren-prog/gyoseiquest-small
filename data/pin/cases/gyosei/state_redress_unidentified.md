---
id: state_redress_unidentified
title: 加害公務員の特定
tags: [行政法, 国家賠償法1条, 公務員の特定]
images: [learn/kokubai/1jo-ari]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>加害公務員の特定 (最判昭57.4.1)</h3>
    <p>「誰がやったか」分からないと賠償されない？</p>
  </div>

  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">👮‍♂️🚓❓🤕</span>
        <p class="context-note">
            警察官らが職務執行中に、市民に怪我をさせてしまった。<br>
            しかし、現場には複数の警察官がおり、混乱していて、<br>
            「具体的に誰（A巡査か？B巡査か？）」が加害者なのか特定できなかった。<br>
            被害者は「とにかく警察の誰かのせいだ！」と国に賠償を求めた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">🤕</span>
        <span class="role">被害者 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>国の責任だ！</strong><br>
        「誰が殴ったか名前まで分からないけど、<br>
        警察官たちがやったのは間違いないんだ。<br>
        『担当者が不明だから責任なし』なんて酷すぎる！」
      </div>
    </div>

    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">国賠請求</span>
    </div>

    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">国・県 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>特定が必要です。</strong><br>
        「責任を問うには『どの公務員が』違法行為をしたか特定する必要があります。<br>
        ハッキリしない以上、賠償責任は負えません。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>特定不要（国の責任あり）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※「誰か」が違法行為をしたならOK</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>一連の行為の過程</strong><br>
          一連の職務上の行為の過程において他人に被害を生じさせた場合、<br>
          その行為が客観的に職務執行として違法なものであれば足りる。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>個人の特定は不要</strong><br>
          具体的に<strong>「どの公務員の」「どのような違法行為」によるものか</strong>を特定できなくても、<br>
          国または公共団体は賠償責任を負う。
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .case-diagram-container {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  .header-box { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
  .header-box h3 { margin: 10px 0 5px; font-size: 1.2em; color: #2c3e50; }
  .badge { color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; }
  .badge.green { background: #27ae60; }
  .diagram-area { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; position: relative; }
  .party-box { width: 32%; text-align: center; z-index: 2; }
  .icon-area { margin-bottom: 10px; }
  .kaomoji { display: block; font-size: 3em; margin-bottom: 5px; animation: bounce 2s infinite; }
  .role { font-weight: bold; font-size: 0.9em; display: block; color: #555; }
  .balloon { position: relative; padding: 10px; border-radius: 8px; font-size: 0.85em; line-height: 1.4; text-align: left; background: #f8f9fa; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
  .balloon strong { color: #e74c3c; }
  .pl-balloon { border-left: 4px solid #3498db; }
  .def-balloon { border-left: 4px solid #95a5a6; }
  .versus-area { width: 30%; text-align: center; margin-top: 30px; position: relative; }
  .vs-badge { background: #95a5a6; color: #fff; padding: 5px 8px; border-radius: 20px; font-size: 0.9em; font-weight: bold; }
  .action-label { display: block; margin-top: 5px; font-size: 0.8em; color: #7f8c8d; }
  .ruling-box { background: #eef9fe; border: 2px solid #5A9BD5; border-radius: 12px; overflow: hidden; }
  .ruling-header { background: #5A9BD5; color: #fff; padding: 8px 15px; font-weight: bold; display: flex; align-items: center; }
  .gavel { margin-right: 8px; font-size: 1.2em; }
  .ruling-content { padding: 15px; text-align: center; }
  .conclusion { font-size: 1.3em; color: #2980b9; margin-bottom: 15px; border-bottom: 1px dashed #aad4e9; padding-bottom: 10px; }
  .logic-flow { text-align: left; font-size: 0.9em; background: #fff; padding: 10px; border-radius: 8px; }
  .check { background: #27ae60; color: #fff; padding: 1px 5px; border-radius: 3px; font-size: 0.8em; margin-right: 5px; }
  .arrow-down { text-align: center; margin: 5px 0; color: #bdc3c7; }
  .context-box { background: #fff8e1; border: 2px dashed #f1c40f; border-radius: 8px; padding: 10px; margin-bottom: 20px; text-align: center; }
  .context-title { font-weight: bold; color: #d35400; margin-bottom: 5px; font-size: 0.9em; }
  .context-content { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; }
  .context-note { width: 100%; margin-top: 5px; font-size: 0.85em; color: #555; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
</style>
