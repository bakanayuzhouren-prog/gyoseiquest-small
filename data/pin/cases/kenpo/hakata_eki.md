---
id: hakata_eki
title: 博多駅事件
tags: [憲法21条, 報道の自由, 取材の自由]
---
<div class="case-diagram-container">
  <div class="header-box">
    <span class="badge red">憲法 重要判例</span>
    <h3>博多駅事件 (最大決昭44.11.26)</h3>
    <p>「報道の自由」vs「公正な裁判」</p>
  </div>

  <!-- 背景事情 -->
  <div class="context-box">
    <div class="context-title">📝 背景事情</div>
    <div class="context-content">
      <div style="text-align: center; width: 100%;">
        <span class="kaomoji">🚄🎥💥</span>
        <p class="context-note">
            博多駅で学生運動のデモ隊と機動隊が衝突する事件が発生。<br>
            テレビ局（X社）がその様子をニュース用に撮影していた。<br>
            後に裁判所（Y）は、事件の証拠としてそのフィルムの提出を命じたが、<br>
            X社は「報道の自由（取材の自由）の侵害だ」として拒否した。
        </p>
      </div>
    </div>
  </div>

  <div class="diagram-area">
    <!-- 原告側 -->
    <div class="party-box plaintiff">
      <div class="icon-area">
        <span class="kaomoji">📹</span>
        <span class="role">テレビ局 (X)</span>
      </div>
      <div class="balloon pl-balloon">
        <strong>取材の自由だ！</strong><br>
        「フィルムを強制的に押収されたら、<br>
        今後の取材に協力してもらえなくなる。<br>
        『報道の自由』は『取材の自由』も含んでいるはずだ。<br>
        警察の手伝いはしたくない！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class="versus-area">
      <div class="arrow-line"></div>
      <span class="vs-badge">VS</span>
      <span class="action-label">証拠提出命令</span>
    </div>

    <!-- 被告側 -->
    <div class="party-box defendant">
      <div class="icon-area">
        <span class="kaomoji">⚖️</span>
        <span class="role">裁判所 (Y)</span>
      </div>
      <div class="balloon def-balloon">
        <strong>公正な裁判のためだ。</strong><br>
        「確かに報道の自由は大事だが、<br>
        真実を明らかにして正しい裁判をする（公正な裁判）のも大事だ。<br>
        このフィルムは重要な証拠だから、提出してもらう必要がある。」
      </div>
    </div>
  </div>

  <div class="ruling-box">
    <div class="ruling-header">
      <span class="gavel">⚖️</span> 最高裁の判断
    </div>
    <div class="ruling-content">
      <p class="conclusion">
        <strong>提出命令は適法（Xの敗訴）</strong><br>
        <span style="font-size: 0.8em; color: #e74c3c;">※比較衡量で裁判の利益が勝った</span>
      </p>
      <div class="logic-flow">
        <p>
          <span class="check">POINT 1</span> <strong>取材の自由も保障される</strong><br>
          報道の自由（21条）は、国民の「知る権利」に奉仕するもの。<br>
          そのための<strong>「取材の自由」も、憲法21条の精神に照らし十分尊重</strong>される（完全な保障ではない）。
        </p>
        <p class="arrow-down">⬇️</p>
        <p>
          <span class="check">POINT 2</span> <strong>比較衡量（バランス）</strong><br>
          しかし、絶対に守られるわけではなく、<br>
          <strong>「公正な裁判の実現」</strong>という目的とのバランスで判断する。<br>
          本件では、フィルムが証拠として重要であり、提出させても取材の自由への影響は少ないとして、提出命令を合憲とした。
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
