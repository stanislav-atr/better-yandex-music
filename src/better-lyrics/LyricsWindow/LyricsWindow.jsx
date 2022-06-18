/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { useMusicApi } from '../hooks/useMusicApi';
import { STYLES } from '../../utils/constants';

import './lyrics-window.css';

const LyricsWindow = () => {
    const [lyrics, setLyrics] = useState('DEFAULT GREETING TEXT');
    const [fontSize, setFontSize] = useState('15');
    const rdWrapperRef = useRef();
    useMusicApi(setLyrics);

    useEffect(() => {
        const rObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            setFontSize(`${width / STYLES.fontToSizeRatio}`);
        });
        rObserver.observe(rdWrapperRef.current.resizableElement.current);
    }, [setFontSize]);

    const renderLine = (line, isFirst, isLast) => {
        const key = (Math.random()).toString();
        const isText = line.length !== 0;

        const lineStyle = {
            'marginLeft': '5%',
            'marginTop': isFirst ? '5%' : '0',
            'marginBottom': isLast ? '5%' : '0',
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
                width: 360,
                height: 640,
            }}
            minWidth="300"
            minHeight="533"
        >
            <div className="lyrics_window">
                <div className="text_box">
                    {lyrics.split('\n').map((line, i, array) => {
                        const isFirst = i === 0;
                        const isLast = i === array.length - 1;
                        return renderLine(line, isFirst, isLast);
                    })}
                </div>
            </div>
        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
