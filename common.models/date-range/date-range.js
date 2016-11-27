/** @module date-range */
modules.define('date-range', [
  'just-date',
  'date-gap'
], function(provide, JustDate, DateGap) {
  var DAY_MILLISECONDS = 86400000;

  var Model = function(initial, start, end, dateGap) {
    if (!initial || (initial instanceof JustDate === false)) {
      throw new Error('required_initial_instanceof_JustDate');
    }

    if (!dateGap || (dateGap instanceof DateGap === false)) {
      throw new Error('required_dateGap_instanceof_DateGap');
    }

    /** @type {JustDate} */
    this.initial = initial;
    this.start = start;
    this.end = end;

    /** @type {DateGap} */
    this.dateGap = dateGap;
  };

  /**
   * @public
   * @param {JustDate} start Start date
   * @param {JustDate} end End date
   * @returns {undefined}
   */
  Model.prototype.update = function(start, end) {
    this.start = start;
    this.end = end;
  };

  /**
   * @public
   * @returns {undefined}
   */
  Model.prototype.updateEndFromStartPlusGap = function() {
    this.end = this.getStartPlusGap();
  };

  /**
   * Calculates a new date by adding a gap to the date
   * This method is not included inside a JustDate class
   *   because it returns a new instance
   * According UTC (no local time)
   * @private
   * @param {JustDate} justDate Some date
   * @param {DateGap} dateGap Number of years, monts and days to add
   * @returns {JustDate} A gap (year, month) later
   */
  var calculateDatePlusGap = function(justDate, dateGap) {
    if (!justDate) { return null; }

    var d = new Date(justDate.getTime());

    if (dateGap) {
      if (dateGap.years) {
        d.setUTCFullYear(d.getUTCFullYear() + dateGap.years);
      }

      if (dateGap.months) {
        d.setUTCMonth(d.getUTCMonth() + dateGap.months);
      }

      if (dateGap.days) {
        d.setUTCDate(d.getUTCDate() + dateGap.days);
      }
    }

    return new JustDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  };

  /**
   * @public
   * @returns {JustDate} eg: year later
   */
  Model.prototype.getInitialPlusGap = function() {
    return calculateDatePlusGap(this.initial, this.dateGap);
  };

  /**
   * @public
   * @returns {JustDate} eg: year later from a start date
   */
  Model.prototype.getStartPlusGap = function() {
    return calculateDatePlusGap(this.start, this.dateGap);
  };

  /**
   * @public
   * @returns {Boolean} Whether the gap between start and end dates equal the model's dateGap
   */
  Model.prototype.getIsGapBetween = function() {
    var startPlusGap = this.getStartPlusGap();

    if (startPlusGap && this.end) {
      return startPlusGap.getTime() === this.end.getTime();
    }

    return null;
  };

  /**
   * @public
   * @returns {Number} Number of days between start and end dates,
   *   including start and end days
   */
  Model.prototype.getDaysBetween = function() {
    if (!this.start || !this.end) {
      return null;
    }

    var milliseconds = this.end.getTime() - this.start.getTime();

    if (milliseconds > 0 || milliseconds === 0) {
      return (milliseconds / DAY_MILLISECONDS) + 1;
    }

    return null;
  };

  /**
   * @public
   * @returns {JustDate} Min limit for a start date
   */
  Model.prototype.getMinStart = function() {
    return this.initial;
  };

  /**
   * @public
   * @returns {JustDate} Max limit for a start date
   */
  Model.prototype.getMaxStart = function() {
    var initialPlusGap = this.getInitialPlusGap();

    if (this.end && initialPlusGap) {
      if (this.end.getTime() < initialPlusGap.getTime()) {
        return this.end;
      }
    }

    return initialPlusGap;
  };

  /**
   * @public
   * @returns {JustDate} Min limit for an end date
   */
  Model.prototype.getMinEnd = function() {
    return this.start || this.initial;
  };

  /**
   * @public
   * @returns {JustDate} Max limit for an end date
   */
  Model.prototype.getMaxEnd = function() {
    var startPlusGap = this.getStartPlusGap();
    return startPlusGap || this.getInitialPlusGap();
  };

  /**
   * @public
   * @returns {String} Validation message, if a model is invalid
   */
  Model.prototype.getValidationError = function() {
    if (!this.start) { return 'required_start'; }
    if (!this.end) { return 'required_end'; }

    var startTime = this.start.getTime();
    var initialTime = this.initial.getTime();
    if (startTime < initialTime) {
      return 'start_lt_initial';
    }

    var initialPlusGapTime = this.getInitialPlusGap().getTime();
    if (startTime > initialPlusGapTime) {
      return 'start_gt_initialPlusGap';
    }

    var endTime = this.end.getTime();
    if (endTime < startTime) {
      return 'end_lt_start';
    }

    var startPlusGapTime = this.getStartPlusGap().getTime();
    if (endTime > startPlusGapTime) {
      return 'end_gt_startPlusGap';
    }

    return null;
  };

  provide(Model);
});
