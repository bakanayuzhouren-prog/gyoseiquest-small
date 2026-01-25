---
id: sunakawa
title: 砂川事件
tags: [憲法9条, 統治行為論, 在日米軍]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">超重要判例</span>
    <h3>砂川事件 (最判昭34.12.16)</h3>
    <p>「在日米軍」は憲法9条（戦力）違反か？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">✈️🇺🇸</span>
        <p class="context-note">
            米軍立川基地（東京都砂川町）の拡張に反対するデモ隊（学生や労働者）が、<br>
            基地のフェンスを壊して敷地内に立ち入った。<br>
            彼らは<strong>「刑事特別法」</strong>違反で起訴されたが、<br>
            「そもそも駐留米軍は憲法9条違反だから、この法律も無効だ！」と主張した。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😠</span>
        <span class="role">デモ隊 (被告人)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>米軍は違憲だ！</strong><br>
        「憲法9条は戦力の保持を禁止している。<br>
        在日米軍は明らかに『戦力』だ。<br>
        だから、それに基づく刑事特別法も違憲・無効で、無罪だ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">刑事訴訟</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">👮</span>
        <span class="role">検察官 (国)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>条約に基づいている。</strong><br>
        「日米安保条約に基づく正当な駐留だ。<br>
        国の安全に関わる高度な政治問題だから、<br>
        裁判所が口を出すべきじゃない（統治行為）。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>有罪・合憲 (デモ隊の敗訴)</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※統治行為論を適用しつつ、合憲判断も示した</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>憲法9条と「戦力」</strong><br>
          憲法9条が禁止しているのは、わが国が<strong>「主体」</strong>となって指揮管理する戦力。<br>
          外国の軍隊（在日米軍）は、これに当たらない。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>統治行為論</strong><br>
          日米安保条約のように、高度な政治性を持つ条約の合憲性は、<br>
          「一見極めて明白に違憲無効」と認められない限り、<br>
          <strong>裁判所の司法審査の対象とならない。</strong>
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
  .badge.red { background: #e74c3c; }
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
