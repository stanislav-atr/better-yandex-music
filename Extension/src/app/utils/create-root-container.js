/* eslint-disable no-undef */
import { CONTAINER_NODE_ID } from '../constants';

export const createRootContainer = () => {
    const { body } = document;
    const container = document.createElement('div');
    container.id = CONTAINER_NODE_ID;
    Object.assign(container.style, {
        position: 'absolute',
        top: '0',
        left: '0',
    });
    body.append(container);

    return container;
};
