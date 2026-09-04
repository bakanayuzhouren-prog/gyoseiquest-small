# 監査三本 — 誰が誰に何をいつ

- 保存先: assets/images/deepdive/learn/jichi/kansa-3shu-hikaku.png
- 画像キー: learn/jichi/kansa-3shu-hikaku
- 生成は Codex。Cursor は描かない。

元表の行順は使わない。列は「誰が／宛先／対象／期間／次」。

## 法律の芯（崩すな）

- 事務監査請求: 選挙権を有する者の総数の50分の1以上の連署。監査委員。事務全般。財務に限らない。法定期間なし。
- 住民監査請求: 住民1人。法人も住民となり得る。監査委員。違法・不当な財務会計上の行為又は怠る事実。原則1年。正当な理由で例外。
- 住民訴訟: 住民監査請求をした住民。裁判所。違法な財務会計。前置。242条の2の30日。類型は差止め、取消し・無効確認、怠る事実の違法確認、損害賠償等を求めるよう請求する類型。

**書かない:** 伊藤塾。あぷし。事務監査を1人でできる。住民訴訟を監査なし。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 連署か一人か裁判所か |
| 中央 | 5列比較（行ゼブラ） |
| 判断軸 | 誰が・誰に・対象・期間・次 |
| ひっかけ | 事務監査は1人。住民訴訟に連署。期間を入れ替える |
| 暗記 | 50分の1は事務。1人は財務監査。訴訟は30日 |
| 役割 | 選挙権者（連署する）／住民（財務を正す） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: 地方自治の監査と住民訴訟. Who, to whom, what, when, next.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「連署か一人か裁判所か」
Chip:「75条・242条・242条の2」

Left heading 論点:
事務監査は誰？ → 選挙権者の50分の1以上
住民監査は何人？ → 1人で足りる
住民訴訟の宛先は？ → 裁判所
財務以外は？ → 事務監査だけ

Right heading ひっかけ:
事務監査は1人でできる
住民監査に50分の1が要る
住民訴訟は監査なしで提起できる
出訴期間は1年

Center ONLY: one table. Header navy. Row zebra (horizontal, NOT column colors): white / light gray alternating.
Columns: 判断軸 | 事務監査請求 | 住民監査請求 | 住民訴訟
Rows:
誰が | 選挙権者の50分の1以上の連署 | 住民1人（法人も可） | 監査をした住民
誰に | 監査委員 | 監査委員 | 裁判所
対象 | 事務全般（財務に限らない） | 違法・不当な財務会計又は怠る事実 | 違法な財務会計又は怠る事実
期間 | 法定なし | 原則1年（正当な理由で例外） | 242条の2の30日
次 | 監査 | 前置のあと訴訟 | 差止め・取消し等の4類型
Caption:「訴訟の類型は差止め、取消し・無効確認、怠る事実の違法確認、損害賠償等を求めるよう請求する類型」

Roles: 選挙権者（連署する）／住民（財務を正す）. Never だれが.

Bottom:
- 判断軸:「誰が・誰に・対象・期間・次」
- ひっかけ:「事務監査は1人。住民訴訟に連署。期間を入れ替える」
- 暗記:「50分の1は事務。1人は財務監査。訴訟は30日」
Answer:「事務監査請求は選挙権者の50分の1以上の連署により監査委員へ事務全般を請求する。住民訴訟は住民監査請求前置の30日である。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat, not ears. No nameplate. No brand letters.
No overlapping text. Large gothic Japanese.
```
