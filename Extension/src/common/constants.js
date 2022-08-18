/**
 * Log/error string schemes
 *
 * App: on catched errors only
 * APP_ID|MESSAGE [red]
 *
 * Background:
 * `${MESSAGE}` [red for errors]
 *
 * Event names (should be verb as agent names are)
 * `${UNIQUE_APP_ID}|${EVENT_NAME || AGENT_NAME}`
 */

const UNIQUE_APP_ID = 'better-lyrics-display';

const AGENT_NAMES = {
    GET_MUSIC_API_STATUS: 'get-music-api-status',
    START_APP: 'start-app',
    CLOSE_APP: 'close-app',
};

const APP_EVENT_NAMES = {
    SAVE_APP_PARAMS: 'save-app-params',
};

export {
    UNIQUE_APP_ID,
    APP_EVENT_NAMES,
    AGENT_NAMES,
};
