# Backup First ---------------------------------------------------------------------------

* Everything of value should be in either Dropbox or Github already
* Verify nothing in the home folder I want to keep
* Verify no extra folders in Storage partition that may not be backed up


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
    * varr
    * Desktop
    * Downloads
    * Dropbox
    * Code
    * Fotos

## Disable screenshot preview
* Open Screenshot app
* Click Options and uncheck the option

## Set a short password
`pwpolicy -clearaccountpolicies`
Then set a new password

## Three Finger Drag
Preferences -> Accessibility -> Pointer Controls -> Trackpad Options

## Everything else
Go through all preferences because that's how I roll


# Software to Download (in order) ---------------------------------------------------------------------------

## Dropbox
Select storage as the Dropbox drive and it will index the files there

## Brave
Use sync code from 1Password

## Alfred

## Spectacle

## Spotify

## Zoom
For Chinese lessons

## Duo
For medical appointments

## Development
* Intellij
    Keyboard >> Shortcuts >> Function Keys >> Add an app here
* iTerm
* Oh-my-zsh
* nvm
* Generate new SSH key for Github

## Misc
* Macs Fan Control
* Epson Drivers and Utilities Combo Pack
    * USB Scanner

## Photography/Video
* Adobe Bridge
* exiftool
* Gemini 2
    * Find duplicate photos
* JustPlay (app store)
* Handbrake
* LosslessCut
* HoudahGeo
    * Geotagging photos


# If desired ---------------------------------------------------------------------------

## Disable System Integrity Protection (SIP)
Because macOS is locked down and I like to hide useless folders/applications in Finder, we have to disable advanced security first

Reboot into Recovery Mode
    CMD + R during boot

Disable
`csrutil disable`

Reboot, then can hide things with:
`sudo chflags hidden /Applications/Utilities`
