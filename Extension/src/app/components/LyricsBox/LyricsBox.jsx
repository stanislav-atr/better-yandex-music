/* eslint-disable , no-undef */
import React from 'react';
import { LyricsLine } from '../LyricsLine';

export const LyricsBox = ({ lyrics, verseBreakHeight, fontSize }) => {
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
