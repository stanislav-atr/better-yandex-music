/* eslint-disable no-undef, no-console */
import { UNIQUE_APP_ID, APP_EVENT_NAMES } from './common/constants';

window.addEventListener(`${UNIQUE_APP_ID}|${APP_EVENT_NAMES.SAVE_APP_PARAMS}`, async (e) => {
    const appParams = e.detail;
    await chrome.storage.local.set({ appParams });
});
