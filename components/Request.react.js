'use strict';

var React = require('react');

var Request = React.createClass({
  getInitialState: function () {
    return {
      headers: {},
      url: '',
      method: 'GET'
    };
  },
  handleChangeURL: function(event) {
    this.setState({url: event.target.value});
  },
  render: function () {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Request</h3>
        </div>
        <div className="panel-body">
          <div id="headers" >
            <h2>Headers</h2>
            <div className="form-group header row">
              <div className="col-md-5">
                <input type="text" className="form-control header-name" placeholder="Header name" />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control header-value" placeholder="Header value" />
              </div>
              <div className="col-md-1 header-action">
                <span className="glyphicon glyphicon-trash remove-header"></span>
                <span className="glyphicon glyphicon-plus add-header"></span>
              </div>
            </div>
          </div>

          <div>
            <h2>URL</h2>
            <div className="row">
              <div className="form-group col-md-10">
                <input type="text" className="form-control" id="url"
                    name="url" placeholder="Enter URL to test"
                    value={this.state.url}
                    onChange={this.handleChangeURL} />
              </div>
              <div className="form-group col-md-2">
                  <select value={this.state.method} className="form-control" id="method">
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                      <option value="OPTIONS">OPTIONS</option>
                  </select>
              </div>
            </div>
            <button id="test-url" className="btn btn-primary" onClick={this.props.onSendRequest.bind(this, this.state)}>Send request</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Request;
