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
exports.id = "app/api/inventory/bulk-delete/route";
exports.ids = ["app/api/inventory/bulk-delete/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finventory%2Fbulk-delete%2Froute&page=%2Fapi%2Finventory%2Fbulk-delete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finventory%2Fbulk-delete%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finventory%2Fbulk-delete%2Froute&page=%2Fapi%2Finventory%2Fbulk-delete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finventory%2Fbulk-delete%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_inventory_bulk_delete_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/inventory/bulk-delete/route.ts */ \"(rsc)/./app/api/inventory/bulk-delete/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/inventory/bulk-delete/route\",\n        pathname: \"/api/inventory/bulk-delete\",\n        filename: \"route\",\n        bundlePath: \"app/api/inventory/bulk-delete/route\"\n    },\n    resolvedPagePath: \"/Users/nerd/Desktop/AnaneaMadivaru/AM-Inventory/app/api/inventory/bulk-delete/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nerd_Desktop_AnaneaMadivaru_AM_Inventory_app_api_inventory_bulk_delete_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/inventory/bulk-delete/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZpbnZlbnRvcnklMkZidWxrLWRlbGV0ZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGaW52ZW50b3J5JTJGYnVsay1kZWxldGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZpbnZlbnRvcnklMkZidWxrLWRlbGV0ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5lcmQlMkZEZXNrdG9wJTJGQW5hbmVhTWFkaXZhcnUlMkZBTS1JbnZlbnRvcnklMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbmVyZCUyRkRlc2t0b3AlMkZBbmFuZWFNYWRpdmFydSUyRkFNLUludmVudG9yeSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDc0M7QUFDbkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvP2UyNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS9pbnZlbnRvcnkvYnVsay1kZWxldGUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2ludmVudG9yeS9idWxrLWRlbGV0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2ludmVudG9yeS9idWxrLWRlbGV0ZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvaW52ZW50b3J5L2J1bGstZGVsZXRlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL25lcmQvRGVza3RvcC9BbmFuZWFNYWRpdmFydS9BTS1JbnZlbnRvcnkvYXBwL2FwaS9pbnZlbnRvcnkvYnVsay1kZWxldGUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2ludmVudG9yeS9idWxrLWRlbGV0ZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finventory%2Fbulk-delete%2Froute&page=%2Fapi%2Finventory%2Fbulk-delete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finventory%2Fbulk-delete%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/inventory/bulk-delete/route.ts":
/*!************************************************!*\
  !*** ./app/api/inventory/bulk-delete/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\nconst runtime = \"nodejs\";\nconst dynamic = \"force-dynamic\";\n\n\n\nfunction json(data, status = 200) {\n    return new Response(JSON.stringify(data), {\n        status,\n        headers: {\n            \"content-type\": \"application/json\"\n        }\n    });\n}\nfunction jsonError(msg, status = 400) {\n    return json({\n        error: msg\n    }, status);\n}\nasync function requireUser() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    const role = session?.user?.role;\n    if (!session || !role) return null;\n    return {\n        email: session.user?.email ?? \"system@local\",\n        role\n    };\n}\n// POST { ids: string[] }\nasync function POST(req) {\n    const user = await requireUser();\n    if (!user) return jsonError(\"Unauthorized\", 401);\n    const body = await req.json().catch(()=>null);\n    if (!body || !Array.isArray(body.ids) || body.ids.length === 0) return jsonError(\"ids[] is required\", 400);\n    const ids = body.ids;\n    try {\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.$transaction(async (tx)=>{\n            // remove custom values first (if your FK uses different name, adjust here)\n            await tx.customValue.deleteMany({\n                where: {\n                    assetId: {\n                        in: ids\n                    }\n                }\n            }).catch(()=>{});\n            // delete assets\n            await tx.asset.deleteMany({\n                where: {\n                    id: {\n                        in: ids\n                    }\n                }\n            });\n            // logs (one bulk + individual entries)\n            const rows = ids.map((id)=>({\n                    action: \"DELETE\",\n                    entity: \"Asset\",\n                    entityId: id,\n                    actorEmail: user.email,\n                    details: null\n                }));\n            if (rows.length) await tx.log.createMany({\n                data: rows\n            });\n            await tx.log.create({\n                data: {\n                    action: \"BULK_DELETE\",\n                    entity: \"Asset\",\n                    entityId: \"bulk\",\n                    actorEmail: user.email,\n                    details: `deleted=${ids.length}`\n                }\n            });\n        }, {\n            timeout: 20000,\n            maxWait: 5000\n        });\n        return json({\n            ok: true,\n            deleted: ids.length\n        });\n    } catch (e) {\n        return jsonError(e?.message ?? \"Failed to delete assets\", 500);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ludmVudG9yeS9idWxrLWRlbGV0ZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQU8sTUFBTUEsVUFBVSxTQUFTO0FBQ3pCLE1BQU1DLFVBQVUsZ0JBQWdCO0FBRUQ7QUFDTztBQUNKO0FBRXpDLFNBQVNJLEtBQUtDLElBQVMsRUFBRUMsU0FBUyxHQUFHO0lBQ2pDLE9BQU8sSUFBSUMsU0FBU0MsS0FBS0MsU0FBUyxDQUFDSixPQUFPO1FBQUVDO1FBQVFJLFNBQVM7WUFBRSxnQkFBZ0I7UUFBbUI7SUFBRTtBQUN4RztBQUNBLFNBQVNDLFVBQVVDLEdBQVcsRUFBRU4sU0FBUyxHQUFHO0lBQ3hDLE9BQU9GLEtBQUs7UUFBRVMsT0FBT0Q7SUFBSSxHQUFHTjtBQUNoQztBQUVBLGVBQWVRO0lBQ1gsTUFBTUMsVUFBVSxNQUFNYiwyREFBZ0JBLENBQUNDLGtEQUFXQTtJQUNsRCxNQUFNYSxPQUFRRCxTQUFTRSxNQUFjRDtJQUNyQyxJQUFJLENBQUNELFdBQVcsQ0FBQ0MsTUFBTSxPQUFPO0lBQzlCLE9BQU87UUFBRUUsT0FBT0gsUUFBUUUsSUFBSSxFQUFFQyxTQUFTO1FBQWdCRjtJQUFLO0FBQ2hFO0FBRUEseUJBQXlCO0FBQ2xCLGVBQWVHLEtBQUtDLEdBQVk7SUFDbkMsTUFBTUgsT0FBTyxNQUFNSDtJQUNuQixJQUFJLENBQUNHLE1BQU0sT0FBT04sVUFBVSxnQkFBZ0I7SUFFNUMsTUFBTVUsT0FBTyxNQUFNRCxJQUFJaEIsSUFBSSxHQUFHa0IsS0FBSyxDQUFDLElBQU07SUFDMUMsSUFBSSxDQUFDRCxRQUFRLENBQUNFLE1BQU1DLE9BQU8sQ0FBQ0gsS0FBS0ksR0FBRyxLQUFLSixLQUFLSSxHQUFHLENBQUNDLE1BQU0sS0FBSyxHQUFHLE9BQU9mLFVBQVUscUJBQXFCO0lBRXRHLE1BQU1jLE1BQWdCSixLQUFLSSxHQUFHO0lBRTlCLElBQUk7UUFDQSxNQUFNeEIsK0NBQU1BLENBQUMwQixZQUFZLENBQUMsT0FBT0M7WUFDN0IsMkVBQTJFO1lBQzNFLE1BQU1BLEdBQUdDLFdBQVcsQ0FBQ0MsVUFBVSxDQUFDO2dCQUFFQyxPQUFPO29CQUFFQyxTQUFTO3dCQUFFQyxJQUFJUjtvQkFBSTtnQkFBRTtZQUFFLEdBQUdILEtBQUssQ0FBQyxLQUFRO1lBRW5GLGdCQUFnQjtZQUNoQixNQUFNTSxHQUFHTSxLQUFLLENBQUNKLFVBQVUsQ0FBQztnQkFBRUMsT0FBTztvQkFBRUksSUFBSTt3QkFBRUYsSUFBSVI7b0JBQUk7Z0JBQUU7WUFBRTtZQUV2RCx1Q0FBdUM7WUFDdkMsTUFBTVcsT0FBT1gsSUFBSVksR0FBRyxDQUFDLENBQUNGLEtBQVE7b0JBQzFCRyxRQUFRO29CQUNSQyxRQUFRO29CQUNSQyxVQUFVTDtvQkFDVk0sWUFBWXhCLEtBQUtDLEtBQUs7b0JBQ3RCd0IsU0FBUztnQkFDYjtZQUNBLElBQUlOLEtBQUtWLE1BQU0sRUFBRSxNQUFNRSxHQUFHZSxHQUFHLENBQUNDLFVBQVUsQ0FBQztnQkFBRXZDLE1BQU0rQjtZQUFLO1lBRXRELE1BQU1SLEdBQUdlLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDO2dCQUNoQnhDLE1BQU07b0JBQ0ZpQyxRQUFRO29CQUNSQyxRQUFRO29CQUNSQyxVQUFVO29CQUNWQyxZQUFZeEIsS0FBS0MsS0FBSztvQkFDdEJ3QixTQUFTLENBQUMsUUFBUSxFQUFFakIsSUFBSUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDO1lBQ0o7UUFDSixHQUFHO1lBQUVvQixTQUFTO1lBQU9DLFNBQVM7UUFBSztRQUVuQyxPQUFPM0MsS0FBSztZQUFFNEMsSUFBSTtZQUFNQyxTQUFTeEIsSUFBSUMsTUFBTTtRQUFDO0lBQ2hELEVBQUUsT0FBT3dCLEdBQVE7UUFDYixPQUFPdkMsVUFBVXVDLEdBQUdDLFdBQVcsMkJBQTJCO0lBQzlEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbS1pbnZlbnRvcnkvLi9hcHAvYXBpL2ludmVudG9yeS9idWxrLWRlbGV0ZS9yb3V0ZS50cz84ZTU5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBydW50aW1lID0gXCJub2RlanNcIjtcbmV4cG9ydCBjb25zdCBkeW5hbWljID0gXCJmb3JjZS1keW5hbWljXCI7XG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5cbmZ1bmN0aW9uIGpzb24oZGF0YTogYW55LCBzdGF0dXMgPSAyMDApIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IHN0YXR1cywgaGVhZGVyczogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9IH0pO1xufVxuZnVuY3Rpb24ganNvbkVycm9yKG1zZzogc3RyaW5nLCBzdGF0dXMgPSA0MDApIHtcbiAgICByZXR1cm4ganNvbih7IGVycm9yOiBtc2cgfSwgc3RhdHVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWlyZVVzZXIoKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIGNvbnN0IHJvbGUgPSAoc2Vzc2lvbj8udXNlciBhcyBhbnkpPy5yb2xlIGFzIFwiQURNSU5cIiB8IFwiVEVDSFwiIHwgdW5kZWZpbmVkO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhcm9sZSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHsgZW1haWw6IHNlc3Npb24udXNlcj8uZW1haWwgPz8gXCJzeXN0ZW1AbG9jYWxcIiwgcm9sZSB9O1xufVxuXG4vLyBQT1NUIHsgaWRzOiBzdHJpbmdbXSB9XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVVzZXIoKTtcbiAgICBpZiAoIXVzZXIpIHJldHVybiBqc29uRXJyb3IoXCJVbmF1dGhvcml6ZWRcIiwgNDAxKTtcblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpLmNhdGNoKCgpID0+IG51bGwpO1xuICAgIGlmICghYm9keSB8fCAhQXJyYXkuaXNBcnJheShib2R5LmlkcykgfHwgYm9keS5pZHMubGVuZ3RoID09PSAwKSByZXR1cm4ganNvbkVycm9yKFwiaWRzW10gaXMgcmVxdWlyZWRcIiwgNDAwKTtcblxuICAgIGNvbnN0IGlkczogc3RyaW5nW10gPSBib2R5LmlkcztcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICAvLyByZW1vdmUgY3VzdG9tIHZhbHVlcyBmaXJzdCAoaWYgeW91ciBGSyB1c2VzIGRpZmZlcmVudCBuYW1lLCBhZGp1c3QgaGVyZSlcbiAgICAgICAgICAgIGF3YWl0IHR4LmN1c3RvbVZhbHVlLmRlbGV0ZU1hbnkoeyB3aGVyZTogeyBhc3NldElkOiB7IGluOiBpZHMgfSB9IH0pLmNhdGNoKCgpID0+IHsgfSk7XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBhc3NldHNcbiAgICAgICAgICAgIGF3YWl0IHR4LmFzc2V0LmRlbGV0ZU1hbnkoeyB3aGVyZTogeyBpZDogeyBpbjogaWRzIH0gfSB9KTtcblxuICAgICAgICAgICAgLy8gbG9ncyAob25lIGJ1bGsgKyBpbmRpdmlkdWFsIGVudHJpZXMpXG4gICAgICAgICAgICBjb25zdCByb3dzID0gaWRzLm1hcCgoaWQpID0+ICh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgIGVudGl0eTogXCJBc3NldFwiLFxuICAgICAgICAgICAgICAgIGVudGl0eUlkOiBpZCxcbiAgICAgICAgICAgICAgICBhY3RvckVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IG51bGwgYXMgc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCkgYXdhaXQgdHgubG9nLmNyZWF0ZU1hbnkoeyBkYXRhOiByb3dzIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5sb2cuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJCVUxLX0RFTEVURVwiLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6IFwiQXNzZXRcIixcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5SWQ6IFwiYnVsa1wiLFxuICAgICAgICAgICAgICAgICAgICBhY3RvckVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBgZGVsZXRlZD0ke2lkcy5sZW5ndGh9YCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHsgdGltZW91dDogMjAwMDAsIG1heFdhaXQ6IDUwMDAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb24oeyBvazogdHJ1ZSwgZGVsZXRlZDogaWRzLmxlbmd0aCB9KTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGpzb25FcnJvcihlPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGRlbGV0ZSBhc3NldHNcIiwgNTAwKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsicnVudGltZSIsImR5bmFtaWMiLCJwcmlzbWEiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJqc29uIiwiZGF0YSIsInN0YXR1cyIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJqc29uRXJyb3IiLCJtc2ciLCJlcnJvciIsInJlcXVpcmVVc2VyIiwic2Vzc2lvbiIsInJvbGUiLCJ1c2VyIiwiZW1haWwiLCJQT1NUIiwicmVxIiwiYm9keSIsImNhdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwiaWRzIiwibGVuZ3RoIiwiJHRyYW5zYWN0aW9uIiwidHgiLCJjdXN0b21WYWx1ZSIsImRlbGV0ZU1hbnkiLCJ3aGVyZSIsImFzc2V0SWQiLCJpbiIsImFzc2V0IiwiaWQiLCJyb3dzIiwibWFwIiwiYWN0aW9uIiwiZW50aXR5IiwiZW50aXR5SWQiLCJhY3RvckVtYWlsIiwiZGV0YWlscyIsImxvZyIsImNyZWF0ZU1hbnkiLCJjcmVhdGUiLCJ0aW1lb3V0IiwibWF4V2FpdCIsIm9rIiwiZGVsZXRlZCIsImUiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/inventory/bulk-delete/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finventory%2Fbulk-delete%2Froute&page=%2Fapi%2Finventory%2Fbulk-delete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finventory%2Fbulk-delete%2Froute.ts&appDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnerd%2FDesktop%2FAnaneaMadivaru%2FAM-Inventory&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();