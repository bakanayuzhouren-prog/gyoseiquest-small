# Codex用 — 近所の墓地と納骨堂。原告適格はある？

左右で2語。左は墓地だけ。右は納骨堂だけ。各側の最初の問いは、誰が何の許可を受け、近所の人が何を訴えたか。ひっかけは底部。火葬場は図の中に置かない。結論を、タイトルと底部で繰り返さない。

- 状態: 上書き生成。2026-10-22のPNGは、タイトルが許可の取消しの可否に読めるため不合格。見出しだけ直して上書きする。配役と左右の結論は維持する。
- 上書き対象: `assets/images/deepdive/learn/gyosho/bochi-nokotsu.png`
- 保存先: `assets/images/deepdive/learn/gyosho/bochi-nokotsu.png`
- 画像キー: `learn/gyosho/bochi-nokotsu`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `assets/images/deepdive/learn/gyosho/shaken-1000-nokotsu-300.png`
- アプリの `[[image:]]` は、この上書きPNGの目視後。

## PRE-GENERATE-CHECK

正本は `data/knowledge/canonical/bochi-nokotsu-tekikaku.md`。確認日 2026-10-21。

墓埋法10条は、墓地、納骨堂または火葬場の経営には都道府県知事（市では市長）の許可が要る、と書くだけである。300メートルは、法律本体の数字ではない。

墓地。最判平12.3.17。大阪府知事が宗教法人に墓地の経営許可をした。300メートルに満たない住宅等に住む人たちが、その取消しを求めた。適格はない。大阪府条例は、住宅に加え事務所や店舗まで300メートル以上離す。外せるのは、公衆衛生その他公共の福祉の見地から支障がないときだけである。許可が違法かは、この判決では審理されていない。

納骨堂。最判令5.5.9。大阪市長が、地上6階の納骨堂の経営許可（平成29年2月）と、面積を広げる変更許可（令和元年11月）をした。直線距離100メートル以内の建物に住む人たちが、その取消しを求めた。適格はある。大阪市の細則は、学校、病院、人家からおおむね300メートル以内を原則として許可しない。守る利益は、その人家の居住者が平穏に日常生活を送る利益である。100メートルは、この事件の原告が住んでいた距離である。適格が及ぶ範囲の数字は、おおむね300メートルである。許可自体の違法は、この判決では決まっていない。

書かない。近所だから両方に適格がある、と書くこと。300メートルを墓埋法本体の数字として書くこと。納骨堂の原告の距離を、適格の範囲そのものとして300メートルだけにすること。適格があることを、許可が違法で原告が勝った、と書くこと。ブランド名。案内役の長い説明。タイトルと同じ文を底部に繰り返すこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 納骨堂側 | いい役 | 人家の居住者（許可の取消しを求め、平穏な日常生活を守りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 右の下。文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（300メートル以内なら墓地も納骨堂も適格がある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ。左右の文を隠さない |
| 案内 | いい役 | 案内（右の「何があった」を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。説明文は足さない |

ぴっちゅは置かない。遺体や焼香の場面は描かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Split left and right. Left is only 墓地. Right is only 納骨堂. Do not write 火葬場 anywhere. No corpses. No funeral scene.
Title, one short question: 近所の墓地と納骨堂。原告適格はある？
One line under the title, and nowhere else as a repeated sentence: 知事や市長が経営を許可した。近所の人が、その取消しを訴えた。
Left heading: 論点（墓地）
Left Q&A only:
何があった？ → 知事が、宗教法人に墓地の経営を許可した。300メートル未満の住宅の人が、その取消しを訴えた
適格は？ → ない
なぜ？ → 距離の制限が事務所や店舗まで広い。外す基準も、公衆衛生その他公共の福祉だけ（平12.3.17）
Do not mention 納骨堂 on the left.
Right heading: 論点（納骨堂）
Right Q&A only:
何があった？ → 市長が、地上6階の納骨堂の経営と、面積を広げる変更を許可した。100メートル以内の人家の人が、その取消しを訴えた
適格は？ → ある
守る利益は？ → 平穏に日常生活を送る利益。おおむね300メートル以内の人家（令5.5.9）
Small note on the right only: 大阪市の細則は、学校、病院、人家に絞っている
Do not mention 墓地 on the right.
Under the right panel, small タスク亀, label 人家の居住者（許可の取消しを求め、平穏な日常生活を守りたい）. Do not cover the Q&A.
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（300メートル以内なら、墓地も納骨堂も適格がある、とする）:
試験で「300メートル以内なら、墓地も納骨堂も適格がある」と書いてあったら×。
試験で「納骨堂の300メートルは、墓埋法本体の数字」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the right panel line 何があった. Do not add another sentence under ちゃちゃロット.
Do not print any brand name, account name, or app name. Do not cover the text with characters or the pointer.
```
