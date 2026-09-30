# Codex用 — 墓地の近所は適格がない。納骨堂の人家は適格がある

左右で2語。左は墓地だけ。右は納骨堂だけ。ひっかけは底部。火葬場は図の中に置かない。

- 保存先: `assets/images/deepdive/learn/gyosho/bochi-nokotsu.png`
- 画像キー: `learn/gyosho/bochi-nokotsu`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。`shaken-1000-nokotsu-300.png` は上書きしない。アプリ載せは生成後。

## 法律

墓埋法10条は、墓地、納骨堂又は火葬場を経営しようとする者は、都道府県知事の許可を受けなければならない、と定めるだけである。300メートルは、法律本体の数字ではない。

墓地。最判平12.3.17。大阪府条例は、住宅、学校、病院、事務所、店舗その他これらに類する施設の敷地から300メートル以上離れていること、を墓地と火葬場の設置場所の基準とした。ただし、知事が公衆衛生その他公共の福祉の見地から支障がないと認めるときは、この限りでない。制限される施設が事務所や店舗まで広く、制限を外す基準も公益だけなので、個々人の利益を守る規定ではない。墓地から300メートルに満たない地域に敷地がある住宅等に居住する者は、墓地の経営許可の取消しを求める原告適格を有しない。

納骨堂。最判令5.5.9。大阪市の細則は、学校、病院及び人家の敷地からおおむね300メートル以内の場所にあるときは、原則として許可しない。この細則は、おおむね300メートル以内の人家に住む者が平穏に日常生活を送る利益を、個々の居住者の個別的利益として保護する。その人家に住む者は、納骨堂の経営許可の取消しを求める原告適格を有する。最高裁は、平成12年判決は条例の内容が違うので、この納骨堂の事件には当てはまらない、とした。

試験で「300メートル以内なら、墓地も納骨堂も適格がある」と書いてあったら×。
試験で「納骨堂の300メートルは、墓埋法本体の数字」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 納骨堂側 | いい役 | 人家の居住者（平穏な日常生活を守りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 右の下。文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（300メートル以内なら墓地も納骨堂も適格がある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ。左右の文を隠さない |
| 案内 | いい役 | 案内（納骨堂の人家を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。遺体や焼香の場面は描かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Split left and right. Left is only 墓地. Right is only 納骨堂. Do not write 火葬場 anywhere. No corpses. No funeral scene.
Title: 墓地の近所は適格がない。納骨堂の人家は適格がある
Subtitle: 300メートルは、法律本体の数字ではない
Left heading: 論点（墓地）
Left Q&A only:
誰が争う？ → 300メートル未満の住宅等に住む者
適格は？ → ない
なぜ？ → 制限が事務所や店舗まで広い。外す基準も、公衆衛生その他公共の福祉だけ（平12.3.17）
Do not mention 納骨堂 on the left.
Right heading: 論点（納骨堂）
Right Q&A only:
誰が争う？ → おおむね300メートル以内の人家に住む者
適格は？ → ある
守る利益は？ → 平穏に日常生活を送る利益（令5.5.9）
Small note: 大阪市の細則。学校、病院、人家に絞っている
Do not mention 墓地 on the right.
Under the right panel, small タスク亀, label 人家の居住者（平穏な日常生活を守りたい）. Do not cover the Q&A.
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（300メートル以内なら、墓地も納骨堂も適格がある、とする）:
試験で「300メートル以内なら、墓地も納骨堂も適格がある」と書いてあったら×。
試験で「納骨堂の300メートルは、墓埋法本体の数字」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 墓地の大阪府条例は、居住者に適格がない。納骨堂の大阪市細則は、人家の居住者に適格がある。
Do not print any brand name, account name, or app name. Do not cover the text with characters or the pointer.
```
