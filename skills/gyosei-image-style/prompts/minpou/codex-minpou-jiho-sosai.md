# 時効完成前の相殺と差押え後の相殺

- 保存先: assets/images/deepdive/learn/minnpou/jiho-sosai.png
- 画像キー: learn/minnpou/jiho-sosai
- 生成は Codex。Cursor は描かない。
- 根拠: 民法508条、511条。完成後承認の援用制限は判例。図では508・511を主にする。

## PRE-GENERATE-CHECK

- 508条: 時効が完成した債権を自働債権としても、その完成前に相殺適状にあったときは相殺できる。
- 511条: 差押え後に取得した債権を自働債権とする相殺は、原則制限（ただし差押え前の原因等の例外は条文。図は原則を大きく）。
- 向き: 自働債権＝相殺する側が持つ債権。受働債権＝差し押えられた側の債権、と短く。
- 禁止: 時効完成後は一切相殺不可。差押え後取得でも自由に相殺。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 508条と511条.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「完成前に向き合ったか」
Chip:「508条・511条」

Left heading 論点:
完成後の債権で相殺は？ → 完成前に相殺適状なら可（508条）
差押え後に買った債権は？ → 原則として相殺に使えない（511条）
自働債権は？ → 相殺を主張する側の債権
完成後の承認は？ → 援用が信義則上制限される場合がある（別論点）

Right heading ひっかけ:
時効完成後は一切相殺できない
差押え後に取得した債権でも自由に相殺できる
自働と受働の向きを逆にする
508条は差押えの条文

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 条 | 場面 | 結論
Rows:
508条 | 自働債権の時効が完成 | 完成前に相殺適状にあれば相殺できる
511条 | 差押え後に取得した債権を自働債権にする | 原則として相殺できない
向き | 自働＝主張する側が持つ債権 | 受働＝相手の債権
Caption:「更新・完成猶予・援用の総論は詰めない」

Roles: 相殺を主張する者（自働債権を使う）／差押債権者（511条で守る）. Never だれが.

Bottom:
- 判断軸:「完成前に相殺適状だったか。差押えの前後か」
- ひっかけ:「完成後は常に不可。差押え後取得でも自由」
- 暗記:「508は完成前の向き合い。511は差押え後取得が原則不可」
Answer:「時効が完成した債権でも、完成前に相殺適状にあれば相殺できる。差押え後に取得した債権を自働債権とする相殺は、原則としてできない。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks..
```
