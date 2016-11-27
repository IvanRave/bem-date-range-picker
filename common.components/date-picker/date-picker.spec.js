modules.define('spec', [
  'chai',
  'jquery',
  'i-bem__dom',
  'BEMHTML',
  'just-date',
  'date-picker'
], function(provide,
            chai,
            $,
            BEMDOM,
            BEMHTML,
            JustDate) {
  var expect = chai.expect;

  var BLOCK_NAME = 'date-picker';

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

    it('should initial null', function() {
      expect(block.getJustDate()).to.null;
    });

    it('should set and get', function(done) {
      var before = new JustDate(2010, 0, 1);

      block.on('change', function() {
        var after = block.getJustDate();
        var isEqual = after.getTime() === before.getTime();
        expect(isEqual).to.true;
        done();
      });

      block.setJustDate(before);
    });

    it('should set and get current time', function(done) {
      var d = new Date();
      var before = new JustDate(d.getFullYear(),
                                d.getMonth(),
                                d.getDate());

      block.on('change', function() {
        var after = block.getJustDate();
        expect(before.getTime()).to.equal(after.getTime());
        done();
      });

      block.setJustDate(before);
    });

    it('should set 0 unix epoch', function() {
      var before = new JustDate(1970, 0, 1);
      block.setJustDate(before);
      var after = block.getJustDate();

      expect(before.getTime()).to.equal(after.getTime());
    });

    it('should clean a date', function() {
      block.setJustDate(null);
      expect(block.getJustDate()).to.null;

      block.setJustDate(undefined);
      expect(block.getJustDate()).to.null;
    });
  });

  provide();
});
