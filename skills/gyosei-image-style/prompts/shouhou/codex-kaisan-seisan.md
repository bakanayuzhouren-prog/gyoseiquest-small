# 株式会社｜解散事由と清算

てらしぃ依頼: LEC市販2 問40の2カードを1図にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/shouhou/kaisan-seisan.png`
配置: 見て聞いて覚える・商法・会社法「株式会社の解散事由は…」と「合併又は破産手続終了による解散では…」の先頭。

## スロット（新キャラはここだけ差し替え）

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 継続側 | いい役 | 471条1号から3号で継続できると示す者 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` |
| 人格消滅 | 悪い役 | 解散したら直ちに人格が消滅すると主張する者 | すべとん | `subeton_sheet.png` |
| 人数ひっかけ | 悪い役 | 清算人は必ず3人、人数の根拠は478条だと主張する者 | プリンセスカチャドクロ | `princess_kachadokuro.png` ＋ `princess_kachadokuro_sheet.png` |

用語を混ぜない。473条は「継続」。476条は「清算の目的の範囲内において存続するものとみなす」。

## 法律（原典・e-Gov）

- 471条: 解散事由は、存続期間の満了、定款で定めた事由の発生、株主総会の決議、合併、破産手続開始の決定、解散を命ずる裁判。
- 473条: 継続できるのは471条1号から3号（満了、定款所定の事由、株主総会の決議）。472条1項のみなし解散を含む。清算結了まで。みなし解散は解散後3年以内に限る。継続の決議は特別決議（309条2項11号）。満了と定款事由だけ、ではない。
- 475条: 株式会社は、次の場合に清算をしなければならない。1号は解散した場合。ただし471条4号（合併）による解散と、破産手続開始の決定により解散した場合であって当該破産手続が終了していない場合は除く。2号は設立の無効の訴えに係る請求を認容する判決が確定した場合。3号は株式移転の無効の訴えに係る請求を認容する判決が確定した場合。合併の無効は475条の清算開始原因ではない（843条の効力の話であり、設立無効・株式移転無効と混ぜない）。
- 476条: 清算株式会社は、清算の目的の範囲内において、清算の結了まで存続するものとみなす。
- 477条1項: 清算株式会社には、1人又は2人以上の清算人を置かなければならない。人数の根拠は477条。
- 478条: 清算人となる者。定款で定める者又は株主総会で選任された者がなければ、取締役が清算人となる。人数の条文ではない。

図に出す表は2つ。列の意味を混ぜない。

表A（473条・継続）

| 解散の場面 | 473条の継続 |
|---|---|
| 満了・定款事由・株主総会の決議 | 清算結了まで特別決議で継続可 |
| みなし解散（472条1項） | 解散後3年以内に限り継続可 |
| 合併・破産手続開始・解散を命ずる裁判 | 473条の継続対象外 |

表B（475条・清算の要否）

| 場面 | 清算 |
|---|---|
| 合併による解散（471条4号）・破産手続未了 | 不要（475条1号ただし書） |
| 設立の無効確定 | 要（475条2号） |
| 株式移転の無効確定 | 要（475条3号） |

## PRE-GENERATE-CHECK

- 左パネル＝471条の6事由と473条の継続。右パネル＝475・476・477・478。左に清算人の人数を書かない。
- 表Aは継続だけ。表Bは清算の要否だけ。473の継続を「清算」列に入れない。
- 暗記帯は「471の6事由。473の継続は1号から3号。人数は477条。就任は478条。476は清算の範囲で存続」。
- 表Bと右Q&Aに「合併の無効確定→清算を要する」を書かない。設立無効と株式移転無効だけを475条2号・3号とする。
- GPT本文で「満了と定款だけ継続可」「人数は478条」「継続＝476の存続」「合併無効＝475条の清算開始」と書かない。
- 口語なし。スロットどおり。ちゃちゃロット1体。表は行ゼブラ。```text``` にブランド名なし。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `task_turtle.png` ＋ `task_turtle_sheet.png` ＋ `subeton_sheet.png` ＋ `princess_kachadokuro.png` ＋ `princess_kachadokuro_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「株式会社｜解散・継続と清算」
Small chip:「473条は継続。476条は清算の範囲での存続」

LEFT panel, heading:「論点（解散・継続）」
Do not mention 清算人 or 477条 or 478条 in this panel.
Role under a small face: 471条1号から3号で継続できると示す者
Match タスク亀: task_turtle.png and task_turtle_sheet.png. Good side.
Q&A only:
解散事由はいくつ？ → 6（471条）
6つは → 満了・定款事由・総会決議・合併・破産開始・解散を命ずる裁判
473条の継続対象は？ → 471条1号から3号（満了・定款事由・総会決議）
みなし解散は？ → 含む（解散後3年以内）
継続の決議は？ → 特別決議（309条2項11号）
解散したら直ちに人格消滅？ → NO

RIGHT panel, heading:「論点（清算）」
Do not list all six解散事由 in this panel. Do not write 継続対象 here.
Role under a small face: 清算人は必ず3人、人数の根拠は478条だと主張する者
Match プリンセスカチャドクロ: princess_kachadokuro.png and princess_kachadokuro_sheet.png. Bad side.
Q&A only:
合併による解散・破産手続未了は清算？ → NO（475条1号ただし書）
設立の無効確定は清算？ → YES（475条2号）
株式移転の無効確定は清算？ → YES（475条3号）
合併の無効確定は475条の清算開始原因か？ → NO
清算中の人格は？ → 清算の目的の範囲で存続（476条）
清算人の人数は？ → 1人又は2人以上（477条1項）
誰が就く？ → 原則は取締役（478条）
人数の根拠は478条？ → NO
必ず3人？ → NO

CENTER: company building labeled 株式会社
タスク亀. Good side. Role: 471条1号から3号で継続できると示す者
すべとん with a stamp「直ちに人格消滅」and a red ×. Match subeton_sheet.png. Bad side. Role: 解散したら直ちに人格が消滅すると主張する者
Caption:「継続は471条1号から3号。人数は477条。478条は就任。476条は清算の範囲で存続」

TWO SMALL TABLES under the caption. Each has a navy header. Zebra by ROW. Never column zebra.

TABLE A title:「473条の継続」
列: 解散の場面｜473条の継続
行1 white: 満了・定款事由・株主総会の決議｜清算結了まで特別決議で継続可
行2 light gray: みなし解散（472条1項）｜解散後3年以内に限り継続可
行3 white: 合併・破産手続開始・解散を命ずる裁判｜473条の継続対象外

TABLE B title:「475条の清算」
列: 場面｜清算
行1 white: 合併による解散（471条4号）・破産手続未了｜不要（1号ただし書）
行2 light gray: 設立の無効確定｜要（2号）
行3 white: 株式移転の無効確定｜要（3号）
Do not write 合併の無効確定 in this table.

BOTTOM strip, three cards:
判断軸「6事由。473条の継続は1号から3号。合併解散・破産手続未了は清算不要。設立無効と株式移転無効は清算要。合併無効は475条に挙げない」
ひっかけ「直ちに人格消滅／継続は満了と定款だけ／継続は普通決議／設立無効は清算不要／合併無効確定も475条で清算要／清算人は必ず3人／人数の根拠は478条」
暗記「471の6事由。473の継続は1号から3号。475条2号は設立無効、3号は株式移転無効。合併無効は混ぜない。人数は477条。就任は478条」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, tables, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```
