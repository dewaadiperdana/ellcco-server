"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _LayananService = _interopRequireDefault(require("../services/LayananService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var util = new _Utils["default"]();

var LayananController =
/*#__PURE__*/
function () {
  function LayananController() {
    (0, _classCallCheck2["default"])(this, LayananController);
  }

  (0, _createClass2["default"])(LayananController, null, [{
    key: "getAllLayanan",
    value: function () {
      var _getAllLayanan = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var layanan;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _LayananService["default"].getAllLayanan();

              case 3:
                layanan = _context.sent;

                if (layanan.length > 0) {
                  util.setSuccess(200, 'Layanan ditemukan', layanan);
                } else {
                  util.setSuccess(200, 'Layanan tidak ditemukan');
                }

                return _context.abrupt("return", util.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAllLayanan(_x, _x2) {
        return _getAllLayanan.apply(this, arguments);
      }

      return getAllLayanan;
    }()
  }]);
  return LayananController;
}();

var _default = LayananController;
exports["default"] = _default;
//# sourceMappingURL=LayananController.js.map