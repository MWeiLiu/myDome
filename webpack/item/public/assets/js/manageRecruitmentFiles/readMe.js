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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ({

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*
 * @Author: MWeiLiu
 * @Date: 2018-12-21 16:58:08
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-04 16:17:30
 */
// import config from '../base/config.js'
var readMe = {
  leftBtn: [{
    text: '看过我的',
    active: 1,
    url: 'readMe'
  }, {
    text: '对我感兴趣',
    active: 0,
    url: ''
  }],
  tbody: [{
    active: 0,
    // headimg: require('../../images/index/userImage.png'),
    // sex: config.sex,
    name: '王明阳',
    jobInfo: {
      companyName: '北京民富网络科技有限公司',
      job: '产品经理',
      tags: {
        address: '北京',
        time: '1-3年',
        education: '本科',
        age: '26'
      }
    },
    advantage: '拥有2年多的产品工作经验，拥有互联网产品、移动互联网项目经验，熟悉项目管理及团队建设能力。拥有2年多的产品工作经验，拥有互联网产品、移动互联网项目经验，熟悉项目管理及团队建设能力。',
    position: {
      active: 0,
      text: ['产品经理策划分析', '再次邀请']
    }
  }, {
    active: 0,
    // headimg: require('../../images/index/userImage.png'),
    // sex: config.sex,
    name: '王明阳',
    jobInfo: {
      companyName: '北京民富网络科技有限公司',
      job: '产品经理',
      tags: {
        address: '北京',
        time: '1-3年',
        education: '本科',
        age: '26'
      }
    },
    advantage: '拥有2年多的产品工作经验，拥有互联网产品、移动互联网项目经验，熟悉项目管理及团队建设能力。拥有2年多的产品工作经验，拥有互联网产品、移动互联网项目经验，熟悉项目管理及团队建设能力。',
    position: {
      active: 0,
      text: ['产品经理', '再次邀请']
    }
  }]
};

/* harmony default export */ __webpack_exports__["default"] = (readMe);

/***/ })

/******/ });