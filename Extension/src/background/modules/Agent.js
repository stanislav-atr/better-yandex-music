/* eslint-disable no-undef */
import { sessionStorage } from './SessionStorage.js';
import {
    SESSION_PARAMS,
    UNIQUE_APP_POSTFIX,
    AGENT_NAMES,
} from '../constants.js';

const {
    GET_MUSIC_API_STATUS,
    UNMOUNT_APP,
} = AGENT_NAMES;

class Agent {
    constructor() {
        /* eslint-disable no-console */
        this[GET_MUSIC_API_STATUS] = async (agentPrefix) => {
            const musicApiStatus = window?.Seq?.isReady();
            console.log(`${agentPrefix}: Music API status: ${musicApiStatus}`);
            return musicApiStatus;
        };

        this[UNMOUNT_APP] = (agentPrefix) => {
            const event = new Event(agentPrefix);
            console.log(event);
            dispatchEvent(event);
            console.log(`${agentPrefix}: Dispatching 'UNMOUNT_APP'.`);
        };
        /* eslint-enable no-console */
    }

    prepareScriptInjection(agentName) {
        const isFile = agentName.endsWith('.js');
        const currentMusicTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
        if (!currentMusicTabId) {
            return null;
        }
        const agentPayload = {};

        const scriptInjectionBase = {
            world: 'MAIN',
            target: {
                tabId: currentMusicTabId,
            },
            // injectImmediately: true,
        };

        let scriptInjectionExecution;

        if (isFile) {
            scriptInjectionExecution = { files: [agentName] };
        } else {
            scriptInjectionExecution = {
                args: [`${UNIQUE_APP_POSTFIX}|${agentName}`, agentPayload],
                func: this[agentName],
            };
        }

        return {
            ...scriptInjectionBase,
            ...scriptInjectionExecution,
        };
    }

    async dispatch(agentName) {
        const scriptInjection = this.prepareScriptInjection(agentName);
        if (scriptInjection === null) {
            throw new Error('There is no target tab at the moment of dispatch.');
        }

        let result;
        try {
            result = await chrome.scripting.executeScript(scriptInjection);
        } catch (e) {
            throw new Error(`${UNIQUE_APP_POSTFIX}|failed to execute ${agentName}: \n ${e}`);
        }
        return result;
    }
}

export const agent = new Agent();
