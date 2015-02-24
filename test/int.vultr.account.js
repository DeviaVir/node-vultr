var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:acount', function() {
  'use strict';

  describe( 'info', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return account info', function(done) {
      this.timeout(5000);
      return vultrInstance.account.info().then(function(info) {
        expect(info.balance).to.be.ok();
        expect(info.pending_charges).to.be.ok();
        expect(info.last_payment_date).to.be.ok();
        expect(info.last_payment_amount).to.be.ok();
      }).then(done, done);
    });
  });
});
