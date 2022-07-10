/* eslint-disable no-undef */
import { DARK_THEME_KEYWORD } from '../constants';

export const isDarkThemeKeyword = (value) => {
    if (!window?.Mu?.settings?.theme || typeof value !== 'string') {
        // fallback to dark theme
        return true;
    }
    return value === DARK_THEME_KEYWORD;
};
