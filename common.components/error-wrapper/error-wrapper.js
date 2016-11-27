modules.define('error-wrapper', [
  'i-bem__dom'
], function(provide, BEMDOM) {
  provide(BEMDOM.decl(this.name, {
    onSetMod: {
      js: {
        inited: function() {
          this.attachChildren();
        }
      }
    },
    /**
     * @private
     * @returns {Object} this
     */
    attachChildren: function() {
      this.bemMessage = this.findElem('message');
      return this;
    },
    /**
     * Set a error message. Clear it if null or empty.
     * @public
     * @param {String} val Error message
     * @returns {Object} this
     */
    setError: function(val) {
      if (val) {
        BEMDOM.update(this.bemMessage, val);
        this.setMod('visible');
      } else {
        BEMDOM.update(this.bemMessage, '');
        this.delMod('visible');
      }

      return this;
    }
  }));
});
