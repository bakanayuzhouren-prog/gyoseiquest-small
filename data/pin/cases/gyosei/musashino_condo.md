---
id: musashino_condo
title: 武蔵野市マンション事件
tags: [行政法, 行政指導, 寄付金]
images: [learn/pin/musashino-condo]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>武蔵野市マンション事件 (最判平5.2.18)</h3>
    <p>「学校を作る金を寄付しないと水は出さん？」</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">🏫💰💧❌</span>
        <p class="context-note">
            武蔵野市（Y）は、人口急増による学校不足に対処するため、<br>
            マンション建設業者に対して「教育施設負担金（寄付金）」の納付を指導していた。<br>
            そして「指導に従わないと水道の給水契約を拒否する」としていた。<br>
            建設業者（X）は仕方なく寄付金を支払ったが、後から「違法な強制だ」として返還を求めた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😤</span>
        <span class="role">業者 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>脅迫じゃないか！</strong><br>
        「寄付は本来任意のものだ。<br>
        『金を払わないと水を止める』なんて言われたら、<br>
        事業ができなくなるから、実質的に強制されたのと同じだ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">違法性</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">武蔵野市 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>必要な協力だ。</strong><br>
        「学校が足りないのはマンション建設のせいだ。<br>
        原因を作った業者が負担するのは当然だ。<br>
        Xも同意して払ったのだから問題ない。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>指導は違法（Xの勝訴）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※無関係な給水拒否と結びつけるのは違法</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>関連性の欠如</strong><br>
          「教育施設の負担金」と「水道の給水」には直接の関係がない。<br>
          行政指導を貫徹するために、無関係な給水拒否という手段を用いることは許されない。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>公序良俗違反</strong><br>
          事実上の強制力を用いて寄付金を拠出させる行政指導は違法である。<br>
          Xは形式的に同意しているが、実質的には強制されたものであるから、<br>
          寄付の贈与契約は<strong>公序良俗に反し無効</strong>であり、Yは返還義務を負う。
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
