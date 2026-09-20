# 裁決の義務付け（37条の3第7項）③ 裁判所へ求める内容は？

- 保存先: `assets/images/deepdive/learn/gyosho/saiketsu-gimetsuke-3.png`
- 画像キー: `learn/gyosho/saiketsu-gimetsuke-3`（生成後。いまはアプリにタグを置かない）
- 連作: ①→④の3枚目。スマホ縦読み。生成は Codex。Cursor は描かない。
- 根拠: 行政事件訴訟法3条6項二号、37条の3第7項前段。求めるのは「一定の裁決」であり、単なる返答の催促ではない。命じられる行政庁は審査庁。訴訟の被告と混同しない。

## PRE-GENERATE-CHECK

- 芯: 不許可を取り消す裁決をするよう審査庁に命じてほしい、が裁決の義務付け。
- ちゃちゃロットは「元の不許可処分を、裁判所で直接争えるかな？」と問う。結論の分岐は④。
- 「相手は？→審査庁」は使わない。訴訟の被告と混同するため、「裁決をするよう命じられる行政庁は？→審査庁」とする。
- 画像内文言は処分・裁決・義務付けの区別。制作指示は印字しない。
- 禁止: 早く返事を出せ、だけにする。申請型全体の条件に一般化する。不許可が違法と断定。ブランド印字。
- 判定: このプロンプト範囲では通す。生成はてらしぃ指示まで行わない。

## 配役（①と同じ）

| スロット | キャラ | 参照PNG | 役割（何をしたいか） | 配置 |
|---|---|---|---|---|
| いい役・場面 | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `assets/images/characters/pitchi_sheet.png` | 申請者（一定の裁決の義務付けを求める） | 左。裁判所の建物の前 |
| 案内役 | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` | 案内（裁決の義務付けと原処分訴訟を切り分ける） | 下余白。吹き出しは案内役として短く |
| 裁判所 | 建物のみ | なし | 裁判所（訴えの対象を確かめる） | 右 |

生成指示のみ（画像に印字しない）: 「相手は？」と書かない。被告ラベルを置かない。

## 確定セリフ（画像に出してよい学習文）

- ぴっちゅ:「不許可を取り消す裁決をするよう、審査庁に命じてほしい」
- ちゃちゃロット:「それは『裁決の義務付け』。元の不許可処分を、裁判所で直接争えるかな？」

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパスを書く）:
- `assets/images/characters/pitchi.png`
- `assets/images/characters/pitchi_sheet.png`
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study comic panel from scratch. ONE job: 一定の裁決を求めるのが裁決の義務付け.
Portrait 3:4, smartphone reading. Warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
This is panel 3 of 4. Title:「③ 裁判所へ求める内容は？」 Chip:「3/4・37条の3第7項」
Do not print brand names, watermarks, file names, or production notes.
Do not print director notes, casting notes, or layout orders on the artwork. Print only legal study Japanese listed below.
The printed Q must name the agency ordered to make the ruling. Do not label it as the lawsuit defendant.

Layout: navy title bar. Center ONE comic. Court building labeled「裁判所」. Small left 論点 / right ひっかけ. Bottom 判断軸 / ひっかけ / 暗記.

Cast. Match these files exactly:
- ぴっちゅ left. Match `assets/images/characters/pitchi.png` (icon) and `assets/images/characters/pitchi_sheet.png` (pose sheet). Label:「申請者（一定の裁決の義務付けを求める）」
- ONE ちゃちゃロット SMALL lower margin. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Green lecturer suit, independent pale-sky-blue smiling hat, 指し棒. No nameplate. Speech from ちゃちゃロット is allowed as a short bubble.
- Court as a building only. No extra mascots.

Speech (exact, print these learning lines only):
- ぴっちゅ:「不許可を取り消す裁決をするよう、審査庁に命じてほしい」
- ちゃちゃロット:「それは『裁決の義務付け』。元の不許可処分を、裁判所で直接争えるかな？」

Left heading 論点 (print only):
求める対象は？ → 一定の裁決
裁決をするよう命じられる行政庁は？ → 審査庁
単なる返答の催促か？ → NO

Right heading ひっかけ (print only):
早く裁決しろ、だけで足りる
処分の義務付けと同じだと言い切る
審査請求をしたから必ず使える

Bottom (print only):
- 判断軸:「一定の内容の裁決を命じてほしいか」
- ひっかけ:「催促と義務付けを混ぜる。原処分訴訟を忘れさせる。被告と審査庁を混ぜる」
- 暗記:「裁決の義務付けは、一定の裁決を審査庁に命ずること（37条の3第7項）」
Answer:「不許可を取り消す裁決をせよと審査庁に命ずる求めが、裁決の義務付けである。次に、元の処分を裁判所で直接争えるかを見る。」

No logos, watermarks, nameplates, or product names on the artwork.
```

## 代替テキスト

申請者が、不許可を取り消す裁決をするよう審査庁に命じてほしいと裁判所に求める。それは裁決の義務付けであり、単なる返答の催促ではない。裁決をするよう命じられる行政庁は審査庁である。元の不許可処分を直接争えるかが次の分岐になる。
