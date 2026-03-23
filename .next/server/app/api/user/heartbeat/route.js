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
exports.id = "app/api/user/heartbeat/route";
exports.ids = ["app/api/user/heartbeat/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fheartbeat%2Froute&page=%2Fapi%2Fuser%2Fheartbeat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fheartbeat%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fheartbeat%2Froute&page=%2Fapi%2Fuser%2Fheartbeat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fheartbeat%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_user_heartbeat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/heartbeat/route.ts */ \"(rsc)/./app/api/user/heartbeat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/heartbeat/route\",\n        pathname: \"/api/user/heartbeat\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/heartbeat/route\"\n    },\n    resolvedPagePath: \"/Users/nerd/Desktop/AnaneaMadivaru/AM-Inventory/app/api/user/heartbeat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_user_heartbeat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/user/heartbeat/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGaGVhcnRiZWF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGaGVhcnRiZWF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRmhlYXJ0YmVhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5lcmQlMkZEZXNrdG9wJTJGQW5hbmVhTWFkaXZhcnUlMkZBTS1JbnZlbnRvcnklMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbmVyZCUyRkRlc2t0b3AlMkZBbmFuZWFNYWRpdmFydSUyRkFNLUludmVudG9yeSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvPzM5Y2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS91c2VyL2hlYXJ0YmVhdC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlci9oZWFydGJlYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2VyL2hlYXJ0YmVhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9oZWFydGJlYXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbmVyZC9EZXNrdG9wL0FuYW5lYU1hZGl2YXJ1L0FNLUludmVudG9yeS9hcHAvYXBpL3VzZXIvaGVhcnRiZWF0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2VyL2hlYXJ0YmVhdC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fheartbeat%2Froute&page=%2Fapi%2Fuser%2Fheartbeat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fheartbeat%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/user/heartbeat/route.ts":
/*!*****************************************!*\
  !*** ./app/api/user/heartbeat/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_user_activity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/user-activity */ \"(rsc)/./lib/user-activity.ts\");\n\n\n\n\nasync function POST(req) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session || !session.user?.email) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        await (0,_lib_user_activity__WEBPACK_IMPORTED_MODULE_3__.logUserActivity)({\n            userId: session.user.id || \"unknown\",\n            userEmail: session.user.email,\n            userName: session.user.name || undefined,\n            action: \"heartbeat\"\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Heartbeat logging failed:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Could not record heartbeat\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvaGVhcnRiZWF0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3RDtBQUNYO0FBQ0o7QUFDYTtBQUUvQyxlQUFlSSxLQUFLQyxHQUFnQjtJQUN6QyxNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO0lBQ2xELElBQUksQ0FBQ0ksV0FBVyxDQUFDQSxRQUFRQyxJQUFJLEVBQUVDLE9BQU87UUFDcEMsT0FBT1IscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7SUFFQSxJQUFJO1FBQ0YsTUFBTVIsbUVBQWVBLENBQUM7WUFDcEJTLFFBQVEsUUFBU0wsSUFBSSxDQUFTTSxFQUFFLElBQUk7WUFDcENDLFdBQVdSLFFBQVFDLElBQUksQ0FBQ0MsS0FBSztZQUM3Qk8sVUFBVVQsUUFBUUMsSUFBSSxDQUFDUyxJQUFJLElBQUlDO1lBQy9CQyxRQUFRO1FBQ1Y7UUFFQSxPQUFPbEIscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFVSxTQUFTO1FBQUs7SUFDM0MsRUFBRSxPQUFPVCxPQUFPO1FBQ2RVLFFBQVFWLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUE2QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNsRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW0taW52ZW50b3J5Ly4vYXBwL2FwaS91c2VyL2hlYXJ0YmVhdC9yb3V0ZS50cz8wMWZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBsb2dVc2VyQWN0aXZpdHkgfSBmcm9tIFwiQC9saWIvdXNlci1hY3Rpdml0eVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXI/LmVtYWlsKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgbG9nVXNlckFjdGl2aXR5KHtcbiAgICAgIHVzZXJJZDogKHNlc3Npb24udXNlciBhcyBhbnkpLmlkIHx8IFwidW5rbm93blwiLFxuICAgICAgdXNlckVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwsXG4gICAgICB1c2VyTmFtZTogc2Vzc2lvbi51c2VyLm5hbWUgfHwgdW5kZWZpbmVkLFxuICAgICAgYWN0aW9uOiBcImhlYXJ0YmVhdFwiLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSGVhcnRiZWF0IGxvZ2dpbmcgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQ291bGQgbm90IHJlY29yZCBoZWFydGJlYXRcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsImxvZ1VzZXJBY3Rpdml0eSIsIlBPU1QiLCJyZXEiLCJzZXNzaW9uIiwidXNlciIsImVtYWlsIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlcklkIiwiaWQiLCJ1c2VyRW1haWwiLCJ1c2VyTmFtZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJhY3Rpb24iLCJzdWNjZXNzIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/heartbeat/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_user_activity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/user-activity */ \"(rsc)/./lib/user-activity.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                if (!ok) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/sign-in\"\n    },\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            // Log successful login\n            if (user?.email) {\n                await (0,_lib_user_activity__WEBPACK_IMPORTED_MODULE_3__.logUserActivity)({\n                    userId: user.id || \"unknown\",\n                    userEmail: user.email,\n                    userName: user.name || undefined,\n                    action: \"login\",\n                    sessionId: account?.providerAccountId\n                }).catch(console.error);\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBc0M7QUFDNEI7QUFFcEM7QUFDd0I7QUFFL0MsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELFlBQVlJLFFBQVEsRUFBRSxPQUFPO2dCQUN6RCxNQUFNRSxPQUFPLE1BQU1iLCtDQUFNQSxDQUFDYSxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFBRUMsT0FBTzt3QkFBRVAsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFBRTtnQkFDaEYsSUFBSSxDQUFDSyxNQUFNLE9BQU87Z0JBQ2xCLE1BQU1HLEtBQUssTUFBTWQsdURBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFRSxLQUFLSyxZQUFZO2dCQUN2RSxJQUFJLENBQUNGLElBQUksT0FBTztnQkFDaEIsT0FBTztvQkFBRUcsSUFBSU4sS0FBS00sRUFBRTtvQkFBRVgsT0FBT0ssS0FBS0wsS0FBSztvQkFBRUYsTUFBTU8sS0FBS1AsSUFBSTtvQkFBRWMsTUFBTVAsS0FBS08sSUFBSTtnQkFBQztZQUM1RTtRQUNGO0tBQ0Q7SUFFREMsU0FBUztRQUFFQyxVQUFVO0lBQU07SUFFM0JDLE9BQU87UUFBRUMsUUFBUTtJQUFXO0lBQzVCQyxXQUFXO1FBQ1QsTUFBTUQsUUFBTyxFQUFFWCxJQUFJLEVBQUVhLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1lBQ3JDLHVCQUF1QjtZQUN2QixJQUFJZCxNQUFNTCxPQUFPO2dCQUNmLE1BQU1MLG1FQUFlQSxDQUFDO29CQUNwQnlCLFFBQVFmLEtBQUtNLEVBQUUsSUFBSTtvQkFDbkJVLFdBQVdoQixLQUFLTCxLQUFLO29CQUNyQnNCLFVBQVVqQixLQUFLUCxJQUFJLElBQUl5QjtvQkFDdkJDLFFBQVE7b0JBQ1JDLFdBQVdQLFNBQVNRO2dCQUN0QixHQUFHQyxLQUFLLENBQUNDLFFBQVFDLEtBQUs7WUFDeEI7WUFDQSxPQUFPO1FBQ1Q7UUFDQSxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRTFCLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSMEIsTUFBTW5CLElBQUksR0FBRyxLQUFjQSxJQUFJO2dCQUMvQm1CLE1BQU1wQixFQUFFLEdBQUcsS0FBY0EsRUFBRTtZQUM3QjtZQUNBLE9BQU9vQjtRQUNUO1FBQ0EsTUFBTWxCLFNBQVEsRUFBRUEsT0FBTyxFQUFFa0IsS0FBSyxFQUFFO1lBQzlCLElBQUlsQixRQUFRUixJQUFJLEVBQUU7Z0JBQ2ZRLFFBQVFSLElBQUksQ0FBU08sSUFBSSxHQUFHbUIsTUFBTW5CLElBQUk7Z0JBQ3RDQyxRQUFRUixJQUFJLENBQVNNLEVBQUUsR0FBR29CLE1BQU1wQixFQUFFO1lBQ3JDO1lBQ0EsT0FBT0U7UUFDVDtJQUNGO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCB7IE5leHRBdXRoT3B0aW9ucywgVXNlciBhcyBOZXh0QXV0aFVzZXIgfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IHsgbG9nVXNlckFjdGl2aXR5IH0gZnJvbSBcIkAvbGliL3VzZXItYWN0aXZpdHlcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHMucGFzc3dvcmQpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9IH0pO1xuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCk7XG4gICAgICAgIGlmICghb2spIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4geyBpZDogdXNlci5pZCwgZW1haWw6IHVzZXIuZW1haWwsIG5hbWU6IHVzZXIubmFtZSwgcm9sZTogdXNlci5yb2xlIH0gYXMgYW55O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcblxuICBwYWdlczogeyBzaWduSW46IFwiL3NpZ24taW5cIiB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIC8vIExvZyBzdWNjZXNzZnVsIGxvZ2luXG4gICAgICBpZiAodXNlcj8uZW1haWwpIHtcbiAgICAgICAgYXdhaXQgbG9nVXNlckFjdGl2aXR5KHtcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQgfHwgXCJ1bmtub3duXCIsXG4gICAgICAgICAgdXNlckVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIHVzZXJOYW1lOiB1c2VyLm5hbWUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGFjdGlvbjogXCJsb2dpblwiLFxuICAgICAgICAgIHNlc3Npb25JZDogYWNjb3VudD8ucHJvdmlkZXJBY2NvdW50SWQsXG4gICAgICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgICB0b2tlbi5pZCA9ICh1c2VyIGFzIGFueSkuaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IHRva2VuLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbn07XG4iXSwibmFtZXMiOlsicHJpc21hIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImxvZ1VzZXJBY3Rpdml0eSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJvayIsImNvbXBhcmUiLCJwYXNzd29yZEhhc2giLCJpZCIsInJvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImFjY291bnQiLCJwcm9maWxlIiwidXNlcklkIiwidXNlckVtYWlsIiwidXNlck5hbWUiLCJ1bmRlZmluZWQiLCJhY3Rpb24iLCJzZXNzaW9uSWQiLCJwcm92aWRlckFjY291bnRJZCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiand0IiwidG9rZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getActiveUsers: () => (/* binding */ getActiveUsers),\n/* harmony export */   getActiveUsersCount: () => (/* binding */ getActiveUsersCount),\n/* harmony export */   getUserActivityHistory: () => (/* binding */ getUserActivityHistory),\n/* harmony export */   logUserActivity: () => (/* binding */ logUserActivity)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\nasync function logUserActivity(data) {\n    try {\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.create({\n            data: {\n                userId: data.userId,\n                userEmail: data.userEmail,\n                userName: data.userName,\n                action: data.action,\n                ipAddress: data.ipAddress,\n                userAgent: data.userAgent,\n                sessionId: data.sessionId\n            }\n        });\n    } catch (error) {\n        console.error(\"Failed to log user activity:\", error);\n    }\n}\nasync function getActiveUsers(sinceMinutes = 30) {\n    const since = new Date(Date.now() - sinceMinutes * 60 * 1000);\n    // Get users who have been active within the time window\n    const activeUsers = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.findMany({\n        where: {\n            createdAt: {\n                gte: since\n            },\n            action: {\n                in: [\n                    \"login\",\n                    \"activity\",\n                    \"heartbeat\"\n                ]\n            }\n        },\n        select: {\n            userId: true,\n            userEmail: true,\n            userName: true,\n            action: true,\n            createdAt: true,\n            ipAddress: true\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    // Group by user and get the most recent activity\n    const userMap = new Map();\n    for (const activity of activeUsers){\n        if (!userMap.has(activity.userId)) {\n            userMap.set(activity.userId, activity);\n        }\n    }\n    return Array.from(userMap.values());\n}\nasync function getActiveUsersCount(sinceMinutes = 30) {\n    const activeUsers = await getActiveUsers(sinceMinutes);\n    return activeUsers.length;\n}\nasync function getUserActivityHistory(userId, limit = 50) {\n    return await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.userActivity.findMany({\n        where: {\n            userId\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        },\n        take: limit\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdXNlci1hY3Rpdml0eS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzQztBQVkvQixlQUFlQyxnQkFBZ0JDLElBQXNCO0lBQzFELElBQUk7UUFDRixNQUFNRiwrQ0FBTUEsQ0FBQ0csWUFBWSxDQUFDQyxNQUFNLENBQUM7WUFDL0JGLE1BQU07Z0JBQ0pHLFFBQVFILEtBQUtHLE1BQU07Z0JBQ25CQyxXQUFXSixLQUFLSSxTQUFTO2dCQUN6QkMsVUFBVUwsS0FBS0ssUUFBUTtnQkFDdkJDLFFBQVFOLEtBQUtNLE1BQU07Z0JBQ25CQyxXQUFXUCxLQUFLTyxTQUFTO2dCQUN6QkMsV0FBV1IsS0FBS1EsU0FBUztnQkFDekJDLFdBQVdULEtBQUtTLFNBQVM7WUFDM0I7UUFDRjtJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0NBQWdDQTtJQUNoRDtBQUNGO0FBRU8sZUFBZUUsZUFBZUMsZUFBdUIsRUFBRTtJQUM1RCxNQUFNQyxRQUFRLElBQUlDLEtBQUtBLEtBQUtDLEdBQUcsS0FBS0gsZUFBZSxLQUFLO0lBRXhELHdEQUF3RDtJQUN4RCxNQUFNSSxjQUFjLE1BQU1uQiwrQ0FBTUEsQ0FBQ0csWUFBWSxDQUFDaUIsUUFBUSxDQUFDO1FBQ3JEQyxPQUFPO1lBQ0xDLFdBQVc7Z0JBQ1RDLEtBQUtQO1lBQ1A7WUFDQVIsUUFBUTtnQkFDTmdCLElBQUk7b0JBQUM7b0JBQVM7b0JBQVk7aUJBQVk7WUFDeEM7UUFDRjtRQUNBQyxRQUFRO1lBQ05wQixRQUFRO1lBQ1JDLFdBQVc7WUFDWEMsVUFBVTtZQUNWQyxRQUFRO1lBQ1JjLFdBQVc7WUFDWGIsV0FBVztRQUNiO1FBQ0FpQixTQUFTO1lBQ1BKLFdBQVc7UUFDYjtJQUNGO0lBRUEsaURBQWlEO0lBQ2pELE1BQU1LLFVBQVUsSUFBSUM7SUFFcEIsS0FBSyxNQUFNQyxZQUFZVixZQUFhO1FBQ2xDLElBQUksQ0FBQ1EsUUFBUUcsR0FBRyxDQUFDRCxTQUFTeEIsTUFBTSxHQUFHO1lBQ2pDc0IsUUFBUUksR0FBRyxDQUFDRixTQUFTeEIsTUFBTSxFQUFFd0I7UUFDL0I7SUFDRjtJQUVBLE9BQU9HLE1BQU1DLElBQUksQ0FBQ04sUUFBUU8sTUFBTTtBQUNsQztBQUVPLGVBQWVDLG9CQUFvQnBCLGVBQXVCLEVBQUU7SUFDakUsTUFBTUksY0FBYyxNQUFNTCxlQUFlQztJQUN6QyxPQUFPSSxZQUFZaUIsTUFBTTtBQUMzQjtBQUVPLGVBQWVDLHVCQUF1QmhDLE1BQWMsRUFBRWlDLFFBQWdCLEVBQUU7SUFDN0UsT0FBTyxNQUFNdEMsK0NBQU1BLENBQUNHLFlBQVksQ0FBQ2lCLFFBQVEsQ0FBQztRQUN4Q0MsT0FBTztZQUNMaEI7UUFDRjtRQUNBcUIsU0FBUztZQUNQSixXQUFXO1FBQ2I7UUFDQWlCLE1BQU1EO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2xpYi91c2VyLWFjdGl2aXR5LnRzPzBmMzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJBY3Rpdml0eURhdGEge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckVtYWlsOiBzdHJpbmc7XG4gIHVzZXJOYW1lPzogc3RyaW5nO1xuICBhY3Rpb246IFwibG9naW5cIiB8IFwibG9nb3V0XCIgfCBcImFjdGl2aXR5XCIgfCBcImhlYXJ0YmVhdFwiO1xuICBpcEFkZHJlc3M/OiBzdHJpbmc7XG4gIHVzZXJBZ2VudD86IHN0cmluZztcbiAgc2Vzc2lvbklkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nVXNlckFjdGl2aXR5KGRhdGE6IFVzZXJBY3Rpdml0eURhdGEpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwcmlzbWEudXNlckFjdGl2aXR5LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJJZDogZGF0YS51c2VySWQsXG4gICAgICAgIHVzZXJFbWFpbDogZGF0YS51c2VyRW1haWwsXG4gICAgICAgIHVzZXJOYW1lOiBkYXRhLnVzZXJOYW1lLFxuICAgICAgICBhY3Rpb246IGRhdGEuYWN0aW9uLFxuICAgICAgICBpcEFkZHJlc3M6IGRhdGEuaXBBZGRyZXNzLFxuICAgICAgICB1c2VyQWdlbnQ6IGRhdGEudXNlckFnZW50LFxuICAgICAgICBzZXNzaW9uSWQ6IGRhdGEuc2Vzc2lvbklkLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvZyB1c2VyIGFjdGl2aXR5OlwiLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJzKHNpbmNlTWludXRlczogbnVtYmVyID0gMzApIHtcbiAgY29uc3Qgc2luY2UgPSBuZXcgRGF0ZShEYXRlLm5vdygpIC0gc2luY2VNaW51dGVzICogNjAgKiAxMDAwKTtcblxuICAvLyBHZXQgdXNlcnMgd2hvIGhhdmUgYmVlbiBhY3RpdmUgd2l0aGluIHRoZSB0aW1lIHdpbmRvd1xuICBjb25zdCBhY3RpdmVVc2VycyA9IGF3YWl0IHByaXNtYS51c2VyQWN0aXZpdHkuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgZ3RlOiBzaW5jZSxcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgaW46IFtcImxvZ2luXCIsIFwiYWN0aXZpdHlcIiwgXCJoZWFydGJlYXRcIl0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICB1c2VySWQ6IHRydWUsXG4gICAgICB1c2VyRW1haWw6IHRydWUsXG4gICAgICB1c2VyTmFtZTogdHJ1ZSxcbiAgICAgIGFjdGlvbjogdHJ1ZSxcbiAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIGlwQWRkcmVzczogdHJ1ZSxcbiAgICB9LFxuICAgIG9yZGVyQnk6IHtcbiAgICAgIGNyZWF0ZWRBdDogXCJkZXNjXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gR3JvdXAgYnkgdXNlciBhbmQgZ2V0IHRoZSBtb3N0IHJlY2VudCBhY3Rpdml0eVxuICBjb25zdCB1c2VyTWFwID0gbmV3IE1hcDxzdHJpbmcsIHR5cGVvZiBhY3RpdmVVc2Vyc1swXT4oKTtcblxuICBmb3IgKGNvbnN0IGFjdGl2aXR5IG9mIGFjdGl2ZVVzZXJzKSB7XG4gICAgaWYgKCF1c2VyTWFwLmhhcyhhY3Rpdml0eS51c2VySWQpKSB7XG4gICAgICB1c2VyTWFwLnNldChhY3Rpdml0eS51c2VySWQsIGFjdGl2aXR5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VyTWFwLnZhbHVlcygpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJzQ291bnQoc2luY2VNaW51dGVzOiBudW1iZXIgPSAzMCkge1xuICBjb25zdCBhY3RpdmVVc2VycyA9IGF3YWl0IGdldEFjdGl2ZVVzZXJzKHNpbmNlTWludXRlcyk7XG4gIHJldHVybiBhY3RpdmVVc2Vycy5sZW5ndGg7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQWN0aXZpdHlIaXN0b3J5KHVzZXJJZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNTApIHtcbiAgcmV0dXJuIGF3YWl0IHByaXNtYS51c2VyQWN0aXZpdHkuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2VySWQsXG4gICAgfSxcbiAgICBvcmRlckJ5OiB7XG4gICAgICBjcmVhdGVkQXQ6IFwiZGVzY1wiLFxuICAgIH0sXG4gICAgdGFrZTogbGltaXQsXG4gIH0pO1xufSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJsb2dVc2VyQWN0aXZpdHkiLCJkYXRhIiwidXNlckFjdGl2aXR5IiwiY3JlYXRlIiwidXNlcklkIiwidXNlckVtYWlsIiwidXNlck5hbWUiLCJhY3Rpb24iLCJpcEFkZHJlc3MiLCJ1c2VyQWdlbnQiLCJzZXNzaW9uSWQiLCJlcnJvciIsImNvbnNvbGUiLCJnZXRBY3RpdmVVc2VycyIsInNpbmNlTWludXRlcyIsInNpbmNlIiwiRGF0ZSIsIm5vdyIsImFjdGl2ZVVzZXJzIiwiZmluZE1hbnkiLCJ3aGVyZSIsImNyZWF0ZWRBdCIsImd0ZSIsImluIiwic2VsZWN0Iiwib3JkZXJCeSIsInVzZXJNYXAiLCJNYXAiLCJhY3Rpdml0eSIsImhhcyIsInNldCIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsImdldEFjdGl2ZVVzZXJzQ291bnQiLCJsZW5ndGgiLCJnZXRVc2VyQWN0aXZpdHlIaXN0b3J5IiwibGltaXQiLCJ0YWtlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/user-activity.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fheartbeat%2Froute&page=%2Fapi%2Fuser%2Fheartbeat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fheartbeat%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();