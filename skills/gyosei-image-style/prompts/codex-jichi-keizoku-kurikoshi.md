# Codex用・地方自治 繰越明許費 vs 継続費

てらしぃ指示: **画像生成プロンプト**（まず1枚）。工事遅れ（明許）と大型工事（継続）の聞き分け。

- 対象: 地方自治法212条（継続費）／213条（繰越明許費）
- 配置予定（生成後・Cursor）:
  - 見て聞いて覚える「地方自治法」財務カードのもっと深掘る
  - キー案: `gyouseihou/chihou/jichi-keizoku-kurikoshi`
- 保存先: `assets/images/deepdive/gyouseihou/chihou/jichi-keizoku-kurikoshi.png`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- **禁止**: フクロウ・猫・熊・犬。模試全文転載。事故繰越しを主役にしない。アプリ埋め込みは Cursor
- 範囲: **この1枚の画像生成まで**（埋め込みは Cursor）

## 法律の芯（崩すな）

1. **継続費（212条）** 履行に**数年度を要する**事件。予算で**総額と年割額**を定め、数年度にわたって支出できる。試験イメージ＝当初から複数年の**大型工事**。
2. **繰越明許費（213条）** 歳出予算の経費のうち、性質上又は予算成立後の事由により**年度内に支出を終わらない見込み**があるもの。予算の定めるところにより**翌年度に繰り越して**使用できる。試験イメージ＝**工事遅れ**等で単年度に終わらない。
3. 両方とも会計年度独立の例外。**事故繰越し**（220条3項ただし書）は別棚（本図では小さく注でよい／主役禁止）。

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| 見本参照 | 主宰者許可図／ちゃちゃロット承認PNG |
| タイトル対比 | 継続費＝大型の複数年計画／繰越明許＝年度内に終わらない繰越し |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 各行＋条文 | Q&A＋（212条）（213条） |
| 役割ラベル | 財政担当（予算を組み立てる）／工事担当（現場の進みを見る） |
| 中央メタファー | 左に数年カレンダーの橋工事（継続）、右に今年の予算箱から翌年へ矢印（明許） |
| 判断軸 | 最初から数年か、単年度が終わらないか（212／213） |
| ひっかけ | 「明許＝大型計画」「継続＝工事遅れの繰越し」「どちらも事故繰越し」 |
| 暗記 | 継続＝総額＋年割の大型計画。明許＝年度内未了→翌年繰越し |
| 案内役 | ちゃちゃロット。下余白・指し棒・暗記を指す |
| 配置先 | gyouseihou/chihou/jichi-keizoku-kurikoshi |

## 論点Q&A（GOなし）

- 当初から数年かかる大型工事？ → **継続費**（総額＋年割）
- 年度内に終わらない見込みで翌年へ？ → **繰越明許費**
- 根拠条文は → 212条／213条

論点に GO／STOP バッジを置かない。

## 役割

- 左寄り中央: **財政担当（予算を組み立てる）**
- 右寄り中央: **工事担当（現場の進みを見る）**
- 中央物: **橋の工事現場**（左＝複数年カレンダー、右＝今年→翌年の繰越し矢印）

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`（案内役 identity）

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: 地方自治法 — 継続費（212条）vs 繰越明許費（213条）.
Learning goal: After one glance, the learner splits
「当初から数年の大型工事＝継続費」and「年度内に終わらない見込みの繰越し＝繰越明許費」.

Match LAYOUT density of「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記,
warm off-white, large Japanese, navy title. 16:9 or 1536x1024. No overlap. No tiny text.

STRICT:
- Title (navy): 継続費と繰越明許費 — 大型計画か、年度内未了か
- LEFT green panel headed「論点」(NOT「問が聞くこと」):
  - 当初から数年の大型工事？ → 継続費（総額＋年割・212条）
  - 年度内に終わらない見込み？ → 繰越明許（翌年繰越し・213条）
  - 会計年度独立の例外？ → YES（両方）
  Use YES / short words only. No GO/STOP badges in 論点.
- RIGHT orange panel headed「ひっかけ」(NOT「聞かない」):
  - 「明許＝大型計画」→ 違う（それは継続）
  - 「継続＝工事遅れの繰越し」→ 違う（それは明許）
  - 事故繰越しと混ぜない（220条ただし書は別）
- CENTER: two metaphors side by side without clutter —
  left: multi-year calendar + big bridge construction (継続)
  right: this-year budget box with arrow to next year (明許)
  Character role labels under figures ONLY as:
  「財政担当（予算を組み立てる）」and「工事担当（現場の進みを見る）」.
  Do NOT write「だれが」.
- BOTTOM three cards:
  判断軸: 最初から数年か、単年度が終わらないか（212／213）
  ひっかけ: 明許≠大型計画。継続≠遅れ繰越し。事故繰越しと別
  暗記: 継続＝総額＋年割の大型計画。明許＝年度内未了→翌年繰越し
- Guide: ちゃちゃロット only (niconico smiling hat mascot). Small, bottom margin,
  pointer stick to 暗記. Not the hero. No owl/cat/bear/dog. No name tag.
- Colors: warm off-white, navy, teal/green left, amber right, red only for wrong traps.
- No English paragraphs, no watermark, no QR, no tiny footnotes wall.
- Japanese text must be fully readable; no cut-off glyphs.
```

## 目視チェック（生成後）

- [ ] 継続＝複数年計画、明許＝年度内未了の繰越しが左右または中央で一目で分かれる
- [ ] 212／213 が本文または答え帯に残っている
- [ ] 事故繰越しを主役にしていない
- [ ] ちゃちゃロット identity（帽子・にっこり）／フクロウなし
- [ ] 文字重なり・はみ出しなし
