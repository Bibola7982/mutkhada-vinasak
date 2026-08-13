@echo off
REM One-command deploy for the MUTKHADA VINASAK static site (Windows).
REM Usage:  deploy.bat "your commit message"
REM Auth handled by Git Credential Manager (no token stored in repo).
setlocal
cd /d "%~dp0"
if "%~1"=="" (set MSG=Update MUTKHADA VINASAK website) else (set MSG=%~1)
git add -A
git diff --cached --quiet && echo (nothing to commit) || git commit -m "%MSG%"
git push origin main
echo ✅ Pushed. GitHub Pages will rebuild automatically.
echo 🌐 Live: https://bibola7982.github.io/mutkhada-vinasak/
