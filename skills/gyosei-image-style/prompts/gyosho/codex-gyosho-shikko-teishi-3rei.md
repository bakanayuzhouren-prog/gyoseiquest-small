# Codex用 — 行訴法 執行停止の3類型（具体例）

表主役。1枚。教材・模試の文言は転載しない。結論は行政事件訴訟法25条。

- 保存先: `assets/images/deepdive/gyosho/shikko-teishi-3rei.png`
- 画像キー: `gyosho/shikko-teishi-3rei`
- 生成は Codex。Cursor は描かない。
- 既存の `shikko-teishi-3types.png`（補充性主役）は上書きしない。

## 法律の芯（崩すな）

執行不停止が原則（25条1項）。取消訴訟の提起だけでは、処分の効力・執行・手続の続行は止まらない。

裁判所は、申立てにより、決定をもって次の全部又は一部を止められる（25条2項。職権不可）。

| 類型 | 止めるもの | 具体例（図に載せる） |
|---|---|---|
| **処分の執行の停止** | 処分は残る。処分の内容の実現（実力行使）を止める | **除却命令の代執行**（建物を壊す作業を止める）。隣の例は滞納処分の差押え |
| **手続の続行の停止** | 一連の手続の次の段階を止める | **事業認定の後の収用裁決手続**を止める。隣の例は課税処分の後の滞納処分手続 |
| **処分の効力の停止**（最後） | 処分がなかった状態に近づける。法律関係そのものを仮に戻す | **営業許可の取消し**（許可が生きていた状態に近づける。店を営業できる）。隣の例は運転免許の取消し・免職 |

**補充性（25条2項ただし書・条件フレーズはフル）**  
処分の効力の停止は、**処分の執行又は手続の続行の停止によって目的を達することができる場合には、することができない**。

だから表の行順は **執行 → 手続続行 → 効力（最後）**。効力を1行目に置くな。

切り分け:
- 壊す・差し押さえるなど、いま動いている実力行使を止める → 執行の停止で足りる。効力の停止はできない。
- 次の裁決・滞納処分など、まだ先の手続を止める → 手続の続行の停止で足りる。効力の停止はできない。
- 取消し・免職のように、執行も次手続もなく、処分があるだけで地位が消える → 効力の停止。

**書かない:** 執行＝民事の強制執行だけ。収用裁決後の明渡しを手続続行の主例にする（明渡しの強制は執行側）。効力停止を第一選択。職権で止められる。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 止める対象で選ぶ／効力の停止は最後 |
| 中央メタファー | 3類型×具体例の表（行ゼブラ） |
| 判断軸 | 執行又は手続続行の停止で目的を達することができるか |
| ひっかけ | 効力停止を最初に選ぶ。執行＝強制執行だけ。収用の明渡しを手続続行と混ぜる |
| 暗記 | 壊す・差押えは執行。次の裁決は手続続行。許可取消しは効力。効力は補充的 |
| 役割 | 原告（除却を止めたい）／原告（営業を続けたい）／誤った主張をする側（効力の停止を第一選択とする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
Topic: 行政事件訴訟法の執行停止。処分の効力の停止、処分の執行の停止、手続の続行の停止.
Learning goal: 3類型は止める対象が違う。具体例で選ぶ。効力の停止は最後（25条2項ただし書）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「止める対象で選ぶ。効力の停止は最後」
Chip:「25条2項。執行不停止が原則」

Left 論点 Q&A ONLY:
1. 除却の代執行を止めたいときは？ → 処分の執行の停止
2. 事業認定の後の収用裁決を止めたいときは？ → 手続の続行の停止
3. 営業許可の取消しで店を開けたいときは？ → 処分の効力の停止
4. 執行又は手続続行で目的を達することができるときは効力の停止は？ → できない（25条2項ただし書）

Right ひっかけ ONLY:
効力の停止を第一選択にする
執行は民事の強制執行だけだとする
収用裁決後の明渡しを手続続行と混ぜる
取消訴訟を起こせば当然に止まる
裁判所が職権で止められる

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, then white. NOT column colors.
Columns: 類型 | 具体例 | 何が止まる
Rows in THIS order (do not put 効力 first):
処分の執行の停止 | 除却命令の代執行（建物を壊す） | 実力行使。処分は残る
手続の続行の停止 | 事業認定の後の収用裁決手続 | 次の手続の進行
処分の効力の停止（最後） | 営業許可の取消し | 許可が生きていた状態に近づける
Caption:「隣の例：執行＝滞納処分の差押え。手続続行＝課税の後の滞納処分手続。効力＝運転免許取消し・免職。効力の停止は、処分の執行又は手続の続行の停止によって目的を達することができる場合には、することができない。」

Scene cast SMALL, do not cover table:
- Good role, left of table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「原告（除却を止めたい）」
- Good role, right of table: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「原告（営業を続けたい）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（効力の停止を第一選択とする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「執行の停止又は手続の続行の停止によって目的を達することができるか。できるなら効力の停止はできない」
- ひっかけ:「効力停止を最初に選ぶ。執行＝強制執行だけ。明渡しを手続続行と混ぜる」
- 暗記:「壊す・差押えは執行。次の裁決は手続続行。許可取消しは効力。効力は補充的」
Answer:「処分の効力の停止は、処分の執行又は手続の続行の停止によって目的を達することができる場合には、することができない。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 表の1行目が効力の停止になっていない
- [ ] 主例が「除却の代執行／事業認定後の収用裁決／営業許可取消し」
- [ ] 収用裁決後の明渡しを手続続行の主例にしていない
- [ ] 25条2項ただし書の条件フレーズが答え帯にある
- [ ] 職権で止められると読める文言がない
