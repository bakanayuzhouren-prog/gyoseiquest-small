# 事情裁決と事情判決、何が違う？

- 状態: 生成済み。2026-10-20 目視。条文と一致。
- 保存先: assets/images/deepdive/learn/gyosei/jijo-saiketsu-hanketsu.png
- 画像キー: learn/gyosei/jijo-saiketsu-hanketsu
- 見せ方: 表が本体。答え帯は置かない。表と同じ文を下に繰り返さない。案内役は置かない。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/fufuku/shikko-teishi-torikeshi-26.png`

## PRE-GENERATE-CHECK

e-Gov。行政不服審査法は平成26年法律第68号の45条3項・49条3項・66条4項。行政事件訴訟法は昭和37年法律第139号の31条1項・38条。確認日 2026-10-20。正本は `data/knowledge/canonical/jijo-hanketsu-shikko-teishi.md`。

どちらも、公の利益に著しい障害が生ずる場合に、損害の程度、賠償又は防止の程度及び方法、その他一切の事情を考慮し、公共の福祉に適合しないと認めるときは、棄却することができる。選んだときは、主文で宣言しなければならない。

差は、行審法が処分についての審査請求で、違法又は不当、取消し又は撤廃、宣言は違法又は不当。行訴法が取消訴訟で、違法、取消し、宣言は違法。不作為の審査請求に45条3項の型はない。再審査請求の66条4項には同型がある。31条は、無効等確認、義務付け、差止めには38条で準用されていない。

この枚には書かない。31条2項の終局前の宣言。執行停止。内閣総理大臣の異議。4条の審査請求先。15条の承継。46条2項の命ずるか自ら処分するか。棄却をしなければならない、と書くこと。事情判決の宣言に不当を入れること。不作為の審査請求にも事情裁決がある、と書くこと。ブランド名。案内役。底部の判断軸、ひっかけ、暗記。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. A table is the whole picture. No answer band. No cards under the table. No characters. No footnotes. No extra rows.

Title, a short question: 事情裁決と事情判決、何が違う？

One line under the title: どちらも、損害の程度、賠償又は防止の程度及び方法、その他一切の事情を考慮する

One table. Three columns. Column headings on a navy band: 重要ワード, 事情裁決（審査庁）, 事情判決（裁判所）. Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column. Do not repeat the title under the table.

重要ワード | 事情裁決（審査庁） | 事情判決（裁判所）
前提 | 処分が違法又は不当である（行審法45条3項） | 処分又は裁決が違法である（行訴法31条1項）
公の利益に著しい障害 | 取り消し、又は撤廃すると生じる | 取り消すと生じる
適合しないと認めるとき | 取り消し又は撤廃が、公共の福祉に適合しない | 取り消すことが、公共の福祉に適合しない
そのときの判断 | 審査請求を棄却することができる | 請求を棄却することができる
棄却を選んだ主文 | 違法又は不当であることを宣言しなければならない | 違法であることを宣言しなければならない
この型の有無 | 不作為の審査請求にはない。再審査請求には同型がある（行審法66条4項） | 取消訴訟の条文。無効等確認、義務付け、差止めには準用されない

One trap line, large type, under the table: 試験で「事情判決は不当も宣言する」「棄却しなければならない」と書いてあったら×。

No brand name, no watermark, no logo.
```
