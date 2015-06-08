'use strict';

var React = require('react');
var Request = require('./Request.react');
var Response = require('./Response.react');
var RequestStore = require('../flux/RequestStore');
var ResponseStore = require('../flux/ResponseStore');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>API Toolbox</h1>
        <Request />
        <Response />
      </div>
    );
  }
});

module.exports = App;
