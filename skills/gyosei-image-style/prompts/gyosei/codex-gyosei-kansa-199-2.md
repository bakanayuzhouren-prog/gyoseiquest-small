# Codex用 — 監査委員は、どちらの事務も監査できる？

上にできる条件、中央に自治事務と法定受託事務の2列、下に共通の結論。財務監査と住民監査請求は置かない。労働委員会と収用委員会の事務を、全部除外とは書かない。

- 保存先: `assets/images/deepdive/learn/gyosei/kansa-199-2.png`
- 画像キー: `learn/gyosei/kansa-199-2`
- 生成は Codex。Cursor は描かない。PNGとアプリは、このプロンプトでは触らない。`[[image:]]` は付けない。

## PRE-GENERATE-CHECK（地方自治法199条2項、施行令140条の5、121条の4）

e-Gov の趣旨と、総務省の監査の整理、施行令の掲載文を照合。2026-10-20。

**199条2項** 監査委員は、必要があると認めるときは、普通地方公共団体の事務の執行を監査できる。括弧の中で、自治事務と法定受託事務は、それぞれ政令で定める事務を除く。

**自治事務の除外** 施行令140条の5第1項が121条の4第1項を準用する。除くのは、労働組合法による労働争議のあっせん、調停、仲裁その他労働委員会の権限に属する事務（組織に関する事務及び庶務を除く）、および土地収用法による収用の裁決その他収用委員会の権限に属する事務（組織に関する事務及び庶務を除く）。組織に関する事務と庶務は、監査の対象に残る。

**法定受託事務の除外** 140条の5第2項が121条の4第2項を準用し、「検査」を「監査」と読み替える。除くのは、監査に際して開示をすることにより国の安全を害するおそれがある部分、同じく開示をすることにより個人の秘密を害することとなる部分、および収用の裁決その他収用委員会の権限に属する事務。開示の条件は、国の安全と個人の秘密にだけかかる。収用委員会の権限に属する事務には、この条件を付けない。労働委員会の事務は、この項の除外に入らない。

**書かない:** 199条1項の財務に関する事務の執行と経営事業の管理。199条4項・5項の定期監査と随時監査。242条の住民監査請求。労働委員会の事務を全部除外。収用委員会の事務を全部除外。自治事務側で、組織に関する事務と庶務まで除外。法定受託事務の除外に労働委員会を入れる。国の安全と個人の秘密を、監査の際の開示という条件なしで除外する。この開示の条件を、収用委員会の権限に属する事務にまでかける。ブランド名。案内役。底部の判断軸・ひっかけ・暗記。同じ文の繰り返し。

## 配役

置かない。2列で足りる。

## 印字してよい文字

- タイトル: `監査委員は、どちらの事務も監査できる？`
- 上: `必要があると認めるとき、事務の執行を監査できる（地方自治法199条2項）`
- 左の列名: `自治事務`
- 左: `政令で除くのは、労働争議のあっせん、調停、仲裁と、収用の裁決など`
- 左: `組織に関する事務と庶務は、監査の対象に残る`
- 右の列名: `法定受託事務`
- 右: `監査の際に開示することにより、国の安全を害するおそれがある部分と、個人の秘密を害する部分を除く`
- 右: `収用委員会の権限に属する事務も除く。労働委員会の事務は、ここでは除かない`
- 下: `どちらも監査できるが、政令で定める事務は除外`

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: whether an audit commissioner can audit both kinds of local affairs, and which cabinet-order affairs are left out.
Warm off-white, 16:9, thick outlines, large gothic Japanese, wide gaps. No people. No mascot. No bottom cards. No brand name, account name, or watermark.

Title, one line:「監査委員は、どちらの事務も監査できる？」
One line under the title:「必要があると認めるとき、事務の執行を監査できる（地方自治法199条2項）」

Center: exactly two columns, side by side. Navy header on each column. The body of each column is white. Do not use a column zebra. Do not add a third column.

Left header:「自治事務」
Left body, two lines:
「政令で除くのは、労働争議のあっせん、調停、仲裁と、収用の裁決など」
「組織に関する事務と庶務は、監査の対象に残る」

Right header:「法定受託事務」
Right body, two lines:
「監査の際に開示することにより、国の安全を害するおそれがある部分と、個人の秘密を害する部分を除く」
「収用委員会の権限に属する事務も除く。労働委員会の事務は、ここでは除かない」

One line under the two columns:「どちらも監査できるが、政令で定める事務は除外」

Do not print a sentence that the affairs of a labor relations commission are entirely excluded. Do not print a sentence that the affairs of an expropriation committee are entirely excluded. Do not add financial audit, periodic audit, or a resident audit request.
```
