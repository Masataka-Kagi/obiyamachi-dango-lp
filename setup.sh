#!/usr/bin/env bash
# 帯屋町だんご LP — GitHub & Firebase 自動セットアップスクリプト
#
# 使い方:
#   1. ターミナルで本プロジェクトのディレクトリに移動
#        cd "/Users/mkagiyama/Documents/Claude/Projects/だんご屋の立ち上げ/obiyamachi-dango-lp"
#   2. 本スクリプトに実行権限を付ける（初回のみ）
#        chmod +x setup.sh
#   3. 実行
#        ./setup.sh
#
# 前提:
#   - Node.js 18 以上 (`node -v` で確認)
#   - GitHub CLI (gh) がインストール済み (`brew install gh` 等)
#   - Firebase CLI がインストール済み (`npm install -g firebase-tools`)
#
# このスクリプトが行うこと:
#   1. 既存の不完全な .git があれば削除し、リポジトリを初期化
#   2. npm install で依存解決
#   3. GitHub に未ログインなら gh auth login を実行
#   4. GitHub にリポジトリを作成して push（既に存在する場合はスキップ）
#   5. Firebase に未ログインなら firebase login を実行
#   6. Firebase プロジェクトを作成（既に存在する場合はスキップ）
#   7. .firebaserc にプロジェクトIDを書き込み
#   8. ビルド + Firebase Hosting にデプロイ

set -euo pipefail

PROJECT_ID="obiyamachi-dango-lp"
GITHUB_REPO_NAME="obiyamachi-dango-lp"
# プライベートにしたい場合は --private に変更
GITHUB_VISIBILITY="--public"

echo "==========================================="
echo " 帯屋町だんご LP セットアップ"
echo "==========================================="

# ---------- 0. 必要コマンドの確認 ----------
need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[エラー] '$1' が見つかりません。先にインストールしてください: $2"
    exit 1
  fi
}
need git "https://git-scm.com/"
need node "https://nodejs.org/"
need npm  "Node.js に同梱"
need gh   "brew install gh   または https://cli.github.com/"
need firebase "npm install -g firebase-tools"

# ---------- 1. git 初期化 ----------
if [ -d .git ]; then
  echo "[1/8] 既存の .git ディレクトリを削除します"
  rm -rf .git
fi
echo "[1/8] git を初期化"
git init -q -b main
git config user.email "$(git config --global user.email || echo "you@example.com")"
git config user.name  "$(git config --global user.name  || echo "Your Name")"

# ---------- 2. npm install ----------
echo "[2/8] npm install"
npm install --no-audit --no-fund

# ---------- 3. 初回 commit ----------
echo "[3/8] 初回 commit"
git add .
git commit -q -m "Initial commit: 帯屋町だんご LP" || echo "(変更なし)"

# ---------- 4. GitHub 認証 ----------
echo "[4/8] GitHub の認証状況を確認"
if ! gh auth status >/dev/null 2>&1; then
  echo " -> 未ログインです。ブラウザで gh auth login を実行します"
  gh auth login -w
fi

# ---------- 5. GitHub リポジトリ作成 + push ----------
GH_USER="$(gh api user -q .login)"
echo "[5/8] GitHub ユーザー: $GH_USER"
if gh repo view "$GH_USER/$GITHUB_REPO_NAME" >/dev/null 2>&1; then
  echo " -> リポジトリ '$GH_USER/$GITHUB_REPO_NAME' はすでに存在します"
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "https://github.com/$GH_USER/$GITHUB_REPO_NAME.git"
  fi
  git push -u origin main || echo "(push スキップ)"
else
  echo " -> リポジトリを作成して push します"
  gh repo create "$GITHUB_REPO_NAME" $GITHUB_VISIBILITY \
    --source=. \
    --remote=origin \
    --description="高知市帯屋町1丁目のだんご専門店『帯屋町だんご』のLP" \
    --push
fi

# ---------- 6. .firebaserc を先に書き換え（YOUR_FIREBASE_PROJECT_ID を退避） ----------
# firebase CLI は起動時に .firebaserc を検証するため、プレースホルダのままだとエラーになる
echo "[6/8] .firebaserc にプロジェクトID '$PROJECT_ID' を書き込み"
cat > .firebaserc <<EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF

# ---------- 7a. Firebase 認証 ----------
echo "[7/8] Firebase の認証状況を確認"
if ! firebase login:list 2>/dev/null | grep -q "@"; then
  echo " -> 未ログインです。ブラウザで firebase login を実行します"
  firebase login
fi

# ---------- 7b. Firebase プロジェクト作成 ----------
echo " -> Firebase プロジェクト '$PROJECT_ID' を確認/作成"
# 全プロジェクトを取得して projectId 列を grep
if firebase projects:list --json 2>/dev/null | grep -q "\"projectId\": *\"$PROJECT_ID\""; then
  echo " -> すでに存在します"
else
  echo " -> 新規作成します（プロジェクトID: $PROJECT_ID）"
  firebase projects:create "$PROJECT_ID" --display-name "帯屋町だんご LP" || {
    echo ""
    echo "[警告] プロジェクトIDが衝突した可能性があります。"
    echo "       他のユーザーに既に使われているIDの場合、別のIDで作成する必要があります。"
    echo ""
    echo "       例: PROJECT_ID=\"obiyamachi-dango-lp-$(date +%s)\" のようにユニーク化"
    echo "       またはFirebase Console (https://console.firebase.google.com/) で手動作成してから"
    echo "       .firebaserc を修正のうえ、本スクリプトを再実行してください。"
    exit 1
  }
fi

# ---------- 8. デプロイ ----------
echo "[8/8] ビルド + Firebase Hosting にデプロイ"
npm run deploy

echo ""
echo "==========================================="
echo " 完了！"
echo "==========================================="
echo " 公開URL: https://$PROJECT_ID.web.app/"
echo " GitHub:  https://github.com/$GH_USER/$GITHUB_REPO_NAME"
echo "==========================================="
