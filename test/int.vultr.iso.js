var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:iso', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return iso list', function(done) {
      this.timeout(5000);
      return vultrInstance.iso.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });
});
