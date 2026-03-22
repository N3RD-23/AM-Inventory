"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/nerd/Desktop/AnaneaMadivaru/AM-Inventory/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5lcmQlMkZEZXNrdG9wJTJGQW5hbmVhTWFkaXZhcnUlMkZBTS1JbnZlbnRvcnklMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbmVyZCUyRkRlc2t0b3AlMkZBbmFuZWFNYWRpdmFydSUyRkFNLUludmVudG9yeSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvP2FhNTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFDTyIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_user_activity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/user-activity */ \"(rsc)/./lib/user-activity.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                if (!ok) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/sign-in\"\n    },\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            // Log successful login\n            if (user?.email) {\n                await (0,_lib_user_activity__WEBPACK_IMPORTED_MODULE_3__.logUserActivity)({\n                    userId: user.id || \"unknown\",\n                    userEmail: user.email,\n                    userName: user.name || undefined,\n                    action: \"login\",\n                    sessionId: account?.providerAccountId\n                }).catch(console.error);\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBc0M7QUFDNEI7QUFFcEM7QUFDd0I7QUFFL0MsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELFlBQVlJLFFBQVEsRUFBRSxPQUFPO2dCQUN6RCxNQUFNRSxPQUFPLE1BQU1iLCtDQUFNQSxDQUFDYSxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFBRUMsT0FBTzt3QkFBRVAsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFBRTtnQkFDaEYsSUFBSSxDQUFDSyxNQUFNLE9BQU87Z0JBQ2xCLE1BQU1HLEtBQUssTUFBTWQsdURBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFRSxLQUFLSyxZQUFZO2dCQUN2RSxJQUFJLENBQUNGLElBQUksT0FBTztnQkFDaEIsT0FBTztvQkFBRUcsSUFBSU4sS0FBS00sRUFBRTtvQkFBRVgsT0FBT0ssS0FBS0wsS0FBSztvQkFBRUYsTUFBTU8sS0FBS1AsSUFBSTtvQkFBRWMsTUFBTVAsS0FBS08sSUFBSTtnQkFBQztZQUM1RTtRQUNGO0tBQ0Q7SUFFREMsU0FBUztRQUFFQyxVQUFVO0lBQU07SUFFM0JDLE9BQU87UUFBRUMsUUFBUTtJQUFXO0lBQzVCQyxXQUFXO1FBQ1QsTUFBTUQsUUFBTyxFQUFFWCxJQUFJLEVBQUVhLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1lBQ3JDLHVCQUF1QjtZQUN2QixJQUFJZCxNQUFNTCxPQUFPO2dCQUNmLE1BQU1MLG1FQUFlQSxDQUFDO29CQUNwQnlCLFFBQVFmLEtBQUtNLEVBQUUsSUFBSTtvQkFDbkJVLFdBQVdoQixLQUFLTCxLQUFLO29CQUNyQnNCLFVBQVVqQixLQUFLUCxJQUFJLElBQUl5QjtvQkFDdkJDLFFBQVE7b0JBQ1JDLFdBQVdQLFNBQVNRO2dCQUN0QixHQUFHQyxLQUFLLENBQUNDLFFBQVFDLEtBQUs7WUFDeEI7WUFDQSxPQUFPO1FBQ1Q7UUFDQSxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRTFCLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSMEIsTUFBTW5CLElBQUksR0FBRyxLQUFjQSxJQUFJO1lBQ2pDO1lBQ0EsT0FBT21CO1FBQ1Q7UUFDQSxNQUFNbEIsU0FBUSxFQUFFQSxPQUFPLEVBQUVrQixLQUFLLEVBQUU7WUFDOUIsSUFBSWxCLFFBQVFSLElBQUksRUFBRTtnQkFDZlEsUUFBUVIsSUFBSSxDQUFTTyxJQUFJLEdBQUdtQixNQUFNbkIsSUFBSTtZQUN6QztZQUNBLE9BQU9DO1FBQ1Q7SUFDRjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMsIFVzZXIgYXMgTmV4dEF1dGhVc2VyIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcbmltcG9ydCB7IGxvZ1VzZXJBY3Rpdml0eSB9IGZyb20gXCJAL2xpYi91c2VyLWFjdGl2aXR5XCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzLnBhc3N3b3JkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSB9KTtcbiAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpO1xuICAgICAgICBpZiAoIW9rKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHsgaWQ6IHVzZXIuaWQsIGVtYWlsOiB1c2VyLmVtYWlsLCBuYW1lOiB1c2VyLm5hbWUsIHJvbGU6IHVzZXIucm9sZSB9IGFzIGFueTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIFxuICBzZXNzaW9uOiB7IHN0cmF0ZWd5OiBcImp3dFwiIH0sXG5cbiAgcGFnZXM6IHsgc2lnbkluOiBcIi9zaWduLWluXCIgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCwgcHJvZmlsZSB9KSB7XG4gICAgICAvLyBMb2cgc3VjY2Vzc2Z1bCBsb2dpblxuICAgICAgaWYgKHVzZXI/LmVtYWlsKSB7XG4gICAgICAgIGF3YWl0IGxvZ1VzZXJBY3Rpdml0eSh7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkIHx8IFwidW5rbm93blwiLFxuICAgICAgICAgIHVzZXJFbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICB1c2VyTmFtZTogdXNlci5uYW1lIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBhY3Rpb246IFwibG9naW5cIixcbiAgICAgICAgICBzZXNzaW9uSWQ6IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkLFxuICAgICAgICB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4ucm9sZSA9ICh1c2VyIGFzIGFueSkucm9sZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbInByaXNtYSIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJsb2dVc2VyQWN0aXZpdHkiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwib2siLCJjb21wYXJlIiwicGFzc3dvcmRIYXNoIiwiaWQiLCJyb2xlIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJhY2NvdW50IiwicHJvZmlsZSIsInVzZXJJZCIsInVzZXJFbWFpbCIsInVzZXJOYW1lIiwidW5kZWZpbmVkIiwiYWN0aW9uIiwic2Vzc2lvbklkIiwicHJvdmlkZXJBY2NvdW50SWQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImp3dCIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztLQUFPO0FBQ3hCLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbXCJlcnJvclwiLCBcIndhcm5cIl0sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/user-activity.ts":
/*!******************************!*\
  !*** ./lib/user-activity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getActiveUsers: () => (/* binding */ getActiveUsers),\n/* harmony export */   getActiveUsersCount: () => (/* binding */ getActiveUsersCount),\n/* harmony export */   getUserActivityHistory: () => (/* binding */ getUserActivityHistory),\n/* harmony export */   logUserActivity: () => (/* binding */ logUserActivity)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\nasync function logUserActivity(data) {\n    try {\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.create({\n            data: {\n                userId: data.userId,\n                userEmail: data.userEmail,\n                userName: data.userName,\n                action: data.action,\n                ipAddress: data.ipAddress,\n                userAgent: data.userAgent,\n                sessionId: data.sessionId\n            }\n        });\n    } catch (error) {\n        console.error(\"Failed to log user activity:\", error);\n    }\n}\nasync function getActiveUsers(sinceMinutes = 30) {\n    const since = new Date(Date.now() - sinceMinutes * 60 * 1000);\n    // Get users who have been active within the time window\n    const activeUsers = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.findMany({\n        where: {\n            createdAt: {\n                gte: since\n            },\n            action: {\n                in: [\n                    \"login\",\n                    \"activity\"\n                ]\n            }\n        },\n        select: {\n            userId: true,\n            userEmail: true,\n            userName: true,\n            action: true,\n            createdAt: true,\n            ipAddress: true\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    // Group by user and get the most recent activity\n    const userMap = new Map();\n    for (const activity of activeUsers){\n        if (!userMap.has(activity.userId)) {\n            userMap.set(activity.userId, activity);\n        }\n    }\n    return Array.from(userMap.values());\n}\nasync function getActiveUsersCount(sinceMinutes = 30) {\n    const activeUsers = await getActiveUsers(sinceMinutes);\n    return activeUsers.length;\n}\nasync function getUserActivityHistory(userId, limit = 50) {\n    return await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.findMany({\n        where: {\n            userId\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        },\n        take: limit\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdXNlci1hY3Rpdml0eS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzQztBQVkvQixlQUFlQyxnQkFBZ0JDLElBQXNCO0lBQzFELElBQUk7UUFDRixNQUFNRiwrQ0FBTUEsQ0FBQ0csWUFBWSxDQUFDQyxNQUFNLENBQUM7WUFDL0JGLE1BQU07Z0JBQ0pHLFFBQVFILEtBQUtHLE1BQU07Z0JBQ25CQyxXQUFXSixLQUFLSSxTQUFTO2dCQUN6QkMsVUFBVUwsS0FBS0ssUUFBUTtnQkFDdkJDLFFBQVFOLEtBQUtNLE1BQU07Z0JBQ25CQyxXQUFXUCxLQUFLTyxTQUFTO2dCQUN6QkMsV0FBV1IsS0FBS1EsU0FBUztnQkFDekJDLFdBQVdULEtBQUtTLFNBQVM7WUFDM0I7UUFDRjtJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0NBQWdDQTtJQUNoRDtBQUNGO0FBRU8sZUFBZUUsZUFBZUMsZUFBdUIsRUFBRTtJQUM1RCxNQUFNQyxRQUFRLElBQUlDLEtBQUtBLEtBQUtDLEdBQUcsS0FBS0gsZUFBZSxLQUFLO0lBRXhELHdEQUF3RDtJQUN4RCxNQUFNSSxjQUFjLE1BQU1uQiwrQ0FBTUEsQ0FBQ0csWUFBWSxDQUFDaUIsUUFBUSxDQUFDO1FBQ3JEQyxPQUFPO1lBQ0xDLFdBQVc7Z0JBQ1RDLEtBQUtQO1lBQ1A7WUFDQVIsUUFBUTtnQkFDTmdCLElBQUk7b0JBQUM7b0JBQVM7aUJBQVc7WUFDM0I7UUFDRjtRQUNBQyxRQUFRO1lBQ05wQixRQUFRO1lBQ1JDLFdBQVc7WUFDWEMsVUFBVTtZQUNWQyxRQUFRO1lBQ1JjLFdBQVc7WUFDWGIsV0FBVztRQUNiO1FBQ0FpQixTQUFTO1lBQ1BKLFdBQVc7UUFDYjtJQUNGO0lBRUEsaURBQWlEO0lBQ2pELE1BQU1LLFVBQVUsSUFBSUM7SUFFcEIsS0FBSyxNQUFNQyxZQUFZVixZQUFhO1FBQ2xDLElBQUksQ0FBQ1EsUUFBUUcsR0FBRyxDQUFDRCxTQUFTeEIsTUFBTSxHQUFHO1lBQ2pDc0IsUUFBUUksR0FBRyxDQUFDRixTQUFTeEIsTUFBTSxFQUFFd0I7UUFDL0I7SUFDRjtJQUVBLE9BQU9HLE1BQU1DLElBQUksQ0FBQ04sUUFBUU8sTUFBTTtBQUNsQztBQUVPLGVBQWVDLG9CQUFvQnBCLGVBQXVCLEVBQUU7SUFDakUsTUFBTUksY0FBYyxNQUFNTCxlQUFlQztJQUN6QyxPQUFPSSxZQUFZaUIsTUFBTTtBQUMzQjtBQUVPLGVBQWVDLHVCQUF1QmhDLE1BQWMsRUFBRWlDLFFBQWdCLEVBQUU7SUFDN0UsT0FBTyxNQUFNdEMsK0NBQU1BLENBQUNHLFlBQVksQ0FBQ2lCLFFBQVEsQ0FBQztRQUN4Q0MsT0FBTztZQUNMaEI7UUFDRjtRQUNBcUIsU0FBUztZQUNQSixXQUFXO1FBQ2I7UUFDQWlCLE1BQU1EO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2xpYi91c2VyLWFjdGl2aXR5LnRzPzBmMzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJBY3Rpdml0eURhdGEge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckVtYWlsOiBzdHJpbmc7XG4gIHVzZXJOYW1lPzogc3RyaW5nO1xuICBhY3Rpb246IFwibG9naW5cIiB8IFwibG9nb3V0XCIgfCBcImFjdGl2aXR5XCI7XG4gIGlwQWRkcmVzcz86IHN0cmluZztcbiAgdXNlckFnZW50Pzogc3RyaW5nO1xuICBzZXNzaW9uSWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dVc2VyQWN0aXZpdHkoZGF0YTogVXNlckFjdGl2aXR5RGF0YSkge1xuICB0cnkge1xuICAgIGF3YWl0IHByaXNtYS51c2VyQWN0aXZpdHkuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkOiBkYXRhLnVzZXJJZCxcbiAgICAgICAgdXNlckVtYWlsOiBkYXRhLnVzZXJFbWFpbCxcbiAgICAgICAgdXNlck5hbWU6IGRhdGEudXNlck5hbWUsXG4gICAgICAgIGFjdGlvbjogZGF0YS5hY3Rpb24sXG4gICAgICAgIGlwQWRkcmVzczogZGF0YS5pcEFkZHJlc3MsXG4gICAgICAgIHVzZXJBZ2VudDogZGF0YS51c2VyQWdlbnQsXG4gICAgICAgIHNlc3Npb25JZDogZGF0YS5zZXNzaW9uSWQsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9nIHVzZXIgYWN0aXZpdHk6XCIsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlcnMoc2luY2VNaW51dGVzOiBudW1iZXIgPSAzMCkge1xuICBjb25zdCBzaW5jZSA9IG5ldyBEYXRlKERhdGUubm93KCkgLSBzaW5jZU1pbnV0ZXMgKiA2MCAqIDEwMDApO1xuXG4gIC8vIEdldCB1c2VycyB3aG8gaGF2ZSBiZWVuIGFjdGl2ZSB3aXRoaW4gdGhlIHRpbWUgd2luZG93XG4gIGNvbnN0IGFjdGl2ZVVzZXJzID0gYXdhaXQgcHJpc21hLnVzZXJBY3Rpdml0eS5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICBndGU6IHNpbmNlLFxuICAgICAgfSxcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICBpbjogW1wibG9naW5cIiwgXCJhY3Rpdml0eVwiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIHVzZXJJZDogdHJ1ZSxcbiAgICAgIHVzZXJFbWFpbDogdHJ1ZSxcbiAgICAgIHVzZXJOYW1lOiB0cnVlLFxuICAgICAgYWN0aW9uOiB0cnVlLFxuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgaXBBZGRyZXNzOiB0cnVlLFxuICAgIH0sXG4gICAgb3JkZXJCeToge1xuICAgICAgY3JlYXRlZEF0OiBcImRlc2NcIixcbiAgICB9LFxuICB9KTtcblxuICAvLyBHcm91cCBieSB1c2VyIGFuZCBnZXQgdGhlIG1vc3QgcmVjZW50IGFjdGl2aXR5XG4gIGNvbnN0IHVzZXJNYXAgPSBuZXcgTWFwPHN0cmluZywgdHlwZW9mIGFjdGl2ZVVzZXJzWzBdPigpO1xuXG4gIGZvciAoY29uc3QgYWN0aXZpdHkgb2YgYWN0aXZlVXNlcnMpIHtcbiAgICBpZiAoIXVzZXJNYXAuaGFzKGFjdGl2aXR5LnVzZXJJZCkpIHtcbiAgICAgIHVzZXJNYXAuc2V0KGFjdGl2aXR5LnVzZXJJZCwgYWN0aXZpdHkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKHVzZXJNYXAudmFsdWVzKCkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlcnNDb3VudChzaW5jZU1pbnV0ZXM6IG51bWJlciA9IDMwKSB7XG4gIGNvbnN0IGFjdGl2ZVVzZXJzID0gYXdhaXQgZ2V0QWN0aXZlVXNlcnMoc2luY2VNaW51dGVzKTtcbiAgcmV0dXJuIGFjdGl2ZVVzZXJzLmxlbmd0aDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJBY3Rpdml0eUhpc3RvcnkodXNlcklkOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1MCkge1xuICByZXR1cm4gYXdhaXQgcHJpc21hLnVzZXJBY3Rpdml0eS5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIHVzZXJJZCxcbiAgICB9LFxuICAgIG9yZGVyQnk6IHtcbiAgICAgIGNyZWF0ZWRBdDogXCJkZXNjXCIsXG4gICAgfSxcbiAgICB0YWtlOiBsaW1pdCxcbiAgfSk7XG59Il0sIm5hbWVzIjpbInByaXNtYSIsImxvZ1VzZXJBY3Rpdml0eSIsImRhdGEiLCJ1c2VyQWN0aXZpdHkiLCJjcmVhdGUiLCJ1c2VySWQiLCJ1c2VyRW1haWwiLCJ1c2VyTmFtZSIsImFjdGlvbiIsImlwQWRkcmVzcyIsInVzZXJBZ2VudCIsInNlc3Npb25JZCIsImVycm9yIiwiY29uc29sZSIsImdldEFjdGl2ZVVzZXJzIiwic2luY2VNaW51dGVzIiwic2luY2UiLCJEYXRlIiwibm93IiwiYWN0aXZlVXNlcnMiLCJmaW5kTWFueSIsIndoZXJlIiwiY3JlYXRlZEF0IiwiZ3RlIiwiaW4iLCJzZWxlY3QiLCJvcmRlckJ5IiwidXNlck1hcCIsIk1hcCIsImFjdGl2aXR5IiwiaGFzIiwic2V0IiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwiZ2V0QWN0aXZlVXNlcnNDb3VudCIsImxlbmd0aCIsImdldFVzZXJBY3Rpdml0eUhpc3RvcnkiLCJsaW1pdCIsInRha2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/user-activity.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();