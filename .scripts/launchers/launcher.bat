@echo off
powershell.exe -ExecutionPolicy Bypass -File venv\bin\Activate.ps1
pip install -r .scripts/requirements.txt
start "" "http://127.0.0.1:5000"

pip install flask
python app.py