'use strict';

var _ = require('lodash');
var React = require('react');
var ResponseStore = require('../flux/ResponseStore');
var ToolboxActions = require('../flux/ToolboxActions');

var Response = React.createClass({

  componentDidMount: function () {
    ResponseStore.addChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState(ResponseStore.getResponse());
  },

  componentWillUnmount: function () {
    ResponseStore.removeChangeListener(this.onChange);
  },

  hideResponse: function () {
    ToolboxActions.hideResponse();
  },

  render: function () {
    var self = this;
    var response = this.props.response;
    var headers = _(response.headers);

    // console.log('headers', headers);
    // headers.map(function (header) {
    //   console.log('header', header);
    // });

    return (
      <div id="response" className={response.visible ? 'panel panel-success' : 'hidden'}>
        <div className="panel-heading">
          <button type="button" id="close-response" className="close" aria-label="Close" onClick={self.hideResponse}><span aria-hidden="true">x</span></button>
          <h3 className="panel-title">Response <span id="response-code">{response.status}</span></h3>
        </div>
        <div className="panel-body">
          <h2>Headers</h2>
          <pre id="response-headers">
            {_.map(response.headers, function (header) {
              return (header);
            })}
          </pre>
          <h2>Body</h2>
          <pre id="response-body">
            {response.body}
          </pre>
        </div>
      </div>
    )
  }
});

module.exports = Response;
