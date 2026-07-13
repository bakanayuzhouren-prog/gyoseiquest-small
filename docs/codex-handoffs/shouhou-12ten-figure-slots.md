# Codex引き継ぎ：商法12点教科書の図解スロット

てらしぃ指示。あなた（Codex）はスーパーバイザー兼、教材画像の GPT Image 生成担当。
アプリ本体のコード実装はしない。画像生成と配置方針まで行い、配線は Cursor オペレーター向けプロンプトに落とす。

## 前提

- 先に `skills/gyosei-image-style/SKILL.md` と `references/visual-guidelines.md` を読む
- フォトリアル禁止。学習アプリ向けイラスト（フラット〜セミフラット）
- 予備校・模試の原文転載禁止
- 緑のフクロウ講師を余白に置いてよい（本文・矢印を隠さない）
- 各図に「判断軸」「ひっかけ」「暗記フレーズ」を原則1つ

## 保存先（案）

`assets/images/textbook/shouhou/` に PNG で保存。

| slot id | ファイル名案 |
|---|---|
| shoho-agency-minpou-vs-shouhou | `agency-minpou-vs-shouhou.png` |
| shoho-shihainin-saibangai | `shihainin-saibangai.png` |
| shoho-dairisho-vs-shihainin | `dairisho-vs-shihainin.png` |
| shoho-teiyaku-vs-baikais | `teiyaku-vs-baikais.png` |
| shoho-nakadachi-triangle | `nakadachi-triangle.png` |
| shoho-tonya-own-name | `tonya-own-name.png` |
| shoho-nakadachi-vs-tonya-flow | `nakadachi-vs-tonya-flow.png` |
| shoho-cast-compare-board | `cast-compare-board.png` |

配線は Cursor へ：`figureSlot` を実画像ブロックへ置換、または `TextbookReader` で slot id → require マップ。

対象本文: `src/content/shouhouTextbookContent.ts` の章 `shouhou-cast`（第8章）。

---

## 図① shoho-agency-minpou-vs-shouhou

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white background, flat editorial illustration, crisp vector-like shapes, readable Japanese labels, no photorealism.
Canvas: 16:9 landscape.
Topic: 民法の代理 vs 商法の商行為代理（顕名／非顕名）
Learning goal: 名乗らなくても本人に効力が及び得る商法側の感覚を一発で理解する。
Layout: split-screen match-up.
Left panel titled「民法イメージ」: person saying「私はAの代理人です」(顕名) then arrow to contract belonging to A. Trap card amber:「黙って契約→代理人自身になりやすい」.
Right panel titled「商法・商行為代理」: staff buys goods without announcing name; arrow still goes to company A (本人). Small note: 504条但書で相手方が善意無過失なら代理人にも請求可.
Include deciding axis ribbon:「本人のためにする商行為か？」
Memory ribbon:「民法は名乗れ。商法は本人のためなら本人へ」.
Green owl in margin pointing at deciding axis.
Avoid: tiny text, clutter, copyrighted textbook pages.
```

## 図② shoho-shihainin-saibangai

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration, large Japanese labels.
Canvas: 16:9.
Topic: 支配人と商業使用人の権限（裁判上／裁判外）と「なぜ分かれるか」
Learning goal: 店長＝支配人は裁判上も裁判外も、係員は裁判外が基本、を背景つきで理解する。
Layout: authority ladder / podium plus a why-ribbon.
Top wide badge「支配人（店長・支店長）」with two doors: 裁判上（裁判所アイコン）and 裁判外（契約・催告アイコン）, both open/teal.
Lower narrower badge「ある種類・特定事項の使用人」with 裁判外 open/teal and 裁判上 closed/red.
Why ribbon:「重いカード（訴訟）は店全体を任された人にだけ渡す」.
Deciding axis:「この人は何のために置かれた人か？」
Amber trap:「支配人の権限は裁判外だけ」は×.
Memory:「支配人は両方。一部使用人は裁判外」.
Owl points at why ribbon.
```

## 図③-2 shoho-teiyaku-vs-baikais

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration.
Canvas: 16:9.
Topic: 締約代理商 vs 媒介代理商
Learning goal: ハンコまで押す代理店と、紹介までの代理店を分ける。代理商は個人でもお店（法人）でも可と小さく注記。
Layout: split-screen.
Left「締約代理商」: agent shop stamps contract with customer; arrow of effect to manufacturer (本人). Label「代わりに契約締結」.
Right「媒介代理商」: agent introduces customer; thick contract line is manufacturer↔customer only. Label「引き合わせ／契約は本人」.
Shared badge:「どちらも外部・継続・特定商人のため」.
Amber trap:「代理商＝必ず店長」「媒介＝仲立と同じでよい」.
Memory:「締約はハンコ、媒介は紹介」.
Note corner:「代理商＝人でも店（会社）でもなり得る」.
```

## 図⑤-2 shoho-nakadachi-vs-tonya-flow

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration.
Canvas: 16:9.
Topic: 仲立人と問屋の入り方对照
Learning goal: 同じ商人Aと相手方Bでも、契約線の引き方が違うことを上下対比で理解する.
Layout: two horizontal flows stacked.
Top「仲立」: A —(matchmaker)— B with thick contract A↔B; 仲立人 not on contract line; badges 当事者にならない／代金受領原則×.
Bottom「問屋」: A (behind ledger「計算」) — 問屋 ↔ B thick contract; badges 自己の名／対外当事者／代金受領可.
Deciding axis:「契約の線は誰と誰？」
Amber trap:「仲立＝問屋」「問屋は当事者にならない」.
Memory:「仲立はくっつけ、問屋は自己名義」.
```

## 図③ shoho-dairisho-vs-shihainin

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration.
Canvas: 16:9.
Topic: 支配人 vs 代理商
Learning goal: 代理商＝店長、という誤解を潰す。
Layout: two buildings.
Left: shop interior labeled「支配人」= store manager inside the company, badge「内部・包括代理」.
Right: outside partner office labeled「代理商」= regional sales agent / maker's代理店, badge「外部・継続的に代理または媒介」.
Big red stamp over a wrong thought bubble「代理商＝店長」.
Deciding axis:「店の中の人か、外の継続パートナーか」
Memory:「店長は支配人。代理商は外のプロ」.
```

## 図④ shoho-nakadachi-triangle

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration.
Canvas: 16:9.
Topic: 仲立人
Learning goal: 仲立人はマッチング係で契約当事者にならない。
Layout: relationship triangle.
A（委託者）and B（相手方）connected by thick contract line.
仲立人 above the line as matchmaker with dashed lines to A and B, label「くっつけ係」.
Badge:「当事者にならない」「代金受領は原則×」.
Amber trap:「仲立人が代金を受け取れる」.
Memory:「仲立はくっつけ係」.
Metaphor: dating/business matchmaker, keep it professional and exam-safe.
```

## 図⑤ shoho-tonya-own-name

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration.
Canvas: 16:9.
Topic: 問屋
Learning goal: 自己の名で契約し、他人の計算で動くことを見せる。
Layout: front-stage / back-stage.
Front: 問屋 ↔ 相手方 thick contract line, label「自己の名」.
Back: 委託者 connected to 問屋 with ledger icon「他人の計算（損益は委託者）」.
Badge: 問屋は対外的に当事者／代金受領可／履行担保あり得る.
Amber trap:「問屋は仲立と同じで当事者にならない」.
Memory:「問屋＝自分の名前・他人の財布」.
```

## 図⑥ shoho-cast-compare-board

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm off-white, flat illustration, one-page comparison board.
Canvas: 16:9.
Topic: 支配人／代理商／仲立人／問屋の对照看板
Learning goal: 試験直前に4者を一望する。
Layout: 2x2 cards with one icon each and 1-line role + 1-line exam tip.
Card1 支配人: 店長／裁判上も裁判外も.
Card2 代理商: 外の継続パートナー／店長ではない.
Card3 仲立人: くっつけ係／当事者にならない.
Card4 問屋: 自己の名＋他人の計算／当事者になる.
Center deciding axis:「誰の名前？店の中？外？」
Amber trap ribbon:「代理商＝店長」「仲立＝問屋」.
Memory ribbon:「仲立はくっつけ、問屋は自己名義、店長は支配人、代理商は外」.
Owl in corner.
No dense paragraphs.
```

---

## Codex完了後に Cursor へ渡すこと

1. 生成PNGのパス一覧（slot id 対応）
2. `figureSlot` を画像表示に切り替えるオペレーター用プロンプト
3. 目視チェック結果（文字重なり・法的誤りがないか）
