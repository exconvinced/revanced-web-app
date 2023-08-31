@echo off
python -m venv venv
call venv\Scripts\activate.bat
pip install flask

start "" "http://127.0.0.1:5000"

python app.py
pause