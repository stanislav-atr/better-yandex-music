import React, { useState } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { useMusicApi } from '../hooks/useMusicApi';

import './lyrics-window.css';

const LyricsWindow = () => {
    const [lyrics, setLyrics] = useState('DEFAULT GREETING TEXT');
    useMusicApi(setLyrics);

    return (
        <ResizeDragWrapper
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
            <div
                className="LyricsWindow"
            >
                <div className="controls">
                    <button type="button">ICON</button>
                    <button type="button">ICON</button>
                    <button type="button">ICON</button>
                </div>
                <div
                    className="textBox"
                >
                    {lyrics.split('\n').map((line) => {
                        const lineJSX = line.length === 0
                            ? (
                                <br />
                            )
                            : (
                                <>
                                    <br />
                                    <span>{line}</span>
                                </>
                            );
                        return lineJSX;
                    })}
                </div>
            </div>
        </ResizeDragWrapper>
    );
};

export { LyricsWindow };
