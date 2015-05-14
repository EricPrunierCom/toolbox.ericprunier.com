var Dispatcher = require('flux').Dispatcher;

var ToolboxDispatcher = new Dispatcher();

// Method to handle dispatch requests from views
ToolboxDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;
