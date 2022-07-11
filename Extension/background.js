/* eslint-disable no-console, no-undef */

(async () => {
    let appIsRunning = false;
    let isSeqReady = false;
    let currentYaMusicTabId;

    const setIsSeqReady = (value) => {
        isSeqReady = value;
        console.log(isSeqReady);
    };

    const messenger = async (
        { type },
        sender,
    ) => {
        const yaMusicTabId = sender.tab.id;

        switch (type) {
            case 'lyrics:cs-ready':
                await chrome.scripting.executeScript({
                    world: 'MAIN',
                    target: {
                        tabId: yaMusicTabId,
                    },
                    // Check that yaMusic api is ready
                    func: () => {
                        const seqReadyEvent = new Event('lyrics:seq-ready');
                        const { Seq } = window;
                        if (Seq) {
                            dispatchEvent(seqReadyEvent);
                        }
                    },
                });
                break;
            case 'lyrics:seq-ready':
                setIsSeqReady(true);
                break;
            default:
            // do nothing
        }
    };
    chrome.runtime.onMessage.addListener(messenger);

    // process test tab here
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        const { url } = tab;
        if (url && url.includes('music.yandex')) {
            currentYaMusicTabId = tabId;
        }
    });
    // process test tab here

    chrome.action.onClicked.addListener(async ({ id }) => {
        if (!appIsRunning && isSeqReady) {
            // inject script when yaMusic api is ready
            // and if app is not running already
            await chrome.scripting.executeScript({
                world: 'MAIN',
                target: {
                    tabId: id,
                },
                files: ['better-lyrics.js'],
            });
            appIsRunning = true;
        } else if (currentYaMusicTabId) {
            chrome.tabs.sendMessage(currentYaMusicTabId, { type: 'lyrics:close-app' });
            appIsRunning = false;
        }
    });
})();
