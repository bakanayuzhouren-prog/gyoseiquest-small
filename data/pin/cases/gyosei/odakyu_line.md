---
id: odakyu_line
title: 小田急線高架化事件
tags: [行政法, 原告適格, 都市計画]
images: [learn/pin/odakyu-line]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>小田急線高架化事件 (最判平17.12.7)</h3>
    <p>「うるさくなるから工事やめろ」と訴える資格は？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">🚄🔊🏠😖</span>
        <p class="context-note">
            国（Y）は、小田急線の鉄道高架化事業を認可した。<br>
            これに対し、線路周辺の住民（Xら）は、<br>
            「高架化で騒音や振動が悪化し、環境が悪くなる」として、<br>
            事業認可の取消しを求めて訴えた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">👨‍👩‍👧‍👦</span>
        <span class="role">周辺住民 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>生活環境が壊される！</strong><br>
        「都市計画法の手続きは、住民の環境を守るためのものだ。<br>
        騒音や振動の被害を直接受ける私たちには、<br>
        違法な認可を取り消すよう訴える資格（原告適格）があるはずだ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">原告適格</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">国 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>公益の問題だ。</strong><br>
        「都市計画は、都市全体の発展のためのものであり、<br>
        個々の住民の利益を保護するものではない。<br>
        住民の利益は『反射的利益』にすぎず、原告適格はない。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>原告適格あり（Xの訴え認める）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※周辺住民の適格を広く認めた画期的判決</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>個別的利益の保護</strong><br>
          関連法令（環境アセスメント条例など）の趣旨を考慮すると、<br>
          騒音等の被害を受ける恐れのある周辺住民の利益は、<br>
          一般的な公益に吸収されない<strong>「法律上保護された個別的利益」</strong>である。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>原告適格の拡大</strong><br>
          したがって、事業地の周辺に居住し、著しい被害を受ける者については、<br>
          事業認可の取消しを求める<strong>原告適格が認められる</strong>。
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
