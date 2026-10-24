# 訴えの利益は、取消しで戻る利益？

表が本体。判断の軸は、取消しによって回復すべき法律上の利益。損害賠償や名誉回復が残ることだけで、取消訴訟の利益も残る、とは書かない。

- 状態: 上書き生成
- 上書き対象: `assets/images/deepdive/learn/gyosho/utae-no-rieki.png`
- 保存先: `assets/images/deepdive/learn/gyosho/utae-no-rieki.png`
- 画像キー: `learn/gyosho/utae-no-rieki`
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-22。行政事件訴訟法9条1項括弧書き。最判昭40.4.28。最判昭43.12.24。最判平21.11.26。

- 軸は、判決の時に、取消しによって回復すべき法律上の利益があるか。効果が期間の経過その他の理由でなくなった後も、その利益を有する者は取消訴訟を提起できる。
- 最判昭40.4.28は、免職取消の係属中に公職へ立候補して失職しても、違法な免職がなければあった給料請求その他の利益が取消しで戻るときは、訴えの利益が残る。損害賠償ができること一般ではない。
- 最判昭43.12.24は、免許の期間が満了したあとも再免許がされ事業が続くときは、完全に失効したのと同じに扱って利益を否定しない。
- 最判平21.11.26は、原告に係る保育の実施期間が全部満了したあとは、回復すべき地位がないので、訴えの利益は失われる。期間満了で常に残る、でも常に消える、でもない。
- 原状に戻せないことだけで、回復すべき法律上の利益が直ちになくなるわけではない。

書かない。損害賠償や名誉回復が残るだけで、取消訴訟の利益も残る。列名「何を見るか」「見るもの」「結論」。期間が満了すれば常に利益がない。原状に戻せなければ常に利益がない。訴えの利益と処分性、訴えの利益と原告適格を同じにする。ブランド名。左右の欄。底部の3枚。ちゃちゃロットを消すこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと余白: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table is the whole figure. No side panels. No bottom cards.
Title, one short label: 訴えの利益（取消しで戻る利益）
Header, navy: 重要ワード | 判断の軸
Data rows alternate by row. Row 1 white, row 2 light gray, then continue. Not by column. Wrap text inside cells. Do not shrink type to force one line.
Rows:
処分性 | その行為が、抗告訴訟の対象になるか
原告適格 | その人が、法令が個別に保護する利益を有するか
訴えの利益 | 判決の時に、取消しによって回復すべき法律上の利益があるか
期間が満了したあと | 効果が消えても、取消しによって回復すべき法律上の利益がなおあるか
原状に戻せないとき | 原状に戻せないことだけで、その利益が直ちになくなるわけではない
Under the table, one line only:
試験で「損害賠償や名誉回復が残るだけで、取消訴訟の利益も残る」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the lines under the table.
Do not print any brand name, account name, or app name.
```
