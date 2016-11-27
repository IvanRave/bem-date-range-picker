/**
 * http://amsul.ca/pickadate.js/date/
 * @module pickadate
 */
modules.define('pickadate', [
  'jquery'
], function (provide, $) {
  provide(
    (function(jQuery) { // eslint-disable-line no-unused-vars
      /* borschik:include:../../libs/pickadate/lib/picker.js */
      /* borschik:include:../../libs/pickadate/lib/picker.date.js */
    }($))
  );
});
