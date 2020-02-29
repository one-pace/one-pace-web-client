"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

require("babel-polyfill");

var _watch = _interopRequireDefault(require("./watch"));

var _about = _interopRequireDefault(require("./about"));

var _layout = _interopRequireDefault(require("./layout"));

var _Overview = require("./Overview");

require("../index.scss");

require("../index.html");

require("../images/favicon.ico");

require("typeface-roboto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require.context('../images', false, /arc_\d+\.png$/);

_reactDom["default"].render(_react["default"].createElement(_reactRouterDom.BrowserRouter, null, _react["default"].createElement(_reactRouterDom.Route, {
  render: function render() {
    return _react["default"].createElement(_layout["default"], null, _react["default"].createElement(_reactRouterDom.Route, {
      exact: true,
      path: "/",
      component: _watch["default"]
    }), _react["default"].createElement(_reactRouterDom.Route, {
      name: "about",
      path: "/about",
      component: _about["default"]
    }), _react["default"].createElement(_reactRouterDom.Route, {
      name: "overview",
      path: "/overview",
      component: _Overview.Overview
    }));
  }
})), document.getElementById('reactentry'));