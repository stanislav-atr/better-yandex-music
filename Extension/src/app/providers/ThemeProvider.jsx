/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useTrackColorTheme } from '../hooks';
import { isDarkThemeKeyword } from '../utils';

export const ThemeContext = React.createContext(true); // fallback to dark theme

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeKeyword(window?.Mu?.settings?.theme));

    useTrackColorTheme(setIsDarkTheme);

    return (
        <ThemeContext.Provider value={isDarkTheme}>
            { children }
        </ThemeContext.Provider>
    );
};
