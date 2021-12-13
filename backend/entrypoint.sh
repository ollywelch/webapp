#!/bin/bash

# Activate virtual environment
source ./venv/bin/activate

# Run uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8080 --root-path /api