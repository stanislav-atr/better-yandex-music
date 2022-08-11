/* eslint-disable no-undef */
import { useEffect } from 'react';
import { UNIQUE_APP_POSTFIX, AGENT_NAMES } from '../../common/constants';

export const useUnmountApp = (base) => {
    useEffect(() => {
        window.addEventListener(
            `${UNIQUE_APP_POSTFIX}|${AGENT_NAMES.UNMOUNT_APP}`,
            () => {
                // const rndElem = rndContainer?.current?.resizableElement?.current;
                // if (!rndElem) {
                //     return;
                // }
                // const { clientWidth, clientHeight } = rndElem;
                // // Send parameters to the background before unmounting
                // const e = new CustomEvent('TEST-EVENT', {
                //     detail: {
                //         size: {
                //             width: clientWidth,
                //             heigh: clientHeight,
                //         },
                //     },
                // });
                // dispatchEvent(e);
                // eslint-disable-next-line no-console
                console.log(`${UNIQUE_APP_POSTFIX}: unmounting app...`);
                base.root.unmount();
                base.container.remove();
            },
            { once: true },
        );

        return () => {};//!!!!!!!!!!!!!!
    }, [base]);
};
