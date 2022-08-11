import { api } from './api.js';

(async () => {
    await api.init();
})();

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     const { type, data } = message;
//     switch (type) {
//         case 'app-params':
//             console.log(data);
//             break;
//         default:
//             throw new Error('Unkown message type.');
//     }
//     sendResponse({ success: true });
// });
