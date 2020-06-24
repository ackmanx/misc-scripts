/*
 * Clipboard Bookmarklet
 *
 * This will grab whatever is currently selected in the browser and put it on the clipboard
 * Use case: When exporting stylebot rules, it is all in a textarea and all text is selected by default
 *
 * To install:
 * 1) Create a bookmark for anywhere in Chrome
 * 2) Edit that bookmark and replace the URL with the minified version
 *
 * To update:
 * Change the IIFE and use an online minifier then paste that here
 */
(function() {
    document.addEventListener('copy', function handler(e){
        e.preventDefault();
        var json = window.getSelection().toString();
        json = JSON.stringify(JSON.parse(json), null, 4);
        e.clipboardData.setData('text/plain', json);
    });

    document.execCommand('copy');
})()
