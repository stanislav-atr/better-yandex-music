/* eslint-disable no-undef */
import { sessionStorage } from '../storages/SessionStorage.js';
import { SESSION_PARAMS } from '../constants.js';
import { log } from '../../common/utils';
import {
    UNIQUE_APP_ID,
    AGENT_NAMES,
} from '../../common/constants';

const {
    GET_MUSIC_API_STATUS,
    START_APP,
    CLOSE_APP,
} = AGENT_NAMES;

class Agent {
    constructor() {
        this[GET_MUSIC_API_STATUS] = async () => {
            const musicApiStatus = window?.Seq?.isReady();
            return musicApiStatus;
        };

        this[START_APP] = async (eventName, payload) => {
            const event = new CustomEvent(eventName, { detail: payload });
            dispatchEvent(event);
        };

        this[CLOSE_APP] = (eventName) => {
            const event = new Event(eventName);
            dispatchEvent(event);
        };
    }

    /**
     * @param {string} agentName name of the agent or file
     * @param {number} tabId
     * @returns {Object} scriptInjection object
     */
    prepareScriptInjection(agentName, tabId, payload) {
        const isFile = agentName.endsWith('.js');

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
            const eventName = `${UNIQUE_APP_ID}|${agentName}`;
            scriptInjectionExecution = {
                args: [eventName, payload || {}],
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
    async dispatch(agentName, payload, callback) {
        const currentMusicTabId = sessionStorage.getSetting(SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);
        if (!currentMusicTabId) {
            throw new Error('There is no target tab at the moment of dispatch.');
        }

        const scriptInjection = this.prepareScriptInjection(agentName, currentMusicTabId, payload);

        let result;
        try {
            result = await chrome.scripting.executeScript(scriptInjection, callback);
        } catch (e) {
            log(`Could not dispatch agent. ${agentName}`, true);
        }
        return result;
    }
}

export const agent = new Agent();
