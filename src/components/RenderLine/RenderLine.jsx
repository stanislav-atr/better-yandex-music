/* eslint-disable react/no-this-in-sfc, no-undef */
import React from 'react';

const RenderLine = (props) => {
    const { line, margins, fontSize } = props;
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

export { RenderLine };
