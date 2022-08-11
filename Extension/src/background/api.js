import { agent } from './Agent';
import { sessionStorage } from './storages';
import { APP_BUNDLE_NAME } from '../../../app-config';
import { SESSION_PARAMS } from './constants';
import { AGENT_NAMES } from '../common/constants';

const {
    CURRENT_MUSIC_TAB_ID,
    MUSIC_API_READY,
    IS_APP_RUNNING,
} = SESSION_PARAMS;

const {
    GET_MUSIC_API_STATUS,
} = AGENT_NAMES;

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
    const initSessionStorage = async (tabId) => {
        sessionStorage.init();
        sessionStorage.setSetting(CURRENT_MUSIC_TAB_ID, tabId);
        // eslint-disable-next-line no-console
        console.log(`SessionStorage initialized with id: ${tabId}`);

        while (!sessionStorage.getSetting(MUSIC_API_READY)) {
            // eslint-disable-next-line no-await-in-loop
            await getMusicApiStatus();
        }
    };

    const getMusicApiStatus = async () => {
        const response = await agent.dispatch(GET_MUSIC_API_STATUS);
        const { result: musicApiStatus } = response[0];
        sessionStorage.setSetting(MUSIC_API_READY, !!musicApiStatus);
        // eslint-disable-next-line no-console
        console.log('Music API is ready!');
    };

    const initAction = () => {
        chrome.action.onClicked.addListener(async () => {
            const currentMusicTabId = sessionStorage.getSetting(CURRENT_MUSIC_TAB_ID);
            const musicApiReady = sessionStorage.getSetting(MUSIC_API_READY);
            const isAppRunning = sessionStorage.getSetting(IS_APP_RUNNING);
            const isPageReady = currentMusicTabId && musicApiReady;

            if (!isPageReady) {
                // eslint-disable-next-line no-console
                console.log('Music.Yandex page is not ready for app injection.');
                return;
            }

            if (!isAppRunning) {
                agent.dispatch(APP_BUNDLE_NAME, () => {
                    sessionStorage.setSetting(IS_APP_RUNNING, true);
                });
            } else {
                agent.dispatch(AGENT_NAMES.CLOSE_APP, () => {
                    sessionStorage.setSetting(IS_APP_RUNNING, false);
                });
            }
        });
    };

    const init = async () => {
        chrome.webNavigation.onCompleted.addListener(async (details) => {
            const { tabId, frameType } = details;
            if (frameType !== 'outermost_frame') {
                return;
            }

            await initSessionStorage(tabId);
            initAction();
        }, initUrlFilter);
    };

    return {
        init,
    };
})();
