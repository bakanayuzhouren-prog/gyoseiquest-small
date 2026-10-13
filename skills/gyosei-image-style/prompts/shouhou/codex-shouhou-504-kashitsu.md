# Codex用 — 商法504条 示さない契約と、過失の相手方

- 保存先: `assets/images/deepdive/learn/shouhou/504-kashitsu-aitegata.png`
- 画像キー: `learn/shouhou/504-kashitsu-aitegata`
- 関連: 辰巳2026全国公開完全模試 問36 肢3。非顕名でも本人に効力は生ずる。自分の過失で知らなかった相手方は、代理人に履行を請求できない。最大判昭43.4.24。
- 配置: 生成後に Cursor。PNGができるまで `[[image:]]` を付けない。

## 法律の芯（崩すな）

- 商行為の代理人が、本人のためにすることを示さなくても、その行為は本人に効力を生ずる。商法504条本文。相手方が知っていても、自分の過失で知らなくても、この効力は生ずる。過失は、本人への効力の要件ではない。
- ただし書は、知らなかった相手方だけを保護する。その相手方は、代理人に履行の請求をすることができる。
- 自分の過失で知らなかった相手方は、ただし書に含まれない。代理人に履行を請求できない。最大判昭和43年4月24日。
- 選択（本人との関係か、代理人との関係か）は、この枚に入れない。本人への効力の文を、下の枝で繰り返さない。

## 生成前チェック

- [x] 過失を、本人への効力の条件にしていない
- [x] 知っていても、過失で知らなくても、本文の効力は生ずる
- [x] ただし書の請求ができるのは、知らなかった相手方で、自分の過失ではない者
- [x] 自分の過失で知らなかった相手方は、代理人に履行を請求できない
- [x] 左右パネル・底部カード・答え帯・案内役は置かない
- [x] 同じ文を、タイトルと矢印と下の枝で繰り返さない

## GPT Image プロンプト（このまま生成）

```text
Japanese legal-study infographic. Wide 16:9. Warm off-white. One horizontal flow, left to right, then one lower branch. Huge Japanese gothic type. Thick arrows. Lots of gap between boxes. No bottom cards. No answer banner. No guide mascot. No English. No logo. No watermark.

Title, one question only:
示さない契約。過失の相手方は、代理人に請求できる？

Left box. Small turtle, green shell, friendly, reference pose task_turtle.png. Role label under the turtle, not a name tag:
代理人（本人のためにすることを示さない）

One thick arrow to the right. The arrow words sit in the gap, once:
本人に効力が生ずる（504条本文）
Under that arrow, one short line only, and nowhere else:
知っていても、過失で知らなくても

Right box at the end of that arrow. Small round yellow bird, friendly, reference pose pitchi.png. Role label under the bird:
本人（効力を受ける）

From the left box, one lower branch only. Two outcome boxes. Do not repeat the sentence about effect against the principal.

Upper outcome, plain box, no character:
知らなかった相手方。自分の過失ではない
Arrow word in the gap:
代理人に履行を請求できる（504条ただし書）

Lower outcome. Small skull character in a dark hood, reference pose kachadokuro.png. Bad-side role, not a hero. Role label under the character:
相手方（自分の過失で知らなかった）
Arrow word in the gap, once:
代理人に履行を請求できない

Do not draw a choice between the principal and the agent. Do not write 顕名. Do not cover arrows or role labels with the characters. Do not put the same sentence on the title, the main arrow, and the lower branch.
```

## 目視チェック

- [ ] 本文の矢印は、知っていても、過失で知らなくても、本人に効力が生ずる
- [ ] 過失が、本人への効力の条件になっていない
- [ ] ただし書で請求できるのは、知らなかった相手方で、自分の過失ではない者
- [ ] 自分の過失で知らなかった相手方は、代理人に履行を請求できない
- [ ] 本人への効力の文が、下の枝に繰り返されていない
- [ ] 選択の話が描かれていない
- [ ] 案内役・答え帯・底部カードがない
- [ ] 文字が矢印や役割ラベルと重なっていない
