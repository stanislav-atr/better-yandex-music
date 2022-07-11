/* eslint-disable no-undef */

(async () => {
    /* Page > background | start */
    window.addEventListener('lyrics:seq-ready', () => {
        chrome.runtime.sendMessage({
            type: 'lyrics:seq-ready',
        });
    });
    /* Page > background | end */

    /* background > page | start */
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'lyrics:close-app') {
            const e = new Event(message.type);
            dispatchEvent(e);
        }
    });
    /* background > page | end */

    /* cs > background | start */
    chrome.runtime.sendMessage({
        type: 'lyrics:cs-ready',
    });
    /* cs > background background | end */
})();
