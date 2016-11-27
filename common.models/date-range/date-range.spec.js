modules.define('spec', [
  'chai',
  'just-date',
  'date-gap',
  'date-range'
], function(provide,
            chai,
            JustDate,
            DateGap,
            DateRange) {
  var expect = chai.expect;

  describe('date-range', function() {
    var dateRange;

    beforeEach(function() {
      var initial = new JustDate(2011, 11, 31);
      var start = new JustDate(2012, 0, 5);
      var end = new JustDate(2013, 0, 4);
      var dateGap = new DateGap(1, 0, -1);

      dateRange = new DateRange(initial, start, end, dateGap);
    });

    afterEach(function() { dateRange = null; });

    it('should getInitialPlusGap', function() {
      var initialPlusGap = dateRange.getInitialPlusGap();
      var result = new JustDate(2012, 11, 30);
      expect(initialPlusGap.getTime()).to.equal(result.getTime());
    });

    it('should getStartPlusGap', function() {
      var startPlusGap = dateRange.getStartPlusGap();
      var result = new JustDate(2013, 0, 4);
      expect(startPlusGap.getTime()).to.equal(result.getTime());
    });

    it('should getIsGapBetween', function() {
      expect(dateRange.getIsGapBetween()).to.true;
    });

    it('should getDaysBetween', function() {
      expect(dateRange.getDaysBetween()).to.equal(366);
    });

    it('should getMaxStart', function() {
      var result = new JustDate(2012, 11, 30);
      expect(dateRange.getMaxStart().getTime()).to.equal(result.getTime());
    });

    it('should getMaxEnd', function() {
      var result = new JustDate(2013, 0, 4);
      expect(dateRange.getMaxEnd().getTime()).to.equal(result.getTime());
    });

    it('should getValidationError', function() {
      expect(dateRange.getValidationError()).to.null;
    });
  });

  provide();
});
