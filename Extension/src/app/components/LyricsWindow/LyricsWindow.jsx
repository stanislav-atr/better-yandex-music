/* eslint-disable , no-undef */
import React, {
    useState,
    useRef,
    useContext,
} from 'react';
import classNames from 'classnames';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsBox } from '../LyricsBox';
import { ThemeContext } from '../../providers';
import {
    CONTAINER_RATIOS,
    DEFAULT_STYLE_PARAMS,
} from '../../constants';
import {
    useResizeObserver,
    useUnmountApp,
} from '../../hooks';

import './lyrics-window.css';

export const LyricsWindow = ({ base }) => {
    const isDarkTheme = useContext(ThemeContext);

    const rndRef = useRef();

    const [fontSize, setFontSize] = useState(DEFAULT_STYLE_PARAMS.FONT_SIZE);
    const [verseBreakHeight, setVerseBreakHeight] = useState(DEFAULT_STYLE_PARAMS.VERSE_BREAK_HEIGHT);
    const [scrollBlurHeight, setScrollBlurHeight] = useState(DEFAULT_STYLE_PARAMS.SCROLL_BLUR_HEIGHT);

    useUnmountApp(base, rndRef);
    useResizeObserver(rndRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / CONTAINER_RATIOS.FONT_RATIO}`);
        setVerseBreakHeight(`${width / CONTAINER_RATIOS.VERSE_BREAK_RATIO}`);
        setScrollBlurHeight(`${width / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}`);
    });

    return (
        <ResizeDragWrapper
            ref={rndRef}
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
                <LyricsBox
                    fontSize={fontSize}
                    verseBreakHeight={verseBreakHeight}
                />
            </div>
        </ResizeDragWrapper>
    );
};
