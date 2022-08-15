import React from 'react';
import { createRoot } from 'react-dom/client';

import { LyricsWindow } from './components/LyricsWindow';
import { ThemeProvider } from './providers';
import { createRootContainer } from './utils';
import { getInitLyrics } from './seq-api';

export const initApp = async (appParams) => {
    const container = createRootContainer();
    const root = createRoot(container);
    const initLyrics = await getInitLyrics();
    root.render((
        <ThemeProvider>
            <LyricsWindow
                base={{ container, root }}
                initAppParams={appParams}
                initLyrics={initLyrics}
            />
        </ThemeProvider>
    ));
};
