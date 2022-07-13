import { api } from './api.js';
// import { sessionStorage } from './SessionStorage.js';
// import { SESSION_PARAMS } from './constants.js';
import { dispatch } from './agent-dispatcher';

console.log('BACKGROUND');
api.init();

dispatch();
setTimeout(() => {
    dispatch();
}, 30000);
