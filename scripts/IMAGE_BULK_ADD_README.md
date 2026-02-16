# 画像一括追加スクリプト

## 概要
大量の画像を効率的に追加するための自動化スクリプトです。

## 使い方

### 1. 画像を準備
```bash
# temp_images フォルダを作成
mkdir temp_images

# 追加したい画像をすべて temp_images に配置
# 例: temp_images/case_001.png, temp_images/case_002.png ...
```

### 2. 画像をコピー＆マップに追加
```bash
node scripts/addImages.js
```

このスクリプトは以下を自動で行います:
- `temp_images/` から `assets/images/` へ画像をコピー
- `IMAGE_RESOURCES_MAP` に画像エントリを自動追加（重複チェック付き）

### 3. マッピングファイルを編集
```bash
# scripts/image_mappings.json を編集
# 各画像をどの事件/項目に関連付けるか定義
```

**image_mappings.json の例:**
```json
[
  {
    "searchText": "戸別訪問禁止事件",
    "imageName": "door_to_door_4panel",
    "position": "start",
    "comment": "説明の最初に4コマ漫画を追加"
  },
  {
    "searchText": "マクリーン事件",
    "imageName": "mclean_case",
    "position": "start"
  }
]
```

**フィールド説明:**
- `searchText`: questions.js で検索する事件名/タイトル（chunksのtitle）
- `imageName`: 画像ファイル名（拡張子なし）
- `position`: 挿入位置（`start` = 説明の最初, `end` = 説明の最後）
- `comment`: メモ（オプション）

### 4. questions.jsに画像タグを追加
```bash
node scripts/addImageTags.js
```

このスクリプトは:
- `questions.js` のバックアップを自動作成（`.backup`）
- マッピングに基づいて `[[image:...]]` タグを追加
- 重複チェック（既にタグがある場合はスキップ）

### 5. 確認
ブラウザをリロード（Ctrl+Shift+R）して、各ページで画像が表示されることを確認

## ファイル構成
```
scripts/
  ├── addImages.js         # 画像コピー＆マップ追加
  ├── addImageTags.js      # questions.jsにタグ追加
  └── image_mappings.json  # マッピング設定
temp_images/               # 画像の一時置き場（手動作成）
assets/images/             # 画像の配置先（自動）
```

## 注意事項
- 画像ファイル名は英数字とアンダースコアのみ推奨
- 大きな画像は事前に圧縮してください（Web用に最適化）
- `questions.js` は自動バックアップされますが、念のため手動バックアップも推奨
- サポート画像形式: PNG, JPG, JPEG, WebP

## トラブルシューティング

### 画像が表示されない
1. ブラウザのハードリロード（Ctrl+Shift+R）を試す
2. 開発サーバーを再起動 (`npm run web`)
3. ブラウザのコンソール（F12）でエラーを確認

### タグが追加されない
1. `image_mappings.json` の `searchText` が正確か確認
2. バックアップファイルから復元して再実行
3. エラーメッセージを確認

## 例: 10個の画像を一括追加
```bash
# 1. 画像を準備
cp case_*.png temp_images/

# 2. 画像をコピー＆マップ追加
node scripts/addImages.js

# 3. マッピングを編集
code scripts/image_mappings.json

# 4. タグを追加
node scripts/addImageTags.js

# 5. 確認
# ブラウザでCtrl+Shift+Rしてリロード
```
