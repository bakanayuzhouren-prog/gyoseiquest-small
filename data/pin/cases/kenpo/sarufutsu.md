---
id: sarufutsu
title: 猿払事件
tags: [憲法21条, 表現の自由, 公務員]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">憲法 重要判例</span>
    <h3>猿払事件 (最大判昭49.11.6)</h3>
    <p>公務員の「政治活動」はどこまで制限できる？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">📮📢📜</span>
        <p class="context-note">
            北海道猿払村の郵便局員（公務員）Xが、勤務時間外に<br>
            選挙ポスターの掲示や配布を行った。<br>
            これが「国家公務員法」で禁止される政治的行為にあたるとして起訴された。<br>
            Xは「政治活動の自由（表現の自由）の侵害で違憲だ！」と主張した。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😫</span>
        <span class="role">郵便局員 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>表現の自由だ！</strong><br>
        「仕事中ならともかく、勤務時間外にポスターを貼るくらい自由なはずだ。<br>
        公務員だって国民の一人だ。<br>
        表現の自由は一番大事な権利なのに、厳しすぎる！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">国家公務員法違反</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">国 (検察)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>中立性が大事。</strong><br>
        「公務員は『全体の奉仕者』だ。<br>
        特定の政党を応援していると見られたら、<br>
        行政の中立性が疑われ、国民の信頼を失ってしまう。<br>
        だから禁止は必要だ。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>禁止は合憲（Xの有罪）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※合理的な必要最小限度の制限</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>行政の中立性</strong><br>
          公務員の政治的中立性を保ち、行政に対する国民の信頼を維持することは、<br>
          重要な公共の利益である。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>猿払基準（3要件）</strong><br>
          ①禁止の目的が正当か？（→正当）<br>
          ②目的と手段に関連性があるか？（→ある）<br>
          ③得られる利益と失われる利益の均衡（→利益の方が大きい）<br>
          特に、意見表明そのものの制限ではなく、<br>
          「行動」の制限であり、<strong>間接的・付随的な制約</strong>にすぎないとした。
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
