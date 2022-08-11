/* eslint-disable no-undef */
import { useEffect } from 'react';
import { UNIQUE_APP_PREFIX, AGENT_NAMES } from '../../common/constants';

export const useCloseApp = (base, appParams) => {
    useEffect(() => {
        const closeAppHandler = () => {
            // Send parameters to the background before unmounting
            const e = new CustomEvent(`${UNIQUE_APP_PREFIX}|app-params`, { detail: appParams });
            dispatchEvent(e);

            // eslint-disable-next-line no-console
            console.log(`${UNIQUE_APP_PREFIX}: unmounting app...`);
            base.root.unmount();
            base.container.remove();
        };

        window.addEventListener(
            `${UNIQUE_APP_PREFIX}|${AGENT_NAMES.CLOSE_APP}`,
            closeAppHandler,
            { once: true },
        );

        return () => window.removeEventListener(`${UNIQUE_APP_PREFIX}|${AGENT_NAMES.CLOSE_APP}`, closeAppHandler);
    }, [base, appParams]);
};
