import { useEffect } from 'react';

export const useResizeObserver = (observableRef, observerCallback) => {
    useEffect(() => {
        // eslint-disable-next-line no-undef
        const rObserver = new ResizeObserver(observerCallback);
        rObserver.observe(observableRef.current.resizableElement.current);
    }, [observableRef, observerCallback]);
};
