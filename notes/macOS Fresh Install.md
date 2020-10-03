# Backup First ---------------------------------------------------------------------------

* Everything of value should be in either Google Drive or BitBucket already
* Verify nothing in the home folder I want to keep
* Verify no extra folders in Storage partition, if so, copy to an external drive


# Install macOS ---------------------------------------------------------------------------

Should be able to use the primary partition and ignore the storage partition


# On First Boot ---------------------------------------------------------------------------

* Download VS Code for these notes to be in a real editor

* Open one Finder window
    * Change the view to List
    * Open view settings (cmd + j)
    * Make icons large, always open in List view and set as defaults
    * Restart the computer


# Preferences ---------------------------------------------------------------------------

## Finder

* Go through Finder preferences
* Add Favorites
    * Applications
    * Desktop
    * Downloads
    * Drive
    * varr

## Set a short password
`pwpolicy -clearaccountpolicies`
Then set a new password

## Three Finger Drag
Preferences -> Accessibility -> Pointer Controls -> Trackpad Options

## Everything else
Go through all preferences because that's how I roll


# Software to Download (in order) ---------------------------------------------------------------------------

## Chrome
Update Adblock Plus options to have custom filter `cnn.com/*/video`

## Alfred
## Spectacle

## Backup and Sync from Google
Copy the Drive folder from another computer (or note existing location)

Install the desktop client and login

Skip Step 2 ("backup your computer")
* If you re-install your OS, Google will force you to re-upload the entire backup
* This step IS NOT part of Google Drive

In Step 3 (Google Drive)
* Select the Drive folder
* It will warn about merging the folder with Drive online
* This means it will compare all the files and won't download any file that's already in the folder

## Spotify

## Zoom
For Chinese lessons

## As Desired
* Development
    * IntelliJ
    * Sourcetree
    * iTerm
* Macs Fan Control
* Photography/Video
    * Pixelmator (App Store)
    * JustPlay (App Store)
    * Handbrake
        * Re-encode video or rip non-protected DVDs
    * Adobe Lightroom
        * Photo organization option 1 (Library function works after free trial)
    * Mylio
        * Photo organization option 2 (Free option but syncing with file system changes seemed less stable)
    * LosslessCut
    * HoudahGeo
        * Geotagging photos
* Scanning
    * Epson ScanSmart
    * Epson Scan 2 Utility
* Chat
    * Signal


# Stuff to do in the Terminal ---------------------------------------------------------------------------

## Install Oh My Zsh

## .zshrc
grephere() {
    grep -rIi --exclude=\*.{bgr,rgb,rgba} --color "$1" .
}

gitpop() {
    echo 'Are you sure you want to soft reset the previous commit? (y/n)'
    echo 'Make sure this has not been pushed to origin!!!'
    echo `git log --oneline -1`

    read answer

    if [ $answer = 'y' ]; then
        git reset --soft HEAD^
    fi
}

## Generate new SSH key for BitBucket


# Misc Settings ---------------------------------------------------------------------------

## Always show function keys for some apps
Keyboard >> Shortcuts >> Function Keys >> Add an app here































# ------------------------------------------------------------------------------------------------------
# Initial Setup
# ------------------------------------------------------------------------------------------------------

# Fix macOS forced password policy
https://apple.stackexchange.com/questions/337468/how-to-set-short-user-password-macos-mojave/337720#337720

# Disable System Integrity Protection (SIP)
Because macOS is locked down and I like to hide useless folders/applications in Finder, we have to disable advanced security first

Reboot into Recovery Mode
    CMD + R during boot
$ csrutil disable

Then can hide things with:
    `sudo chflags hidden /Applications/Utilities`

# Install Software I Use Constantly Before Anything
* Google Chrome
* Alfred 4
* Spectacle
* Visual Studio Code
* Dropbox


# ------------------------------------------------------------------------------------------------------
# Preferences
# ------------------------------------------------------------------------------------------------------

# Fix Finder so it remembers window sizes
Go to Column View, hold alt and drag a column to a nice width
Relaunch Finder

Hold alt and drag a Finder window to a reasonable size
Relaunch Finder

# System Preferences
* General
    * Always show scroll bars
* Mission Control
    * Group windows by applications
* Language & Region
    * 24-hour time
* Displays
    * Uncheck mirroring options
    * Schedule Night Shift
* Energy Saver
    * Uncheck power nap
* Keyboard
    * Keyboard
        * Increase repeat rates
        * Use F-keys
    * Text
        * Uncheck the junk
    * Shortcuts
        * Full keyboard access: All controls
        * Mission Control -> Uncheck "Move left/right a space" (this is necessary for IntelliJ previous/next tab to work)
        * Spotlight -> Uncheck
* Trackpad
    * Uncheck stuff
* Sound
    * Check stuff
* Date & Time
    * Clock -> Show Date
* Accessibility
    * Mouse & Trackpad
        * Spring Loading Delay -> Max
        * Trackpad Options -> Enable dragging -> three finger drag


# ------------------------------------------------------------------------------------------------------
# Software to Install Whenever
# ------------------------------------------------------------------------------------------------------

## Spotify

## Better Snap Tool
Mac App Store

## iTerm 2
https://iterm2.com/downloads/stable/latest

## Macs Fan Control
https://www.crystalidea.com/macs-fan-control

## Sublime Text 3
https://www.sublimetext.com/

----- BEGIN LICENSE -----
Eric Majerus
Single User License
EA7E-957380
5653A2BA CC53423C 8669B1D6 B67D273C
9A3663BC 12B1D984 48975C04 EB65EEA4
F15FBD84 D955F70F 68F3BD3D D526B7C4
86E90DE6 2D944DAD 2D121DF2 41DE6775
22836028 F918C00E E37FE447 3FA216BF
AB28FF6E 35945CEF 52CD5283 B57976BF
A509A520 ECC6C585 60D9DA66 819FBFCE
FA73E2CB 6837CA32 8C894B9E D6D0E68B
------ END LICENSE ------

## Lightroom
Royal PITA... login and then download their desktop installer:
https://www.adobe.com/creativecloud/desktop-app.html

Or use Dropbox version:
dropbox/.../Mac/CreativeCloudInstaller.dmg

Then you can install Lightroom Classic CC, which starts as a trial but once expires is free with reduced features (losing the ones I never use anyway)

## Pixelmator
From the App Store

## HandBrake
Video re-encoding application

## exiftool
https://sno.phy.queensu.ca/~phil/exiftool/
PATH=$PATH:/Volumes/Storage/Dropbox/Code/photo-scripts/exiftool

## VOX
You can get it from the App Store. In order to stomach the ads, you have to disable notifications in System Preferences.

# Audacity
https://www.audacityteam.org/download/mac/


# ------------------------------------------------------------------------------------------------------
# Developer-Specific Setup
# ------------------------------------------------------------------------------------------------------

## Shell Programs
oh-my-zsh
	https://github.com/robbyrussell/oh-my-zsh
	https://bitbucket.org/ackmanx/configuration-files/src

## Homebrew
https://brew.sh/

## node/npm/nvm
https://github.com/nvm-sh/nvm

## Sourcetree
https://www.sourcetreeapp.com/

## IntelliJ
https://www.jetbrains.com/idea/download/download-thanks.html?platform=mac

## BitBucket or GitHub
In order to access without a password and login when pushing code, you have to register your computer's SSH key.
    First generate one.
        $ ssh-keygen

    Then copy it to the clipboard and paste into the user preferences page somewhere.
	    $ cat ~/.ssh/id_rsa.pub | pbcopy
