関連: 行政書士法の不服申立て。登録の拒否は6条の3。指定試験機関は4条の18。会と連合会で分かれるのは会則の認可と監督。

# 審査請求は、一律に総務大臣？

表が本体。6行。見本は `genkoku-nashi.png`。横長3:2。ちゃちゃロットは下余白に1体。せりふは足さない。会から連合会へ、連合会から総務大臣へ、の矢印は描かない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyoseishoshi/fufuku-aite.png`
- 画像キー: `learn/gyoseishoshi/fufuku-aite`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` を付けない。
- 上書きしない: `dare-ga.png` `chokai.png` `touroku.png` `gyosei-toroku.png`

## PRE-GENERATE-CHECK

確認日 2026-10-22。正本は `data/knowledge/canonical/kisochi-seiji-keizai-shakai.md`。e-Gov の行政書士法。

- 総務大臣への審査請求を書くのは二つ。登録の拒否は6条の3第1項。申請から三月を経過しても処分がなければ、拒否されたものとして総務大臣に審査請求ができる。登録拒否とみなすのは、審査請求があった日（6条の3第2項）。三月を経過しただけでは拒否とみなさない。経由した都道府県の行政書士会は審査請求先ではない。指定試験機関の試験事務の処分または不作為は4条の18。
- 行政書士会の会則の認可は都道府県知事。16条の2。連合会の会則の認可は総務大臣。18条の5。報告と勧告も、会は都道府県知事、連合会は総務大臣。18条の6。これは審査請求ではない。
- 戒告、二年以内の業務の停止、業務の禁止は都道府県知事がする。14条。総務大臣を審査請求先とする定めはない。審査請求ができない、とは書かない。
- 登録の取消しは6条の5、抹消は7条。いずれも連合会がする。6条の3が総務大臣への審査請求と書くのは、拒否に限る。

書かない。三月を経過しただけで拒否とみなす、と書くこと。見るところ。結論、という列名。結論列に「ない」。会の処分は連合会へ審査請求、という矢印。答え帯。せりふ。同じ文の繰り返し。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（懲戒の行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 6 data rows. No side panels. No bottom cards. No answer bar. No speech balloon. No arrows between rows.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 審査請求は、一律に総務大臣？
Header, navy: 手続 | 内容
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
Row 1: 登録の拒否 | 審査請求は総務大臣。申請から三月を経過しても処分がなければ、拒否されたものとして審査請求ができる。登録拒否とみなすのは、審査請求があった日。経由した都道府県の行政書士会は、審査請求先ではない（6条の3）。
Row 2: 指定試験機関の試験事務 | 処分または不作為の審査請求は、総務大臣（4条の18）。
Row 3: 行政書士会の会則と監督 | 会則の認可も、報告と勧告も、都道府県知事。審査請求ではない（16条の2、18条の6）。
Row 4: 連合会の会則と監督 | 会則の認可も、報告と勧告も、総務大臣。審査請求ではない（18条の5、18条の6）。
Row 5: 懲戒 | 戒告、二年以内の業務の停止、業務の禁止は、都道府県知事がする。総務大臣を審査請求先とする定めはない（14条）。
Row 6: 登録の取消しと抹消 | 連合会がする。総務大臣への審査請求を書く6条の3は、拒否に限る（6条の5、7条）。
Under the table, one line only: 試験で「不服申立ては一律に総務大臣。会の処分は連合会へ審査請求」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the disciplinary row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 列は「手続」「内容」。見るところ、結論、はない
- [ ] 三月を経過しただけでは拒否とみなさない。拒否されたものとして審査請求ができ、登録拒否とみなすのは審査請求があった日（6条の3第2項）
- [ ] 総務大臣への審査請求は、登録の拒否と、指定試験機関の試験事務
- [ ] 会は知事、連合会は総務大臣、と書くのは会則の認可と監督。審査請求の二段ではない
- [ ] 懲戒は都道府県知事。審査請求ができない、とは書いていない
- [ ] 6条の3は拒否に限る。取消しと抹消は連合会
- [ ] 行と行を結ぶ矢印がない。試験の×は1行。文字は縮んでいない
- [ ] 案内役は下余白。帽子は耳ではない。せりふはない
- [ ] ブランド印字なし。名簿外なし
