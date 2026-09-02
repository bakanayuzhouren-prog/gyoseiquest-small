# Codex用 — 公文書管理法百科① ライフサイクル

百科の1枚目。作成→分類→満了の一点だけ。試験対比表は2枚目。

- 保存先: `assets/images/deepdive/learn/gyosei/koubun-lifecycle.png`
- 画像キー: `learn/gyosei/koubun-lifecycle`

配置候補（生成後・Cursor）: 行政法総合の見て聞いて覚える（作成義務・分類・規則カード）のもっと深掘る。LEC当たる第3回問26系カードの先頭。

## 法律の芯（崩すな）

- 公文書等の管理に関する法律4条。当該行政機関における経緯を含む意思決定に至る過程等を合理的に跡付け、検証することができるよう、事案が軽微なものである場合を除き、文書を作成しなければならない。罰則はない。
- 同5条1項。職員が行政文書を作成し、又は取得したときは、**行政機関の長**が分類し、名称を付し、保存期間及び満了する日を設定する。
- 同8条1項。保存期間が満了した行政文書ファイル等は、国立公文書館等に**移管し、又は廃棄**する。全部移管ではない。
- 同8条2項。廃棄しようとするときは、あらかじめ内閣総理大臣に協議し、その同意を得る（会計検査院は本項の対象外）。同意が得られないときは新たに保存期間を設定する。

**書かない:** 罰則あり。職員個人が分類する。満了したら全部移管。廃棄同意は公文書管理委員会。地方の条例義務（2枚目）。利用請求の詳細（2枚目に寄せる）。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 作成は義務／満了は移管又は廃棄 |
| 中央メタファー | 文書が関門を進む旅（作成→分類→満了の分岐） |
| 判断軸 | 満了後は移管か廃棄か。廃棄なら内閣総理大臣の同意 |
| ひっかけ | 罰則あり。職員が分類。全部移管 |
| 暗記 | 作成は義務で罰則なし。分類は長。満了は移管又は廃棄 |
| 役割 | 行政機関の長（分類し満了後の措置をとる）／文書（組織的に用いる行政文書） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 公文書等の管理に関する法律. Lifecycle of 行政文書.
Learning goal: 軽微を除き作成義務（罰則なし）. 分類は行政機関の長. 満了後は移管又は廃棄.

Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center metaphor,
bottom 判断軸 / ひっかけ / 暗記, warm off-white, large Japanese, 16:9.

STRICT: Left heading「論点」. Right heading「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP.
Never write せいなく, 切る, 切れない.

Title:「公文書管理法 — 満了後は移管又は廃棄」
Chip:「作成義務。罰則なし」

Center ONLY: one journey. A file folder travels left to right through three gates.
Gate1:「作成（4条）」caption「軽微を除き文書を作る」
Gate2:「分類（5条）」caption「行政機関の長が名称と保存期間」
Gate3 split: green path「移管（8条）」to 国立公文書館等 / orange path「廃棄（8条）」with stamp「内閣総理大臣の同意」
Labels under figures: Left「行政機関の長（分類し満了後の措置をとる）」Right「行政文書（組織的に用いるもの）」
Do not draw 地方公共団体. Do not write 全部移管 as if it were the rule.

Left 論点 ONLY (Q&A, YES/NO or short words):
1. 作成するか？ → 軽微以外は義務（4条）
2. 分類は誰か？ → 行政機関の長（5条）
3. 満了後は？ → 移管又は廃棄（8条）

Right ひっかけ ONLY:
1. 作成義務に罰則がある
2. 職員個人が分類する
3. 満了したら全部を国立公文書館等へ移管する

Bottom:
- 判断軸:「満了後は移管か廃棄か。廃棄なら内閣総理大臣の同意」
- ひっかけ:「罰則あり。職員が分類。全部移管」
- 暗記:「作成は義務で罰則なし。分類は長。満了は移管又は廃棄」
Answer:「保存期間が満了した行政文書ファイル等は、国立公文書館等に移管し、又は廃棄しなければならない。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png.
Green lecturer suit, white shirt, green trousers, shoes. Not bear/owl/cat. No nameplate.
No overlapping text. Large gothic Japanese.
```
