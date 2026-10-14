# Codex用 — 刑事裁判で、行政行為の違法は言えるか

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/keiji-koteiryoku-4koma.png`
- 画像キー: `learn/gyosei/keiji-koteiryoku-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 行政法総論の公定力。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: LEC市販第2回・問9・肢4。余目町（最判昭53.6.16）。

## 法律（崩すな）

最判昭30.12.26。違法でも、重大かつ明白な瑕疵で当然無効と認めるべき場合を除き、権限ある機関が適法に取り消すまでは効力を有する。これは公定力の一般命題。

最二小判昭53.6.16（刑集32巻4号605頁）。余目町の児童遊園設置認可。主たる動機・目的は、浴場営業の規制。その認可は行政権の濫用に相当する違法があり、浴場営業を規制する効力を有しない。取消判決を先に取らなくても、刑事裁判でその違法を前提に処罰されない。

「刑事訴訟では、行政行為の違法を前提とする主張はできない」という絶対の書き方は、この判決と反対。試験でそう書いてあったら×。

最決昭63.10.28は別事案。免許停止の当時、処分庁が相当な根拠のある資料で傷害を認めていたとき、その後の刑事裁判で傷害の証明がないとされても、その免許停止は当然には無効にならない。フッターに1行だけ置く。4コマの結論を、この決定でひっくり返さない。

書かないこと。余目町の認可が有効だった、と書くこと。刑事では行政行為の違法を一切主張できない、と結論に書くこと。問題文の全文。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 認可する側 | 悪い役 | 余目町（浴場営業の規制を主たる目的に、児童遊園の設置を認可したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 被告 | いい役 | 被告（刑事裁判で、その認可の違法を言いたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマと3コマ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

4コマにはキャラを置かない。過去の辻さんと代さんは置かない。タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one row, left to right, then a short footer. No comparison table. No left-right debate panels.

Title: 刑事裁判で、行政行為の違法は言えるか
Subtitle: 余目町。最判昭和53年6月16日

Panel 1 title: 児童遊園の認可
カチャドクロ holds a permit labeled 児童遊園の設置認可. Caption: 余目町の認可。主たる動機・目的は、浴場営業の規制。
Label under カチャドクロ: 余目町（浴場営業を規制したい）.

Panel 2 title: 刑事で起訴された
ぴっちゅ stands in a simple courtroom. Caption: その営業をした者が、浴場営業を規制する法令違反で起訴された。
Label under ぴっちゅ: 被告（処罰されたくない）.

Panel 3 title: 被告の主張
ぴっちゅ points at the permit, which now has a red mark. Caption: この認可は、行政権の濫用で違法だ。取消判決を先に取っていなくても、刑事裁判でそう言える。
Label under ぴっちゅ: 被告（認可の違法を言いたい）.

Panel 4 title: 判決
No character. Caption: その認可は、行政権の濫用に相当する違法があり、浴場営業を規制する効力を有しない。その違法を前提に、処罰されない。
Small line: 試験で「刑事訴訟では、行政行為の違法を前提とする主張はできない」と書いてあったら×。

Footer, two short lines:
公定力の一般命題は、違法でも、重大かつ明白な無効を除き、権限ある機関が取り消すまで効力を有する（最判昭和30年12月26日）。刑事のこの事案には、そのまま及ばない。
別事案。免許停止のあと、刑事で傷害の証明がないとされても、その免許停止は当然には無効にならない（最決昭和63年10月28日）。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the panels. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 試験で書くのは、余目町型では、取消判決の前でも、刑事で違法を主張できる。

Do not print any brand name, account name, or app name. Do not cover the captions or the footer with characters or the pointer.
```
