var Promise = require('bluebird');

/**
 * Snapshot instance constructor
 * @prototype
 * @class Snapshot
 */
function Snapshot(instance) {
  this.vultr = instance || {};
  this.service = 'snapshot';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
Snapshot.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
}; 

/**
 * Create a snapshot from an existing virtual machine. The virtual machine does not need to be stopped.  
 * @param {Integer} id Unique identifier for this snapshot.  These can be found using the list call.
 * @param {String} description (optional)
 * @return {Promise}
 */
Snapshot.prototype.create = function create(id, description) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  if(description !== void 0 && description !== '') {
    data.description = description;
  }

  return this.vultr.communicate(this.service, 'create', data);
};

/**
 * Destroy (delete) a snapshot. There is no going back from this call. 
 * @param {Integer} id Unique identifier for this snapshot.  These can be found using the list call.
 * @return {Promise}
 */
Snapshot.prototype.destroy = function destroy(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SNAPSHOTID': id
  };

  return this.vultr.communicate(this.service, 'destroy', data);
};


module.exports = Snapshot;
