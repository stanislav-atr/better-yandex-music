/* eslint-disable no-undef */
import { sessionStorage } from './SessionStorage.js';
import {
    SESSION_PARAMS,
    UNIQUE_APP_POSTFIX,
    AGENT_NAMES,
} from '../constants.js';

const {
    GET_MUSIC_API_STATUS,
} = AGENT_NAMES;

class Agent {
    constructor() {
        this[GET_MUSIC_API_STATUS] = async (agentMessage) => {
            const musicApiStatus = window?.Seq?.isReady();
            // eslint-disable-next-line no-console
            console.log(`${agentMessage}: Music API status: ${musicApiStatus}`);
            return musicApiStatus;
        };
    }

    prepareScriptInjection(agentName) {
        const currentMusicTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
        if (!currentMusicTabId) {
            return null;
        }
        const agentPayload = {};

        return {
            world: 'MAIN',
            target: {
                tabId: currentMusicTabId,
            },
            // injectImmediately: true,
            args: [`${UNIQUE_APP_POSTFIX}|${agentName}`, agentPayload],
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
