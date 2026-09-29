@echo off
title Blood Donor Connector
cd /d "%~dp0"

echo ========================================================
echo       Starting Blood Donor Connector Server
echo ========================================================
echo.

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in your system PATH!
    echo Please install Node.js from https://nodejs.org/ to run this app.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not found in your system PATH!
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [INFO] Installing required dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo [INFO] Launching development server...
echo [INFO] Your browser will open automatically once ready.
echo [INFO] (Keep this window open while using the app)
echo.

call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Server encountered an error and stopped.
    pause
)
