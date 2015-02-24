var Promise = require( 'bluebird' );

var Vultr = require( '../vultr' );

describe('I:Vultr:sshkey', function() {
  'use strict';

  describe( 'list', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should return sshkey list', function(done) {
      this.timeout(5000);
      return vultrInstance.sshkey.list().then(function(response) {
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
      return vultrInstance.sshkey.create('test', 'test').catch(function(err) {
        expect(err.message).to.contain('412 - Unable to create SSH Key: Invalid SSH key.  Keys should be in authorized_keys format');
      }).then(done, done);
    });

    it( 'should return error without key', function(done) {
      return vultrInstance.sshkey.create('test').catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should return error without name', function(done) {
      return vultrInstance.sshkey.create().catch(function(err) {
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
      return vultrInstance.sshkey.destroy(1).catch(function(err) {
        expect(err.message).to.eql('412 - Invalid SSH Key.  Check SSHKEYID value and ensure your API key matches the key\'s account');
      }).then(done, done);
    });

    it( 'should return error without id', function(done) {
      this.timeout(5000);
      return vultrInstance.sshkey.destroy().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'full rotation', function() {
    var vultrInstance;
    beforeEach(function() {
      vultrInstance = new Vultr();
    });

    it( 'should create an ssh key, list it, update it, remove it again, and check if it\'s really gone', function(done) {
      this.timeout(60000);

      return vultrInstance.sshkey.create('test', 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDrIrS0HHzNHTHela2tixILYsRzKa0D21bwDrrMYRhJX7BGS3Fljy28g06HTlFzTkSDhTWh7DMaCyyVkboaPei1Q04fjaxu0/u3uosFQ6/wYq0im7Pwxbnrn9zLh2tHj3ByNt/EifaLjjF6m/dPlkVNFRarj4at6dEzXcDNnXs0gpfz2Fh18wKdgasDS8VAXB/NxJdZJp5QBK6bqRkcNejr8SRmxHgKI1LxzG+I/l44qyNC15XTXy7HLfyUfUnVHzK/o4mPyU+Fwt+rBHhf68lEfOMvKTSEUWzsZcV5Vt+r8s5vhiuXy6wo/h1li9e2cRrDXxZ9L4OAX8iDf3NX8NfD chase@chase').then(function(response) {
        expect(response.SSHKEYID).to.be.ok();
        return response.SSHKEYID;
      }).then(function(ssh) {
        return vultrInstance.sshkey.list().then(function(list) {
          expect(ssh in list).to.be.ok();
          return ssh;
        });
      }).then(function(ssh) {
        return vultrInstance.sshkey.update('test1', 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDQb1/IwYDgZVbmuByQhIDIh/LzHhwNXht8w2bie6ZbGiwnR4iGXC9zYo/lrJzI0l5qre338uo3iMS8ClSbrF+Do3hGUQKUk83TBSP3YJ26Y2obZ5g93pfo4m0cHflpoRUA5y2nUFwKNQNDKU2+wcgCy6ijoxDLErA7DzWyxhjl7T3JEJnVr/egm9xXxq4c/2272b6hpAUlzcez/dNT916cGqsOi2N+NU1siXML/CDynNjPv3FIngX2ECrELkBCDk/XVwgtPBd9gb2RrO/xdsEGpVX5+2fxj7pBat13Dn+V1qP8QpuFU+4l58B/JHRBEyHXXiUtrOut9HEwYmaoL45N chase@dualdev.com', ssh).then(function(response) {
          return ssh;
        });
      }).then(function(ssh) {
        return vultrInstance.sshkey.list().then(function(list) {
          expect(list[(ssh)].name).to.eql('test1');
          return ssh;
        });
      }).then(function(ssh) {
        return vultrInstance.sshkey.destroy(ssh).then(function(response) {
          return ssh;
        });
      }).then(function(ssh) {
        return vultrInstance.sshkey.list().then(function(list) {
          expect(ssh in list).to.not.be.ok();
        });
      }).then(done, done);
    });
  });
});
