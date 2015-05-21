'use strict';

var ToolboxDispatcher = require('./ToolboxDispatcher');
var EventEmitter = require('events').EventEmitter;
var ToolboxConstants = require('./ToolboxConstants');
var _ = require('lodash');

var request = {
  method: 'GET',
  url: '',
  headers: [{
    name: '',
    value: ''
  }]
};

// Request store
var RequestStore = _.extend({}, EventEmitter.prototype, {
  getRequest: function() {
    return request;
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
    case ToolboxConstants.ADD_HEADER:
      addHeader();
      break;
    case ToolboxConstants.REMOVE_HEADER:
      removeHeader(action.index);
      break;
    case ToolboxConstants.CHANGE_HEADER_NAME:
      changeHeaderName(action.index, action.name);
      break;
    case ToolboxConstants.CHANGE_HEADER_VALUE:
      changeHeaderValue(action.index, action.value);
      break;
    case ToolboxConstants.CHANGE_URL:
      changeURL(action.url);
      break;
    case ToolboxConstants.CHANGE_METHOD:
      changeMethod(action.method);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  RequestStore.emitChange();

  return true;
});

function addHeader() {
  console.log('addHeader');
  request.headers.push({
    name: '',
    value: ''
  });
}

function removeHeader(index) {
  request.headers.splice(index, 1);
}

function changeHeaderName(index, name) {
  request.headers[index].name = name;
}

function changeHeaderValue(index, value) {
  request.headers[index].value = value;
}

function changeURL(url) {
  request.url = url;
}

function changeMethod(method) {
  request.method = method;
}

module.exports = RequestStore;
