@echo off
powershell.exe -ExecutionPolicy Bypass -File venv\bin\Activate.ps1
start "" "http://127.0.0.1:5000"
python app.py
pause