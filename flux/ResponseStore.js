'use strict';

var _ = require('lodash');
var reqwest = require('reqwest');
var ToolboxDispatcher = require('./ToolboxDispatcher');
var EventEmitter = require('events').EventEmitter;
var ToolboxConstants = require('./ToolboxConstants');

var response = {
  visible: false,
  status: '',
  headers: [],
  body: ''
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
  }).then(function (response) {
    console.log('request', r.request);
    console.log('status', r.request.status);
    console.log('statusText', r.request.statusText);
    console.log('response', JSON.parse(response));
    console.log('headers', r.request.getAllResponseHeaders());
  }).always(function () {
    response.visible = true;
  });
}

function hideResponse() {
  response.visible = false;
}

module.exports = ResponseStore;
