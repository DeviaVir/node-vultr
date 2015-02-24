var Promise = require('bluebird');

/**
 * Plans instance constructor
 * @prototype
 * @class Plans
 */
function Plans(instance) {
  this.vultr = instance || {};
  this.service = 'plans';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
Plans.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};  

module.exports = Plans;
