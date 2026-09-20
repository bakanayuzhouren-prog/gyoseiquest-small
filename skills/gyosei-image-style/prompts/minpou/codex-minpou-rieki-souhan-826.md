# Codex用 — 親権と利益相反（826条）当たる／当たらない

表主役。1枚。教材転載なし。結論は民法826条、最判昭42.4.18。後見は860条・851条を注記だけ。

- 保存先: `assets/images/deepdive/learn/minnpou/rieki-souhan-826.png`
- 画像キー: `learn/minnpou/rieki-souhan-826`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

親権を行う父又は母とその子との利益が相反する行為については、親権を行う者は、その子のために特別代理人の選任を家庭裁判所に請求しなければならない（826条1項）。
数人の子に親権を行う場合で、その一人と他の子との利益が相反する行為については、その一方のために特別代理人の選任を請求しなければならない（826条2項）。

**判断軸（最判昭42.4.18）**  
当たるかは、親権者の動機・意図ではなく、**行為の外形を客観的にみて**決める。「子の学費のため」でも、外形が相反なら当たる。

**当たる（○）**
- 子の土地・建物を、親権者自身が買い受ける／譲り受ける
- 親権者の債務の担保として、子の不動産に抵当権を設定する
- 親権者の債務を、子に保証させる・連帯させる
- 子の財産で、親権者の債務を弁済する
- 親権者と子が共同相続人であるとき、親が子を代理して遺産分割協議をする
- 数人の子の間で利益が相反する行為（826条2項）

**当たらない（×）**
- 子の不動産を第三者に売却する（代金は子のもの）
- 親権者が自己の財産を子に贈与する
- 第三者が子に贈与し、親が受領を代理する
- 子自身の借入のために、子の不動産に抵当権を設定する
- **子を代理して、子の不動産を第三者の債務の担保に供する**（原則当たらない。親や第三者の利益だけを図るときは代理権濫用になり得る。親権者自身の債務の担保とは混ぜない）

特別代理人を選任せずにした行為は**無権代理**。追認はあり得る。
後見人と被後見人の相反は860条。後見監督人がいれば監督人が本人を代表し、いなければ特別代理人。図の主役は親権826条。

**書かない:** 動機で切る。子のためと言えば免責。当たる行為を無効と断定する（無権代理）。会社法の利益相反。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 外形で切る／子のためでも免責にならない |
| 中央メタファー | 行為ごとの○×表（行ゼブラ） |
| 判断軸 | 外形が相反するか。動機は見ない |
| ひっかけ | 子のためなら不要。第三者売却も○。動機で決める |
| 暗記 | 親の借金の抵当は○。子を代理して第三者の担保に供するのは原則× |
| 役割 | 子（財産を守られたい）／特別代理人（子のために代理する）／誤った主張をする側（子のためと言えば選任不要とする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
Topic: 民法826条。親権者と子の利益相反。特別代理人.
Learning goal: 外形で切る。親の借金の抵当は○。子を代理して第三者の債務の担保に供するのは原則×.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「外形で切る。子のためでも免責にならない」
Chip:「826条。最判昭42.4.18」

Left 論点 Q&A ONLY:
1. 何を家裁に請求する？ → 特別代理人の選任
2. 当たるかの見方は？ → 行為の外形。動機は見ない
3. 親の借金の担保に子の不動産は？ → 当たる
4. 子を代理して第三者の債務の担保に供するは？ → 当たらない（原則）

Right ひっかけ ONLY:
子の学費のためと言えば選任不要
動機・意図で決める
子を代理して担保に供すれば全部当たる
第三者への売却も利益相反
なしでやると無効（取消し）で終わる
会社法の取締役の利益相反と混ぜる

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, then white / gray. NOT column colors.
Columns: 行為 | 利益相反
Rows:
子の土地を親が買い受ける | ○
親の借金の担保に子の不動産へ抵当 | ○
子を代理して第三者の債務の担保に供する | ×（原則）
子に親の債務を保証させる | ○
共同相続の遺産分割で親が子を代理 | ○
数人の子の間で利益が相反する行為 | ○（826条2項）
子の不動産を第三者に売る | ×
子自身の借入のために子の不動産へ抵当 | ×
Caption:「担保に供するが全部×ではない。親自身の債務の担保は○。第三者の債務は原則×。親や第三者の利益だけを図るときは代理権濫用になり得る。選任なしは無権代理。後見は860条。」

Scene cast SMALL, do not cover table:
- Good role, left of table: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「子（財産を守られたい）」
- Good role, right of table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「特別代理人（子のために代理する）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（子のためと言えば選任不要とする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「行為の外形が相反するか。動機は見ない」
- ひっかけ:「子のためなら不要。担保に供すれば全部当たる。動機で決める」
- 暗記:「親の借金の抵当は○。子を代理して第三者の担保に供するのは原則×」
Answer:「親権を行う者は、その子のために特別代理人の選任を家庭裁判所に請求しなければならない。当たるかは行為の外形を客観的にみて判断する。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 判断軸が動機になっていない
- [ ] 親の抵当が○、子を代理して第三者の担保に供するが×
- [ ] 選任なしを「無効」とだけ書いていない（無権代理）
- [ ] 会社法の利益相反を本文に置いていない
