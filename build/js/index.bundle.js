webpackJsonp([0],{

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(335);


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Works = __webpack_require__(336);

var _Works2 = _interopRequireDefault(_Works);

var _Header = __webpack_require__(337);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main Script of bmw new x3 series.
 */
var Index = function () {
  function Index() {
    _classCallCheck(this, Index);

    new _Works2.default();
    new _Header2.default();
  }

  /**
   * �f�o�C�X���_�C���N�g
   */


  _createClass(Index, [{
    key: 'redirect',
    value: function redirect() {
      var userAgent = navigator.userAgent.toLowerCase();
      var isMobile = userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipod') !== -1 || userAgent.indexOf('android') !== -1 && userAgent.indexOf('mobile') !== -1;

      if (isMobile) {
        location.href = location.pathname + 'sp/' + location.search + location.hash;
      }
    }
  }]);

  return Index;
}();

window.INDEX = new Index();

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(90);

var _jquery2 = _interopRequireDefault(_jquery);

var _velocityAnimate = __webpack_require__(125);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _events2 = __webpack_require__(126);

var _events3 = _interopRequireDefault(_events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IMAGE_PATH = '/img/thumb/';

/**
 * Work��UI�N���X
 */

var Work = function (_events) {
  _inherits(Work, _events);

  function Work(selector) {
    _classCallCheck(this, Work);

    var _this = _possibleConstructorReturn(this, (Work.__proto__ || Object.getPrototypeOf(Work)).call(this));

    _this.$ = (0, _jquery2.default)('.works');
    _this.$work = _this.$.find('a');

    _this.$detail = (0, _jquery2.default)('.workDetail');
    _this.$title = _this.$detail.find('h3');
    _this.$description = _this.$detail.find('h4');
    _this.$img = _this.$detail.find('img');

    _this.$back = _this.$detail.find('.workDetail--back');
    _this.$prev = _this.$detail.find('.workDetail--box__prev');
    _this.$next = _this.$detail.find('.workDetail--box__next');

    _this.index = 0;
    _this.length = _this.$work.length;
    _this.titles = [];
    _this.descriptions = [];

    _this.loaded = [];

    _this.initialize();
    _this.bind();
    return _this;
  }

  _createClass(Work, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.$work.each(function (index, element) {
        var $element = (0, _jquery2.default)(element);
        _this2.titles.push($element.data('title'));
        _this2.descriptions.push($element.data('description'));
      });

      this.$title.css('opacity', 0);
      this.$description.css('opacity', 0);
      this.$img.css('opacity', 0);
      this.$back.css('opacity', 0);
      this.$prev.css('opacity', 0);
      this.$next.css('opacity', 0);
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this3 = this;

      this.$work.on('click', function (e) {
        e.preventDefault();
        var target = e.currentTarget;
        var index = _this3.$work.index(target);
        _this3.open(index);
      });

      this.$back.on('click', function (e) {
        e.preventDefault();
        _this3.close();
      });

      this.$prev.on('click', function (e) {
        e.preventDefault();
        _this3.prev();
      });

      this.$next.on('click', function (e) {
        e.preventDefault();
        _this3.next();
      });
    }
  }, {
    key: 'open',
    value: function open(index) {
      var _this4 = this;

      this.index = index;

      this.$title.text(this.titles[index]);
      this.$description.text(this.descriptions[index]);

      var src = IMAGE_PATH + '/' + (index + 1) + '.jpg';
      this.$img.attr('src', src);
      this.loaded[index] = true;

      (0, _velocityAnimate2.default)(this.$, 'fadeOut', 1000).then(function () {
        console.log('opened');
        (0, _velocityAnimate2.default)(_this4.$detail, 'stop');
        _this4.$detail.css({
          display: 'block',
          opacity: 1
        });

        (0, _velocityAnimate2.default)(_this4.$img, 'fadeIn', {
          queue: false,
          duration: 1000
        });

        (0, _velocityAnimate2.default)(_this4.$title, 'fadeIn', {
          queue: false,
          duration: 1000,
          delay: 400,
          display: 'inline-block'
        });

        (0, _velocityAnimate2.default)(_this4.$description, 'fadeIn', {
          queue: false,
          duration: 1000,
          delay: 600,
          display: 'inline-block'
        });

        (0, _velocityAnimate2.default)(_this4.$back, 'fadeIn', {
          queue: false,
          duration: 400,
          delay: 1000
        });

        (0, _velocityAnimate2.default)(_this4.$prev, 'fadeIn', {
          queue: false,
          duration: 400,
          delay: 1000
        });

        (0, _velocityAnimate2.default)(_this4.$next, 'fadeIn', {
          queue: false,
          duration: 400,
          delay: 1000
        });

        _this4.loadNeighbor();
      });
    }
  }, {
    key: 'close',
    value: function close() {
      var _this5 = this;

      (0, _velocityAnimate2.default)(this.$detail, 'fadeOut', 1000).then(function () {
        _this5.$title.css('opacity', 0);
        _this5.$description.css('opacity', 0);
        _this5.$img.css('opacity', 0);
        _this5.$back.css('opacity', 0);
        _this5.$prev.css('opacity', 0);
        _this5.$next.css('opacity', 0);

        (0, _velocityAnimate2.default)(_this5.$, 'fadeIn', {
          duration: 1000,
          display: 'grid'
        });
      });
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.length - 1;
      }
      this.jump(this.index);
    }
  }, {
    key: 'next',
    value: function next() {
      this.index++;
      if (this.index >= this.length) {
        this.index = 0;
      }
      this.jump(this.index);
    }
  }, {
    key: 'jump',
    value: function jump(index) {
      var _this6 = this;

      this.index = index;

      (0, _velocityAnimate2.default)(this.$img, 'fadeOut', {
        queue: false,
        duration: 400
      });

      (0, _velocityAnimate2.default)(this.$title, 'fadeOut', {
        queue: false,
        duration: 400
      });

      (0, _velocityAnimate2.default)(this.$description, 'fadeOut', {
        queue: false,
        duration: 400
      }).then(function () {

        _this6.$title.text(_this6.titles[index]);
        _this6.$description.text(_this6.descriptions[index]);

        var src = IMAGE_PATH + '/' + (index + 1) + '.jpg';
        _this6.$img.attr('src', src);

        (0, _velocityAnimate2.default)(_this6.$img, 'fadeIn', {
          queue: false,
          duration: 400
        });

        (0, _velocityAnimate2.default)(_this6.$title, 'fadeIn', {
          queue: false,
          duration: 400,
          delay: 400,
          display: 'inline-block'
        });

        (0, _velocityAnimate2.default)(_this6.$description, 'fadeIn', {
          queue: false,
          duration: 400,
          delay: 600,
          display: 'inline-block'
        });

        _this6.loadNeighbor();
      });
    }
  }, {
    key: 'loadNeighbor',
    value: function loadNeighbor() {
      var next = this.index + 1;
      var prev = this.index - 1;
      if (next === this.length) next = 0;
      if (prev === -1) prev = this.length - 1;

      if (!this.loaded[prev]) {
        var prevImage = new Image();
        prevImage.src = IMAGE_PATH + '/' + (prev + 1) + '.jpg';
      }
      if (!this.loaded[next]) {
        var nextImage = new Image();
        nextImage.src = IMAGE_PATH + '/' + (next + 1) + '.jpg';
      }
    }
  }]);

  return Work;
}(_events3.default);

exports.default = Work;

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(90);

var _jquery2 = _interopRequireDefault(_jquery);

var _events2 = __webpack_require__(126);

var _events3 = _interopRequireDefault(_events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * FEATURE��UI�N���X
 */
var Header = function (_events) {
  _inherits(Header, _events);

  function Header() {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

    _this.$ = (0, _jquery2.default)('.header');
    _this.$a = _this.$.find('.header--list a');

    _this.initialize();
    return _this;
  }

  _createClass(Header, [{
    key: 'initialize',
    value: function initialize() {
      var pathname = location.pathname;

      if (/about/.test(pathname)) this.$a.eq(0).addClass('is-active');
      if (/profiles/.test(pathname)) this.$a.eq(1).addClass('is-active');
      if (/works/.test(pathname)) this.$a.eq(2).addClass('is-active');
      if (/interview/.test(pathname)) this.$a.eq(3).addClass('is-active');
      if (/access/.test(pathname)) this.$a.eq(4).addClass('is-active');
    }
  }]);

  return Header;
}(_events3.default);

exports.default = Header;

/***/ })

},[334]);
//# sourceMappingURL=index.bundle.js.map