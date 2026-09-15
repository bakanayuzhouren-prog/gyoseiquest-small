# 行服法｜審理員の仕事の流れ

てらしぃ依頼: 処分についての審査請求で、審理員が指名される通常の流れ。書類の提出者と提出先、審理員と審査庁の役割分担を1枚にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/gyoseihou/shinriin-nagare.png`
配置（生成後）: 見て聞いて覚える・行政不服審査法の審理員意見書／諮問フロー系カード。キー `learn/gyoseihou/shinriin-nagare`。

## 既存との切り分け（重複回避）

| 既存 | 仕事 |
|---|---|
| `prompts/fufuku/codex-fufuku-01-shomon-flow.md` | 意見書→諮問→裁決の**順番**ひっかけ |
| `prompts/fufuku/codex-fufuku-12-shoko-32-36.md` | 32条提出と33〜36条の職権調査 |
| **この図** | 審理員の**書類の受け渡し**と、審理・意見書／裁決の**役割分担** |

この図に、諮問例外の号列挙、33〜36条の立会細部、聴聞の主宰者比較表は載せない。

## スロット

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 審理 | いい役 | 審理と意見書を担当する者 | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |

審査庁・処分庁・審査請求人・参加人・行政不服審査会等は、**役職名付きの枠**で表す。カチャドクロ系を行政庁に置かない。

## 法律（原典・e-Gov）

対象: 処分についての審査請求。審理員指名がある通常の流れ。不作為専論、審理員を置かない9条1項ただし書、却下のみの24条ルートは描かない。

- 9条1項: 審査庁が所属職員（名簿があるときは名簿登載者）から審理手続を行う者を指名し、審査請求人及び処分庁等（審査庁以外）に通知する。
- 9条2項: 当該処分に関与した者、再調査の決定に関与した者、審査請求人及びその親族・代理人等は指名できない。
- 29条1項: 指名後、直ちに審査請求書又は録取書の写しを処分庁等へ送付する（審査庁が処分庁等であるときは不要）。
- 29条2項: 相当の期間を定めて、処分庁等に弁明書の提出を求める。
- 29条5項: 弁明書の提出があったときは、これを審査請求人及び参加人に送付する。
- 30条1項: 審査請求人は反論書を提出することができる（期間を定めたときはその期間内）。
- 30条2項: 参加人は意見書を提出することができる（期間を定めたときはその期間内）。参加人の意見書と、42条の審理員意見書を混ぜない。
- 31条1項: 審査請求人又は参加人の申立てにより機会を付与。ただし、申立人の所在その他の事情により、その機会を与えることが困難であると認められる場合は例外。
- 32条: 証拠書類等の提出（審査請求人・参加人、処分庁等）。
- 33〜36条: 物件の提出要求、参考人・鑑定、検証、質問。申立て又は職権。全事件で全部実施する義務ではない。
- 38条: 提出書類等の閲覧又は写し等の交付。
- 41条1項: 必要な審理を終えたと認めるとき、審理手続を終結する。
- 41条3項: 審理関係人に、終結した旨並びに審理員意見書及び事件記録を審査庁に提出する予定時期を通知する。欠席終結の詳細は載せない。
- 42条1項: 終結したときは、遅滞なく、審査庁がすべき裁決に関する意見書（審理員意見書）を作成する。
- 42条2項: 作成したときは、速やかに、事件記録とともに審査庁へ提出する。
- 43条1項: 審査庁は、審理員意見書の提出を受けたとき、原則として行政不服審査会等へ諮問する。例外あり（号は図に並べない）。
- 44条: 答申を受けたとき（諮問不要のときは審理員意見書の提出を受けたとき）は、遅滞なく裁決する。

聴聞の主宰者・報告書（行手法）は書かない。裁決は審査庁。審理員は裁決しない。

## PRE-GENERATE-CHECK

- 手続フロー型。左右を「国会／議院」型の対比2語にしない。中央の大半は審理員の担当範囲。開始（指名）と提出後（諮問・裁決）は審査庁の担当範囲で色を変える。
- 弁明書＝処分庁等。反論書＝審査請求人。参加人の意見書＝参加人。審理員意見書＝審理員→審査庁。
- 反論書・参加人の意見書は「提出できる」。弁明書の提出を求めるのは審理員。
- ④は「申立てや必要に応じて」。②③④を一度きりの固定順序にしない。
- 暗記は「審理員は審理・意見書。審査庁は裁決。」
- 口語なし。```text``` にブランド名なし。ちゃちゃロット1体。本文を隠さない。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `pitchi.png` ＋ `pitchi_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
White background. Navy headings. Light-blue arrows. Key legal words in red.
Bold Japanese gothic. Wide padding. No overlapping text. No brand names. No English. No publisher names.

Title, navy, centered:「審理員の仕事の流れ」
Small chip:「処分についての審査請求。審理員が指名される通常の流れ。聴聞の主宰者ではない」

TOP LEFT, small navy box labeled 審査庁の担当（開始）:
① 審査庁が審理員を指名（9条）
Arrow: 審査庁 → 審理員「指名」
Note: 当該処分に関与した者などは指名できない（9条2項）

LARGE CENTER BAND, teal border, heading:「審理員の担当範囲」
Role under a small face: 審理と意見書を担当する者
Match ぴっちゅ: pitchi.png and pitchi_sheet.png. Good side. Do not cover arrows or document names.

Numbered scenes with thick arrows. Document icons show the document name. Each arrow shows 提出者 → 提出先.

② 弁明書を求める（29条）
審理員 → 処分庁等: 審査請求書の写し（直ちに。審査庁＝処分庁等なら不要）
審理員 → 処分庁等: 相当の期間を定め、弁明書の提出を求める
処分庁等 → 審理員:「弁明書」
審理員 → 審査請求人・参加人:「弁明書の副本」

③ 反論・意見を受ける（30条）
審査請求人 → 審理員:「反論書」（提出できる）
参加人 → 審理員:「意見書」（提出できる。審理員意見書ではない）
Do not draw ② then ③ then ④ as one rigid one-time sequence.

④ 主張と証拠を調べる（31条から38条）
Label this cluster:「申立てや必要に応じて。全事件で全部はしない」
Two small scenes side by side:
聴く: 口頭意見陳述（31条）。審査請求人又は参加人の申立てにより機会を付与。ただし、申立人の所在その他の事情により、その機会を与えることが困難であると認められる場合は例外。
調べる: 証拠書類等の提出（32条）。物件の提出要求・参考人・鑑定・検証・質問（33条から36条）。提出書類等の閲覧・写し等の交付（38条）

⑤ 審理手続を終結する（41条）
必要な審理を終えたと認めるとき
Note: 審理関係人へ、終結した旨と、意見書・事件記録の提出予定時期を通知
Do not draw 欠席による終結.

⑥ 審理員意見書を作成し提出する（42条）
審査庁がすべき裁決に関する意見書を作成する
Note: 遅滞なく作成 → 速やかに提出
審理員 → 審査庁, two documents together:「審理員意見書」「事件記録」

BOTTOM RIGHT of the flow, small navy box labeled 審査庁の担当（提出後）:
審査庁 → 原則、行政不服審査会等へ諮問（43条。例外あり）
行政不服審査会等 → 審査庁: 答申
審査庁が裁決する（44条）
Labels must stay distinct: 諮問＝審査庁。答申＝審査会等。裁決＝審査庁。

BOTTOM strip, three cards:
判断軸「審理と意見書は審理員。裁決は審査庁。弁明書は処分庁等。反論書は審査請求人」
ひっかけ「審理員が裁決する → × ／ 弁明書を提出するのは審査請求人 → × ／ 審理員意見書と事件記録を審査庁へ提出 → ○」
暗記「審理員は審理・意見書。審査庁は裁決。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer to 暗記.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, document names, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```
