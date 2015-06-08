'use strict';

var _ = require('lodash');
var Promise = require("bluebird");
var reqwest = require('reqwest');
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
    sendRequest(request).then(function (response) {
      ToolboxDispatcher.handleAction({
        actionType: ToolboxConstants.RESPONSE_RECEIVED,
        response: response
      });
    })
  },

  hideResponse: function () {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.HIDE_RESPONSE
    });
  }

};

/**
 * Send request.
 * @param  {object}  request request
 * @return {promise} response
 */
function sendRequest(request) {
  var response = new Promise(function (resolve, reject) {
    var headers = _.reduce(request.headers, addHeader, {});

    var r = reqwest({
      url: request.url,
      method: request.method,
      headers: headers,
      crossOrigin: true
    }).then(function (responseBody) {
      resolve({
        status: r.request.status + ' ' + (r.request.statusText || ''),
        headers: r.request.getAllResponseHeaders(),
        body: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody),
        error: false
      });
    }).fail(function (err, msg) {
      resolve({
        status: err.status + ' ' + err.statusText,
        headers: err.getAllResponseHeaders(),
        body: err.response || 'Internal error',
        error: true
      });
    });
  });

  return response;
}

/**
 * Add header to headers.
 * @param {Object} headers headers map
 * @param {object} header  header
 */
function addHeader(headers, header) {
  if (header.name) {
    headers[header.name] = header.value;
  }

  return headers;
}

module.exports = ToolboxActions;
