import { api } from './api.js';
import { sessionStorage } from './modules/SessionStorage.js';
import { SESSION_PARAMS } from './constants.js';
// import { agent } from './modules';

const {
    MUSIC_API_READY,
    CURRENT_MUSIC_TAB_ID,
} = SESSION_PARAMS;

(async () => {
    // Wait for music.yandex api to get ready
    await api.init();
})();

chrome.action.onClicked.addListener(async () => {
    const currentMusicTabId = sessionStorage.getSetting(CURRENT_MUSIC_TAB_ID);
    const musicApiReady = sessionStorage.getSetting(MUSIC_API_READY);
    const pageReady = currentMusicTabId && musicApiReady;
    if (pageReady) {
        chrome.scripting.executeScript({
            world: 'MAIN',
            target: {
                tabId: currentMusicTabId,
            },
            files: ['better-lyrics-bundle.js'],
        }, (res) => {
            console.log(res);
        });
    }
    // if (pageReady) {
    //     const test = await agent.dispatch('test');
    //     console.log(test);
    // }
});
