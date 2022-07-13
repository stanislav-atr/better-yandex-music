/* eslint-disable no-undef */
import { UNIQUE_APP_POSTFIX, AGENT_NAMES } from '../constants.js';

const {
    GET_MUSIC_API_STATUS,
} = AGENT_NAMES;

/**
 * Agent is a function that gets injected by background to a web page
 * It dispatches event that is transferred back to background by content script
 * Event name is to correspond with param agent process
 */
export const agents = {
    [GET_MUSIC_API_STATUS]() {
        const { Seq } = window;
        if (Seq) {
            const e = new Event(`${GET_MUSIC_API_STATUS}:${UNIQUE_APP_POSTFIX}`);
            console.log('AGENT');
            console.log(e);
            // dispatchEvent(seqReadyEvent);
        }
    },
};
