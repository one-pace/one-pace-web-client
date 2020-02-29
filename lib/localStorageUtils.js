"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global localStorage */
var LocalStorageUtils = /*#__PURE__*/function () {
  function LocalStorageUtils() {
    _classCallCheck(this, LocalStorageUtils);
  }

  _createClass(LocalStorageUtils, null, [{
    key: "getSidebarToggled",
    value: function getSidebarToggled() {
      var value = localStorage.getItem('sidebarToggled');
      return value === 'true';
    }
  }, {
    key: "setSidebarToggled",
    value: function setSidebarToggled(value) {
      localStorage.setItem('sidebarToggled', value);
    }
  }, {
    key: "getSortField",
    value: function getSortField() {
      return localStorage.getItem('sortField');
    }
  }, {
    key: "setSortField",
    value: function setSortField(value) {
      localStorage.setItem('sortField', value);
    }
  }, {
    key: "getSortAscending",
    value: function getSortAscending() {
      return localStorage.getItem('sortAscending');
    }
  }, {
    key: "setSortAscending",
    value: function setSortAscending(value) {
      localStorage.setItem('sortAscending', value);
    }
  }, {
    key: "getWatchSelectedArcId",
    value: function getWatchSelectedArcId() {
      var value = localStorage.getItem('watchSelectedArcId');

      if (isNaN(value)) {
        return null;
      }

      return value;
    }
  }, {
    key: "setWatchSelectedArcId",
    value: function setWatchSelectedArcId(value) {
      if (isNaN(value)) {
        value = null;
      }

      localStorage.setItem('watchSelectedArcId', value);
    }
  }, {
    key: "getWatchSelectedEpisodeId",
    value: function getWatchSelectedEpisodeId() {
      var value = localStorage.getItem('watchSelectedEpisodeId');

      if (isNaN(value)) {
        return null;
      }

      return value;
    }
  }, {
    key: "setWatchSelectedEpisodeId",
    value: function setWatchSelectedEpisodeId(value) {
      if (isNaN(value)) {
        value = null;
      }

      localStorage.setItem('watchSelectedEpisodeId', value);
    }
  }]);

  return LocalStorageUtils;
}();

exports["default"] = LocalStorageUtils;