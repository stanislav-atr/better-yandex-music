/* eslint-disable no-underscore-dangle */
import { Seq } from './seq';

/**
 * Remove callback from a given API event
 *
 * @param {string} event name of Seq event
 * @param {function} callback
 */
export const removeSeqListener = (event, callback) => {
    if (typeof Seq === 'undefined') {
        // eslint-disable-next-line no-console
        console.log('Better lyrics: Seq is undefined at removeSeqListener');
        return;
    }
    const newCallbacksArray = Seq.__eventCallbacks__['track-play'].filter((func) => {
        return typeof func !== 'function' || func.toString() !== callback.toString();
    });
    Seq.__eventCallbacks__[event] = newCallbacksArray;
};
