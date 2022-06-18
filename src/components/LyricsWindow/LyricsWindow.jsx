/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { RenderLine } from '../RenderLine';
import { useMusicApi, useResizeObserver } from '../../hooks';
import { STYLES, LYRICS_STUB } from '../../constants';

import './lyrics-window.css';

const LyricsWindow = () => {
    const defaultStyleParams = {
        width: 360,
        height: 640,
        minWidth: '300',
        minHeight: '533',
        fontSize: '15',
        firstLineMargin: '5%',
        lastLineMargin: '5%',
    };
    const [lyrics, setLyrics] = useState(LYRICS_STUB);
    const [fontSize, setFontSize] = useState(defaultStyleParams.fontSize);
    const rdWrapperRef = useRef();

    useMusicApi(setLyrics);

    useResizeObserver(rdWrapperRef, setFontSize, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / STYLES.fontToSizeRatio}`);
    });

    return (
        <ResizeDragWrapper
            ref={rdWrapperRef}
            bounds="window"
            className="ResizeDragWrapper"
            default={{
                x: 0,
                y: 0,
                width: defaultStyleParams.width,
                height: defaultStyleParams.height,
            }}
            minWidth={defaultStyleParams.minWidth}
            minHeight={defaultStyleParams.minHeight}
        >
            <div className="lyrics_window">
                <div className="text_box">
                    {lyrics.split('\n').map((line, i, array) => {
                        const { firstLineMargin, lastLineMargin } = defaultStyleParams;
                        const margins = {
                            top: i === 0 ? firstLineMargin : '0',
                            bottom: i === array.length - 1 ? lastLineMargin : '0',
                        };
                        return (
                            <RenderLine
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
