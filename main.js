/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// import './style.css';\n\nconst shipFactory = length => {\n    return {\n        length,\n        hits:0,\n        hit() {\n            this.hits++\n        },\n        isSunk() {\n            return hits >= length;\n        }\n\n    }\n}\n\nconst ship = shipFactory(2)\n\nconst gameboardFactory = () => {\n    let board = [\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n        [null, null, null, null, null, null, null, null, null, null],\n    ]\n\n    const placeShip = (ship, coordinates) => {\n        for (let coordinate in coordinates) {\n            if (board[coordinates[coordinate][0]][coordinates[coordinate][1]]) return false;\n        }\n        for (let coordinate in coordinates) {\n            board[coordinates[coordinate][0]][coordinates[coordinate][1]] = ship;\n        }\n\n    }\n\n    placeShip(ship, [[0,0],[0,1]])\n    return {board}\n}\n\nlet board = gameboardFactory();\nship.hit()\nconsole.log(board.board)\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;