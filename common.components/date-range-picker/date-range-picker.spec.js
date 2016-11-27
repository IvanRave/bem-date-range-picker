modules.define('spec', [
  'chai',
  'jquery',
  'i-bem__dom',
  'BEMHTML',
  'date-range',
  'just-date',
  'date-gap',
  'date-range-picker'
], function(provide,
            chai,
            $,
            BEMDOM,
            BEMHTML,
            DateRange,
            JustDate,
            DateGap) {
  var expect = chai.expect;

  var BLOCK_NAME = 'date-range-picker';

  describe(BLOCK_NAME, function() {
    var block;

    beforeEach(function() {
      var blockHtml = BEMHTML.apply({
        block: BLOCK_NAME,
        labelStart: 'Departure',
        labelEnd: 'Arrival'
      });

      var blockDom = $(blockHtml);
      block = BEMDOM.init(blockDom)
        .appendTo('body')
        .bem(BLOCK_NAME);
    });

    afterEach(function() {
      block.un();
      BEMDOM.destruct(block.domElem);
    });

    it('should update the block', function(done) {
      var initial = new JustDate(2011, 11, 31);
      var start = new JustDate(2012, 0, 5);
      var end = new JustDate(2013, 0, 4);
      var dateGap = new DateGap(1, 0, -1);

      var dateRange = new DateRange(initial, start, end, dateGap);

      block.setRange(dateRange);

      var startAfter = block.bemDateStart.getJustDate();
      expect(start.getTime()).to.equal(startAfter.getTime());

      var endAfter = block.bemDateEnd.getJustDate();
      expect(end.getTime()).to.equal(endAfter.getTime());

      var startNew = new JustDate(2012, 0, 10);

      block.on('change', function(ev, dateRangeNew) {
        expect(dateRangeNew.getIsGapBetween()).to.false;
        expect(dateRangeNew.start.getTime()).to.equal(startNew.getTime());
        done();
      });

      block.bemDateStart.setJustDate(startNew);
    });
  });

  provide();
});
