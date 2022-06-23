/* eslint-disable react/no-this-in-sfc, no-undef */
import React from 'react';

const LyricsLine = (props) => {
    const { line, fontSize } = props;
    const isText = line.length !== 0;

    return isText ? (
        <span
            style={{ fontSize: `${fontSize}px` }}
        >
            {line}
        </span>
    )
        : <br />;
};

export { LyricsLine };
