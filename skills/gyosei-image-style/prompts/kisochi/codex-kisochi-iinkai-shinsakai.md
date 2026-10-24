# 個人情報保護委員会と審査会

表が本体。4行。委員会は監視と監督。審査会は審査請求の調査審議。裁決はしない。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/kisochi/iinkai-shinsakai.png`
- 画像キー: `learn/kisochi/iinkai-shinsakai`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/learn/kisochi/iinkai-shigoto.png`
- 関連: 個人情報保護法130条、132条、133条、134条、148条、156条から159条、105条1項。情報公開・個人情報保護審査会設置法2条、3条、6条。正本は `data/knowledge/canonical/kojinjoho-iinkai-shozoku.md`。

## PRE-GENERATE-CHECK

確認日 2026-10-22。e-Gov。見本は `genkoku-nashi.png`。横長。

- 個人情報保護委員会は、内閣府設置法49条3項に基づき置く。内閣総理大臣の所轄。内閣府の外局。総務省の外局ではない。130条、133条。委員長と委員8人。独立して職権を行う。134条。
- 仕事は、民間事業者の監督、行政機関等の監視、苦情のあっせんを含む。132条。事業者には勧告と命令がある。148条。行政機関の長には指導、助言、勧告がある。命令の規定はない。156条から159条。
- 情報公開・個人情報保護審査会は、総務省に置く。委員15人。事件の調査審議は、原則として審査会が指名する委員3人の合議体。審査会が定める場合は、委員全員の合議体。設置法6条。情報公開法と個人情報保護法105条1項の諮問を受け、審査請求を調査審議する。答申まで。裁決をするのは、諮問した行政機関の長等である。
- 審査会は、個人情報保護委員会ではない。委員会は、開示等の審査請求を裁決しない。

書かない。審査会を内閣府に置くこと。委員会を総務省に置くこと。行政機関の長への命令がある、と書くこと。審査会が裁決する、と書くこと。合議体を3人だけと書くこと。番号の生成。ブランド名。左右の欄。底部の3枚。ちゃちゃロットを消すこと。文字を縮めること。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと余白: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table is the whole figure. No side panels. No bottom cards. Wrap text inside cells. Do not shrink type to force one line.
Title, one short label: 個人情報保護委員会と審査会
Header, navy: 重要ワード | 個人情報保護委員会 | 情報公開・個人情報保護審査会
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Rows:
置き場所 | 内閣府。内閣総理大臣の所轄 | 総務省
仕事 | 民間事業者の監督、行政機関等の監視、苦情のあっせん | 諮問を受けて、審査請求を調査審議する
人数 | 委員長と委員8人。独立して職権を行う | 委員15人。原則は指名された委員3人の合議体。審査会が定める場合は委員全員（6条）
終わり方 | 事業者には勧告と命令がある。行政機関の長への命令はない | 答申まで。裁決をするのは、諮問した行政機関の長等
Under the table, one line only:
試験で「個人情報保護委員会が、開示等の審査請求を裁決する」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```
