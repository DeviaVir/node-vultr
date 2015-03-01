var fs = require('fs');

// Require given configuration
if (fs.existsSync(__dirname + '/config/data.js')) {
  exports = module.exports = require('./config/data.js');
}
else {
  exports = module.exports = {};
}
