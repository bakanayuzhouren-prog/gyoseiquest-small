# Codex用 — 都有行政財産の使用許可の取消。補償は出る？

4コマを横一列。各コマの説明は一つの要点だけ。人物の役割ラベルは、その人物の最初の登場時だけ。2コマ目でラベルを繰り返さない。左右パネルと中央表は使わない。市場の外の空き地の賃貸、進駐軍の接収、外交は描かない。借地の確認事件として描かない。特別の事情を、取消しの条件として書かない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/kokubai-shiyo-kyoka-4koma.png`
- 画像キー: `learn/gyosei/kokubai-shiyo-kyoka-4koma`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 関連: 最判昭49.2.5（最三小、民集28巻1号1頁、昭和44年（オ）第628号）。正本は `data/knowledge/canonical/shiyo-kyoka-kyohi-wakegata.md`。

## 法律（最判昭49.2.5）

裁判所の事件名は、借地権確認土地引渡等請求事件。判示事項は、都有行政財産である土地についての使用許可の取消と損失補償。絵の見出しは判示事項にする。事件名を絵に出すと、借地権の確認事件に見える。事件名は、この確認欄だけに置く。通称は作らない。

東京都が、築地の中央卸売市場の指定区域内の都有行政財産を、私人に期間の定めなく使用許可した。目的は、建物を所有して飲食店等を営むこと。私法上の賃貸借ではない。根拠は、当時の東京市条例昭和9年37号の中央卸売市場業務規程。

昭和32年の取消の理由は、入荷が急増し、市場が自らその土地を使わなければ混雑を防げなくなったこと、および私人の使用が不必要または不適切と認められたことである。私人の必要がなくなったからではない。

当事者の言い分は両方書く。私人は、使用権を失った補償を求める。東京都は、使用権は市場本来の必要で消えると主張する。争点は、その必要で使用権が消えたとき、使用権の喪失に補償が要るかである。てらしぃの誤答「特別の事情がなければ取り消せない」を、3コマの争点にしない。それはフッターの試験の×だけにする。

使用権は、行政財産本来の用途または目的上の必要が生じれば消える制約を内在して与えられている。その必要で将来に向かって取り消され、使用権を失ったこと自体は、特別の事情のない限り補償を求められない。補償の類推の根拠は、当時の国有財産法19条・24条である。絵の本文には条番号を足さない。足すと、例外の中身が小さくなる。

特別の事情は、補償側の例外である。絵に残す文言は、対価を支払い、使用収益で償却し終わる前に必要が生じた場合と、許可時の別段の定め。短縮して「対価を回収し終わる前」としない。整地の費用の一事、建物を建てたことだけでは足りない。これは確認欄だけに置き、4コマの本文には足さない。市場が土地を必要にしたこと自体は、特別の事情ではない。

高裁は、使用権を借地権と同一視することはできないが、極めて相似するとして、更地価格の6割の補償を認めた。最高裁は、その敗訴部分を破棄して差し戻した。絵に「借地と同じ」とは書かない。

書かない。進駐軍。外交。市場の外の空き地。必要なくなったから撤回。特別の事情がなければ都は取り消せない、を正しいルールとして書くこと。移転費まで補償しないと確定した、と書くこと。ブランド名。案内役を本文の上に置くこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 許可した側 | いい役 | 東京都（許可を取り消したい） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `pitchi_sheet.png` | ラベルは1コマだけ。2コマは吹き出しのみ |
| 補償を求める側 | 悪い役 | 私人（補償を求めたい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | ラベルは1コマだけ。2コマは吹き出しのみ |
| 裁判所 | いい役 | 裁判所（補償の要否を分けたい） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ。ラベルはこの初出だけ |
| 案内 | いい役 | 案内（試験の×を指す。せりふは足さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの下の余白。1体。緑の講師スーツ |

名簿外は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row, then one short footer line. No second row of panels. No comparison table. No side panels. Wrap caption text. Do not shrink type to force one line. No brand name, account name, or watermark.

Each panel has two zones with a clear empty gap. Upper zone: a small picture and, where specified, one short speech bubble. Lower zone: one caption only, one point. Characters and speech bubbles stay in the upper zone. Role labels appear only the first time that character appears. Do not repeat a role label in a later panel. No words on the props. Illustrations stay small. A few market crates are enough. No soldiers, no flags, no city map, no crowd. Do not draw a lease contract or the words 借地. Large type. Do not shrink type. If a caption wraps, keep the same type size.

Title: 都有行政財産の使用許可の取消。補償は出る？
Subtitle, one line: 最判昭49.2.5

Panel 1 title: まず何が起きた
Upper zone: inside a wholesale market, crates are piled high. ぴっちゅ holds a cancellation notice. カチャドクロ stands on that land. Label under ぴっちゅ, this panel only: 東京都（許可を取り消したい）. Label under カチャドクロ, this panel only: 私人（補償を求めたい）. No speech bubble in this panel.
Caption, one point only: 荷物が急増し、市場が自ら使わないと混雑を防げなくなったので、東京都は使用許可を将来に向かって取り消した。

Panel 2 title: 当事者の言い分
Both characters again, with no role labels. カチャドクロ speech bubble: 補償を求めたい。
ぴっちゅ speech bubble: 市場の必要で消える。
Caption, one point only: 高裁は、更地価格の6割の補償を認めた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone and does not cover the question. Label under タスク亀, this first appearance only: 裁判所（補償の要否を分けたい）
Speech bubble: 使用権の喪失に、補償は要る？
Caption, one point only: 特別の事情のない限り、要らない。

Panel 4 title: 判決の着地
No scene character inside this panel. Caption, one point only: 最高裁は、特別の事情を補償側の例外とした。対価を支払い、使用収益で償却し終わる前に必要が生じた場合と、許可時の別段の定め。

Footer, one line under the four panels: 試験で「特別の事情がなければ、都は許可を取り消せない」と書いてあったら×。

ちゃちゃロット is one mascot only, in the bottom margin beside the footer, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward the footer line. No speech balloon. Do not cover the footer or the panel captions. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover captions with characters or the pointer.
```
