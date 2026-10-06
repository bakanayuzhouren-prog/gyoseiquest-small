# 語呂で覚えよう

- 状態: 生成済み。国の並びだけ上書きする
- 上書き対象: assets/images/deepdive/learn/kisochi/genshu-furokai.png（てらしぃ指示・2026-10-06。表の「国」は上からフランス、ロシア、韓国、インドネシア。そのあとドイツ、中国）
- overwrite: true
- 関連: LEC市販模試 第1回 問47。TAC第2回 問48。任期の表は `genshu-ninki`。選び方だけは `genshu-erabu`。韓国だけの任期は `kankoku-ninki`。この図は語呂。3枚は上書きしない。左の表は上からフ・ロ・カ・イ。ドイツと中国はその下。右の語呂も同じ順。韓国の再任できないだけを赤にする。答え帯を韓国の5年にしない。中国を終身と書かない。国家主席を大統領と書かない。
- 保存先: assets/images/deepdive/learn/kisochi/genshu-furokai.png
- 画像キー: learn/kisochi/genshu-furokai
- 見せ方: 左に国の表。右に語呂の分解。フロカイを優先して大きく。ド連・中全は下に小さく。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Large type. One sheet. A table on the left, a mnemonic legend on the right. The right legend must stay readable. Do not cover it with the guide.

Title, large: 語呂で覚えよう

Answer band: フロカイは、国民が直接。

Left, one table. Column headings on a navy band: 国 / だれが選ぶ / 任期
Six data rows. Alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.

The 国 column reads top to bottom as フロカイ, then ド, then 中. The first four rows are France, Russia, Korea, Indonesia, in that order. Do not put Germany or China between those four.

国 | だれが選ぶ | 任期
フランスの大統領　フ | 国民が直接 | 5年。続けて2期まで
ロシアの大統領　ロ | 国民が直接 | 6年。2期まで。2020年改正前の任期は数えない
韓国の大統領　カ | 国民が直接 | 5年。再任できない
インドネシアの大統領　イ | 国民が直接 | 5年。再選は1回
ドイツの連邦大統領　ド | 連邦集会 | 5年。続けての再選は1回
中国の国家主席　中 | 全人代 | 5年。連続2期の制限は2018年に削除

The kana フ ロ カ イ ド 中 sit immediately to the right of those country names, in that same top-to-bottom order, like furigana, in teal. Only the words 再任できない in the Korea row are red. Every other word stays navy. Do not paint the whole Korea row red. Do not make a large banner that says 韓国は5年。

Right legend, top and large. Heading: フロカイ
Four lines under it:
フ＝フランス
ロ＝ロシア
カ＝韓国
イ＝インドネシア
Then one line: ＝国民が直接

Right legend, below that, smaller. Heading: ド連・中全
ド＝ドイツは連邦集会
中＝中国は全人代

One small guide at the bottom right, not covering the table, the red words, or the right legend.
ちゃちゃロット. Role label: 受験生（フロカイを見る）. One body only, green lecturer suit including trousers and shoes, white shirt, independent pale-sky-blue hat with two round side peaks, a low center, a long brim, and closed smiling eyes on the hat. Reference assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png. No nameplate. No other characters.

Bottom three cards.
判断軸: フロカイの4国は国民が直接。ドイツは連邦集会。中国は全人代。
ひっかけ: 試験で「韓国は再任できる」と書いてあったら×。試験で「中国は国民が直接選ぶ」と書いてあったら×。
暗記: フロカイは国民が直接。ド連は連邦集会。中全は全人代。

Do not print any brand name, account name, or app name. No second sheet.
```
