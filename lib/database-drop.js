'use strict';

var logger  = require('./logger.js');
var loader  = require('./database-load.js');

module.exports = function(config){

    config.models.migrate = 'drop';

    loader(config, function(err, models){
        if(err) throw err;
        logger.yellow('Database dropped!');
    });

};