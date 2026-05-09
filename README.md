# 帯屋町だんご LP

高知県高知市帯屋町1丁目のだんご専門店『帯屋町だんご』のオフィシャルサイトです。
Vite + React + TypeScript + Tailwind CSS で実装し、Firebase Hosting にデプロイします。

## 構成

| 項目 | 内容 |
| --- | --- |
| フレームワーク | Vite + React 18 + TypeScript |
| スタイリング | Tailwind CSS 3 |
| デプロイ先 | Firebase Hosting |
| バージョン管理 | GitHub |
| 想定ホスト | `https://obiyamachi-dango-lp.web.app/` |

## 含まれるセクション

- ヒーロー（気軽に、ちゃんと美味しい。）
- 私たちについて (about)
- お品書き (menu)
- ギャラリー (gallery)
- お知らせ (news)
- アクセス (access)
- お問い合わせフォーム (contact / mailto形式)
- フッター

OGP / Twitter Card / JSON-LD（LocalBusiness）の構造化データを `index.html` に組み込んでいます。

---

## クイックスタート（推奨）

GitHub リポジトリ作成 → Firebase プロジェクト作成 → デプロイまで自動で実行します。

```bash
cd "/Users/mkagiyama/Documents/Claude/Projects/だんご屋の立ち上げ/obiyamachi-dango-lp"
chmod +x setup.sh
./setup.sh
```

事前に以下が必要です:
- Node.js 18+
- GitHub CLI (`brew install gh`)
- Firebase CLI (`npm install -g firebase-tools`)

---

## 手動セットアップ

### 1. ローカルで動作確認

```bash
npm install
npm run dev
```

ブラウザに表示された URL を開いてください。

### 2. GitHub リポジトリの作成

```bash
git init -b main
git add .
git commit -m "Initial commit: 帯屋町だんご LP"

# GitHub CLI でリポジトリ作成（パブリックの場合）
gh repo create obiyamachi-dango-lp --public --source=. --remote=origin --push
```

### 3. Firebase プロジェクトの作成

```bash
# 初回のみログイン
firebase login

# プロジェクトを作成
firebase projects:create obiyamachi-dango-lp --display-name "帯屋町だんご LP"

# .firebaserc のプロジェクトIDを更新（または firebase use --add）
```

`.firebaserc` を以下のように編集:

```json
{
  "projects": {
    "default": "obiyamachi-dango-lp"
  }
}
```

### 4. デプロイ

```bash
npm run deploy
```

成功するとデプロイ先 URL（`https://obiyamachi-dango-lp.web.app/`）が表示されます。

---

## カスタマイズ箇所

| ファイル | 内容 |
| --- | --- |
| `src/App.tsx` | 全セクションの中身（メニュー / お知らせ / お問い合わせ等） |
| `src/App.tsx` 内 `CONTACT_EMAIL` | お問い合わせフォームの送信先メールアドレス |
| `src/App.tsx` 内 `newsItems` | お知らせ欄の内容 |
| `index.html` | タイトル / メタタグ / OGP / 構造化データ |
| `public/images/` | LP に表示する画像（同名で差し替え可能） |
| `public/ogp.png` | SNS シェア時の OGP 画像（1200×630 推奨） |

## 画像差し替え

```txt
public/images/
  hero-dango.png             # ヒーロー
  plate-wagashi.png          # 私たちについて
  packaged-dango.png         # お品書き
  gift-box.png               # ギフト箱
  gallery-dango-dark.png     # ギャラリー1
  gallery-packaged-dango.png # ギャラリー2
  gallery-wagashi-plate.png  # ギャラリー3
  gallery-gift-box.png       # ギャラリー4
  storefront.png             # 店舗外観
```

実物の写真ができたら、同じファイル名で差し替えるだけで反映されます。

## 今後の拡張

- Firestore + Firebase Auth でお知らせ・メニューを管理画面化
- Firebase Functions でお問い合わせフォームをサーバー送信化（reCAPTCHA 等のスパム対策追加）
- Cloud Storage で画像アップロード対応
- Stripe 等を使ったオンライン注文/予約

## ライセンス

© Obiyamachi Dango. All Rights Reserved.
