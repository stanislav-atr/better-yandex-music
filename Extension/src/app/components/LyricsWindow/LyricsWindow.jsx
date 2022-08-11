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
    RND_MIN_MAX_SIZES,
} from '../../constants';
import {
    useCloseApp,
} from '../../hooks';

import './lyrics-window.css';

const defaultAppParams = {
    fontSize: '15',
    verseBreakHeight: '12.5',
    scrollBlurHeight: '25.5',
    rndSize: {
        width: 360,
        height: 640,
    },
    rndPos: {
        x: 0,
        y: 0,
    },
};

export const LyricsWindow = ({ base }) => {
    const isDarkTheme = useContext(ThemeContext);

    const reducer = (state, action) => {
        return { ...state, ...action };
    };
    const [appParams, dispatch] = useReducer(reducer, defaultAppParams);

    useCloseApp(base, appParams);

    const observeRndPos = (e, dragData) => {
        const { x, y } = dragData;
        dispatch({ rndPos: { x, y } });
    };

    const observeRndSize = (e, dir, refToElement) => {
        const { clientWidth, clientHeight } = refToElement;
        dispatch({ rndSize: { width: clientWidth, height: clientHeight } });
        dispatch({ fontSize: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}` });
        dispatch({ verseBreakHeight: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}` });
        dispatch({ scrollBlurHeight: `${clientWidth / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}` });
    };

    return (
        <ResizeDragWrapper
            bounds="window"
            className={classNames('ResizeDragWrapper', { 'light_theme': !isDarkTheme })}
            default={{
                ...appParams.rndPos,
                ...appParams.rndSize,
            }}
            minWidth={RND_MIN_MAX_SIZES.RND_MIN_WIDTH}
            minHeight={RND_MIN_MAX_SIZES.RND_MIN_HEIGHT}
            onResize={observeRndSize}
            onDrag={observeRndPos}
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
