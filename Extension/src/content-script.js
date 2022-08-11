/* eslint-disable no-undef, no-console */
import { UNIQUE_APP_PREFIX } from './common/constants';

window.addEventListener(`${UNIQUE_APP_PREFIX}|app-params`, async (e) => {
    const appParams = e.detail;
    await chrome.storage.local.set({ appParams });
});
