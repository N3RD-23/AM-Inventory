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
exports.id = "app/api/admin/designations/route";
exports.ids = ["app/api/admin/designations/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "./action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fdesignations%2Froute&page=%2Fapi%2Fadmin%2Fdesignations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdesignations%2Froute.ts&appDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fdesignations%2Froute&page=%2Fapi%2Fadmin%2Fdesignations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdesignations%2Froute.ts&appDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ananea_Maldives_Downloads_am_inventory_aceternity_v3_app_api_admin_designations_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/designations/route.ts */ \"(rsc)/./app/api/admin/designations/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/designations/route\",\n        pathname: \"/api/admin/designations\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/designations/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ananea Maldives\\\\Downloads\\\\am-inventory-aceternity-v3\\\\app\\\\api\\\\admin\\\\designations\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ananea_Maldives_Downloads_am_inventory_aceternity_v3_app_api_admin_designations_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/designations/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmRlc2lnbmF0aW9ucyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZkZXNpZ25hdGlvbnMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmRlc2lnbmF0aW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhbmFuZWElMjBNYWxkaXZlcyU1Q0Rvd25sb2FkcyU1Q2FtLWludmVudG9yeS1hY2V0ZXJuaXR5LXYzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNhbmFuZWElMjBNYWxkaXZlcyU1Q0Rvd25sb2FkcyU1Q2FtLWludmVudG9yeS1hY2V0ZXJuaXR5LXYzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwRDtBQUN2STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8/ZThjMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxhbmFuZWEgTWFsZGl2ZXNcXFxcRG93bmxvYWRzXFxcXGFtLWludmVudG9yeS1hY2V0ZXJuaXR5LXYzXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcZGVzaWduYXRpb25zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9kZXNpZ25hdGlvbnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9kZXNpZ25hdGlvbnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2Rlc2lnbmF0aW9ucy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFuYW5lYSBNYWxkaXZlc1xcXFxEb3dubG9hZHNcXFxcYW0taW52ZW50b3J5LWFjZXRlcm5pdHktdjNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxkZXNpZ25hdGlvbnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL2Rlc2lnbmF0aW9ucy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fdesignations%2Froute&page=%2Fapi%2Fadmin%2Fdesignations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdesignations%2Froute.ts&appDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/designations/route.ts":
/*!*********************************************!*\
  !*** ./app/api/admin/designations/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\nconst runtime = \"nodejs\";\nconst dynamic = \"force-dynamic\";\n\n\n\nfunction jerr(msg, status = 500) {\n    return new Response(JSON.stringify({\n        error: msg\n    }), {\n        status,\n        headers: {\n            \"content-type\": \"application/json\"\n        }\n    });\n}\nasync function requireAdmin() {\n    const s = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!s || s.user?.role !== \"ADMIN\") return jerr(\"Forbidden\", 403);\n    return s;\n}\nasync function GET() {\n    const g = await requireAdmin();\n    if (g instanceof Response) return g;\n    const list = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.designation.findMany({\n        orderBy: {\n            name: \"asc\"\n        }\n    });\n    return Response.json(list);\n}\nasync function POST(req) {\n    const g = await requireAdmin();\n    if (g instanceof Response) return g;\n    const { name } = await req.json();\n    if (!name?.trim()) return jerr(\"Name is required\", 400);\n    const created = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.designation.create({\n        data: {\n            name: name.trim()\n        }\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"CREATE\",\n            entity: \"Designation\",\n            entityId: created.id,\n            actorEmail: g.user?.email ?? undefined,\n            details: `name=${created.name}`\n        }\n    });\n    return Response.json({\n        ok: true,\n        id: created.id\n    });\n}\nasync function PATCH(req) {\n    const g = await requireAdmin();\n    if (g instanceof Response) return g;\n    const { id, name } = await req.json();\n    if (!id) return jerr(\"id is required\", 400);\n    if (!name?.trim()) return jerr(\"name is required\", 400);\n    const updated = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.designation.update({\n        where: {\n            id\n        },\n        data: {\n            name: name.trim()\n        }\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"UPDATE\",\n            entity: \"Designation\",\n            entityId: updated.id,\n            actorEmail: g.user?.email ?? undefined,\n            details: `name=${updated.name}`\n        }\n    });\n    return Response.json({\n        ok: true\n    });\n}\nasync function DELETE(req) {\n    const g = await requireAdmin();\n    if (g instanceof Response) return g;\n    const id = new URL(req.url).searchParams.get(\"id\");\n    if (!id) return jerr(\"id is required\", 400);\n    // Prevent delete if any staff uses it\n    const inUse = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.staff.count({\n        where: {\n            designationId: id\n        }\n    });\n    if (inUse > 0) return jerr(\"Cannot delete: designation is used by staff\", 400);\n    const d = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.designation.delete({\n        where: {\n            id\n        }\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.log.create({\n        data: {\n            action: \"DELETE\",\n            entity: \"Designation\",\n            entityId: id,\n            actorEmail: g.user?.email ?? undefined,\n            details: `name=${d.name}`\n        }\n    });\n    return Response.json({\n        ok: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2Rlc2lnbmF0aW9ucy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEsVUFBVSxTQUFTO0FBQ3pCLE1BQU1DLFVBQVUsZ0JBQWdCO0FBRUQ7QUFDTztBQUNKO0FBRXpDLFNBQVNJLEtBQUtDLEdBQVcsRUFBRUMsU0FBUyxHQUFHO0lBQ25DLE9BQU8sSUFBSUMsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1FBQUVDLE9BQU9MO0lBQUksSUFBSTtRQUNoREM7UUFDQUssU0FBUztZQUFFLGdCQUFnQjtRQUFtQjtJQUNsRDtBQUNKO0FBQ0EsZUFBZUM7SUFDWCxNQUFNQyxJQUFJLE1BQU1YLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO0lBQzVDLElBQUksQ0FBQ1UsS0FBSyxFQUFHQyxJQUFJLEVBQVVDLFNBQVMsU0FBUyxPQUFPWCxLQUFLLGFBQWE7SUFDdEUsT0FBT1M7QUFDWDtBQUVPLGVBQWVHO0lBQ2xCLE1BQU1DLElBQUksTUFBTUw7SUFBZ0IsSUFBSUssYUFBYVYsVUFBVSxPQUFPVTtJQUNsRSxNQUFNQyxPQUFPLE1BQU1qQiwrQ0FBTUEsQ0FBQ2tCLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDO1FBQUVDLFNBQVM7WUFBRUMsTUFBTTtRQUFNO0lBQUU7SUFDMUUsT0FBT2YsU0FBU2dCLElBQUksQ0FBQ0w7QUFDekI7QUFFTyxlQUFlTSxLQUFLQyxHQUFZO0lBQ25DLE1BQU1SLElBQUksTUFBTUw7SUFBZ0IsSUFBSUssYUFBYVYsVUFBVSxPQUFPVTtJQUNsRSxNQUFNLEVBQUVLLElBQUksRUFBRSxHQUFHLE1BQU1HLElBQUlGLElBQUk7SUFDL0IsSUFBSSxDQUFDRCxNQUFNSSxRQUFRLE9BQU90QixLQUFLLG9CQUFvQjtJQUVuRCxNQUFNdUIsVUFBVSxNQUFNMUIsK0NBQU1BLENBQUNrQixXQUFXLENBQUNTLE1BQU0sQ0FBQztRQUFFQyxNQUFNO1lBQUVQLE1BQU1BLEtBQUtJLElBQUk7UUFBRztJQUFFO0lBQzlFLE1BQU16QiwrQ0FBTUEsQ0FBQzZCLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO1FBQ3BCQyxNQUFNO1lBQUVFLFFBQVE7WUFBVUMsUUFBUTtZQUFlQyxVQUFVTixRQUFRTyxFQUFFO1lBQUVDLFlBQVlsQixFQUFFSCxJQUFJLEVBQUVzQixTQUFTQztZQUFXQyxTQUFTLENBQUMsS0FBSyxFQUFFWCxRQUFRTCxJQUFJLENBQUMsQ0FBQztRQUFDO0lBQ25KO0lBQ0EsT0FBT2YsU0FBU2dCLElBQUksQ0FBQztRQUFFZ0IsSUFBSTtRQUFNTCxJQUFJUCxRQUFRTyxFQUFFO0lBQUM7QUFDcEQ7QUFFTyxlQUFlTSxNQUFNZixHQUFZO0lBQ3BDLE1BQU1SLElBQUksTUFBTUw7SUFBZ0IsSUFBSUssYUFBYVYsVUFBVSxPQUFPVTtJQUNsRSxNQUFNLEVBQUVpQixFQUFFLEVBQUVaLElBQUksRUFBRSxHQUFHLE1BQU1HLElBQUlGLElBQUk7SUFDbkMsSUFBSSxDQUFDVyxJQUFJLE9BQU85QixLQUFLLGtCQUFrQjtJQUN2QyxJQUFJLENBQUNrQixNQUFNSSxRQUFRLE9BQU90QixLQUFLLG9CQUFvQjtJQUVuRCxNQUFNcUMsVUFBVSxNQUFNeEMsK0NBQU1BLENBQUNrQixXQUFXLENBQUN1QixNQUFNLENBQUM7UUFBRUMsT0FBTztZQUFFVDtRQUFHO1FBQUdMLE1BQU07WUFBRVAsTUFBTUEsS0FBS0ksSUFBSTtRQUFHO0lBQUU7SUFDN0YsTUFBTXpCLCtDQUFNQSxDQUFDNkIsR0FBRyxDQUFDRixNQUFNLENBQUM7UUFDcEJDLE1BQU07WUFBRUUsUUFBUTtZQUFVQyxRQUFRO1lBQWVDLFVBQVVRLFFBQVFQLEVBQUU7WUFBRUMsWUFBWWxCLEVBQUVILElBQUksRUFBRXNCLFNBQVNDO1lBQVdDLFNBQVMsQ0FBQyxLQUFLLEVBQUVHLFFBQVFuQixJQUFJLENBQUMsQ0FBQztRQUFDO0lBQ25KO0lBQ0EsT0FBT2YsU0FBU2dCLElBQUksQ0FBQztRQUFFZ0IsSUFBSTtJQUFLO0FBQ3BDO0FBRU8sZUFBZUssT0FBT25CLEdBQVk7SUFDckMsTUFBTVIsSUFBSSxNQUFNTDtJQUFnQixJQUFJSyxhQUFhVixVQUFVLE9BQU9VO0lBQ2xFLE1BQU1pQixLQUFLLElBQUlXLElBQUlwQixJQUFJcUIsR0FBRyxFQUFFQyxZQUFZLENBQUNDLEdBQUcsQ0FBQztJQUM3QyxJQUFJLENBQUNkLElBQUksT0FBTzlCLEtBQUssa0JBQWtCO0lBRXZDLHNDQUFzQztJQUN0QyxNQUFNNkMsUUFBUSxNQUFNaEQsK0NBQU1BLENBQUNpRCxLQUFLLENBQUNDLEtBQUssQ0FBQztRQUFFUixPQUFPO1lBQUVTLGVBQWVsQjtRQUFHO0lBQUU7SUFDdEUsSUFBSWUsUUFBUSxHQUFHLE9BQU83QyxLQUFLLCtDQUErQztJQUUxRSxNQUFNaUQsSUFBSSxNQUFNcEQsK0NBQU1BLENBQUNrQixXQUFXLENBQUNtQyxNQUFNLENBQUM7UUFBRVgsT0FBTztZQUFFVDtRQUFHO0lBQUU7SUFDMUQsTUFBTWpDLCtDQUFNQSxDQUFDNkIsR0FBRyxDQUFDRixNQUFNLENBQUM7UUFDcEJDLE1BQU07WUFBRUUsUUFBUTtZQUFVQyxRQUFRO1lBQWVDLFVBQVVDO1lBQUlDLFlBQVlsQixFQUFFSCxJQUFJLEVBQUVzQixTQUFTQztZQUFXQyxTQUFTLENBQUMsS0FBSyxFQUFFZSxFQUFFL0IsSUFBSSxDQUFDLENBQUM7UUFBQztJQUNySTtJQUNBLE9BQU9mLFNBQVNnQixJQUFJLENBQUM7UUFBRWdCLElBQUk7SUFBSztBQUNwQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FtLWludmVudG9yeS8uL2FwcC9hcGkvYWRtaW4vZGVzaWduYXRpb25zL3JvdXRlLnRzPzRmMzciXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xyXG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiO1xyXG5cclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcblxyXG5mdW5jdGlvbiBqZXJyKG1zZzogc3RyaW5nLCBzdGF0dXMgPSA1MDApIHtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogbXNnIH0pLCB7XHJcbiAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgIH0pO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pbigpIHtcclxuICAgIGNvbnN0IHMgPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuICAgIGlmICghcyB8fCAocy51c2VyIGFzIGFueSk/LnJvbGUgIT09IFwiQURNSU5cIikgcmV0dXJuIGplcnIoXCJGb3JiaWRkZW5cIiwgNDAzKTtcclxuICAgIHJldHVybiBzO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gICAgY29uc3QgZyA9IGF3YWl0IHJlcXVpcmVBZG1pbigpOyBpZiAoZyBpbnN0YW5jZW9mIFJlc3BvbnNlKSByZXR1cm4gZztcclxuICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBwcmlzbWEuZGVzaWduYXRpb24uZmluZE1hbnkoeyBvcmRlckJ5OiB7IG5hbWU6IFwiYXNjXCIgfSB9KTtcclxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKGxpc3QpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcclxuICAgIGNvbnN0IGcgPSBhd2FpdCByZXF1aXJlQWRtaW4oKTsgaWYgKGcgaW5zdGFuY2VvZiBSZXNwb25zZSkgcmV0dXJuIGc7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICBpZiAoIW5hbWU/LnRyaW0oKSkgcmV0dXJuIGplcnIoXCJOYW1lIGlzIHJlcXVpcmVkXCIsIDQwMCk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IHByaXNtYS5kZXNpZ25hdGlvbi5jcmVhdGUoeyBkYXRhOiB7IG5hbWU6IG5hbWUudHJpbSgpIH0gfSk7XHJcbiAgICBhd2FpdCBwcmlzbWEubG9nLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YTogeyBhY3Rpb246IFwiQ1JFQVRFXCIsIGVudGl0eTogXCJEZXNpZ25hdGlvblwiLCBlbnRpdHlJZDogY3JlYXRlZC5pZCwgYWN0b3JFbWFpbDogZy51c2VyPy5lbWFpbCA/PyB1bmRlZmluZWQsIGRldGFpbHM6IGBuYW1lPSR7Y3JlYXRlZC5uYW1lfWAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG9rOiB0cnVlLCBpZDogY3JlYXRlZC5pZCB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcTogUmVxdWVzdCkge1xyXG4gICAgY29uc3QgZyA9IGF3YWl0IHJlcXVpcmVBZG1pbigpOyBpZiAoZyBpbnN0YW5jZW9mIFJlc3BvbnNlKSByZXR1cm4gZztcclxuICAgIGNvbnN0IHsgaWQsIG5hbWUgfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICBpZiAoIWlkKSByZXR1cm4gamVycihcImlkIGlzIHJlcXVpcmVkXCIsIDQwMCk7XHJcbiAgICBpZiAoIW5hbWU/LnRyaW0oKSkgcmV0dXJuIGplcnIoXCJuYW1lIGlzIHJlcXVpcmVkXCIsIDQwMCk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5kZXNpZ25hdGlvbi51cGRhdGUoeyB3aGVyZTogeyBpZCB9LCBkYXRhOiB7IG5hbWU6IG5hbWUudHJpbSgpIH0gfSk7XHJcbiAgICBhd2FpdCBwcmlzbWEubG9nLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YTogeyBhY3Rpb246IFwiVVBEQVRFXCIsIGVudGl0eTogXCJEZXNpZ25hdGlvblwiLCBlbnRpdHlJZDogdXBkYXRlZC5pZCwgYWN0b3JFbWFpbDogZy51c2VyPy5lbWFpbCA/PyB1bmRlZmluZWQsIGRldGFpbHM6IGBuYW1lPSR7dXBkYXRlZC5uYW1lfWAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcTogUmVxdWVzdCkge1xyXG4gICAgY29uc3QgZyA9IGF3YWl0IHJlcXVpcmVBZG1pbigpOyBpZiAoZyBpbnN0YW5jZW9mIFJlc3BvbnNlKSByZXR1cm4gZztcclxuICAgIGNvbnN0IGlkID0gbmV3IFVSTChyZXEudXJsKS5zZWFyY2hQYXJhbXMuZ2V0KFwiaWRcIik7XHJcbiAgICBpZiAoIWlkKSByZXR1cm4gamVycihcImlkIGlzIHJlcXVpcmVkXCIsIDQwMCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBkZWxldGUgaWYgYW55IHN0YWZmIHVzZXMgaXRcclxuICAgIGNvbnN0IGluVXNlID0gYXdhaXQgcHJpc21hLnN0YWZmLmNvdW50KHsgd2hlcmU6IHsgZGVzaWduYXRpb25JZDogaWQgfSB9KTtcclxuICAgIGlmIChpblVzZSA+IDApIHJldHVybiBqZXJyKFwiQ2Fubm90IGRlbGV0ZTogZGVzaWduYXRpb24gaXMgdXNlZCBieSBzdGFmZlwiLCA0MDApO1xyXG5cclxuICAgIGNvbnN0IGQgPSBhd2FpdCBwcmlzbWEuZGVzaWduYXRpb24uZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KTtcclxuICAgIGF3YWl0IHByaXNtYS5sb2cuY3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7IGFjdGlvbjogXCJERUxFVEVcIiwgZW50aXR5OiBcIkRlc2lnbmF0aW9uXCIsIGVudGl0eUlkOiBpZCwgYWN0b3JFbWFpbDogZy51c2VyPy5lbWFpbCA/PyB1bmRlZmluZWQsIGRldGFpbHM6IGBuYW1lPSR7ZC5uYW1lfWAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJydW50aW1lIiwiZHluYW1pYyIsInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsImplcnIiLCJtc2ciLCJzdGF0dXMiLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsImhlYWRlcnMiLCJyZXF1aXJlQWRtaW4iLCJzIiwidXNlciIsInJvbGUiLCJHRVQiLCJnIiwibGlzdCIsImRlc2lnbmF0aW9uIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwibmFtZSIsImpzb24iLCJQT1NUIiwicmVxIiwidHJpbSIsImNyZWF0ZWQiLCJjcmVhdGUiLCJkYXRhIiwibG9nIiwiYWN0aW9uIiwiZW50aXR5IiwiZW50aXR5SWQiLCJpZCIsImFjdG9yRW1haWwiLCJlbWFpbCIsInVuZGVmaW5lZCIsImRldGFpbHMiLCJvayIsIlBBVENIIiwidXBkYXRlZCIsInVwZGF0ZSIsIndoZXJlIiwiREVMRVRFIiwiVVJMIiwidXJsIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwiaW5Vc2UiLCJzdGFmZiIsImNvdW50IiwiZGVzaWduYXRpb25JZCIsImQiLCJkZWxldGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/designations/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fdesignations%2Froute&page=%2Fapi%2Fadmin%2Fdesignations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdesignations%2Froute.ts&appDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cananea%20Maldives%5CDownloads%5Cam-inventory-aceternity-v3&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();