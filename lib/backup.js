var Promise = require('bluebird');

/**
 * Backup instance constructor
 * @prototype
 * @class Backup
 */
function Backup(instance) {
  this.vultr = instance || {};
  this.service = 'backup';
}

/**
 * Retrieve list of Backup's available
 * @return {Promise}            Object with data
 */
Backup.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};  

module.exports = Backup;
