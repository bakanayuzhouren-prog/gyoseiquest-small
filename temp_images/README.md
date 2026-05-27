# temp_images — 深掘り画像の作業用ステージング

アプリは **直接参照しません**。ここに置いた PNG を sync スクリプトで `assets/images/deepdive/` へコピーし、`npm run generate:deepdive-images` で反映します。

## 構成

```
temp_images/
├── learn/                      # 見て聞いて覚える
│   ├── kenpou/                 # 憲法  N-230.png
│   ├── minnpou/bukken/         # 民法物権  N-110.png
│   └── saikensouron/           # 債権総論  N-76.png
└── quiz/                       # 問題を解く
    ├── kakuronn/               # 債権各論  kakuronnN-M-C.png
    ├── bukken/                 # 物権（クイズ用）
    ├── gyouseihou/             # 行政法各論
    │   ├── gyoushin/
    │   ├── kokubai/
    │   ├── sougou/
    │   ├── gyoute/
    │   ├── gyouso/
    │   └── chihoujitihou/
    └── sousoku/                # 民法総則（クイズ用）
```

## よく使う sync

| コマンド | コピー元 → 先 |
|---|---|
| `npm run sync:kenpou-deepdive` | `learn/kenpou/` → `assets/images/deepdive/kenpou/` |
| `npm run sync:saikensouron-images` | `learn/saikensouron/` → `deepdive/learn/saikensouron/` |
| `npm run sync:quiz-deepdive` | `quiz/*/` → `assets/images/deepdive/*/`（kakuronn, bukken, gyouseihou 等） |

## 命名の目安

- **learn/kenpou**: `{問番号}-230.png`（例: `4-230.png`）
- **learn/minnpou/bukken**: `{問番号}-110.png`
- **learn/saikensouron**: `{問番号}-76.png`
- **quiz/kakuronn**: `kakuronn{N}-{全問数}-{肢}.png`
- **quiz/gyouseihou/kokubai**: `{全問数}-{問番号}-{肢}.png` または `{問番号}-{総行数}.png`（learn）
