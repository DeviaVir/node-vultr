var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:os', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return os list', function(done) {
      this.timeout(10000);
      return vultrInstance.os.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });
});
