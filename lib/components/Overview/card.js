"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Card = /*#__PURE__*/function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card(props) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props));
    _this.renderProgressCard = _this.renderProgressCard.bind(_assertThisInitialized(_this));
    _this.state = {
      'arc': props.arc,
      'episode': props.episode
    };
    return _this;
  }

  _createClass(Card, [{
    key: "renderProgressCard",
    value: function renderProgressCard(episode, arc) {
      if (this.props.img) {
        return _react["default"].createElement("div", {
          className: 'progress-card',
          onClick: this.props.onClick
        }, _react["default"].createElement("img", {
          className: 'list-image',
          src: this.props.img
        }));
      } else {
        var containerClassName = "progress-card title ".concat(episode.in_progress ? 'unreleased' : '');
        var episodeTitle = episode.part ? "".concat(arc.title, " ").concat(episode.part.toString().padStart(2, '0')) : episode.title;
        return _react["default"].createElement("div", {
          className: containerClassName,
          onClick: episode.in_progress ? null : this.props.onClick
        }, _react["default"].createElement("div", {
          className: "text"
        }, episodeTitle, episode.in_progress ? ' (TBA)' : ''), episode.title && episode.part && _react["default"].createElement("div", {
          className: "status"
        }, "\u201C", episode.title, "\u201D"), !episode.in_progress && episode.released_date && _react["default"].createElement("div", {
          className: "status"
        }, (0, _moment["default"])(episode.released_date, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY')), episode.chapters && episode.episodes && _react["default"].createElement("div", {
          className: "status"
        }, "Ch. ", episode.chapters, " / Ep. ", episode.episodes), episode.chapters && !episode.episodes && _react["default"].createElement("div", {
          className: "status"
        }, "Chapter ", episode.chapters), !episode.chapters && episode.episodes && _react["default"].createElement("div", {
          className: "status"
        }, "Episode ", episode.episodes));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          episode = _this$state.episode,
          arc = _this$state.arc;
      return this.renderProgressCard(episode, arc);
    }
  }]);

  return Card;
}(_react["default"].Component);

exports["default"] = Card;