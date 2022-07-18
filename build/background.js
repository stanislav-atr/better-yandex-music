/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Extension/background/api.js":
/*!*************************************!*\
  !*** ./Extension/background/api.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules */ "./Extension/background/modules/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./Extension/background/constants.js");


const api = function () {
  /**
   * Reset session on each music.yandex page reload
   */
  const initSessionStorage = () => {
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
      } // Reset session storage on each page load


      _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.init(); // Save tabId of last refreshed music.yandex page as current

      _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId);
    }, initUrlFilter);
  };

  const init = () => {
    initSessionStorage();
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
/* harmony export */   "MUSIC_API_SEEKING_INTERVAL": () => (/* binding */ MUSIC_API_SEEKING_INTERVAL),
/* harmony export */   "MUSIC_API_SEEKING_TIMEOUT": () => (/* binding */ MUSIC_API_SEEKING_TIMEOUT),
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
const MUSIC_API_SEEKING_INTERVAL = 500;
const MUSIC_API_SEEKING_TIMEOUT = 15000;


/***/ }),

/***/ "./Extension/background/modules/Agent.js":
/*!***********************************************!*\
  !*** ./Extension/background/modules/Agent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agent": () => (/* binding */ agent)
/* harmony export */ });
/* harmony import */ var _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionStorage.js */ "./Extension/background/modules/SessionStorage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./Extension/background/constants.js");
/* eslint-disable no-undef */


const {
  GET_MUSIC_API_STATUS
} = _constants_js__WEBPACK_IMPORTED_MODULE_1__.AGENT_NAMES;

class Agent {
  constructor() {
    this[GET_MUSIC_API_STATUS] = async agentMessage => {
      const musicApiReady = !!window.Seq?.isReady();
      console.log(`${agentMessage}: Music API status: ${isMusicApiReady}`);
      return musicApiReady;
    };
  }

  prepareScriptInjection(agentName) {
    const currentMusicTabId = _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.getSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);

    if (!currentMusicTabId) {
      return null;
    }

    return {
      world: 'MAIN',
      target: {
        tabId: currentMusicTabId
      },
      // injectImmediately: true,
      args: [`${agentName}|${_constants_js__WEBPACK_IMPORTED_MODULE_1__.UNIQUE_APP_POSTFIX}`],
      func: this[agentName]
    };
  }

  async dispatch(agentName) {
    const scriptInjection = this.prepareScriptInjection(agentName);

    if (scriptInjection === null) {
      throw new Error('There is no target id at the moment of dispatch.');
    }

    const result = await chrome.scripting.executeScript(scriptInjection);
    return result;
  }

}

const agent = new Agent();

/***/ }),

/***/ "./Extension/background/modules/SessionStorage.js":
/*!********************************************************!*\
  !*** ./Extension/background/modules/SessionStorage.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sessionStorage": () => (/* binding */ sessionStorage)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./Extension/background/constants.js");


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

/***/ "./Extension/background/modules/index.js":
/*!***********************************************!*\
  !*** ./Extension/background/modules/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agent": () => (/* reexport safe */ _Agent__WEBPACK_IMPORTED_MODULE_1__.agent),
/* harmony export */   "sessionStorage": () => (/* reexport safe */ _SessionStorage__WEBPACK_IMPORTED_MODULE_0__.sessionStorage)
/* harmony export */ });
/* harmony import */ var _SessionStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionStorage */ "./Extension/background/modules/SessionStorage.js");
/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Agent */ "./Extension/background/modules/Agent.js");



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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './SessionStorage.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./Extension/background/constants.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules */ "./Extension/background/modules/index.js");





const {
  GET_MUSIC_API_STATUS
} = _constants_js__WEBPACK_IMPORTED_MODULE_2__.AGENT_NAMES;
_api_js__WEBPACK_IMPORTED_MODULE_0__.api.init();
chrome.action.onClicked.addListener(async () => {
  console.log('ACTION CLICK');
  let musicApiReady = Object(function webpackMissingModule() { var e = new Error("Cannot find module './SessionStorage.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(_constants_js__WEBPACK_IMPORTED_MODULE_2__.SESSION_PARAMS.MUSIC_API_READY);

  while (!musicApiReady) {
    try {
      const response = await _modules__WEBPACK_IMPORTED_MODULE_3__.agent.dispatch(GET_MUSIC_API_STATUS);
      const {
        result
      } = response[0];
      console.log(result);
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL2JhY2tncm91bmQvYXBpLmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vYmFja2dyb3VuZC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9iYWNrZ3JvdW5kL21vZHVsZXMvQWdlbnQuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9iYWNrZ3JvdW5kL21vZHVsZXMvU2Vzc2lvblN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9iYWNrZ3JvdW5kL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzJztcbmltcG9ydCB7IFNFU1NJT05fUEFSQU1TIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuZXhwb3J0IGNvbnN0IGFwaSA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFJlc2V0IHNlc3Npb24gb24gZWFjaCBtdXNpYy55YW5kZXggcGFnZSByZWxvYWRcbiAgICovXG4gIGNvbnN0IGluaXRTZXNzaW9uU3RvcmFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBpbml0VXJsRmlsdGVyID0ge1xuICAgICAgdXJsOiBbe1xuICAgICAgICB1cmxNYXRjaGVzOiAnbXVzaWMueWFuZGV4LihbYS16XSkqJ1xuICAgICAgfV1cbiAgICB9O1xuICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKCh7XG4gICAgICB0YWJJZCxcbiAgICAgIGZyYW1lVHlwZVxuICAgIH0pID0+IHtcbiAgICAgIGlmIChmcmFtZVR5cGUgIT09ICdvdXRlcm1vc3RfZnJhbWUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUmVzZXQgc2Vzc2lvbiBzdG9yYWdlIG9uIGVhY2ggcGFnZSBsb2FkXG5cblxuICAgICAgc2Vzc2lvblN0b3JhZ2UuaW5pdCgpOyAvLyBTYXZlIHRhYklkIG9mIGxhc3QgcmVmcmVzaGVkIG11c2ljLnlhbmRleCBwYWdlIGFzIGN1cnJlbnRcblxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0U2V0dGluZyhTRVNTSU9OX1BBUkFNUy5DVVJSRU5UX01VU0lDX1RBQl9JRCwgdGFiSWQpO1xuICAgIH0sIGluaXRVcmxGaWx0ZXIpO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgaW5pdFNlc3Npb25TdG9yYWdlKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0XG4gIH07XG59KCk7IiwiY29uc3QgVU5JUVVFX0FQUF9QT1NURklYID0gJ2JldHRlci1seXJpY3MnO1xuY29uc3QgU0VTU0lPTl9QQVJBTVMgPSB7XG4gIE1VU0lDX0FQSV9SRUFEWTogJ211c2ljQXBpUmVhZHknLFxuICBDVVJSRU5UX01VU0lDX1RBQl9JRDogJ2N1cnJlbnRNdXNpY1RhYklkJ1xufTtcbmNvbnN0IEFHRU5UX05BTUVTID0ge1xuICBHRVRfTVVTSUNfQVBJX1NUQVRVUzogJ2dldC1tdXNpYy1hcGktc3RhdHVzJ1xufTtcbmNvbnN0IE1VU0lDX0FQSV9TRUVLSU5HX0lOVEVSVkFMID0gNTAwO1xuY29uc3QgTVVTSUNfQVBJX1NFRUtJTkdfVElNRU9VVCA9IDE1MDAwO1xuZXhwb3J0IHsgVU5JUVVFX0FQUF9QT1NURklYLCBTRVNTSU9OX1BBUkFNUywgQUdFTlRfTkFNRVMsIE1VU0lDX0FQSV9TRUVLSU5HX0lOVEVSVkFMLCBNVVNJQ19BUElfU0VFS0lOR19USU1FT1VUIH07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi9TZXNzaW9uU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBTRVNTSU9OX1BBUkFNUywgVU5JUVVFX0FQUF9QT1NURklYLCBBR0VOVF9OQU1FUywgTVVTSUNfQVBJX1NFRUtJTkdfSU5URVJWQUwsIE1VU0lDX0FQSV9TRUVLSU5HX1RJTUVPVVQgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuY29uc3Qge1xuICBHRVRfTVVTSUNfQVBJX1NUQVRVU1xufSA9IEFHRU5UX05BTUVTO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbR0VUX01VU0lDX0FQSV9TVEFUVVNdID0gYXN5bmMgYWdlbnRNZXNzYWdlID0+IHtcbiAgICAgIGNvbnN0IG11c2ljQXBpUmVhZHkgPSAhIXdpbmRvdy5TZXE/LmlzUmVhZHkoKTtcbiAgICAgIGNvbnNvbGUubG9nKGAke2FnZW50TWVzc2FnZX06IE11c2ljIEFQSSBzdGF0dXM6ICR7aXNNdXNpY0FwaVJlYWR5fWApO1xuICAgICAgcmV0dXJuIG11c2ljQXBpUmVhZHk7XG4gICAgfTtcbiAgfVxuXG4gIHByZXBhcmVTY3JpcHRJbmplY3Rpb24oYWdlbnROYW1lKSB7XG4gICAgY29uc3QgY3VycmVudE11c2ljVGFiSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRTZXR0aW5nKFNFU1NJT05fUEFSQU1TLkNVUlJFTlRfTVVTSUNfVEFCX0lEKTtcblxuICAgIGlmICghY3VycmVudE11c2ljVGFiSWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB3b3JsZDogJ01BSU4nLFxuICAgICAgdGFyZ2V0OiB7XG4gICAgICAgIHRhYklkOiBjdXJyZW50TXVzaWNUYWJJZFxuICAgICAgfSxcbiAgICAgIC8vIGluamVjdEltbWVkaWF0ZWx5OiB0cnVlLFxuICAgICAgYXJnczogW2Ake2FnZW50TmFtZX18JHtVTklRVUVfQVBQX1BPU1RGSVh9YF0sXG4gICAgICBmdW5jOiB0aGlzW2FnZW50TmFtZV1cbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGlzcGF0Y2goYWdlbnROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0SW5qZWN0aW9uID0gdGhpcy5wcmVwYXJlU2NyaXB0SW5qZWN0aW9uKGFnZW50TmFtZSk7XG5cbiAgICBpZiAoc2NyaXB0SW5qZWN0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHRhcmdldCBpZCBhdCB0aGUgbW9tZW50IG9mIGRpc3BhdGNoLicpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdChzY3JpcHRJbmplY3Rpb24pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgYWdlbnQgPSBuZXcgQWdlbnQoKTsiLCJpbXBvcnQgeyBTRVNTSU9OX1BBUkFNUyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5cbmNsYXNzIFNlc3Npb25TdG9yYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXNbU0VTU0lPTl9QQVJBTVMuTVVTSUNfQVBJX1JFQURZXSA9IGZhbHNlO1xuICAgIHRoaXNbU0VTU0lPTl9QQVJBTVMuQ1VSUkVOVF9NVVNJQ19UQUJfSURdID0gbnVsbDtcbiAgfVxuXG4gIGdldFNldHRpbmcoc2V0dGluZykge1xuICAgIHJldHVybiB0aGlzW3NldHRpbmddO1xuICB9XG5cbiAgc2V0U2V0dGluZyhzZXR0aW5nLCB2YWx1ZSkge1xuICAgIHRoaXNbc2V0dGluZ10gPSB2YWx1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBzZXNzaW9uU3RvcmFnZSA9IG5ldyBTZXNzaW9uU3RvcmFnZSgpOyIsImV4cG9ydCAqIGZyb20gJy4vU2Vzc2lvblN0b3JhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9BZ2VudCc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhcGkgfSBmcm9tICcuL2FwaS5qcyc7XG5pbXBvcnQgeyBzZXNzaW9uU3RvcmFnZSB9IGZyb20gJy4vU2Vzc2lvblN0b3JhZ2UuanMnO1xuaW1wb3J0IHsgU0VTU0lPTl9QQVJBTVMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBhZ2VudCB9IGZyb20gJy4vbW9kdWxlcyc7XG5pbXBvcnQgeyBBR0VOVF9OQU1FUyB9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcbmNvbnN0IHtcbiAgR0VUX01VU0lDX0FQSV9TVEFUVVNcbn0gPSBBR0VOVF9OQU1FUztcbmFwaS5pbml0KCk7XG5jaHJvbWUuYWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdBQ1RJT04gQ0xJQ0snKTtcbiAgbGV0IG11c2ljQXBpUmVhZHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRTZXR0aW5nKFNFU1NJT05fUEFSQU1TLk1VU0lDX0FQSV9SRUFEWSk7XG5cbiAgd2hpbGUgKCFtdXNpY0FwaVJlYWR5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWdlbnQuZGlzcGF0Y2goR0VUX01VU0lDX0FQSV9TVEFUVVMpO1xuICAgICAgY29uc3Qge1xuICAgICAgICByZXN1bHRcbiAgICAgIH0gPSByZXNwb25zZVswXTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9