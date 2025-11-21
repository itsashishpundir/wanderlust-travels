@echo off
echo This script will remove the npm cache and configuration folders.
echo Make sure you have already uninstalled Node.js from the Control Panel.
echo.

set APPDATA_NPM_DIR=%APPDATA%\npm
set APPDATA_NPM_CACHE_DIR=%APPDATA%\npm-cache

echo Deleting npm configuration folder: %APPDATA_NPM_DIR%
if exist "%APPDATA_NPM_DIR%" (
    rmdir /s /q "%APPDATA_NPM_DIR%"
    echo Folder deleted successfully.
) else (
    echo Folder not found.
)

echo.

echo Deleting npm cache folder: %APPDATA_NPM_CACHE_DIR%
if exist "%APPDATA_NPM_CACHE_DIR%" (
    rmdir /s /q "%APPDATA_NPM_CACHE_DIR%"
    echo Folder deleted successfully.
) else (
    echo Folder not found.
)

echo.

echo Cleanup complete.
echo Please now reinstall Node.js LTS from https://nodejs.org and restart your computer.
echo.
pause
