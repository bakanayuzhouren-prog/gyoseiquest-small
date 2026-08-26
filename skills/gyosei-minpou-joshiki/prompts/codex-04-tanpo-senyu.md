# Codex用 — 担保と占有改定（○／×）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/tanpo-senyu.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/07-tanpo-bukken.md`

## 法律（守る）

- 即時取得: 占有改定 **×**（最判昭35.2.11）。指図による占有移転 **○**。外観上の変更。
- 留置権: 自分で留置。占有を失うと消滅（302条）。図で「占有改定で留置権設定○」と書かない。
- 動産先取特権: 第三者に渡ると行使できない（333条）。占有改定でも引渡し（大判大6.7.26）。「333は改定×」と書かない（それは192条）。
- 質権: 占有改定 **×**（345条）。
- 譲渡担保: 占有改定 **○**。機械を使いながら。
- 333条に昭32・昭35を付けない。

## 禁止

- GO と YES を論点に混在させない（○×は可。GOバッジは置かない）
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- くま化しない

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 担保と占有 — 改定○ / 改定× |
| 中央メタファー | 左＝工場の機械（使いながら）／右＝ほっぺたを握り合う二人（留置） |
| 判断軸 | 外観が変わるか。自分で握るか。公示がない動産は第三者に渡ったら追えぬ。 |
| ひっかけ | 192と333を混ぜる／質権と譲渡担保／留置を人に渡す |
| 暗記 | 178・333・譲渡担保は○。192と質権は×。留置は渡すな。 |
| 配置 | minpou-joshiki/tanpo-senyu.png |

## 役割

- 左: **工場主（機械を使い続けたい）**
- 右: **修理人（代金までバイクを離さない）**

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP badges. Do not mix GO and YES. ○× OK.
- Never write「だれが」.

Title:「担保と占有 — 改定○ / 改定×」
Chip:「192 ≠ 333」

Center: split metaphor.
Left: factory machine still running, small tag 譲渡担保・改定○. Label「工場主（機械を使い続けたい）」.
Right: two people pinching each other's cheeks (留置の同時履行イメージ). Label「修理人（代金まで離さない）」.

Left 論点:
1. 即時取得。占有改定は？ → × 指図は○（192条）
2. 留置権の本質は？ → 自分で握る。渡すな（302条）
3. 動産先取特権。第三者に改定で渡したら？ → 行使できない（333条）
4. 質権の改定は？ → ×（345条）
5. 使いながら担保は？ → 譲渡担保＋改定○

Right ひっかけ:
- 即時取得も改定で足りる
- 333条は改定が引渡しに含まれない
- 質権を工場に置いたまま設定できる
- 留置物を友人に預けても残る
- 昭32を333条に付ける

Bottom:
- 判断軸:「外観が変わるか。自分で握るか。公示がない動産は第三者に渡ったら追えぬ」
- ひっかけ:「192と333を混ぜるな。質権≠譲渡担保」
- 暗記:「178・333・譲渡担保は○。192と質権は×。留置は渡すな」
Answer capsule:
「機械を使いながらなら占有改定で譲渡担保。質権は不可。」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot.
```
