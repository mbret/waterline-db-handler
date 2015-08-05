'use strict';

var logger  = require('./logger.js');
var loader  = require('./database-load.js');

module.exports = function(config, sample){

    loader(config, function(err, models){
        if(err) throw err;

        sample()
            .then(function(){
                logger.yellow('Script executed!');
            })
            .catch(function(err){
                logger.red('An error occured with your sample, see below:');
                console.error(err);
                logger.yellow('Script executed with 1 error!');
            })
    });

};