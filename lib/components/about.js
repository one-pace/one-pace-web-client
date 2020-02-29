"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var About = /*#__PURE__*/function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, _getPrototypeOf(About).apply(this, arguments));
  }

  _createClass(About, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.title = 'One Pace | About';
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "about with-padding"
      }, _react["default"].createElement("h2", null, "What is One Pace?"), _react["default"].createElement("p", null, "One Pace is a team effort that started in March 2013 with the goal of matching the One Piece manga more accurately than Toei's anime adaptation. We cut out filler scenes, non-canon reaction shots, padded sequences, and re-order scenes to stay truer to Goda's manga."), _react["default"].createElement("h2", null, "The Team"), _react["default"].createElement("table", null, _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Galaxy 9000"), _react["default"].createElement("td", null, "Editing")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Sewil"), _react["default"].createElement("td", null, "Editing")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Feeso"), _react["default"].createElement("td", null, "Editing, QC")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Halee"), _react["default"].createElement("td", null, "Music Master")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Datenshi"), _react["default"].createElement("td", null, "Timing")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Grug"), _react["default"].createElement("td", null, "QC")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Pepperjack"), _react["default"].createElement("td", null, "QC")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        width: "50%"
      }, "Kaitou Yahiko"), _react["default"].createElement("td", null, "Karaoke Effects")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Rael"), _react["default"].createElement("td", null, "Editing")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Lance"), _react["default"].createElement("td", null, "Timing")))));
    }
  }]);

  return About;
}(_react["default"].Component);

exports["default"] = About;