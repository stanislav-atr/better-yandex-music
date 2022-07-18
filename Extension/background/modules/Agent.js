/* eslint-disable no-undef */
import { sessionStorage } from './SessionStorage.js';
import {
    SESSION_PARAMS,
    UNIQUE_APP_POSTFIX,
    AGENT_NAMES,
    MUSIC_API_SEEKING_INTERVAL,
    MUSIC_API_SEEKING_TIMEOUT,
} from '../constants.js';

const {
    GET_MUSIC_API_STATUS,
} = AGENT_NAMES;

class Agent {
    constructor() {
        this[GET_MUSIC_API_STATUS] = async (agentMessage) => {
            const musicApiReady = !!window.Seq?.isReady();
            console.log(`${agentMessage}: Music API status: ${isMusicApiReady}`);
            return musicApiReady;
        };
    }

    prepareScriptInjection(agentName) {
        const currentMusicTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
        if (!currentMusicTabId) {
            return null;
        }
        return {
            world: 'MAIN',
            target: {
                tabId: currentMusicTabId,
            },
            // injectImmediately: true,
            args: [`${agentName}|${UNIQUE_APP_POSTFIX}`],
            func: this[agentName],
        };
    }

    async dispatch(agentName) {
        const scriptInjection = this.prepareScriptInjection(agentName);
        if (scriptInjection === null) {
            throw new Error('There is no target id at the moment of dispatch.');
        }

        const result = await chrome.scripting.executeScript(scriptInjection);
        return result;
    }
}

export const agent = new Agent();
