#! /usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _this = this;

    var types, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queue.typesAsync();

          case 2:
            types = _context2.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 6;
            _loop = _regenerator2.default.mark(function _loop() {
              var type, counts;
              return _regenerator2.default.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      type = _step2.value;
                      _context.next = 3;
                      return _bluebird2.default.all(JOB_STATES.map(function (state) {
                        return queue.cardByTypeAsync(type, state);
                      }));

                    case 3:
                      counts = _context.sent;

                      render(type, counts);

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, _this);
            });
            _iterator2 = (0, _getIterator3.default)(types);

          case 9:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 14;
              break;
            }

            return _context2.delegateYield(_loop(), 't0', 11);

          case 11:
            _iteratorNormalCompletion2 = true;
            _context2.next = 9;
            break;

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t1 = _context2['catch'](6);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 20:
            _context2.prev = 20;
            _context2.prev = 21;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 23:
            _context2.prev = 23;

            if (!_didIteratorError2) {
              _context2.next = 26;
              break;
            }

            throw _iteratorError2;

          case 26:
            return _context2.finish(23);

          case 27:
            return _context2.finish(20);

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this, [[6, 16, 20, 28], [21,, 23, 27]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash.zip');

var _lodash2 = _interopRequireDefault(_lodash);

var _kue = require('kue');

var _yargs = require('yargs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var JOB_STATES = ['active', 'inactive', 'failed', 'complete', 'delayed'];

var prefix = _yargs.argv.p || 'q';
var redis = _yargs.argv.r || 'redis://localhost:6379';

var queue = _bluebird2.default.promisifyAll((0, _kue.createQueue)({ prefix: prefix, redis: redis }));

function render(type, counts) {
  console.log(_chalk2.default.underline(type) + '\n');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _lodash2.default)(JOB_STATES, counts)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          state = _step$value[0],
          count = _step$value[1];

      console.log(_chalk2.default.green(state) + ': ' + count);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log('');
}

main().then(function () {
  process.exit();
}).catch(console.error);
