/* eslint-disable , no-undef */
import React, {
    useEffect,
    useReducer,
    useContext,
} from 'react';
import classNames from 'classnames';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsBox } from '../LyricsBox';
import { ThemeContext } from '../../providers';
import { UNIQUE_APP_PREFIX, AGENT_NAMES } from '../../../common/constants';
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

export const LyricsWindow = ({ base, storedAppParams }) => {
    const isDarkTheme = useContext(ThemeContext);

    const reducer = (state, action) => {
        return { ...state, ...action };
    };
    console.log(storedAppParams)
    const [appParams, dispatch] = useReducer(reducer, storedAppParams || defaultAppParams);

    // Use one custom hook useAddEventListener(event, eHandler, additionalCode)
    // useEffect(() => {
    //     const eventName = `${UNIQUE_APP_PREFIX}|${AGENT_NAMES.SEND_APP_PARAMS}`;
    //     const savedParamsHandler = (e) => {
    //         const { appParams: savedAppParams } = e.detail.payload;
    //         console.log(savedAppParams);
    //         /* IF NOT EMPTY: */dispatch(savedAppParams);
    //     };

    //     window.addEventListener(
    //         eventName,
    //         savedParamsHandler,
    //         { once: true },
    //     );

    //     return () => window.removeEventListener(eventName, savedParamsHandler);
    // });
    useCloseApp(base, appParams);

    const observeRndPos = (e, dragData) => { // !!!!!throttle these
        const { x, y } = dragData;
        dispatch({ rndPos: { x, y } });
    };

    const observeRndSize = (e, dir, refToElement, delta, position) => { // !!!!!throttle these
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
            // default={{
            //     x: appParams.rndPos.x,
            //     y: appParams.rndPos.y,
            //     width: appParams.rndSize.width,
            //     height: appParams.rndSize.height,
            // }}
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
