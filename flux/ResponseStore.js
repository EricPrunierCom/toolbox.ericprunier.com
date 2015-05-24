'use strict';

var _ = require('lodash');
var reqwest = require('reqwest');
var ToolboxDispatcher = require('./ToolboxDispatcher');
var EventEmitter = require('events').EventEmitter;
var ToolboxConstants = require('./ToolboxConstants');

var response = {
  visible: false,
  status: '',
  headers: '',
  body: '',
  error: false
}

// Request store
var ResponseStore = _.extend({}, EventEmitter.prototype, {
  getResponse: function () {
    return response;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register callback with ToolboxDispatcher
ToolboxDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ToolboxConstants.SEND_REQUEST:
      sendRequest(action.request);
      break;
    case ToolboxConstants.HIDE_RESPONSE:
      hideResponse();
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  ResponseStore.emitChange();

  return true;
});

function sendRequest(request) {
  var headers = _.reduce(
    request.headers,
    function (acc, header) {
      if (header.name) {
        acc[header.name] = header.value;
      }
      return acc;
    }, {});

  var r = reqwest({
    url: request.url,
    method: request.method,
    headers: headers,
    crossOrigin: true
  }).then(function (responseBody) {
    response.status = r.request.status + ' ' + (r.request.statusText || '')
    response.headers = r.request.getAllResponseHeaders();
    response.body = typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
    response.error = false;
  }).fail(function (err, msg) {
    response.status = err.status + ' ' + err.statusText;
    response.headers = err.getAllResponseHeaders();
    response.body = err.response || 'Internal server error';
    response.error = true;
  }).always(function () {
    response.visible = true;
    ResponseStore.emitChange();
  });
}

function hideResponse() {
  response.visible = false;
}

module.exports = ResponseStore;
