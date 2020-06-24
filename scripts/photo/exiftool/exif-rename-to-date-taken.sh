#!/usr/bin/env bash

# This script uses exiftool to rename photos based on their EXIF Date Taken Original tag
# To run, call this script from any directory either pointing to it or putting it on the PATH.
#
# Help page for the rename:
# https://sno.phy.queensu.ca/~phil/exiftool/filename.html

if command -v exiftool; then
    exiftool -d "%Y-%m-%d %H.%M.%S.%%e" "-filename<datetimeoriginal" .
else
    echo "You must install exiftool for this script to work"
    echo "You can get the macOS installer from: https://sno.phy.queensu.ca/~phil/exiftool/index.html"
    exit 1
fi
