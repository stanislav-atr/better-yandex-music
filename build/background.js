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


const {
  CURRENT_MUSIC_TAB_ID,
  MUSIC_API_READY
} = _constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS;
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
    _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(CURRENT_MUSIC_TAB_ID, tabId); // eslint-disable-next-line no-console

    console.log(`SessionStorage initialized with id: ${tabId}`);
  };

  const getMusicApiStatus = async () => {
    const response = await _modules__WEBPACK_IMPORTED_MODULE_0__.agent.dispatch(_constants_js__WEBPACK_IMPORTED_MODULE_1__.AGENT_NAMES.GET_MUSIC_API_STATUS);
    const {
      result: musicApiStatus
    } = response[0];
    _modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.setSetting(MUSIC_API_READY, !!musicApiStatus); // eslint-disable-next-line no-console

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

      while (!_modules__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.getSetting(MUSIC_API_READY)) {
        // eslint-disable-next-line no-await-in-loop
        await getMusicApiStatus();
      }
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
/* harmony export */   "APP_BUNDLE_NAME": () => (/* binding */ APP_BUNDLE_NAME),
/* harmony export */   "SESSION_PARAMS": () => (/* binding */ SESSION_PARAMS),
/* harmony export */   "UNIQUE_APP_POSTFIX": () => (/* binding */ UNIQUE_APP_POSTFIX)
/* harmony export */ });
const UNIQUE_APP_POSTFIX = 'better-lyrics';
const APP_BUNDLE_NAME = 'better-lyrics-bundle.js';
const SESSION_PARAMS = {
  CURRENT_MUSIC_TAB_ID: 'currentMusicTabId',
  MUSIC_API_READY: 'musicApiReady',
  IS_APP_RUNNING: 'appRunning'
};
const AGENT_NAMES = {
  GET_MUSIC_API_STATUS: 'get-music-api-status',
  UNMOUNT_APP: 'unmount-app'
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
  GET_MUSIC_API_STATUS,
  UNMOUNT_APP
} = _constants_js__WEBPACK_IMPORTED_MODULE_1__.AGENT_NAMES;

class Agent {
  constructor() {
    /* eslint-disable no-console */
    this[GET_MUSIC_API_STATUS] = async agentPrefix => {
      const musicApiStatus = window?.Seq?.isReady();
      console.log(`${agentPrefix}: Music API status: ${musicApiStatus}`);
      return musicApiStatus;
    };

    this[UNMOUNT_APP] = agentPrefix => {
      const event = new Event(agentPrefix);
      console.log(event);
      dispatchEvent(event);
      console.log(`${agentPrefix}: Dispatching 'UNMOUNT_APP'.`);
    };
    /* eslint-enable no-console */

  }

  prepareScriptInjection(agentName) {
    const isFile = agentName.endsWith('.js');
    const currentMusicTabId = _SessionStorage_js__WEBPACK_IMPORTED_MODULE_0__.sessionStorage.getSetting(_constants_js__WEBPACK_IMPORTED_MODULE_1__.SESSION_PARAMS.CURRENT_MUSIC_TAB_ID);

    if (!currentMusicTabId) {
      return null;
    }

    const agentPayload = {};
    const scriptInjectionBase = {
      world: 'MAIN',
      target: {
        tabId: currentMusicTabId
      } // injectImmediately: true,

    };
    let scriptInjectionExecution;

    if (isFile) {
      scriptInjectionExecution = {
        files: [agentName]
      };
    } else {
      scriptInjectionExecution = {
        args: [`${_constants_js__WEBPACK_IMPORTED_MODULE_1__.UNIQUE_APP_POSTFIX}|${agentName}`, agentPayload],
        func: this[agentName]
      };
    }

    return { ...scriptInjectionBase,
      ...scriptInjectionExecution
    };
  }

  async dispatch(agentName) {
    const scriptInjection = this.prepareScriptInjection(agentName);

    if (scriptInjection === null) {
      throw new Error('There is no target tab at the moment of dispatch.');
    }

    let result;

    try {
      result = await chrome.scripting.executeScript(scriptInjection);
    } catch (e) {
      throw new Error(`${_constants_js__WEBPACK_IMPORTED_MODULE_1__.UNIQUE_APP_POSTFIX}|failed to execute ${agentName}: \n ${e}`);
    }

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

const {
  MUSIC_API_READY,
  CURRENT_MUSIC_TAB_ID,
  IS_APP_RUNNING
} = _constants_js__WEBPACK_IMPORTED_MODULE_0__.SESSION_PARAMS;

class SessionStorage {
  constructor() {
    this.init();
  }

  init() {
    this[CURRENT_MUSIC_TAB_ID] = null;
    this[MUSIC_API_READY] = false;
    this[IS_APP_RUNNING] = false;
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
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules */ "./Extension/src/background/modules/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./Extension/src/background/constants.js");




const {
  MUSIC_API_READY,
  CURRENT_MUSIC_TAB_ID,
  IS_APP_RUNNING
} = _constants_js__WEBPACK_IMPORTED_MODULE_3__.SESSION_PARAMS;

(async () => {
  // Wait for music.yandex api to get ready
  await _api_js__WEBPACK_IMPORTED_MODULE_0__.api.init();
})();

chrome.action.onClicked.addListener(async () => {
  const currentMusicTabId = _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.getSetting(CURRENT_MUSIC_TAB_ID);
  const musicApiReady = _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.getSetting(MUSIC_API_READY);
  const isAppRunning = _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.getSetting(IS_APP_RUNNING);
  const isPageReady = currentMusicTabId && musicApiReady;

  if (!isPageReady) {
    // eslint-disable-next-line no-console
    console.log('Music.Yandex page is not ready for app injection.');
    return;
  }

  if (!isAppRunning) {
    _modules__WEBPACK_IMPORTED_MODULE_2__.agent.dispatch(_constants_js__WEBPACK_IMPORTED_MODULE_3__.APP_BUNDLE_NAME);
    _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.setSetting(IS_APP_RUNNING, true);
  } else {
    _modules__WEBPACK_IMPORTED_MODULE_2__.agent.dispatch(_constants_js__WEBPACK_IMPORTED_MODULE_3__.AGENT_NAMES.UNMOUNT_APP);
    _modules_SessionStorage_js__WEBPACK_IMPORTED_MODULE_1__.sessionStorage.setSetting(IS_APP_RUNNING, false);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL3NyYy9iYWNrZ3JvdW5kL2FwaS5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL3NyYy9iYWNrZ3JvdW5kL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljLy4vRXh0ZW5zaW9uL3NyYy9iYWNrZ3JvdW5kL21vZHVsZXMvQWdlbnQuanMiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9zcmMvYmFja2dyb3VuZC9tb2R1bGVzL1Nlc3Npb25TdG9yYWdlLmpzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvLi9FeHRlbnNpb24vc3JjL2JhY2tncm91bmQvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JldHRlci15YW5kZXgtbXVzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iZXR0ZXIteWFuZGV4LW11c2ljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmV0dGVyLXlhbmRleC1tdXNpYy8uL0V4dGVuc2lvbi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlc3Npb25TdG9yYWdlLCBhZ2VudCB9IGZyb20gJy4vbW9kdWxlcyc7XG5pbXBvcnQgeyBTRVNTSU9OX1BBUkFNUywgQUdFTlRfTkFNRVMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5jb25zdCB7XG4gIENVUlJFTlRfTVVTSUNfVEFCX0lELFxuICBNVVNJQ19BUElfUkVBRFlcbn0gPSBTRVNTSU9OX1BBUkFNUztcbmV4cG9ydCBjb25zdCBhcGkgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluaXRVcmxGaWx0ZXIgPSB7XG4gICAgdXJsOiBbe1xuICAgICAgdXJsTWF0Y2hlczogJ211c2ljLnlhbmRleC4oW2Etel0pKidcbiAgICB9XVxuICB9O1xuICAvKipcbiAgICogUmVzZXQgc2Vzc2lvbiBvbiBlYWNoIG11c2ljLnlhbmRleCBwYWdlIChyZSlsb2FkXG4gICAqIFNhdmUgdGFiSWQgb2YgbGFzdCByZWZyZXNoZWQgbXVzaWMueWFuZGV4IHBhZ2UgYXMgY3VycmVudFxuICAgKi9cblxuICBjb25zdCBpbml0U2Vzc2lvblN0b3JhZ2UgPSB0YWJJZCA9PiB7XG4gICAgc2Vzc2lvblN0b3JhZ2UuaW5pdCgpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldFNldHRpbmcoQ1VSUkVOVF9NVVNJQ19UQUJfSUQsIHRhYklkKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgIGNvbnNvbGUubG9nKGBTZXNzaW9uU3RvcmFnZSBpbml0aWFsaXplZCB3aXRoIGlkOiAke3RhYklkfWApO1xuICB9O1xuXG4gIGNvbnN0IGdldE11c2ljQXBpU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWdlbnQuZGlzcGF0Y2goQUdFTlRfTkFNRVMuR0VUX01VU0lDX0FQSV9TVEFUVVMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3VsdDogbXVzaWNBcGlTdGF0dXNcbiAgICB9ID0gcmVzcG9uc2VbMF07XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0U2V0dGluZyhNVVNJQ19BUElfUkVBRFksICEhbXVzaWNBcGlTdGF0dXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgY29uc29sZS5sb2coJ011c2ljIEFQSSBpcyByZWFkeSEnKTtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKGFzeW5jIGRldGFpbHMgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICB0YWJJZCxcbiAgICAgICAgZnJhbWVUeXBlXG4gICAgICB9ID0gZGV0YWlscztcblxuICAgICAgaWYgKGZyYW1lVHlwZSAhPT0gJ291dGVybW9zdF9mcmFtZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpbml0U2Vzc2lvblN0b3JhZ2UodGFiSWQpO1xuXG4gICAgICB3aGlsZSAoIXNlc3Npb25TdG9yYWdlLmdldFNldHRpbmcoTVVTSUNfQVBJX1JFQURZKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICBhd2FpdCBnZXRNdXNpY0FwaVN0YXR1cygpO1xuICAgICAgfVxuICAgIH0sIGluaXRVcmxGaWx0ZXIpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdFxuICB9O1xufSgpOyIsImNvbnN0IFVOSVFVRV9BUFBfUE9TVEZJWCA9ICdiZXR0ZXItbHlyaWNzJztcbmNvbnN0IEFQUF9CVU5ETEVfTkFNRSA9ICdiZXR0ZXItbHlyaWNzLWJ1bmRsZS5qcyc7XG5jb25zdCBTRVNTSU9OX1BBUkFNUyA9IHtcbiAgQ1VSUkVOVF9NVVNJQ19UQUJfSUQ6ICdjdXJyZW50TXVzaWNUYWJJZCcsXG4gIE1VU0lDX0FQSV9SRUFEWTogJ211c2ljQXBpUmVhZHknLFxuICBJU19BUFBfUlVOTklORzogJ2FwcFJ1bm5pbmcnXG59O1xuY29uc3QgQUdFTlRfTkFNRVMgPSB7XG4gIEdFVF9NVVNJQ19BUElfU1RBVFVTOiAnZ2V0LW11c2ljLWFwaS1zdGF0dXMnLFxuICBVTk1PVU5UX0FQUDogJ3VubW91bnQtYXBwJ1xufTtcbmV4cG9ydCB7IFVOSVFVRV9BUFBfUE9TVEZJWCwgU0VTU0lPTl9QQVJBTVMsIEFHRU5UX05BTUVTLCBBUFBfQlVORExFX05BTUUgfTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuaW1wb3J0IHsgc2Vzc2lvblN0b3JhZ2UgfSBmcm9tICcuL1Nlc3Npb25TdG9yYWdlLmpzJztcbmltcG9ydCB7IFNFU1NJT05fUEFSQU1TLCBVTklRVUVfQVBQX1BPU1RGSVgsIEFHRU5UX05BTUVTIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmNvbnN0IHtcbiAgR0VUX01VU0lDX0FQSV9TVEFUVVMsXG4gIFVOTU9VTlRfQVBQXG59ID0gQUdFTlRfTkFNRVM7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIHRoaXNbR0VUX01VU0lDX0FQSV9TVEFUVVNdID0gYXN5bmMgYWdlbnRQcmVmaXggPT4ge1xuICAgICAgY29uc3QgbXVzaWNBcGlTdGF0dXMgPSB3aW5kb3c/LlNlcT8uaXNSZWFkeSgpO1xuICAgICAgY29uc29sZS5sb2coYCR7YWdlbnRQcmVmaXh9OiBNdXNpYyBBUEkgc3RhdHVzOiAke211c2ljQXBpU3RhdHVzfWApO1xuICAgICAgcmV0dXJuIG11c2ljQXBpU3RhdHVzO1xuICAgIH07XG5cbiAgICB0aGlzW1VOTU9VTlRfQVBQXSA9IGFnZW50UHJlZml4ID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KGFnZW50UHJlZml4KTtcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgY29uc29sZS5sb2coYCR7YWdlbnRQcmVmaXh9OiBEaXNwYXRjaGluZyAnVU5NT1VOVF9BUFAnLmApO1xuICAgIH07XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbiAgfVxuXG4gIHByZXBhcmVTY3JpcHRJbmplY3Rpb24oYWdlbnROYW1lKSB7XG4gICAgY29uc3QgaXNGaWxlID0gYWdlbnROYW1lLmVuZHNXaXRoKCcuanMnKTtcbiAgICBjb25zdCBjdXJyZW50TXVzaWNUYWJJZCA9IHNlc3Npb25TdG9yYWdlLmdldFNldHRpbmcoU0VTU0lPTl9QQVJBTVMuQ1VSUkVOVF9NVVNJQ19UQUJfSUQpO1xuXG4gICAgaWYgKCFjdXJyZW50TXVzaWNUYWJJZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYWdlbnRQYXlsb2FkID0ge307XG4gICAgY29uc3Qgc2NyaXB0SW5qZWN0aW9uQmFzZSA9IHtcbiAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICB0YXJnZXQ6IHtcbiAgICAgICAgdGFiSWQ6IGN1cnJlbnRNdXNpY1RhYklkXG4gICAgICB9IC8vIGluamVjdEltbWVkaWF0ZWx5OiB0cnVlLFxuXG4gICAgfTtcbiAgICBsZXQgc2NyaXB0SW5qZWN0aW9uRXhlY3V0aW9uO1xuXG4gICAgaWYgKGlzRmlsZSkge1xuICAgICAgc2NyaXB0SW5qZWN0aW9uRXhlY3V0aW9uID0ge1xuICAgICAgICBmaWxlczogW2FnZW50TmFtZV1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjcmlwdEluamVjdGlvbkV4ZWN1dGlvbiA9IHtcbiAgICAgICAgYXJnczogW2Ake1VOSVFVRV9BUFBfUE9TVEZJWH18JHthZ2VudE5hbWV9YCwgYWdlbnRQYXlsb2FkXSxcbiAgICAgICAgZnVuYzogdGhpc1thZ2VudE5hbWVdXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IC4uLnNjcmlwdEluamVjdGlvbkJhc2UsXG4gICAgICAuLi5zY3JpcHRJbmplY3Rpb25FeGVjdXRpb25cbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGlzcGF0Y2goYWdlbnROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0SW5qZWN0aW9uID0gdGhpcy5wcmVwYXJlU2NyaXB0SW5qZWN0aW9uKGFnZW50TmFtZSk7XG5cbiAgICBpZiAoc2NyaXB0SW5qZWN0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHRhcmdldCB0YWIgYXQgdGhlIG1vbWVudCBvZiBkaXNwYXRjaC4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdChzY3JpcHRJbmplY3Rpb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtVTklRVUVfQVBQX1BPU1RGSVh9fGZhaWxlZCB0byBleGVjdXRlICR7YWdlbnROYW1lfTogXFxuICR7ZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IGFnZW50ID0gbmV3IEFnZW50KCk7IiwiaW1wb3J0IHsgU0VTU0lPTl9QQVJBTVMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuY29uc3Qge1xuICBNVVNJQ19BUElfUkVBRFksXG4gIENVUlJFTlRfTVVTSUNfVEFCX0lELFxuICBJU19BUFBfUlVOTklOR1xufSA9IFNFU1NJT05fUEFSQU1TO1xuXG5jbGFzcyBTZXNzaW9uU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzW0NVUlJFTlRfTVVTSUNfVEFCX0lEXSA9IG51bGw7XG4gICAgdGhpc1tNVVNJQ19BUElfUkVBRFldID0gZmFsc2U7XG4gICAgdGhpc1tJU19BUFBfUlVOTklOR10gPSBmYWxzZTtcbiAgfVxuXG4gIGdldFNldHRpbmcoc2V0dGluZykge1xuICAgIHJldHVybiB0aGlzW3NldHRpbmddO1xuICB9XG5cbiAgc2V0U2V0dGluZyhzZXR0aW5nLCB2YWx1ZSkge1xuICAgIHRoaXNbc2V0dGluZ10gPSB2YWx1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBzZXNzaW9uU3RvcmFnZSA9IG5ldyBTZXNzaW9uU3RvcmFnZSgpOyIsImV4cG9ydCAqIGZyb20gJy4vU2Vzc2lvblN0b3JhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9BZ2VudCc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhcGkgfSBmcm9tICcuL2FwaS5qcyc7XG5pbXBvcnQgeyBzZXNzaW9uU3RvcmFnZSB9IGZyb20gJy4vbW9kdWxlcy9TZXNzaW9uU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBhZ2VudCB9IGZyb20gJy4vbW9kdWxlcyc7XG5pbXBvcnQgeyBTRVNTSU9OX1BBUkFNUywgQVBQX0JVTkRMRV9OQU1FLCBBR0VOVF9OQU1FUyB9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcbmNvbnN0IHtcbiAgTVVTSUNfQVBJX1JFQURZLFxuICBDVVJSRU5UX01VU0lDX1RBQl9JRCxcbiAgSVNfQVBQX1JVTk5JTkdcbn0gPSBTRVNTSU9OX1BBUkFNUztcblxuKGFzeW5jICgpID0+IHtcbiAgLy8gV2FpdCBmb3IgbXVzaWMueWFuZGV4IGFwaSB0byBnZXQgcmVhZHlcbiAgYXdhaXQgYXBpLmluaXQoKTtcbn0pKCk7XG5cbmNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudE11c2ljVGFiSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRTZXR0aW5nKENVUlJFTlRfTVVTSUNfVEFCX0lEKTtcbiAgY29uc3QgbXVzaWNBcGlSZWFkeSA9IHNlc3Npb25TdG9yYWdlLmdldFNldHRpbmcoTVVTSUNfQVBJX1JFQURZKTtcbiAgY29uc3QgaXNBcHBSdW5uaW5nID0gc2Vzc2lvblN0b3JhZ2UuZ2V0U2V0dGluZyhJU19BUFBfUlVOTklORyk7XG4gIGNvbnN0IGlzUGFnZVJlYWR5ID0gY3VycmVudE11c2ljVGFiSWQgJiYgbXVzaWNBcGlSZWFkeTtcblxuICBpZiAoIWlzUGFnZVJlYWR5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZygnTXVzaWMuWWFuZGV4IHBhZ2UgaXMgbm90IHJlYWR5IGZvciBhcHAgaW5qZWN0aW9uLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghaXNBcHBSdW5uaW5nKSB7XG4gICAgYWdlbnQuZGlzcGF0Y2goQVBQX0JVTkRMRV9OQU1FKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRTZXR0aW5nKElTX0FQUF9SVU5OSU5HLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBhZ2VudC5kaXNwYXRjaChBR0VOVF9OQU1FUy5VTk1PVU5UX0FQUCk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0U2V0dGluZyhJU19BUFBfUlVOTklORywgZmFsc2UpO1xuICB9XG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=