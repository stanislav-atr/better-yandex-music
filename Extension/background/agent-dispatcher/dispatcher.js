import { agents } from './agents';
import { sessionStorage } from '../SessionStorage.js';
import { SESSION_PARAMS } from '../constants.js';

export const dispatch = function (agentName) {
    console.log(`
    Dispatcher getSetting: ${sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID)}
    `);
    console.log(`
    Dispatcher test: ${sessionStorage[SESSION_PARAMS.CURRENT_MUSIC_TAB_ID]}
    `);

    const targetTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
    if (typeof targetTabId !== 'number') {
        return false;
    }
    chrome.scripting.executeScript({
        world: 'MAIN',
        target: {
            tabId: targetTabId,
        },
        func: agents[agentName],
    });
    return true;
};
