var Promise = require('bluebird');

/**
 * DNS instance constructor
 * @prototype
 * @class DNS
 */
function DNS(instance) {
  this.vultr = instance || {};
  this.service = 'dns';
}

/**
 * List all domains associated with the current account 
 * @return {Promise} 
 */
DNS.prototype.list = function() {
  return this.vultr.communicate(this.service, 'list');
};

/**
 * List all the records associated with a particular domain 
 * @param  {String} domain 
 * @return {Promise}        
 */
DNS.prototype.records = function(domain) {
  if(domain === void 0 || domain === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'domain': domain
  };

  return this.vultr.communicate(this.service, 'records', data, 'get');
};

/**
 * Create a domain name in DNS 
 * @param  {String} domain   Domain name to create
 * @param  {String} serverIp Server IP to use when creating default records (A and MX)
 * @return {Promise}          
 */
DNS.prototype.createDomain = function(domain, serverIp) {
  if(domain === void 0 || domain === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'domain': domain,
    'serverip': (serverIp === void 0 || serverIp === '' ? '127.0.0.1' : serverIp)
  };

  return this.vultr.communicate(this.service, 'create_domain', data);
};

/**
 * Delete a domain name (and all associated records) 
 * @param  {String} domain Domain name to delete
 * @return {Promise}        
 */
DNS.prototype.deleteDomain = function(domain) {
  if(domain === void 0 || domain === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'domain': domain
  };

  return this.vultr.communicate(this.service, 'delete_domain', data);
};

/**
 * Add a DNS record 
 * record.domain string Domain name to add record to
 * record.name string Name (subdomain) of record
 * record.type string Type (A, AAAA, MX, etc) of record
 * record.data string Data for this record
 * record.ttl integer (optional) TTL of this record
 * record.priority integer (only required for MX and SRV) Priority of this record (omit the priority from the data)
 *
 * @param {Object} record 
 * @return {Promise} HTTP result code
 */
DNS.prototype.createRecord = function createRecord(record) {
  var data = {
    'domain': record.domain,
    'name': record.name,
    'type': record.type,
    'data': record.data
  };

  if(record.ttl !== void 0) {
    data.ttl = record.ttl;
  }
  if(record.priority !== void 0) {
    data.priority = record.priority;
  }

  return this.vultr.communicate(this.service, 'create_record', data);
};  

/**
 * Delete a DNS record
 * record.domain string Domain name to delete record from
 * record.id integer RECORDID of the record (see this.records)
 * @param  {Object} record 
 * @return {Promise} HTTP result code
 */
DNS.prototype.deleteRecord = function deleteRecord(record) {
  var data = {
    'domain': record.domain,
    'RECORDID': record.id
  };

  return this.vultr.communicate(this.service, 'delete_record', data);
};  

module.exports = DNS;
