/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsLine } from '../LyricsLine';
import { STYLES, LYRICS_STUB } from '../../constants';
import {
    useMusicApi,
    useResizeObserver,
    useCloseButton,
} from '../../hooks';

import './lyrics-window.css';

const LyricsWindow = () => {
    const styleParams = {
        width: 360,
        height: 640,
        minWidth: '300',
        minHeight: '533',
        fontSize: '15',
        firstLineMargin: '5%',
        lastLineMargin: '5%',
    };
    const [lyrics, setLyrics] = useState(LYRICS_STUB);
    const [fontSize, setFontSize] = useState(styleParams.fontSize);
    const textBoxRef = useRef();
    const closeButtonRef = useRef();

    useMusicApi(setLyrics);
    useCloseButton(closeButtonRef);
    useResizeObserver(textBoxRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / STYLES.fontToSizeRatio}`);
    });

    useEffect(() => {
        textBoxRef.current.scrollTo(0, 0);
    }, [lyrics]);

    return (
        <ResizeDragWrapper
            bounds="window"
            className="ResizeDragWrapper"
            default={{
                x: 0,
                y: 0,
                width: styleParams.width,
                height: styleParams.height,
            }}
            minWidth={styleParams.minWidth}
            minHeight={styleParams.minHeight}
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
                    ref={textBoxRef}
                    className="text_box"
                >
                    {lyrics.split('\n').map((line, i, array) => {
                        const { firstLineMargin, lastLineMargin } = styleParams;
                        const margins = {
                            top: i === 0 ? firstLineMargin : '0',
                            bottom: i === array.length - 1 ? lastLineMargin : '0',
                        };
                        return (
                            <LyricsLine
                                key={Math.random().toString()}
                                line={line}
                                margins={margins}
                                fontSize={fontSize}
                            />
                        );
                    })}
                </div>
            </div>
        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
