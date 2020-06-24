#!/usr/bin/env bash

# This script uses exiftool to add Date Taken Original tag (and other date tags) to a single file
# To run, call this script from any directory either pointing to it or putting it on the PATH.

#todo: have to parse args to build the formatted string exiftool expects

if command -v exiftool; then
    exiftool -AllDates="2017:12:31 20:00:00" 2017-12-31 20.00.00.01.jpg
    exiftool -AllDates="2017:12:31 20:00:01" 2017-12-31 20.00.01.jpg
else
    echo "You must install exiftool for this script to work"
    echo "You can get the macOS installer from: https://sno.phy.queensu.ca/~phil/exiftool/index.html"
    exit 1
fi
