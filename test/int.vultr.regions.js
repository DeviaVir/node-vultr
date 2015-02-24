var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:regions', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return regions list', function(done) {
      this.timeout(5000);

      return vultrInstance.regions.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });

    it( 'should return availability list for first region', function(done) {
      this.timeout(10000);

      return vultrInstance.regions.list().then(function(list) {
        expect(typeof list).to.eql('object');
        expect(Object.keys(list).length).to.be.greaterThan(0);

        return vultrInstance.regions.availability(list[Object.keys(list)[0]].DCID).then(function(plans) {
          expect(typeof plans).to.eql('object');
        });
      }).then(done, done);
    });
  });
});
