/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsLine } from '../LyricsLine';
import { APP_MESSAGES } from '../../constants';
import {
    useMusicApi,
    useResizeObserver,
    useCloseButton,
} from '../../hooks';

import './lyrics-window.css';

const LyricsWindow = () => {
    const defaultStyle = {
        width: 360,
        height: 640,
        minWidth: '200',
        minHeight: '355',
        fontSize: '15',
        fontToContainerRatio: 20,
    };
    const [lyrics, setLyrics] = useState(APP_MESSAGES.GREETING);
    const [fontSize, setFontSize] = useState(defaultStyle.fontSize);
    const textBoxRef = useRef();
    const closeButtonRef = useRef();

    useMusicApi(setLyrics);
    useCloseButton(closeButtonRef);
    useResizeObserver(textBoxRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / defaultStyle.fontToContainerRatio}`);
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
                width: defaultStyle.width,
                height: defaultStyle.height,
            }}
            minWidth={defaultStyle.minWidth}
            minHeight={defaultStyle.minHeight}
        >
            <button
                type="button"
                className="close_button"
                ref={closeButtonRef}
            >
                Close
            </button>
            <div className="lyrics_window">
                <div className="scroll_padding top" />
                <div
                    ref={textBoxRef}
                    className="text_box"
                    style={{
                        fontSize: `${fontSize}px`,
                    }}
                >
                    {lyrics.split('\n').map((line) => {
                        return (
                            <LyricsLine
                                key={Math.random().toString()}
                                line={line}
                            />
                        );
                    })}
                </div>
                <div className="scroll_padding bottom" />
            </div>
        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
