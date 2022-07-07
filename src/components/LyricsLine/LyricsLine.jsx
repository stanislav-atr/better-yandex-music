/* eslint-disable react/no-this-in-sfc, no-undef */
import React from 'react';
import { APP_MESSAGES } from '../../constants';

const LyricsLine = (props) => {
    const { line } = props;
    const isText = line.length !== 0;
    const isGreeting = line === APP_MESSAGES.GREETING;
    const isLyricsNotAvailable = line === APP_MESSAGES.LYRICS_NOT_AVAILABLE;
    const isAppMessage = isGreeting || isLyricsNotAvailable;

    const lineStyle = isAppMessage ? {
        display: 'table',
        margin: '50% auto 0 auto',
        fontSize: '1.5em',
        // eslint-disable-next-line no-nested-ternary
        color: isGreeting ? 'green' : isLyricsNotAvailable ? 'rgb(255, 219, 77)' : 'inherit',
    } : {};
    const textLine = (
        <span
            style={lineStyle}
        >
            {line}
        </span>
    );
    const verseBreak = (
        <div style={{ minHeight: '10px', maxHeight: '6%' }} />
    );

    return isText ? textLine : verseBreak;
};

export { LyricsLine };
