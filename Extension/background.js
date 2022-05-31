/* eslint-disable no-console, no-undef */

(async () => {
    const yaMusicHandler = async ({ type }, sender) => {
        const musicTabId = sender.tab.id;

        switch (type) {
            case 'ON_PAGE':
                await chrome.scripting.executeScript({
                    world: 'MAIN',
                    target: {
                        tabId: musicTabId,
                    },
                    func: () => {
                        const seqReadyEvent = new Event('seq-ready');
                        const { Seq } = window;
                        if (Seq) {
                            dispatchEvent(seqReadyEvent);
                        }
                    },
                });
                break;
            case 'API_READY':
                await chrome.scripting.executeScript({
                    world: 'MAIN',
                    target: {
                        tabId: musicTabId,
                    },
                    files: ['better-lyrics.js'],
                });
                break;
            default:
            // do nothing
        }
    };

    chrome.runtime.onMessage.addListener(yaMusicHandler);
})();
