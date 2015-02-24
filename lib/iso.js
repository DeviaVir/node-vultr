var Promise = require('bluebird');

/**
 * ISO instance constructor
 * @prototype
 * @class ISO
 */
function ISO(instance) {
  this.vultr = instance || {};
  this.service = 'iso';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
ISO.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};  

module.exports = ISO;
