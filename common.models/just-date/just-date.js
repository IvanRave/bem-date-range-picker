modules.define('just-date', function(provide) {
  var JustDate = function(year, month, date) {
    this.year = year;
    this.month = month;
    this.date = date;
  };

  /**
   * @param {Number} timestamp UTC timestamp, milliseconds
   * @returns {JustDate} A new instance of JustDate
   */
  JustDate.fromTimestamp = function(timestamp) {
    var d = new Date(timestamp);
    return new JustDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  };

  /**
   * https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
   * @public
   * @returns {Number} UTC timestamp, milliseconds
   */
  JustDate.prototype.getTime = function() {
    return Date.UTC(this.year, this.month, this.date);
  };

  /**
   * @public
   * @returns {Array} Ordered array of props
   */
  JustDate.prototype.getArray = function() {
    return [this.year, this.month, this.date];
  };

  provide(JustDate);
});
