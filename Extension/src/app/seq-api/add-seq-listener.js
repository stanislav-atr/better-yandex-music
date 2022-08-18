/* eslint-disable no-underscore-dangle */
import { Seq } from './seq';

/**
 * Add callback on a given API event
 *
 * @param {string} event name of Seq event
 * @param {function} callback
 */
export const addSeqListener = (event, callback) => {
    Seq.__eventCallbacks__[event].push(callback);
};
