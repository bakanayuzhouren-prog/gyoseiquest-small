関連: 憲法29条3項の正当な補償。農地改革は最大判昭28.12.23。土地収用は土地収用法71条、最判昭48.10.18。

# 農地と収用の補償

二つだけ。農地改革の「合理的に算出された相当な額」と、土地収用の「相当な価格」。見本は `genkoku-nashi.png`。横長3:2。2行。ちゃちゃロットは下余白に1体。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosho/nochi-shuyo-hosho.png`
- 画像キー: `learn/gyosho/nochi-shuyo-hosho`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` を付けない。
- 上書きしない: `genkoku-nashi.png`

## PRE-GENERATE-CHECK

確認日 2026-10-22。正本は `data/knowledge/canonical/kenchiku-seigen-shinsyaku.md` と土地収用法71条。

- 憲法29条3項の正当な補償は、この二つに分かれる。常に同じ額、ではない。
- 農地改革。正当な補償は、その当時の経済状態で成立すると考えられる価格に基づき、合理的に算出された相当な額。時価と完全に一致しなくてよい（最大判昭28.12.23）。
- 土地収用。相当な価格は完全補償。近傍類地の取引価格等を考慮して算定した、事業の認定の告示の時の価格に、権利取得裁決の時までの物価変動の修正率を乗じた額（71条）。同等の土地を買い直せる時価（最判昭48.10.18）。
- 土地収用法も「相当」と書く。農地改革の相当な額ではない。

書かない。手数料。建築確認。建築制限。国家賠償。文化財。3行目。結論列に「ない」。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（収用の行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 2 data rows. No side panels. No bottom cards. No answer bar.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short label: 農地と収用の補償
Header, navy: どの場面か | 結論 | 額の中身
Data rows alternate by row. Row 1 white. Row 2 light gray. Not by column.
Row 1: 農地改革（最大判昭28.12.23） | 相当 | 合理的に算出された相当な額。その当時の経済状態で成立すると考えられる価格。時価と完全に一致しなくてよい。
Row 2: 土地収用（土地収用法71条。最判昭48.10.18） | 完全 | 相当な価格。近傍類地の取引価格等を考慮した、事業認定の告示の時の価格に、権利取得裁決までの物価変動を乗じた額。同等の土地を買い直せる時価。
The middle column is only the two words 相当 and 完全. Do not write ない in that column.
Under the table, one line only: 試験で「土地収用の相当な価格は、合理的に算出された相当な額でよい」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the land-expropriation row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 2行だけ。農地は相当。収用は完全
- [ ] 農地の額は、合理的に算出された相当な額。時価と完全に一致しなくてよい
- [ ] 収用の額は、相当な価格。告示の時の近傍類地の価格に、裁決までの物価変動を乗じる。買い直せる時価
- [ ] 結論列に「ない」がない。試験の×は1行。文字は縮んでいない
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし
