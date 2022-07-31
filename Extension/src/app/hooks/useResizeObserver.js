/* eslint-disable no-undef */
import { useEffect } from 'react';

export const useResizeObserver = (observableRef, observerCallback) => {
    useEffect(() => {
        let observableElem;
        if (observableRef?.current?.nodeName) {
            // Ref of standard element
            observableElem = observableRef.current;
        } else if (observableRef?.current?.resizableElement?.current) {
            // Ref of custom component
            observableElem = observableRef.current.resizableElement.current;
        }

        const rObserver = new ResizeObserver(observerCallback);
        rObserver.observe(observableElem);
        return () => {
            rObserver.unobserve(observableElem);
        };
    }, [observableRef, observerCallback]);
};
