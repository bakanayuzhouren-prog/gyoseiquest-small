# Codex用 — 持分会社3種（合名／合資／合同）

百科1枚。聞く一点は社員の責任の組み合わせ。株式会社の機関は出さない。

- 保存先: `assets/images/deepdive/learn/shouhou/mochibun-3sha.png`
- 画像キー: `learn/shouhou/mochibun-3sha`

配置候補（生成後・Cursor）: 商法・会社法の持分会社カード、「もっと深掘る」、質問モード「合名 合資 合同」。

## 法律の芯（崩すな）

- 会社法576条。定款に、社員が無限責任社員又は有限責任社員のいずれであるかを記載する。並びで種類が決まる。
- 合名会社。社員の全部が無限責任社員。
- 合資会社。無限責任社員と有限責任社員の両方を置く。片方だけでは合資ではない。
- 合同会社。社員の全部が有限責任社員。
- 会社法580条1項。無限責任社員は、会社財産で完済できないとき、又は会社財産への強制執行が効を奏しなかったとき、連帯して会社の債務を弁済する責任を負う。上限はない。
- 会社法580条2項。有限責任社員は、その出資の価額（既に履行した部分を除く）を限度として、会社の債務を弁済する責任を負う。債権者に対する直接責任である。
- 株式会社の株主（104条）は引受価額を限度とする間接有限責任。合同会社の社員と混ぜない。
- 合名・合同は一人でも設立できる。合資は両種類が必要なので社員は二人以上。
- 会社法590条。定款に別段の定めがなければ、社員は業務を執行する。合資の有限責任社員が「絶対に執行できない」とは書かない。
- 持分は細分化した均一単位ではない。退社による払戻しがあり得る（611条）。

**書かない:** 合同会社＝間接責任。合資＝全員有限。合名は二人以上でなければ設立できない。持分＝株式と同じ細分化。士業法人の詳細。合併・株式交換。図面にブランド名。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 違いは社員の責任。合名＝全員無限／合資＝混成／合同＝全員有限 |
| 中央メタファー | 4行の責任表（行ゼブラ） |
| 判断軸 | 定款上の社員が無限か有限か。並びで種類が決まる（576条） |
| ひっかけ | 合同＝株主と同じ間接責任／合資は全員有限／合名は一人不可／持分は細分化 |
| 暗記 | 合名は全員無限。合資は混成。合同は全員有限で直接。 |
| 役割 | 無限責任社員（全財産で弁済する）／有限責任社員（出資の価額まで弁済する） |

## PRE-GENERATE-CHECK

法律・型・見えやすさ。答え帯は576条・580条と矛盾しない。GOとYESを混在させない。` ```text ` にブランド名なし。帽子は独立した薄い水色（耳・ヘルメット禁止）。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: three types of 持分会社 — 合名会社, 合資会社, 合同会社.
会社法576条・580条。
Learning goal: The difference is the mix of member liability.
合名 = all unlimited. 合資 = unlimited plus limited. 合同 = all limited (direct, not the same as shareholders).

Match LAYOUT of「主宰者の許可」: left green 論点 / right orange ひっかけ,
ONE center metaphor (comparison TABLE), bottom 判断軸 / ひっかけ / 暗記,
warm off-white, 16:9, large Japanese gothic, no overlapping text.

STRICT:
- Left heading「論点」. Right heading「ひっかけ」.
- 論点 is Q&A. YES/NO or short words only. No GO/STOP badges.
- Never write「だれが」「問が聞くこと」「（聞かない）」.
- Never print あぷし, @appshi113, Gyosei Quest, or gyoseiquest anywhere on the image.
- Table is CENTER only. Header navy. Data rows alternate WHITE then LIGHT GRAY by ROW (not by column).

Labels under people (role only):
「無限責任社員（全財産で弁済する）」
「有限責任社員（出資の価額まで弁済する）」

Title:「持分会社 — 違いは社員の責任」
Chip:「合名＝全員無限／合資＝混成／合同＝全員有限」

Center ONLY: one table. Columns: 誰 | 責任 | 性質 | 条文
Four data rows, short Japanese:
1. 合名会社 | 全員が無限 | 直接・連帯 | 576条・580条1項
2. 合資の無限責任社員 | 全財産 | 直接・連帯 | 580条1項
3. 合資の有限責任社員 | 出資の価額まで | 直接 | 580条2項
4. 合同会社 | 全員が有限 | 直接（出資の価額まで） | 576条・580条2項
Tiny footnote:「合資は両種類が必要なので社員は二人以上。合名・合同は一人でも可。株主（104条）は間接有限であり、合同会社の社員と混ぜない。」
Do not add 取締役会, 株主総会, 株式交換. Do not write that 合資の有限責任社員 can never execute business.

Left 論点 ONLY:
1. 合名の社員は？ → 全員無限
2. 合資は？ → 無限と有限の両方
3. 合同は？ → 全員有限
4. 合同は株主と同じ間接責任か？ → NO（直接）

Right ひっかけ ONLY:
1. 合同会社の社員は株主と同じ間接責任
2. 合資会社は全員が有限責任社員
3. 合名会社は二人以上でなければ設立できない
4. 持分は株式と同じく細分化された均一単位

Bottom:
- 判断軸:「定款上の社員が無限か有限か。並びで種類が決まる（576条）」
- ひっかけ:「合同を株主の間接責任と同一視するな（580条2項）」
- 暗記:「合名は全員無限。合資は混成。合同は全員有限で直接」
Answer capsule:「合名会社は全員が無限責任社員、合資会社は無限と有限の双方、合同会社は全員が有限責任社員である。」

Guide: one ちゃちゃロット only, SMALL bottom-right margin, wooden pointer to 暗記.
Green lecturer suit, white shirt, green trousers, shoes. Not a scene character.
No nameplate. Not a bear, owl, cat, or raccoon.
Hat: a SEPARATE thin light-blue hat sitting ON the head. Two round side mounds, lower center mound, long smooth brim. The hat has a smiling closed-eye face. The hat is NOT ears, not an animal head, not a helmet, not a cap, not a triangle hat, not a hood.
No overlapping text. Space between boxes. Large type.
```

## 目視チェック（生成後）

- [ ] 四隅・フッターにブランド名がない
- [ ] 帽子が耳・ヘルメットになっていない
- [ ] 合同会社が間接責任、と読める誤誘導がない
- [ ] 合資が全員有限、と読める誤誘導がない
- [ ] 表は横ゼブラ。株式会社の機関図になっていない
