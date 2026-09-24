# Codex用 — 取消訴訟の出訴期間（短期6か月／長期1年）

てらしぃ指定: **長期**を図にする。既存の語呂図 `mikka-mukka`（行審3か月対行訴6か月）は触らない。この1枚の主役は行訴14条の**短期と長期**。

生成前チェックで停止した点を直す。左右は必須どおり **左「論点」／右「ひっかけ」**。短期と長期の比較は中央。対比2語の左右分割は使わない。長期の起算は **処分又は裁決の日**（「処分の日」だけに落とさない）。

- 保存先: `assets/images/deepdive/learn/gyosho/shusso-tanki-choki.png`
- 画像キー: `learn/gyosho/shusso-tanki-choki`
- 生成は Codex。Cursor は描かない。PNGは未作成。

## 法律の芯（崩すな）

**短期（14条1項）**  
取消訴訟は、処分又は裁決があったことを**知った日から六箇月**を経過したときは提起できない。ただし**正当な理由**があるときはこの限りでない。条文は「翌日」と書かない。

**長期（14条2項）**  
取消訴訟は、**処分又は裁決の日から一年**を経過したときは提起できない。ただし**正当な理由**があるときはこの限りでない。起算は**知った日ではない**。

**審査請求をした者（14条3項）**  
処分又は裁決につき審査請求をすることができる場合、又は行政庁が誤って審査請求をすることができる旨を教示したときは、審査請求があった場合、その審査請求をした者については、前二項にかかわらず、**裁決があったことを知った日から六箇月**又は**当該裁決の日から一年**。ただし正当な理由があるときはこの限りでない。

行審法18条2項の客観期間は、処分（再調査をしたときはその決定）が**あった日の翌日から起算して一年**。行訴の長期と「1年」は同じでも、起算の書き方が違う。この図の主役に行審法を置かない。ひっかけ1行だけ。

無効確認・義務付け・差止め・不作為の違法確認に、14条の出訴期間は原則乗らない。

**書かない:** 長期も知った日から1年。短期は知った日の翌日から。正当な理由があっても絶対切れ。長期の起算を「処分の日」だけと書く。左右を「論点（短期）／論点（長期）」にする。みっかむっかの3対6をこの図の主仕事にする。あぷし。Gyosei Quest。口語を答え帯・判断軸に入れる。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 短期は知った日から6か月。長期は処分又は裁決の日から1年 |
| 中央 | 短期と長期の比較（起算の違い） |
| 判断軸 | 知った日か、処分又は裁決の日か。審査請求をした者は裁決に付け替えるか |
| ひっかけ | 長期も知った日から1年。行訴も翌日から。義務付けにも14条 |
| 暗記 | 取消訴訟は知った日から6か月、処分又は裁決の日から1年 |
| 役割 | 原告（出訴したい）／行政（期間切れを主張する） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 原告 | いい役 | 原告（出訴したい） | ぴっちゅ | `pitchi.png` ＋ ポーズシート `pitchi_sheet.png` |
| 行政 | 悪い役 | 行政（期間切れを主張する） | カチャドクロ | `kachadokuro.png` ＋ ポーズシート `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（表を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 取消訴訟の出訴期間。短期は知った日から6か月。長期は処分又は裁決の日から1年.
Quality: same density as q26-2.png. slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

Match LAYOUT of the approved sample: left green「論点」 / right orange「ひっかけ」, ONE center comparison, bottom 判断軸 / ひっかけ / 暗記.
Required headings: Left「論点」. Right「ひっかけ」. Do NOT use「論点（短期）」or「論点（長期）」as panel titles. No 2-word left/right split. No GO/STOP. Q&A answers are YES, NO, or a short legal phrase. Never「だれが」「問が聞くこと」「（聞かない）」.

Title:「短期は知った日から、長期は処分又は裁決の日から」
Chip:「取消訴訟（14条）。6か月と1年。起算が違う」

Left heading 論点. Q&A only:
1. 短期の起算は（14条1項） → 知った日から6か月
2. 長期の起算は（14条2項） → 処分又は裁決の日から1年
3. 正当な理由は → 例外あり

Right heading ひっかけ:
- 長期も知った日から1年
- 行訴も翌日から起算する
- 義務付けにも14条が乗る

Center ONLY: one comparison table or split calendar. Header navy. If a table is used, data rows zebra by ROW (row 1 white, row 2 light gray). Not column zebra.
Columns: 期間 | 起算 | 長さ
Rows:
短期（14条1項） | 知った日から | 6か月
長期（14条2項） | 処分又は裁決の日から | 1年
Right calendar page must say「処分又は裁決の日」and「1年」, never only「処分の日」.
ぴっちゅ left, label「原告（出訴したい）」. カチャドクロ right, label「行政（期間切れを主張する）」. Do not cover title, Q&A, or answer bar.

Thin caption under the center, one line:「審査請求をした者は、裁決を知った日から6か月又は裁決の日から1年（14条3項）」

Bottom cards, left about 80 percent. Right 20 percent is guide safe zone.
- 判断軸:「知った日か、処分又は裁決の日か。審査請求をした者は裁決に付け替えるか」
- ひっかけ:「長期も知った日から1年。行訴も翌日から起算。義務付けにも14条が乗る」
- 暗記:「取消訴訟は知った日から6か月、処分又は裁決の日から1年」
Answer:「取消訴訟は、処分又は裁決があったことを知った日から六箇月、処分又は裁決の日から一年を経過したときは提起できない。ただし正当な理由があるときはこの限りでない。」

ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body. No nameplate. No speech balloon. Does not cover text. Leave warm-off-white space between feet and the answer bar.
No owl, bear, cat, extra humans. No brand letters. No どっちやねん. No みっかむっか as the main title.
```

## 目視

- [ ] 左見出しは「論点」。右見出しは「ひっかけ」
- [ ] 短期と長期の比較は中央。左右を論点同士にしていない
- [ ] 短期＝知った日から6か月。長期＝処分又は裁決の日から1年
- [ ] タイトル・中央に「処分の日」だけを正解として書いていない
- [ ] 長期を「知った日から1年」にしていない
- [ ] 行訴の短期に「翌日」を正解として書いていない
- [ ] 14条3項はキャプション。正当な理由の例外を消していない
- [ ] みっかむっか図を上書きしていない
- [ ] ブランド印字なし。名簿外なし
