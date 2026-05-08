# 🎵 YT Tier Maker — セットアップガイド

## 必要なもの
- Node.js 18以上（https://nodejs.org/）

## セットアップ（初回のみ）

```bash
cd yt-tier-maker フォルダ
npm install
```

## 起動方法

### Mac / Linux
```bash
chmod +x start.sh
./start.sh
```

### Windows
```cmd
node server.js
```
→ ブラウザで http://localhost:3456 を開く

---

## 使い方

### 1. API キーを取得
1. https://console.cloud.google.com/ にアクセス
2. プロジェクトを作成（または選択）
3. 「APIとサービス」→「ライブラリ」→「YouTube Data API v3」を有効化
4. 「認証情報」→「APIキーを作成」
5. 制限：「HTTPリファラー」で `localhost:3456/*` を追加推奨

### 2. プレイリスト URL を貼る
- YouTube Music のプレイリストページのURLをそのまま貼ればOK
- 例: `https://music.youtube.com/playlist?list=PLxxxx`

### 3. ティア表を作る
- サイドバーの曲一覧から、曲のアイコンをティアにドラッグ＆ドロップ
- 曲アイコンをクリック → YouTube埋め込みで再生
- 右クリック → コンテキストメニュー
- 「♪ 音声のみ」ボタン → サーバー経由でオーディオストリーム再生

### 4. 保存・更新
- ティア表はブラウザに自動保存
- 「↺ 更新」ボタンで新しい曲を追加読み込み（既存のランクはそのまま）
- 「📋 コピー」でテキスト出力をクリップボードにコピー

---

## ティアの色変更
ティア名（SS, S, A...）をクリック → カラーパレットが表示

---

## 注意
- YouTube の利用規約上、音声ダウンロード・保存はNG
- 音声は「ストリーミング再生」のみ（ファイル保存不可）
- APIキーは自分だけが使う環境で管理してください
