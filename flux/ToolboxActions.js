'use strict';

var ToolboxDispatcher = require('./ToolboxDispatcher');
var ToolboxConstants = require('./ToolboxConstants');

var ToolboxActions = {

  addHeader: function () {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.ADD_HEADER
    });
  },

  removeHeader: function (index) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.REMOVE_HEADER,
      index: index
    });
  },

  changeHeaderName: function (index, name) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.CHANGE_HEADER_NAME,
      index: index,
      name: name
    });
  },

  changeHeaderValue: function (index, value) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.CHANGE_HEADER_VALUE,
      index: index,
      value: value
    });
  },

  changeURL: function (url) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.CHANGE_URL,
      url: url
    });
  },

  changeMethod: function (method) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.CHANGE_METHOD,
      method: method
    });
  },

  sendRequest: function (request) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.SEND_REQUEST,
      request: request
    });
  },

  hideResponse: function () {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.HIDE_RESPONSE
    });
  }

};

module.exports = ToolboxActions;
