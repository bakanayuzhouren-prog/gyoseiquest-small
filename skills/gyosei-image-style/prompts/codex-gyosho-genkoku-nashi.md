# 行訴法・原告適格なし（表2）

- 保存先: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-gyosho-genkoku-ari.md`／`codex-gyosho-genkoku-kikiwake.md`

## PRE-GENERATE-CHECK（Cursor確認済み）

- 場外車券の周辺住民＝×（最判平21.10.15）。病院等の開設者はあり表。
- 風俗営業制限区域内の居住者＝×（最判平10.12.17）。専ら公益。
- 他病院の開設許可を争う医師＝×（最判平19.10.19）。医療法7条は競争者保護なし。
- 一般廃棄物で業種が違う者（収集運搬が処分業許可の取消を争う等）＝×（平26.1.28の対）。
- 単なる消費者・反射的利益＝×。
- 鉄道運賃認可を争う単なる利用者＝×（最判平元.4.13 小田急運賃。高架の事業認可とは別）。
- 建築確認で日照・眺望のみを主張する隣地所有者＝、建築基準法がそれを個別利益として保護していないときは×（日付は断定しない）。
- 開発区域外でも生命身体のおそれがない単なる区域外＝×。
- 訴えの利益の消滅（代執行完了、免停期間経過等）はこの表に載せない。
- 禁止: 風俗居住を○。車券住民を○。医師競争を○。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 2 of 行訴法・原告適格. Do not draw 処分性 of acts.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「原告適格がない定番」
Chip:「反射的利益。公益の反射。競争の保護がない」

Left panel heading 論点:
周辺住民は常に？ → NO
競争者は常に？ → NO
消費者は？ → 原則NO

Right panel heading ひっかけ:
車券の周辺住民は○
風俗制限区域の居住者は○
医師は競争者だから○
運賃認可の利用者は○

MAIN: one clean table. Columns: 立場 | 結論 | 芯
Header navy. Data rows white / light gray alternating (row zebra).
結論: × only, red, large.

Rows EXACT:
場外車券施設の周辺住民 | × | 病院等の開設者とは別（平21.10.15）
風俗営業制限区域内の居住者 | × | 制限は専ら公益（平10.12.17）
他病院の開設許可を争う医師 | × | 医療法7条に競争者保護なし（平19.10.19）
一般廃棄物で業種が違う事業者 | × | 収運が処分業許可取消を争う等は不可
単なる消費者 | × | 反射的利益にとどまる
鉄道運賃認可を争う単なる利用者 | × | 運賃認可は利用者の個別利益ではない（平元.4.13）
建築確認で日照・眺望のみを主張する隣地所有者 | × | 建築基準法が個別保護していないとき
開発区域外で生命身体のおそれがない者 | × | 区域外でも常に○ではない
公益の反射で便益を受けるだけの住民 | × | 法律上の利益ではない
薬局距離の競争を原告適格の問題と同一視する読み | × | 薬局昭50は憲法の棚。浴場の既存業者と混ぜない

Small metaphor: a closed pass labeled 反射的利益. Role under figure: 取消しを求める者（法律上の利益を欠く）

Bottom three cards:
判断軸: 根拠法令がその者を個別に守っているか。守っていなければ×
ひっかけ: 近い・同業・競争している、という事実だけで適格ありとしない
暗記: 車券の住民×。風俗の居住者×。医師の競争×。運賃の利用者×

Answer bar EXACT:
「近い、同業、競争している、という事実だけでは、法律上の利益にはならない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論はすべて×
- [ ] 車券住民・風俗居住・医師競争が○になっていない
- [ ] 訴えの利益の行が混ざっていない
- [ ] 行ゼブラ
