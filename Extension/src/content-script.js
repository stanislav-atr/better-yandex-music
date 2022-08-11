/* eslint-disable no-undef, no-console */
console.log('CONTENT-SCRIPT');

const responseGuard = (response) => {
    if (!response) {
        throw new Error('$MESSAGE_NAME NOT ACCEPTED BY BACKGROUND.');
    }
};

window.addEventListener('TEST-EVENT', (e) => {
    const paramsToSave = e.detail;
    chrome.runtime.sendMessage({
        type: 'app-params',
        data: paramsToSave,
    }, responseGuard);
});
