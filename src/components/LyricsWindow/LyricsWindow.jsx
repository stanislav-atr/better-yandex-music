/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import {
    APP_MESSAGES,
    CONTAINER_RATIOS,
    DEFAULT_STYLE_PARAMS,
} from '../../constants';
import {
    useMusicApi,
    useResizeObserver,
    useCloseButton,
} from '../../hooks';

import './lyrics-window.css';

const LyricsWindow = () => {
    const {
        BASE_STYLE,
        GREETING,
        LYRICS_NOT_AVAILABLE,
    } = APP_MESSAGES;

    const [lyrics, setLyrics] = useState(GREETING.VALUE);
    const [fontSize, setFontSize] = useState(DEFAULT_STYLE_PARAMS.FONT_SIZE);
    const [verseBreakHeight, setVerseBreakHeight] = useState(DEFAULT_STYLE_PARAMS.VERSE_BREAK_HEIGHT);
    const [scrollBlurHeight, setScrollBlurHeight] = useState(DEFAULT_STYLE_PARAMS.SCROLL_BLUR_HEIGHT);

    const textBoxRef = useRef();
    const closeButtonRef = useRef();

    useMusicApi(setLyrics);
    useCloseButton(closeButtonRef);
    useResizeObserver(textBoxRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / CONTAINER_RATIOS.FONT_RATIO}`);
        setVerseBreakHeight(`${width / CONTAINER_RATIOS.VERSE_BREAK_RATIO}`);
        setScrollBlurHeight(`${width / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}`);
    });

    useEffect(() => {
        textBoxRef.current.scrollTo(0, 0);
    }, [lyrics]);

    const renderLyricsLine = (line) => {
        const key = Math.random().toString();
        const isText = line.length !== 0;
        if (!isText) {
            // Render verse break for empty lines
            return (
                <div
                    key={key}
                    style={{ height: `${verseBreakHeight}px` }}
                />
            );
        }

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
                key={key}
                style={lineStyle}
            >
                {line}
            </span>
        );
    };

    return (
        <ResizeDragWrapper
            bounds="window"
            className="ResizeDragWrapper"
            default={{
                x: 0,
                y: 0,
                width: DEFAULT_STYLE_PARAMS.RND_WIDTH,
                height: DEFAULT_STYLE_PARAMS.RND_HEIGHT,
            }}
            minWidth={DEFAULT_STYLE_PARAMS.RND_MIN_WIDTH}
            minHeight={DEFAULT_STYLE_PARAMS.RND_MIN_HEIGHT}
        >
            <button
                type="button"
                className="close_button"
                ref={closeButtonRef}
            >
                Close
            </button>
            <div className="lyrics_window">
                <div
                    className="scroll_blur"
                    style={{ height: `${scrollBlurHeight}px` }}
                />
                <div
                    ref={textBoxRef}
                    className="text_box"
                    style={{
                        fontSize: `${fontSize}px`,
                    }}
                >
                    {lyrics.split('\n').map((line) => renderLyricsLine(line))}
                </div>
            </div>

        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
