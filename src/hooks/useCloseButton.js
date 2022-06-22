import { useEffect } from 'react';
import { CONTAINER_NODE_ID } from '../constants';

export const useCloseButton = (buttonRef) => {
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
        const closeButton = buttonRef.current;
        closeButton.addEventListener('click', handleCloseButton);
        return () => {
            closeButton.removeEventListener('click', handleCloseButton);
        };
    }, [buttonRef]);
};
