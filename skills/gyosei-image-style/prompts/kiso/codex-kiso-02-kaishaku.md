# Codex用 — 法解釈4類型（拡張・類推・縮小・反対＋もちろん）

01 の型がOKなあと、1枚だけ。既存 `kaishaku-4type.png` の法律の芯は維持し、案内役が熊化しているなら **ちゃちゃロットで作り直す**。

- 保存先: `assets/images/deepdive/learn/kiso/kaishaku-4type.png`
- 画像キー: `learn/kiso/kaishaku-4type`
- 正本: `tac-moshi-compare-tables.md` §7

## 法律の芯（崩すな）

立法者の意思は**重要な資料の一つ**。法的安定性も**考慮**。文言が出発点。唯一絶対ではない。刑法の類推は罪刑法定で**原則禁止**。

| 類型 | 切り方 | 定番例 |
|------|--------|--------|
| 拡張 | 文言の**枠の中**を広く | 717条「土地の工作物」←工場内据付機械・エレベーター・軌道 |
| 類推 | 文言の**外**の類似へ | 768条財産分与→内縁解消。94条2項類推 |
| 縮小 | 広すぎる文言を絞る | 177条第三者＝当事者およびその包括承継人以外で、登記の欠缺を主張する正当な利益を有する者 |
| 反対 | 書いてない側は逆 | 未成年者同意→成年はこの規定上同意不要。代執行法1条型 |
| もちろん | より強い理由で当然 | 車進入禁止なら飛行機は当然禁止 |

**書かない**: 工場機械＝類推、内縁＝拡張、177条＝拡張、刑法でも類推OK、立法者意思が唯一。177条を「包括承継人以外の正当な利益」だけで終わらせない（当事者も除外）。

## この1枚の仕事

4類型の切り方＋定番例。立法者意思の「一つ」はチップか暗記に1行。民訴・ADRは載せない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 拡張・類推は枠の内外／縮小・反対は絞る・裏 |
| 中央メタファー | 条文の枠（内側を広げる／枠の外へ跳ぶ） |
| 判断軸 | 文言の枠の中か外か、絞るか裏か |
| ひっかけ | 工場機械＝類推／内縁＝拡張／刑法類推OK |
| 暗記 | 拡張＝枠内広げる。類推＝枠外。刑法の類推は原則禁止 |
| 役割 | 解釈する人（枠を動かす）／文言（出発点） |

## GPT Image プロンプト

画像参照: 主宰者許可図 ＋ chachalot.png ＋ approved-smiling-hat-mascot.png

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Four types of statutory interpretation (拡張・類推・縮小・反対) plus もちろん解釈.
Learning goal: After one glance, the learner can tell 枠の中 (拡張) vs 枠の外 (類推),
and never treats 刑法類推 as OK.

Match LAYOUT of「主宰者の許可」: left green / right orange, center ONE metaphor,
bottom 判断軸 / ひっかけ / 暗記, warm off-white, large Japanese, navy title. 16:9. No overlap.

STRICT: Left「論点」Q&A only (no GO/STOP mix). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.
Character labels: Left「解釈する人（枠を動かす）」Right「文言（出発点）」

Title:「法解釈 — 枠の中か外か」
Chip:「立法者意思は資料の一つ」

Center ONLY: a statute FRAME / window.
Inside the frame: arrow widening labeled「拡張」(717条 工作物←機械・EV・軌道)
Jumping outside: arrow labeled「類推」(768条→内縁／94条2項類推)
A squeeze clamp on the frame:「縮小」(177条 第三者)
A flip card on the back:「反対」(未成年同意→成年は不要)
Tiny もちろん badge: 車禁止なら飛行機も当然
Do NOT pack ADR, 民訴, or 裁判所.

Left 論点:
1. 拡張は？ → 文言の枠の中を広く（717条）
2. 類推は？ → 枠の外の類似へ（768条・94条2項）
3. 177条の第三者は？ → 当事者・包括承継人以外で正当な利益
4. 刑法の類推は？ → 原則禁止

Right ひっかけ:
- 工場の機械＝類推
- 内縁の財産分与＝拡張
- 177条第三者＝拡張
- 刑法でも類推してよい
- 立法者意思が唯一の正解

Bottom:
- 判断軸:「文言の枠の中か外か。絞るか裏か」
- ひっかけ:「機械＝類推／内縁＝拡張／刑法類推OK」
- 暗記:「拡張＝枠内。類推＝枠外。刑法の類推は原則禁止」
Answer:「177条の第三者は当事者および包括承継人以外で、登記欠缺を主張する正当な利益を有する者」

Guide: ちゃちゃロット SMALL bottom-right only, 指し棒 to 暗記. Match chachalot.png.
Not bear/owl/cat. No nameplate. (pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks).

Do NOT write 177条 as only「包括承継人以外」. Include 当事者除外.
Do NOT generate other topics.
```

## 目視

- 拡張＝枠内、類推＝枠外が直感で分かるか
- 177条の定義に当事者が入っているか
- 刑法類推OKが緑GOになっていないか
- ちゃちゃロットが熊になっていないか
