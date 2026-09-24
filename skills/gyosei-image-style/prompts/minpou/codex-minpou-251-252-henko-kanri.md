# Codex用 — 共有の変更・管理・保存（251条・252条）

てらしぃ問: 変更は全員、管理は過半数。何がどちらに当たるか。短期賃貸も含める。
1枚の仕事は **著しい変更＝全員。管理・軽微変更・短期賃貸＝過半数。保存＝単独。短期の年限は602条の表を参照し、この図に10・5・3・6を並べない**。

既存の `602-junko-rock.png` は上書きしない。期間の別表はあちら。

- 保存先: `assets/images/deepdive/learn/minnpou/kyoyu-henko-kanri.png`
- 画像キー: `learn/minnpou/kyoyu-henko-kanri`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法物権の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK（民法251・252・602）

**251条1項**  
各共有者は、他の共有者の同意を得なければ、共有物に変更（その形状又は効用の著しい変更を伴わないものを除く。）を加えることができない。

**252条1項**  
共有物の管理に関する事項（共有物の管理者の選任及び解任を含み、251条1項の変更を加えるものを除く。）は、各共有者の持分の価格に従い、その過半数で決する。

**252条4項**  
過半数で設定できるのは、各号の期間を超えない賃借権その他の使用及び収益を目的とする権利。期間の中身は602条と同型（山林の栽植・伐採10年、その他の土地5年、建物3年、動産6か月）。**この図には年数を書かない。** セルは「民法第602条の表を参照（252条4項）」とする。

**252条5項**  
各共有者は、前各項の規定にかかわらず、保存行為をすることができる。

**賃貸の解除**は管理（最判昭39.2.25）。期間を超える賃貸は変更。持分だけの譲渡は各共有者が単独。借地借家法が乗って長期化する類型を「常に管理」と書くのはひっかけ。

**書かない:** 外壁塗装も全員同意（旧法）。賃貸はすべて全員。10年5年3年6か月の一覧。口語。切る。ブランド名。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 著しい変更は全員。管理と短期賃貸は過半数 |
| 中央 | 行為×決め方の表（行ゼブラ）。短期は参照書き |
| 判断軸 | 著しい変更か。期間内の賃貸か。現状維持か |
| ひっかけ | 賃貸は全員。塗装も全員。明渡しも過半数。持分売却も全員 |
| 暗記 | 著しい変更＝全員。管理・軽微・短期＝過半数。期間は602条。保存＝単独 |
| 役割 | 共有者（過半数で短期賃貸をしたい）／誤った主張をする側（貸すのも全員同意だとする） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 共有者 | いい役 | 共有者（過半数で短期賃貸をしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張をする側（貸すのも全員同意だとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 共有物の著しい変更は全員の同意、管理と軽微変更と短期賃貸は持分の過半数、保存は各共有者が単独. 短期賃貸の年限は数字を並べず 民法第602条の表を参照 と書く.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, checkerboard, or unpainted margin.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「共有者（過半数で短期賃貸をしたい）」Right「誤った主張をする側（貸すのも全員同意だとする）」

Title:「著しい変更は全員。管理と短期賃貸は過半数」
Chip:「民法251条・252条」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 行為 | 決め方 | 根拠
Rows:
建替え・取壊し・用途転換・全体の売却・抵当権設定 | 全員の同意 | 251条1項
期間を超える賃貸 | 全員の同意 | 251条・252条4項
軽微変更（舗装・外壁塗装・屋上防水） | 持分の過半数 | 251条1項
使用方法・賃貸の解除・管理者の選任及び解任 | 持分の過半数 | 252条1項
短期賃貸借 | 持分の過半数 | 期間は民法第602条の表を参照（252条4項）
保存（必要な修繕・不法占拠者への明渡し） | 各共有者が単独 | 252条5項
Do NOT print 10年, 5年, 3年, or 6か月 anywhere. The short-lease cell must look like a statute cross-reference, not a second period table.
Caption:「持分だけの譲渡は各共有者が単独でできる。借地借家法が乗って長期化する賃貸を、常に管理と書くのは誤り」

Left 論点:
1. 著しい変更は？ → 全員の同意（251条）
2. 短期賃貸は管理か？ → YES（252条4項）
3. 短期の年限は？ → 第602条の表を参照
4. 保存は単独か？ → YES（252条5項）

Right ひっかけ:
- 賃貸はすべて全員の同意
- 外壁塗装も全員の同意
- 明渡し請求も過半数が要る
- 持分の売却も全員の同意

Bottom:
- 判断軸:「著しい変更か。期間内の賃貸か。現状維持か」
- ひっかけ:「賃貸は全員。塗装も全員。明渡しも過半数」
- 暗記:「著しい変更＝全員。管理・軽微・短期＝過半数。期間は602条。保存＝単独」
Answer:「著しい変更は全員の同意。管理・軽微変更・短期賃貸は持分の過半数。短期の年限は民法第602条の表を参照。保存は各共有者が単独でできる。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not stand on the answer band.
Scene cast SMALL, do not cover the table: ぴっちゅ left, カチャドクロ right. Do not swap roles. No owl, bear, cat, raccoon.
```
