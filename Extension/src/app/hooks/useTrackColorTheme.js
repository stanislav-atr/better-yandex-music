/* eslint-disable no-undef */
import { useEffect } from 'react';
import { isDarkThemeKeyword } from '../utils';
import { log } from '../../common/utils';

export const useTrackColorTheme = (setIsDarkTheme) => {
    useEffect(() => {
        const handler = {
            set(target, prop, val, receiver) {
                const success = Reflect.set(target, prop, val, receiver);
                if (!success) {
                    return success;
                }
                if (prop === 'theme') {
                    setIsDarkTheme(isDarkThemeKeyword(val));
                }
                return success;
            },
        };
        try {
            window.Mu.settings = new Proxy(window.Mu.settings, handler);
        } catch (e) {
            log('Failed to track color theme.', true, true);
        }
    }, [setIsDarkTheme]);
};
