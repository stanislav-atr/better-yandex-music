import { useEffect } from 'react';
import { getTrack, extractLyrics } from '../music-api';
import { APP_MESSAGES } from '../constants';
import {
    addSeqListener,
    removeSeqListener,
} from '../seq-api';

export const useMusicApi = (stateSetter, lyricsWindowRef) => {
    // Add new track event listener
    const trackChangeHandler = async (track) => {
        const trackData = await getTrack(track.id);
        const extractedString = extractLyrics(trackData);
        const lyrics = extractedString || APP_MESSAGES.LYRICS_NOT_AVAILABLE.VALUE;

        stateSetter(lyrics);
        lyricsWindowRef.current.scrollTo({ top: 0 });
    };

    useEffect(() => {
        addSeqListener('track-play', trackChangeHandler);
        return () => removeSeqListener('track-play', trackChangeHandler);
    });
};
