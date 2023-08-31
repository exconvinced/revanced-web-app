#!/bin/bash
source venv/bin/activate

# Check the operating system
if [ "$(uname)" == "Linux" ]; then
    # If the OS is Linux, use xdg-open
    xdg-open "http://127.0.0.1:5000"
elif [ "$(uname)" == "Darwin" ]; then
    # If the OS is macOS, use open
    open "http://127.0.0.1:5000"
else
    echo "Running on http://127.0.0.1:5000"
fi

python app.py