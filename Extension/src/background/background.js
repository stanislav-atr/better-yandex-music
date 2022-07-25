import { api } from './api.js';
import { sessionStorage } from './modules/SessionStorage.js';
import { agent } from './modules';
import {
    SESSION_PARAMS,
    APP_BUNDLE_NAME,
    AGENT_NAMES,
} from './constants.js';

const {
    MUSIC_API_READY,
    CURRENT_MUSIC_TAB_ID,
    IS_APP_RUNNING,
} = SESSION_PARAMS;

(async () => {
    // Wait for music.yandex api to get ready
    await api.init();
})();

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
        agent.dispatch(AGENT_NAMES.UNMOUNT_APP, () => {
            sessionStorage.setSetting(IS_APP_RUNNING, false);
        });
    }
});
