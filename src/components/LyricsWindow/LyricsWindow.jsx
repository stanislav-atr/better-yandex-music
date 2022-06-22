/* eslint-disable react/no-this-in-sfc, no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { Rnd as ResizeDragWrapper } from 'react-rnd';
import { LyricsLine } from '../LyricsLine';
import { useMusicApi, useResizeObserver } from '../../hooks';
import { STYLES, LYRICS_STUB, CONTAINER_NODE_ID } from '../../constants';

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

    useResizeObserver(textBoxRef, (entries) => {
        const { width } = entries[0].contentRect;
        setFontSize(`${width / STYLES.fontToSizeRatio}`);
    });

    useEffect(() => {
        textBoxRef.current.scrollTo(0, 0);
    }, [lyrics]);

    const handleCloseButton = () => {
        const event = new Event('lyrics:close-button-click', { bubbles: true });
        // eslint-disable-next-line no-undef
        const container = document.querySelector(`[id="${CONTAINER_NODE_ID}"]`);
        if (container) {
            container.dispatchEvent(event);
        }
    };

    useEffect(() => {
        // close event should be dispatched from DOM node to be caught on another DOM node
        const closeButton = closeButtonRef.current;
        closeButton.addEventListener('click', handleCloseButton);
        return () => {
            closeButton.removeEventListener('click', handleCloseButton);
        };
    }, []);

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
