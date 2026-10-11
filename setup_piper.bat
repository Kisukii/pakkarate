@echo off
setlocal
cd /d "%~dp0"
echo Installing Piper TTS...
py -m pip install --upgrade pip
if errorlevel 1 goto failed
py -m pip install -r requirements.txt
if errorlevel 1 goto failed
if not exist voices mkdir voices
echo Downloading male and female English/Hindi voice models. This may take a while...
py -m piper.download_voices --download-dir voices en_US-hfc_male-medium en_US-hfc_female-medium hi_IN-pratham-medium hi_IN-priyamvada-medium
if errorlevel 1 goto failed
echo.
echo Piper setup complete. Run start_pakka_rate.bat next.
pause
exit /b 0
:failed
echo.
echo Setup failed. Check that Python is installed and internet access is available.
pause
exit /b 1
