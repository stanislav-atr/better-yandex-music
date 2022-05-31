/* eslint-disable no-undef */

(async () => {
    // Wait for MAIN world event
    window.addEventListener('seq-ready', () => {
        chrome.runtime.sendMessage({
            type: 'API_READY',
        });
    });

    chrome.runtime.sendMessage({
        type: 'ON_PAGE',
    });
})();
