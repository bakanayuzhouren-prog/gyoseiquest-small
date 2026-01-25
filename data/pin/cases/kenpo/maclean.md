---
id: maclean
title: マクリーン事件
tags: [憲法22条, 外国人の人権, 在留期間更新]
---
<div class=\"case-diagram-container\">
  <div class=\"header-box\">
    <span class=\"badge red\">重要判例</span>
    <h3>マクリーン事件 (最判昭53.10.4)</h3>
    <p>外国人に「政治活動の自由」はあるか？</p>
  </div>

  <!-- 背景事情 -->
  <div class=\"context-box\">
    <div class=\"context-title\">📝 背景事情</div>
    <div class=\"context-content\">
      <div style=\"text-align: center; width: 100%;\">
        <span class=\"kaomoji\">🇺🇸</span>
        <p class=\"context-note\">
            アメリカ人英語教師のマクリーンさん。<br>
            在留期間の更新を申請したが、<br>
            <strong>「無断で転職した」</strong>ことや<strong>「政治活動（ベトナム戦争反対など）」</strong>を理由に<br>
            法務大臣に更新を拒否された。
        </p>
      </div>
    </div>
  </div>

  <div class=\"diagram-area\">
    <!-- 原告側 -->
    <div class=\"party-box plaintiff\">
      <div class=\"icon-area\">
        <span class=\"kaomoji\">🧔</span>
        <span class=\"role\">マクリーンさん (X)</span>
      </div>
      <div class=\"balloon pl-balloon\">
        <strong>人権侵害だ！</strong><br>
        「外国人だって政治活動の自由はあるはずだ！<br>
        それを理由にビザを更新しないのは違憲だ！」
      </div>
    </div>

    <!-- VS矢印 -->
    <div class=\"versus-area\">
      <div class=\"arrow-line\"></div>
      <span class=\"vs-badge\">VS</span>
      <span class=\"action-label\">不許可処分取消</span>
    </div>

    <!-- 被告側 -->
    <div class=\"party-box defendant\">
      <div class=\"icon-area\">
        <span class=\"kaomoji\">🏛️</span>
        <span class=\"role\">法務大臣 (Y)</span>
      </div>
      <div class=\"balloon def-balloon\">
        <strong>更新は自由裁量。</strong><br>
        「誰を日本に居させるかは国の権利。<br>
        日本の利益にならない行為をするなら、更新しなくてＯＫ。」
      </div>
    </div>
  </div>

  <div class=\"ruling-box\">
    <div class=\"ruling-header\">
      <span class=\"gavel\">⚖️</span> 最高裁の判断
    </div>
    <div class=\"ruling-content\">
      <p class=\"conclusion\">
        <strong>合憲・適法 (Xの敗訴)</strong><br>
        <span style=\"font-size: 0.8em; color: #2c3e50;\">※法務大臣の広範な裁量を認定</span>
      </p>
      <div class=\"logic-flow\">
        <p>
          <span class=\"check\">POINT 1</span> <strong>外国人の権利の性質</strong><br>
          基本的人権は外国人にも及ぶが、<br>
          「在留制度の枠内で」のみ保障される。<br>
          （入国の自由や、無条件の在留の権利はない）
        </p>
        <p class=\"arrow-down\">⬇️</p>
        <p>
          <span class=\"check\">POINT 2</span> <strong>大臣の裁量</strong><br>
          在留期間の更新を認めるかどうかは、<br>
          <strong>法務大臣の非常に広い裁量</strong>に委ねられる。<br>
          政治活動を消極的な事情として評価しても違法ではない。
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
