---
id: ikata_nuke
title: 伊方原発訴訟
tags: [行政法, 行政裁量, 原発訴訟]
images: [learn/pin/ikata-nuke]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>伊方原発訴訟 (最判平4.10.29)</h3>
    <p>「原発の安全性」は誰がどうやって判断する？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">⚛️☢️🏚️</span>
        <p class="context-note">
            国（Y）が伊方原子力発電所の設置を許可したことに対し、<br>
            周辺住民（X）が「安全性に問題がある」として許可の取消しを求めた。<br>
            高度な科学技術が関わる問題について、裁判所はどこまで口出しできるか？
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😰</span>
        <span class="role">周辺住民 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>危険すぎる！</strong><br>
        「万が一事故が起きたら取り返しがつかない。<br>
        国の安全審査はずさんだ。<br>
        裁判所が科学的にも徹底的に検証して、許可を取り消すべきだ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">許可処分取消訴訟</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">国 (通産大臣)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>専門家が審査した。</strong><br>
        「原子力委員会などの専門家が、最新の科学的知見に基づいて審査し、<br>
        安全だと判断した上での許可だ。<br>
        素人の裁判所が判断できることではない。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>国の処分は適法（Xの敗訴）</strong><br>
        <span style="font-size: 0.8em; color: #27ae60;">※裁判所の審査にも限界がある</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>科学的専門的裁量</strong><br>
          原発の安全性審査のような高度に専門的な判断は、<br>
          専門技術的な調査審議を経た行政庁の<strong>「合理的判断（裁量）」</strong>に委ねられる。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>裁判所の審査対象</strong><br>
          裁判所が審査するのは、科学的な正誤そのものではなく、<br>
          <strong>「審査の過程（プロセス）」</strong>に看過しがたい過誤・欠落がないか、という点に限られる。<br>
          本件では、その判断過程に不合理な点はない。
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
