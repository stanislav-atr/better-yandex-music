/* eslint-disable no-undef */
import { useEffect } from 'react';
import { isDarkThemeKeyword } from '../utils';

export const useTrackColorTheme = (setIsDarkTheme) => {
    useEffect(() => {
        const handler = {
            set(...args) {
                const property = args[1];
                const value = args[2];
                const success = Reflect.set(args);
                if (!success) {
                    return success;
                }
                if (property === 'theme') {
                    setIsDarkTheme(isDarkThemeKeyword(value));
                }
                return success;
            },
        };

        window.Mu.settings = new Proxy(window.Mu.settings, handler);
    }, [setIsDarkTheme]);
};
