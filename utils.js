var Promise = require( 'bluebird' )
  , crypto = require( 'crypto' );

// Utils
exports.urlencode = function urlencode(string) {
  return encodeURIComponent(string);
};
exports.urlencodeParameters = function urlencodeParameters(parameters, keyPrefix) {
  keyPrefix = keyPrefix || false;

  if(typeof parameters !== 'object') {
    return exports.urlencode(parameters);
  }

  var encodedData = [];
  Object.keys(parameters).forEach(function(key) {
    var encodedKey;
    if(key === 'item') { // custom hack for transip items
      encodedKey = (keyPrefix === false ? exports.urlencode(key) : keyPrefix);
    }
    else {
      encodedKey = (keyPrefix === false ? exports.urlencode(key) : keyPrefix + '[' + exports.urlencode(key) + ']');
    }

    if(parameters[key] !== void 0) {
      var value = parameters[key];
      if(value === null) {
        encodedData.push(encodedKey + '=');
      }
      else if(typeof value === 'object') {
        encodedData.push(exports.urlencodeParameters(value, encodedKey));
      }
      else if(typeof value === 'boolean') {
        encodedData.push(encodedKey + '=' + (value === true ? 1 : ''));
      }
      else {
        encodedData.push(encodedKey + '=' + exports.urlencode(value));
      }
    }
  });

  return encodedData.join('&');
};
exports.array_merge = function array_merge() {
  var args = Array.prototype.slice.call(arguments),
    argl = args.length,
    arg,
    retObj = {},
    k = '',
    argil = 0,
    j = 0,
    i = 0,
    ct = 0,
    toStr = Object.prototype.toString,
    retArr = true;

  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false;
      break;
    }
  }

  if (retArr) {
    retArr = [];
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i]);
    }
    return retArr;
  }

  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i];
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j];
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k];
          } else {
            retObj[k] = arg[k];
          }
        }
      }
    }
  }
  return retObj;
};
