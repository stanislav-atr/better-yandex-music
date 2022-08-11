/* eslint-disable no-undef */
import { sessionStorage } from '../storages/SessionStorage.js';
import { SESSION_PARAMS } from '../constants.js';

import {
    UNIQUE_APP_POSTFIX,
    AGENT_NAMES,
} from '../../common/constants.js';

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
            console.log(`${agentPrefix}: Dispatching 'UNMOUNT_APP'.`);
            dispatchEvent(event);
        };
        /* eslint-enable no-console */
    }

    /**
     * @param {string} agentName name of the agent or file
     * @param {number} tabId
     * @returns {Object} scriptInjection object
     */
    prepareScriptInjection(agentName, tabId) {
        if (typeof agentName !== 'string') {
            throw new Error('Invalid agent name is provided to prepareScriptInjection');
        }
        const isFile = agentName.endsWith('.js');
        const agentPayload = {};

        const scriptInjectionBase = {
            world: 'MAIN',
            target: {
                tabId,
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

    /**
     * Execute script by agent name
     * @param {string} agentName name of the agent or file to inject into page
     * @param {*} callback
     * @returns {Object} return value of injected agent
     */
    async dispatch(agentName, callback) {
        const currentMusicTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
        if (!currentMusicTabId) {
            throw new Error('There is no target tab at the moment of dispatch.');
        }
        if (typeof callback !== 'undefined' && typeof callback !== 'function') {
            throw new Error('Incorrect callback argument was given to dispatcher.');
        }

        const scriptInjection = this.prepareScriptInjection(agentName, currentMusicTabId);

        let result;
        try {
            result = await chrome.scripting.executeScript(scriptInjection, callback);
        } catch (e) {
            throw new Error(`${UNIQUE_APP_POSTFIX}|failed to execute ${agentName}: \n ${e}`);
        }
        return result;
    }
}

export const agent = new Agent();
