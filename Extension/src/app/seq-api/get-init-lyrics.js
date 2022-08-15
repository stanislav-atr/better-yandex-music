import { Seq } from './seq';
import { getTrack, extractLyrics } from '../music-api';
import { APP_MESSAGES } from '../constants';

export const getInitLyrics = async () => {
    if (!Seq.isPlaying()) {
        return undefined;
    }
    const track = Seq.getCurrent();
    const trackData = await getTrack(track.id);
    const extractedString = extractLyrics(trackData);
    const lyrics = extractedString || APP_MESSAGES.LYRICS_NOT_AVAILABLE.VALUE;
    return lyrics;
};
