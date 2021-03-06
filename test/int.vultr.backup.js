var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe.only('I:Vultr:backup', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return backup list', function(done) {
      this.timeout(5000);
      return vultrInstance.backup.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });
});
