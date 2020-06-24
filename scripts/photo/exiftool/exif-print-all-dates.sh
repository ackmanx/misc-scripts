#!/usr/bin/env bash

# This script uses exiftool to output all date tags in all images in the current directory
# To run, call this script from any directory either pointing to it or putting it on the PATH.

if command -v exiftool; then
    exiftool -AllDates .
else
    echo "You must install exiftool for this script to work"
    echo "You can get the macOS installer from: https://sno.phy.queensu.ca/~phil/exiftool/index.html"
    exit 1
fi
