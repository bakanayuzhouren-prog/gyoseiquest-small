---
id: sagi
title: 詐欺と第三者
tags: [民法96条3項, 詐欺取消し, 善意の第三者]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge blue">民法 重要判例</span>
    <h3>詐欺と第三者 (民法96条3項)</h3>
    <p>騙されて売った土地、転売されたら取り戻せる？</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">😈🗣️🤢 → 😲</span>
        <p class="context-note">
            AさんはB（詐欺師）に騙されて土地を売ってしまった。<br>
            Bはすぐにその土地をCさん（善意の第三者）に転売。<br>
            その後、騙されたことに気づいたAさんは、<br>
            詐欺を理由に契約を取り消して、Cさんに土地の返還を求めた。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">🤢</span>
        <span class="role">被詐欺者 (A)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>騙されたんだ！</strong><br>
        「詐欺による契約は取り消せるはずだ（民法96条1項）。<br>
        取り消したんだから、最初から土地は私のものだ。<br>
        Cさん、返してくれ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">所有権争い</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">👱</span>
        <span class="role">第三者 (C)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>知らなかったよ。</strong><br>
        「詐欺があったなんて全く知らなかった（善意）。<br>
        民法96条3項で、善意の第三者には対抗できないはずだ。<br>
        登記もしっかり確認して買ったんだから、私のものだ。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 判例のルール
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>C（善意の第三者）の勝ち</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※取り消し前の第三者には、登記がなくても勝てる</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">Rule 1</span> <strong>詐欺取消しの効果</strong><br>
          詐欺による意思表示の取消しは、<br>
          <strong>「善意でかつ無過失の第三者」</strong>には対抗できない。<br>
          （民法96条3項・改正民法による要件厳格化に注意）
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">Rule 2</span> <strong>登記は必要？</strong><br>
          この場合の「第三者」として保護されるためには、<br>
          <strong>登記までは不要</strong>とされる。<br>
          （対抗要件ではなく権利保護要件と考えられているため）
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
  .badge.blue { background: #3498db; }
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
