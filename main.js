'use strict';

$(document).ready(function() {
  $('#test-url').on('click', testURL);
  $('#close-response').on('click', closeResponse);
  $('#close-error').on('click', closeError);
  $(document).on('click', '.add-header', addHeader);
  $(document).on('click', '.remove-header', removeHeader);
});

/**
* Launch URL test.
*/
function testURL() {
  $.ajax({
    url: $('#url').val(),
    method: $('#method').val(),
    beforeSend: function (jqXHR) {
      var headers = getHeaders();
      _(headers).forEach(function (header) {
        jqXHR.setRequestHeader(header.name, header.value);
      });
    }
  }).done(requestSuccess).fail(requestError);
}

/**
* Get a map of URL headers (ex: {"headerName": "headerValue"}).
*/
function getHeaders() {
  return _($('.header')).map(function (header) {
    var name = $(header).find('.header-name').val();
    var value = $(header).find('.header-value').val();
    return {
      name: name,
      value: value
    };
  }).filter(function (header) {
    return header.name
  });
}

/**
* Process request success.
*/
function requestSuccess(data, textStatus, jqXHR) {
  $('#errors').hide();

  var response = '';
  var contentType = jqXHR.getResponseHeader('Content-Type');
  if (contentType.indexOf('application/json') > -1) {
    response = JSON.stringify(data, undefined, 4);
  } else {
    response = data;
  }
  $('#response-headers').text(jqXHR.getAllResponseHeaders());
  $('#response-body').text(response);
  $('#response').show();
}

/**
* Process request error.
*/
function requestError(jqXHR, textStatus, errorThrown) {
  $('#response').hide();

  $('#error').text(errorThrown || 'Internal error');
  $('#errors').show();
}

/**
* Close response panel.
*/
function closeResponse() {
  $('#response-content').text('');
  $('#response').hide();
}

/**
* Close error panel.
*/
function closeError() {
  $('#error').text('');
  $('#errors').hide();
}

/**
* Add header fields.
*/
function addHeader() {
  $('#headers').append('<div class="form-group header row">\
      <div class="col-md-5">\
        <input type="text" class="form-control header-name" placeholder="Header name">\
      </div>\
      <div class="col-md-6">\
        <input type="text" class="form-control header-value" placeholder="Header value">\
      </div>\
      <div class="col-md-1 header-action">\
        <span class="glyphicon glyphicon-trash remove-header" />\
        <span class="glyphicon glyphicon-plus add-header" />\
      </div>\
    </div>\
  ');
}

/**
* Remove header fields.
*/
function removeHeader() {
  var headerLine = $(this).parents('.header');
  if (headerLine.length > 0) {
    $(headerLine).remove();
  }
}
