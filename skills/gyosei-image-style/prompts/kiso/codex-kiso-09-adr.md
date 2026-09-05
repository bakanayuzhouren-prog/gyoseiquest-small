# Codex用 — ADR4（調停・和解・仲裁・あっせん）

01 型OK後に1枚。法源・裁判所は載せない。

- 保存先: `assets/images/deepdive/learn/kiso/adr-4.png`
- 画像キー: `learn/kiso/adr-4`

## 法律の芯（崩すな）

| ADR | 切り方 |
|------|--------|
| 調停 | 原則 **裁判官1＋委員2人以上**。相当なら裁判官だけ可 |
| 和解 | **互譲**（民法695条）。定義の本丸は互譲。「新しい法律関係を契約で設定」は性質論（創設的効力）。更改と混ぜない |
| 仲裁 | 第三者が**判断**。当事者が選ぶ。仲介ではない |
| あっせん | 仲介。**民間人に限らない** |

**書かない**: あっせん＝民間人のみ。和解の芯＝創設的効力。調停は必ず委員がいる／必ず裁判官だけ。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 判断する仲裁 / 譲り合う和解 |
| 中央メタファー | 4つの窓口（互譲・仲介・委員会・判断） |
| 判断軸 | 判断か仲介か互譲か。調停の人数 |
| ひっかけ | あっせん＝民間人のみ／和解＝新しい契約が定義 |
| 暗記 | 和解は互譲（695条）。仲裁は判断。あっせんは民間限定ではない |
| 役割 | 当事者（互いに譲りたい）／第三者（判断または仲介） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: Four ADR types — 調停・和解・仲裁・あっせん.
Learning goal: 和解 = 互譲 (695). 仲裁 = third-party judgment. あっせん is not civilians-only. 調停 = judge + 2+ commissioners (judge-only OK if appropriate).

Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center metaphor,
bottom 判断軸 / ひっかけ / 暗記, warm off-white, large Japanese, 16:9.

STRICT: Left「論点」Q&A (no GO/STOP). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.
Labels: Left「当事者（互いに譲りたい）」Right「第三者（判断または仲介）」

Title:「ADR4 — 判断か互譲か仲介か」
Chip:「和解の芯は互譲」

Center ONLY: four service windows in one row (not a second scene):
1 和解: two people bowing, stamp「互譲（695条）」
2 あっせん: a helper in the middle (not labeled 民間人のみ)
3 調停: 1 judge + 2 commissioners (tiny note: 相当なら裁判官だけ可)
4 仲裁: a third person raising a gavel「判断」
Do not add 条理 or 裁判所系統図.

Left 論点:
1. 和解の定義は？ → 互譲（695条）
2. 仲裁は？ → 第三者が判断
3. あっせんは民間人だけ？ → NO
4. 調停の原則は？ → 裁判官1＋委員2人以上

Right ひっかけ:
- あっせんは民間人に限る
- 和解＝新しい法律関係を設定することが定義
- 調停は必ず委員が要る／必ず裁判官だけ
- 仲裁は仲介と同じ

Bottom:
- 判断軸:「判断か仲介か互譲か。調停の人数」
- ひっかけ:「あっせん＝民間人のみ／和解＝創設が定義」
- 暗記:「和解は互譲。仲裁は判断。あっせんは民間限定ではない」
Answer:「和解は互譲（695条）。仲裁は判断。調停は裁判官1＋委員2人以上が原則。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png.
Not bear/owl/cat. No nameplate.
```
