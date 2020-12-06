/*
 * Get Paths for Dropbox Starred Items
 *
 * Go to Dropbox's "Home" for your account, which shows Starred items
 * Expand the section to show all starred files
 */

// Console log all file paths
document.querySelectorAll('.starred-item__title').forEach(item => {
    const url = item.getAttribute('href').split('?')[0]
    const filePath = url.split('https://www.dropbox.com/pri/get/')[1]
    console.log(decodeURI(filePath))
})

// Replace HTML filename with entire file path
document.querySelectorAll('.starred-item__title').forEach(item => {
    const url = item.getAttribute('href').split('?')[0]
    const filePath = decodeURI(url.split('https://www.dropbox.com/pri/get/')[1])

    item.innerHTML = filePath.replaceAll('/', ' ▪ ')
})

// In order to work as a bookmarklet, gotta use `var` and semi-colons
(function () {
    document.querySelectorAll('.starred-item__title').forEach(item => {
        var url = item.getAttribute('href').split('?')[0];
        var filePath = decodeURI(url.split('https://www.dropbox.com/pri/get/')[1]);

        item.innerHTML = filePath.replaceAll('/', ' ▪ ');
    })
})()
