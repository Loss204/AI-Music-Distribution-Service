#!/bin/bash

# Define output file
METADATA_FILE="metadata.txt"

# Read input parameters
ARTIST="$1"
SONG="$2"
ALBUM="$3"
PLATFORM="$4"

# Save metadata
echo "Artist: $ARTIST" > "$METADATA_FILE"
echo "Song: $SONG" >> "$METADATA_FILE"
echo "Album: $ALBUM" >> "$METADATA_FILE"

# Generate URIs
case "$PLATFORM" in
    youtube)
        URI="https://www.youtube.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    vimeo)
        URI="https://vimeo.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    tiktok)
        URI="https://www.tiktok.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    soundcloud)
        URI="https://soundcloud.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    audiomack)
        URI="https://audiomack.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    bandlab)
        URI="https://www.bandlab.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    bandcamp)
        URI="https://bandcamp.com/upload?artist=$(urlencode "$ARTIST")&song=$(urlencode "$SONG")&album=$(urlencode "$ALBUM")"
        ;;
    *)
        echo "Error: Invalid platform."
        exit 1
        ;;
esac

# Output URI
echo "Generated URI: $URI"
