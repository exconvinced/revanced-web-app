@echo off
call venv/Scripts/activate 
start "" "http://127.0.0.1:5000"
venv\bin\python app.py