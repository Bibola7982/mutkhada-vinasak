#!/bin/bash
# One-command deploy for the MUTKHADA VINASAK static site.
# Usage:  ./deploy.sh "your commit message"
# Requires: git push auth via Git Credential Manager (browser/OAuth) — no token in repo.
set -e
cd "$(dirname "$0")"
MSG="${1:-Update MUTKHADA VINASAK website}"
git add -A
git commit -m "$MSG" || echo "(nothing to commit)"
git push origin main
echo "✅ Pushed. GitHub Pages will rebuild automatically."
echo "🌐 Live: https://bibola7982.github.io/mutkhada-vinasak/"
