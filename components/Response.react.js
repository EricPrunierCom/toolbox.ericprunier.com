'use strict';

var React = require('react');

var Response = React.createClass({
    render: function () {
      return (
        <div id="response" className="panel panel-success">
          <div className="panel-heading">
            <button type="button" id="close-response" className="close" aria-label="Close" onClick={this.props.onHideResponse}><span aria-hidden="true">x</span></button>
            <h3 className="panel-title">Response <span id="response-code"></span></h3>
          </div>
          <div className="panel-body">
            <h2>Headers</h2>
            <pre id="response-headers">
            </pre>
            <h2>Body</h2>
            <pre id="response-body">
            </pre>
          </div>
        </div>
      )
    }
});

module.exports = Response;
