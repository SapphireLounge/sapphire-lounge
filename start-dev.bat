@echo off
echo Starting Sapphire Lounge Development Environment...
cd /d "%~dp0"

:: Check MongoDB Service
echo Checking MongoDB Service...
net start MongoDB

:: Start Backend Server
echo Starting Backend Server...
cd server
start /B npm run dev
cd ..

:: Start Frontend Server and open browser
echo Starting Frontend Server...
start http://localhost:5173
npm run dev
