---
id: popolo
title: 東大ポポロ事件
tags: [憲法23条, 学問の自由, 大学の自治]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">憲法 重要判例</span>
    <h3>東大ポポロ事件 (最大判昭38.5.22)</h3>
    <p>大学に警察が入ってきた！これは「学問の自由」侵害？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">🎭👮‍♂️🏫💥</span>
        <p class="context-note">
            東大の公認学生団体「ポポロ劇団」が、大学の松川事件を題材にした演劇を行っていた。<br>
            その会場に、私服警官が潜入していたのを学生が発見。<br>
            学生らは警官を取り囲み、警察手帳を取り上げるなどの実力行使に出た。<br>
            学生Yらが暴力行為等で起訴されたが、<br>
            「そもそも警察が大学に無断で入るのは、大学の自治の侵害で違法だ！」と主張した。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😠</span>
        <span class="role">学生側 (Y)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>大学の自治を守っただけ！</strong><br>
        「大学には『学問の自由』と『大学の自治』がある。<br>
        警察が勝手に立ち入ることは、これを侵害する違法行為だ。<br>
        違法な捜査に対抗したのだから、正当防衛で無罪だ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">刑事裁判</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">👮‍♂️</span>
        <span class="role">検察側 (国)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>政治活動は別だ。</strong><br>
        「今回の劇は、学問研究というより、現実の政治的活動だ。<br>
        大学の自治といっても、政治活動まで聖域になるわけではない。<br>
        警察の立ち入りは適法だ。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>警察の立入りは適法（学生有罪）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※政治的活動は学問の自由・自治を享有しない</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>学問の自由と大学の自治</strong><br>
          憲法23条の「学問の自由」は、大学における教授・研究者の自由を特に保障する。<br>
          また、「大学の自治」も認められ、人事や施設管理について自主性が尊重される。<br>
          学生も、この自治の効果として、学問の自由と施設の利用を享受する。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>政治的活動の限界</strong><br>
          しかし、本件のような<strong>「実社会の政治的社会的活動」</strong>に当たる集会（演劇）については、<br>
          真の学問的研究・発表とは言えず、<strong>大学の学問の自由と自治は享有しない</strong>。<br>
          したがって、警察官の立入りは大学の自治を侵すものではなく適法である。
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
