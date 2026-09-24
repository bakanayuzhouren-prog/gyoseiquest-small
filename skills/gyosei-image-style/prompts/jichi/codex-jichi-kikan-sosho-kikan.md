# Codex用 — 機関訴訟の期間の聞き分け（関与30日／行訴14条／住民訴訟）

てらしぃ指定: 機関訴訟の出訴期間パターンを1枚の表にする。
1枚の仕事は **国の関与は係争委を経て、通知から30日で高裁**。行訴14条の6か月と、住民訴訟の30日を混ぜない。

既存の `kuni-no-kanyo.png`（関与の法定主義）は上書きしない。

- 保存先: `assets/images/deepdive/learn/jichi/kikan-sosho-kikan.png`
- 画像キー: `learn/jichi/kikan-sosho-kikan`
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK（既存正本・地方自治法）

- 機関訴訟＝国又は公共団体の機関相互における権限の存否又はその行使に関する紛争についての訴訟（行訴6条）。
- 関与の申出: 関与の日から30日以内（250条の13）。審査: 申出から90日以内（250条の14）。
- なお不服: 審査結果又は勧告の**通知があった日から30日以内**に高等裁判所（251条の5）。いきなり訴訟は不可。
- 請求: 違法な関与の取消し、又は不作為の違法確認。
- 団体同士の紛争は、総務大臣又は都道府県知事が自治紛争処理委員を任命し、調停に付する（251条・251条の2）。出口は調停案の提示・受諾勧告。一般の団体同士の調停から当然に高裁へ進むわけではない。出訴日数も断定しない。
- 任命の切り分け（251条の2第1項）: 都道府県又は都道府県の機関が当事者となるもの→総務大臣。その他→都道府県知事。
- 取消しを求める機関訴訟で、個別法に特別の期間がないときは、43条1項で14条を準用（知った日から6か月、処分又は裁決の日から1年）。関与ルートに14条を当てない。
- 住民訴訟の30日は民衆訴訟（242条の2）。監査結果等の通知の日から30日。

左右は必須 **左「論点」／右「ひっかけ」**。比較は中央の表。対比2語の左右分割は使わない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 国の関与は係争委を経て、通知から30日 |
| 中央 | 期間の聞き分け表 |
| 判断軸 | 国の関与か、普通の取消しか、住民訴訟か |
| ひっかけ | 関与に14条の6か月。住民訴訟を機関訴訟。いきなり高裁 |
| 暗記 | 関与＝係争委30日→通知から30日で高裁。14条は関与に使わない |
| 役割 | 地方（関与に不服）／国（関与する） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 地方 | いい役 | 地方（関与に不服） | ぴっちゅ | `pitchi.png` ＋ ポーズシート `pitchi_sheet.png` |
| 国 | 悪い役 | 国（関与する） | カチャドクロ | `kachadokuro.png` ＋ ポーズシート `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（表を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 国の関与に不服があるときは、係争委に審査の申出をし、なお不服なら通知があった日から30日以内に高裁へ機関訴訟を提起する.
Quality: same density as q26-2.png. slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

Match LAYOUT of the approved sample: left green「論点」 / right orange「ひっかけ」, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.
Required headings: Left「論点」. Right「ひっかけ」. No 2-word left/right split. No GO/STOP. Q&A answers are YES, NO, or a short legal phrase. Never「だれが」「問が聞くこと」「（聞かない）」.

Title:「国の関与は、係争委を経て、通知から30日」
Chip:「機関訴訟＝国又は公共団体の機関相互の、権限の存否又はその行使に関する争い（行訴6条）」

Left heading 論点:
1. 国の関与に不服なら、先に何をするか？ → 係争委に審査の申出
2. なお不服の出訴期間は？ → 通知があった日から30日
3. いきなり高裁できるか？ → NO

Right heading ひっかけ:
- 関与も知った日から6か月
- 住民訴訟と同じ機関訴訟
- いきなり高裁できる
- 団体同士も係争委へ出す
- 団体同士の調停から当然に高裁へ進む

Center ONLY: one comparison table. Header navy. Data rows zebra by ROW (row 1 white, row 2 light gray, then repeat). Not column zebra.
Columns: 場面 | 入口 | 出口
Rows:
国の関与 | 関与の日から30日以内に係争委へ申出。審査は申出から90日以内 | 通知があった日から30日以内に高裁（251条の5）
団体同士の紛争 | 総務大臣又は都道府県知事→自治紛争処理委員による調停（251条・251条の2） | 調停案の提示・受諾勧告。当然に高裁へは進まない
取消しを求める機関訴訟（特別期間なし） | 個別法の入口 | 知った日から6か月、処分又は裁決の日から1年（行訴14条）
住民訴訟 | 監査請求が先 | 通知の日から30日。民衆訴訟であり機関訴訟ではない
ぴっちゅ small left of the table, label「地方（関与に不服）」. カチャドクロ small right of the table, label「国（関与する）」. Do not cover title, Q&A, table cells, or answer bar.

Thin caption under the table, two short lines:
「都道府県又は都道府県の機関が当事者なら総務大臣。それ以外は都道府県知事」
「関与ルートの30日と、行訴14条の6か月を同じ数字にしない」

Bottom cards, left about 80 percent. Right 20 percent is guide safe zone.
- 判断軸:「国の関与か、普通の取消しか、住民訴訟か」
- ひっかけ:「関与に14条の6か月を当てる。住民訴訟を機関訴訟にする。いきなり高裁」
- 暗記:「関与は係争委へ30日。なお不服は通知から30日で高裁。14条は関与に使わない」
Answer:「国の関与に不服があるときは、関与の日から三十日以内に国地方係争処理委員会に審査の申出をし、なお不服があるときは通知があった日から三十日以内に高等裁判所へ機関訴訟を提起する。」

ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body. No nameplate. No speech balloon. Does not cover text. Leave warm-off-white space between feet and the answer bar.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 左見出しは「論点」。右見出しは「ひっかけ」
- [ ] タイトルが条文番号から始まっていない。機関訴訟の意味がチップにある
- [ ] 関与＝係争委30日→通知から30日。いきなり高裁を正解にしていない
- [ ] 14条の6か月を関与の正解にしていない
- [ ] 住民訴訟を機関訴訟にしていない
- [ ] 団体同士は調停案の提示・受諾勧告。当然に高裁へ進むと書いていない
- [ ] 団体同士の出訴日数を根拠なく30日と書いていない
- [ ] 任命は総務大臣又は都道府県知事（都道府県・都道府県機関が当事者なら総務大臣）
- [ ] `kuni-no-kanyo.png` を上書きしていない
- [ ] 表の行背面は白／薄いグレーの交互
- [ ] ブランド印字なし。名簿外なし
