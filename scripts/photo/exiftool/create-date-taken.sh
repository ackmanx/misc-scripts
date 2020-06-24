#!/usr/bin/env bash

#If exiftool isn't installed, use brew to install it

BASE_DIR="/Users/varr/storage/Meine Fotos/blah blah blah/2014/"

exiftool -AllDates="2014:03:06 15:53:23" "${BASE_DIR}2014-03/Screenshot_2014-03-06-17-34-23.jpg"

echo "Don't forget to roovy them to rename the files!"
