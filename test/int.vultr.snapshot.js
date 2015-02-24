var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:snapshot', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return snapshot list', function(done) {
      this.timeout(5000);
      return vultrInstance.snapshot.list().then(function(response) {
        expect(typeof response).to.eql('object');
      }).then(done, done);
    });
  });

  describe( 'create', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return error from vultr', function(done) {
      this.timeout(5000);
      return vultrInstance.snapshot.create(1, 'test').catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should return error without id', function(done) {
      this.timeout(5000);
      return vultrInstance.snapshot.create().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'destroy', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return error from vultr', function(done) {
      this.timeout(5000);
      return vultrInstance.snapshot.destroy(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid snapshot.  Check SNAPSHOTID value and ensure your API key matches the snapshots\'s account');
      }).then(done, done);
    });

    it( 'should return error without id', function(done) {
      this.timeout(5000);
      return vultrInstance.snapshot.destroy().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });
});
