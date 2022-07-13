/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Extension/background/SessionStorage.js":
/*!************************************************!*\
  !*** ./Extension/background/SessionStorage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sessionStorage": () => (/* binding */ sessionStorage)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./Extension/background/constants.js");


class SessionStorage {
  constructor() {
    this.init();
  }

  init() {
    this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.SESSION_PARAMS.MUSIC_API_READY] = false;
    this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID] = null;
  }

  getSetting(setting) {
    return this[setting];
  }

  setSetting(setting, value) {
    this[setting] = value;
    return true;
  }

}

const sessionStorage = new SessionStorage();

/***/ }),

/***/ "./Extension/background/agent-dispatcher/agents.js":
/*!*********************************************************!*\
  !*** ./Extension/background/agent-dispatcher/agents.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agents": () => (/* binding */ agents)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./Extension/background/constants.js");
/* eslint-disable no-undef */

const {
  GET_MUSIC_API_STATUS
} = _constants_js__WEBPACK_IMPORTED_MODULE_0__.AGENT_NAMES;
/**
 * Agent is a function that gets injected by background to a web page
 * It dispatches event that is transferred back to background by content script
 * Event name is to correspond with param agent process
 */

const agents = {
  [GET_MUSIC_API_STATUS]() {
    const {
      Seq
    } = window;

    if (Seq) {
      const e = new Event(`${GET_MUSIC_API_STATUS}:${_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNIQUE_APP_POSTFIX}`);
      console.log('AGENT');
      console.log(e); // dispatchEvent(seqReadyEvent);
    }
  }

};

/***/ }),

/***/ "./Extension/background/agent-dispatcher/dispatcher.js":
/*!*************************************************************!*\
  !*** ./Extension/background/agent-dispatcher/dispatcher.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatch": () => (/* binding */ dispatch)
/* harmony export */ });
/* harmony import */ var _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SessionStorage.js */ "./Extension/background/SessionStorage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./Extension/background/constants.js");
// import { agents } from "./agents";
// import { AGENT_NAMES } from '../constants.js';

 // const {
//     GET_MUSIC_API_STATUS,
// } = AGENT_NAMES;

const dispatch = function () {
  console.log(`Dispatcher getSetting: ${_SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.getSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID)}`);
  console.log(`Dispatcher test: ${_SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage[_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID]}`); // chrome.scripting.executeScript({
  //     world: 'MAIN',
  //     target: {
  //         tabId: SESSION_PARAMS.CURRENT_MUSIC_TAB_ID,
  //     },
  //     func: agents[agentName],
  // });
};

/***/ }),

/***/ "./Extension/background/agent-dispatcher/index.js":
/*!********************************************************!*\
  !*** ./Extension/background/agent-dispatcher/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agents": () => (/* reexport safe */ _agents__WEBPACK_IMPORTED_MODULE_0__.agents),
/* harmony export */   "dispatch": () => (/* reexport safe */ _dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)
/* harmony export */ });
/* harmony import */ var _agents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agents */ "./Extension/background/agent-dispatcher/agents.js");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dispatcher */ "./Extension/background/agent-dispatcher/dispatcher.js");



/***/ }),

/***/ "./Extension/background/api.js":
/*!*************************************!*\
  !*** ./Extension/background/api.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionStorage.js */ "./Extension/background/SessionStorage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./Extension/background/constants.js");


const api = function () {
  /**
   * Reset session on each music.yandex page reload
   */
  const initSession = () => {
    const initUrlFilter = {
      url: [{
        urlMatches: 'music.yandex.([a-z])*'
      }]
    };
    chrome.webNavigation.onCompleted.addListener(({
      tabId,
      frameType
    }) => {
      if (frameType !== 'outermost_frame') {
        return;
      }

      _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.init(); // Save tabId of last refreshed music.yandex page as current

      _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId);
    }, initUrlFilter);
  };

  const init = () => {
    initSession();
  };

  return {
    init
  };
}();

/***/ }),

/***/ "./Extension/background/constants.js":
/*!*******************************************!*\
  !*** ./Extension/background/constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AGENT_NAMES": () => (/* binding */ AGENT_NAMES),
/* harmony export */   "SESSION_PARAMS": () => (/* binding */ SESSION_PARAMS),
/* harmony export */   "UNIQUE_APP_POSTFIX": () => (/* binding */ UNIQUE_APP_POSTFIX)
/* harmony export */ });
const UNIQUE_APP_POSTFIX = 'better-lyrics';
const SESSION_PARAMS = {
  MUSIC_API_READY: 'musicApiReady',
  CURRENT_MUSIC_TAB_ID: 'currentMusicTabId'
};
const AGENT_NAMES = {
  GET_MUSIC_API_STATUS: 'get-music-api-status'
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./Extension/background/background.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./Extension/background/api.js");
/* harmony import */ var _agent_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-dispatcher */ "./Extension/background/agent-dispatcher/index.js");
 // import { sessionStorage } from './SessionStorage.js';
// import { SESSION_PARAMS } from './constants.js';


console.log('BACKGROUND');
_api_js__WEBPACK_IMPORTED_MODULE_0__.api.init();
(0,_agent_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)();
setTimeout(() => {
  (0,_agent_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)();
}, 30000);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vYmFja2dyb3VuZC9TZXNzaW9uU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL2JhY2tncm91bmQvYWdlbnQtZGlzcGF0Y2hlci9hZ2VudHMuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9iYWNrZ3JvdW5kL2FnZW50LWRpc3BhdGNoZXIvZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL2JhY2tncm91bmQvYWdlbnQtZGlzcGF0Y2hlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL2JhY2tncm91bmQvYXBpLmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vYmFja2dyb3VuZC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNFU1NJT05fUEFSQU1TIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5jbGFzcyBTZXNzaW9uU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzW1NFU1NJT05fUEFSQU1TLk1VU0lDX0FQSV9SRUFEWV0gPSBmYWxzZTtcbiAgICB0aGlzW1NFU1NJT05fUEFSQU1TLkNVUlJFTlRfTVVTSUNfVEFCX0lEXSA9IG51bGw7XG4gIH1cblxuICBnZXRTZXR0aW5nKHNldHRpbmcpIHtcbiAgICByZXR1cm4gdGhpc1tzZXR0aW5nXTtcbiAgfVxuXG4gIHNldFNldHRpbmcoc2V0dGluZywgdmFsdWUpIHtcbiAgICB0aGlzW3NldHRpbmddID0gdmFsdWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3Qgc2Vzc2lvblN0b3JhZ2UgPSBuZXcgU2Vzc2lvblN0b3JhZ2UoKTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuaW1wb3J0IHsgVU5JUVVFX0FQUF9QT1NURklYLCBBR0VOVF9OQU1FUyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5jb25zdCB7XG4gIEdFVF9NVVNJQ19BUElfU1RBVFVTXG59ID0gQUdFTlRfTkFNRVM7XG4vKipcbiAqIEFnZW50IGlzIGEgZnVuY3Rpb24gdGhhdCBnZXRzIGluamVjdGVkIGJ5IGJhY2tncm91bmQgdG8gYSB3ZWIgcGFnZVxuICogSXQgZGlzcGF0Y2hlcyBldmVudCB0aGF0IGlzIHRyYW5zZmVycmVkIGJhY2sgdG8gYmFja2dyb3VuZCBieSBjb250ZW50IHNjcmlwdFxuICogRXZlbnQgbmFtZSBpcyB0byBjb3JyZXNwb25kIHdpdGggcGFyYW0gYWdlbnQgcHJvY2Vzc1xuICovXG5cbmV4cG9ydCBjb25zdCBhZ2VudHMgPSB7XG4gIFtHRVRfTVVTSUNfQVBJX1NUQVRVU10oKSB7XG4gICAgY29uc3Qge1xuICAgICAgU2VxXG4gICAgfSA9IHdpbmRvdztcblxuICAgIGlmIChTZXEpIHtcbiAgICAgIGNvbnN0IGUgPSBuZXcgRXZlbnQoYCR7R0VUX01VU0lDX0FQSV9TVEFUVVN9OiR7VU5JUVVFX0FQUF9QT1NURklYfWApO1xuICAgICAgY29uc29sZS5sb2coJ0FHRU5UJyk7XG4gICAgICBjb25zb2xlLmxvZyhlKTsgLy8gZGlzcGF0Y2hFdmVudChzZXFSZWFkeUV2ZW50KTtcbiAgICB9XG4gIH1cblxufTsiLCIvLyBpbXBvcnQgeyBhZ2VudHMgfSBmcm9tIFwiLi9hZ2VudHNcIjtcbi8vIGltcG9ydCB7IEFHRU5UX05BTUVTIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi4vU2Vzc2lvblN0b3JhZ2UuanMnO1xuaW1wb3J0IHsgU0VTU0lPTl9QQVJBTVMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnOyAvLyBjb25zdCB7XG4vLyAgICAgR0VUX01VU0lDX0FQSV9TVEFUVVMsXG4vLyB9ID0gQUdFTlRfTkFNRVM7XG5cbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coYERpc3BhdGNoZXIgZ2V0U2V0dGluZzogJHtzZXNzaW9uU3RvcmFnZS5nZXRTZXR0aW5nKFNFU1NJT05fUEFSQU1TLkNVUlJFTlRfTVVTSUNfVEFCX0lEKX1gKTtcbiAgY29uc29sZS5sb2coYERpc3BhdGNoZXIgdGVzdDogJHtzZXNzaW9uU3RvcmFnZVtTRVNTSU9OX1BBUkFNUy5DVVJSRU5UX01VU0lDX1RBQl9JRF19YCk7IC8vIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gIC8vICAgICB3b3JsZDogJ01BSU4nLFxuICAvLyAgICAgdGFyZ2V0OiB7XG4gIC8vICAgICAgICAgdGFiSWQ6IFNFU1NJT05fUEFSQU1TLkNVUlJFTlRfTVVTSUNfVEFCX0lELFxuICAvLyAgICAgfSxcbiAgLy8gICAgIGZ1bmM6IGFnZW50c1thZ2VudE5hbWVdLFxuICAvLyB9KTtcbn07IiwiZXhwb3J0ICogZnJvbSAnLi9hZ2VudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXNwYXRjaGVyJzsiLCJpbXBvcnQgeyBzZXNzaW9uU3RvcmFnZSB9IGZyb20gJy4vU2Vzc2lvblN0b3JhZ2UuanMnO1xuaW1wb3J0IHsgU0VTU0lPTl9QQVJBTVMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5leHBvcnQgY29uc3QgYXBpID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogUmVzZXQgc2Vzc2lvbiBvbiBlYWNoIG11c2ljLnlhbmRleCBwYWdlIHJlbG9hZFxuICAgKi9cbiAgY29uc3QgaW5pdFNlc3Npb24gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5pdFVybEZpbHRlciA9IHtcbiAgICAgIHVybDogW3tcbiAgICAgICAgdXJsTWF0Y2hlczogJ211c2ljLnlhbmRleC4oW2Etel0pKidcbiAgICAgIH1dXG4gICAgfTtcbiAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcigoe1xuICAgICAgdGFiSWQsXG4gICAgICBmcmFtZVR5cGVcbiAgICB9KSA9PiB7XG4gICAgICBpZiAoZnJhbWVUeXBlICE9PSAnb3V0ZXJtb3N0X2ZyYW1lJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlc3Npb25TdG9yYWdlLmluaXQoKTsgLy8gU2F2ZSB0YWJJZCBvZiBsYXN0IHJlZnJlc2hlZCBtdXNpYy55YW5kZXggcGFnZSBhcyBjdXJyZW50XG5cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldFNldHRpbmcoU0VTU0lPTl9QQVJBTVMuQ1VSUkVOVF9NVVNJQ19UQUJfSUQsIHRhYklkKTtcbiAgICB9LCBpbml0VXJsRmlsdGVyKTtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGluaXRTZXNzaW9uKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0XG4gIH07XG59KCk7IiwiY29uc3QgVU5JUVVFX0FQUF9QT1NURklYID0gJ2JldHRlci1seXJpY3MnO1xuY29uc3QgU0VTU0lPTl9QQVJBTVMgPSB7XG4gIE1VU0lDX0FQSV9SRUFEWTogJ211c2ljQXBpUmVhZHknLFxuICBDVVJSRU5UX01VU0lDX1RBQl9JRDogJ2N1cnJlbnRNdXNpY1RhYklkJ1xufTtcbmNvbnN0IEFHRU5UX05BTUVTID0ge1xuICBHRVRfTVVTSUNfQVBJX1NUQVRVUzogJ2dldC1tdXNpYy1hcGktc3RhdHVzJ1xufTtcbmV4cG9ydCB7IFVOSVFVRV9BUFBfUE9TVEZJWCwgU0VTU0lPTl9QQVJBTVMsIEFHRU5UX05BTUVTIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhcGkgfSBmcm9tICcuL2FwaS5qcyc7IC8vIGltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi9TZXNzaW9uU3RvcmFnZS5qcyc7XG4vLyBpbXBvcnQgeyBTRVNTSU9OX1BBUkFNUyB9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICcuL2FnZW50LWRpc3BhdGNoZXInO1xuY29uc29sZS5sb2coJ0JBQ0tHUk9VTkQnKTtcbmFwaS5pbml0KCk7XG5kaXNwYXRjaCgpO1xuc2V0VGltZW91dCgoKSA9PiB7XG4gIGRpc3BhdGNoKCk7XG59LCAzMDAwMCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9