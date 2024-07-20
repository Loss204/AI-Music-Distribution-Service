#!/bin/bash

# Define directories
UPLOAD_DIR="uploads"
COVER_ART="$UPLOAD_DIR/cover_art.jpg"
AUDIO_FILE="$UPLOAD_DIR/audio_file.mp3"

# Create upload directory if it doesn't exist
mkdir -p "$UPLOAD_DIR"

# Move uploaded files to the upload directory
if [[ -f "$1" && -f "$2" ]]; then
    mv "$1" "$COVER_ART"
    mv "$2" "$AUDIO_FILE"
    echo "Files uploaded successfully."
else
    echo "Error: Files not found."
fi
