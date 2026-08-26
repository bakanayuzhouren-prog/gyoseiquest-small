# Codex用 — 賃貸人たる地位の移転（承諾いる／いらない）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/chintainin-chii.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/06-chintainin-chii.md` と `compare-chintainin-chii.md`

## 法律（守る）

- 口頭の「539条」は図では **539条の2**。539条（第三者のためにする契約の抗弁）と書かない。
- 口頭の「605条」の地位移転は **605条の2**（当然）と **605条の3**（合意・承諾不要）。605条本体は対抗力（登記）。
- 対抗要件あり → 当然移転。乙の承諾不要（605条の2①）。
- 対抗要件なし → 甲・丙の合意。乙の承諾は不要（605条の3）。
- 丙が乙に賃料請求 → **所有権移転の登記**が要る（605条の2③）。地位が移っただけでは足りない。
- 図に「乙の承諾が常に要る」「所有権が当然に丙へ」と書かない。移るのは賃貸人たる地位。
- アパート入居済みは借地借家法31条で引渡しが対抗要件。登記なし＝当然移転しない、と書かない。
- 問題の答え帯は一字で: `賃貸人たる地位を移転させる旨の合意および所有権移転の登記`

## 禁止

- GO と YES を論点に混在させない
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- ちゃちゃロットを中央の登場人物にしない。くま化しない

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 賃貸人の地位 — 承諾いる / いらない |
| 中央メタファー | 甲→丙へ家のカギ。乙は横で承諾印を押さない |
| 判断軸 | 普通の契約は顔見知りだから承諾。不動産の賃貸人は家の持ち主に家賃。請求には登記。 |
| ひっかけ | 539条／605条の番号混ぜ／入居済みなのに登記なし扱い／地位だけで賃料請求 |
| 暗記 | 普通は承諾。賃貸人は承諾不要。賃料は丙の登記。 |
| 配置 | minpou-joshiki/chintainin-chii.png |

## 役割

- 左: **旧所有者（売りたい）**
- 中: **新所有者（賃料が欲しい）**
- 右: **賃借人（承諾は求められない）**

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.
- Write 539条の2 and 605条の2 / 605条の3. Do not label the status-transfer rule as mere「539条」or「605条」.

Title:「賃貸人の地位 — 承諾いる / いらない」
Chip:「539条の2 ≠ 605条の2」

Center metaphor: house key passing 旧所有者 → 新所有者. 賃借人 stands aside, no stamp of 承諾. Small sign「承諾不要（賃貸人）」.
Labels:
「旧所有者（売りたい）」
「新所有者（賃料が欲しい）」
「賃借人（承諾は求められない）」

Left 論点:
1. 普通の契約上の地位。相手の承諾は？ → 要る（539条の2）
2. 対抗要件あり。乙の承諾は？ → 不要。当然移転（605条の2）
3. 対抗要件なし。乙の承諾は？ → 不要。甲丙の合意（605条の3）
4. 丙が乙に賃料請求。要るものは？ → 所有権移転の登記（605条の2③）

Right ひっかけ (注意 stamps OK):
- 539条（第三者契約の抗弁）と539条の2を混ぜる
- 605条（対抗力）と605条の2（地位移転）を混ぜる
- アパート入居済みなのに登記なし＝当然移転しない
- 地位が移っただけで賃料を請求できる
- 乙の承諾が常に要る
- 所有権が当然に丙へ（正は賃貸人たる地位）

Bottom:
- 判断軸:「普通の契約は顔見知りだから承諾。賃貸人は家の持ち主へ家賃。請求には丙の登記」
- ひっかけ:「条番号混ぜ／入居済み／地位だけで請求／承諾が常に要る」
- 暗記:「普通は承諾。賃貸人は承諾不要。賃料は丙の登記」
Answer capsule:
「賃貸人たる地位を移転させる旨の合意および所有権移転の登記」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot.
```
