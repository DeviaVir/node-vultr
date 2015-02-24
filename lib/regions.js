var Promise = require('bluebird');

/**
 * Regions instance constructor
 * @prototype
 * @class Regions
 */
function Regions(instance) {
  this.vultr = instance || {};
  this.service = 'regions';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
Regions.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};  

/**
 * Retrieve a list of the VPSPLANIDs (plans) currently available in this location. 
 * @param  {Integer} id Location to check availability of
 * @return {Promise}    
 */
Regions.prototype.availability = function(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'DCID': id
  };

  return this.vultr.communicate(this.service, 'availability', data, 'get');
};

module.exports = Regions;
