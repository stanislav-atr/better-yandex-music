/* eslint-disable , no-undef */
import React, { useState } from 'react';
import { LyricsLine } from '../LyricsLine';
import { APP_MESSAGES } from '../../constants';
import { useMusicApi } from '../../hooks';

export const LyricsBox = ({ verseBreakHeight, fontSize }) => {
    const [lyrics, setLyrics] = useState(APP_MESSAGES.GREETING.VALUE);
    useMusicApi(setLyrics);

    return (
        <div
            className="lyrics_box"
            style={{
                fontSize: `${fontSize}px`,
            }}
        >
            {lyrics.split('\n').map((line) => {
                const key = Math.random().toString();
                const isText = line.length !== 0;
                return isText ? <LyricsLine key={key} line={line} /> : (
                    <div
                        key={key}
                        style={{ height: `${verseBreakHeight}px` }}
                    />
                );
            })}
        </div>
    );
};
