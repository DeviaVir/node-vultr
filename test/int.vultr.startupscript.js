var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:startupscript', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return startupscript list', function(done) {
      this.timeout(5000);
      return vultrInstance.startupscript.list().then(function(response) {
        expect(typeof response).to.eql('object');
      }).then(done, done);
    });
  });

  describe( 'create', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return error without content', function(done) {
      return vultrInstance.startupscript.create('test').catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should return error without name', function(done) {
      return vultrInstance.startupscript.create().catch(function(err) {
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
      return vultrInstance.startupscript.destroy(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid statup script.  Check SCRIPTID value and ensure your API key matches the scripts\'s account');
      }).then(done, done);
    });

    it( 'should return error without id', function(done) {
      this.timeout(5000);
      return vultrInstance.startupscript.destroy().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'full rotation', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should create a startupscript, list it, update it, remove it again, and check if it\'s really gone', function(done) {
      this.timeout(60000);

      return vultrInstance.startupscript.create('test', '#!/bin/bash\necho hello world > /root/hello').then(function(response) {
        expect(response.SCRIPTID).to.be.ok();
        return response.SCRIPTID;
      }).then(function(script) {
        return vultrInstance.startupscript.list().then(function(list) {
          expect(script in list).to.be.ok();
          return script;
        });
      }).then(function(script) {
        return vultrInstance.startupscript.update('test1', '#!/bin/bash\necho hello world > /root/hello', null, script).then(function(response) {
          return script;
        });
      }).then(function(script) {
        return vultrInstance.startupscript.list().then(function(list) {
          expect(list[(script)].name).to.eql('test1');
          return script;
        });
      }).then(function(script) {
        return vultrInstance.startupscript.destroy(script).then(function(response) {
          return script;
        });
      }).then(function(script) {
        return vultrInstance.startupscript.list().then(function(list) {
          expect(script in list).to.not.be.ok();
        });
      }).then(done, done);
    });
  });
});
