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
        block: BLOCK_NAME
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

      var isGapBetween = dateRange.getIsGapBetween();
      var isGapBetweenAfter = block.bemIsAnnual.hasMod('checked');
      expect(isGapBetween).to.equal(isGapBetweenAfter);

      block.on('change', function(ev, dateRangeNew) {
        expect(dateRangeNew.getIsGapBetween()).to.null;
        expect(dateRangeNew.end).to.null;
        done();
      });

      block.bemIsAnnual.delMod('checked');
    });
  });

  provide();
});
