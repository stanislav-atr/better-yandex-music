import { api } from './api.js';
import { sessionStorage } from './modules/SessionStorage.js';
import { SESSION_PARAMS, AGENT_NAMES } from './constants.js';
import { agent } from './modules';

const {
    MUSIC_API_READY,
    CURRENT_MUSIC_TAB_ID,
} = SESSION_PARAMS;

(async () => {
    // Wait for music.yandex api to get ready
    await api.init();
})();

chrome.action.onClicked.addListener(async () => {
    console.log('ACTION CLICK');
});
