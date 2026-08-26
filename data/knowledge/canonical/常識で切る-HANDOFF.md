---
id: canonical/joshiki-handoff
title: 常識で切る — 知識の受け渡し
type: canonical
validationStatus: ok
updated: 2026-08-25
---

# 常識で切る — 知識の受け渡し

てらしぃが口頭で足す論点の正本は科目フォルダに分ける。`quiz/` `learn/` は触らない。

| 科目 | 正本フォルダ | スキル | 画像 |
|------|-------------|--------|------|
| 民法 | `data/knowledge/canonical/minpou-joshiki/` | `skills/gyosei-minpou-joshiki/` | `assets/images/deepdive/minpou-joshiki/` |
| 行政法 | `data/knowledge/canonical/行政法/` | `skills/gyosei-gyoseihou-joshiki/` | `assets/images/deepdive/行政法/` |

流れは同じ: 口頭 → 正本MD →「まとめて」→ Codexプロンプト → 画像 → Cursorがアプリへ。

---

## 民法（いまある論点）

詳細は各MD。暗記一行だけここに残す。

| ID | 論点 | 暗記 |
|----|------|------|
| 01 | 危険負担 | 渡す前は売主。渡したあと（受領遅滞含む）は買主 |
| 02 | 借家全焼 | 全部不能なら当然終了。家賃は払わない。穴は損害賠償 |
| 03 | 窓割り | 襲われた人は無責任。家主は暴漢へ（720条1項＝正当防衛） |
| 04 | 保証人指名 | 指名なら450の資力・能力・交代は問わない |
| 05 | 認知の遡及 | 出生時まで遡る。第三者の既得権は害さない |
| 06 | 賃貸人たる地位 | 承諾不要。賃料請求には丙の所有権移転登記 |
| 07 | 担保・占有改定 | 178・333・譲渡担保○／192・質権×。留置は渡すな。集合物は種類・場所・量 |
| 08 | 嫡出・再婚禁止 | 100日超が違憲。733削除。再婚後は新夫。否認は父・子・母 |
| 09 | 取引上の社会通念 | 415は責め。562は約束（本文に文言なし）。400は注意の厚さ |

画像キー済: `ie-ga-kowareta` `hoshonin-ninchi` `shakai-tsunen`  
PNGあり・learn未配線あり得る: `chintainin-chii` `tanpo-senyu` `shugobutsu` `chakushutsu`

---

## 行政法

正本: `data/knowledge/canonical/行政法/`  
論点はてらしぃが口頭で渡した都度、同フォルダに `NN-slug.md` を足し、`INDEX.md` に1行。

| ID | 論点 | 暗記 |
|----|------|------|
| 01 | 第三者参加・職権証拠・準用・執行停止対比 | 22も24も職権・申立て可。**22は当事者訴訟に乗らない／その他抗告には乗る。24は両方。** 25執行停止は申立て必須・職権不可 |

Codex: `codex-01-sanka-shokken.md`（3コマ）＋ **`codex-01-junyo.md`（準用専用）**  
配置: `行政法/01-PLACEMENT.md`＋`src/joshikiDeepdiveImageMap.ts`  
アプリ: learn／bonus 配線済。**PNG＋`generateDeepdiveImages.js` 待ち**

コマ分割: 長い論点は2〜4枚。各コマに別プロンプト（`gyosei-image-style`）。
