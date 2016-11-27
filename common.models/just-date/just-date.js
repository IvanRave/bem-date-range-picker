modules.define('just-date', function(provide) {
  var JustDate = function(year, month, date) {
    this.year = year;
    this.month = month;
    this.date = date;
  };

  /**
   * https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
   * @returns {Number} UTC timestamp, milliseconds
   */
  JustDate.prototype.getTime = function() {
    return Date.UTC(this.year, this.month, this.date);
  };

  provide(JustDate);
});
