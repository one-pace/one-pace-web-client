"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _card = _interopRequireDefault(require("./card"));

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

var List = /*#__PURE__*/function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          arc = _this$props.arc,
          image = _this$props.image,
          cards = _this$props.cards,
          user = _this$props.user,
          onClickCard = _this$props.onClickCard;
      var released = arc.released,
          title = arc.title,
          episodes = arc.episodes,
          chapters = arc.chapters;
      return _react["default"].createElement("div", {
        className: "list"
      }, _react["default"].createElement("div", {
        className: 'header' + (!released ? ' unreleased' : '')
      }, _react["default"].createElement("div", null, title), _react["default"].createElement("div", {
        style: {
          color: released ? 'rgb(100,100,100)' : 'rgb(200,200,200)',
          fontWeight: 'normal',
          fontSize: 12
        }
      }, !released && _react["default"].createElement("div", {
        style: {
          fontStyle: 'italic'
        }
      }, "Unreleased"), chapters && _react["default"].createElement("div", null, "Chapters: ", chapters), episodes && _react["default"].createElement("div", null, "Episodes: ", episodes))), _react["default"].createElement("div", {
        className: 'cards' + (!released ? ' unreleased' : '')
      }, _react["default"].createElement(_card["default"], {
        img: image
      }), cards.map(function (episode) {
        return _react["default"].createElement(_card["default"], {
          user: user,
          onView: function onView() {
            return onClickCard(episode);
          },
          key: episode.id,
          episode: episode,
          arc: arc,
          onClick: function onClick() {
            return onClickCard(episode);
          }
        });
      })));
    }
  }]);

  return List;
}(_react["default"].Component);

exports["default"] = List;