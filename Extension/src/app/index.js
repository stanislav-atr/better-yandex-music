/* eslint-disable no-console, no-undef */
import { initApp } from './init-app';
import { AGENT_NAMES, UNIQUE_APP_ID } from '../common';

window.addEventListener(`${UNIQUE_APP_ID}|${AGENT_NAMES.START_APP}`, async (e) => {
    const { appParams } = e.detail.payload;
    await initApp(appParams);
});
