/* eslint-disable , no-undef */
import React, {
    useState,
    useRef,
    useEffect,
    useContext,
} from 'react';
import classNames from 'classnames';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsLine } from '../LyricsLine';
import { ThemeContext } from '../../providers';
import {
    APP_MESSAGES,
    CONTAINER_RATIOS,
    DEFAULT_STYLE_PARAMS,
} from '../../constants';
import {
    useMusicApi,
    useResizeObserver,
} from '../../hooks';

import './lyrics-window.css';

export const LyricsWindow = () => {
    const isDarkTheme = useContext(ThemeContext);

    const [lyrics, setLyrics] = useState(APP_MESSAGES.GREETING.VALUE);
    const [fontSize, setFontSize] = useState(DEFAULT_STYLE_PARAMS.FONT_SIZE);
    const [verseBreakHeight, setVerseBreakHeight] = useState(DEFAULT_STYLE_PARAMS.VERSE_BREAK_HEIGHT);
    const [scrollBlurHeight, setScrollBlurHeight] = useState(DEFAULT_STYLE_PARAMS.SCROLL_BLUR_HEIGHT);

    const textBoxRef = useRef();

    useMusicApi(setLyrics);
    useResizeObserver(textBoxRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / CONTAINER_RATIOS.FONT_RATIO}`);
        setVerseBreakHeight(`${width / CONTAINER_RATIOS.VERSE_BREAK_RATIO}`);
        setScrollBlurHeight(`${width / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}`);
    });

    useEffect(() => {
        textBoxRef.current.scrollTo(0, 0);
    }, [lyrics]);

    return (
        <ResizeDragWrapper
            bounds="window"
            className={classNames('ResizeDragWrapper', { 'light_theme': !isDarkTheme })}
            default={{
                x: 0,
                y: 0,
                width: DEFAULT_STYLE_PARAMS.RND_WIDTH,
                height: DEFAULT_STYLE_PARAMS.RND_HEIGHT,
            }}
            minWidth={DEFAULT_STYLE_PARAMS.RND_MIN_WIDTH}
            minHeight={DEFAULT_STYLE_PARAMS.RND_MIN_HEIGHT}
        >
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
            </div>
        </ResizeDragWrapper>
    );
};
