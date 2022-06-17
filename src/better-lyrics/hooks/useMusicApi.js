import { useEffect } from 'react';
import { getTrack } from '../../music-api';
import { extractLyrics } from '../helpers/extract-lyrics';
import { addSeqListener, removeSeqListener } from '../../seq-api';

export const useMusicApi = (stateSetter) => {
    useEffect(() => {
        // Add new track event listener
        const trackChangeHandler = async (track) => {
            const trackData = await getTrack(track.id);
            const lyrics = extractLyrics(trackData);
            stateSetter(lyrics);
        };
        addSeqListener('track-play', trackChangeHandler);

        return () => removeSeqListener('track-play', trackChangeHandler);
    }, [stateSetter]);
};
