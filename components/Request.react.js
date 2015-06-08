'use strict';

var React = require('react');
var ToolboxActions = require('../flux/ToolboxActions');
var RequestStore = require('../flux/RequestStore');

var Request = React.createClass({

  getInitialState: function () {
    return {
      request: RequestStore.getRequest(),
    };
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState(RequestStore.getRequest());
  },

  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this.onChange);
  },

  addHeader: function () {
    ToolboxActions.addHeader();
  },

  removeHeader: function (index) {
    ToolboxActions.removeHeader(index);
  },

  changeHeaderName: function (header, event) {
    var name = event.target.value;
    ToolboxActions.changeHeaderName(header, name);
  },

  changeHeaderValue: function (header, event) {
    var value = event.target.value;
    ToolboxActions.changeHeaderValue(header, value);
  },

  handleChangeURL: function (event) {
    ToolboxActions.changeURL(event.target.value);
  },

  handleChangeMethod: function (event) {
    ToolboxActions.changeMethod(event.target.value);
  },

  sendRequest: function () {
    ToolboxActions.sendRequest(RequestStore.getRequest());
  },

  render: function () {
    var self = this;
    var request = this.state.request;
    var headers = request.headers

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Request</h3>
        </div>
        <div className="panel-body">
          <div id="headers" >
            <h2>Headers</h2>
            {Object.keys(headers).map(function (header) {
              return (
                <div key={header} className="form-group header row">
                  <div className="col-md-5">
                    <input type="text" className="form-control header-name" placeholder="Header name"
                        value={headers[header].name}
                        onChange={self.changeHeaderName.bind(self, header)} />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control header-value" placeholder="Header value"
                        value={headers[header].value}
                        onChange={self.changeHeaderValue.bind(self, header)} />
                  </div>
                  <div className="col-md-1 header-action">
                    <span className="glyphicon glyphicon-trash remove-header" onClick={self.removeHeader.bind(self, header)}></span>
                    <span className="glyphicon glyphicon-plus add-header" onClick={self.addHeader}></span>
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <h2>URL</h2>
            <div className="row">
              <div className="form-group col-md-10">
                <input type="text" className="form-control" id="url"
                    name="url" placeholder="Enter URL to test"
                    value={request.url}
                    onChange={this.handleChangeURL} />
              </div>
              <div className="form-group col-md-2">
                  <select value={request.method} className="form-control" onChange={self.handleChangeMethod}>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                      <option value="OPTIONS">OPTIONS</option>
                  </select>
              </div>
            </div>
            <button id="test-url" className="btn btn-primary" onClick={this.sendRequest}>Send request</button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Request;
