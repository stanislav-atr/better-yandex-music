import { SESSION_PARAMS } from '../constants.js';

const {
    MUSIC_API_READY,
    CURRENT_MUSIC_TAB_ID,
    IS_APP_RUNNING,
} = SESSION_PARAMS;

class SessionStorage {
    constructor() {
        this.init();
    }

    init() {
        this[CURRENT_MUSIC_TAB_ID] = null;
        this[MUSIC_API_READY] = false;
        this[IS_APP_RUNNING] = false;
    }

    getSetting(setting) {
        return this[setting];
    }

    setSetting(setting, value) {
        this[setting] = value;
        return true;
    }
}

export const sessionStorage = new SessionStorage();
