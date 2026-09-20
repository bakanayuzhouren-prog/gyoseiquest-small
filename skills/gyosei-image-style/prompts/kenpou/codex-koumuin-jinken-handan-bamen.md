# 公務員の人権制約・判断場面（1枚目）

- 保存先: assets/images/deepdive/learn/kenpou/koumuin-jinken-handan-bamen.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: 最判平成23年5月30日多数意見、最大判昭和49年11月6日多数意見、最判平成24年12月7日多数意見（堀越・宇治橋）、最大決平成10年12月1日多数意見。確認日 2026-09-17
- 正本: `utils/koumuinJinkenHikaku.ts`
- 2枚目: `codex-koumuin-jinken-horikoshi-chokai.md`

配置（生成後・Cursor）: 見て聞いて覚える・憲法／多肢選択憲法の関連カード。質問モード「比較：公務員の人権制約の判断基準」。

## PRE-GENERATE-CHECK（Cursor確認済み）

- この枚の仕事は「何を判断する場面か」だけ。6列の詳細表を詰め込まない。
- 「総合考慮」と「比較衡量」を事件ごとに一方へ割り当てない。
- 君が代平成23年とピアノ伴奏平成19年2月27日を同じ判決にしない（この枚にピアノを載せない）。
- 猿払を「すべての政治活動を一律禁止」と書かない。
- 寺西を「表現の自由は保障されない」と書かない。
- 多数意見のみ。補足・反対を答え帯に載せない。
- 禁止: GOとYESの混在。ブランド名・透かしの印字。
- 参照パス確認: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`、`skills/gyosei-image-style/assets/approved-chachalot-pointer.png`、`assets/images/characters/pitchi_sheet.png`、`assets/images/characters/kachadokuro_sheet.png` は実在。

## プロンプト考案チェック

| 欄 | 内容 |
|----|------|
| 見本 | 主宰者許可図の左右＋底部3カード。案内役は承認帽子 |
| タイトル対比 | 判断場面を分ける／言葉だけで一括しない |
| 左右 | 論点＝何を判断するか。ひっかけ＝総合考慮で全部同じ |
| 中央 | 場面ラベルの短い表 |
| 判断軸 | 禁止の合憲性か、行為該当性か、命令か、処分か |
| ひっかけ | 総合考慮なら同じ尺度 |
| 暗記 | 場面が先、言葉は後 |
| 場面役 | いい役＝ぴっちゅ（場面を分ける）。悪い役＝カチャドクロ（全部同じ尺度） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch. ONE job: 公務員の人権制約は判断場面で基準が変わる。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Do not print any brand names or watermarks.

Title:「判断場面が先。言葉だけで一括しない」
Chip:「公務員の人権・多数意見」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges). 説明行は短名＋（〇条）:
君が代平成23年（憲法19条） → 命令の間接的制約
猿払（国公法102条1項） → 禁止の合憲性
堀越の第一関門（国公法102条1項） → 行為該当性
堀越の第二関門（国公法110条1項） → 罰則の合憲性
寺西（裁判所法52条1号） → 禁止と該当性を分ける

Right panel heading ひっかけ:
総合考慮なら全部同じ尺度
比較衡量の事件と総合考慮の事件を割り振る
猿払はどんな活動も一律禁止
裁判官に表現の自由はない
ピアノ伴奏判決と同じ

MAIN: one clean table. Columns: 場面 | 判断対象 | 判例の表現
Header row navy. Data rows alternate white / light gray by ROW (not by column). First data row white, second light gray, then continue.

Rows EXACT. 場面の説明行にも（〇条）:
君が代起立・平23.5.30（憲法19条） | 間接的制約が許されるか | 総合的に較量
猿払・最大判昭49.11.6（国公法102条1項） | 政治的行為の禁止の合憲性 | 目的・合理的関連性・利益の均衡
堀越・宇治橋・平24.12.7（国公法102条1項） | 禁止行為に当たるか | 諸般の事情を総合して判断
同日・罰則の合憲性（国公法110条1項） | 規制が必要かつ合理的か | 必要の程度と自由・態様を較量
寺西・最大決平10.12.1（裁判所法52条1号） | 積極的政治運動の禁止が合憲か | 目的・合理的関連性・利益の均衡
同決定・該当性（裁判所法52条1号） | 積極的政治運動に当たるか | 総合的に考慮

Small center metaphor only: two folders labeled 合憲性 and 該当性, not stacked as one pile.
Role labels under figures (never だれが):
場面を分けたい者（判断対象を先に見る）＝ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Left, small.
一括したい者（総合考慮で全部同じにしたい）＝カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Right, small, do not cover the table.
Do not hide table text, arrows, or the navy answer bar.

Bottom three cards:
判断軸: 禁止の合憲性か、行為該当性か、命令か（憲法19条・国公法102条）
ひっかけ: 総合考慮なら同じ／一律禁止／表現の自由なし
暗記: 場面が先。君が代は命令の目的・内容と制約の態様（憲法19条）

Answer bar EXACT:
「同じ事件でも、禁止の合憲性と具体的行為の該当性は別の判断である。総合考慮と比較衡量を事件ごとに一方へ割り当てない。」

Guide: ONE ちゃちゃロット only. Copy assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png and skills/gyosei-image-style/assets/approved-chachalot-pointer.png: cream face, pale-sky-blue hat (independent of the head, not ears), green lecturer suit with trousers and shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never「だれが」as a character caption. Never「問が聞くこと」.
Do not write that all political activity of public employees is uniformly banned.
```

## 生成後チェック

- [ ] 6行が判断場面ごとに分かれている
- [ ] 猿払を一律禁止と書いていない
- [ ] 行ゼブラ。文字かぶりなし
