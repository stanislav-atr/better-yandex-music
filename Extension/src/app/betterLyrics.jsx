/* eslint-disable no-console, no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';
import { ThemeProvider } from './providers';
import { createRootContainer } from './utils';

const container = createRootContainer();
const root = createRoot(container);

root.render((
    <ThemeProvider>
        <LyricsWindow base={{ container, root }} />
    </ThemeProvider>
));
