import { ENDPOINTS } from '../constants';
/**
 * Fetch full track data by id
 *
 * @param {string} trackId
 * @param {Object}
 */
export const getTrack = async (trackId) => {
    const requestUrl = ENDPOINTS.TRACK.replace('{trackId}', trackId);
    const responseData = await fetch(requestUrl);
    const trackData = await responseData.json();

    return trackData;
};
