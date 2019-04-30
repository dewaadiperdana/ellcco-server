"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _LayananController = _interopRequireDefault(require("../controller/LayananController"));

var router = (0, _express.Router)();
router.get('/', _LayananController["default"].getAllLayanan);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=LayananRoutes.js.map