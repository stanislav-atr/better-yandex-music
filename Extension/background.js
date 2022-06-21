/* eslint-disable no-console, no-undef */

(async () => {
    const messenger = async ({ type }, sender) => {
        const yaMusicTabId = sender.tab.id;

        switch (type) {
            case 'cs-ready':
                await chrome.scripting.executeScript({
                    world: 'MAIN',
                    target: {
                        tabId: yaMusicTabId,
                    },
                    // Check that yaMusic api is ready
                    func: () => {
                        const seqReadyEvent = new Event('seq-ready');
                        const { Seq } = window;
                        if (Seq) {
                            dispatchEvent(seqReadyEvent);
                        }
                    },
                });
                break;
            case 'seq-ready':
                // inject script when yaMusic api is ready
                await chrome.scripting.executeScript({
                    world: 'MAIN',
                    target: {
                        tabId: yaMusicTabId,
                    },
                    files: ['better-lyrics.js'],
                });
                break;
            default:
            // do nothing
        }
    };

    chrome.runtime.onMessage.addListener(messenger);
})();
