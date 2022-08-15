/* eslint-disable , no-undef */
import React, {
    useState,
    useReducer,
    useContext,
    useRef,
} from 'react';
import classNames from 'classnames';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsBox } from '../LyricsBox';
import { ThemeContext } from '../../providers';
import {
    CONTAINER_RATIOS,
    RND_MIN_MAX_SIZES,
    APP_MESSAGES,
} from '../../constants';
import {
    useMusicApi,
    useCloseApp,
} from '../../hooks';

import './lyrics-window.css';

export const LyricsWindow = ({ base, initAppParams, initLyrics }) => {
    const isDarkTheme = useContext(ThemeContext);

    const reducer = (state, action) => {
        return { ...state, ...action };
    };
    const [appParams, dispatch] = useReducer(reducer, initAppParams);
    const [lyrics, setLyrics] = useState(initLyrics || APP_MESSAGES.GREETING.VALUE);
    const lyricsWindowRef = useRef();

    useMusicApi(setLyrics, lyricsWindowRef);

    useCloseApp(base, appParams);

    const observeRndPos = (e, dragData) => {
        const { x, y } = dragData;
        dispatch({ rndPos: { x, y } });
    };

    const observeRndSize = (e, dir, refToElement, delta, position) => {
        const { clientWidth, clientHeight } = refToElement;
        dispatch({
            rndPos: position,
            rndSize: { width: clientWidth, height: clientHeight },
            fontSize: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}`,
            verseBreakHeight: `${clientWidth / CONTAINER_RATIOS.VERSE_BREAK_RATIO}`,
            scrollBlurHeight: `${clientWidth / CONTAINER_RATIOS.SCROLL_BLUR_RATIO}`,
        });
    };

    return (
        <ResizeDragWrapper
            bounds="window"
            className={classNames('ResizeDragWrapper', { 'light_theme': !isDarkTheme })}
            position={{
                x: appParams.rndPos.x,
                y: appParams.rndPos.y,
            }}
            size={{
                width: appParams.rndSize.width,
                height: appParams.rndSize.height,
            }}
            minWidth={RND_MIN_MAX_SIZES.RND_MIN_WIDTH}
            minHeight={RND_MIN_MAX_SIZES.RND_MIN_HEIGHT}
            onResize={observeRndSize}
            onDrag={observeRndPos}
        >
            <div
                className="lyrics_window"
                ref={lyricsWindowRef}
            >
                <div
                    className="scroll_blur"
                    style={{ height: `${appParams.scrollBlurHeight}px` }}
                />
                <LyricsBox
                    lyrics={lyrics}
                    fontSize={appParams.fontSize}
                    verseBreakHeight={appParams.verseBreakHeight}
                />
            </div>
        </ResizeDragWrapper>
    );
};
