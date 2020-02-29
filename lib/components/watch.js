"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _networkHandler = _interopRequireDefault(require("../networkHandler"));

var _localStorageUtils = _interopRequireDefault(require("../localStorageUtils"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Watch = /*#__PURE__*/function (_React$Component) {
  _inherits(Watch, _React$Component);

  function Watch(props) {
    var _this;

    _classCallCheck(this, Watch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Watch).call(this, props));
    _this.videoRef = _react["default"].createRef();
    _this.changeArc = _this.changeArc.bind(_assertThisInitialized(_this));
    _this.changeEpisode = _this.changeEpisode.bind(_assertThisInitialized(_this));
    _this.nav = _this.nav.bind(_assertThisInitialized(_this));
    _this.stopVideo = _this.stopVideo.bind(_assertThisInitialized(_this));
    _this.torrentLink = _this.torrentLink.bind(_assertThisInitialized(_this));
    _this.magnetLink = _this.magnetLink.bind(_assertThisInitialized(_this));
    _this.getEpisodePart = _this.getEpisodePart.bind(_assertThisInitialized(_this));
    _this.state = {
      'selectedArc': null,
      'selectedEpisode': null,
      'episodes': [],
      'arcs': []
    };
    return _this;
  }

  _createClass(Watch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _networkHandler["default"].request('get_streams.php', null, function (response) {
        var arcs = response.arcs,
            episodes = response.episodes;
        var selectedArc = null;
        var selectedEpisode = null;

        var search = _queryString["default"].parse(_this2.props.location.search);

        var selectedEpisodeId = search.episode ? search.episode : _localStorageUtils["default"].getWatchSelectedEpisodeId();

        var selectedArcId = _localStorageUtils["default"].getWatchSelectedArcId();

        if (!isNaN(selectedEpisodeId)) {
          var id = Number.parseInt(selectedEpisodeId);
          selectedEpisode = episodes.find(function (i) {
            return i.id === id;
          });
        } else if (selectedEpisodeId) {
          selectedEpisode = episodes.find(function (i) {
            return i.crc32 === selectedEpisodeId;
          });
        }

        if (!selectedEpisode && selectedArcId) {
          var _arcs$filter = arcs.filter(function (i) {
            return i.id === selectedArcId;
          });

          var _arcs$filter2 = _slicedToArray(_arcs$filter, 1);

          selectedArc = _arcs$filter2[0];
        }

        if (!selectedArc && selectedEpisode) {
          var _arcs$filter3 = arcs.filter(function (i) {
            return i.id === selectedEpisode.arcId;
          });

          var _arcs$filter4 = _slicedToArray(_arcs$filter3, 1);

          selectedArc = _arcs$filter4[0];
        }

        if (!selectedArc && !selectedEpisode) {
          var _arcs = _slicedToArray(arcs, 1);

          selectedArc = _arcs[0];
        }

        if (selectedArc && !selectedEpisode) {
          var _episodes$filter = episodes.filter(function (i) {
            return i.arcId === selectedArc.id;
          });

          var _episodes$filter2 = _slicedToArray(_episodes$filter, 1);

          selectedEpisode = _episodes$filter2[0];
        }

        _localStorageUtils["default"].setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);

        _localStorageUtils["default"].setWatchSelectedArcId(selectedArc ? selectedArc.id : null);

        if (selectedEpisode) {
          _this2.props.history.push({
            search: "?episode=".concat(selectedEpisode.id)
          });
        }

        _this2.setState({
          selectedArc: selectedArc,
          selectedEpisode: selectedEpisode,
          arcs: arcs,
          episodes: episodes
        });
      });
    }
  }, {
    key: "changeArc",
    value: function changeArc(selectedArc) {
      var _this3 = this;

      var selectedEpisode = null;

      if (selectedArc) {
        var _this$state$episodes$ = this.state.episodes.filter(function (i) {
          return i.arcId === selectedArc.id;
        });

        var _this$state$episodes$2 = _slicedToArray(_this$state$episodes$, 1);

        selectedEpisode = _this$state$episodes$2[0];
      }

      _localStorageUtils["default"].setWatchSelectedArcId(selectedArc ? selectedArc.id : null);

      _localStorageUtils["default"].setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);

      this.props.history.push({
        search: "?episode=".concat(selectedEpisode.id)
      });
      this.setState({
        'selectedArc': selectedArc,
        'selectedEpisode': selectedEpisode
      }, function () {
        _this3.videoRef.current.load();
      });
    }
  }, {
    key: "changeEpisode",
    value: function changeEpisode(selectedEpisode) {
      var _this4 = this;

      _localStorageUtils["default"].setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);

      var selectedArc = this.state.selectedArc;

      if (selectedEpisode && selectedArc && selectedEpisode.arcId !== selectedArc.id) {
        var _this$state$arcs$filt = this.state.arcs.filter(function (i) {
          return i.id === selectedEpisode.arcId;
        });

        var _this$state$arcs$filt2 = _slicedToArray(_this$state$arcs$filt, 1);

        selectedArc = _this$state$arcs$filt2[0];

        _localStorageUtils["default"].setWatchSelectedArcId(selectedArc.id);
      }

      this.props.history.push({
        search: "?episode=".concat(selectedEpisode.id)
      });
      this.setState({
        selectedArc: selectedArc,
        selectedEpisode: selectedEpisode
      }, function () {
        _this4.videoRef.current.load();

        _this4.videoRef.current.play();
      });
    }
  }, {
    key: "nav",
    value: function nav(dir) {
      var episodes = this.state.episodes.filter(function (i) {
        return i.isReleased;
      });

      for (var i = 0; i < episodes.length; i++) {
        var episode = episodes[i];

        if (episode.id === this.state.selectedEpisode.id) {
          if (!(dir === 'prev' && i === 0 || dir === 'next' && i >= episodes.length - 1)) {
            var otherEpisode = episodes[dir === 'prev' ? i - 1 : i + 1];
            this.changeEpisode(otherEpisode);
          }

          break;
        }
      }
    }
  }, {
    key: "stopVideo",
    value: function stopVideo() {
      this.videoRef.current.pause();
    }
  }, {
    key: "torrentLink",
    value: function torrentLink(episode) {
      var _this5 = this;

      var torrentHash = episode['torrent_hash'];
      return _react["default"].createElement("a", {
        className: "torrent-link",
        href: "http://api.onepace.net/download/torrent.php?hash=".concat(torrentHash),
        onClick: function onClick() {
          return _this5.stopVideo();
        }
      }, _react["default"].createElement("i", {
        className: "fas fa-file-download"
      }));
    }
  }, {
    key: "magnetLink",
    value: function magnetLink(episode) {
      var _this6 = this;

      var torrentHash = episode['torrent_hash'];
      return _react["default"].createElement("a", {
        className: "torrent-link",
        href: "http://api.onepace.net/download/magnet.php?hash=".concat(torrentHash),
        onClick: function onClick() {
          return _this6.stopVideo();
        }
      }, _react["default"].createElement("i", {
        className: "fas fa-magnet"
      }));
    }
  }, {
    key: "getEpisodePart",
    value: function getEpisodePart(episodePart) {
      return episodePart ? "00".concat(episodePart.toString()).slice(-2) : '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$state = this.state,
          selectedArc = _this$state.selectedArc,
          selectedEpisode = _this$state.selectedEpisode,
          arcs = _this$state.arcs,
          episodes = _this$state.episodes;
      return _react["default"].createElement("div", {
        className: "watch"
      }, _react["default"].createElement("div", {
        className: "watch-top"
      }, _react["default"].createElement("center", null, _react["default"].createElement("select", {
        className: "arcs",
        value: selectedArc ? selectedArc.id : 0,
        onChange: function onChange(e) {
          var arcId = Number.parseInt(e.target.value);

          var _arcs$filter5 = arcs.filter(function (i) {
            return i.id === arcId;
          }),
              _arcs$filter6 = _slicedToArray(_arcs$filter5, 1),
              arc = _arcs$filter6[0];

          _this7.changeArc(arc);
        }
      }, arcs.map(function (arc) {
        var title = arc.chapters ? '(Chapter ' + arc.chapters + ')' : '';
        title += (arc.title ? ' ' + arc.title : ' Untitled') + (arc.chapters ? ' Arc' : '');
        title += arc.released ? '' : ' (Unreleased)';
        return _react["default"].createElement("option", {
          disabled: !arc.released,
          key: 'arc' + arc.id,
          value: arc.id
        }, title);
      })), _react["default"].createElement("select", {
        className: "episodes",
        value: selectedEpisode ? selectedEpisode.id : 0,
        onChange: function onChange(e) {
          var episodeId = Number.parseInt(e.target.value);

          var _episodes$filter3 = episodes.filter(function (i) {
            return i.id === episodeId;
          }),
              _episodes$filter4 = _slicedToArray(_episodes$filter3, 1),
              episode = _episodes$filter4[0];

          _this7.changeEpisode(episode);
        }
      }, episodes.length > 0 && selectedArc && episodes.filter(function (i) {
        return i.arcId === selectedArc.id;
      }).map(function (episode) {
        var title = 'Unknown episode';

        if (episode.part) {
          title = "".concat(selectedArc.title, " ").concat(_this7.getEpisodePart(episode.part));
        } else if (episode.chapters) {
          title = "Chapter ".concat(episode.chapters);
        } else if (episode.title) {
          title = episode.title;
        }

        title += (episode.part || episode.chapters) && episode.title ? ": ".concat(episode.title) : '';
        title += !episode.isReleased ? ' (In progress)' : '';
        return _react["default"].createElement("option", {
          disabled: !episode.isReleased,
          key: 'episode' + episode.id,
          value: episode.id
        }, title);
      })), _react["default"].createElement("span", {
        className: "ep-nav",
        onClick: function onClick() {
          return _this7.nav('prev');
        }
      }, "\xA0 \xAB \xA0"), _react["default"].createElement("span", {
        className: "ep-nav",
        onClick: function onClick() {
          return _this7.nav('next');
        }
      }, "\xA0 \xBB \xA0"), selectedEpisode && selectedEpisode.torrent_hash ? this.torrentLink(selectedEpisode) : selectedArc && selectedArc.torrent_hash && this.torrentLink(selectedArc), selectedEpisode && selectedEpisode.torrent_hash ? this.magnetLink(selectedEpisode) : selectedArc && selectedArc.torrent_hash && this.magnetLink(selectedArc), selectedEpisode && selectedEpisode.released_date && _react["default"].createElement("span", {
        style: {
          marginLeft: 20
        }
      }, "Released: ", selectedEpisode.released_date), selectedEpisode && selectedEpisode.chapters && _react["default"].createElement("span", {
        style: {
          marginLeft: 20
        }
      }, "Chapters: ", selectedEpisode.chapters), selectedEpisode && selectedEpisode.episodes && _react["default"].createElement("span", {
        style: {
          marginLeft: 20
        }
      }, "Episodes: ", selectedEpisode.episodes))), _react["default"].createElement("div", {
        className: "video-container"
      }, _react["default"].createElement("video", {
        ref: this.videoRef,
        className: "video-player",
        controls: true,
        poster: require('../images/logo-poster.png')
      }, selectedEpisode && _react["default"].createElement("source", {
        type: "video/mp4",
        src: '/streams/' + selectedEpisode.crc32 + '.mp4'
      }))));
    }
  }]);

  return Watch;
}(_react["default"].Component);

exports["default"] = Watch;