/**
 * Extract lyrics text from track data
 *
 * @param {Object} trackData
 * @return {string} track lyrics text
 */
export const extractLyrics = (trackData) => {
    const lyricsData = trackData.lyric;
    if (!Array.isArray(lyricsData) || lyricsData.length === 0) {
        return '';
    }
    const lyricText = lyricsData[0].fullLyrics;

    const lyricsString = lyricText || 'NO LYRICS AVAILABLE';

    return lyricsString;
};
