'use strict';

var React = require('react');
var Request = require('./Request.react');
var Response = require('./Response.react');

var App = React.createClass({
  getInitialState: function () {
    return {
      showResponse: false
    }
  },
  sendRequest: function (data) {
    console.log('data: ', data);
    this.setState({
      showResponse: true
    });
  },
  hideResponse: function () {
    this.setState({
      showResponse: false
    });
  },
  render: function () {
    return (
      <div>
        <h1>API Toolbox</h1>
        <Request onSendRequest={this.sendRequest} />
        { this.state.showResponse ? <Response onHideResponse={this.hideResponse} /> : null }
      </div>
    );
  }
});

module.exports = App;
