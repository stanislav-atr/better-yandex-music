/* eslint-disable react/no-this-in-sfc, no-undef */
import React from 'react';

const LyricsLine = (props) => {
    const { line, margins, fontSize } = props;
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
        >
            {line}
        </span>
    )
        : <br />;
};

export { LyricsLine };
