import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

import { getTrack } from '../../music-api';
import { extractLyrics } from '../extract-lyrics';
import { addSeqListener, removeSeqListener } from '../../seq-api';

const LyricsWindow = () => {
    const [lyrics, setLyrics] = useState('DEFAULT GREETING TEXT');

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid 1px #ddd',
        backgroundColor: 'hsla(0, 0%, 9%, 0.90)',
        zIndex: '1000',
    };

    useEffect(() => {
        // Add new track event listener
        const trackChangeHandler = async (track) => {
            const trackData = await getTrack(track.id);
            const lyrics = extractLyrics(trackData);
            setLyrics(lyrics);
            // const test = lyrics.split('\n');
            console.log(lyrics);
        };
        addSeqListener('track-play', trackChangeHandler);

        return () => removeSeqListener('track-play', trackChangeHandler);
    }, []);

    return (
        <Rnd
            style={style}
            default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
            }}
        >
            <div
                className="sidebar-track__lyric-text typo"
                id="TEST-COMPONENT"
            >
                <p>{`${lyrics}`}</p>
            </div>
        </Rnd>
    );
};

export { LyricsWindow };
