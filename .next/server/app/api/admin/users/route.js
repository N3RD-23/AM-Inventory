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
exports.id = "app/api/admin/users/route";
exports.ids = ["app/api/admin/users/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/users/route.ts */ \"(rsc)/./app/api/admin/users/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/users/route\",\n        pathname: \"/api/admin/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/users/route\"\n    },\n    resolvedPagePath: \"/Users/nerd/Desktop/AnaneaMadivaru/AM-Inventory/app/api/admin/users/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/users/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5lcmQlMkZEZXNrdG9wJTJGQW5hbmVhTWFkaXZhcnUlMkZBTS1JbnZlbnRvcnklMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbmVyZCUyRkRlc2t0b3AlMkZBbmFuZWFNYWRpdmFydSUyRkFNLUludmVudG9yeSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDNEI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvPzkxNDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS9hZG1pbi91c2Vycy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbmVyZC9EZXNrdG9wL0FuYW5lYU1hZGl2YXJ1L0FNLUludmVudG9yeS9hcHAvYXBpL2FkbWluL3VzZXJzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi91c2Vycy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/users/route.ts":
/*!**************************************!*\
  !*** ./app/api/admin/users/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function guard() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session || session.user.role !== \"ADMIN\") throw new Error(\"Forbidden\");\n    return session;\n}\nasync function GET() {\n    await guard();\n    const users = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findMany({\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    return Response.json(users.map((u)=>({\n            id: u.id,\n            email: u.email,\n            name: u.name,\n            role: u.role\n        })));\n}\nasync function POST(req) {\n    const s = await guard();\n    const body = await req.json();\n    const passwordHash = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hash(body.password, 10);\n    const u = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.create({\n        data: {\n            email: body.email,\n            name: body.name,\n            role: body.role,\n            passwordHash\n        }\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"CREATE\",\n            entity: \"User\",\n            entityId: u.id,\n            actorEmail: s.user?.email ?? undefined\n        }\n    });\n    return Response.json({\n        ok: true\n    });\n}\nasync function PATCH(req) {\n    const s = await guard();\n    const body = await req.json();\n    let data = {\n        email: body.email,\n        name: body.name,\n        role: body.role\n    };\n    if (body.password && body.password.length > 0) {\n        data.passwordHash = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hash(body.password, 10);\n    }\n    const u = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.update({\n        where: {\n            id: body.id\n        },\n        data\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"UPDATE\",\n            entity: \"User\",\n            entityId: u.id,\n            actorEmail: s.user?.email ?? undefined,\n            details: JSON.stringify({\n                email: body.email,\n                name: body.name,\n                role: body.role,\n                pw: !!body.password\n            })\n        }\n    });\n    return Response.json({\n        ok: true\n    });\n}\nasync function DELETE(req) {\n    const s = await guard();\n    const { searchParams } = new URL(req.url);\n    const id = searchParams.get(\"id\");\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.delete({\n        where: {\n            id\n        }\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"DELETE\",\n            entity: \"User\",\n            entityId: id,\n            actorEmail: s.user?.email ?? undefined\n        }\n    });\n    return Response.json({\n        ok: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxNQUFNQyxJQUFJLE1BQU1uQjtJQUNoQixNQUFNLEVBQUUwQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJekIsSUFBSTBCLEdBQUc7SUFDeEMsTUFBTTlCLEtBQUs0QixhQUFhRyxHQUFHLENBQUM7SUFDNUIsTUFBTWpELCtDQUFNQSxDQUFDTSxJQUFJLENBQUM0QyxNQUFNLENBQUM7UUFBRVYsT0FBTztZQUFFdEI7UUFBRztJQUFFO0lBQ3pDLE1BQU1sQiwrQ0FBTUEsQ0FBQzhCLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO1FBQUVDLE1BQU07WUFBRUUsUUFBUTtZQUFVQyxRQUFRO1lBQVFDLFVBQVVmO1lBQUlnQixZQUFZWCxFQUFFakIsSUFBSSxFQUFFYSxTQUFTZ0I7UUFBVTtJQUFFO0lBQzNILE9BQU9yQixTQUFTQyxJQUFJLENBQUM7UUFBRXFCLElBQUk7SUFBSztBQUNsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2FwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGUudHM/YTIzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuXG5hc3luYyBmdW5jdGlvbiBndWFyZCgpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICBpZiAoIXNlc3Npb24gfHwgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikgdGhyb3cgbmV3IEVycm9yKFwiRm9yYmlkZGVuXCIpO1xuICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICBhd2FpdCBndWFyZCgpO1xuICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRNYW55KHsgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0gfSk7XG4gIHJldHVybiBSZXNwb25zZS5qc29uKHVzZXJzLm1hcCh1ID0+ICh7IGlkOiB1LmlkLCBlbWFpbDogdS5lbWFpbCwgbmFtZTogdS5uYW1lLCByb2xlOiB1LnJvbGUgfSkpKTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgcyA9IGF3YWl0IGd1YXJkKCk7XG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICBjb25zdCBwYXNzd29yZEhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCAxMCk7XG4gIGNvbnN0IHUgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoeyBkYXRhOiB7IGVtYWlsOiBib2R5LmVtYWlsLCBuYW1lOiBib2R5Lm5hbWUsIHJvbGU6IGJvZHkucm9sZSwgcGFzc3dvcmRIYXNoIH0gfSk7XG4gIGF3YWl0IHByaXNtYS5sb2cuY3JlYXRlKHsgZGF0YTogeyBhY3Rpb246IFwiQ1JFQVRFXCIsIGVudGl0eTogXCJVc2VyXCIsIGVudGl0eUlkOiB1LmlkLCBhY3RvckVtYWlsOiBzLnVzZXI/LmVtYWlsID8/IHVuZGVmaW5lZCB9IH0pO1xuICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0pO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgcyA9IGF3YWl0IGd1YXJkKCk7XG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICBsZXQgZGF0YTogYW55ID0geyBlbWFpbDogYm9keS5lbWFpbCwgbmFtZTogYm9keS5uYW1lLCByb2xlOiBib2R5LnJvbGUgfTtcbiAgaWYgKGJvZHkucGFzc3dvcmQgJiYgYm9keS5wYXNzd29yZC5sZW5ndGggPiAwKSB7XG4gICAgZGF0YS5wYXNzd29yZEhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCAxMCk7XG4gIH1cbiAgY29uc3QgdSA9IGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7IHdoZXJlOiB7IGlkOiBib2R5LmlkIH0sIGRhdGEgfSk7XG4gIGF3YWl0IHByaXNtYS5sb2cuY3JlYXRlKHsgZGF0YTogeyBhY3Rpb246IFwiVVBEQVRFXCIsIGVudGl0eTogXCJVc2VyXCIsIGVudGl0eUlkOiB1LmlkLCBhY3RvckVtYWlsOiBzLnVzZXI/LmVtYWlsID8/IHVuZGVmaW5lZCwgZGV0YWlsczogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbDogYm9keS5lbWFpbCwgbmFtZTogYm9keS5uYW1lLCByb2xlOiBib2R5LnJvbGUsIHB3OiAhIWJvZHkucGFzc3dvcmQgfSkgfSB9KTtcbiAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBvazogdHJ1ZSB9KTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCBzID0gYXdhaXQgZ3VhcmQoKTtcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxLnVybCk7XG4gIGNvbnN0IGlkID0gc2VhcmNoUGFyYW1zLmdldChcImlkXCIpITtcbiAgYXdhaXQgcHJpc21hLnVzZXIuZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KTtcbiAgYXdhaXQgcHJpc21hLmxvZy5jcmVhdGUoeyBkYXRhOiB7IGFjdGlvbjogXCJERUxFVEVcIiwgZW50aXR5OiBcIlVzZXJcIiwgZW50aXR5SWQ6IGlkLCBhY3RvckVtYWlsOiBzLnVzZXI/LmVtYWlsID8/IHVuZGVmaW5lZCB9IH0pO1xuICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0pO1xufSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJiY3J5cHQiLCJndWFyZCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsIkVycm9yIiwiR0VUIiwidXNlcnMiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJSZXNwb25zZSIsImpzb24iLCJtYXAiLCJ1IiwiaWQiLCJlbWFpbCIsIm5hbWUiLCJQT1NUIiwicmVxIiwicyIsImJvZHkiLCJwYXNzd29yZEhhc2giLCJoYXNoIiwicGFzc3dvcmQiLCJjcmVhdGUiLCJkYXRhIiwibG9nIiwiYWN0aW9uIiwiZW50aXR5IiwiZW50aXR5SWQiLCJhY3RvckVtYWlsIiwidW5kZWZpbmVkIiwib2siLCJQQVRDSCIsImxlbmd0aCIsInVwZGF0ZSIsIndoZXJlIiwiZGV0YWlscyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdyIsIkRFTEVURSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImdldCIsImRlbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/users/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                if (!ok) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/sign-in\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzQztBQUM0QjtBQUVwQztBQUV2QixNQUFNRyxjQUErQjtJQUMxQ0MsV0FBVztRQUNUSCwyRUFBbUJBLENBQUM7WUFDbEJJLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsWUFBWUksUUFBUSxFQUFFLE9BQU87Z0JBQ3pELE1BQU1FLE9BQU8sTUFBTVosK0NBQU1BLENBQUNZLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUFFQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUFFO2dCQUNoRixJQUFJLENBQUNLLE1BQU0sT0FBTztnQkFDbEIsTUFBTUcsS0FBSyxNQUFNYix1REFBYyxDQUFDSSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtLLFlBQVk7Z0JBQ3ZFLElBQUksQ0FBQ0YsSUFBSSxPQUFPO2dCQUNoQixPQUFPO29CQUFFRyxJQUFJTixLQUFLTSxFQUFFO29CQUFFWCxPQUFPSyxLQUFLTCxLQUFLO29CQUFFRixNQUFNTyxLQUFLUCxJQUFJO29CQUFFYyxNQUFNUCxLQUFLTyxJQUFJO2dCQUFDO1lBQzVFO1FBQ0Y7S0FDRDtJQUVEQyxTQUFTO1FBQUVDLFVBQVU7SUFBTTtJQUUzQkMsT0FBTztRQUFFQyxRQUFRO0lBQVc7SUFDNUJDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWQsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JjLE1BQU1QLElBQUksR0FBRyxLQUFjQSxJQUFJO1lBQ2pDO1lBQ0EsT0FBT087UUFDVDtRQUNBLE1BQU1OLFNBQVEsRUFBRUEsT0FBTyxFQUFFTSxLQUFLLEVBQUU7WUFDOUIsSUFBSU4sUUFBUVIsSUFBSSxFQUFFO2dCQUNmUSxRQUFRUixJQUFJLENBQVNPLElBQUksR0FBR08sTUFBTVAsSUFBSTtZQUN6QztZQUNBLE9BQU9DO1FBQ1Q7SUFDRjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMsIFVzZXIgYXMgTmV4dEF1dGhVc2VyIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHMucGFzc3dvcmQpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9IH0pO1xuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCk7XG4gICAgICAgIGlmICghb2spIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4geyBpZDogdXNlci5pZCwgZW1haWw6IHVzZXIuZW1haWwsIG5hbWU6IHVzZXIubmFtZSwgcm9sZTogdXNlci5yb2xlIH0gYXMgYW55O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcblxuICBwYWdlczogeyBzaWduSW46IFwiL3NpZ24taW5cIiB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgPSB0b2tlbi5yb2xlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbn07XG4iXSwibmFtZXMiOlsicHJpc21hIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJvayIsImNvbXBhcmUiLCJwYXNzd29yZEhhc2giLCJpZCIsInJvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztLQUFPO0FBQ3hCLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbXCJlcnJvclwiLCBcIndhcm5cIl0sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();