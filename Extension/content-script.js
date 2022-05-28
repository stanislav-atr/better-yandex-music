/* eslint-disable no-undef */

(() => {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.id = 'bettermusic';

    const browser = window.browser || chrome;
    const scriptSource = browser.runtime.getURL('better-music.js');
    const hash = Math.random().toString(36).substring(5);

    scriptTag.setAttribute('src', `${scriptSource}?${hash}`);

    const parent = document.head || document.documentElement;
    parent.appendChild(scriptTag);
    if (scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
    }
})();
