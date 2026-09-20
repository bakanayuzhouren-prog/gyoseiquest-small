# 公務員の人権制約・堀越補助と君が代懲戒（2枚目）

- 保存先: assets/images/deepdive/learn/kenpou/koumuin-jinken-horikoshi-chokai.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: 最判平成24年12月7日多数意見（堀越・宇治橋）、最判平成24年1月16日多数意見。確認日 2026-09-17
- 正本: `utils/koumuinJinkenHikaku.ts`
- 1枚目: `codex-koumuin-jinken-handan-bamen.md`

配置（生成後・Cursor）: 1枚目の次。同じ比較表正本。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 宇治橋は厚生労働省の課長補佐（管理職員等）。郵便局の課長代理・係長と書かない。
- 非管理職なら必ず無罪、勤務時間外なら必ず許される、としない。
- 実害の発生までは不要。おそれは「観念的にとどまらず、現実的に起こり得るものとして実質的に認められる」。
- 君が代：命令が合憲でも減給以上が当然に適法、としない。減給以上は慎重な考慮。
- この枚に猿払の3点審査を再掲して詰め込まない。
- 禁止: GOとYESの混在。ブランド名・透かしの印字。
- 参照パス確認: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`、`skills/gyosei-image-style/assets/approved-chachalot-pointer.png`、`assets/images/characters/task_turtle_sheet.png`、`assets/images/characters/subeton_sheet.png` は実在。

## プロンプト考案チェック

| 欄 | 内容 |
|----|------|
| 見本 | 主宰者許可図の左右＋底部3カード |
| タイトル対比 | 要素は並べる／一つでは決めない |
| 左右 | 論点＝総合して実質的なおそれ。ひっかけ＝非管理職なら無罪 |
| 中央 | 堀越と宇治橋の短い対比＋懲戒1行 |
| 判断軸 | 地位・職務・行為を総合するか |
| ひっかけ | 単独要素で決める、命令合憲なら重い処分も適法 |
| 暗記 | おそれは実質。減給以上は慎重な考慮 |
| 場面役 | いい役＝タスク亀（要素を並べる）。悪い役＝すべとん（一つで決める） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch. ONE job: 堀越と宇治橋の該当性、および君が代懲戒の重さ。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Do not print any brand names or watermarks.

Title:「要素は並べる。一つでは決めない」
Chip:「平24.12.7／平24.1.16」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges). 説明行は短名＋（〇条）:
おそれは実害まで要るか（国公法102条1項） → NO
非管理職なら必ず無罪か（国公法102条1項） → NO
勤務時間外なら許されるか（国公法102条1項） → NO
命令が合憲なら減給も適法か（地方公務員法29条） → NO
減給以上（地方公務員法29条） → 慎重な考慮

Right panel heading ひっかけ:
郵便局の課長代理が宇治橋
非管理職なら無罪
休日なら罰則なし
中立性を損なうおそれは観念だけで足りる
命令が合憲なら重い処分も適法

MAIN: two small tables, not one giant table.

Table A title: 行為該当性（平24.12.7多数意見・国公法102条1項）
Columns: 考慮 | 堀越（無罪） | 宇治橋（有罪）
Header row navy. Data rows alternate white / light gray by ROW.
Rows EXACT:
管理職的地位 | なし・年金審査官 | あり・厚労省課長補佐
職務の裁量 | なし | あり（指揮・調整）
勤務時間外・施設不使用・地位不利用 | 該当 | 該当
公務員と認識し得る態様 | 無言配布でなし | 無言配布でも地位からおそれを肯定

Table B title: 君が代の懲戒（平24.1.16多数意見・地方公務員法29条）
Columns: 処分 | 多数意見
Header navy. Rows alternate white / light gray.
戒告 | 同種処分歴がない事案で直ちに違法とはいえない
減給以上 | 事案の性質を踏まえた慎重な考慮。相当性を基礎付ける具体的事情が要る

Role labels under figures (never だれが):
要素を並べたい者（総合して見る）＝タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Left, small.
一つで決めたい者（非管理職なら無罪と言いたい）＝すべとん. Match ポーズシート assets/images/characters/subeton_sheet.png. Right, small, do not cover tables.
Do not hide table text, arrows, or the navy answer bar.

Bottom three cards:
判断軸: 地位・職務・行為を総合し、中立性を損なう実質的なおそれがあるか（国公法102条1項）
ひっかけ: 非管理職なら無罪／命令合憲なら重い処分も適法／宇治橋＝郵便局
暗記: おそれは実質。実害は不要。減給以上は慎重な考慮（地方公務員法29条）

Answer bar EXACT:
「禁止される政治的行為かは、地位・職務・行為を総合し、職務遂行の政治的中立性を損なうおそれが実質的に認められるかで決する。君が代では、職務命令の合憲性と処分の重さの適法性を分ける。」

Guide: ONE ちゃちゃロット only. Copy assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png and skills/gyosei-image-style/assets/approved-chachalot-pointer.png: cream face, pale-sky-blue hat (independent of the head, not ears), green lecturer suit with trousers and shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never「だれが」as a character caption. Never「問が聞くこと」.
Do not write that a constitutional order makes any heavy discipline lawful.
```

## 生成後チェック

- [ ] 宇治橋＝厚労省課長補佐
- [ ] 非管理職なら無罪と答え帯に書いていない
- [ ] 減給以上＝慎重な考慮
- [ ] 行ゼブラ。文字かぶりなし
