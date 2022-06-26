/* eslint-disable react/no-this-in-sfc, no-undef */
import React from 'react';

const LyricsLine = (props) => {
    const { line } = props;
    const isText = line.length !== 0;

    const textLine = (
        <span>
            {line}
        </span>
    );
    const verseBreak = (
        <div style={{ minHeight: '10px', maxHeight: '6%' }} />
    );

    return isText ? textLine : verseBreak;
};

export { LyricsLine };
