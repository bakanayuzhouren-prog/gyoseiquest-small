---
id: niigata_airport
title: 新潟空港訴訟
tags: [行政法, 取消訴訟, 原告適格]
images: [learn/pin/niigata-airport]
---

<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">重要判例</span>
    <h3>新潟空港訴訟 (最判平元.2.17)</h3>
    <p>周辺住民は行政処分の「取消し」を求めることができるか？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情 (本音と建前)</div>
    <div class="context-content">
      <span class="flag">🇯🇵<br>日本</span>
      <span class="route-arrow">⚡ 外交上の配慮</span>
      <span class="flag">🇰🇷<br>韓国</span>
      <p class="context-note">
        実は... <strong>韓国との関係悪化</strong>を懸念していた！<br>
        (騒音被害はあくまで建前...？)
      </p>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😭</span>
        <span class="role">周辺住民 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>騒音で生活がめちゃくちゃだ！</strong><br>
        「航空会社の免許を取り消して！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">取消訴訟</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">運輸大臣 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>却下します。</strong><br>
        「君たちは処分の相手方じゃない。<br>訴える資格 (原告適格) はないよ」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>原告適格あり (住民の勝訴)</strong>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span><br>
          航空法は「航空の安全」だけでなく、<br>
          <strong>「周辺住民の騒音障害防止」</strong>も目的としている。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span><br>
          この利益は、単なる「公益」ではなく、<br>
          住民個々人の<strong>「法律上保護された利益」</strong>である。
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
  .header-box {
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  .header-box h3 {
    margin: 10px 0 5px;
    font-size: 1.2em;
    color: #2c3e50;
  }
  .badge {
    color: #fff;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
  }
  .badge.red { background: #e74c3c; }
  
  .diagram-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
    position: relative;
  }
  .party-box {
    width: 32%;
    text-align: center;
    z-index: 2;
  }
  .icon-area {
    margin-bottom: 10px;
  }
  .kaomoji {
    display: block;
    font-size: 3em;
    margin-bottom: 5px;
    animation: bounce 2s infinite;
  }
  .role {
    font-weight: bold;
    font-size: 0.9em;
    display: block;
    color: #555;
  }
  
  .balloon {
    position: relative;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.85em;
    line-height: 1.4;
    text-align: left;
    background: #f8f9fa;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  }
  .balloon strong { color: #e74c3c; }
  .pl-balloon { border-left: 4px solid #3498db; }
  .def-balloon { border-left: 4px solid #95a5a6; }

  /* Arrow */
  .versus-area {
    width: 30%;
    text-align: center;
    margin-top: 30px;
    position: relative;
  }
  .vs-badge {
    background: #95a5a6;
    color: #fff;
    padding: 5px 8px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: bold;
  }
  .action-label {
    display: block;
    margin-top: 5px;
    font-size: 0.8em;
    color: #7f8c8d;
  }

  /* Ruling */
  .ruling-box {
    background: #eef9fe;
    border: 2px solid #5A9BD5;
    border-radius: 12px;
    overflow: hidden;
  }
  .ruling-header {
    background: #5A9BD5;
    color: #fff;
    padding: 8px 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .gavel { margin-right: 8px; font-size: 1.2em; }
  .ruling-content { padding: 15px; text-align: center; }
  .conclusion {
    font-size: 1.3em;
    color: #2980b9;
    margin-bottom: 15px;
    border-bottom: 1px dashed #aad4e9;
    padding-bottom: 10px;
  }
  .logic-flow {
    text-align: left;
    font-size: 0.9em;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
  }
  .check {
    background: #27ae60;
    color: #fff;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    margin-right: 5px;
  }
  .arrow-down {
    text-align: center;
    margin: 5px 0;
    color: #bdc3c7;
  }

  /* Context Box Styles */
  .context-box {
    background: #fff8e1;
    border: 2px dashed #f1c40f;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  .context-title {
    font-weight: bold;
    color: #d35400;
    margin-bottom: 5px;
    font-size: 0.9em;
  }
  .context-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .flag { font-size: 1.5em; text-align: center; line-height: 1.2; font-size: 0.8em;}
  .route-arrow { font-weight: bold; color: #aaa; font-size: 0.8em; }
  .context-note {
    width: 100%;
    margin-top: 5px;
    font-size: 0.85em;
    color: #555;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
</style>
