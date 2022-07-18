import { sessionStorage } from './modules';
import { SESSION_PARAMS } from './constants.js';

export const api = (function () {
    /**
     * Reset session on each music.yandex page reload
     */
    const initSessionStorage = () => {
        const initUrlFilter = {
            url: [
                { urlMatches: 'music.yandex.([a-z])*' },
            ],
        };

        chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
            if (frameType !== 'outermost_frame') {
                return;
            }
            // Reset session storage on each page load
            sessionStorage.init();
            // Save tabId of last refreshed music.yandex page as current
            sessionStorage.setSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId);
        }, initUrlFilter);
    };

    const init = () => {
        initSessionStorage();
    };

    return {
        init,
    };
})();
