# Codex用 — 不動産賃貸の先取特権――対象は賃借人の動産（LEC公開２・問30・肢ウ）

`codex-sakidori-kihon` / `codex-sakidori-q30` は順位・5肢表。これは肢ウの対象物だけ。統合しない。新規1枚。画像は生成しない。

- 保存先: `assets/images/deepdive/learn/minpo/fudosan-chintai-sakidori-q30-u.png`
- 画像キー: `learn/minpo/fudosan-chintai-sakidori-q30-u`
- 代替テキスト: カフェの断面。家賃債権を担保する先取特権の対象は、賃借人が備え付けたテーブルと椅子。貸している建物自体は対象ではない。

## 法律の芯（崩すな）

312条: 賃借人の動産。313条2項: 建物賃貸では建物に備え付けた動産。建物本体ではない。優先弁済は換価代金。自力で持ち去る絵は禁止。リース設備は描かない。家賃の支払はBからA。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 不動産賃貸の先取特権――対象は賃借人の動産 |
| 判断軸 | 保護する債権／対象となる物 |
| ひっかけ | 不動産賃貸という名前でも、対象は不動産ではない |
| 暗記 | 家賃等の債権を、賃借人の動産で担保する |
| 配置先 | 問30の肢ウ解説（生成後）。未生成では画像タグを置かない |

## PRE-GENERATE-CHECK

- 建物はA所有。動産はB所有。OK
- 支払の向きを逆転させない。OK
- 既存の順位図と仕事を分けた。OK

## 配置方針（生成後）

問30 deepdive の肢ウの直下。知識ベース `lec-r2-q30-u-fudosan-chintai.md`。

## 出典

民法312条・313条2項。topics 問30・肢ウ。

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Ivory inside a navy frame. Bold Japanese gothic. Wide padding.
No brand names. No exam paper copy.

Title:「不動産賃貸の先取特権――対象は賃借人の動産」

LEFT green panel「論点」Q&A only, no GO badges:
「何を保護する？ → 家賃などの債権」
「どの物が対象？ → 賃借人の動産」
Add（312条・313条2項）

RIGHT orange panel「ひっかけ」:
「制度名の『不動産』と対象物を混同しない」

CENTER: cross-section of a cafe.
Outside wall label「A所有の建物」
Person A「賃貸人（家賃債権者）」
Person B「賃借人（家賃を滞納）」
Inside, tables and chairs that B owns, attached to the building.
Green frame around those movables:「先取特権の対象：B所有の備付動産」
On the building body:「貸している建物自体が対象ではない」
Small teal arrow:「対象動産の換価代金 → 優先弁済」
Do not show A carrying furniture away. Do not draw leased third-party equipment.
Do not reverse who owes rent.

BOTTOM cards:
判断軸「保護する債権／対象となる物」
ひっかけ「不動産賃貸という名前でも、対象は不動産ではない」
暗記「家賃等の債権を、賃借人の動産で担保する」

Guide: ちゃちゃロット, ONE only, SMALL bottom margin, green suit, light-blue smiling hat, not ears.
Do not cover the cafe or labels. No nameplate.
Exact on-image Japanese only. No English.
```
