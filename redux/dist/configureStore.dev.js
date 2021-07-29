"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureStore = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _campsites = require("./campsites");

var _comments = require("./comments");

var _promotions = require("./promotions");

var _partners = require("./partners");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConfigureStore = function ConfigureStore() {
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    campsites: _campsites.campsites,
    comments: _comments.comments,
    partners: _partners.partners,
    promotions: _promotions.promotions
  }), (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxLogger["default"]));
  return store;
};

exports.ConfigureStore = ConfigureStore;