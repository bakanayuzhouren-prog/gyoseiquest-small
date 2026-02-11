# Google Sheets 連携セットアップガイド

## 📋 概要
このガイドでは、Google Sheetsから問題データを自動取得する機能のセットアップ方法を説明します。

## 🔑 1. Google Sheets API キーの取得

### 手順

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/ を開く

2. **プロジェクトを作成（または選択）**
   - 画面上部の「プロジェクトを選択」をクリック
   - 「新しいプロジェクト」をクリック
   - プロジェクト名を入力（例: `gyosei-quest-sheets`）
   - 「作成」をクリック

3. **Google Sheets APIを有効化**
   - 左側のメニューから「APIとサービス」→「ライブラリ」を選択
   - 検索ボックスに「Google Sheets API」と入力
   - 「Google Sheets API」をクリック
   - 「有効にする」ボタンをクリック

4. **APIキーを作成**
   - 左側のメニューから「APIとサービス」→「認証情報」を選択
   - 上部の「認証情報を作成」をクリック
   - 「APIキー」を選択
   - 生成されたAPIキーをコピー（後で使用）

5. **APIキーを制限（推奨）**
   - 生成されたAPIキーの右側の編集アイコンをクリック
   - 「APIの制限」セクションで「キーを制限」を選択
   - 「Google Sheets API」にチェックを入れる
   - 「保存」をクリック

## ⚙️ 2. 環境変数の設定

1. **`.env`ファイルを作成**
   ```bash
   # プロジェクトのルートディレクトリで実行
   cp .env.example .env
   ```

2. **APIキーを設定**
   `.env`ファイルを開き、以下のように編集：
   ```env
   GOOGLE_SHEETS_API_KEY=ここに取得したAPIキーを貼り付け
   SPREADSHEET_ID=17InEROPXhPtGj7DmmwTHDlFliMirHd9bnpOJ7gBiixx
   SHEET_NAME=行政法 1（ここに全部入ってる）
   ```

## 📊 3. スプレッドシートの公開設定

スクリプトがデータを読み取れるよう、スプレッドシートを公開する必要があります。

1. Google Sheetsを開く
2. 右上の「共有」ボタンをクリック
3. 「リンクを知っている全員」に変更
4. 権限を「閲覧者」に設定
5. 「完了」をクリック

## 🚀 4. 使用方法

### データの同期

Google Sheetsからデータを取得するには、以下のコマンドを実行：

```bash
npm run sync:sheets
```

成功すると、以下のように表示されます：
```
🔄 Google Sheetsからデータを取得中...
✅ XXX行のデータを取得しました
✅ src/questions-from-sheets.json にデータを保存しました
📊 合計 XXX 問の問題を処理しました
```

### 自動同期（今後の拡張）

将来的には、以下のようにビルド前に自動同期することも可能：

```json
"scripts": {
  "dev": "npm run sync:sheets && expo start"
}
```

## 🔍 5. トラブルシューティング

### エラー: `API key not valid`
- `.env`ファイルにAPIキーが正しく設定されているか確認
- APIキーにスペースや改行が含まれていないか確認
- Google Cloud ConsoleでGoogle Sheets APIが有効化されているか確認

### エラー: `The caller does not have permission`
- スプレッドシートが公開されているか確認
- スプレッドシートIDが正しいか確認

### データが取得できない
- シート名が正しいか確認（`.env`の`SHEET_NAME`）
- スプレッドシートに実際にデータが存在するか確認

## 📝 6. データ形式

現在、以下の列を使用しています：
- **A列**: 問題文（`text`フィールド）
- **F列**: もっと深掘る（`explain`フィールド）

将来的には、選択肢（B〜E列など）も自動取得できるように拡張予定です。

## 🎯 次のステップ

1. APIキーを取得
2. `.env`ファイルを設定
3. `npm run sync:sheets`を実行
4. 生成された`src/questions-from-sheets.json`を確認

---

**注意**: `.env`ファイルは`.gitignore`に含まれているため、Gitにコミットされません。APIキーは安全に管理されます。
