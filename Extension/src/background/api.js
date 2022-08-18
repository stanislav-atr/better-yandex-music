import { agent } from './Agent';
import { sessionStorage } from './storages';
import { APP_BUNDLE_NAME } from '../../../app-config';
import { SESSION_PARAMS, DEFAULT_APP_PARAMS } from './constants';
import { AGENT_NAMES } from '../common/constants';
import { log } from '../common/utils';

const {
    CURRENT_MUSIC_TAB_ID,
    MUSIC_API_READY,
    IS_APP_RUNNING,
} = SESSION_PARAMS;

const {
    GET_MUSIC_API_STATUS,
    START_APP,
    CLOSE_APP,
} = AGENT_NAMES;

export const api = (function () {
    const urlFilter = {
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

        while (!sessionStorage.getSetting(MUSIC_API_READY)) {
            // eslint-disable-next-line no-await-in-loop
            await getMusicApiStatus();
        }
        log('Session storage is set.');
    };

    const getMusicApiStatus = async () => {
        const response = await agent.dispatch(GET_MUSIC_API_STATUS, {});
        const { result: musicApiStatus } = response[0];
        sessionStorage.setSetting(MUSIC_API_READY, !!musicApiStatus);
    };

    const initAction = () => {
        chrome.action.onClicked.addListener(async (tab) => {
            const currentMusicTabId = sessionStorage.getSetting(CURRENT_MUSIC_TAB_ID);
            if (!currentMusicTabId
                || tab.id !== currentMusicTabId
                || tab.status !== 'complete') {
                return;
            }

            const musicApiReady = sessionStorage.getSetting(MUSIC_API_READY);
            const isAppRunning = sessionStorage.getSetting(IS_APP_RUNNING);
            const isPageReady = currentMusicTabId && musicApiReady;

            if (!isPageReady) {
                return;
            }

            if (!isAppRunning) {
                sessionStorage.setSetting(IS_APP_RUNNING, true);
                const appParams = await chrome.storage.local.get('appParams');
                await agent.dispatch(START_APP, { payload: appParams });
                // code here will run before callback above
            } else {
                agent.dispatch(CLOSE_APP, {}, () => {
                    sessionStorage.setSetting(IS_APP_RUNNING, false);
                });
            }
        });
    };

    const init = async () => {
        log('Initiating...');
        await chrome.storage.local.set({ appParams: DEFAULT_APP_PARAMS });

        chrome.webNavigation.onCompleted.addListener(async (details) => {
            const { tabId, frameType } = details;
            if (frameType !== 'outermost_frame') {
                return;
            }

            await initSessionStorage(tabId);
            await agent.dispatch(APP_BUNDLE_NAME, {});
            log('App is waiting for action click.');
        }, urlFilter);

        initAction();
        log('Extension is ready!');
    };

    return {
        init,
    };
})();
