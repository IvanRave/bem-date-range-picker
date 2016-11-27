/**
 * Prop names, like in http://momentjs.com/docs/
 * @module date-gap
 */
modules.define('date-gap', function(provide) {
  var Model = function(years, months, days) {
    this.years = years;
    this.months = months;
    this.days = days;
  };

  provide(Model);
});
