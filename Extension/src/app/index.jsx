/* eslint-disable no-console, no-undef */
import { initApp } from './initApp';
import { AGENT_NAMES, UNIQUE_APP_PREFIX } from '../common';

window.addEventListener(`${UNIQUE_APP_PREFIX}|${AGENT_NAMES.START_APP}`, (e) => {
    const { appParams } = e.detail.payload;
    initApp(appParams);
});
