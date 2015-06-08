'use strict';

var _ = require('lodash');
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
    case ToolboxConstants.RESPONSE_RECEIVED:
      response = action.response;
      response.visible = true;
      break;
    case ToolboxConstants.HIDE_RESPONSE:
      response.visible = false;
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  ResponseStore.emitChange();

  return true;
});

module.exports = ResponseStore;
