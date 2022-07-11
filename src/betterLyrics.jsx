/* eslint-disable no-console, no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';
import { ThemeProvider } from './providers';
import { CONTAINER_NODE_ID } from './constants';
import { createRootContainer } from './utils';

(() => {
    if (document.querySelector(`[id="${CONTAINER_NODE_ID}"]`)) {
        return;
    }

    const container = createRootContainer();
    const root = createRoot(container);

    root.render((
        <ThemeProvider>
            <LyricsWindow />
        </ThemeProvider>
    ));

    window.addEventListener('lyrics:close-app', () => {
        root.unmount();
        container.remove();
    });
})();
