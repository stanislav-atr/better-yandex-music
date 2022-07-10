import { useEffect } from 'react';
import { getTrack } from '../music-api';
import { APP_MESSAGES } from '../constants';
import { extractLyrics } from '../utils/extract-lyrics';
import { addSeqListener, removeSeqListener } from '../seq-api';

export const useMusicApi = (stateSetter) => {
    useEffect(() => {
        // Add new track event listener
        const trackChangeHandler = async (track) => {
            const trackData = await getTrack(track.id);
            const extractedString = extractLyrics(trackData);
            const lyrics = extractedString || APP_MESSAGES.LYRICS_NOT_AVAILABLE.VALUE;
            stateSetter(lyrics);
        };
        addSeqListener('track-play', trackChangeHandler);

        return () => removeSeqListener('track-play', trackChangeHandler);
    }, [stateSetter]);
};
