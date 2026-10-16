#!/usr/bin/env bash
# Выкладка на GitHub Pages: свежая сборка dist/ коммитится в ветку gh-pages и пушится.
# Запуск из корня проекта: npm run deploy
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WT="$(dirname "$ROOT")/.worktrees/$(basename "$ROOT")/gh-pages"
cd "$ROOT"

npm run build
git fetch origin gh-pages 2>/dev/null || true
git worktree remove --force "$WT" 2>/dev/null || true
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  git worktree add -B gh-pages "$WT" origin/gh-pages
else
  git worktree add --orphan -b gh-pages "$WT"
fi

# Содержимое ветки = ровно dist/ (+ .nojekyll, чтобы Pages не обрабатывал файлы Jekyll).
find "$WT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R dist/. "$WT/"
touch "$WT/.nojekyll"

cd "$WT"
git add -A
if git diff --cached --quiet; then
  echo "Нечего выкладывать: сборка не изменилась"
else
  git commit -q -m "Deploy $(git -C "$ROOT" rev-parse --short HEAD)"
  git push -q origin gh-pages
  echo "Выложено: ветка gh-pages"
fi
cd "$ROOT"
git worktree remove --force "$WT"
