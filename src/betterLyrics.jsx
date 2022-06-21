/* eslint-disable no-console, no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';

(() => {
    const container = document.createElement('div');
    container.id = 'root:better-lyrics';
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    document.body.append(container);

    const root = createRoot(container);
    root.render(<LyricsWindow />);

    container.addEventListener('close-button-click', () => root.unmount());
})();
