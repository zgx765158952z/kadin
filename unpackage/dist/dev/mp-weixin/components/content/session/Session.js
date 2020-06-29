(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/content/session/Session"],{

/***/ 113:
/*!*****************************************************************************************!*\
  !*** E:/learning/kadingapp/main.js?{"page":"components%2Fcontent%2Fsession%2FSession"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _Session = _interopRequireDefault(__webpack_require__(/*! ./components/content/session/Session.vue */ 114));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_Session.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 114:
/*!********************************************************************!*\
  !*** E:/learning/kadingapp/components/content/session/Session.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Session.vue?vue&type=template&id=648120ba& */ 115);
/* harmony import */ var _Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Session.vue?vue&type=script&lang=js& */ 117);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Session.vue?vue&type=style&index=0&lang=scss& */ 119);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "learning/kadingapp/components/content/session/Session.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 115:
/*!***************************************************************************************************!*\
  !*** E:/learning/kadingapp/components/content/session/Session.vue?vue&type=template&id=648120ba& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./Session.vue?vue&type=template&id=648120ba& */ 116);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_template_id_648120ba___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 116:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learning/kadingapp/components/content/session/Session.vue?vue&type=template&id=648120ba& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.getFriendInfoByAcccount(
    _vm.chatType === "p2p" ? "p2p" : "team",
    _vm.chatTo,
    "friendFaceImage",
    _vm.chatType === "team" ? _vm.groupInfo.groupMember : null
  )
  var m1 = _vm.getFriendInfoByAcccount(
    _vm.chatType === "p2p" ? "p2p" : "team",
    _vm.chatTo,
    "friendRemarkName",
    _vm.chatType === "team" ? _vm.groupInfo.groupMember : null
  )
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 117:
/*!*********************************************************************************************!*\
  !*** E:/learning/kadingapp/components/content/session/Session.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./Session.vue?vue&type=script&lang=js& */ 118);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 118:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learning/kadingapp/components/content/session/Session.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



































































































































































































var _index = __webpack_require__(/*! @/common/index.js */ 14);
var _helper = __webpack_require__(/*! @/common/helper.js */ 55);
var _session = __webpack_require__(/*! @/network/session/session.js */ 67);
var _vuex = __webpack_require__(/*! vuex */ 13);

var _utils = __webpack_require__(/*! @/utils/utils.js */ 68);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var DefMask = function DefMask() {__webpack_require__.e(/*! require.ensure | components/content/defmask/DefMask */ "components/content/defmask/DefMask").then((function () {return resolve(__webpack_require__(/*! @/components/content/defmask/DefMask.vue */ 486));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var LoadingIcon = function LoadingIcon() {__webpack_require__.e(/*! require.ensure | components/content/loading-icon/LoadingIcon */ "components/content/loading-icon/LoadingIcon").then((function () {return resolve(__webpack_require__(/*! @/components/content/loading-icon/LoadingIcon.vue */ 493));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};

var app = getApp();var _default =
{
  components: {
    DefMask: DefMask,
    LoadingIcon: LoadingIcon },

  data: function data() {
    return {
      /* 常规模块 */
      messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},/geo是地理信息/{type: 'geo',geo: {lat,lng,title}}]

      //输入栏文字
      msgContent: '',

      //屏幕高度
      windowHeight: 0,
      sessionStyle: 'height: 800rpx;',

      //无工具栏的底部高度
      btmHeight1: 0,

      //有工具栏的底部高度
      btmHeight2: 0,

      //无工具栏的底部时content的样式
      btmStyle1: "",

      //有工具栏的底部时content的样式
      btmStyle2: "",

      scrollTop: Number,

      chatTo: '', //聊天对象account
      chatType: "", //聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
      //显示键盘
      showKeyboard: true,

      //是否聚焦输入框
      isFocus: true,

      //显示工具栏
      showTool: false,

      //键盘弹起时是否上推页面
      adjust: true,

      //显示消息未发送
      msgTips: false,

      //听语音消息
      isListening: false,


      /** 语音输入模块 **/

      //语音计时器
      speakTimer: null,

      //语音计时
      speakCount: 0,

      //说话模式
      isSpeak: false,

      speakingTitle: '按住 说话',

      //说话时上滑到一定位置显示取消按钮
      showCancel: false,

      //触摸到取消按钮时
      cancelActive: false,

      //触摸到转文字按钮时
      translateActive: false,

      //存储取消与转文字按钮节点坐标信息
      cancelInfo: {
        'left1': 0,
        'right1': 0,
        'left2': 0,
        'right2': 0,
        'top': 0,
        'bottom': 0 },

      imgUrl: '', //图片服务器地址

      groupInfo: {}, //群组信息

      firstGetMsgs: true, //是第一次获取历史记录吗？

      hasHistoryMsg: true, //云端是否还有历史记录
      pageCount: 1, //聊天记录页数

      //下拉刷新
      refresherEnabled: true, //是否开启下拉刷新
      freshing: false //正在刷新中
    };

  },


  computed: _objectSpread({
    /**
                             * 原始消息列表转化为适用于渲染的消息列表
                             * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
                             * =>
                             * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
                             */
    DconvertRawMessageListToRenderMessageArr: function DconvertRawMessageListToRenderMessageArr() {
      console.log('this.currentChatTo:', this.currentChatTo);
      var rawMsgList = this.rawMessageList[this.currentChatTo];
      var messageArr = [];
      for (var time in rawMsgList) {
        var rawMsg = rawMsgList[time];
        var msgType = '';
        if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
          msgType = '猜拳';
        } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
          msgType = '贴图表情';
        } else {
          msgType = rawMsg.type;
        }
        //返回距离上条消息超过两分钟的时间
        var displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr);
        var sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send';
        var specifiedObject = {};
        switch (msgType) {
          case 'text':{
              specifiedObject = {
                nodes: (0, _utils.generateRichTextNode)(rawMsg.text) //生成富文本节点
              };
              break;
            }
          case 'image':{
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)(rawMsg.file) //处理图片富文本节点
              };
              break;
            }
          case 'geo':{//地理信息
              specifiedObject = {
                geo: rawMsg.geo };

              break;
            }
          case 'audio':{
              specifiedObject = {
                audio: rawMsg.file };

              break;
            }
          case 'video':{
              specifiedObject = {
                video: rawMsg.file };

              break;
            }
          case '猜拳':{
              var value = JSON.parse(rawMsg['content']).data.value;
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)((0, _utils.generateFingerGuessImageFile)(value)) };

              break;
            }
          case '贴图表情':{
              var content = JSON.parse(rawMsg['content']);
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)((0, _utils.generateBigEmojiImageFile)(content)) };

              break;
            }
          case 'tip':{
              specifiedObject = {
                text: rawMsg.tip,
                nodes: [{
                  type: 'text',
                  text: rawMsg.tip }] };


              break;
            }
          case '白板消息':
          case '阅后即焚':{
              specifiedObject = {
                nodes: [{
                  type: 'text',
                  text: "[".concat(msgType, "],\u8BF7\u5230\u624B\u673A\u6216\u7535\u8111\u5BA2\u6237\u7AEF\u67E5\u770B") }] };


              break;
            }
          case 'file':
          case 'robot':{
              var text = msgType === 'file' ? '文件消息' : '机器人消息';
              specifiedObject = {
                nodes: [{
                  type: 'text',
                  text: "[".concat(text, "],\u8BF7\u5230\u624B\u673A\u6216\u7535\u8111\u5BA2\u6237\u7AEF\u67E5\u770B") }] };


              break;
            }
          case 'custom':
            specifiedObject = {
              nodes: [{
                type: 'text',
                text: '自定义消息' }] };


            break;
          case 'notification':
            specifiedObject = {
              // netbill的text为空
              text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
              nodes: [{
                type: 'text',
                text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text) }] };


            break;
          default:{
              break;
            }}

        messageArr.push(Object.assign({}, {
          from: rawMsg.from,
          type: msgType,
          text: rawMsg.text || '',
          time: time,
          sendOrReceive: sendOrReceive, //此消息是收到还是发送
          displayTimeHeader: displayTimeHeader },
        specifiedObject));
      }
      console.log('改变了:', messageArr);
      return messageArr;
    },

    calcSpeakCount: function calcSpeakCount() {
      if (this.speakCount < 10) {
        return "0".concat(this.speakCount);
      } else {
        return this.speakCount;
      }
    } },
  (0, _vuex.mapState)(['userInfo', 'friendList', 'currentChatList', 'currentChatTo', 'rawMessageList']), {},
  (0, _vuex.mapGetters)(['getFriendInfoByAcccount', 'SconvertRawMessageListToRenderMessageArr'])),

  filters: {

    formatTime: function formatTime(timeStamp) {
      return (0, _index.formatTimeStamp)(timeStamp, 'MM-dd hh:mm');
    } },

  watch: {
    //监听工具栏的显示与隐藏，从而重新获取底部高度让content重新定位
    // showTool(newV, oldV) {
    // 	console.log(newV, oldV)
    // 	if(newV !== oldV) {
    // 		this.$nextTick(() => {
    // 			this.getBtmHeight()
    // 		})
    // 	}
    // }
    rawMessageList: {
      deep: true,
      handler: function handler(newV, oldV) {
        console.log('新消息与旧消息:', newV, oldV);
        if (newV) {
          this.convertRawMessageListToRenderMessageArr();
        }
      } } },


  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['setCurrentChatList', 'setCurrentChatTo', 'clearUnread']), {
    /**
                                                                                         * 原始消息列表转化为适用于渲染的消息列表
                                                                                         * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
                                                                                         * =>
                                                                                         * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
                                                                                         */
    convertRawMessageListToRenderMessageArr: function convertRawMessageListToRenderMessageArr() {var _this = this;
      var rawMsgList = this.rawMessageList[this.currentChatTo];
      var messageArr = [];
      for (var time in rawMsgList) {
        var rawMsg = rawMsgList[time];
        var msgType = '';
        if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
          msgType = '猜拳';
        } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
          msgType = '贴图表情';
        } else {
          msgType = rawMsg.type;
        }
        //返回距离上条消息超过两分钟的时间
        var displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr);
        var sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send';
        var specifiedObject = {};
        switch (msgType) {
          case 'text':{
              specifiedObject = {
                nodes: (0, _utils.generateRichTextNode)(rawMsg.text) //生成富文本节点
              };
              break;
            }
          case 'image':{
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)(rawMsg.file) //处理图片富文本节点
              };
              break;
            }
          case 'geo':{//地理信息
              specifiedObject = {
                geo: rawMsg.geo };

              break;
            }
          case 'audio':{
              specifiedObject = {
                audio: rawMsg.file };

              break;
            }
          case 'video':{
              specifiedObject = {
                video: rawMsg.file };

              break;
            }
          case '猜拳':{
              var value = JSON.parse(rawMsg['content']).data.value;
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)((0, _utils.generateFingerGuessImageFile)(value)) };

              break;
            }
          case '贴图表情':{
              var content = JSON.parse(rawMsg['content']);
              specifiedObject = {
                nodes: (0, _utils.generateImageNode)((0, _utils.generateBigEmojiImageFile)(content)) };

              break;
            }
          case 'tip':{
              specifiedObject = {
                text: rawMsg.tip,
                nodes: [{
                  type: 'text',
                  text: rawMsg.tip }] };


              break;
            }
          case '白板消息':
          case '阅后即焚':{
              specifiedObject = {
                nodes: [{
                  type: 'text',
                  text: "[".concat(msgType, "],\u8BF7\u5230\u624B\u673A\u6216\u7535\u8111\u5BA2\u6237\u7AEF\u67E5\u770B") }] };


              break;
            }
          case 'file':
          case 'robot':{
              var text = msgType === 'file' ? '文件消息' : '机器人消息';
              specifiedObject = {
                nodes: [{
                  type: 'text',
                  text: "[".concat(text, "],\u8BF7\u5230\u624B\u673A\u6216\u7535\u8111\u5BA2\u6237\u7AEF\u67E5\u770B") }] };


              break;
            }
          case 'custom':
            specifiedObject = {
              nodes: [{
                type: 'text',
                text: '自定义消息' }] };


            break;
          case 'notification':
            specifiedObject = {
              // netbill的text为空
              text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
              nodes: [{
                type: 'text',
                text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text) }] };


            break;
          default:{
              break;
            }}

        messageArr.push(Object.assign({}, {
          from: rawMsg.from,
          type: msgType,
          text: rawMsg.text || '',
          time: time,
          sendOrReceive: sendOrReceive, //此消息是收到还是发送
          displayTimeHeader: displayTimeHeader },
        specifiedObject));
      }
      console.log('改变了:', messageArr);
      this.messageArr = messageArr;
      setTimeout(function () {
        _this.$nextTick(function () {
          _this.scrollToBottom();
        });
      }, 200);

    },

    //滚动到底部
    scrollToBottom: function scrollToBottom() {
      console.log('滚动到底部');
      uni.pageScrollTo({
        scrollTop: 99999 });

    },

    /**
        * 距离上一条消息是否超过两分钟
        */
    judgeOverTwoMinute: function judgeOverTwoMinute(time, messageArr) {
      var displayTimeHeader = '';
      var lastMessage = messageArr[messageArr.length - 1];
      if (lastMessage) {//拥有上一条消息
        var delta = time - lastMessage.time;
        if (delta > 2 * 60 * 1000) {//两分钟以上
          displayTimeHeader = (0, _utils.calcTimeHeader)(time);
        }
      } else {//没有上一条消息
        displayTimeHeader = (0, _utils.calcTimeHeader)(time);
      }
      return displayTimeHeader;
    },

    //发送消息
    sendMsg: function sendMsg() {var _this2 = this;
      var obj = {
        fromUser: this.userInfo.user.userAccount,
        ope: this.chatType === 'p2p' ? 0 : 1,
        toUser: this.chatTo,
        type: 0,
        msg: this.msgContent };

      (0, _session.sendMsgRequest)(obj).then(function (res) {
        console.log(res);
        _this2.$toast.showRes(res);
        if (res.data.code === 2000) {
          _this2.msgContent = '';
          _this2.$nextTick(function () {
            _this2.$forceUpdate();
          });
        }
      }).catch(function (err) {
        console.log(err);
        _this2.$toast.showErr(err);
      });
    },
    onToupper: function onToupper() {var _this3 = this;
      console.log('到达顶部');
      if (this.freshing) return;
      this.freshing = true;
      setTimeout(function () {
        _this3.freshing = false;
      }, 3000);
    },

    //听语音
    listenVoice: function listenVoice() {
      this.isListening = !this.isListening;
    },

    //点击未发送的消息
    handleTips: function handleTips() {var _this4 = this;
      uni.showModal({
        title: '提示',
        content: '消息未发送,是否重新发送',
        success: function success(res) {
          if (res.confirm) {
            _this4.msgTips = false;
          }
        } });

    },
    //监听按住说话手指移动
    moveHandle: function moveHandle(e) {var _this5 = this;
      if (e.touches[0].clientY < 540) {

        console.log(e);
        this.showCancel = true;


      } else {
        this.showCancel = false;
      }
      if (this.showCancel) {
        if (this.cancelInfo.right2 === 0) {
          this.$nextTick(function () {
            var query = uni.createSelectorQuery().in(_this5);
            query.select('.cancel-item').boundingClientRect(function (data) {

              _this5.cancelInfo.left1 = data.left;
              _this5.cancelInfo.right1 = data.right;
              _this5.cancelInfo.top = data.top;
              _this5.cancelInfo.bottom = data.bottom;
              console.log(_this5.cancelInfo);
            }).exec();

            query.select('.translate-item').boundingClientRect(function (data) {

              _this5.cancelInfo.left2 = data.left;
              _this5.cancelInfo.right2 = data.right;
              console.log(_this5.cancelInfo);
              return;
            }).exec();
          });
        } else {
          if (e.touches[0].clientY > this.cancelInfo.top && e.touches[0].clientY < this.cancelInfo.bottom) {
            if (e.touches[0].clientX > this.cancelInfo.left1 && e.touches[0].clientX < this.cancelInfo.right1) {
              this.$nextTick(function () {
                _this5.cancelActive = true;
              });
            } else if (e.touches[0].clientX > this.cancelInfo.left2 && e.touches[0].clientX < this.cancelInfo.right2) {
              this.$nextTick(function () {
                _this5.translateActive = true;
              });
            } else {
              this.$nextTick(function () {
                _this5.cancelActive = false;
                _this5.translateActive = false;
              });
            }
          } else {
            this.$nextTick(function () {
              _this5.cancelActive = false;
              _this5.translateActive = false;
            });
          }

        }
      }




    },
    //按住说话
    showSpeaking: function showSpeaking() {var _this6 = this;
      this.isSpeak = true;
      this.speakingTitle = '松开 结束';
      this.$refs.speakMask.isShowMask = true;
      this.speakTimer = setInterval(function () {
        _this6.speakCount += 1;
      }, 1000);
      this.speakTimer;
    },

    //松开结束说话
    hideSpeaking: function hideSpeaking() {
      if (this.cancelActive) {
        console.log('取消语音');
      } else if (this.translateActive) {
        console.log('将语音转成文字');
      } else {
        console.log('发送语音');
      }

      this.isSpeak = false;
      this.speakingTitle = '按住 说话';
      this.showCancel = false;
      this.cancelActive = false;
      this.translateActive = false;
      clearInterval(this.speakTimer); //清除计时器
      this.speakCount = 0;
      this.$refs.speakMask.isShowMask = false;
    },

    //取消
    handleCancel: function handleCancel(e) {
      console.log('取消');
      console.log(e);
    },

    //转文字
    handleTranslate: function handleTranslate(e) {
      console.log('转文字');
      console.log(e);
    },

    //改变为说话模式
    doSpeak: function doSpeak() {var _this7 = this;
      this.$nextTick(function () {
        _this7.showKeyboard = false;
        _this7.showTool = false;
        _this7.isFocus = false;
      });
    },

    //改变为输入模式
    doInput: function doInput() {var _this8 = this;
      this.$nextTick(function () {
        _this8.showKeyboard = true;
        _this8.isFocus = true;
      });
    },

    //监听输入
    handleInput: function handleInput(e) {
      console.log(e);
    },

    tapTool: function tapTool(e) {
      var type = e.currentTarget.dataset.type;
      uni.showToast({
        title: "\u5373\u5C06\u6253\u5F00".concat(type),
        icon: 'none' });

    },
    //解决 当工具栏出现时，点击输入框聚焦页面不上推问题
    updateFocus: function updateFocus() {var _this9 = this;
      if (this.showTool) {
        this.showTool = false;
      }
      setTimeout(function () {
        _this9.$nextTick(function () {
          _this9.isFocus = false;
          // this.adjust = false
          setTimeout(function () {
            _this9.isFocus = true;
            // this.adjust = true
          }, 80);
        });
      }, 80);
    },

    //聚焦时触发
    handleFocus: function handleFocus() {




    },

    //触摸页面隐藏键盘和工具栏和表情等
    hideAll: function hideAll() {
      console.log('hideAll');
      if (this.showTool) {
        this.$nextTick(function () {var _this10 = this;
          setTimeout(function () {
            _this10.showTool = false;
          }, 200);
        });
      }
      if (this.isFocus) {
        this.$nextTick(function () {var _this11 = this;
          setTimeout(function () {
            _this11.isFocus = false;
          }, 200);
        });
      }
    },
    //工具栏的显示
    handleTool: function handleTool() {
      console.log('handleTool', this.btmStyle1);
      this.showTool = !this.showTool;
      //只获取一次底部输入框下面工具栏的高度
      // if(this.btmHeight2 === 0) {
      // 	this.getBtmHeight()
      // }
      console.log('this.showTool', this.showTool);
    },

    //获取底部工具栏时的高度,改变content下边距
    getBtmHeight: function getBtmHeight() {var _this12 = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.session-btm').boundingClientRect(function (data) {
        if (_this12.btmHeight1 === 0) {
          _this12.btmHeight1 = data.height;
          _this12.btmStyle1 = "padding-bottom: ".concat(data.height, "px;");
          console.log('获取无工具栏样式:', _this12.btmStyle2);
        } else {
          if (_this12.btmHeight2 === 0) {
            _this12.btmHeight2 = data.height;
            _this12.btmStyle2 = "padding-bottom: ".concat(data.height, "px;");
            console.log('获取有工具栏样式:', _this12.btmStyle2);
          }
        }
        console.log(data.height);

      }).exec();
    },

    //获取历史记录：
    getHistoryMsgs: function getHistoryMsgs() {
      if (this.hasHistoryMsg) {//是否还有历史记录
        var obj = {
          scene: this.chatType === 'p2p' ? 'p2p' : 'team',
          limit: 20,
          to: this.chatTo,
          done: this.getHistoryMsgsDone };

        app.globalData.nim.getHistoryMsgs(obj);
      } else {
        uni.showToast({
          title: '无更多聊天记录',
          icon: 'none' });

      }

    },
    getHistoryMsgsDone: function getHistoryMsgsDone(error, res) {var _this13 = this;
      console.log('获取p2p历史消息', res);

      if (res.msgs.length < 20) {
        this.hasHistoryMsg = false;
      }
      if (this.firstGetMsgs) {
        this.setCurrentChatList(res);
        this.firstGetMsgs = false;

        //第一次进入会话获取历史记录时滚动到底部
        this.$nextTick(function () {
          _this13.scrollToBottom();
        });
      } else {var _this$currentChatList;
        (_this$currentChatList = this.currentChatList.msgs).push.apply(_this$currentChatList, _toConsumableArray(res.msgs));
      }
      this.$nextTick(function () {
        _this13.freshing = false;
      });
      console.log('更新后历史记录:', this.currentChatList);
    },

    //跳转到GroupInfo
    toGroupInfo: function toGroupInfo() {
      uni.navigateTo({
        url: '/components/content/session/sessionSon/GroupInfo' });

    },

    //跳转到ChatFriendSetting
    toChatFriendSetting: function toChatFriendSetting() {
      uni.navigateTo({
        url: '/components/content/session/sessionSon/ChatFriendSetting' });

    } }),

  onLoad: function onLoad() {var _this14 = this;
    //初始化聊天对象
    var toSessionObj = JSON.parse(JSON.stringify(uni.getStorageSync('toSessionObj')));
    console.log('toSessionObj:', toSessionObj);
    this.chatTo = toSessionObj.chatTo;
    this.chatType = toSessionObj.chatType;

    this.getBtmHeight();
    this.imgUrl = _helper.imgBaseUrl;
    uni.getSystemInfo({
      success: function success(res) {
        _this14.windowHeight = res.windowHeight;
      } });


    if (this.chatType !== 'p2p') {
      (0, _session.queryGroupInfoRequest)(this.userInfo.user.userAccount, this.chatTo).then(function (res) {
        _this14.$toast.showRes(res);
        if (res.data.code === 2000) {
          _this14.groupInfo = res.data.data;
        }
      }).catch(function (err) {
        _this14.$toast.showErr(err);
      });
    }

    uni.removeStorage({ key: 'toSessionObj' });
    this.convertRawMessageListToRenderMessageArr(); //获取消息列表
    console.log('this.rawMessageList:', this.rawMessageList);
  },

  onBackPress: function onBackPress() {
    if (this.showTool) {
      this.showTool = false;
      return true;
      // if(e.from === 'navigateBack') {
      // 	//返回
      // 	return false
      // }
      // if(e.from === 'backbutton') {
      // 	uni.showModal({
      // 		title: '提示',
      // 		content: '您确定退出当前编辑？',
      // 		success(res) {
      // 			if(res.confirm) {
      // 				uni.navigateBack()
      // 			}else if(res.cancel){
      // 				//表示禁止默认返回
      // 				return true
      // 			}
      // 		},
      // 		fail(err) {
      // 			console.log(err)
      // 			return true
      // 		}
      // 	})
      // }
    } else {
      return false;
    }
  },
  onPageScroll: function onPageScroll(e) {var _this15 = this;
    console.log(e);
    if (this.isFocus) {
      this.$nextTick(function () {
        _this15.isFocus = false;
      });
    }
    //页面滚动时隐藏键盘和工具栏
    if (this.showTool) {
      this.$nextTick(function () {
        _this15.showTool = false;
      });
    }
  },
  onNavigationBarButtonTap: function onNavigationBarButtonTap(option) {
    if (option.index === 0) {
      if (this.chatType === 'p2p') {
        this.toChatFriendSetting();
      } else {
        this.toGroupInfo();
      }
    }
  },
  onHide: function onHide() {
    clearInterval(this.speakTimer);
  },
  onUnload: function onUnload() {
    //页面卸载时清空当前会话
    this.setCurrentChatList({});
    this.setCurrentChatTo('');
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 119:
/*!******************************************************************************************************!*\
  !*** E:/learning/kadingapp/components/content/session/Session.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX.2.4.2.20191115.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./Session.vue?vue&type=style&index=0&lang=scss& */ 120);
/* harmony import */ var _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_Session_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 120:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learning/kadingapp/components/content/session/Session.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[113,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/content/session/Session.js.map