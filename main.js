'use strict';

$(document).ready(function() {
  $('#test-url').on('click', testURL);
  $('#close-response').on('click', closeResponse);
  $('#close-error').on('click', closeError);
  $('.add-header').on('click', addHeader);
  $('.remove-header').on('click', removeHeader);
});

function testURL() {
  var headers = _($('.header')).map(function (header) {
    var name = $(header).find('.header-name').val();
    var value = $(header).find('.header-value').val();
    return {
      name: name,
      value: value
    };
  }).filter(function (header) {
    return header.name
  });

  $.ajax({
    url: $('#url').val(),
    beforeSend: function (jqXHR) {
      _(headers).forEach(function (header) {
        jqXHR.setRequestHeader(header.name, header.value);
      });
    }
  }).done(function (data, textStatus, jqXHR) {
    $('#errors').hide();

    var response = '';
    var contentType = jqXHR.getResponseHeader('Content-Type');
    if (contentType.indexOf('application/json') > -1) {
      response = JSON.stringify(data, undefined, 4);
    } else {
      response = data;
    }
    $('#response-headers').html('<pre>' + jqXHR.getAllResponseHeaders() + '</pre>');
    $('#response-body').html('<pre>' + response + '</pre>');
    $('#response').show();
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#response').hide();

    $('#error').append(errorThrown || 'Internal error');
    $('#errors').show();
  });
}

function closeResponse() {
  $('#response-content').text('');
  $('#response').hide();
}

function closeError() {
  $('#error').text('');
  $('#errors').hide();
}

function addHeader() {

}

function removeHeader() {

}
