import { sessionStorage, agent } from './modules';
import { SESSION_PARAMS, AGENT_NAMES } from './constants.js';

export const api = (function () {
    const initUrlFilter = {
        url: [
            { urlMatches: 'music.yandex.([a-z])*' },
        ],
    };
    /**
     * Reset session on each music.yandex page (re)load
     * Save tabId of last refreshed music.yandex page as current
     */
    const initSessionStorage = (tabId) => {
        sessionStorage.init();
        sessionStorage.setSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId);
        // eslint-disable-next-line no-console
        console.log(`SessionStorage initialized with id: ${tabId}`);
    };

    const waitForMusicApiReady = async () => {
        const response = await agent.dispatch(AGENT_NAMES.GET_MUSIC_API_STATUS);
        const { result: musicApiStatus } = response[0];
        if (!musicApiStatus) {
            throw new Error('Could not detect Music API.');
        }
        sessionStorage.setSetting(SESSION_PARAMS.MUSIC_API_READY, true);
        // eslint-disable-next-line no-console
        console.log('Music API is ready!');
    };

    const init = async () => {
        chrome.webNavigation.onCompleted.addListener(async (details) => {
            const { tabId, frameType } = details;
            if (frameType !== 'outermost_frame') {
                return;
            }

            initSessionStorage(tabId);
            await waitForMusicApiReady();
        }, initUrlFilter);
    };

    return {
        init,
    };
})();
