/* eslint-disable no-undef */

(async () => {
    /* Page channel | start */
    window.addEventListener('lyrics:seq-ready', () => {
        chrome.runtime.sendMessage({
            type: 'lyrics:seq-ready',
        });
    });
    /* Page channel | end */

    /* Background channel | start */
    chrome.runtime.sendMessage({
        type: 'lyrics:cs-ready',
    });
    /* Background channel | end */
})();
