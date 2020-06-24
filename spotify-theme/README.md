### What to edit

`/Applications/Spotify.app/Contents/Resources/Apps` contains a list of `.spa` files, which are just zips.

Unzip them, edit, and replace.

You have to zip the contents, not the folder.

1. From the folder you edit them, `zip -r zlink.spa .` where `zlink` is the name of the Spotify module you are replacing.
1. Replace the existing module: `cp zlink.spa /Applications/Spotify.app.bak.app/Contents/Resources/Apps`

### What can you do

It seems you can do anything you want. You can add files to the module and nothing bad will happen. The only restriction is time... modifying CSS is easy but modifying their JavaScript is not.

### What about updates

You'll need to re-apply your updated modules if they upgrade Spotify, which is often. Their UI changes might break your CSS though.

### What about mistakes

These scripts will make a duplicate Spotify if it doesn't exist and deploy to that instead. Redeploying will delete it and start fresh.
