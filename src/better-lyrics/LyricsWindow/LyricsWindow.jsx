/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { useMusicApi } from '../hooks/useMusicApi';
import { STYLES } from '../../utils/constants';

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
    const [lyrics, setLyrics] = useState('DEFAULT GREETING TEXT');
    const [fontSize, setFontSize] = useState(defaultStyleParams.fontSize);
    const rdWrapperRef = useRef();

    useMusicApi(setLyrics);

    useEffect(() => {
        const rObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            setFontSize(`${width / STYLES.fontToSizeRatio}`);
        });
        rObserver.observe(rdWrapperRef.current.resizableElement.current);
    }, [setFontSize]);

    const renderLine = (line, margins) => {
        const key = (Math.random()).toString();
        const isText = line.length !== 0;

        const lineStyle = {
            'marginLeft': '5%',
            'marginTop': margins.top,
            'marginBottom': margins.bottom,
            'fontSize': `${fontSize}px`,
        };

        return isText ? (
            <span
                style={lineStyle}
                key={key}
            >
                {line}
            </span>
        )
            : <br key={key} />;
    };

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
                        return renderLine(line, margins);
                    })}
                </div>
            </div>
        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
