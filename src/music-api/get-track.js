import { ENDPOINTS } from '../utils/constants';
/**
 * Request full track data by id
 *
 * @param {string} trackId
 * @param {Object}
 */
export const getTrack = async (trackId) => {
    const requestUrl = ENDPOINTS.TRACK.replace('{trackId}', trackId);
    const responseData = await fetch(requestUrl)
        .catch((err) => console.log(`Track endpoint error: \n ${err}`)); /* eslint-disable-line no-console */
    const trackData = await responseData.json();
    return trackData;
};
