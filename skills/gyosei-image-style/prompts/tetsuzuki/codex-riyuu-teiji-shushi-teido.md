# 理由提示｜趣旨と程度は別

てらしぃ依頼: 行手法の理由提示を、趣旨（なぜ示すか）と程度（どこまで書くか）の2棚で1枚にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/tetsuzuki/riyuu-teiji-shushi-teido.png`
配置: 見て聞いて覚える・行政手続法「判断の慎重と合理性…総合考慮」カードのもっと深掘る先頭。LEC公開2 問43 の多肢カードと共有可。

## スロット（新キャラはここだけ差し替え）

法律文はキャラ名に依存させない。陣営と役割を固定する。

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 名宛人 | いい役 | 名宛人（理由を知り不服申立てしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 理由なし庁 | 悪い役 | 条文番号だけ書いて足りると主張する行政庁 | キングカチャドクロ | `king_kachadokuro.png` ＋ `king_kachadokuro_sheet.png` |

## 法律（原典）

- 行手法14条1項: 不利益処分をするときは、同時にその名宛人に理由を示さなければならない。
- 趣旨（最判昭38.5.31）: 行政庁の判断の慎重と合理性を担保して恣意を抑制する。処分の理由を名宛人に知らせ、不服申立ての便宜を与える。
- 程度の先駆（最判昭60.1.22）: 一般旅券発給拒否。いかなる事実関係に基づきいかなる法規を適用したかを示すことが中核。総合考慮の定式（公表の有無を含む）はここに置かない。
- 程度の総合考慮（最判平23.6.7）: 一級建築士免許取消。14条1項本文によりどの程度の理由を提示すべきかは、根拠法令の規定内容、処分基準の存否及び内容並びに公表の有無、処分の性質及び内容、処分の原因となる事実関係の内容等を総合考慮して決まる。複雑な処分基準が公にされているときは適用関係の提示が要り得る。治癒（裁決で直る）の話は載せない。

図に出す表（程度の総合考慮。平23.6.7）:

| 考慮する事情（平23.6.7） |
|---|
| 根拠法令の規定内容 |
| 処分基準の存否及び内容並びに公表の有無 |
| 処分の性質及び内容 |
| 処分の原因となる事実関係の内容 |

「好評の有無」と書かない。「同程度」と書かない。

## PRE-GENERATE-CHECK

- 左パネル＝趣旨（昭38）。右パネル＝程度。総合考慮と公表の有無は平23.6.7。昭60.1.22は事実と法規の当てはめだけ。
- 表見出しは平23.6.7。4行。行背面は白／薄いグレー／白／薄いグレー。
- 暗記帯は「14条。趣旨は昭38。程度の総合考慮（公表の有無を含む）は平23.6.7。昭60は事実と法規の当てはめ」。
- GPT本文に「好評」「同程度」「条項だけで足りる」を正しい結論として書かない。
- 口語なし。スロットどおり。ちゃちゃロット1体。```text``` にブランド名なし。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `pitchi.png` ＋ `pitchi_sheet.png` ＋ `king_kachadokuro.png` ＋ `king_kachadokuro_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「理由提示｜趣旨と程度は別」
Small chip:「不利益処分は同時に理由を示す（行手法14条1項）」

LEFT panel, heading:「論点（趣旨）」
Do not mention 総合考慮 or 公表の有無 or 平23 in this panel.
Role under a small face: 名宛人（理由を知り不服申立てしたい）
Match ぴっちゅ: pitchi.png and pitchi_sheet.png. Good side.
Q&A only, YES or short words:
示す義務は？ → YES（14条1項）
判断の慎重と合理性は？ → YES
恣意を抑制する？ → YES
不服申立ての便宜は？ → YES
判例は → 最判昭38.5.31

RIGHT panel, heading:「論点（程度）」
Do not mention 恣意抑制 as the only test in this panel.
Role under a small face: 条文番号だけで足りると主張する行政庁
Match キングカチャドクロ: king_kachadokuro.png and king_kachadokuro_sheet.png. Bad side.
Q&A only:
根拠条項だけで足りる？ → NO
事実と法規の当てはめは？ → 要る（昭60.1.22）
総合考慮の判例は？ → 最判平23.6.7
何を総合考慮する？ → 根拠法令、基準の存否内容、公表の有無、性質及び内容、事実関係
公表された複雑な基準では？ → 適用関係の提示が要り得る

CENTER: one paper labeled 不利益処分の通知
Navy arrow from the administrative office to the addressee:「同時に理由（14条1項）」
Caption under the scene, readable, no overlap:
「趣旨はなぜ示すか。程度はどこまで書くか。公表の有無を含む総合考慮は平23.6.7。棚を混ぜない」

SMALL TABLE under the caption, navy header, 4 data rows. Zebra by ROW: white, light gray, white, light gray. Never column zebra.
列: 程度で総合考慮する事情（平23.6.7）
行1: 根拠法令の規定内容
行2: 処分基準の存否及び内容並びに公表の有無
行3: 処分の性質及び内容
行4: 処分の原因となる事実関係の内容

BOTTOM strip, three cards:
判断軸「趣旨＝慎重と合理性・恣意抑制・不服の便宜（昭38）。程度の当てはめは昭60。総合考慮（公表の有無を含む）は平23.6.7」
ひっかけ「条項番号だけで足りる／好評の有無／同程度で足りる／総合考慮を昭60にする／趣旨と程度を同じ一文で片付ける／聴聞を省略したら理由も不要」
暗記「14条。趣旨は昭38。事実と法規の当てはめは昭60。公表の有無を含む総合考慮は平23.6.7」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, table, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```
