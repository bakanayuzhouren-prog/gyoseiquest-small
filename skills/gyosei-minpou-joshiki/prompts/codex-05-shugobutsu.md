# Codex用 — 集合物譲渡担保（豚・カップ麺）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/shugobutsu.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/07-tanpo-bukken.md`  
判例: 最判昭62.11.10（種類・場所・量的範囲。後から入った構成部分にも効力。最初の占有改定で足りる）

## 法律（守る）

- 中身が入れ替わっても、種類・場所・量的範囲で特定されていれば**一個の集合物**。
- 後から入った在庫・豚にも効力が及ぶ。搬入のたびに占有改定は不要。
- 図に「入れ替わるから特定できない」「新しい個体ごとに引渡し」と書かない。
- てらしぃメタファー必須: 養豚所の豚／カップラーメン。味・種類は同じ、個体は変わる。

## 禁止

- GO と YES 混在禁止
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- くま化しない

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 集合物 — 個体は変わる / 枠は同じ |
| 中央メタファー | 豚舎の枠＋カップ麺の箱。個体が出入り |
| 判断軸 | 種類・場所・量的範囲。枠が同じなら一個 |
| ひっかけ | 入れ替わるから無効／搬入のたび改定 |
| 暗記 | 豚もカップ麺も枠で見る。種類・場所・量。 |
| 配置 | minpou-joshiki/shugobutsu.png |

## 役割

- 左: **養豚業者（出荷しつつ借りたい）**
- 右: **債権者（枠ごと担保に取りたい）**

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
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.

Title:「集合物 — 個体は変わる / 枠は同じ」
Chip:「種類・場所・量的範囲」

Center metaphor: a pig pen as a labeled frame (種類＝豚、場所＝この養豚所、量＝場内の全部). Individual pigs walk out to market and new pigs walk in. Beside it a box of cup noodles whose cups change but flavor label stays the same.
Labels:
「養豚業者（出荷しつつ借りたい）」
「債権者（枠ごと担保に取りたい）」

Left 論点:
1. 中身が入れ替わる集合物にできる？ → YES（最判昭62.11.10）
2. 特定に要る3つは？ → 種類・場所・量的範囲
3. 新しい豚に改めて占有改定？ → 不要
4. カップ麺の芯は？ → 個体は変わる。味（種類）は同じ

Right ひっかけ:
- 入れ替わるから特定できず無効
- 搬入のたびに占有改定が要る
- 質権で工場の機械を置いたまま（それは個別物・345条）
- 種類だけ指定すれば足りる

Bottom:
- 判断軸:「枠（種類・場所・量）が同じなら一個の集合物。個体の入れ替わりは織り込み済み」
- ひっかけ:「入れ替わるから無効／新しい個体ごとに改定」
- 暗記:「豚もカップ麺も枠で見る。種類・場所・量」
Answer capsule:
「種類・場所・量的範囲を指定すれば、入れ替わっても一個の集合物。最初の占有改定で足りる。」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot, graphic slaughter.
```
