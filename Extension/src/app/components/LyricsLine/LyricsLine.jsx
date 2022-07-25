/* eslint-disable , no-undef */
import React from 'react';
import { APP_MESSAGES } from '../../constants';

const {
    BASE_STYLE,
    GREETING,
    LYRICS_NOT_AVAILABLE,
} = APP_MESSAGES;

export const LyricsLine = (props) => {
    const { line } = props;

    const isGreeting = line === GREETING.VALUE;
    const isLyricsNotAvailable = line === LYRICS_NOT_AVAILABLE.VALUE;
    const isAppMessage = isGreeting || isLyricsNotAvailable;
    const lineStyle = isAppMessage ? {
        ...BASE_STYLE,
        ...(isGreeting && GREETING.STYLE),
        ...(isLyricsNotAvailable && LYRICS_NOT_AVAILABLE.STYLE),
    } : null;

    return (
        <span
            className={isAppMessage ? 'app_message' : 'lyrics_line'}
            key={Math.random().toString()}
            style={lineStyle}
        >
            {`${line}`}
        </span>
    );
};
