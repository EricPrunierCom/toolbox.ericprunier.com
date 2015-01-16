'use strict';

$(document).ready(function() {
    $('#test-url').on('click', testURL);
    $('#close-response').on('click', closeResponse);
    $('#close-error').on('click', closeError);
});

function testURL() {
    $.ajax({
        url: $('#url').val()
    }).done(function (data, textStatus, jqXHR) {
        $('#errors').hide();

        var response = '';
        var contentType = jqXHR.getResponseHeader('Content-Type');
        if (contentType.indexOf('application/json') > -1) {
            response = JSON.stringify(data);
        } else {
            response = data;
        }
        $('#response-content').text(response);
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
