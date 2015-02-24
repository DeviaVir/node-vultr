var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' ),
    testDomain = 'dualdev.com'; // Make sure this domain doesn't already exists

describe('I:Vultr:dns', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return list of domains', function(done) {
      this.timeout(5000);

      return vultrInstance.dns.list().then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });

  describe( 'records', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return list of records for testDomain', function(done) {
      this.timeout(5000);

      return vultrInstance.dns.records(testDomain).then(function(list) {
        expect(typeof list).to.eql('object');
      }).then(done, done);
    });
  });

  describe.only( 'full rotation', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should test creating a domain, adding a record, listing the record, removing the record, removing the domain', function(done) {
      this.timeout(60000);

      return vultrInstance.dns.createDomain(testDomain).then(function(res) {
        expect(res).to.eql(void 0);
      }).then(function() {
        return vultrInstance.dns.list().then(function(list) {
          return list.filter(function(domain) {
            if(domain.domain === testDomain) {
              return true;
            }
            return false;
          });
        }).then(function(domains) {
          expect(domains.length).to.eql(1);
          expect(domains[0].domain).to.eql(testDomain);
        });
      }).then(function() {
        return vultrInstance.dns.createRecord({
          'domain': testDomain,
          'name': 'test',
          'type': 'A',
          'data': '127.0.0.1'
        }).then(function(res) {
          expect(res).to.eql(void 0);
        });
      }).then(function() {
        return vultrInstance.dns.records(testDomain).then(function(list) {
          return list.filter(function(record) {
            if(record.name === 'test') {
              return true;
            }
            return false;
          });
        }).then(function(records) {
          expect(records.length).to.eql(1);
          expect(records[0].name).to.eql('test');
          expect(records[0].type).to.eql('A');
          expect(records[0].data).to.eql('127.0.0.1');
          expect(records[0].RECORDID).to.be.ok();
          return records[0].RECORDID;
        });
      }).then(function(id) {
        return vultrInstance.dns.deleteRecord({
          'domain': testDomain,
          'id': id
        });
      }).then(function() {
        return vultrInstance.dns.records(testDomain).then(function(list) {
          return list.filter(function(record) {
            if(record.name === 'test') {
              return true;
            }
            return false;
          });
        }).then(function(records) {
          expect(records.length).to.eql(0);
        });
      }).then(function() {
        return vultrInstance.dns.deleteDomain(testDomain);
      }).then(function() {
        return vultrInstance.dns.list().then(function(list) {
          return list.filter(function(domain) {
            if(domain.domain === testDomain) {
              return true;
            }
            return false;
          });
        }).then(function(domains) {
          expect(domains.length).to.eql(0);
        });
      }).then(done, done);
    });
  });
});
