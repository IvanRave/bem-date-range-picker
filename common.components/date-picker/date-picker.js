/**
 * {@link http://amsul.ca/pickadate.js/date/}
 * @module date-picker
 */
modules.define('date-picker', [
  'i-bem__dom',
  'just-date',
  'pickadate'
], function(provide,
            BEMDOM,
            JustDate) {
  var toPickerDate = function(justDate) {
    return [justDate.year, justDate.month, justDate.date];
  };

  var View = BEMDOM.decl(this.name, {
    onSetMod: {
      js: {
        inited: function() {
          /**
           * Picker object
           * 'picker' - is a constant
           * @private
           * @type {Object}
           */
          this.picker = this.domElem.pickadate().pickadate('picker');

          /**
           * onSet fires for next data changes:
           * - select (actual date)
           * - min
           * - max
           * - highlight
           * - etc.
           */
          this.picker.on('set', this.onSet.bind(this));
        }
      }
    },
    /**
     * Just emit a 'change' BEM event without data
     * http://amsul.ca/pickadate.js/api/#method-set
     * @private
     * @param {Object} thingSet Clear, select, highlight, etc.
     * @returns {undefined}
     */
    onSet: function(thingSet) {
      if (thingSet.clear === null) {
        this.emit('change');
        return;
      }

      if (typeof thingSet.select !== 'undefined') {
        this.emit('change');
        return;
      }
    },
    /**
     * @public
     * @returns {JustDate} Current date (or null)
     */
    getJustDate: function() {
      var objectSelect = this.picker.get('select');
      return objectSelect ? new JustDate(objectSelect.year,
                                         objectSelect.month,
                                         objectSelect.date) : null;
    },
    /**
     * Set a date; clear if no value
     * @public
     * @param {JustDate} dateSet Date to set
     * @returns {Object} BEM block
     */
    setJustDate: function(dateSet) {
      if (dateSet) {
        this.picker.set('select', toPickerDate(dateSet));
      } else {
        this.picker.clear();
      }

      return this;
    },
    /**
     * Set dates limits;
     * null - removes limits
     * {@link http://amsul.ca/pickadate.js/api/#method-set-min}
     * @public
     * @param {JustDate} dateMin Min
     * @param {JustDate} dateMax Max
     * @returns {Object} BEM block
     */
    setMinMaxJustDates: function(dateMin, dateMax) {
      this.picker.set({
        min: dateMin ? toPickerDate(dateMin) : false,
        max: dateMax ? toPickerDate(dateMax) : false
      });

      return this;
    }
  });

  provide(View);
});
