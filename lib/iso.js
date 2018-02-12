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
 * Retrieve list of ISO's available
 * @return {Promise}            Object with data
 */
ISO.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};  

/**
 * Create a new ISO image on the current account.
 * The ISO image will be downloaded from a given URL.
 * Download status can be checked with the v1/iso/list call.
 * @param {String} url Remote URL from where the ISO will be downloaded.
 * @return {Promise}            Object with data
 */
ISO.prototype.createFromUrl = function createFromUrl(url) {
  if(url === void 0 || url === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'url': url
  };

  return this.vultr.communicate(this.service, 'create_from_url', data);
};

module.exports = ISO;
