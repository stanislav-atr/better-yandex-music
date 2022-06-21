/* eslint-disable no-console, no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';
import { CONTAINER_NODE_ID } from './constants';

(() => {
    if (document.querySelector(`[id="${CONTAINER_NODE_ID}"]`)) {
        return;
    }

    const container = document.createElement('div');
    container.id = CONTAINER_NODE_ID;
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    document.body.append(container);

    const root = createRoot(container);
    root.render(<LyricsWindow />);

    container.addEventListener('lyrics:close-button-click', () => {
        root.unmount();
        container.remove();
    });
})();
