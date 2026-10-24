関連: 伊藤塾公開2・問24。正解は4。審査の申出と同時に高等裁判所へは訴えられない。この図は、関与から高裁までの期間。だれが申出するかの図 `kuni-moushide-darekara.png` は上書きしない。

# 関与に不服なら、いつ高裁へ？

手順は左から右の一列。箱は手順の名前だけ。期間は矢印の上。4つの起算は、高裁へ入る矢印の下に1回だけ。

- 状態: 生成済み（2026-10-24）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: assets/images/deepdive/learn/jichi/keiso-kikan-nagare.png
- 画像キー: learn/jichi/keiso-kikan-nagare
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## PRE-GENERATE-CHECK

確認日 2026-10-24。正本は `data/knowledge/canonical/kuni-chiho-keiso-kikan.md`。地方自治法250条の13、250条の14、251条の3、251条の5、251条の6。

- 申出は、関与の日から30日以内。天災その他やむを得ない理由で出せなかったときは、その理由がやんだ日から1週間。郵便または信書便の送付日数は算入しない。都道府県の関与も同じ（251条の3第5項が250条の13第4項から第6項を準用）。
- 審査と勧告は、申出の日から90日以内。
- 地方側の訴えは、次の日から30日以内。国の関与は251条の5。都道府県の関与は251条の6。252条は、市町村の不作為を都道府県が訴える別の訴えなので、この図に置かない。
- 起算は4つ。結果または勧告の通知があった日。措置の通知があった日（国は委員会、都道府県は総務大臣）。申出から90日を経過した日。勧告に示された期間を経過した日。
- 口頭弁論の期日は、訴えのあった日から15日以内の日。上告は1週間。251条の6第3項が251条の5第5項・第6項を準用する。
- 国の関与の申出先は、国地方係争処理委員会。相手方は、関与をした国の行政庁（250条の13）。
- 都道府県の関与の申出先は、総務大臣。総務大臣が自治紛争処理委員を任命し、審査に付す（251条の3）。相手方は都道府県の行政庁。委員へ直接申出するのではない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（高裁へ入る30日の矢印を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。流れと試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one left-to-right procedure, exactly 4 boxes in one row. No side panels. No bottom cards. No answer bar. No speech balloon. No second row of the same steps.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 16:9. Wide margins. Leave a bottom margin for one test line and one guide.

Title, one short question: 関与に不服なら、いつ高裁へ？
No subtitle under the title.

Four boxes, left to right, navy outlines. Box text may wrap to two lines. Do not shrink type.
Box 1: 国の関与、または都道府県の関与
Box 2: 審査の申出。国なら国地方係争処理委員会。都道府県なら総務大臣
Box 3: 審査・勧告
Box 4: 高等裁判所

Under box 2, one short line: 総務大臣が、自治紛争処理委員を任命する。

Arrow 1, above the arrow, large: 30日以内
Under arrow 1, two short lines: 関与の日から。やむを得ない理由がやんだ日から1週間。郵便の日数は入れない。

Arrow 2, above the arrow, large: 90日以内
Under arrow 2, one short line: 申出の日から。

Arrow 3, above the arrow, large: 30日以内
Under arrow 3, four short lines, once only:
結果または勧告の通知があった日
措置の通知があった日。国は委員会。都道府県は総務大臣
申出から90日を経過した日
勧告の期間を経過した日

Under the last box, one line: 口頭弁論は、訴えの日から15日以内の日。上告は1週間。

Bottom, one line only: 申出と同時に高裁へ訴える、は×。
Do not repeat that line in the title or in the boxes.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 30日 arrow into the court. No speech balloon. Do not cover the flow or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 1箱目は、国の関与または都道府県の関与。2箱目の申出先は、国なら国地方係争処理委員会、都道府県なら総務大臣。総務大臣が自治紛争処理委員を任命する
- [ ] 箱は4つで左から右。30日、90日、30日。起算は4つで、高裁の前に1回
- [ ] 国は251条の5、都道府県は251条の6。252条は出ていない
- [ ] 口頭弁論は15日以内の日。上告は1週間。同時に訴える、は×
- [ ] 案内役は下余白。帽子は耳ではない。流れを隠さない
- [ ] ブランド印字なし。名簿外なし
