/* eslint-disable no-console */
import { UNIQUE_APP_ID } from '../constants';

/**
 * Logs input with conditional styling
 * @param {string} message
 * @param {boolean} isErrorMessage
 * @param {boolean} shouldApplyPrefix
 */
export const log = (message, isErrorMessage = false, shouldApplyAppPrefix = false) => {
    const messageStyle = isErrorMessage ? 'background: #E7EAEE; color: #E22869; padding: 2px' : '';
    const messagePrefix = shouldApplyAppPrefix ? `${UNIQUE_APP_ID}: ` : '';
    console.log(`%c${messagePrefix}${message}`, messageStyle);
};
