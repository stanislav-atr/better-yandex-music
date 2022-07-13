import { sessionStorage } from './SessionStorage.js';
import { SESSION_PARAMS } from './constants.js';

export const api = (function () {
    /**
     * Reset session on each music.yandex page reload
     */
    const initSession = () => {
        const initUrlFilter = {
            url: [
                { urlMatches: 'music.yandex.([a-z])*' },
            ],
        };

        chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
            if (frameType !== 'outermost_frame') {
                return;
            }
            sessionStorage.init();
            // Save tabId of last refreshed music.yandex page as current
            sessionStorage.setSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId);
        }, initUrlFilter);
    };

    const init = () => {
        initSession();
    };

    return {
        init,
    };
})();
