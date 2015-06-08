'use strict';

var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  ADD_HEADER: null,
  REMOVE_HEADER: null,
  CHANGE_HEADER_NAME: null,
  CHANGE_HEADER_VALUE: null,
  CHANGE_URL: null,
  CHANGE_METHOD: null,
  RESPONSE_RECEIVED: null,
  HIDE_RESPONSE: null,
});
