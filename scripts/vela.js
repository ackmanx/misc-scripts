// ==UserScript==
// @name         Vela Personalizations
// @namespace    https://vela.prod.target.com/GEM
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vela.prod.target.com/GEM*
// @icon         https://www.google.com/s2/favicons?domain=target.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    function callback(mutationList, observer) {
        mutationList.forEach(mutation => {
            /*
             * Build info page
            */
            if (/\/GEM\/slingshot\/\d+/.test(document.location.pathname)) {
                if (mutation.addedNodes[0]?.tagName === 'DIV' && mutation.addedNodes[0].querySelector('.commit a')) {
                    const commitEl = document.querySelector('.commit a')
                    const pullRequestNumber = commitEl.attributes.href.value.split('/').pop()
                    commitEl.innerHTML = pullRequestNumber
                }
            }

            /*
             * Build listing page
            */
            if (/\/GEM\/slingshot/.test(document.location.pathname)) {
                // If pager element is there, then I'm guessing the builds are in the DOM now too so it's safe to mess around
                if (typeof mutation.addedNodes[0]?.className === 'string' && mutation.addedNodes[0].className.includes('pager-actions')) {
                    document.querySelectorAll('.build-container').forEach(container => {
                        if (container.querySelector('.sender').innerHTML !== 'EricMajerus' || container.querySelector('.commit').innerText.includes('push')) {
                            container.remove()
                            return
                        }

                        const buildHref = container.querySelector('[data-test="build-number"]').attributes.href.value
                        const buildStatusEl = container.querySelector('[data-test="build-status"]')

                        buildStatusEl.addEventListener('click', () => {
                            window.location.href = buildHref
                        })

                        buildStatusEl.style.cursor = "pointer"
                    })

                    document.querySelectorAll('.commit a').forEach(commitEl => {
                        const pullRequestNumber = commitEl.attributes.href.value.split('/').pop()
                        commitEl.innerHTML = pullRequestNumber
                    })
                }
            }
        })
    }

    const observer = new MutationObserver(callback);
    observer.observe(document.querySelector('body'), { childList: true, subtree: true });
})();
