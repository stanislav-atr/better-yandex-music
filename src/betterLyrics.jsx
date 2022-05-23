/* eslint-disable no-console, no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import { LyricsWindow } from './better-lyrics/LyricsWindow';

const sequenceApi = window.Seq;

/**
 *
 *
 *
 */
export const showLyricsBetter = () => {
    if (!sequenceApi) {
        console.log('%cBetter Lyrics Exit. Sequence api is not ready', 'color: red;');
        return;
    }
    console.log('%cBetter Lyrics started', 'color: green;');

    // Render component
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
};
