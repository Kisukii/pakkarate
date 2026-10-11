@echo off
setlocal
cd /d "%~dp0"
if not exist voices\en_US-hfc_male-medium.onnx (
  echo Piper voice models not found. Run setup_piper.bat first.
  pause
  exit /b 1
)
py server.py
pause
