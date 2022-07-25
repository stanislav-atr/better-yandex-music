const UNIQUE_APP_POSTFIX = 'better-lyrics';

const APP_BUNDLE_NAME = 'better-lyrics-bundle.js';

const SESSION_PARAMS = {
    CURRENT_MUSIC_TAB_ID: 'currentMusicTabId',
    MUSIC_API_READY: 'musicApiReady',
    IS_APP_RUNNING: 'appRunning',
};

const AGENT_NAMES = {
    GET_MUSIC_API_STATUS: 'get-music-api-status',
    UNMOUNT_APP: 'unmount-app',
};

export {
    UNIQUE_APP_POSTFIX,
    SESSION_PARAMS,
    AGENT_NAMES,
    APP_BUNDLE_NAME,
};
