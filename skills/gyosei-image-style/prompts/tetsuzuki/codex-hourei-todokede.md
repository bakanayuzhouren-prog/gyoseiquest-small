# 行手法｜法令の定義と届出

てらしぃ依頼: 合格革命の法令定義カードと届出カードを1図にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/tetsuzuki/hourei-todokede.png`
配置: 見て聞いて覚える「法令には法律・命令…」および届出カードのもっと深掘る先頭。

## スロット（新キャラはここだけ差し替え）

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 正しい定義 | いい役 | 法令に条例・規則が入ると示す者 | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 条例除外 | 悪い役 | 条例は法令に入らないと主張する者 | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 諾否ひっかけ | 悪い役 | 届出にも諾否があると主張する者 | すべとん | `subeton_sheet.png` |

## 法律（原典・e-Gov）

- 2条1号: 「法令」とは、法律、法律に基づく命令（告示を含む。）、条例及び地方公共団体の執行機関の規則（規程を含む。）をいう。
- 3条3項: 地方公共団体の機関がする処分（その根拠となる規定が条例又は規則に置かれているものに限る。）及び行政指導、地方公共団体の機関に対する届出（前条第七号の通知の根拠となる規定が条例又は規則に置かれているものに限る。）並びに地方公共団体の機関が命令等を定める行為については、次章から第六章までの規定は適用しない。
  - 「条例又は規則に限る」は処分と届出の括弧だけ。行政指導には掛かからない。
  - 地方の機関がする行政指導は、根拠が法律でも第2章から第6章が外れる。
  - 地方が法律根拠でする処分は、3条3項では外れない（行手法が乗る）。
- 2条7号: 届出は、行政庁に対し一定の事項の通知をする行為（申請を除く。）。法令により直接に当該通知が義務付けられているもの。自己の期待する一定の法律上の効果を発生させるためには当該通知をすべきこととされているものを含む。
- 37条: 届出が法令に定められた形式上の要件に適合する場合、提出先の事務所に到達したときに、当該届出をすべき手続上の義務が履行されたものとする。諾否の応答はない。到達だけでは足りず、形式上の要件に適合することが前提である。

図に出す切り分け（表と暗記で同じ文言）:

| 行為 | 第2章から第6章が外れる条件 |
|---|---|
| 地方の機関がする処分 | 根拠が条例又は規則に限る |
| 地方の機関がする行政指導 | 根拠を問わず外れる |
| 地方の機関に対する届出 | 根拠が条例又は規則に限る |

## PRE-GENERATE-CHECK

- 左パネル＝2条1号の定義と3条3項の切り分け。右パネル＝2条7号と37条。混ぜない。
- 表の3行は上表と同一。行背面は白／薄いグレー／白。列ゼブラにしない。
- 暗記帯は「法令に条例・規則は入る。処分・届出の除外は条例・規則根拠。地方の指導は根拠を問わず除外。届出は形式上適合し、提出先の事務所に到達したときに履行」。
- すべとんの役割は右パネル・中央とも「届出にも諾否があると主張する者」。指導の誤主張はカチャドクロ側に置かない。
- GPT本文・キャプション・ひっかけに「条例根拠の指導だけ除外」「地方の指導にも全面適用」を正しいルールとして書かない。
- 口語なし。スロットどおり。ちゃちゃロット1体。```text``` にブランド名なし。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `pitchi.png` ＋ `pitchi_sheet.png` ＋ `kachadokuro.png` ＋ `kachadokuro_sheet.png` ＋ `subeton_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「行手法｜法令の定義と届出」
Small chip:「定義に入ることと、第2章から第6章の適用は別。届出は37条」

LEFT panel, heading:「論点（法令・除外）」
Do not mention 到達 or 諾否 in this panel.
Role under a small face: 法令に条例・規則が入ると示す者
Match ぴっちゅ: pitchi.png and pitchi_sheet.png. Good side.
Q&A only:
法令に条例・規則は入る？ → YES（2条1号）
命令に告示は含む？ → YES
条例根拠の地方の処分は2〜6章が外れる？ → YES（3条3項）
法律根拠の地方の処分は3条3項で外れる？ → NO
地方の行政指導は？ → 根拠を問わず2〜6章オフ
定義に入る＝全面適用？ → NO

RIGHT panel, heading:「論点（届出）」
Do not mention 3条3項 in this panel.
Role under a small face: 届出にも諾否があると主張する者
Match すべとん: subeton_sheet.png. Bad side.
Q&A only:
届出は申請か？ → NO（2条7号）
義務型だけか？ → NO（効果発生型も含む）
諾否の応答は？ → ない
手続上の義務の履行は？ → 形式上の要件に適合する場合、提出先の事務所への到達（37条）

CENTER: two boxes
Box A: 法令＝法律・命令（告示含む）・条例・規則（2条1号）
Box B: 届出＝行政庁への通知（2条7号）
ぴっちゅ points to Box A. Good side.
カチャドクロ with stamp「条例は法令に入らない」and a red ×. Match kachadokuro.png and kachadokuro_sheet.png. Bad side. Role: 条例は法令に入らないと主張する者
すべとん near Box B with stamp「届出にも諾否がある」and a red ×. Match subeton_sheet.png. Bad side. Role: 届出にも諾否があると主張する者
Caption:「定義と適用は別。地方の指導は根拠を問わず除外。届出は形式上適合し、提出先の事務所に到達したときに履行」

SMALL TABLE under the caption, navy header, 3 data rows. Zebra by ROW: row 1 white, row 2 light gray, row 3 white. Never column zebra.
列: 行為｜第2章から第6章が外れる条件
行1: 地方の機関がする処分｜根拠が条例又は規則に限る
行2: 地方の機関がする行政指導｜根拠を問わず外れる
行3: 地方の機関に対する届出｜根拠が条例又は規則に限る

BOTTOM strip, three cards:
判断軸「2条1号に条例・規則が入る。処分・届出の除外は条例・規則根拠。地方の指導は根拠を問わず除外。届出は形式上適合と到達」
ひっかけ「条例は法令に入らない／条例根拠にも全面適用／地方の法律根拠の指導にも行手法が全面適用／届出は義務型だけ／届出にも諾否がある／到達前でも履行済み」
暗記「法令に条例・規則は入る。処分・届出の除外は条例・規則根拠。地方の指導は根拠を問わず除外。届出は形式上の要件に適合する場合、提出先の事務所への到達で履行」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, table, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```
