# Codex用プロンプト（行政事件訴訟法・処分性／訴訟類型）

Cursor がプロンプトを置く場所。Codex は **「画像生成して」** で未生成だけ古い順に作る。配置・マップは Cursor。

**未生成確認**: `npm run list:codex-images-pending -- --folder gyosho`

**配置先**: `assets/images/deepdive/gyosho/`  
**キー**: `[[image:gyosho/<slug>]]`

## 生成順

1. 先に **01** だけ。型OKなら **02→05**。
2. 一括時も番号順。同時生成しない。

| # | ファイル | 仕事 | 保存 |
|---|---------|------|------|
| 01 | `codex-gyosho-01-tojisha-vs-soten.md` | 当事者訴訟 vs 争点訴訟・ガクト | `tojisha-vs-soten.png` |
| 02 | `codex-gyosho-02-shobunsei-jorei-suidou.md` | 条例・水道・同意・勧告・用途地域 | `shobunsei-jorei-suidou.png` |
| 03 | `codex-gyosho-03-shikko-teishi-3types.md` | 執行停止3類型（効力／執行／手続） | `shikko-teishi-3types.png` |
| 04 | `codex-gyosho-04-shikko-teishi-shokken-hikaku.md` | 行服↔行訴職権比較・総理異議 | `shikko-teishi-shokken-hikaku.png` |
| 05 | `codex-gyosho-05-daisansha-kou-junyo.md` | 第三者効・拘束力の準用 | `daisansha-kou-junyo.png` |

## 共通禁止

ふくろう必須禁止・全文転載禁止・アプリ埋め込みは Cursor・ひっかけを緑GOにしない。
