var Promise = require('bluebird');

/**
 * Account instance constructor
 * @prototype
 * @class Account
 */
function Account(instance) {
  this.vultr = instance || {};
  this.service = 'account';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
Account.prototype.info = function info() {
  return this.vultr.communicate(this.service, 'info');
};  

module.exports = Account;
