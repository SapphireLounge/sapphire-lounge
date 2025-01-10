@echo off
setlocal EnableDelayedExpansion

:: Get current date and time for backup folder name
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set BACKUP_NAME=sapphire-lounge-backup-%datetime:~0,8%-%datetime:~8,6%

:: Create backup directory on desktop
set BACKUP_DIR=%USERPROFILE%\Desktop\%BACKUP_NAME%
mkdir "%BACKUP_DIR%"

:: Use robocopy with minimal exclusions and better logging
echo Creating backup...
robocopy "%~dp0.." "%BACKUP_DIR%" /E /XD "node_modules" ".git" ".vercel" /XF ".env" ".env.*" /MT:8 /R:1 /W:1 /NFL /NDL

:: Verify file count
echo.
echo Verifying backup...
powershell -Command "$sourceCount = (Get-ChildItem '%~dp0..' -Recurse -Exclude 'node_modules','.git','.vercel' | Measure-Object).Count; $backupCount = (Get-ChildItem '%BACKUP_DIR%' -Recurse | Measure-Object).Count; Write-Host 'Source files (excluding node_modules, .git, .vercel): ' $sourceCount; Write-Host 'Backed up files: ' $backupCount"

echo.
echo Backup completed!
echo Your backup is located at: %BACKUP_DIR%
echo.

pause
