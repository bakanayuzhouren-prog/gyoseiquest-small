# 国賠・赤色灯標柱（時間的余裕）

- 保存先: assets/images/deepdive/learn/kokubai/akairo-yoyu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 既存表 `2jo-nashi` は横断。この枚は昭50.6.26の事件図。高知落石（昭45.8.20）と故障車87時間（昭50.7.25）を混在させない。

配置（生成後・Cursor）: ピン `road_defect_liability`（赤色灯）の関連画像。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: 最判昭50.6.26。正本 `data/knowledge/learn/国家賠償法/a057.md`。e-Gov 国賠2条1項。

- 工事標識板・バリケード・赤色灯標柱が夜間に先行車により転倒した。
- 転倒から事故までが直前で、管理者が遅滞なく原状に復することが時間的に不可能なら、管理の瑕疵はない。
- 転倒した＝直ちに瑕疵、ではない。
- 禁止: 切る／切れない。高知を瑕疵×にしない。故障車87時間をこの枚の○にしない。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE case: 赤色灯標柱（最判昭50.6.26）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「赤色灯が倒れた直後は、時間的余裕がなければ瑕疵なし」
Chip:「国賠2条1項。原状回復が時間的に不可能か」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
枠は？ → 2条
倒れた＝瑕疵？ → NO
時間的余裕なし？ → 瑕疵なし
過失は要る？ → NO（瑕疵の有無）

Right panel heading ひっかけ:
標識が倒れた＝直ちに瑕疵
穴がある＝昭45.8.20（高知落石）と同じ
故障車87時間放置と同じ結論
道路管理者に時間的余裕があっても瑕疵なし

Center metaphor: fallen red warning lamp on a night road, clock labeled 直後. Labels: 道路管理者（原状回復したい）／通行者（瑕疵を主張）. Small stamp 瑕疵なし.

Bottom three cards:
判断軸: 通常有すべき安全性を、原状回復の時間的余裕で見る（国賠2条1項）
ひっかけ: 転倒の事実だけで瑕疵にしない。高知・故障車と日付を混ぜない
暗記: 直前転倒で回復不能なら瑕疵なし（昭50.6.26）

Answer bar EXACT:
「赤色灯が倒れた直後でも、原状回復の時間的余裕がなければ管理の瑕疵はない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
Table row zebra if any table: first data row white, second light gray.
```

## 生成後チェック

- [ ] 結論は瑕疵なし
- [ ] 日付は昭50.6.26
- [ ] 高知・故障車がこの枚の結論になっていない
