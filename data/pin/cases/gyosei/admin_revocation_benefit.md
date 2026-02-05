---
id: admin_revocation_benefit
title: 授益的行政行為の撤回
tags: [行政法, 行政行為, 撤回, 信頼保護]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge green">行政法 重要判例</span>
    <h3>授益的行政行為の撤回 (最判昭49.2.5)</h3>
    <p>一度あげた許可を、後から取り消せる？</p>
  </div>

  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">🚜📜🚫</span>
        <p class="context-note">
            Xは農地転用の許可（授益的行政行為）を受けたが、<br>
            その後、事情が変わったとして県知事Yが許可を「撤回」した。<br>
            Xは「一度くれた許可を勝手に取り上げるな！」と訴えた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">😫</span>
        <span class="role">X (許可を受けた人)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>信頼保護だ！</strong><br>
        「許可を信じて投資もしたのに、<br>
        後から事情が変わったといって撤回されるのは困る。<br>
        既得権を侵害された！」
      </div>
    </div>

    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">撤回処分取消</span>
    </div>

    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">🏛️</span>
        <span class="role">知事 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>公益上の必要がある。</strong><br>
        「事情変更により、許可を維持することが公益に反する状態になった。<br>
        公益のためには撤回しもやむを得ない。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>比較衡量が必要</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※公益上の必要性 ＞ 個人の不利益</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>撤回の自由とその制限</strong><br>
          後発的な事情変更により、当初の行為を維持することが不適当になった場合、<br>
          行政庁は法的根拠がなくても「撤回」できるのが原則。<br>
          しかし、相手方に不利益を与えるため制限がある。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>比較衡量の基準</strong><br>
          撤回が認められるのは、<br>
          <strong>「撤回することによる公益上の必要性」</strong>が、<br>
          <strong>「撤回されることにより相手方が被る不利益」</strong>を正当化できるほど強い場合に限られる。
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
