var Promise = require('bluebird');

/**
 * StartupScript instance constructor
 * @prototype
 * @class StartupScript
 */
function StartupScript(instance) {
  this.vultr = instance || {};
  this.service = 'startupscript';
}

/**
 * List all startup scripts on the current account. 
 * 'boot' type scripts are executed by the server's operating system on the first boot. 
 * 'pxe' type scripts are executed by iPXE when the server itself starts up. 
 * @return {Promise}            Object with data
 */
StartupScript.prototype.list = function list() {
  return this.vultr.communicate(this.service, 'list');
};

/**
 * Create a startup script   
 * @param {String} name Name of the SSH key
 * @param {String} content Startup script contents
 * @param {String} type (optional)
 * @param {String} ssh (optional) SSHKEYID of key to update (see /v1/sshkey/list)
 * @return {Promise}
 */
StartupScript.prototype.create = function create(name, content, type, script) {
  if(name === void 0 || name === '') {
    return Promise.reject(new Error(404));
  }
  if(content === void 0 || content === '') {
    return Promise.reject(new Error(403));
  }

  var data = {
    'name': name,
    'script': content
  };

  var method = 'create';
  if(script !== void 0 && script !== '') {
    method = 'update';
    data.SCRIPTID = script;
  }

  if(type === void 0 || type === null || type === '' || type === false) {
    data.type = 'boot';
  }
  else {
    data.type = type;
  }

  return this.vultr.communicate(this.service, method, data);
};

/**
 * Alias to create
 * @param {String} name Name of the SSH key
 * @param {String} content Startup script contents
 * @param {String} type (optional)
 * @param  {Integer} script  SCRIPTID of script to update (see /v1/startupscript/list)
 * @return {Promise}      
 */
StartupScript.prototype.update = function update(name, content, type, script) {
  return this.create(name, content, type, script);
};

/**
 * Destroy (delete) a startupscript. There is no going back from this call. 
 * @param {Integer} id Unique identifier for this startupscript.  These can be found using the list call.
 * @return {Promise}
 */
StartupScript.prototype.destroy = function destroy(id) {
  if(id === void 0 || id === '') {
    return Promise.reject(new Error(404));
  }

  var data = {
    'SCRIPTID': id
  };

  return this.vultr.communicate(this.service, 'destroy', data);
};


module.exports = StartupScript;
