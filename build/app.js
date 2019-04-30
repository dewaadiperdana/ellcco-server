"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/esm/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _LayananRoutes = _interopRequireDefault(require("./server/routes/LayananRoutes"));

_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
app.use('/api/layanan', _LayananRoutes["default"]);
app.get('/', function (req, res) {
  res.send('eLconics is comming to help you.');
});
app.listen(PORT, function () {
  return console.log("Server running on port: ".concat(PORT));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map