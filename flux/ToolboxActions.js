var ToolboxDispatcher = require('./ToolboxDispatcher');
var ToolboxConstants = require('./ToolboxConstants');

var ToolboxActions = {

  addHeader: function(name, value) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.ADD_HEADER,
      name: name,
      value: value
    })
  },

  removeHeader: function(index) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.REMOVE_HEADER,
      index: index
    })
  },

  selectMethod: function(method) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.SELECT_METHOD,
      method: method
    })
  },

  sendRequest: function(data) {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.SEND_REQUEST
    })
  },

  hideResponse: function() {
    ToolboxDispatcher.handleAction({
      actionType: ToolboxConstants.HIDE_RESPONSE
    })
  }

};

module.exports = ToolboxActions;
