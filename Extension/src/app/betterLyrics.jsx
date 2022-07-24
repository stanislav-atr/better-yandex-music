/* eslint-disable no-console, no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';
import { ThemeProvider } from './providers';
import { createRootContainer } from './utils';
import { UNIQUE_APP_POSTFIX, AGENT_NAMES } from '../background/constants';

const container = createRootContainer();
const root = createRoot(container);

root.render((
    <ThemeProvider>
        <LyricsWindow />
    </ThemeProvider>
));

window.addEventListener(
    `${UNIQUE_APP_POSTFIX}|${AGENT_NAMES.UNMOUNT_APP}`,
    () => {
        console.log(`${UNIQUE_APP_POSTFIX}: unmounting app...`);
        root.unmount();
        container.remove();
    },
    { once: true },
);
