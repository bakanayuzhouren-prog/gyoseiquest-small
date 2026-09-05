# 行政不服審査法・審査請求先

- 保存先: assets/images/deepdive/learn/fufuku/seikyu-saki.png
- 画像キー: learn/fufuku/seikyu-saki
- 生成は Codex。Cursor は描かない。
- 根拠: 行政不服審査法4条、21条。認容裁決の中身（46条）は別図。

## PRE-GENERATE-CHECK

- 4条柱書: 法律（条例に基づく処分については条例）に特別の定めがある場合を除くほか、各号の行政庁へ。
- 「庁の長」は一般の庁ではなく、4条1号・2号所定の庁の長。すなわち**内閣府設置法49条1項若しくは2項又は国家行政組織法3条2項に規定する庁の長**（例: 金融庁長官、消費者庁長官）。内部部局の長や出先の長を「庁の長」と書かない。
- 1号: 上級なし、又は処分庁等が主任の大臣・宮内庁長官・**4条所定の庁の長** → 当該処分庁等。
- 2号: 宮内庁長官又は**4条所定の庁の長**が上級 → 宮内庁長官又は当該庁の長。
- 3号: 主任の大臣が上級（1号2号除く） → 当該主任の大臣。
- 4号: それ以外 → 当該処分庁等の最上級行政庁。
- 21条: 審査庁が処分庁等と異なるときは、処分庁等を経由してすることができる。
- 禁止: 常に処分庁へ出す。常に上級へ出す。再調査の請求先と混ぜる。庁の長をすべての外局・部局の長に広げる。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 審査請求は誰に出すか.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「4条所定の庁の長の処分は自己へ」
Chip:「行服法4条・21条」

Left heading 論点:
上級がないときは？ → 当該処分庁等（4条1号）
4条所定の庁の長が処分したときは？ → 当該処分庁等（自己）
4条所定の庁の長が上級のときは？ → 当該庁の長（4条2号）
条例に基づく処分は？ → 条例で請求先を定め得る

Right heading ひっかけ:
常に処分庁へ出す
常に上級行政庁へ出す
庁の長＝内部部局や出先の長も含む
再調査の請求先と同じ

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 号 | 場面 | 請求先
Rows:
1号 | 上級なし、又は処分庁等が主任大臣・宮内庁長官・4条所定の庁の長 | 当該処分庁等
2号 | 宮内庁長官又は4条所定の庁の長が上級 | 宮内庁長官又は当該庁の長
3号 | 主任の大臣が上級（1号2号を除く） | 当該主任の大臣
4号 | それ以外 | 最上級行政庁
Caption:「4条所定の庁の長＝内閣府設置法49条1項・2項又は国行組3条2項の庁の長。審査庁が処分庁等と異なるときは経由可（21条）」

Roles: 審査請求人（請求先を選ぶ）／審査庁（裁決する）. Never だれが.

Bottom:
- 判断軸:「上級があるか。処分庁等が4条所定の庁の長か」
- ひっかけ:「常に処分庁。常に上級。庁の長を部局の長まで広げる」
- 暗記:「4条所定の庁の長の処分は自己へ。その長が上級ならその長へ。条例で請求先を定め得る」
Answer:「審査請求は、法律又は条例に特別の定めがある場合を除き、次による。1号は、上級がないとき又は処分庁等が主任の大臣、宮内庁長官若しくは4条所定の庁の長であるとき、当該処分庁等。2号は、宮内庁長官又は4条所定の庁の長が上級であるとき、宮内庁長官又は当該庁の長。3号は、主任の大臣が上級であるとき（1号2号を除く）、当該主任の大臣。4号は、前三号以外のとき、最上級行政庁。4条所定の庁の長とは、内閣府設置法49条1項若しくは2項又は国家行政組織法3条2項に規定する庁の長をいう。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks.
```
