/**
 * @module date-range-picker
 */
modules.define('date-range-picker', [
  'i-bem__dom',
  'date-range',
  'date-gap',
  'date-picker',
  'error-wrapper'
], function(provide, BEMDOM, DateRange, DateGap) {
  // plus 1 year minus 1 day
  var dateGap = new DateGap(1, 0, -1);

  var buildRange = function(dateInitial,
                            dateStart,
                            dateEnd) {
    return new DateRange(dateInitial,
                         dateStart,
                         dateEnd,
                         dateGap);
  };

  var View = BEMDOM.decl(this.name, {
    onSetMod: {
      js: {
        inited: function() {
          this.attachChildren().attachEvents();
        }
      }
    },
    /**
     * Find all inner blocks
     * @private
     * @returns {Object} this
     */
    attachChildren: function() {
      this.bemDateStart = this.findBlockOn('date-start-picker', 'date-picker');

      this.bemDateEnd = this.findBlockOn('date-end-picker', 'date-picker');

      this.bemIsAnnual = this.findBlockInside('is-annual', 'checkbox');

      this.bemErrorWrapper = this.findBlockInside('error-wrapper');

      this.bemDateInitial = null;

      return this;
    },
    /**
     * View controller
     * @private
     * @returns {Object} this
     */
    attachEvents: function() {
      this.bemIsAnnual
        .on({ modName: 'checked', modVal: true },
            this.handleIsAnnualTrue.bind(this))
        .on({ modName: 'checked', modVal: '' },
            this.handleIsAnnualFalse.bind(this));

      this.bemDateStart
        .on('change', this.handleChangeDateStart.bind(this));

      this.bemDateEnd
        .on('change', this.handleChangeDateEnd.bind(this));

      return this;
    },
    /**
     * Update the component: set a new range
     * @public
     * @param {DateRange} dateRange Range
     * @returns {Object} this context
     */
    setRange: function(dateRange) {
      var errorMessage = dateRange.getValidationError();
      this.bemErrorWrapper.setError(errorMessage);

      /** Hidden component, internal state */
      this.bemDateInitial = dateRange.initial;

      this.bemDateStart
        .setMinMaxJustDates(null, null)
        .setJustDate(dateRange.start)
        .setMinMaxJustDates(dateRange.getMinStart(),
                            dateRange.getMaxStart());

      this.bemDateEnd
        .setMinMaxJustDates(null, null)
        .setJustDate(dateRange.end)
        .setMinMaxJustDates(dateRange.getMinEnd(),
                            dateRange.getMaxEnd());

      this.bemIsAnnual
        .setMod('checked', dateRange.getIsGapBetween() || false);

      return this;
    },
    /**
     * For Annual mode: update dateEnd = plus 1 year
     * @private
     * @returns {undefined}
     */
    handleChangeDateStart: function() {
      var dateStart = this.bemDateStart.getJustDate();
      var dateEnd = this.bemDateEnd.getJustDate();
      var dateInitial = this.bemDateInitial;

      var dateRangeNew = buildRange(dateInitial,
                                    dateStart,
                                    dateEnd);

      if (this.bemIsAnnual.hasMod('checked') === true) {
        if (dateStart && dateEnd) {
          dateRangeNew.updateEndFromStartPlusGap();
        }
      }

      this.emit('change', dateRangeNew);
    },
    /**
     * Just emit new values
     * @private
     * @returns {undefined}
     */
    handleChangeDateEnd: function() {
      var dateStart = this.bemDateStart.getJustDate();
      var dateEnd = this.bemDateEnd.getJustDate();
      var dateInitial = this.bemDateInitial;

      this.emit('change', buildRange(dateInitial,
                                     dateStart,
                                     dateEnd));
    },
    /**
     * Turn on the Annual mode: update dateEnd = plus 1 year
     * @private
     * @returns {undefined}
     */
    handleIsAnnualTrue: function() {
      var dateStart = this.bemDateStart.getJustDate();
      var dateEnd = this.bemDateEnd.getJustDate();
      var dateInitial = this.bemDateInitial;

      var dateRangeNew = buildRange(dateInitial,
                                    dateStart,
                                    dateEnd);

      dateRangeNew.updateEndFromStartPlusGap();

      this.emit('change', dateRangeNew);
    },
    /**
     * Turn off the Annual mode: clear dateEnd
     * @private
     * @returns {undefined}
     */
    handleIsAnnualFalse: function() {
      var dateInitial = this.bemDateInitial;
      var dateStart = this.bemDateStart.getJustDate();
      var dateEnd = null;

      this.emit('change', buildRange(dateInitial,
                                     dateStart,
                                     dateEnd));
    }
  });

  provide(View);
});
