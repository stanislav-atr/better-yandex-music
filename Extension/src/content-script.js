import { UNIQUE_APP_PREFIX } from './common/constants';
/* eslint-disable no-undef, no-console */
console.log('CONTENT-SCRIPT');

const responseGuard = (response) => {
    if (!response) {
        throw new Error('$MESSAGE_NAME NOT ACCEPTED BY BACKGROUND.');
    }
};

window.addEventListener(`${UNIQUE_APP_PREFIX}|app-params`, (e) => {
    const paramsToSave = e.detail;
    console.log('contentscript params to save:');
    console.log(paramsToSave);
    chrome.runtime.sendMessage({
        type: 'app-params',
        data: paramsToSave,
    }, responseGuard);
});
