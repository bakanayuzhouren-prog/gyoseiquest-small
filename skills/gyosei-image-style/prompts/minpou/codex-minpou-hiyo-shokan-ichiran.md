# Codex用 — 費用償還請求の一覧

- 関連: LEC公開3・問34。占有者、留置権、質権、買戻し、使用貸借、賃貸借。イだけの使用貸借図は `shiyou-chin-taisho-2`。この枚が問34の一覧。

添付の表の行順・列のまま。1枚。左右パネルと底部3カードは使わない。字を縮めない。横長に押し込むときは、縦の1枚にする。

- 保存先: `assets/images/deepdive/learn/minnpou/hiyo-shokan-ichiran.png`
- 画像キー: `learn/minnpou/hiyo-shokan-ichiran`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法物権の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK

196条。占有者は、返還のときに必要費を回復者から償還させる。果実を取得したときは、通常の必要費は占有者の負担。有益費は、価格の増加が現存する限り、回復者の選択で、支出額または増価額。悪意の占有者には、回復者の請求で期限を許与できる。

299条。留置権者の必要費は、所有者に全額償還させる。果実のただし書はない。有益費は、増価が現存する限り、所有者の選択。期限の許与は、所有者の請求。悪意の占有者に限らない。

350条。296条から300条までを質権に準用する。費用償還は299条。選択者と期限の請求者は所有者。

357条。不動産質権者は、管理の費用を支払い、その他不動産に関する負担を負う。この行の注記。

583条2項。買主または転得者の費用は、売主が196条に従い償還する。有益費の期限許与は、売主の請求。必要費も有益費も含む。有益費だけではない。

595条。借主は通常の必要費を負担する。それ以外は583条2項を準用する。600条。費用の償還は、貸主が返還を受けた時から1年以内。

608条1項。賃貸人の負担に属する必要費は、直ちに請求できる。608条2項。有益費は、賃貸借終了の時に196条2項に従う。期限許与は賃貸人の請求。622条が600条を準用するので、必要費も有益費も、返還を受けた時から1年以内。

地上権の注記は、条文の準用ではない。修繕義務がなく、必要費の償還は特約がなければ認められない、と解されている。価値の客観的増加は、608条2項の類推と解されている。断定の条文にはしない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（注記を指す。表を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。指し棒は文字に重ねない |

表の中に人物を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは assets/images/characters/chachalot.png、skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は表と注記に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Portrait, one sheet. One table only. Do not shrink the type to fit a wide banner. Do not add side panels or three bottom cards. No characters inside the table.

Title: 費用償還請求に関する各規定

Three short lines above the table:
占有者の規定（196条）。必要費も有益費も、買戻しが準用し（583条2項）、使用貸借が準用する（595条）。
有益費だけ、賃貸借が準用する（608条2項）。
留置権の規定（299条）を、質権が準用する（350条）。

Table. Header row is a navy band. Columns: 誰の費用か / 必要費 / 有益費
Data rows alternate by whole row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Do not stripe by column. Do not paint the 有益費 column yellow.

Row 1 white: 占有者（196条） / 返還のときに全額請求できる。果実を取得したときは、通常の必要費は請求できない / 価格の増加が現存する場合に限り、回復者の選択に従い、支出した金額または増価額を請求できる。悪意の占有者には、裁判所は、回復者の請求により、期限を許与できる
Row 2 light gray: 留置権（299条） / 全額請求できる / 価格の増加が現存する場合に限り、所有者の選択に従い、支出した金額または増価額を請求できる。裁判所は、所有者の請求により、期限を許与できる
Row 3 white: 質権（350条） / 全額請求できる / 価格の増加が現存する場合に限り、所有者の選択に従い、支出した金額または増価額を請求できる。裁判所は、所有者の請求により、期限を許与できる
Row 4 light gray: 買戻し（583条2項） / 全額請求できる。果実を取得したときは、通常の必要費は請求できない / 価格の増加が現存する場合に限り、売主の選択に従い、支出した金額または増価額を請求できる。裁判所は、売主の請求により、期限を許与できる
Row 5 white: 使用貸借（595条、600条） / 通常の必要費は請求できない。それ以外は全額請求できる。返還を受けた時から1年以内 / 価格の増加が現存する場合に限り、貸主の選択に従い、支出した金額または増価額を請求できる。返還を受けた時から1年以内。裁判所は、貸主の請求により、期限を許与できる
Row 6 light gray: 賃貸借（608条、622条、600条） / 賃貸人の負担に属する必要費は、直ちに全額請求できる。返還を受けた時から1年以内 / 賃貸借終了の時に、価格の増加が現存する場合に限り、賃貸人の選択に従い、支出した金額または増価額を請求できる。返還を受けた時から1年以内。裁判所は、賃貸人の請求により、期限を許与できる

Footnote under the table, two short paragraphs:
不動産質権者は、管理の費用を支払い、その他不動産に関する負担を負う（357条）。
地上権は、土地所有者が地上権者に土地の修繕義務を負わない、と解されている。特約がなければ、必要費の償還請求は認められない、と解されている。工事等で土地の価値が客観的に増加したときは、地上権者は土地所有者に費用の償還を請求できる、と解されている（608条2項の類推）。

One ちゃちゃロット only, bottom-right cream margin. No speech bubble. The pointer stays outside the footnote. Do not print any brand name, account name, or app name.
```
