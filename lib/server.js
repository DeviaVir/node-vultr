var Promise = require('bluebird');

/**
 * Server instance constructor
 * @prototype
 * @class Server
 */
function Server(instance) {
  this.vultr = instance || {};
  this.service = 'server';
}

/**
 * Retrieve information about the current account 
 * @return {Promise}            Object with data
 */
Server.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};

/**
 * Get the bandwidth used by a virtual machine 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.bandwidth = function bandwidth(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'bandwidth', data, 'get');
};

/**
 * Reboot a virtual machine. This is a hard reboot (basically, unplugging the machine). 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.reboot = function reboot(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'reboot', data);
};

/**
 * Halt a virtual machine. This is a hard power off (basically, unplugging the machine). 
 * The data on the machine will not be modified, and you will still be billed for the machine. 
 * To completely delete a machine, see v1/server/destroy 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.halt = function halt(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'halt', data);
};

/**
 * Start a virtual machine. If the machine is already running, it will be restarted. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.start = function start(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'start', data);
};

/**
 * Destroy (delete) a virtual machine. All data will be permanently lost, and the IP address will be released. 
 * There is no going back from this call. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.destroy = function destroy(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'destroy', data);
};

/**
 * Destroy (delete) a virtual machine. All data will be permanently lost, and the IP address will be released. 
 * There is no going back from this call. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.reinstall = function reinstall(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'reinstall', data);
};

/**
 * Restore the specified snapshot to the virtual machine. Any data already on the virtual machine will be lost. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} snapshot (see snapshot/list) to restore to this instance
 * @return {Promise}            Object with data
 */
Server.prototype.restoreSnapshot = function restoreSnapshot(id, snapshot) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  if(snapshot === void 0 || snapshot === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'SNAPSHOTID': snapshot
  };

  return this.vultr.communicate(this.service, 'restore_snapshot', data);
};

/**
 * Restore the specificed backup to the virtual machine. Any data already on the virtual machine will be lost. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} backup (see backup/list) to restore to this instance
 * @return {Promise}            Object with data
 */
Server.prototype.restoreBackup = function restoreBackup(id, backup) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  if(backup === void 0 || backup === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'BACKUPID': backup
  };

  return this.vultr.communicate(this.service, 'restore_backup', data);
};

/**
 * Create a new virtual machine. You will start being billed for this immediately. 
 * The response only contains the SUBID for the new machine. 
 * You should use v1/server/list to poll and wait for the machine to be created (as this does not happen instantly). 
 * @param  {Object} vps 
 *                     {
 *                       'region': {Integer}, // (required) Get the region ID
 *                       'plan': {Integer}, // (required) Get the plan ID
 *                       'os': {Integer},  // (required) Get the OS ID
 *                       'ipxe_chain_url': {String}, // If you've selected the 'custom' operating system, this can be set to chainload the specified URL on bootup, via iPXE
 *                       'iso': {String}, // Get the ISO ID
 *                       'startupscript': {Integer}, // Get the startupscript ID
 *                       'snapshot': {String}, // Get the snapshot ID
 *                       'enable_ipv6': {String}, // 'yes' or 'no' to enable ipv6 (if available)
 *                       'enable_private_network': {String}, // 'yes' or 'no' to enable private networking
 *                       'label': {String},
 *                       'sshkey': {String}, // Seperate multiple keys with comma's
 *                       'auto_backups': {String} // 'yes' or 'no'. If yes, automatic backups will be enabled for this server (these have an extra charge associated with them)
 *                     }
 * @return {Promise}     
 */
Server.prototype.create = function(vps) {
  if(vps === void 0 || vps === '' || Object.keys(vps).length === 0) {
    return Promise.reject(new Error(404));
  }

  if(vps.region === void 0 || vps.region === '' || vps.plan === void 0 || vps.plan === '' || vps.os === void 0 || vps.os === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'DCID': vps.region,
    'VPSPLANID': vps.plan,
    'OSID': vps.os
  };

  if(vps.ipxe_chain_url !== void 0) {
    data.ipxe_chain_url = vps.ipxe_chain_url;
  }
  if(vps.iso !== void 0) {
    data.ISOID = vps.iso;
  }
  if(vps.startupscript !== void 0) {
    data.SCRIPTID = vps.startupscript;
  }
  if(vps.snapshot !== void 0) {
    data.SNAPSHOTID = vps.snapshot;
  }
  if(vps.enable_ipv6 !== void 0) {
    if(vps.enable_ipv6 !== 'yes' && vps.enable_ipv6 !== 'no') {
      vps.enable_ipv6 = (!!vps.enable_ipv6 === true ? 'yes' : 'no');
    }
    data.enable_ipv6 = vps.enable_ipv6;
  }
  if(vps.enable_private_network !== void 0) {
    if(vps.enable_private_network !== 'yes' && vps.enable_private_network !== 'no') {
      vps.enable_private_network = (!!vps.enable_private_network === true ? 'yes' : 'no');
    }
    data.enable_private_network = vps.enable_private_network;
  }
  if(vps.label !== void 0) {
    data.label = vps.label;
  }
  if(vps.sshkey !== void 0) {
    data.SSHKEYID = vps.sshkey;
  }
  if(vps.auto_backups !== void 0) {
    if(vps.auto_backups !== 'yes' && vps.auto_backups !== 'no') {
      vps.auto_backups = (!!vps.auto_backups === true ? 'yes' : 'no');
    }
    data.auto_backups = vps.auto_backups;
  }

  return this.vultr.communicate(this.service, 'create', data);
};

/**
 * List the IPv4 information of a virtual machine.
 * IP information is only available for virtual machines in the "active" state.
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.listIpv4 = function listIpv4(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'list_ipv4', data, 'get');
};

/**
 * Set a reverse DNS entry for an IPv4 address of a virtual machine. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} ip string IPv4 address used in the reverse DNS update. These can be found with the v1/server/list_ipv4 call.
 * @param {String} entry reverse DNS entry.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseSetIpv4 = function reverseSetIpv4(id, ip, entry) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }
  if(entry === void 0 || entry === '') {
    return Promise.reject(new Error(402));
  }

  var data = {
    'SUBID': id,
    'ip': ip,
    'entry': entry
  };

  return this.vultr.communicate(this.service, 'reverse_set_ipv4', data);
};

/**
 * Set a reverse DNS entry for an IPv4 address of a virtual machine to the original setting. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} ip string IPv4 address used in the reverse DNS update. These can be found with the v1/server/list_ipv4 call.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseDefaultIpv4 = function reverseDefaultIpv4(id, ip) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'ip': ip
  };

  return this.vultr.communicate(this.service, 'reverse_default_ipv4', data);
};

/**
 * List the IPv4 reverse DNS entries of a virtual machine. 
 * Reverse DNS entries are only available for virtual machines in the "active" state. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseListIpv4 = function reverseListIpv4(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'reverse_list_ipv4', data, 'get');
};

/**
 * Remove a reverse DNS entry for an IPv4 address of a virtual machine. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param  {Integer} id 
 * @param  {String} ip IPv4 address used in the reverse DNS update. These can be found with the reverseListIpv4 call.
 * @return {Promise}    
 */
Server.prototype.reverseDeleteIpv4 = function reverseDeleteIpv4(id, ip) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'ip': ip
  };

  return this.vultr.communicate(this.service, 'reverse_delete_ipv4', data);
};

/**
 * List the IPv6 information of a virtual machine.
 * IP information is only available for virtual machines in the "active" state.
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.listIpv6 = function listIpv6(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'list_ipv6', data, 'get');
};

/**
 * Set a reverse DNS entry for an IPv6 address of a virtual machine. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} ip string IPv4 address used in the reverse DNS update. These can be found with the v1/server/list_ipv4 call.
 * @param {String} entry reverse DNS entry.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseSetIpv6 = function reverseSetIpv6(id, ip, entry) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }
  if(entry === void 0 || entry === '') {
    return Promise.reject(new Error(402));
  }

  var data = {
    'SUBID': id,
    'ip': ip,
    'entry': entry
  };

  return this.vultr.communicate(this.service, 'reverse_set_ipv6', data);
};

/**
 * Set a reverse DNS entry for an IPv6 address of a virtual machine to the original setting. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @param {String} ip string IPv4 address used in the reverse DNS update. These can be found with the v1/server/list_ipv4 call.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseDefaultIpv6 = function reverseDefaultIpv6(id, ip) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'ip': ip
  };

  return this.vultr.communicate(this.service, 'reverse_default_ipv6', data);
};

/**
 * List the IPv6 reverse DNS entries of a virtual machine. 
 * Reverse DNS entries are only available for virtual machines in the "active" state. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.reverseListIpv6 = function reverseListIpv6(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'reverse_list_ipv6', data, 'get');
};

/**
 * Remove a reverse DNS entry for an IPv6 address of a virtual machine. 
 * Upon success, DNS changes may take 6-12 hours to become active. 
 * @param  {Integer} id 
 * @param  {String} ip IPv6 address used in the reverse DNS update. These can be found with the reverseListIpv6 call.
 * @return {Promise}    
 */
Server.prototype.reverseDeleteIpv6 = function reverseDeleteIpv6(id, ip) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'ip': ip
  };

  return this.vultr.communicate(this.service, 'reverse_delete_ipv6', data);
};

/**
 * Set the label of a virtual machine. 
 * @param {Integer} id    
 * @param {String} label This is a text label that will be shown in the control panel.
 * @return {Promise}
 */
Server.prototype.setLabel = function setLabel(id, label) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(label === void 0) {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'label': label
  };

  return this.vultr.communicate(this.service, 'label_set', data);
};

/**
 * Add a new IPv4 address to a server. You will start being billed for this immediately. 
 * The server will not be rebooted unless you specify otherwise. 
 * You must reboot the server before the IPv4 address can be configured. 
 * @param {Integer} id    
 * @param {String} reboot (optional, default 'no') 'yes' or 'no'. If yes, the server is rebooted immediately.
 * @return {Promise}
 */
Server.prototype.createIpv4 = function createIpv4(id, reboot) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(reboot === void 0) {
    reboot = 'no';
  }
  if(reboot !== 'no' && reboot !== 'yes') {
    reboot = (!!reboot === true ? 'yes' : 'no');
  }

  var data = {
    'SUBID': id,
    'reboot': reboot
  };

  return this.vultr.communicate(this.service, 'create_ipv4', data);
};

/**
 * Removes a secondary IPv4 address from a server. 
 * Your server will be hard-restarted. 
 * We suggest halting the machine gracefully before removing IPs.  
 * @param {Integer} id    
 * @param {String} ip IPv4 address to remove.
 * @return {Promise}
 */
Server.prototype.destroyIpv4 = function destroyIpv4(id, ip) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(ip === void 0 || ip === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'ip': ip
  };

  return this.vultr.communicate(this.service, 'destroy_ipv4', data);
};

/**
 * Retrieves a list of operating systems to which this server can be changed. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.osChangeList = function osChangeList(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'os_change_list', data, 'get');
};

/**
 * Changes the operating system of a virtual machine. All data will be permanently lost. 
 * @param  {Integer} id Unique identifier for this subscription. These can be found using the v1/server/list call.
 * @param  {Integer} os Operating system to use. See /v1/server/os_change_list.
 * @return {Promise}    
 */
Server.prototype.osChange = function osChange(id, os) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(os === void 0 || os === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'OSID': os
  };

  return this.vultr.communicate(this.service, 'os_change', data);
};

/**
 * Retrieve a list of the VPSPLANIDs for which a virtual machine can be upgraded. 
 * An empty response array means that there are currently no upgrades available. 
 * @param {Integer} id Unique identifier for this subscription.  These can be found using the list call.
 * @return {Promise}            Object with data
 */
Server.prototype.upgradePlanlist = function upgradePlanlist(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SUBID': id
  };

  return this.vultr.communicate(this.service, 'upgrade_plan_list', data, 'get');
};

/**
 * Changes the operating system of a virtual machine. All data will be permanently lost. 
 * @param  {Integer} id Unique identifier for this subscription. These can be found using the v1/server/list call.
 * @param  {Integer} plan The new plan. See /v1/server/upgrade_plan_list.
 * @return {Promise}    
 */
Server.prototype.upgradePlan = function upgradePlan(id, plan) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }
  if(plan === void 0 || plan === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'SUBID': id,
    'VPSPLANID': plan
  };

  return this.vultr.communicate(this.service, 'upgrade_plan', data);
};

module.exports = Server;
