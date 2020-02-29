"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _networkHandler = _interopRequireDefault(require("../../networkHandler"));

var _list = _interopRequireDefault(require("./list"));

var _icons = require("@material-ui/icons");

var _core = require("@material-ui/core");

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

var Overview = /*#__PURE__*/function (_React$Component) {
  _inherits(Overview, _React$Component);

  function Overview(props) {
    var _this;

    _classCallCheck(this, Overview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Overview).call(this, props));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.scrollRight = _this.scrollRight.bind(_assertThisInitialized(_this));
    _this.goToEpisode = _this.goToEpisode.bind(_assertThisInitialized(_this));
    _this.state = {
      'arcs': [],
      'episodes': [],
      'name': '',
      'password': '',
      'showScrollArrow': false
    };
    return _this;
  }

  _createClass(Overview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('scroll', this.handleScroll, true);

      _networkHandler["default"].request('/list_progress_episodes.php', null, function (responseJson) {
        _this2.setState({
          'arcs': responseJson.arcs,
          'episodes': responseJson.episodes
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.handleScroll();
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      if (this.container.scrollLeft + this.container.offsetWidth < this.container.scrollWidth) {
        if (!this.state.showScrollArrow) {
          this.setState({
            showScrollArrow: true
          });
        }
      } else {
        if (this.state.showScrollArrow) {
          this.setState({
            showScrollArrow: false
          });
        }
      }
    }
  }, {
    key: "scrollRight",
    value: function scrollRight() {
      this.container.scrollTo({
        left: this.container.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, {
    key: "goToEpisode",
    value: function goToEpisode(episodeId) {
      this.props.history.push("/?episode=".concat(episodeId));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", {
        ref: function ref(_ref) {
          return _this3.container = _ref;
        },
        className: "card progress-container"
      }, this.state.arcs.map(function (i) {
        return _react["default"].createElement(_list["default"], {
          arc: i,
          user: _this3.state.user,
          image: 'assets/arc_' + i.id + '.png',
          cards: _this3.state.episodes.filter(function (j) {
            return j.arc_id === i.id;
          }),
          key: 'arc' + i.id,
          onClickCard: function onClickCard(episode) {
            return _this3.goToEpisode(episode.id);
          }
        });
      }), _react["default"].createElement("div", {
        className: "nav-arrow",
        onClick: this.scrollRight
      }, _react["default"].createElement(_core.Fade, {
        "in": this.state.showScrollArrow
      }, _react["default"].createElement(_icons.ArrowForwardIos, null))));
    }
  }]);

  return Overview;
}(_react["default"].Component);

exports["default"] = Overview;