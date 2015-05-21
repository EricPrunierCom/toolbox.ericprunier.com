'use strict';

var React = require('react');
var Request = require('./Request.react');
var Response = require('./Response.react');
var RequestStore = require('../flux/RequestStore');
var ResponseStore = require('../flux/ResponseStore');

var App = React.createClass({
  getInitialState: function () {
    return {
      request: RequestStore.getRequest(),
      response: ResponseStore.getResponse()
    };
  },
  render: function () {
    return (
      <div>
        <h1>API Toolbox</h1>
        <Request request={this.state.request} />
        <Response response={this.state.response} />
      </div>
    );
  }
});

module.exports = App;
