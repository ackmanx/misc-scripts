#!/usr/bin/env bash

#
# How to deploy a themed version of Spotify
#
# 1) Update CSS for the module you want
#   a) Put it at bottom of CSS file, with comment of "Eric's custom css"
# 2) Edit below field MODULE_TO_DEPLOY with name of the folder of the module
# 3) Run this script. It will create a copy of Spotify, package your module and deploy that module
#
# If things get hairy, just delete the themed app and this script will create a new one automatically
#

# ------------------------------------------------------------------------------------------------
# Update this field for deployment!
# ------------------------------------------------------------------------------------------------
MODULE_TO_DEPLOY='zlink'
# ------------------------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------

SPOTIFY='/Applications/Spotify.app'
THEMED_SPOTIFY='/Applications/Spotify-Themed.app'
THEMED_SPOTIFY_APPS='/Applications/Spotify-Themed.app/Contents/Resources/Apps'

#Check if the script is in the same directory we're executing from
if [[ ! -e deploy.sh ]]; then
    echo "Please run from PROJECT_ROOT/<version>/__scripts>"
    exit
fi

#Verify we aren't modifying the original Spotify application
if [[ ! -e "$THEMED_SPOTIFY" ]]; then
    cp -r "$SPOTIFY/" "$THEMED_SPOTIFY/"
fi

#Go to version root
cd ..

#Zip all files in here, excluding the zip itself. We need the zip to not contain a folder at the top level, just files
#The zip command will automatically exclude the zip file, unlike the tar command
cd "$MODULE_TO_DEPLOY"
zip -r "$MODULE_TO_DEPLOY.spa" .

#Copy module to themed Spotify application. cp will overwrite by default
cp "$MODULE_TO_DEPLOY.spa" "$THEMED_SPOTIFY_APPS"

#Delete zipped module from code directory because it isn't needed
rm "$MODULE_TO_DEPLOY.spa"
