# Codex用 — 副大臣・大臣政務官・特命担当大臣の仕事

3列。各省の副大臣と大臣政務官、内閣府の特命担当大臣。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/gyosei/fukudaijin-seimukan-tokumei.png`
- 画像キー: `learn/gyosei/fukudaijin-seimukan-tokumei`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法総論の「もっと深掘る」。アプリ載せは生成後。

## 法律

副大臣（国家行政組織法16条）は、各省に置く。その省の長である大臣の命を受け、政策及び企画をつかさどり、政務を処理する。あらかじめその大臣の命を受けて、大臣不在の場合にその職務を代行する。

大臣政務官（国家行政組織法17条）は、各省に置く。その省の長である大臣を助け、特定の政策及び企画に参画し、政務を処理する。つかさどる、とは書かない。大臣不在の職務代行は書かない。任免は、その大臣の申出により内閣が行う。

特命担当大臣（内閣府設置法9条）は、各省のポストではない。内閣総理大臣が、内閣の重要政策に関して行政各部の施策の統一を図るために特に必要がある場合に、内閣府に置くことができる。内閣総理大臣を助け、命を受けて、内閣府の事務を掌理する。国務大臣をもって充てる。必ず置く、ではない。

試験で「大臣政務官は、政策及び企画をつかさどり、大臣不在の職務を代行する」と書いてあったら×。
試験で「副大臣は、特定の政策に参画するだけで、職務代行はしない」と書いてあったら×。
試験で「特命担当大臣は、各省に必ず置かれる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（政務官が職務代行する、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。3列を隠さない |
| 案内 | いい役 | 案内（特命担当大臣の列を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

大臣の顔にキャラを使わない。ぴっちゅとタスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Three vertical columns. No left-right debate panels. No three cards at the bottom.
Title: 副大臣・大臣政務官・特命担当大臣は、何をするか
Column 1, navy header: 副大臣（国家行政組織法16条）
Body: 各省に置く。大臣の命を受け、政策及び企画をつかさどり、政務を処理する。あらかじめ命を受けて、大臣不在のとき職務を代行する。
Column 2, navy header: 大臣政務官（国家行政組織法17条）
Body: 各省に置く。大臣を助け、特定の政策及び企画に参画し、政務を処理する。つかさどる、とは書かない。職務代行は書かない。任免は、大臣の申出により内閣が行う。
Column 3, amber outline so the eye hits it: 特命担当大臣（内閣府設置法9条）
Body: 各省のポストではない。内閣総理大臣が、行政各部の施策の統一のため特に必要があるときに、内閣府に置くことができる。総理を助け、命を受けて内閣府の事務を掌理する。国務大臣をもって充てる。必ず置く、ではない。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（政務官が職務代行する、とする）:
試験で「大臣政務官は、政策及び企画をつかさどり、大臣不在の職務を代行する」と書いてあったら×。
試験で「副大臣は、特定の政策に参画するだけで、職務代行はしない」と書いてあったら×。
試験で「特命担当大臣は、各省に必ず置かれる」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: つかさどるのは副大臣。特定の政策に参画するのは大臣政務官。特命担当大臣は内閣府で、国務大臣。
Do not print any brand name, account name, or app name. Do not cover the three columns with characters or the pointer.
```
