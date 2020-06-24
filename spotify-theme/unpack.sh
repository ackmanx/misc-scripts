#!/usr/bin/env bash

SPOTIFY_BINARY='/Applications/Spotify.app/Contents/MacOS/Spotify'
SPOTIFY_APPS='/Applications/Spotify.app/Contents/Resources/Apps'

#Check if the script is in the same directory we're executing from
if [[ ! -e unpack.sh ]]; then
    echo "Please run from PROJECT_ROOT/scripts"
    exit
fi

#Go to project root
cd ..

#Grab version number
version=`"$SPOTIFY_BINARY" --version | egrep -o "Spotify version (\d|\.|\w)+" | cut -d ' ' -f3`

#Create folder for new version
mkdir "$version"

#Go in it
cd "$version"

#Copy original .spa files to here for editing
cp "$SPOTIFY_APPS"/* .

#Unzip all into their own folders
for spa in `find "${version}" *.spa`; do
    moduleName=`echo ${spa} | cut -d '.' -f1`
    mkdir "$moduleName"
    unzip "$spa" -d "$moduleName"
done

#Create scripts in new version folder for deployment
mkdir __scripts
