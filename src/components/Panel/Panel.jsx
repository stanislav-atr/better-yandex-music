import React, { useRef, useEffect } from 'react';
import { PanelButton } from '../PanelButton';
import { CONTAINER_NODE_ID } from '../../constants';

const Panel = () => {
    const closeButtonRef = useRef();
    const clickHandlers = {
        closeHandler: () => {
            const event = new Event('close-button-click', { bubbles: true });
            // eslint-disable-next-line no-undef
            const container = document.querySelector(`[id="${CONTAINER_NODE_ID}"]`);
            if (container) {
                container.dispatchEvent(event);
            }
        },
        pinHandler: () => {
            console.log('PIN');
        },
        settingsHandler: () => {
            console.log('SETTINGS');
        },
    };

    useEffect(() => {
        const closeButton = closeButtonRef.current;
        closeButton.addEventListener('click', clickHandlers.closeHandler);
        return () => {
            closeButton.removeEventListener('click', clickHandlers.closeHandler);
        };
    });

    return (
        <div className="panel">
            <PanelButton clickHandler={clickHandlers.settingsHandler} text="Settings" />
            <PanelButton clickHandler={clickHandlers.pinHandler} text="Pin" />
            <PanelButton ref={closeButtonRef} text="Close" />
        </div>
    );
};

export { Panel };
