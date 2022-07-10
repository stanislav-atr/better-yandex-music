/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useTrackColorTheme } from '../hooks';
import { isDarkThemeKeyword } from '../utils';

export const ThemeContext = React.createContext('DEFAULT TEST');

export const ThemeProvider = ({ children }) => {
    const isInitKeywordDarkTheme = isDarkThemeKeyword(window?.Mu?.settings?.theme);

    const [isDarkTheme, setIsDarkTheme] = useState(isInitKeywordDarkTheme);

    useTrackColorTheme(setIsDarkTheme);

    return (
        <ThemeContext.Provider value={isDarkTheme}>
            { children }
        </ThemeContext.Provider>
    );
};
