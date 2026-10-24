# 場外車券と納骨堂。距離の中にいれば、許可を取り消せる？

左右で2つ。各側の最初の問いは、誰が何の許可を争ったか。結論を底部で繰り返さない。

- 状態: 上書き生成
- 上書き対象: `assets/images/deepdive/learn/gyosho/shaken-1000-nokotsu-300.png`
- 保存先: `assets/images/deepdive/learn/gyosho/shaken-1000-nokotsu-300.png`
- 画像キー: `learn/gyosho/shaken-1000-nokotsu-300`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `bochi-nokotsu.png` `genkoku-ari-v2.png` `genkoku-nashi.png`

## PRE-GENERATE-CHECK

確認日 2026-10-21。

場外車券。最判平21.10.15。1000メートルは、申請の見取図に書く、文教施設と医療施設の範囲である。適格があり得るのは、設置・運営に伴い著しい業務上の支障が生ずるおそれがあると位置的に認められる区域の、文教施設又は医療施設の開設者。1000メートル以内に住む者、利用者は、位置基準では適格がない。医療の職員一般ではない。

納骨堂。最判令5.5.9。墓埋法10条の経営許可。大阪市の細則が、学校、病院、人家からおおむね300メートル以内を原則として許可しない。その人家に住む者に、平穏に日常生活を送る利益として適格がある。300メートルは法律本体の数字ではない。

書かない。1000メートル以内の居住者はみな適格。医療関係者だけ。300メートルの人家に適格がない。300メートルを墓埋法本体の数字とする。ブランド名。底部の3枚。答え帯。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 車券側 | いい役 | 開設者（業務上の支障を避けたい） | ぴっちゅ | `pitchi.png` | 左の下。文を隠さない |
| 納骨堂側 | いい役 | 人家の居住者（平穏な日常生活を守りたい） | タスク亀 | `task_turtle.png` | 右の下。文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（距離の中の居住者は、どちらも資格がある、とする） | カチャドクロ | `kachadokuro.png` | 底部の×だけ |

案内役は置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Split left and right. Left is only 場外車券. Right is only 納骨堂. No bottom cards. No answer bar.
Title, one short question: 場外車券と納骨堂。距離の中にいれば、許可を取り消せる？
Left heading: 論点（場外車券）
Left Q&A only:
何があった？ → 場外車券の設置許可を、1000メートル以内の住民が争った
資格は？ → ない。あり得るのは、文教施設・医療施設の開設者（平21.10.15）
1000メートルは？ → 見取図に書く、学校と病院の範囲。法律上の適格の半径ではない
Do not mention 納骨堂 on the left.
Right heading: 論点（納骨堂）
Right Q&A only:
何があった？ → 納骨堂の経営許可を、おおむね300メートル以内の人家の人が争った
資格は？ → ある。平穏に日常生活を送る利益（令5.5.9）
300メートルは？ → 大阪市の細則の数字。墓埋法本体の数字ではない
Do not mention 場外車券 on the right.
Under the left, small ぴっちゅ, label 開設者（業務上の支障を避けたい）.
Under the right, small タスク亀, label 人家の居住者（平穏な日常生活を守りたい）.
Bottom, カチャドクロ only, label 誤った主張（距離の中の居住者は、どちらも資格がある、とする）.
One line only:
試験で「1000メートル以内に住んでいれば、場外車券の許可を取り消せる」と書いてあったら×。
Do not print any brand name, account name, or app name. Do not cover the text.
```
