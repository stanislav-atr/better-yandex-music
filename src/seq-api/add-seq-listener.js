/* eslint-disable no-underscore-dangle */
import { Seq } from './seq';

/**
 * Add callback on a given API event
 *
 * @param {string} event name of Seq event
 * @param {function} callback
 */
export const addSeqListener = (event, callback) => {
    if (typeof Seq === 'undefined') {
        // eslint-disable-next-line no-console
        console.log('Better lyrics: Seq is undefined at addSeqListener');
        return;
    }
    Seq.__eventCallbacks__[event].push(callback);
};
