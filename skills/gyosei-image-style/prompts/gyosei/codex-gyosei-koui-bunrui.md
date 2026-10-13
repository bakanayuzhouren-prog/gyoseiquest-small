# 許可と特許、どっち？

- 保存先: `assets/images/deepdive/learn/gyosei/gyosei-koui-bunrui.png`
- 画像キー: `learn/gyosei/gyosei-koui-bunrui`
- 関連: `data/knowledge/canonical/gyosei-koui-bunrui.md`。合格革命第1回・問10。TAC第2回の行政行為の分類も同じ図。

生成はてらしぃが Codex に「画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

確認日 2026-10-13。分類は学説の整理。建築確認の裁量の狭さは、法令に適合すれば確認する建付け。農地の権利移動は、名前が許可でも中身は認可、が試験の定番。

- 法律行為的行政行為は、行政庁の意思表示で効果を発生させる。命令的と形成的に分ける。
- 命令的は四つ。下命は作為を命じる。禁止は不作為を命じる。許可は一般的禁止を解き、自由を戻す。免除は作為義務を解く。
- 許可は新しい権利の設定ではない。運転免許は伝統的に許可。裁量は狭い。
- 形成的は三つ。特許は新しい権利か地位を設定する。裁量が出やすい。認可は私人の行為を補充して効力を完成させる。裁量は狭い。代理は他人に代わって法律行為をする。
- 準法律行為的行政行為は、観念の表示。確認、公証、通知、受理。通説では附款を付けない。
- 確認は存否を公に確定する。新しい権利の設定でも、広い政策裁量でもない。建築確認は分類上は確認。処分性はある。
- 名前が許可でも、中身は認可や特許があり得る。農地の権利移動は認可。
- 書かない: 問題文の全文。講義の括弧書きの転載。ブランド名。キャラ。底部の判断軸カード。

## 見せ方

表が本体。左から列を読む。同じ文をタイトルと表とフッターで繰り返さない。案内役は置かない。底部3カードは置かない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 許可と特許、どっち？ |
| 中央 | 分類表。法律行為的と準法律行為的 |
| 1行 | 名前が許可でも、中身は認可や特許があり得る |
| キャラ | なし |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: how to tell administrative acts apart.
Learning goal: 許可は自由を戻す。特許は新しい地位を設定する。確認は存否の確定で、広い政策裁量ではない。

A single comparison table. Warm off-white background. Large gothic Japanese. Portrait, about 3:4, so the rows stay large. Wide margins.
No left panel, no right panel, no bottom cards, no mascot, no people, no documents, no icons.

Title, one short question: 許可と特許、どっち？

Table columns, navy header, white text: 行為 / 効果 / 試験で切る点

Then a full-width band, not a data row: 法律行為的（意思表示）
Under it, a thinner band: 命令的
Then four data rows. Row backgrounds alternate by row, white then light gray, starting with white. Not by column.
下命 / 作為を命じる / 違法建築物の除却
禁止 / 不作為を命じる / 営業の禁止
許可 / 一般的禁止を解き、自由を戻す / 営業許可。運転免許は伝統的に許可。裁量は狭い
免除 / 作為義務を解く / 納税の免除

Thinner band: 形成的
Then three data rows, continue the same white and light gray alternation.
特許 / 新しい権利か地位を設定する / 鉱業権。裁量が出やすい
認可 / 私人の行為を補充して完成させる / 農地の権利移動。名前は許可でもこちら。裁量は狭い
代理 / 他人に代わって法律行為をする / 私人の名義の行為を代わってする

Full-width band: 準法律行為的（観念の表示）
Then four data rows, same alternation.
確認 / 存否を公に確定する / 建築確認。新しい権利ではない。裁量は原則ない
公証 / 存在を公に証明する / 登記。戸籍
通知 / 特定の事項を知らせる / 納税の督促
受理 / 相手方の行為を有効として受け取る / 申請を受け付ける

One line under the table, not a repeat of the title or of every row: 名前が許可でも、中身は認可や特許があり得る

Do not write that 確認 sets a new right.
Do not write that 許可 creates a new right.
Do not write that 認可 is only a notice of facts.
Do not write that 下命 completes a private legal act.
Do not print any brand name.
```
