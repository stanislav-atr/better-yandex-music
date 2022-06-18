import { useEffect } from 'react';

export const useResizeObserver = (observableRef, observerCallback) => {
    useEffect(() => {
        const refNode = observableRef.current.resizableElement.current;
        // eslint-disable-next-line no-undef
        const rObserver = new ResizeObserver(observerCallback);
        rObserver.observe(refNode);
        return () => {
            rObserver.unobserve(refNode);
        };
    }, [observableRef, observerCallback]);
};
