@echo off
echo Fixing CSS linting issues for Tailwind CSS...

if not exist .vscode (
  mkdir .vscode
  echo Created .vscode directory
)

copy /Y vscode-settings.json .vscode\settings.json
echo Copied settings to .vscode\settings.json

echo.
echo ✅ Done! Please restart VSCode or reload the window.
echo (Ctrl+Shift+P, then type "Reload Window")
echo.

pause
