// ==UserScript==
// @name         Block Business Insider adblock paywall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.businessinsider.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('tp-modal-open')) {
                    mutation.target.classList.remove('tp-modal-open');
                    document.getElementsByClassName('tp-modal')[0].remove();
                    document.getElementsByClassName('tp-backdrop')[0].remove();
                }
            }
        });
    });

    observer.observe(document.getElementsByTagName('body')[0], {
        attributes: true
    });

})();
