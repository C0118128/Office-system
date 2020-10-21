/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/apps/employee/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apps/employee/main.js":
/*!***********************************!*\
  !*** ./src/apps/employee/main.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_recordManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/modules/recordManager */ \"./src/modules/recordManager.js\");\n\n\n'use strict';\n\nconst ev_index = 'app.record.index.show'; // 一覧ページ表示の際\n// const ev_detail = 'app.record.detail.show'; // レコード表示の際\n// const ev_create = 'app.record.create.show'; // 追加ページ表示の際\n// const ev_edit = 'app.record.edit.show'; // レコード編集ページの際\n// const ev_report = 'app.report.show'; // グラフ表示\n\n// ##########################################\n// 一覧ページで実行\n// ##########################################\nkintone.events.on(ev_index, async(event) => {\n  console.log('event:', event);\n  console.log('all records:', event.records);\n  // let res;\n  // let kt = new KintoneRecordManager;\n\n  // res = await kt.processRecords('all');\n  // console.log('kintone:', kintone);\n  // console.log('res:', res);\n  // console.log('all records:', res.records);\n  // res = await kt.processRecords('find', 2);\n  // console.log('record:', res.record);\n});\n\n\n//# sourceURL=webpack:///./src/apps/employee/main.js?");

/***/ }),

/***/ "./src/modules/recordManager.js":
/*!**************************************!*\
  !*** ./src/modules/recordManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// kintoneのレコード操作するクラス\nclass KintoneRecordManager {\n\n  // インスタンス生成時に作成/実行\n  constructor() {\n    this.record = null;\n    this.records = [];\n    this.appId = null;\n    this.query = '';\n    this.limit = 100;\n    this.offset = 0;\n  }\n\n  // レコード関連の処理を実行\n  async processRecords(method, record_id=0) {\n    this.appId = kintone.app.getId();\n    this.records = []; // 初期化\n    if (method == 'all') await this.setAllRecords(); // API通信が全て完了するまで待つ\n    else if (method == 'find') await this.setRecord(record_id);\n    return this;\n  }\n\n  // =============================================================================\n\n  // 全てのレコードを取得しインスタンス変数に代入\n  async setAllRecords() {\n    let params = {\n      app: this.appId,\n      query: `${this.query} limit ${this.limit} offset ${this.offset}`\n    }\n    let res = await kintone.api('/k/v1/records', 'GET', params);\n\n    Array.prototype.push.apply(this.records, res.records); // 配列を結合\n    let len = res.records.length; // 結合後の要素数を取得\n    this.offset += len;\n    if (len < this.limit) this.ready = true;\n    else return this.setAllRecords(); // コールバック？\n  }\n\n  // レコード番号で取得しインスタンス変数に代入\n  async setRecord(record_id) {\n    let params = {\n      app: this.appId,\n      id: record_id\n    }\n    try {\n      let res = await kintone.api('/k/v1/record', 'GET', params);\n      this.record = res.record;\n      this.ready = true;\n      return;\n    }\n    catch (e) {\n      console.log('error:', e);\n      return;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (KintoneRecordManager);\n\n\n//# sourceURL=webpack:///./src/modules/recordManager.js?");

/***/ })

/******/ });