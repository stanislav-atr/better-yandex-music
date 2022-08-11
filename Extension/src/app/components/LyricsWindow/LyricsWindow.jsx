/* eslint-disable , no-undef */
import React, {
    useReducer,
    useContext,
} from 'react';
import classNames from 'classnames';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsBox } from '../LyricsBox';
import { ThemeContext } from '../../providers';
import {
    CONTAINER_RATIOS,
} from '../../constants';
import {
    useUnmountApp,
} from '../../hooks';

import './lyrics-window.css';

const DEFAULT_APP_PARAMS = {
    fontSize: '15',
    verseBreakHeight: '12.5',
    scrollBlurHeight: '25.5',
    RND_WIDTH: 360,
    RND_HEIGHT: 640,
    RND_MIN_WIDTH: '200',
    RND_MIN_HEIGHT: '355',
};

export const LyricsWindow = ({ base }) => {
    const isDarkTheme = useContext(ThemeContext);

    const reducer = (state, action) => {
        return {
            ...state,
            ...action,
        };
    };
    const [appParams, dispatch] = useReducer(reducer, DEFAULT_APP_PARAMS);

    useUnmountApp(base);

    const observeRnd = (e, dir, refToElement) => { // throttle this?
        console.log('RESIZE');
        const { clientWidth } = refToElement;
        dispatch({ fontSize: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}` });
        dispatch({ verseBreakHeight: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}` });
        dispatch({ scrollBlurHeight: `${clientWidth / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}` });
    };

    return (
        <ResizeDragWrapper
            bounds="window"
            className={classNames('ResizeDragWrapper', { 'light_theme': !isDarkTheme })}
            default={{
                x: 0,
                y: 0,
                width: DEFAULT_APP_PARAMS.RND_WIDTH,
                height: DEFAULT_APP_PARAMS.RND_HEIGHT,
            }}
            minWidth={DEFAULT_APP_PARAMS.RND_MIN_WIDTH}
            minHeight={DEFAULT_APP_PARAMS.RND_MIN_HEIGHT}
            onResize={observeRnd}
        >
            <div className="lyrics_window">
                <div
                    className="scroll_blur"
                    style={{ height: `${appParams.scrollBlurHeight}px` }}
                />
                <LyricsBox
                    fontSize={appParams.fontSize}
                    verseBreakHeight={appParams.verseBreakHeight}
                />
            </div>
        </ResizeDragWrapper>
    );
};
