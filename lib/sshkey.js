var Promise = require('bluebird');

/**
 * SSHKey instance constructor
 * @prototype
 * @class SSHKey
 */
function SSHKey(instance) {
  this.vultr = instance || {};
  this.service = 'sshkey';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
SSHKey.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};

/**
 * Create a snapshot from an existing virtual machine. The virtual machine does not need to be stopped.  
 * @param {String} name Name of the SSH key
 * @param {String} key SSH public key (in authorized_keys format)
 * @param {String} ssh (optional) SSHKEYID of key to update (see /v1/sshkey/list)
 * @return {Promise}
 */
SSHKey.prototype.create = function create(name, key, ssh) {
  if(name === void 0 || name === '') {
    return Promise.reject(new Error(404));
  }
  if(key === void 0 || key === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'name': name,
    'ssh_key': key
  };

  var method = 'create';
  if(ssh !== void 0 && ssh !== '') {
    method = 'update';
    data.SSHKEYID = ssh;
  }

  return this.vultr.communicate(this.service, method, data);
};

/**
 * Alias to create
 * @param  {String} name Name of the SSH key
 * @param  {String} key  SSH public key (in authorized_keys format)
 * @param  {String} ssh  SSHKEYID of key to update (see /v1/sshkey/list)
 * @return {Promise}      
 */
SSHKey.prototype.update = function update(name, key, ssh) {
  return this.create(name, key, ssh);
};

/**
 * Destroy (delete) a snapshot. There is no going back from this call. 
 * @param {Integer} id Unique identifier for this snapshot.  These can be found using the list call.
 * @return {Promise}
 */
SSHKey.prototype.destroy = function destroy(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SSHKEYID': id
  };

  return this.vultr.communicate(this.service, 'destroy', data);
};


module.exports = SSHKey;
