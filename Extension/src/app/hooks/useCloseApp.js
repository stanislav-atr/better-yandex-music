/* eslint-disable no-undef */
import { useEffect } from 'react';
import {
    UNIQUE_APP_ID,
    AGENT_NAMES,
    APP_EVENT_NAMES,
} from '../../common/constants';

export const useCloseApp = (base, appParams) => {
    useEffect(() => {
        const closeAppHandler = () => {
            // Send parameters to the background before unmounting
            const e = new CustomEvent(
                `${UNIQUE_APP_ID}|${APP_EVENT_NAMES.SAVE_APP_PARAMS}`,
                { detail: appParams },
            );
            dispatchEvent(e);

            base.root.unmount();
            base.container.remove();
        };

        window.addEventListener(
            `${UNIQUE_APP_ID}|${AGENT_NAMES.CLOSE_APP}`,
            closeAppHandler,
            { once: true },
        );

        window.addEventListener('beforeunload', closeAppHandler);

        return () => {
            window.removeEventListener(`${UNIQUE_APP_ID}|${AGENT_NAMES.CLOSE_APP}`, closeAppHandler);
            window.removeEventListener('beforeunload', closeAppHandler);
        };
    }, [base, appParams]);
};
