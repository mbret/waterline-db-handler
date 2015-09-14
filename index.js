'use strict';
var path    = require('path');

// Define constants
process.env.APP_ROOT_PATH   = path.join(__dirname, '../..');
process.env.SCRIPT_PATH     = path.join(__dirname, 'lib/script.js');
process.env.SCRIPTS_PATH    = path.join(__dirname, 'scripts');
process.env.LIB_PATH        = path.join(__dirname, 'lib');

 //Get script process
var script  = require(path.join(__dirname, 'lib/script.js'));
script.run();