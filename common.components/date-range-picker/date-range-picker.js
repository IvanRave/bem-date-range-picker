/**
 * @module date-range-picker
 */
modules.define('date-range-picker', [
  'i-bem__dom',
  'date-range',
  'date-gap',
  'date-picker',
  'error-wrapper'
], function(provide, BEMDOM, DateRange) {
  var View = BEMDOM.decl(this.name, {
    onSetMod: {
      js: {
        inited: function() {
          this.dateRange = null;
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

      this.bemErrorWrapper = this.findBlockInside('error-wrapper');

      return this;
    },
    /**
     * View controller
     * @private
     * @returns {Object} this
     */
    attachEvents: function() {
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
     * @returns {Object} Context: this
     */
    setRange: function(dateRange) {
      this.dateRange = dateRange;

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

      this.bemErrorWrapper.setError(dateRange.getValidationError());

      return this;
    },
    /**
     * @private
     * @param {Object} e BEM event
     * @param {JustDate} start Changed start date
     * @returns {undefined}
     */
    handleChangeDateStart: function(e, start) {
      var dateRange = this.dateRange;

      this.emit('change', new DateRange(dateRange.initial,
                                        start,
                                        dateRange.end,
                                        dateRange.dateGap));
    },
    /**
     * @private
     * @param {Object} e BEM event
     * @param {JustDate} end Changed end date
     * @returns {undefined}
     */
    handleChangeDateEnd: function(e, end) {
      var dateRange = this.dateRange;

      this.emit('change', new DateRange(dateRange.initial,
                                        dateRange.start,
                                        end,
                                        dateRange.dateGap));
    }
  });

  provide(View);
});
