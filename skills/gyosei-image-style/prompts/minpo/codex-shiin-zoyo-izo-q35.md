# Codex用 — 死因贈与と遺贈――契約か、遺言か（LEC公開２・問35）

既存の同趣旨プロンプトなし。新規1枚。画像は生成しない。

- 保存先: `assets/images/deepdive/learn/minpo/shiin-zoyo-izo-q35.png`
- 画像キー: `learn/minpo/shiin-zoyo-izo-q35`
- 代替テキスト: 左は死因贈与の生前合意、右は遺言による遺贈。下は承諾・方式・負担・代理・15歳の与える側の比較表。負担の行を強調。

## 法律の芯（崩すな）

死因贈与は契約。承諾が必要。遺言方式は不要。
遺贈は単独行為。成立に承諾不要。法定の遺言方式が必要。必ず書面と一括しない。
どちらも死亡によって効力。負担は両方に付けられる。ここを強調。
代理は死因贈与可、遺贈不可。
15歳は財産を与える側。受け取る側に見えないようにする。
死因贈与: 法定代理人の同意なしは原則取り消し得る。
遺贈: 満15歳から可能。未成年であることを理由には取り消せない。
遺贈の放棄と成立時の承諾を混ぜない。
554条の準用は性質に反しない限度。全部準用しない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 死因贈与と遺贈――契約か、遺言か |
| 判断軸 | 合意による契約か、本人の遺言か |
| ひっかけ | 遺贈の規定をすべて準用するわけではない |
| 暗記 | 死因贈与は契約。遺贈は遺言。負担は両方 |
| 図内の条文 | 549・553・554・5・960〜962・1002条。各行・各パネルに括弧で出す |
| 配置先 | 問35の「もっと深掘る」（生成後） |

## PRE-GENERATE-CHECK

- 15歳は与える側。OK
- 負担行を強調。OK
- 「必ず書面」と一括しない。OK
- 「15歳の遺贈は取り消せない」と広く書かない。OK
- 図内に549・553・554・5・960〜962・1002条を出す。OK

## 配置方針（生成後）

問35 deepdive と `lec-r2-q35-shiin-zoyo-izo.md`。

## 出典

民法5条・549条・553条・554条・960〜963条・1002条。topics 問35。

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Ivory inside a navy frame. Bold Japanese gothic. Wide padding.
No brand names. No exam paper copy.

Title:「死因贈与と遺贈――契約か、遺言か」

TOP HALF split left and right.

LEFT「死因贈与」
Giver and receiver agree while both are alive.
Short labels「死亡時に家を贈与する」「承諾する」
Conclusion「契約／承諾が必要〔549条・554条〕」
Small line「死亡によって効力」

RIGHT「遺贈」
A person makes a will in the statutory form. No handshake of acceptance at formation.
Conclusion「単独行為／成立に承諾不要〔960条〜962条〕」
Small line「死亡によって効力」
Do not draw acceptance as required to form the bequest. Abandonment is not in the top scene.
Print the article numbers on the image. Do not leave statutes only in this prompt.

BOTTOM HALF: five-row comparison table.
Header navy, white type. Columns「比較する点」「死因贈与」「遺贈」
Zebra rows: white, light gray, white, light gray, white. Not column zebra.

Row 承諾: 必要〔549条〕／成立に不要〔960条〕
Row 方式: 遺言方式不要〔554条〕／法定の遺言方式が必要〔960条〜962条〕
Row 負担 EMPHASIZED, teal outline: 付けられる〔553条・554条〕／付けられる〔1002条〕
Row 代理: 可能〔554条〕／不可〔960条〕
Row 15歳の処分（与える側）:
法定代理人の同意なしは原則取消し得る〔5条〕
／満15歳から可能・未成年を理由に取消不可〔961条・962条〕
Small readable strip under the table:「554条の準用は、死因贈与の性質に反しない限度」

Do not let the 15歳 row look like the age of the person who receives the house.

BOTTOM cards:
判断軸「合意による契約か、本人の遺言か」
ひっかけ「遺贈の規定をすべて準用するわけではない」
暗記「死因贈与は契約。遺贈は遺言。負担は両方」

Guide: ちゃちゃロット, ONE only, SMALL bottom margin, green suit, light-blue smiling hat, not ears.
Do not cover the table. No nameplate.
Exact on-image Japanese only. No English.
```
