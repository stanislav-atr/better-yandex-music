import React from 'react';

const PanelButton = React.forwardRef((props, ref) => {
    const { clickHandler, text } = props;
    return (
        <button
            ref={ref}
            type="button"
            onClick={clickHandler}
        >
            {text}
        </button>
    );
});

export { PanelButton };
