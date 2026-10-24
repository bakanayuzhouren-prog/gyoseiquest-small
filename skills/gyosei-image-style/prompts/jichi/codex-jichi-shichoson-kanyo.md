# 都道府県は、市町村の事務にどこまで関与できる？

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/jichi/shichoson-kanyo-kyokai.png
- 画像キー: learn/jichi/shichoson-kanyo-kyokai
- 見せ方: 表が本体。答え帯は置かない。表と同じ文を下に繰り返さない。案内役は置かない。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/learn/jichi/kuni-kanyo-keiso-taisho.png`（国の関与を係争委に出せるか）。`assets/images/deepdive/learn/jichi/kuni-no-kanyo.png`。この枚は、都道府県が市町村の事務に関与できる範囲。

## PRE-GENERATE-CHECK（地方自治法245条の2から245条の8）

アプリ内の地方自治法。確認日 2026-10-21。正本は `data/knowledge/canonical/todoufuken-jorei-shichoson-jimu.md`。

245条の2は、法律またはこれに基づく政令がなければ、関与を受け、または要しない。

245条の4第1項は、都道府県の執行機関が、担任する事務に関し、技術的な助言もしくは勧告をし、または資料の提出を求めることができる。従う義務の文言はない。

245条の6は、市町村の自治事務が法令に違反しているとき、または著しく適正を欠き、かつ、明らかに公益を害しているとき、都道府県の執行機関が是正の勧告をすることができる。講じなければならない、とは書かれていない。

245条の5第2項は、市町村の事務（第一号法定受託事務を除く）について、大臣が都道府県の執行機関に、市町村へ是正を求めるよう指示できる。第3項は、その指示を受けた都道府県の執行機関が、市町村に是正を求めなければならない。第5項は、その求めを受けた市町村が、必要な措置を講じなければならない。第一号法定受託事務は、この求めの対象に入らない。勧告（245条の6）には、この第5項はかからない。

245条の7第2項は、市町村の法定受託事務が同じ要件のとき、都道府県の執行機関が是正の指示をすることができる。第一号も第二号も対象である。

245条の8第12項は、市町村長の法定受託事務について、都道府県知事が代執行の手続を準用する。他の方法では是正が困難であり、かつ、放置することにより著しく公益を害することが明らかなときに限る。

245条の3第2項は、自治事務について代執行を、できる限り関与として設けない、とする。絶対に設けられない、と断定しない。

245条の7第3項の、大臣が都道府県の執行機関に対して市町村への指示について指示できるのは、第一号法定受託事務である。第4項の、緊急を要するとき等に大臣が市町村へ直接指示できるのも、第一号法定受託事務である。

書かない。助言に従う義務がある、と書くこと。是正の勧告に、講じなければならない、と書くこと。自治事務に是正の指示を原則として書くこと。第二号法定受託事務を是正の指示の対象から外すこと。是正の要求の行から、第一号法定受託事務を除く、を落とすこと。大臣の直接指示を第二号にも書くこと。245条の7第3項・第4項を「指示する」と書くこと。条文は指示をすることができるので、印字は「指示できる」にする。場面を「代執行」とだけ書き、内容を「法定受託事務だけ」と書くこと。245条の8による代執行は法定受託事務、と対象を書かないこと。ブランド名。案内役。底部の判断軸、ひっかけ、暗記。

## 配役

置かない。表で足りる。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. A table is the whole picture. No answer band. No cards under the table. No characters. No footnotes. No extra rows.

Title, a short question: 都道府県は、市町村の事務にどこまで関与できる？

One line under the title: 法律または政令がなければ、関与できない（245条の2）

One table. Three columns. Column headings on a navy band: 場面, 内容, 条文. Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray, row 7 white, row 8 light gray. Not by column. Do not repeat the title or the line under the title, under the table.

Row 1: 担任する事務一般 | 都道府県は、技術的な助言・勧告と、資料の提出の要求ができる。従う義務の文言はない | 245条の4
Row 2: 市町村の自治事務 | 法令違反、または著しく適正を欠きかつ明らかに公益を害するとき、是正の勧告。講じなければならない、とは書かれていない | 245条の6
Row 3: 大臣が都道府県に指示したあと | 対象は、市町村の事務から第一号法定受託事務を除いたもの。都道府県は市町村に是正を求めなければならない。求めを受けた市町村は、必要な措置を講じなければならない | 245条の5第2項・第3項・第5項
Row 4: 市町村の法定受託事務 | 法令違反、または著しく適正を欠きかつ明らかに公益を害するとき、是正の指示。第一号も第二号も対象 | 245条の7第2項
Row 5: 245条の8による代執行 | 245条の8による代執行は、法定受託事務。他の方法では是正が困難で、放置すると著しく公益を害することが明らかなとき、都道府県知事が市町村長に代わりに行うところまで進み得る | 245条の8第12項
Row 6: 245条の関与としての代執行 | 自治事務については、できる限り設けない | 245条の3第2項
Row 7: 第一号法定受託事務。通常 | 大臣は、都道府県に対し、市町村への指示について指示できる | 245条の7第3項
Row 8: 第一号法定受託事務。緊急を要するとき等 | 大臣は、市町村へ直接、是正の指示ができる | 245条の7第4項

Print only the title, the one line under the title, and this table. Keep every cell complete. Do not shrink type until a word is cut off. If a cell wraps, wrap between sentences, not inside a word.
```
