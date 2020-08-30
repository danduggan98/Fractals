(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./init.js":
/*!*****************!*\
  !*** ./init.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pkg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pkg */ \"./pkg/experiments.js\");\n//DATA IS THERE, BUT ITS NOT VISIBLE???\n\n\n\n(function loadMandelbrot() {\n    console.time('Mandelbrot loaded in');\n    const fractalCanvas = document.getElementById('fractalCanvas');\n    const width = fractalCanvas.width;\n    const height = fractalCanvas.height;\n\n    //Create an image from our mandelbrot results\n    const pixels = _pkg__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot\"](width, height, -1.0, 0.0, 16);\n    const fractalArray = new Uint8ClampedArray(pixels);\n    const fractalImage = new ImageData(fractalArray, width, height);\n\n    //Store the image in our canvas\n    const ctx = fractalCanvas.getContext('2d');\n    ctx.putImageData(fractalImage, 0, 0);\n\n    console.log('Initial image data:', fractalImage.data);\n    console.log('Initial data:', pixels);\n    console.log('Final image data:', ctx.getImageData(0,0,width,height));\n    console.timeEnd('Mandelbrot loaded in');\n})();\n\n\n//# sourceURL=webpack:///./init.js?");

/***/ }),

/***/ "./pkg/experiments.js":
/*!****************************!*\
  !*** ./pkg/experiments.js ***!
  \****************************/
/*! exports provided: mandelbrot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./experiments_bg.wasm */ \"./pkg/experiments_bg.wasm\");\n/* harmony import */ var _experiments_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./experiments_bg.js */ \"./pkg/experiments_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mandelbrot\", function() { return _experiments_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"mandelbrot\"]; });\n\n\n\n\n//# sourceURL=webpack:///./pkg/experiments.js?");

/***/ }),

/***/ "./pkg/experiments_bg.js":
/*!*******************************!*\
  !*** ./pkg/experiments_bg.js ***!
  \*******************************/
/*! exports provided: mandelbrot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mandelbrot\", function() { return mandelbrot; });\n/* harmony import */ var _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./experiments_bg.wasm */ \"./pkg/experiments_bg.wasm\");\n\n\nfunction _assertNum(n) {\n    if (typeof(n) !== 'number') throw new Error('expected a number argument');\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getArrayU8FromWasm0(ptr, len) {\n    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);\n}\n/**\n* @param {number} width\n* @param {number} height\n* @param {number} x_0\n* @param {number} y_0\n* @param {number} max_iterations\n* @returns {Uint8Array}\n*/\nfunction mandelbrot(width, height, x_0, y_0, max_iterations) {\n    try {\n        const retptr = _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_export_0\"].value - 16;\n        _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_export_0\"].value = retptr;\n        _assertNum(width);\n        _assertNum(height);\n        _assertNum(max_iterations);\n        _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot\"](retptr, width, height, x_0, y_0, max_iterations);\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        var v0 = getArrayU8FromWasm0(r0, r1).slice();\n        _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1 * 1);\n        return v0;\n    } finally {\n        _experiments_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_export_0\"].value += 16;\n    }\n}\n\n\n\n//# sourceURL=webpack:///./pkg/experiments_bg.js?");

/***/ }),

/***/ "./pkg/experiments_bg.wasm":
/*!*********************************!*\
  !*** ./pkg/experiments_bg.wasm ***!
  \*********************************/
/*! exports provided: memory, mandelbrot, __wbindgen_export_0, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./pkg/experiments_bg.wasm?");

/***/ })

}]);