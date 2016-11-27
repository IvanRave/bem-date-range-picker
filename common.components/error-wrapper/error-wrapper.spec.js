modules.define('spec', [
  'chai',
  'jquery',
  'i-bem__dom',
  'BEMHTML',
  'error-wrapper'
], function(provide,
            chai,
            $,
            BEMDOM,
            BEMHTML) {
  var expect = chai.expect;

  var BLOCK_NAME = 'error-wrapper';

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

    it('should set a error', function() {
      block.setError('error message');
      expect(block.hasMod('visible')).to.true;
    });
  });

  provide();
});
