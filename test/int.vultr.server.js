var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:server', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return server list', function(done) {
      this.timeout(5000);
      return vultrInstance.server.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });

  describe( 'bandwidth', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.bandwidth(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.bandwidth().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reboot', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reboot(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reboot().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'halt', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.halt(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.halt().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'start', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.start(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.start().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'destroy', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.destroy(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.destroy().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reinstall', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reinstall(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reinstall().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'restoreSnapshot', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.restoreSnapshot(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without a snapshot', function(done) {
      return vultrInstance.server.restoreSnapshot(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.restoreSnapshot().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'restoreBackup', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error for unknown id', function(done) {
      this.timeout(5000);
      return vultrInstance.server.restoreBackup(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without a snapshot', function(done) {
      return vultrInstance.server.restoreBackup(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.restoreBackup().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'create', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error without vps object', function(done) {
      this.timeout(5000);
      return vultrInstance.server.create().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });

    it( 'should throw error with empty vps object', function(done) {
      return vultrInstance.server.create({}).catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });

    it( 'should throw error without region', function(done) {
      return vultrInstance.server.create({
        'plan': 1,
        'os': 1
      }).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without plan', function(done) {
      return vultrInstance.server.create({
        'region': 1,
        'os': 1
      }).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without os', function(done) {
      return vultrInstance.server.create({
        'region': 1,
        'plan': 1
      }).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });
  });

  describe( 'listIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.listIpv4(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.listIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reverseSetIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseSetIpv4(1, 1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an entry', function(done) {
      return vultrInstance.server.reverseSetIpv4(1, 1).catch(function(err) {
        expect(err.message).to.eql('402');
      }).then(done, done);
    });

    it( 'should throw error without an ip and entry', function(done) {
      return vultrInstance.server.reverseSetIpv4(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reverseSetIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reverseDefaultIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseDefaultIpv4(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an ip', function(done) {
      return vultrInstance.server.reverseDefaultIpv4(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reverseDefaultIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  // Currently not offered in the API :/
  /**describe( 'reverseListIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseListIpv4(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseListIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });*/

  // Currently not offered in the API :/
  /**describe( 'reverseDeleteIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseDeleteIpv4(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an entry', function(done) {
      return vultrInstance.server.reverseDeleteIpv4(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an ip and entry', function(done) {
      return vultrInstance.server.reverseDeleteIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });**/

  describe( 'listIpv6', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.listIpv6(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.listIpv6().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reverseSetIpv6', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseSetIpv6(1, 1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an entry', function(done) {
      return vultrInstance.server.reverseSetIpv6(1, 1).catch(function(err) {
        expect(err.message).to.eql('402');
      }).then(done, done);
    });

    it( 'should throw error without an ip and entry', function(done) {
      return vultrInstance.server.reverseSetIpv6(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reverseSetIpv6().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  // Currently not offered in the API :/
  /**describe( 'reverseDefaultIpv6', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseDefaultIpv6(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an ip', function(done) {
      return vultrInstance.server.reverseDefaultIpv6(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an id', function(done) {
      return vultrInstance.server.reverseDefaultIpv6().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });**/

  describe( 'reverseListIpv6', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseListIpv6(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseListIpv6().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'reverseDeleteIpv6', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.reverseDeleteIpv6(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid IP address');
      }).then(done, done);
    });

    it( 'should throw error without an entry', function(done) {
      return vultrInstance.server.reverseDeleteIpv6(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without an ip and entry', function(done) {
      return vultrInstance.server.reverseDeleteIpv6().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'setLabel', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.setLabel(1, 'test').catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.setLabel(1).catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.setLabel().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'createIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.createIpv4(1, 'no').catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.createIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'destroyIpv4', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.destroyIpv4(1, 'no').catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.destroyIpv4().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'osChangeList', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.osChangeList(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.osChangeList().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'osChange', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.osChange(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.osChange().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'upgradePlanlist', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error with invalid subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.upgradePlanlist(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error without subid', function(done) {
      this.timeout(5000);
      return vultrInstance.server.upgradePlanlist().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'upgradePlan', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should throw error', function(done) {
      this.timeout(5000);
      return vultrInstance.server.upgradePlan(1, 1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid server.  Check SUBID value and ensure your API key matches the server\'s account');
      }).then(done, done);
    });

    it( 'should throw error', function(done) {
      return vultrInstance.server.upgradePlan().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });
});
