/* eslint-disable no-console, no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import { LyricsWindow } from './components/LyricsWindow';

(() => {
    const root = document.createElement('div');
    root.id = 'root:better-lyrics';
    root.style.position = 'absolute';
    root.style.left = '0';
    root.style.top = '0';

    document.body.append(root);

    ReactDOM.render(
        <LyricsWindow />,
        root,
    );
})();
