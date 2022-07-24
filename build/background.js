/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Extension/src/background/api.js":
/*!*****************************************!*\
  !*** ./Extension/src/background/api.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules */ "./Extension/src/background/modules/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./Extension/src/background/constants.js");


const api = function () {
  const initUrlFilter = {
    url: [{
      urlMatches: 'music.yandex.([a-z])*'
    }]
  };
  /**
   * Reset session on each music.yandex page (re)load
   * Save tabId of last refreshed music.yandex page as current
   */

  const initSessionStorage = tabId => {
    _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.init();
    _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID, tabId); // eslint-disable-next-line no-console

    console.log(`SessionStorage initialized with id: ${tabId}`);
  };

  const waitForMusicApiReady = async () => {
    const response = await _modules__WEBPACK_IMPORTED_MODULE_0__.agent.dispatch(_constants_js__WEBPACK_IMPORTED_MODULE_1__.AGENT_NAMES.GET_MUSIC_API_STATUS);
    const {
      result: musicApiStatus
    } = response[0];

    if (!musicApiStatus) {
      throw new Error('Could not detect Music API.');
    }

    _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.MUSIC_API_READY, true); // eslint-disable-next-line no-console

    console.log('Music API is ready!');
  };

  const init = async () => {
    chrome.webNavigation.onCompleted.addListener(async details => {
      const {
        tabId,
        frameType
      } = details;

      if (frameType !== 'outermost_frame') {
        return;
      }

      initSessionStorage(tabId);
      await waitForMusicApiReady();
    }, initUrlFilter);
  };

  return {
    init
  };
}();

/***/ }),

/***/ "./Extension/src/background/constants.js":
/*!***********************************************!*\
  !*** ./Extension/src/background/constants.js ***!
  \***********************************************/
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


/***/ }),

/***/ "./Extension/src/background/modules/Agent.js":
/*!***************************************************!*\
  !*** ./Extension/src/background/modules/Agent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agent": () => (/* binding */ agent)
/* harmony export */ });
/* harmony import */ var _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionStorage.js */ "./Extension/src/background/modules/SessionStorage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./Extension/src/background/constants.js");
/* eslint-disable no-undef */


const {
  GET_MUSIC_API_STATUS
} = _constants_js__WEBPACK_IMPORTED_MODULE_1__.AGENT_NAMES;

class Agent {
  constructor() {
    this[GET_MUSIC_API_STATUS] = async agentMessage => {
      const musicApiStatus = window?.Seq?.isReady(); // eslint-disable-next-line no-console

      console.log(`${agentMessage}: Music API status: ${musicApiStatus}`);
      return musicApiStatus;
    }; // this['test'] = renderApp;

  }

  prepareScriptInjection(agentName) {
    const currentMusicTabId = _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.getSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);

    if (!currentMusicTabId) {
      return null;
    }

    const agentPayload = {};
    return {
      world: 'MAIN',
      target: {
        tabId: currentMusicTabId
      },
      // injectImmediately: true,
      args: [`${_constants_js__WEBPACK_IMPORTED_MODULE_1__.UNIQUE_APP_POSTFIX}|${agentName}`, agentPayload],
      func: this[agentName]
    };
  }

  async dispatch(agentName) {
    const scriptInjection = this.prepareScriptInjection(agentName);

    if (scriptInjection === null) {
      throw new Error('There is no target tab at the moment of dispatch.');
    }

    const result = await chrome.scripting.executeScript(scriptInjection);
    return result;
  }

}

const agent = new Agent();

/***/ }),

/***/ "./Extension/src/background/modules/SessionStorage.js":
/*!************************************************************!*\
  !*** ./Extension/src/background/modules/SessionStorage.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sessionStorage": () => (/* binding */ sessionStorage)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./Extension/src/background/constants.js");


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

/***/ "./Extension/src/background/modules/index.js":
/*!***************************************************!*\
  !*** ./Extension/src/background/modules/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "agent": () => (/* reexport safe */ _Agent__WEBPACK_IMPORTED_MODULE_1__.agent),
/* harmony export */   "sessionStorage": () => (/* reexport safe */ _SessionStorage__WEBPACK_IMPORTED_MODULE_0__.sessionStorage)
/* harmony export */ });
/* harmony import */ var _SessionStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionStorage */ "./Extension/src/background/modules/SessionStorage.js");
/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Agent */ "./Extension/src/background/modules/Agent.js");



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
/*!************************************************!*\
  !*** ./Extension/src/background/background.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./Extension/src/background/api.js");
/* harmony import */ var _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/SessionStorage.js */ "./Extension/src/background/modules/SessionStorage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./Extension/src/background/constants.js");


 // import { agent } from './modules';

const {
  MUSIC_API_READY,
  CURRENT_MUSIC_TAB_ID
} = _constants_js__WEBPACK_IMPORTED_MODULE_2__.SESSION_PARAMS;

(async () => {
  // Wait for music.yandex api to get ready
  await _api_js__WEBPACK_IMPORTED_MODULE_0__.api.init();
})();

chrome.action.onClicked.addListener(async () => {
  const currentMusicTabId = _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.getSetting(CURRENT_MUSIC_TAB_ID);
  const musicApiReady = _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.getSetting(MUSIC_API_READY);
  const pageReady = currentMusicTabId && musicApiReady;

  if (pageReady) {
    chrome.scripting.executeScript({
      world: 'MAIN',
      target: {
        tabId: currentMusicTabId
      },
      files: ['better-lyrics-bundle.js']
    }, res => {
      console.log(res);
    });
  } // if (pageReady) {
  //     const test = await agent.dispatch('test');
  //     console.log(test);
  // }

});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vc3JjL2JhY2tncm91bmQvYXBpLmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vc3JjL2JhY2tncm91bmQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vc3JjL2JhY2tncm91bmQvbW9kdWxlcy9BZ2VudC5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL3NyYy9iYWNrZ3JvdW5kL21vZHVsZXMvU2Vzc2lvblN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9zcmMvYmFja2dyb3VuZC9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2Vzc2lvblN0b3JhZ2UsIGFnZW50IH0gZnJvbSAnLi9tb2R1bGVzJztcbmltcG9ydCB7IFNFU1NJT05fUEFSQU1TLCBBR0VOVF9OQU1FUyB9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcbmV4cG9ydCBjb25zdCBhcGkgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluaXRVcmxGaWx0ZXIgPSB7XG4gICAgdXJsOiBbe1xuICAgICAgdXJsTWF0Y2hlczogJ211c2ljLnlhbmRleC4oW2Etel0pKidcbiAgICB9XVxuICB9O1xuICAvKipcbiAgICogUmVzZXQgc2Vzc2lvbiBvbiBlYWNoIG11c2ljLnlhbmRleCBwYWdlIChyZSlsb2FkXG4gICAqIFNhdmUgdGFiSWQgb2YgbGFzdCByZWZyZXNoZWQgbXVzaWMueWFuZGV4IHBhZ2UgYXMgY3VycmVudFxuICAgKi9cblxuICBjb25zdCBpbml0U2Vzc2lvblN0b3JhZ2UgPSB0YWJJZCA9PiB7XG4gICAgc2Vzc2lvblN0b3JhZ2UuaW5pdCgpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldFNldHRpbmcoU0VTU0lPTl9QQVJBTVMuQ1VSUkVOVF9NVVNJQ19UQUJfSUQsIHRhYklkKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgIGNvbnNvbGUubG9nKGBTZXNzaW9uU3RvcmFnZSBpbml0aWFsaXplZCB3aXRoIGlkOiAke3RhYklkfWApO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JNdXNpY0FwaVJlYWR5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWdlbnQuZGlzcGF0Y2goQUdFTlRfTkFNRVMuR0VUX01VU0lDX0FQSV9TVEFUVVMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3VsdDogbXVzaWNBcGlTdGF0dXNcbiAgICB9ID0gcmVzcG9uc2VbMF07XG5cbiAgICBpZiAoIW11c2ljQXBpU3RhdHVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkZXRlY3QgTXVzaWMgQVBJLicpO1xuICAgIH1cblxuICAgIHNlc3Npb25TdG9yYWdlLnNldFNldHRpbmcoU0VTU0lPTl9QQVJBTVMuTVVTSUNfQVBJX1JFQURZLCB0cnVlKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgIGNvbnNvbGUubG9nKCdNdXNpYyBBUEkgaXMgcmVhZHkhJyk7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcihhc3luYyBkZXRhaWxzID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdGFiSWQsXG4gICAgICAgIGZyYW1lVHlwZVxuICAgICAgfSA9IGRldGFpbHM7XG5cbiAgICAgIGlmIChmcmFtZVR5cGUgIT09ICdvdXRlcm1vc3RfZnJhbWUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaW5pdFNlc3Npb25TdG9yYWdlKHRhYklkKTtcbiAgICAgIGF3YWl0IHdhaXRGb3JNdXNpY0FwaVJlYWR5KCk7XG4gICAgfSwgaW5pdFVybEZpbHRlcik7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0XG4gIH07XG59KCk7IiwiY29uc3QgVU5JUVVFX0FQUF9QT1NURklYID0gJ2JldHRlci1seXJpY3MnO1xuY29uc3QgU0VTU0lPTl9QQVJBTVMgPSB7XG4gIE1VU0lDX0FQSV9SRUFEWTogJ211c2ljQXBpUmVhZHknLFxuICBDVVJSRU5UX01VU0lDX1RBQl9JRDogJ2N1cnJlbnRNdXNpY1RhYklkJ1xufTtcbmNvbnN0IEFHRU5UX05BTUVTID0ge1xuICBHRVRfTVVTSUNfQVBJX1NUQVRVUzogJ2dldC1tdXNpYy1hcGktc3RhdHVzJ1xufTtcbmV4cG9ydCB7IFVOSVFVRV9BUFBfUE9TVEZJWCwgU0VTU0lPTl9QQVJBTVMsIEFHRU5UX05BTUVTIH07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi9TZXNzaW9uU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBTRVNTSU9OX1BBUkFNUywgVU5JUVVFX0FQUF9QT1NURklYLCBBR0VOVF9OQU1FUyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5jb25zdCB7XG4gIEdFVF9NVVNJQ19BUElfU1RBVFVTXG59ID0gQUdFTlRfTkFNRVM7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tHRVRfTVVTSUNfQVBJX1NUQVRVU10gPSBhc3luYyBhZ2VudE1lc3NhZ2UgPT4ge1xuICAgICAgY29uc3QgbXVzaWNBcGlTdGF0dXMgPSB3aW5kb3c/LlNlcT8uaXNSZWFkeSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLmxvZyhgJHthZ2VudE1lc3NhZ2V9OiBNdXNpYyBBUEkgc3RhdHVzOiAke211c2ljQXBpU3RhdHVzfWApO1xuICAgICAgcmV0dXJuIG11c2ljQXBpU3RhdHVzO1xuICAgIH07IC8vIHRoaXNbJ3Rlc3QnXSA9IHJlbmRlckFwcDtcblxuICB9XG5cbiAgcHJlcGFyZVNjcmlwdEluamVjdGlvbihhZ2VudE5hbWUpIHtcbiAgICBjb25zdCBjdXJyZW50TXVzaWNUYWJJZCA9IHNlc3Npb25TdG9yYWdlLmdldFNldHRpbmcoU0VTU0lPTl9QQVJBTVMuQ1VSUkVOVF9NVVNJQ19UQUJfSUQpO1xuXG4gICAgaWYgKCFjdXJyZW50TXVzaWNUYWJJZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYWdlbnRQYXlsb2FkID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICB0YXJnZXQ6IHtcbiAgICAgICAgdGFiSWQ6IGN1cnJlbnRNdXNpY1RhYklkXG4gICAgICB9LFxuICAgICAgLy8gaW5qZWN0SW1tZWRpYXRlbHk6IHRydWUsXG4gICAgICBhcmdzOiBbYCR7VU5JUVVFX0FQUF9QT1NURklYfXwke2FnZW50TmFtZX1gLCBhZ2VudFBheWxvYWRdLFxuICAgICAgZnVuYzogdGhpc1thZ2VudE5hbWVdXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRpc3BhdGNoKGFnZW50TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdEluamVjdGlvbiA9IHRoaXMucHJlcGFyZVNjcmlwdEluamVjdGlvbihhZ2VudE5hbWUpO1xuXG4gICAgaWYgKHNjcmlwdEluamVjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyB0YXJnZXQgdGFiIGF0IHRoZSBtb21lbnQgb2YgZGlzcGF0Y2guJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHNjcmlwdEluamVjdGlvbik7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBhZ2VudCA9IG5ldyBBZ2VudCgpOyIsImltcG9ydCB7IFNFU1NJT05fUEFSQU1TIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcblxuY2xhc3MgU2Vzc2lvblN0b3JhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpc1tTRVNTSU9OX1BBUkFNUy5NVVNJQ19BUElfUkVBRFldID0gZmFsc2U7XG4gICAgdGhpc1tTRVNTSU9OX1BBUkFNUy5DVVJSRU5UX01VU0lDX1RBQl9JRF0gPSBudWxsO1xuICB9XG5cbiAgZ2V0U2V0dGluZyhzZXR0aW5nKSB7XG4gICAgcmV0dXJuIHRoaXNbc2V0dGluZ107XG4gIH1cblxuICBzZXRTZXR0aW5nKHNldHRpbmcsIHZhbHVlKSB7XG4gICAgdGhpc1tzZXR0aW5nXSA9IHZhbHVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlc3Npb25TdG9yYWdlID0gbmV3IFNlc3Npb25TdG9yYWdlKCk7IiwiZXhwb3J0ICogZnJvbSAnLi9TZXNzaW9uU3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL0FnZW50JzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGFwaSB9IGZyb20gJy4vYXBpLmpzJztcbmltcG9ydCB7IHNlc3Npb25TdG9yYWdlIH0gZnJvbSAnLi9tb2R1bGVzL1Nlc3Npb25TdG9yYWdlLmpzJztcbmltcG9ydCB7IFNFU1NJT05fUEFSQU1TIH0gZnJvbSAnLi9jb25zdGFudHMuanMnOyAvLyBpbXBvcnQgeyBhZ2VudCB9IGZyb20gJy4vbW9kdWxlcyc7XG5cbmNvbnN0IHtcbiAgTVVTSUNfQVBJX1JFQURZLFxuICBDVVJSRU5UX01VU0lDX1RBQl9JRFxufSA9IFNFU1NJT05fUEFSQU1TO1xuXG4oYXN5bmMgKCkgPT4ge1xuICAvLyBXYWl0IGZvciBtdXNpYy55YW5kZXggYXBpIHRvIGdldCByZWFkeVxuICBhd2FpdCBhcGkuaW5pdCgpO1xufSkoKTtcblxuY2hyb21lLmFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50TXVzaWNUYWJJZCA9IHNlc3Npb25TdG9yYWdlLmdldFNldHRpbmcoQ1VSUkVOVF9NVVNJQ19UQUJfSUQpO1xuICBjb25zdCBtdXNpY0FwaVJlYWR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0U2V0dGluZyhNVVNJQ19BUElfUkVBRFkpO1xuICBjb25zdCBwYWdlUmVhZHkgPSBjdXJyZW50TXVzaWNUYWJJZCAmJiBtdXNpY0FwaVJlYWR5O1xuXG4gIGlmIChwYWdlUmVhZHkpIHtcbiAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgd29ybGQ6ICdNQUlOJyxcbiAgICAgIHRhcmdldDoge1xuICAgICAgICB0YWJJZDogY3VycmVudE11c2ljVGFiSWRcbiAgICAgIH0sXG4gICAgICBmaWxlczogWydiZXR0ZXItbHlyaWNzLWJ1bmRsZS5qcyddXG4gICAgfSwgcmVzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgfSk7XG4gIH0gLy8gaWYgKHBhZ2VSZWFkeSkge1xuICAvLyAgICAgY29uc3QgdGVzdCA9IGF3YWl0IGFnZW50LmRpc3BhdGNoKCd0ZXN0Jyk7XG4gIC8vICAgICBjb25zb2xlLmxvZyh0ZXN0KTtcbiAgLy8gfVxuXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=