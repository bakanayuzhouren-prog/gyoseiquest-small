---
id: patrol_car_chase
title: パトカー追跡事件
tags: [行政法, 国家賠償, 公権力の行使]
images: [learn/kokubai/patrol-kikyaku]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>パトカー追跡事件 (最判昭61.2.27)</h3>
    <p>パトカーの追跡で事故が起きたら警察の責任？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <div class="chase-flow">
          <div class="chase-step">
            <span class="chase-icon chase-face-east">🚓</span>
            <span class="chase-cap">パトカー</span>
          </div>
          <span class="chase-arrow">追跡▶</span>
          <div class="chase-step">
            <span class="chase-icon chase-face-east">🚙</span>
            <span class="chase-cap">逃走車</span>
          </div>
          <span class="chase-arrow">衝突▶</span>
          <div class="chase-step">
            <span class="chase-icon">💥</span><span class="chase-icon chase-face-east">🚗</span>
            <span class="chase-cap">第三者X</span>
          </div>
        </div>
        <p class="context-note">
            不審な車（無免許）をパトカーが追跡した。<br>
            逃走車は赤信号を無視して交差点に突入し、無関係の第三者（X）の車と衝突した。<br>
            被害者Xは「警察が無理な追跡をしたせいで事故が起きた」として、<br>
            県（Y）に対して国家賠償を求めて訴えた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">🤕</span>
        <span class="role">被害者 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>追跡が強引すぎる！</strong><br>
        「あんな猛スピードで追いかけられたら、逃走車が暴走するのは当然だ。<br>
        事故が予見できたのに追跡を続けたのは、<br>
        警察官の職務執行として違法だ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">国賠法1条</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">👮</span>
        <span class="role">警察/県 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>正当な職務だ。</strong><br>
        「交通違反をした車を捕まえる責務がある。<br>
        追跡方法はサイレンを鳴らすなど適切だった。<br>
        事故はあくまで逃走車の運転手の責任だ。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>請求棄却（Xの敗訴＝追跡は適法）</strong><br>
        <span style="font-size: 0.8em; color: #7f8c8d;">※目的と手段のバランスが重要</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>違法性の判断基準</strong><br>
          警察官の追跡行為が違法となるのは、「追跡の必要性」と「追跡の開始・継続・方法の相当性」を比較衡量し、職務の目的を遂げるうえで<strong>不必要</strong>であるとき、<strong>又は</strong>開始・継続・方法が社会通念上<strong>著しく相当性を欠く</strong>ときに限られる。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>本件のあてはめ</strong><br>
          本件では、不審車両を確認する必要性が高く、追跡方法も威嚇的でないなど一定の配慮がなされていたため、<strong>違法ではない</strong>と判断された。
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
  .conclusion { font-size: 1.3em; color: #7f8c8d; margin-bottom: 15px; border-bottom: 1px dashed #aad4e9; padding-bottom: 10px; }
  .logic-flow { text-align: left; font-size: 0.9em; background: #fff; padding: 10px; border-radius: 8px; }
  .check { background: #27ae60; color: #fff; padding: 1px 5px; border-radius: 3px; font-size: 0.8em; margin-right: 5px; }
  .arrow-down { text-align: center; margin: 5px 0; color: #bdc3c7; }
  .context-box { background: #fff8e1; border: 2px dashed #f1c40f; border-radius: 8px; padding: 10px; margin-bottom: 20px; text-align: center; }
  .context-title { font-weight: bold; color: #d35400; margin-bottom: 5px; font-size: 0.9em; }
  .context-content { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; }
  .context-note { width: 100%; margin-top: 5px; font-size: 0.85em; color: #555; }
  .chase-flow { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 8px 0 4px; }
  .chase-step { display: flex; flex-direction: column; align-items: center; }
  .chase-icon { font-size: 1.8em; line-height: 1.2; display: inline-block; }
  .chase-face-east { transform: scaleX(-1); }
  .chase-cap { font-size: 0.7em; font-weight: bold; color: #7f8c8d; margin-top: 2px; }
  .chase-arrow { font-size: 0.85em; font-weight: bold; color: #d35400; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
</style>
