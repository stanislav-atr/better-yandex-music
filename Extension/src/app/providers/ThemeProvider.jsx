/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useTrackColorTheme } from '../hooks';
import { isDarkThemeKeyword } from '../utils';

const isInitKeywordDarkTheme = isDarkThemeKeyword(window?.Mu?.settings?.theme);

export const ThemeContext = React.createContext(isInitKeywordDarkTheme);
export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(isInitKeywordDarkTheme);

    useTrackColorTheme(setIsDarkTheme);

    return (
        <ThemeContext.Provider value={isDarkTheme}>
            { children }
        </ThemeContext.Provider>
    );
};
