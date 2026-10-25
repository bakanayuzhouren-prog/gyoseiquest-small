関連: 辰巳2026全国公開完全模試・問49。技能実習は技能の移転。特定技能1号は人手不足の即戦力。2号は熟練。表の5行は、てらしぃの指定どおり。育成就労の施行日は表の下に1行だけ。

# 技能実習？特定技能？

5行の比較表。列は技能実習、特定技能1号、特定技能2号。行は目的、在留、仕事を変える、家族、試験。

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/kisochi/ginou-jisshu-tokutei.png
- 画像キー: learn/kisochi/ginou-jisshu-tokutei
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## PRE-GENERATE-CHECK

確認日 2026-10-25。正本は `data/knowledge/canonical/kisochi-seiji-keizai-shakai.md`。出入国在留管理庁の在留資格一覧と、特定技能のQ&A。

- 技能実習の目的は、開発途上地域等への技能等の移転。人手不足の即戦力ではない。在留は、1号が1年を超えない範囲、2号と3号が各2年を超えない範囲、合計最長5年。転籍は原則できない。家族滞在の対象に入らない。入国時の技能試験は原則ない。
- 特定技能1号は、人手不足分野の即戦力。1回の指定は3年を超えない範囲。通算5年が上限。同じ業務区分なら仕事を変えられる。家族の帯同は基本的に認めない。技能と日本語の試験がある。技能実習2号を良好に修了した者は免除され得る。
- 特定技能2号は、同じ分野の熟練した技能。付与される期間は3年、2年、1年または6月。更新の上限はない。同じ業務区分なら仕事を変えられる。配偶者と子は家族滞在で帯同できる。試験は、より高い技能試験があり、各試験に合格する。日本語試験は不要、とは書かない。令和8年1月23日の分野別運用方針の一般的な表では、2号の日本語能力水準はB1相当以上。分野によっては、より高い。認定証明書への確認開始は、令和9年4月1日以降の申請。変更と更新の開始日は未公表。この日付とB1は、表のセルにも下の1行にも置かない。
- 技能実習は、令和9年4月1日から育成就労に代わる。この1行は表の下だけ。表のセルには混ぜない。2号の日本語の確認開始と同じ日でも、別の規則である。
- 分野の数、監理団体、登録支援機関は、この表に置かない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（目的の行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と下の1行を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one comparison table, exactly 5 data rows. No side panels. No bottom cards. No answer bar. No speech balloon.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines inside the cells.
Canvas: fully opaque warm off-white, landscape 16:9. Wide margins. Leave a bottom margin for one line and one guide.

Title, one short question: 技能実習？特定技能？
No subtitle under the title.

Header row, navy band, white type: （空） | 技能実習 | 特定技能1号 | 特定技能2号
The first header cell has no word.

Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.
Exactly these 5 rows, in this order. Do not paraphrase. Do not add a row.

目的 | 開発途上地域等への技能等の移転 | 人手不足分野の即戦力 | 同じ分野の熟練した技能
在留 | 1号は1年を超えない範囲。2号と3号は各2年を超えない範囲。合計最長5年 | 1回の指定は3年を超えない範囲。通算5年が上限 | 3年、2年、1年または6月。更新の上限はない
仕事を変える | 原則できない | 同じ業務区分ならできる | 同じ業務区分ならできる
家族 | 家族滞在の対象に入らない | 帯同は基本的に認めない | 配偶者と子は、家族滞在で帯同できる
試験 | 入国時の技能試験は原則ない | 技能と日本語の試験。技能実習2号を良好に修了した者は免除され得る | より高い技能試験。各試験に合格する

Under the table, one line only: 技能実習は、令和9年4月1日から育成就労に代わる。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 目的 row. No speech balloon. Do not cover the table or the line under the table. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 列は技能実習、特定技能1号、特定技能2号。行は目的、在留、仕事を変える、家族、試験の5行
- [ ] 在留は、技能実習が合計最長5年。1号は通算5年。2号は3年、2年、1年または6月で、更新の上限はない
- [ ] 家族は、技能実習が家族滞在の対象外。1号は帯同を基本的に認めない。2号は配偶者と子
- [ ] 2号の試験は「より高い技能試験。各試験に合格する」。日本語試験は不要、とは書いていない。B1も、その確認開始の日も、表と下の1行にない
- [ ] 下の1行は、令和9年4月1日から育成就労。表の中にその文はない
- [ ] 行の背面は白と薄いグレーの交互。字は縮めていない
- [ ] 案内役は下余白。帽子は耳ではない。表を隠さない
- [ ] ブランド印字なし。名簿外なし
