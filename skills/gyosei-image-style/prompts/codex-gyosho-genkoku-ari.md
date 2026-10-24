# 原告適格ありパターン

原告適格がある側。6行。許可だけに限定しない。免許・認可・無効確認を残す。列の文は、見出しと同じく、誰が先。真ん中は○。右列は、法令が個別に守る利益だけ。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-21）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/genkoku-ari-v2.png`
- 画像キー: `learn/gyosho/genkoku-ari-v2`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `assets/images/deepdive/learn/gyosho/genkoku-ari.png`。`genkoku-nashi.png` も触らない。

## PRE-GENERATE-CHECK

確認日 2026-10-21。生成前チェックの不合格（タイトルが許可の取消しだけ。右列に訴えの利益と別事件が混ざる。10行を1行に詰める。真ん中が「ある」。案内役を外している）を直した。見本は `genkoku-nashi.png`。

- タイトルは「原告適格ありパターン」。許可の取消し、とは書かない。表には開発許可・場外車券の設置許可・一般廃棄物の許可・航空運送事業の免許・都市計画事業の認可・原子炉設置許可の無効確認がある。
- もんじゅは無効等確認（最判平4.9.22）。左の文に「無効確認」と書く。取消訴訟とは書かない。
- 右列は、その行の根拠法令が個別に守る利益と、日付だけ。訴えの利益、区域の内外、沿線の全員、単なる利用者、薬局の憲法、最判平5.6.25は、この列に書かない。
- 開発許可。直接の被害が予想される範囲の居住者。守る利益は、がけ崩れ等による生命・身体等の安全（最判平9.1.28）。
- 場外車券。文教施設・医療施設の開設者。守る利益は、著しい業務上の支障を受けないこと（最判平21.10.15）。周辺住民は別図。
- 一般廃棄物。同じ種類の許可を持つ既存業者。守る利益は、その種類の処理業を営む営業上の利益（最判平26.1.28）。種類が違う業者の行は、なし側の図。
- 新潟空港。著しい騒音障害を受ける周辺の居住者。守る利益は、社会通念上著しい騒音による障害（最判平元.2.17）。定期航空運送事業の免許。
- 小田急。健康又は生活環境に著しい被害を直接受けるおそれのある居住者。守る利益は、その著しい被害（最大判平17.12.7）。都市計画事業の認可。
- もんじゅ。生命・身体に重大な被害のおそれのある一定範囲の住民。守る利益は、事故による生命・身体の安全（最判平4.9.22）。

この1枚に載せる件数は6行。文字を縮めずにスマホで読めるサイズにする。折り返してよい。

この1枚から外す。名宛人の原則。長沼（訴えの利益の消滅が別問題で、右列に混ざる）。公衆浴場（薬局距離の憲法との区別が右列に混ざる）。製造たばこの既存業者（熊本地判。最判平5.6.25は、不許可を受けた申請者の憲法の事件）。

試験の×は1行。開設者や、直接の被害が予想される範囲の住民には原告適格がない、と書くこと。

書かない。真ん中の列に「ある」。タイトルを「許可の取消し」に戻すこと。右列に訴えの利益や別事件を書くこと。6行以外をこの1枚へ戻すこと。1行に詰めて文字を縮めること。もんじゅを取消訴訟と書くこと。ちゃちゃロットを消すこと。試験の×を2行にすること。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の列の「誰が」を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 6 data rows. The canvas may be tall. No side panels. No bottom cards.
Title: 原告適格ありパターン
Header, navy: 誰が、何を争うか | 原告適格 | 法令が個別に守る利益
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
The middle column is a large green circle mark on every row. Do not write a Japanese word in that column.
Keep the type large enough to read on a phone. Rows may wrap to two lines. Do not shrink the type to force each cell onto one line.
The left cell starts with the person, then what they dispute. Exactly these 6 rows:
がけ崩れ等で生命・身体に直接の被害が予想される範囲の居住者が、開発許可の取消しを争う | ○ | がけ崩れ等による生命・身体等の安全（平9.1.28）
著しい業務上の支障が位置的に認められる区域の、文教施設・医療施設の開設者が、場外車券発売施設の設置許可の取消しを争う | ○ | 著しい業務上の支障を受けない利益（平21.10.15）
同じ種類の許可を持つ既存業者が、一般廃棄物処理業のその許可の取消しを争う | ○ | その種類の処理業を営む営業上の利益（平26.1.28）
著しい騒音障害を受ける周辺の居住者が、定期航空運送事業の免許の取消しを争う | ○ | 社会通念上著しい騒音による障害（平元.2.17）
健康又は生活環境に著しい被害を直接受けるおそれのある居住者が、都市計画事業の認可の取消しを争う | ○ | 健康又は生活環境に係る著しい被害（平17.12.7）
生命・身体に重大な被害のおそれのある一定範囲の住民が、もんじゅの原子炉設置許可の無効確認を求める | ○ | 事故による生命・身体の安全（平4.9.22）
Under the table, one line only:
試験で「開設者や、直接の被害が予想される範囲の住民には、原告適格がない」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```
