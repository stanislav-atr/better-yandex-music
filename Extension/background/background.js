import { api } from './api.js';
import { sessionStorage } from './SessionStorage.js';
import { SESSION_PARAMS } from './constants.js';
import { agent } from './modules';
import { AGENT_NAMES } from './constants.js';

const {
    GET_MUSIC_API_STATUS,
} = AGENT_NAMES;

api.init();

chrome.action.onClicked.addListener(async () => {
    console.log('ACTION CLICK');
    let musicApiReady = sessionStorage.getSetting(SESSION_PARAMS.MUSIC_API_READY);
    while (!musicApiReady) {
        try {
            const response = await agent.dispatch(GET_MUSIC_API_STATUS);
            const { result } = response[0];
            console.log(result);
        } catch (e) {
            console.log(e); // eslint-disable-line no-console
        }
    }
});
