# Codex用 — 標準処理期間・標準審理期間（到達前の郵送は含めない）

てらしぃ指定: 行手法の処理期間に郵送は含まれるか。行服法でも同じか。
1枚の仕事は **到達してから起算する／到達前の郵送は含めない**。審査請求の3か月（18条）は主役にしない。

**型（生成前チェックで止まった点を直す）:** 左右は必須どおり **左「論点」／右「ひっかけ」**。両制度の比較は中央の表。対比2語の左右分割は使わない（結論が同じため）。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/hyojun-yuso-totatsu.png`
- 画像キー: `learn/tetsuzuki/hyojun-yuso-totatsu`
- 生成は Codex。Cursor は描かない。PNGは未作成のまま。

## 法律の芯（崩すな）

**行政手続法6条（標準処理期間）**  
行政庁は、申請が**その事務所に到達してから**当該申請に対する処分をするまでに通常要すべき標準的な期間を定めるよう努める。定めたときは公にしておかなければならない。  
到達前の郵送に要する期間は、この目安に含まれない。

法令により当該行政庁と異なる機関が提出先とされている場合は、併せて、当該申請が当該提出先とされている機関の事務所に到達してから当該行政庁の事務所に到達するまでに通常要すべき標準的な期間も定めるよう努める。これは**経由機関から処分庁までの移送**であり、申請者が投函してから到達するまでの郵送とは別。キャプション1行。

**行政不服審査法16条（標準審理期間）**  
審査庁となるべき行政庁は、審査請求が**その事務所に到達してから**当該審査請求に対する裁決をするまでに通常要すべき標準的な期間を定めるよう努める。定めたときは公にしておかなければならない。  
到達前の郵送に要する期間は、この目安に含まれない。

**書かない／主役にしない**  
審査請求期間（18条）の3か月。旧行服法の郵便発信主義。標準処理期間の経過＝直ちに行訴の相当の期間。補正に要する期間の除外を条文6条の本文であるかのように書くこと（運用・試験定番はひっかけ側へ）。あぷし。Gyosei Quest。口語を答え帯・判断軸に入れる。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 到達してから数える。到達前の郵送は含めない |
| 中央 | 両制度の比較表（起算は到達。郵送は含めない） |
| 判断軸 | 事務所に到達したか。投函した日ではない |
| ひっかけ | 投函日から算入。行服だけ発信主義。審査請求の3か月と混ぜる |
| 暗記 | 標準処理期間も標準審理期間も、到達してから。到達前の郵送は含めない |
| 役割 | 申請者（到達から数えてほしい）／誤った主張（投函日から算入せよ） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 申請者 | いい役 | 申請者（到達から数えてほしい） | ぴっちゅ | `pitchi.png` ＋ ポーズシート `pitchi_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張（投函日から算入せよ） | カチャドクロ | `kachadokuro.png` ＋ ポーズシート `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（表を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 標準処理期間と標準審理期間は、事務所に到達してから起算する。到達前の郵送に要する期間は含めない.
Quality: same density as q26-2.png. slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

Match LAYOUT of the approved sample: left green「論点」 / right orange「ひっかけ」, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.
Required headings: Left「論点」. Right「ひっかけ」. Do NOT use「論点（標準処理期間）」or「論点（標準審理期間）」as panel titles. No 2-word left/right split. No GO/STOP. Q&A answers are YES, NO, or a short legal phrase. Never「だれが」「問が聞くこと」「（聞かない）」.

Title:「到達してから数える。到達前の郵送は含めない」
Chip:「行手法6条も行服法16条も、到達から」

Left heading 論点. Q&A only:
1. 起算は？ → 事務所に到達してから
2. 到達前の郵送は含まれるか？ → NO
3. 行手法と行服法で結論は分かれるか？ → NO（同じ）

Right heading ひっかけ:
- 投函した日から算入する
- 行服法だけ発信主義
- 審査請求の3か月と混ぜる
- 補正期間まで6条本文で除外と書く

Center ONLY: one comparison table. Header navy. Data rows zebra by ROW (row 1 white, row 2 light gray). Not column zebra.
Columns: 制度 | 条文 | 起算 | 到達前の郵送
Rows:
標準処理期間 | 行手法6条 | 申請が事務所に到達してから | 含めない
標準審理期間 | 行服法16条 | 審査請求が事務所に到達してから | 含めない
ぴっちゅ small left of the table, label「申請者（到達から数えてほしい）」. カチャドクロ small right of the table, label「誤った主張（投函日から算入せよ）」. Do not cover title, Q&A, table cells, or answer bar.

Thin caption under the table, one line:「経由機関があるときは、経由先到達から処分庁到達の目安も別に定めるよう努める（6条）。申請者の郵送とは別」

Bottom cards, left about 80 percent. Right 20 percent is guide safe zone.
- 判断軸:「事務所に到達したか。投函した日ではない」
- ひっかけ:「投函日から算入する。行服法だけ発信主義。審査請求の3か月と混ぜる」
- 暗記:「標準処理期間も標準審理期間も、到達してから。到達前の郵送は含めない」
Answer:「標準処理期間は申請がその事務所に到達してから処分までの目安である（行手法6条）。標準審理期間は審査請求がその事務所に到達してから裁決までの目安である（行服法16条）。到達前の郵送に要する期間は含まれない。」

ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body. No nameplate. No speech balloon. Does not cover text. Leave warm-off-white space between feet and the answer bar.
No owl, bear, cat, extra humans. No brand letters. No どっちやねん. Do not make 審査請求期間 of 3 months the main title.
```

## 目視

- [ ] 左見出しは「論点」。右見出しは「ひっかけ」
- [ ] 両制度の比較は中央の表。左右を論点同士にしていない
- [ ] 起算は到達。投函日を正解にしていない
- [ ] 行手法6条と行服法16条の結論が同じ（郵送は含めない）
- [ ] 審査請求の3か月を主役にしていない
- [ ] 経由はキャプション。申請者の郵送と混ぜていない
- [ ] 表の行背面は白／薄いグレーの交互
- [ ] ブランド印字なし。名簿外なし
