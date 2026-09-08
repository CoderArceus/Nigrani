#!/bin/bash

# Define paths
BASE_DIR="/Users/aryan/Downloads/mplads"
FRONTEND_DIR="$BASE_DIR/Nigrani"

echo "Starting Nigrani Backend and Frontend..."

# Start the FastAPI backend in the background
echo "-> Starting Backend (FastAPI on port 8000)..."
cd "$BASE_DIR"
source venv/bin/activate
uvicorn main:app --reload &
BACKEND_PID=$!

# Start the Next.js frontend
echo "-> Starting Frontend (Next.js on port 3000)..."
cd "$FRONTEND_DIR"
npm run dev

# When the user presses Ctrl+C to stop the frontend, this trap will also kill the backend
trap "kill $BACKEND_PID" EXIT
