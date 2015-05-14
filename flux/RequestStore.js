var ToolboxDispatcher = require('./ToolboxDispatcher');
var EventEmitter = require('events').EventEmitter;
var ToolboxConstants = require('./ToolboxConstants');
var _ = require('lodash');

var requestData = {
  method: '',
  url: '',
  headers: []
};

function addHeader(name, value) {
  requestData.headers.push({
    name: name,
    value: value
  });
}

function removeHeader(index) {
  requestData.headers.splice(index, 1);
}

function selectMethod(method) {
  requestData.method = method;
}

function sendRequest() {
  console.log('sending request');
}

// Request store
var RequestStore = _.extend({}, EventEmitter.prototype, {
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
      addHeader(action.name, action.value);
      break;
    case ToolboxConstants.REMOVE_HEADER:
      removeHeader(index);
      break;
    case ToolboxConstants.SELECT_METHOD:
      selectMethod(action.method);
      break;
    case ToolboxConstants.SEND_REQUEST:
      sendRequest();
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  RequestStore.emitChange();

  return true;
});

module.exports = RequestStore;
