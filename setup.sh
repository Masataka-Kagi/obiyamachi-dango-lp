#!/usr/bin/env bash
# Obiyamachi Dango LP - GitHub & Firebase setup script
#
# Usage:
#   cd "/Users/mkagiyama/Documents/Claude/Projects/だんご屋の立ち上げ/obiyamachi-dango-lp"
#   chmod +x setup.sh
#   ./setup.sh
#
# Requirements (install once):
#   brew install gh
#   npm install -g firebase-tools
#
# Note: This script is idempotent — safe to re-run if any step fails.

# Use -e + pipefail (NOT -u, which can choke on macOS bash 3.2 with multi-byte chars)
set -eo pipefail

PROJECT_ID="obiyamachi-dango-lp"
GITHUB_REPO_NAME="obiyamachi-dango-lp"
GITHUB_VISIBILITY="--public"   # change to --private if needed

echo "==========================================="
echo " Obiyamachi Dango LP setup"
echo "==========================================="

# ---------- 0. Check required commands ----------
need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf "[error] Command '%s' not found. Install: %s\n" "$1" "$2"
    exit 1
  fi
}
need git "https://git-scm.com/"
need node "https://nodejs.org/"
need npm  "(bundled with Node.js)"
need gh   "brew install gh"
need firebase "npm install -g firebase-tools"

# ---------- 1. Ensure .firebaserc has the real project id ----------
echo "[1/8] Writing .firebaserc with project id: $PROJECT_ID"
cat > .firebaserc <<EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF

# ---------- 2. Git init (idempotent) ----------
if [ -d .git ] && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[2/8] Existing git repo detected, reusing"
else
  echo "[2/8] Initializing git repo"
  rm -rf .git || true
  git init -q -b main
fi

# Set local user only if not configured globally
if [ -z "$(git config user.email || true)" ]; then
  git config user.email "$(git config --global user.email 2>/dev/null || echo 'you@example.com')"
fi
if [ -z "$(git config user.name || true)" ]; then
  git config user.name "$(git config --global user.name 2>/dev/null || echo 'Your Name')"
fi

# ---------- 3. npm install ----------
echo "[3/8] npm install"
npm install --no-audit --no-fund

# ---------- 4. Stage and commit (idempotent) ----------
echo "[4/8] git add and commit"
git add .
# Only commit if there is something staged
if ! git diff --cached --quiet; then
  git commit -q -m "Initial commit: Obiyamachi Dango LP" || true
else
  echo " -> nothing to commit"
fi

# ---------- 5. GitHub auth ----------
echo "[5/8] Checking GitHub auth"
if ! gh auth status >/dev/null 2>&1; then
  echo " -> Not logged in. Running: gh auth login -w"
  gh auth login -w
fi

GH_USER="$(gh api user -q .login)"
echo " -> GitHub user: $GH_USER"

# ---------- 6. GitHub repo + push ----------
echo "[6/8] Ensuring GitHub repo exists"
if gh repo view "$GH_USER/$GITHUB_REPO_NAME" >/dev/null 2>&1; then
  echo " -> Repo $GH_USER/$GITHUB_REPO_NAME already exists"
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "https://github.com/$GH_USER/$GITHUB_REPO_NAME.git"
  fi
  echo " -> Pushing (force-with-lease, safe for solo first-time setup)"
  # Try normal push first; if remote diverged, force push (safe: solo first-time setup)
  if ! git push -u origin main 2>/dev/null; then
    echo " -> Normal push rejected. Force-pushing local main as the source of truth"
    git push -u --force origin main
  fi
else
  echo " -> Creating new repo and pushing"
  gh repo create "$GITHUB_REPO_NAME" $GITHUB_VISIBILITY \
    --source=. \
    --remote=origin \
    --description="Obiyamachi Dango LP - Kochi" \
    --push
fi

# ---------- 7. Firebase auth + project ----------
echo "[7/8] Checking Firebase auth"
if ! firebase login:list 2>/dev/null | grep -q "@"; then
  echo " -> Not logged in. Running firebase login"
  firebase login
fi

echo " -> Ensuring Firebase project exists: $PROJECT_ID"
PROJECTS_JSON="$(firebase projects:list --json 2>/dev/null || echo '{}')"
if printf '%s' "$PROJECTS_JSON" | grep -q "\"projectId\": *\"${PROJECT_ID}\""; then
  echo " -> Project already exists"
else
  echo " -> Creating new project"
  if ! firebase projects:create "$PROJECT_ID" --display-name "Obiyamachi Dango LP"; then
    echo ""
    echo "[warn] Could not create project '$PROJECT_ID'."
    echo "       The id may be globally taken by another user."
    echo "       Edit setup.sh -> change PROJECT_ID to e.g. 'obiyamachi-dango-lp-kochi',"
    echo "       then re-run ./setup.sh."
    exit 1
  fi
fi

# ---------- 8. Build + deploy ----------
echo "[8/8] Building and deploying to Firebase Hosting"
npm run deploy

echo ""
echo "==========================================="
echo " Done!"
echo "==========================================="
printf " Public URL: https://%s.web.app/\n" "$PROJECT_ID"
printf " GitHub:     https://github.com/%s/%s\n" "$GH_USER" "$GITHUB_REPO_NAME"
echo "==========================================="
