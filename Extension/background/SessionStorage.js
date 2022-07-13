import { SESSION_PARAMS } from './constants.js';

class SessionStorage {
    constructor() {
        this.init();
    }

    init() {
        this[SESSION_PARAMS.MUSIC_API_READY] = false;
        this[SESSION_PARAMS.CURRENT_MUSIC_TAB_ID] = null;
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
