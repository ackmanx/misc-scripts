/*
 * Slingshot Auth Token for GraphQL playground
 * Your token must come from the same environment as the playground
 *
 * Grabs the `access_token` from local storage and creates an HTTP headers object to put into the playground
 */
(function () {
    document.addEventListener('copy', function handler(e) {
        e.preventDefault();

        var header = {Authorization: localStorage.access_token}
        header = JSON.stringify(header, null, 4);

        e.clipboardData.setData('text/plain', header);
    });

    document.execCommand('copy');
})()
