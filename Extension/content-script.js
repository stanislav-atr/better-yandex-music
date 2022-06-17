/* eslint-disable no-undef */

(async () => {
    /* Page channel | start */
    window.addEventListener('seq-ready', () => {
        chrome.runtime.sendMessage({
            type: 'seq-ready',
        });
    });
    /* Page channel | end */

    /* Background channel | start */
    chrome.runtime.sendMessage({
        type: 'cs-ready',
    });
    /* Background channel | end */
})();
