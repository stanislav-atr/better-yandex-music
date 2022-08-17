/* eslint-disable no-undef */
import { DARK_THEME_KEYWORD } from '../constants';

/**
 * Determines theme color of the page by theme keyword
 * @param {string} value
 * @returns {boolean}
 */
export const isDarkThemeKeyword = (value) => {
    if (typeof value !== 'string') {
        // fallback to dark theme
        return true;
    }
    return value === DARK_THEME_KEYWORD;
};
