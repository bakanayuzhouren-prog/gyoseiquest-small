# Codex用 — 行訴法（01）当事者訴訟 vs 争点訴訟

- 保存先: `assets/images/deepdive/gyosho/tojisha-vs-soten.png`
- 画像キー: `gyosho/tojisha-vs-soten`
- 比較: 行訴4条当事者訴訟 ↔ 45条争点訴訟／暗記「額＝当事者（ガクト）」

## 法律の芯（崩すな）

### A. 当事者訴訟（4条）

| | 内容 |
|---|---|
| **形式的** | 法令で「当事者の一方を被告」と定めた確認・形成処分／裁決の争い |
| **実質的** | **公法上の法律関係**に関する訴訟（確認・給付） |
| 例 | 公務員の**地位確認**／**給与を払え**／損失補償の**額** |
| 被告 | 法律関係の**相手方**（国・公共団体）。11条は乗らない |
| 出訴期間 | 原則なし（抗告の6か月と混ぜない） |

**ガクト暗記** **額**を求める（補償額・給与など）→ **当事者訴訟**。

### B. 争点訴訟（45条）

| | 内容 |
|---|---|
| 本質 | **私法上の訴え**の中で、処分・裁決の**効力が争点**になる訴訟 |
| 例 | 収用裁決後・出訴せず → 起業者と**所有権確認**（民事）。裁決の効力が争点 |
| 被告 | **私法上の相手**（収用なら**起業者**） |
| 関係 | 無効確認の補充性（36条）で「現在の法律関係の訴えで足りる」なら無効確認は落ち、**争点訴訟**へ |

### C. 棚の切り方

| | 当事者訴訟 | 争点訴訟 | 抗告訴訟 |
|---|---|---|---|
| 何を叩く | **公法関係**そのもの | 民事＋処分効力が**争点** | **処分**そのもの |
| 額・地位 | **○**（ガクト） | 所有権確認など | ×（取消・無効等） |

**書かない**: 争点訴訟＝当事者訴訟の別名／額請求＝抗告／争点の被告＝国（収用では起業者）。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 当事者訴訟と争点訴訟. Hero is 額を求めるのは当事者訴訟.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「公務員（地位と給与を求める）」Right「元所有者（所有権確認を求める）」

Title:「額は当事者、所有権確認は争点」
Chip:「4条・45条」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: | 当事者訴訟（4条） | 争点訴訟（45条）
Rows:
何を争うか | 公法上の法律関係そのもの | 私法上の訴えの中で処分・裁決の効力
例 | 地位確認、給与、損失補償の額 | 収用後の所有権確認
被告 | 法律関係の相手方 | 私法上の相手（収用では起業者）
Caption:「無効確認の補充性で現在の法律関係の訴えで足りるときは、争点訴訟へ進む」

Left 論点:
1. 額を求めるのは？ → 当事者訴訟
2. 争点訴訟は当事者訴訟の別名か？ → NO
3. 収用後の所有権確認の被告は国か？ → NO

Right ひっかけ:
- 争点訴訟は当事者訴訟の別称である
- 補償額と給与は取消訴訟で求める
- 争点訴訟の被告は常に国である

Bottom:
- 判断軸:「公法関係そのものか、民事の中の効力か」
- ひっかけ:「額を抗告訴訟にする。争点の被告を国にする」
- 暗記:「額は当事者訴訟。所有権確認は争点訴訟。被告は起業者」
Answer:「損失補償の額や給与は当事者訴訟で争う。収用裁決後の所有権確認は争点訴訟であり、被告は起業者である。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right, 指し棒 to 額. Cream face, independent pale-sky-blue smiling hat, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. No logos or watermarks.
```

## 目視チェック

- [ ] 争点訴訟を当事者訴訟と同一視していない
- [ ] 収用争点の被告を国にしていない
- [ ] ガクト＝額→当事者になっている
