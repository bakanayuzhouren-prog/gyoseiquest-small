@echo off
REM Cursor で npm が見つからない／EMFILE・メモリ不足のときの起動用
set "PATH=C:\Program Files\nodejs;%PATH%"
set "NODE_OPTIONS=--max-old-space-size=8192"
cd /d "%~dp0"
echo Starting web on http://localhost:8082 ...
call npm.cmd run web -- --port 8082
pause
